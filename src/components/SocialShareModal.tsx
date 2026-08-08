import React, { useState } from 'react';
import { Post } from '../types';
import {
  X,
  Share2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  DollarSign,
  Download,
  Tag,
  Flame,
  Globe
} from 'lucide-react';

interface SocialShareModalProps {
  post: Post | null;
  onClose: () => void;
}

type Platform = 'twitter' | 'threads' | 'instagram' | 'linkedin' | 'tiktok';

export const SocialShareModal: React.FC<SocialShareModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  const [activePlatform, setActivePlatform] = useState<Platform>('twitter');
  const [includeAffiliateLink, setIncludeAffiliateLink] = useState<boolean>(true);
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  // Build UTM tracked link
  const primaryAffiliateUrl = post.affiliateLinks?.[0]?.affiliateUrl || window.location.href;
  const utmUrl = `${primaryAffiliateUrl}${primaryAffiliateUrl.includes('?') ? '&' : '?'}utm_source=${activePlatform}&utm_medium=social_share&utm_campaign=banterhub`;

  // Generate platform-optimized caption text
  const getShareCaption = () => {
    const title = post.title;
    const ratingText = post.rating ? `⭐ ${post.rating}/5` : '';
    const verdictText = post.verdict ? `\n\n${post.verdict}` : '';
    const ftcTag = includeAffiliateLink && post.affiliateLinks.length > 0 ? '\n#ad #affiliate' : '';

    switch (activePlatform) {
      case 'twitter':
        return `🔥 ${title} ${ratingText}${verdictText}\n\nUnfiltered breakdown 👇\n${includeAffiliateLink ? utmUrl : ''}${ftcTag} #tech #reviews`;
      case 'threads':
        return `Spicy take on ${title} ${ratingText}\n\n"${post.excerpt}"\n\nFull review & buying links below 👇\n${includeAffiliateLink ? utmUrl : ''}${ftcTag}`;
      case 'instagram':
        return `✨ NEW REVIEW & BANTER ✨\n\n${title}\n\n"${post.excerpt}"\n\n🔗 Tracked buy link in bio or below:\n${includeAffiliateLink ? utmUrl : ''}\n\n${ftcTag} #unfiltered #reviews #banter`;
      case 'linkedin':
        return `Industry Perspective: ${title}\n\nKey takeaways from my latest breakdown:\n- ${post.excerpt}\n\nCheck out the full commentary and product specifications here:\n${includeAffiliateLink ? utmUrl : ''}${ftcTag}`;
      case 'tiktok':
        return `[TikTok Script Hook]: "Stop buying this until you read this!"\n\nTopic: ${title}\nVerdict: ${post.verdict || 'Must read'}\n\nLink in bio for full specs: ${includeAffiliateLink ? utmUrl : ''}${ftcTag}`;
      default:
        return `${title}\n${utmUrl}`;
    }
  };

  const captionText = getShareCaption();

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(captionText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(utmUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleOpenPlatform = () => {
    let url = '';
    const encodedText = encodeURIComponent(captionText);

    if (activePlatform === 'twitter') {
      url = `https://twitter.com/intent/tweet?text=${encodedText}`;
    } else if (activePlatform === 'threads') {
      url = `https://www.threads.net/intent/post?text=${encodedText}`;
    } else if (activePlatform === 'linkedin') {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(utmUrl)}`;
    } else {
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(utmUrl)}`;
    }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0F0F0F] border border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FF4D00] flex items-center justify-center text-black">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg uppercase tracking-wider">Cross-Platform Share Studio</h3>
              <p className="text-[10px] text-white/50 font-mono">Auto-formatted posts with affiliate link tracking & UTM tags</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white/10 text-white hover:bg-white hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 flex-1">
          
          {/* Post Summary Preview */}
          <div className="p-4 bg-white/5 border border-white/10 text-xs">
            <div className="text-white/40 font-mono text-[10px] uppercase mb-1">SHARING CONTENT:</div>
            <div className="font-serif italic text-lg text-white font-medium">"{post.title}"</div>
            {post.affiliateLinks && post.affiliateLinks.length > 0 && (
              <div className="mt-2 text-[#00FF88] flex items-center gap-1.5 font-mono text-[11px]">
                <Tag className="w-3.5 h-3.5 text-[#00FF88]" />
                <span>Primary Affiliate Link: {post.affiliateLinks[0].label} ({post.affiliateLinks[0].price})</span>
              </div>
            )}
          </div>

          {/* Platform Switcher Tabs */}
          <div>
            <label className="text-[10px] font-bold text-[#FF4D00] block mb-2 uppercase tracking-widest">
              Select Target Social Network:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                onClick={() => setActivePlatform('twitter')}
                className={`p-3 text-xs font-bold uppercase tracking-wider flex flex-col items-center gap-1 transition-all border ${
                  activePlatform === 'twitter'
                    ? 'bg-[#FF4D00] text-black border-[#FF4D00]'
                    : 'bg-black border-white/10 text-white/60 hover:text-white hover:border-white/30'
                }`}
              >
                <span>𝕏 / Twitter</span>
                <span className="text-[9px] font-mono opacity-60">280 Chars</span>
              </button>

              <button
                onClick={() => setActivePlatform('threads')}
                className={`p-3 text-xs font-bold uppercase tracking-wider flex flex-col items-center gap-1 transition-all border ${
                  activePlatform === 'threads'
                    ? 'bg-[#FF4D00] text-black border-[#FF4D00]'
                    : 'bg-black border-white/10 text-white/60 hover:text-white hover:border-white/30'
                }`}
              >
                <span>Threads</span>
                <span className="text-[9px] font-mono opacity-60">Meta Loop</span>
              </button>

              <button
                onClick={() => setActivePlatform('instagram')}
                className={`p-3 text-xs font-bold uppercase tracking-wider flex flex-col items-center gap-1 transition-all border ${
                  activePlatform === 'instagram'
                    ? 'bg-[#FF0080] text-white border-[#FF0080]'
                    : 'bg-black border-white/10 text-white/60 hover:text-white hover:border-white/30'
                }`}
              >
                <span>Instagram</span>
                <span className="text-[9px] font-mono opacity-60">Story & Post</span>
              </button>

              <button
                onClick={() => setActivePlatform('linkedin')}
                className={`p-3 text-xs font-bold uppercase tracking-wider flex flex-col items-center gap-1 transition-all border ${
                  activePlatform === 'linkedin'
                    ? 'bg-white text-black border-white'
                    : 'bg-black border-white/10 text-white/60 hover:text-white hover:border-white/30'
                }`}
              >
                <span>LinkedIn</span>
                <span className="text-[9px] font-mono opacity-60">Article Take</span>
              </button>

              <button
                onClick={() => setActivePlatform('tiktok')}
                className={`p-3 text-xs font-bold uppercase tracking-wider flex flex-col items-center gap-1 transition-all border ${
                  activePlatform === 'tiktok'
                    ? 'bg-[#FF4D00] text-black border-[#FF4D00]'
                    : 'bg-black border-white/10 text-white/60 hover:text-white hover:border-white/30'
                }`}
              >
                <span>TikTok</span>
                <span className="text-[9px] font-mono opacity-60">Script Hook</span>
              </button>
            </div>
          </div>

          {/* Affiliate Link & FTC Toggle */}
          {post.affiliateLinks && post.affiliateLinks.length > 0 && (
            <div className="p-3 bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#00FF88]" />
                <div>
                  <div className="text-xs font-bold text-white uppercase">Embed Tracked Affiliate Link</div>
                  <div className="text-[10px] text-white/40 font-mono">Includes auto FTC disclosure hashtag (#ad)</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={includeAffiliateLink}
                onChange={(e) => setIncludeAffiliateLink(e.target.checked)}
                className="w-4 h-4 accent-[#FF4D00] cursor-pointer"
              />
            </div>
          )}

          {/* Platform Post Preview Box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-bold text-[#FF4D00] uppercase tracking-widest">
                Generated {activePlatform.toUpperCase()} Snippet:
              </span>
              <button
                onClick={handleCopyCaption}
                className="text-xs text-white hover:text-[#FF4D00] font-mono flex items-center gap-1"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-[#00FF88]" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedText ? 'Copied!' : 'Copy Caption'}
              </button>
            </div>

            <textarea
              readOnly
              value={captionText}
              rows={5}
              className="w-full p-3 bg-black border border-white/10 text-white text-xs font-mono leading-relaxed focus:outline-none resize-none"
            />
          </div>

          {/* Visual Graphic Card Preview for Instagram / X */}
          {activePlatform === 'instagram' && (
            <div className="p-4 bg-black border border-white/10 text-white flex flex-col items-center text-center gap-3">
              <div className="text-[10px] font-bold text-[#FF4D00] uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Auto-Generated Social Card Preview
              </div>
              <div className="p-4 bg-[#0F0F0F] border border-white/20 max-w-sm w-full">
                <div className="text-[10px] font-mono text-[#FF4D00] uppercase mb-1">{post.type} • {post.category}</div>
                <h4 className="font-serif italic text-base text-white mb-2">"{post.title}"</h4>
                {post.verdict && (
                  <div className="inline-block px-2 py-1 bg-[#FF4D00] text-black text-[10px] font-black uppercase mb-2">
                    {post.verdict}
                  </div>
                )}
                <p className="text-[11px] text-white/60 italic font-mono">"{post.excerpt}"</p>
                <div className="mt-3 text-[10px] text-[#FF4D00] font-mono uppercase tracking-widest">BANTER. COLLECTIVE</div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-white/10 bg-black flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleCopyUrl}
            className="px-3 py-2 bg-white/10 hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          >
            {copiedUrl ? <Check className="w-3.5 h-3.5 text-[#00FF88]" /> : <Globe className="w-3.5 h-3.5 text-[#FF4D00]" />}
            <span>{copiedUrl ? 'UTM Link Copied!' : 'Copy UTM Link'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCaption}
              className="px-4 py-2 bg-white/10 hover:bg-white hover:text-black text-white font-bold uppercase text-xs transition-colors"
            >
              Copy Text
            </button>
            <button
              onClick={handleOpenPlatform}
              className="px-4 py-2 bg-[#FF4D00] hover:bg-white text-black font-black uppercase text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>Post to {activePlatform.toUpperCase()}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

