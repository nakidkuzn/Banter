import React, { useState } from 'react';
import { Post, AnalyticsSummary } from '../types';
import { computeAnalytics } from '../data/mockPosts';
import {
  X,
  DollarSign,
  TrendingUp,
  MousePointerClick,
  BarChart2,
  Tag,
  ExternalLink,
  Plus,
  Sparkles,
  Coffee,
  Copy,
  Check,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface AffiliateAnalyticsModalProps {
  posts: Post[];
  onClose: () => void;
  onAddAffiliateLinkToPost?: (postId: string, linkData: any) => void;
}

export const AffiliateAnalyticsModal: React.FC<AffiliateAnalyticsModalProps> = ({
  posts,
  onClose,
  onAddAffiliateLinkToPost
}) => {
  const analytics = computeAnalytics(posts);

  const [linkConverterUrl, setLinkConverterUrl] = useState('');
  const [convertedAffiliateUrl, setConvertedAffiliateUrl] = useState('');
  const [selectedPostIdForLink, setSelectedPostIdForLink] = useState(posts[0]?.id || '');
  const [copiedLink, setCopiedLink] = useState(false);

  // Tipping Config State
  const [tippingHandle, setTippingHandle] = useState('https://buymeacoffee.com/rickyez');
  const [tippingEnabled, setTippingEnabled] = useState(true);

  const handleConvertLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkConverterUrl.trim()) return;

    let aff = linkConverterUrl;
    if (linkConverterUrl.includes('amazon.com')) {
      aff = `${linkConverterUrl}${linkConverterUrl.includes('?') ? '&' : '?'}tag=banterrevs-20`;
    } else if (linkConverterUrl.includes('keychron.com')) {
      aff = `${linkConverterUrl}${linkConverterUrl.includes('?') ? '&' : '?'}ref=banterrevs`;
    } else {
      aff = `${linkConverterUrl}${linkConverterUrl.includes('?') ? '&' : '?'}aff=banterrevs`;
    }

    setConvertedAffiliateUrl(aff);
  };

  const handleCopyConverted = () => {
    navigator.clipboard.writeText(convertedAffiliateUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAttachToPost = () => {
    if (!selectedPostIdForLink || !convertedAffiliateUrl) return;

    if (onAddAffiliateLinkToPost) {
      onAddAffiliateLinkToPost(selectedPostIdForLink, {
        id: `aff-${Date.now()}`,
        label: `Buy Product Deal`,
        originalUrl: linkConverterUrl,
        affiliateUrl: convertedAffiliateUrl,
        provider: linkConverterUrl.includes('amazon') ? 'amazon' : 'custom',
        clicks: 0,
        conversions: 0,
        estimatedRevenue: 0
      });
      alert('Affiliate link successfully attached to selected post!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0F0F0F] border border-white/10 max-w-4xl w-full my-auto shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0F0F0F]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#FF4D00] flex items-center justify-center text-black">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-white text-xl uppercase tracking-wider">Monetization & Affiliate Studio</h2>
              <p className="text-[10px] text-white/50 font-mono">Track click-throughs, commissions, and convert product links into affiliate tags</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white/10 text-white hover:bg-white hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Top Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 bg-black border border-white/10 text-white">
              <div className="flex items-center justify-between text-[10px] text-white/50 font-mono uppercase mb-1">
                <span>ESTIMATED REVENUE</span>
                <DollarSign className="w-4 h-4 text-[#00FF88]" />
              </div>
              <div className="text-2xl font-mono font-bold text-[#00FF88]">
                ${analytics.totalEstimatedRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <p className="text-[9px] text-[#00FF88]/80 mt-1 font-mono">From tracked commissions</p>
            </div>

            <div className="p-4 bg-black border border-white/10 text-white">
              <div className="flex items-center justify-between text-[10px] text-white/50 font-mono uppercase mb-1">
                <span>AFFILIATE CLICKS</span>
                <MousePointerClick className="w-4 h-4 text-[#FF4D00]" />
              </div>
              <div className="text-2xl font-mono font-bold text-[#FF4D00]">
                {analytics.totalAffiliateClicks.toLocaleString()}
              </div>
              <p className="text-[9px] text-[#FF4D00]/80 mt-1 font-mono">Across published posts</p>
            </div>

            <div className="p-4 bg-black border border-white/10 text-white">
              <div className="flex items-center justify-between text-[10px] text-white/50 font-mono uppercase mb-1">
                <span>CLICK-THROUGH RATE</span>
                <TrendingUp className="w-4 h-4 text-[#FF0080]" />
              </div>
              <div className="text-2xl font-mono font-bold text-[#FF0080]">
                {analytics.ctrPercentage}%
              </div>
              <p className="text-[9px] text-white/40 mt-1 font-mono">Clicks per post view</p>
            </div>

            <div className="p-4 bg-black border border-white/10 text-white">
              <div className="flex items-center justify-between text-[10px] text-white/50 font-mono uppercase mb-1">
                <span>ACTIVE POSTS</span>
                <BarChart2 className="w-4 h-4 text-white" />
              </div>
              <div className="text-2xl font-mono font-bold text-white">
                {analytics.totalPosts}
              </div>
              <p className="text-[9px] text-white/40 mt-1 font-mono">Reviews & hot takes</p>
            </div>

          </div>

          {/* Smart Affiliate Link Converter & Generator */}
          <div className="p-5 bg-white/5 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-[#FF4D00] text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Smart Affiliate Link Auto-Converter</span>
            </div>
            <p className="text-xs text-white/70">
              Paste any store URL (Amazon, BestBuy, Keychron, Target). We will automatically attach your monetization tag <code className="text-[#00FF88] bg-black px-1.5 py-0.5 font-mono">?tag=banterrevs-20</code> and FTC disclaimer snippet!
            </p>

            <form onSubmit={handleConvertLink} className="flex gap-2">
              <input
                type="text"
                value={linkConverterUrl}
                onChange={(e) => setLinkConverterUrl(e.target.value)}
                placeholder="https://www.amazon.com/dp/B0CXKEYCHRON"
                className="flex-1 px-4 py-2 bg-black border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FF4D00]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#FF4D00] hover:bg-white text-black font-black text-xs uppercase flex items-center gap-1 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Convert</span>
              </button>
            </form>

            {convertedAffiliateUrl && (
              <div className="p-4 bg-black border border-[#FF4D00] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#FF4D00] uppercase tracking-wider">Tracked Affiliate Link Generated:</span>
                  <button
                    onClick={handleCopyConverted}
                    className="text-xs text-white hover:text-[#00FF88] font-mono flex items-center gap-1"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5 text-[#00FF88]" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedLink ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
                <div className="p-2.5 bg-[#0F0F0F] border border-white/10 text-xs text-[#00FF88] font-mono break-all">
                  {convertedAffiliateUrl}
                </div>

                {/* Attach to Post Option */}
                <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-white/10">
                  <span className="text-xs text-white/50 uppercase font-mono">Attach to Post:</span>
                  <select
                    value={selectedPostIdForLink}
                    onChange={(e) => setSelectedPostIdForLink(e.target.value)}
                    className="flex-1 w-full bg-[#0F0F0F] border border-white/10 text-white text-xs px-2.5 py-1.5 focus:outline-none"
                  >
                    {posts.map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#0F0F0F] text-white">
                        [{p.type.toUpperCase()}] {p.title}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAttachToPost}
                    className="px-3 py-1.5 bg-[#00FF88] text-black font-black text-xs uppercase hover:bg-white transition-colors"
                  >
                    Attach
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Top Performing Affiliate Links Table */}
          <div className="space-y-3">
            <h3 className="font-bold text-white text-xs uppercase tracking-widest flex items-center gap-2">
              <Tag className="w-4 h-4 text-[#FF4D00]" />
              <span>Top Affiliate Products & Link Performance</span>
            </h3>

            <div className="overflow-x-auto border border-white/10 bg-black">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0F0F0F] border-b border-white/10 text-white/50 font-mono uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Product / Link Label</th>
                    <th className="p-3">Provider</th>
                    <th className="p-3">Clicks</th>
                    <th className="p-3">Est. Revenue</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white">
                  {posts.flatMap((p) => p.affiliateLinks || []).map((link, idx) => (
                    <tr key={link.id || idx} className="hover:bg-white/5">
                      <td className="p-3 font-semibold text-white">{link.label}</td>
                      <td className="p-3 uppercase text-[10px] font-mono text-[#FF4D00]">{link.provider}</td>
                      <td className="p-3 font-mono">{link.clicks || 0}</td>
                      <td className="p-3 font-mono text-[#00FF88] font-bold">
                        ${(link.estimatedRevenue || 0).toFixed(2)}
                      </td>
                      <td className="p-3">
                        <a
                          href={link.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FF4D00] hover:text-white flex items-center gap-1 font-mono text-[10px] uppercase"
                        >
                          <span>Test Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tipping & Support Widget Config */}
          <div className="p-4 bg-black border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 text-white">
                <Coffee className="w-5 h-5 text-[#FF4D00]" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">Fan Tip Jar & Tipping Button</h4>
                <p className="text-[10px] text-white/50 font-mono">Allow readers to support your reviews via Buy Me a Coffee</p>
              </div>
            </div>
            <button
              onClick={() => setTippingEnabled(!tippingEnabled)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-colors ${
                tippingEnabled
                  ? 'bg-[#FF4D00] text-black border-[#FF4D00]'
                  : 'bg-white/10 text-white/40 border-white/10'
              }`}
            >
              {tippingEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-black flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white/10 hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Close Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};

