import React, { useState } from 'react';
import { Post, PostType, Category, AffiliateLink } from '../types';
import {
  Sparkles,
  Star,
  Flame,
  MessageSquare,
  Plus,
  Trash2,
  Tag,
  DollarSign,
  ShieldCheck,
  Send,
  Wand2,
  CheckCircle2,
  BarChart2,
  X
} from 'lucide-react';

interface CreatorStudioProps {
  onPublishPost: (post: Post) => void;
  onCloseStudio: () => void;
  defaultType?: PostType;
}

const CATEGORIES: Category[] = [
  'Music & Vinyl Releases',
  'Hip Hop Reviews',
  'Pop Culture & Media',
  'Consumer Gear & Products',
  'Culture & Opinions',
  'Tech & Gadgets',
  'Hot Takes & Memes'
];

export const CreatorStudio: React.FC<CreatorStudioProps> = ({
  onPublishPost,
  onCloseStudio,
  defaultType = 'review'
}) => {
  const [postType, setPostType] = useState<PostType>(defaultType);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Tech & Gadgets');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [rating, setRating] = useState<number>(4.5);
  const [verdict, setVerdict] = useState('VERDICT: Highly Recommended');
  const [pros, setPros] = useState<string[]>(['Great performance', 'Premium build quality']);
  const [cons, setCons] = useState<string[]>(['High price point']);

  // Poll state for banter
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState<string[]>(['Option 1', 'Option 2']);

  // Affiliate Links State
  const [affiliateLinks, setAffiliateLinks] = useState<
    { id: string; label: string; originalUrl: string; affiliateUrl: string; price: string; provider: 'amazon' | 'shareasale' | 'bestbuy' | 'custom' }[]
  >([
    {
      id: 'aff-init-1',
      label: 'Buy on Amazon ($199.99)',
      originalUrl: 'https://amazon.com',
      affiliateUrl: 'https://amazon.com?tag=banterrevs-20',
      price: '$199.99',
      provider: 'amazon'
    }
  ]);
  const [ftcDisclaimer, setFtcDisclaimer] = useState('FTC Disclosure: When you buy through links on our site, we may earn an affiliate commission.');

  // AI Assistant State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiPromptTopic, setAiPromptTopic] = useState('');

  // Pro/Con add helpers
  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');

  const handleAddPro = () => {
    if (newPro.trim()) {
      setPros([...pros, newPro.trim()]);
      setNewPro('');
    }
  };

  const handleAddCon = () => {
    if (newCon.trim()) {
      setCons([...cons, newCon.trim()]);
      setNewCon('');
    }
  };

  // Poll option helpers
  const handleAddPollOption = () => {
    setPollOptions([...pollOptions, `Option ${pollOptions.length + 1}`]);
  };

  const handleUpdatePollOption = (index: number, val: string) => {
    const updated = [...pollOptions];
    updated[index] = val;
    setPollOptions(updated);
  };

  // Affiliate Link helpers
  const handleAddAffiliateLink = () => {
    setAffiliateLinks([
      ...affiliateLinks,
      {
        id: `aff-${Date.now()}`,
        label: 'Buy Product Deal',
        originalUrl: 'https://amazon.com',
        affiliateUrl: 'https://amazon.com?tag=banterrevs-20',
        price: '$99.00',
        provider: 'amazon'
      }
    ]);
  };

  // AI Gemini Generator Request
  const handleAiGenerate = async (actionType: 'generate_review' | 'generate_banter') => {
    if (!aiPromptTopic.trim()) {
      alert('Please enter a product or topic for AI generation.');
      return;
    }

    setIsAiLoading(true);

    try {
      const response = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: actionType,
          topic: aiPromptTopic,
          details: content || excerpt
        })
      });

      const json = await response.json();
      if (json.success && json.data) {
        const d = json.data;
        if (d.title) setTitle(d.title);
        if (d.excerpt) setExcerpt(d.excerpt);
        if (d.content) setContent(d.content);
        if (d.rating) setRating(d.rating);
        if (d.verdict) setVerdict(d.verdict);
        if (d.pros) setPros(d.pros);
        if (d.cons) setCons(d.cons);
        if (d.ftcDisclaimer) setFtcDisclaimer(d.ftcDisclaimer);
        if (d.pollQuestion) setPollQuestion(d.pollQuestion);
        if (d.pollOptions) setPollOptions(d.pollOptions);
      }
    } catch (e) {
      console.error('AI Generation Failed', e);
      alert('AI Generation error. Please try again.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Title and Content are required.');
      return;
    }

    const formattedAffLinks: AffiliateLink[] = affiliateLinks.map((l) => ({
      id: l.id,
      label: l.label,
      originalUrl: l.originalUrl,
      affiliateUrl: l.affiliateUrl,
      provider: l.provider,
      price: l.price,
      clicks: 0,
      conversions: 0,
      estimatedRevenue: 0
    }));

    const newPost: Post = {
      id: `post-${Date.now()}`,
      title: title.trim(),
      type: postType,
      category,
      content: content.trim(),
      excerpt: excerpt.trim() || title.trim(),
      rating: postType === 'review' ? Number(rating) : undefined,
      verdict: postType === 'review' ? verdict : undefined,
      pros: postType === 'review' ? pros : undefined,
      cons: postType === 'review' ? cons : undefined,
      coverImage: coverImage.trim() || undefined,
      author: {
        name: 'Ricky EZ',
        handle: '@RickyReviews',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        bio: 'Unfiltered reviewer, tech writer & professional coffee drinker.'
      },
      createdAt: new Date().toISOString(),
      readTime: '3 min read',
      affiliateLinks: formattedAffLinks,
      ftcDisclaimer: affiliateLinks.length > 0 ? ftcDisclaimer : undefined,
      poll: postType === 'banter' && pollQuestion ? {
        id: `poll-${Date.now()}`,
        question: pollQuestion,
        options: pollOptions.map((opt, i) => ({ id: `opt-${i}`, text: opt, votes: 0 })),
        totalVotes: 0
      } : undefined,
      reactions: { fire: 1, brain: 1, laugh: 1, trash: 0 },
      comments: [],
      views: 12,
      shares: 0
    };

    onPublishPost(newPost);
  };

  return (
    <div className="bg-[#0F0F0F] border border-white/10 max-w-4xl mx-auto shadow-2xl p-6 sm:p-8 space-y-6">
      
      {/* Studio Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#FF4D00] flex items-center justify-center text-black font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold uppercase tracking-wider text-white">Creator Studio & Publisher</h2>
            <p className="text-[10px] text-white/50 font-mono">Write reviews, commentary, banter, attach monetization affiliate links, and publish instantly</p>
          </div>
        </div>
        <button
          onClick={onCloseStudio}
          className="p-1.5 bg-white/10 text-white hover:bg-white hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* AI Assistant Quick Tool Banner */}
      <div className="p-4 bg-black border border-white/10 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#FF4D00] flex items-center gap-1.5 uppercase tracking-widest">
            <Wand2 className="w-4 h-4" /> Gemini AI Creator Assistant
          </span>
          <span className="text-[10px] text-white/40 font-mono">Gemini 3.6 Flash Powered</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={aiPromptTopic}
            onChange={(e) => setAiPromptTopic(e.target.value)}
            placeholder="Enter product name (e.g. 'Sony WH-1000XM5') or banter topic..."
            className="flex-1 px-3.5 py-2 bg-[#0F0F0F] border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FF4D00]"
          />
          <div className="flex gap-2">
            <button
              type="button"
              disabled={isAiLoading}
              onClick={() => handleAiGenerate('generate_review')}
              className="px-3.5 py-2 bg-[#FF4D00] hover:bg-white text-black text-xs font-black uppercase transition-all disabled:opacity-50"
            >
              {isAiLoading ? 'Drafting...' : 'AI Review Draft'}
            </button>
            <button
              type="button"
              disabled={isAiLoading}
              onClick={() => handleAiGenerate('generate_banter')}
              className="px-3.5 py-2 bg-white/10 hover:bg-white hover:text-black text-white text-xs font-bold uppercase transition-all disabled:opacity-50"
            >
              {isAiLoading ? 'Drafting...' : 'AI Banter Take'}
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Post Type Switcher Tabs */}
        <div>
          <label className="text-[10px] font-bold text-[#FF4D00] block mb-2 uppercase tracking-widest">Select Post Type:</label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setPostType('review')}
              className={`p-3 border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                postType === 'review'
                  ? 'bg-[#FF4D00] text-black border-[#FF4D00]'
                  : 'bg-black border-white/10 text-white/60 hover:text-white hover:border-white/30'
              }`}
            >
              <Star className="w-4 h-4 fill-current" />
              <span>Product Review</span>
            </button>

            <button
              type="button"
              onClick={() => setPostType('commentary')}
              className={`p-3 border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                postType === 'commentary'
                  ? 'bg-white text-black border-white'
                  : 'bg-black border-white/10 text-white/60 hover:text-white hover:border-white/30'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Editorial Commentary</span>
            </button>

            <button
              type="button"
              onClick={() => setPostType('banter')}
              className={`p-3 border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                postType === 'banter'
                  ? 'bg-[#FF0080] text-white border-[#FF0080]'
                  : 'bg-black border-white/10 text-white/60 hover:text-white hover:border-white/30'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Short Banter / Poll</span>
            </button>
          </div>
        </div>

        {/* Title & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-bold text-white uppercase block mb-1">Headline / Post Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Keychron Q1 Max Review: Typing Heaven or $219 Overkill?"
              className="w-full px-4 py-2.5 bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF4D00]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-white uppercase block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full px-4 py-2.5 bg-black border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF4D00]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-[#0F0F0F] text-white">
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cover Image & Excerpt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-white uppercase block mb-1">Cover Image URL (Optional)</label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-4 py-2.5 bg-black border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF4D00]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-white uppercase block mb-1">Excerpt / Hook</label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Short 2-sentence teaser for feed card"
              className="w-full px-4 py-2.5 bg-black border border-white/10 text-white text-xs focus:outline-none focus:border-[#FF4D00]"
            />
          </div>
        </div>

        {/* REVIEW SPECIFIC FIELDS */}
        {postType === 'review' && (
          <div className="p-4 bg-black border border-white/10 space-y-4">
            <h3 className="text-xs font-bold text-[#FF4D00] uppercase tracking-wider flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-[#FF4D00]" /> Review Rating & Verdict Settings
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-white/80 block mb-1">Star Rating (0 - 5.0): {rating}</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.1"
                  value={rating}
                  onChange={(e) => setRating(parseFloat(e.target.value))}
                  className="w-full accent-[#FF4D00] cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-white/80 block mb-1">Verdict Badge Text</label>
                <input
                  type="text"
                  value={verdict}
                  onChange={(e) => setVerdict(e.target.value)}
                  placeholder="VERDICT: Must Buy for Audiophiles"
                  className="w-full px-3 py-1.5 bg-[#0F0F0F] border border-white/10 text-xs text-[#FF4D00] font-bold uppercase focus:outline-none focus:border-[#FF4D00]"
                />
              </div>
            </div>

            {/* Pros & Cons Builder */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-[#00FF88] uppercase block mb-1">Pros List</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newPro}
                    onChange={(e) => setNewPro(e.target.value)}
                    placeholder="Add a pro point..."
                    className="flex-1 px-3 py-1 bg-[#0F0F0F] border border-white/10 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddPro}
                    className="px-3 py-1 bg-[#00FF88] text-black font-bold text-xs uppercase"
                  >
                    Add
                  </button>
                </div>
                <ul className="text-xs text-white/80 space-y-1 font-mono">
                  {pros.map((p, i) => (
                    <li key={i} className="flex items-center justify-between bg-white/5 px-2.5 py-1">
                      <span>• {p}</span>
                      <button
                        type="button"
                        onClick={() => setPros(pros.filter((_, idx) => idx !== i))}
                        className="text-[#FF0080] hover:text-white"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <label className="text-xs font-bold text-[#FF0080] uppercase block mb-1">Cons List</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newCon}
                    onChange={(e) => setNewCon(e.target.value)}
                    placeholder="Add a con point..."
                    className="flex-1 px-3 py-1 bg-[#0F0F0F] border border-white/10 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddCon}
                    className="px-3 py-1 bg-[#FF0080] text-white font-bold text-xs uppercase"
                  >
                    Add
                  </button>
                </div>
                <ul className="text-xs text-white/80 space-y-1 font-mono">
                  {cons.map((c, i) => (
                    <li key={i} className="flex items-center justify-between bg-white/5 px-2.5 py-1">
                      <span>• {c}</span>
                      <button
                        type="button"
                        onClick={() => setCons(cons.filter((_, idx) => idx !== i))}
                        className="text-[#FF0080] hover:text-white"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* BANTER SPECIFIC POLL FIELDS */}
        {postType === 'banter' && (
          <div className="p-4 bg-black border border-white/10 space-y-3">
            <h3 className="text-xs font-bold text-[#FF0080] uppercase tracking-wider flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4" /> Community Poll Question (Optional)
            </h3>
            <input
              type="text"
              value={pollQuestion}
              onChange={(e) => setPollQuestion(e.target.value)}
              placeholder="e.g. Which digital panic moment causes maximum physical stress?"
              className="w-full px-3 py-2 bg-[#0F0F0F] border border-white/10 text-xs text-white focus:outline-none focus:border-[#FF0080]"
            />
            <div className="space-y-1.5">
              {pollOptions.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  value={opt}
                  onChange={(e) => handleUpdatePollOption(i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                  className="w-full px-3 py-1.5 bg-[#0F0F0F] border border-white/10 text-xs text-white/80"
                />
              ))}
              <button
                type="button"
                onClick={handleAddPollOption}
                className="text-xs text-[#FF0080] hover:text-white font-bold flex items-center gap-1 pt-1 font-mono uppercase"
              >
                <Plus className="w-3.5 h-3.5" /> Add Poll Option
              </button>
            </div>
          </div>
        )}

        {/* Content Body (Markdown text) */}
        <div>
          <label className="text-xs font-bold text-white uppercase block mb-1">Main Article Content *</label>
          <textarea
            required
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your unfiltered review, commentary or witty banter here..."
            className="w-full p-4 bg-black border border-white/10 text-white text-xs leading-relaxed focus:outline-none focus:border-[#FF4D00]"
          />
        </div>

        {/* MONETIZATION & AFFILIATE LINKS BUILDER */}
        <div className="p-4 bg-black border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#00FF88] flex items-center gap-1.5 uppercase tracking-wider">
              <DollarSign className="w-4 h-4 text-[#00FF88]" /> Monetization & Tracked Affiliate Buying Links
            </span>
            <button
              type="button"
              onClick={handleAddAffiliateLink}
              className="px-3 py-1 bg-[#00FF88] text-black font-black text-xs uppercase flex items-center gap-1 hover:bg-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Buying Link
            </button>
          </div>

          <div className="space-y-3">
            {affiliateLinks.map((link, idx) => (
              <div key={link.id} className="p-3 bg-[#0F0F0F] border border-white/10 grid grid-cols-1 sm:grid-cols-4 gap-2 items-center">
                <input
                  type="text"
                  value={link.label}
                  onChange={(e) => {
                    const updated = [...affiliateLinks];
                    updated[idx].label = e.target.value;
                    setAffiliateLinks(updated);
                  }}
                  placeholder="Button Label (e.g. Buy on Amazon)"
                  className="px-2.5 py-1.5 bg-black text-xs text-white border border-white/10"
                />
                <input
                  type="text"
                  value={link.affiliateUrl}
                  onChange={(e) => {
                    const updated = [...affiliateLinks];
                    updated[idx].affiliateUrl = e.target.value;
                    setAffiliateLinks(updated);
                  }}
                  placeholder="Affiliate URL with tag"
                  className="px-2.5 py-1.5 bg-black text-xs text-[#00FF88] border border-white/10 font-mono"
                />
                <input
                  type="text"
                  value={link.price}
                  onChange={(e) => {
                    const updated = [...affiliateLinks];
                    updated[idx].price = e.target.value;
                    setAffiliateLinks(updated);
                  }}
                  placeholder="Price (e.g. $199.99)"
                  className="px-2.5 py-1.5 bg-black text-xs text-[#FF4D00] border border-white/10 font-mono"
                />
                <div className="flex items-center justify-between gap-2">
                  <select
                    value={link.provider}
                    onChange={(e) => {
                      const updated = [...affiliateLinks];
                      updated[idx].provider = e.target.value as any;
                      setAffiliateLinks(updated);
                    }}
                    className="bg-black text-xs text-white border border-white/10 px-2 py-1.5 flex-1"
                  >
                    <option value="amazon">Amazon</option>
                    <option value="shareasale">ShareASale</option>
                    <option value="bestbuy">BestBuy</option>
                    <option value="custom">Custom Partner</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => setAffiliateLinks(affiliateLinks.filter((_, i) => i !== idx))}
                    className="text-[#FF0080] hover:text-white p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <label className="text-xs font-bold text-white uppercase block mb-1">FTC Compliance Disclosure Disclaimer</label>
            <input
              type="text"
              value={ftcDisclaimer}
              onChange={(e) => setFtcDisclaimer(e.target.value)}
              className="w-full px-3 py-1.5 bg-black border border-white/10 text-[11px] text-white/50 font-mono italic"
            />
          </div>
        </div>

        {/* Submit Action */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          <button
            type="button"
            onClick={onCloseStudio}
            className="px-5 py-2.5 bg-white/10 hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#FF4D00] hover:bg-white text-black font-black text-xs uppercase flex items-center gap-2 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Publish Post Live</span>
          </button>
        </div>

      </form>
    </div>
  );
};

