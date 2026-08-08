import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is missing.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
};

// API: Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API: Affiliate Click Logger & Redirect Handler
app.post('/api/affiliate/click', (req, res) => {
  const { postId, linkId, targetUrl } = req.body;
  
  if (!targetUrl) {
    res.status(400).json({ error: 'targetUrl is required' });
    return;
  }

  // Log click simulation event server-side
  console.log(`[AFFILIATE CLICK] Post: ${postId}, Link: ${linkId}, Target: ${targetUrl}, Timestamp: ${new Date().toISOString()}`);

  res.json({
    success: true,
    trackedAt: new Date().toISOString(),
    redirectUrl: targetUrl
  });
});

// API: AI Assistant Endpoint (Gemini 3.6 Flash)
app.post('/api/ai/assistant', async (req, res) => {
  try {
    const { action, topic, details, platform } = req.body;
    const ai = getAiClient();

    if (action === 'generate_review') {
      const prompt = `Write an engaging, unfiltered online review for a product, vinyl release, hip hop album, or consumer gear: "${topic}". Details or notes: "${details || 'N/A'}". Focus on authentic music/vinyl/gear expertise, sound quality, physical packaging, build quality, and value.
Return a JSON object with:
- title: catchy headline
- rating: number between 1.0 and 5.0
- verdict: short badge text starting with VERDICT:
- excerpt: punchy 2-sentence summary
- content: 3-paragraph detailed review markdown with section headings (The Good, The Bad, The Verdict)
- pros: array of 3-4 strings
- cons: array of 2-3 strings
- ftcDisclaimer: standard compliant disclosure
- suggestedAffiliateKeywords: array of product or vinyl album keywords suitable for affiliate buttons`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              rating: { type: Type.NUMBER },
              verdict: { type: Type.STRING },
              excerpt: { type: Type.STRING },
              content: { type: Type.STRING },
              pros: { type: Type.ARRAY, items: { type: Type.STRING } },
              cons: { type: Type.ARRAY, items: { type: Type.STRING } },
              ftcDisclaimer: { type: Type.STRING },
              suggestedAffiliateKeywords: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['title', 'rating', 'verdict', 'excerpt', 'content', 'pros', 'cons', 'ftcDisclaimer']
          }
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json({ success: true, data: parsed });
      return;
    }

    if (action === 'generate_banter') {
      const prompt = `Create a short, hilarious banter post or hot take for online feed about topic: "${topic}". 
Return a JSON object with:
- title: punchy main post text (max 280 characters)
- excerpt: comedic subtext
- pollQuestion: optional funny question for a reader poll
- pollOptions: array of 3-4 funny answer strings
- category: "Hot Takes & Memes"`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              excerpt: { type: Type.STRING },
              pollQuestion: { type: Type.STRING },
              pollOptions: { type: Type.ARRAY, items: { type: Type.STRING } },
              category: { type: Type.STRING }
            },
            required: ['title', 'excerpt', 'category']
          }
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json({ success: true, data: parsed });
      return;
    }

    if (action === 'generate_social_caption') {
      const targetPlatform = platform || 'twitter';
      const prompt = `Format the following post content into a high-converting social media post for ${targetPlatform}.
Topic/Title: "${topic}"
Content Summary: "${details}"
Include:
- Platform specific style (Twitter/X snappy, Threads conversational, Instagram engaging with emojis, LinkedIn professional)
- FTC affiliate disclosure hashtag (#ad or #affiliate)
- 3 relevant viral hashtags
- Call to action to click link in bio/comments`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt
      });

      res.json({ success: true, caption: response.text });
      return;
    }

    res.status(400).json({ error: `Unknown action: ${action}` });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate AI content'
    });
  }
});

// Vite & Static Asset Handling
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

startServer();
