import React, { useState, useEffect } from 'react';
import { Post, PostType, Category, AffiliateLink } from './types';
import { getStoredPosts, saveStoredPosts, computeAnalytics } from './data/mockPosts';
import { Navbar } from './components/Navbar';
import { CategoryFilter } from './components/CategoryFilter';
import { PostCard } from './components/PostCard';
import { PostDetailModal } from './components/PostDetailModal';
import { SocialShareModal } from './components/SocialShareModal';
import { AffiliateAnalyticsModal } from './components/AffiliateAnalyticsModal';
import { CreatorStudio } from './components/CreatorStudio';
import { Flame, Sparkles, PlusCircle, TrendingUp, DollarSign, SearchX } from 'lucide-react';

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [viewMode, setViewMode] = useState<'reader' | 'creator'>('reader');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<PostType | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [monetizedOnly, setMonetizedOnly] = useState(false);

  // Active Modals
  const [selectedPostForDetail, setSelectedPostForDetail] = useState<Post | null>(null);
  const [selectedPostForShare, setSelectedPostForShare] = useState<Post | null>(null);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [creatorStudioDefaultType, setCreatorStudioDefaultType] = useState<PostType | undefined>('review');

  // Load initial posts
  useEffect(() => {
    const stored = getStoredPosts();
    setPosts(stored);
  }, []);

  // Save changes to localStorage
  const updatePosts = (newPosts: Post[]) => {
    setPosts(newPosts);
    saveStoredPosts(newPosts);
  };

  const analytics = computeAnalytics(posts);

  // Filtered Posts Logic
  const filteredPosts = posts.filter((post) => {
    if (selectedType !== 'all' && post.type !== selectedType) return false;
    if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
    if (monetizedOnly && (!post.affiliateLinks || post.affiliateLinks.length === 0)) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchExcerpt = post.excerpt.toLowerCase().includes(q);
      const matchCategory = post.category.toLowerCase().includes(q);
      const matchAffiliate = post.affiliateLinks?.some((l) => l.label.toLowerCase().includes(q));
      return matchTitle || matchExcerpt || matchCategory || matchAffiliate;
    }

    return true;
  });

  // Tracked Affiliate Click Handler
  const handleAffiliateClick = async (postId: string, link: AffiliateLink) => {
    // Increment click locally
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const updatedLinks = p.affiliateLinks.map((l) => {
          if (l.id === link.id) {
            const clicks = (l.clicks || 0) + 1;
            const conversions = Math.floor(clicks * 0.08);
            const estRev = Number((conversions * 11.50).toFixed(2));
            return { ...l, clicks, conversions, estimatedRevenue: estRev };
          }
          return l;
        });
        return { ...p, affiliateLinks: updatedLinks };
      }
      return p;
    });

    updatePosts(updated);

    // Call server logger
    try {
      await fetch('/api/affiliate/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          linkId: link.id,
          targetUrl: link.affiliateUrl
        })
      });
    } catch (e) {
      console.error('Failed server affiliate click log', e);
    }

    // Open target link
    window.open(link.affiliateUrl, '_blank', 'noopener,noreferrer');
  };

  // Reactions
  const handleReact = (postId: string, reactionType: 'fire' | 'brain' | 'laugh' | 'trash') => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          reactions: {
            ...p.reactions,
            [reactionType]: (p.reactions[reactionType] || 0) + 1
          }
        };
      }
      return p;
    });
    updatePosts(updated);
  };

  // Poll Vote
  const handleVotePoll = (postId: string, optionId: string) => {
    const updated = posts.map((p) => {
      if (p.id === postId && p.poll) {
        const updatedOptions = p.poll.options.map((opt) => {
          if (opt.id === optionId) {
            return { ...opt, votes: opt.votes + 1 };
          }
          return opt;
        });
        return {
          ...p,
          poll: {
            ...p.poll,
            options: updatedOptions,
            totalVotes: p.poll.totalVotes + 1,
            userVotedOptionId: optionId
          }
        };
      }
      return p;
    });
    updatePosts(updated);
  };

  // Add Comment
  const handleAddComment = (postId: string, commentText: string) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const newC = {
          id: `c-${Date.now()}`,
          author: 'You (Reader)',
          content: commentText,
          createdAt: 'Just now',
          likes: 0
        };
        return { ...p, comments: [newC, ...(p.comments || [])] };
      }
      return p;
    });
    updatePosts(updated);

    // Update detail view post state if open
    if (selectedPostForDetail && selectedPostForDetail.id === postId) {
      const match = updated.find((p) => p.id === postId);
      if (match) setSelectedPostForDetail(match);
    }
  };

  // Attach link from Analytics Modal
  const handleAddAffiliateLinkToPost = (postId: string, linkData: AffiliateLink) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        return { ...p, affiliateLinks: [...(p.affiliateLinks || []), linkData] };
      }
      return p;
    });
    updatePosts(updated);
  };

  // Publish new post
  const handlePublishPost = (newPost: Post) => {
    const updated = [newPost, ...posts];
    updatePosts(updated);
    setViewMode('reader');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCreatorStudio={(type) => {
          setCreatorStudioDefaultType(type);
          setViewMode('creator');
        }}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
        totalRevenue={analytics.totalEstimatedRevenue}
        totalClicks={analytics.totalAffiliateClicks}
      />

      {/* Reader Feed View */}
      {viewMode === 'reader' && (
        <main className="flex-1 pb-16">
          
          {/* Category Filter Toolbar */}
          <CategoryFilter
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            monetizedOnly={monetizedOnly}
            setMonetizedOnly={setMonetizedOnly}
          />

          {/* Featured Header Banner */}
          <section className="bg-black border-b border-white/10 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4D00]/10 border border-[#FF4D00]/30 text-[#FF4D00] text-xs font-bold font-mono uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5 text-[#FF4D00]" />
                  <span>VINYL • HIP HOP • POP CULTURE • CONSUMER GEAR</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white font-serif">
                  Music Reviews, Vinyl Drops & Culture Banter
                </h1>
                <p className="text-white/60 text-xs sm:text-sm max-w-2xl font-mono">
                  Unfiltered album breakdowns, vinyl release pressings, hip hop commentary, and consumer product reviews with verified affiliate buying links.
                </p>
              </div>

              {/* Monetization Quick Stats Card */}
              <div
                onClick={() => setIsAnalyticsOpen(true)}
                className="p-4 bg-[#0F0F0F] border border-[#00FF88]/40 text-left cursor-pointer hover:border-[#00FF88] transition-all shadow-xl max-w-xs w-full flex items-center justify-between gap-4"
              >
                <div>
                  <div className="text-[10px] font-bold text-white/50 uppercase font-mono tracking-wider">Monetization Hub</div>
                  <div className="text-xl font-mono font-extrabold text-[#00FF88] mt-0.5">
                    ${analytics.totalEstimatedRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[10px] text-[#FF4D00] font-mono mt-0.5">
                    {analytics.totalAffiliateClicks} Clicks ({analytics.ctrPercentage}% CTR)
                  </div>
                </div>
                <div className="w-10 h-10 bg-[#00FF88] flex items-center justify-center text-black font-bold">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>
            </div>
          </section>

          {/* Main Feed Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onSelectPost={(p) => setSelectedPostForDetail(p)}
                    onOpenShareModal={(p) => setSelectedPostForShare(p)}
                    onAffiliateClick={handleAffiliateClick}
                    onReact={handleReact}
                    onVotePoll={handleVotePoll}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 px-4 bg-slate-900/60 border border-slate-800 rounded-3xl max-w-md mx-auto space-y-4">
                <SearchX className="w-12 h-12 text-slate-500 mx-auto" />
                <h3 className="text-lg font-bold text-slate-200">No posts found</h3>
                <p className="text-xs text-slate-400">
                  No reviews or banter match your filter criteria. Try clearing your search or category filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedType('all');
                    setSelectedCategory('all');
                    setMonetizedOnly(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

        </main>
      )}

      {/* Creator Studio View */}
      {viewMode === 'creator' && (
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <CreatorStudio
            defaultType={creatorStudioDefaultType}
            onPublishPost={handlePublishPost}
            onCloseStudio={() => setViewMode('reader')}
          />
        </main>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-6 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-500" />
            <span className="font-bold text-slate-300">Banter & Reviews Content Hub</span>
          </div>
          <div className="text-slate-400">
            Monetization Enabled • Affiliate Link Tracking • FTC Compliant • Multi-Platform Sharing
          </div>
        </div>
      </footer>

      {/* Post Detail Modal */}
      {selectedPostForDetail && (
        <PostDetailModal
          post={selectedPostForDetail}
          onClose={() => setSelectedPostForDetail(null)}
          onOpenShareModal={(p) => {
            setSelectedPostForDetail(null);
            setSelectedPostForShare(p);
          }}
          onAffiliateClick={handleAffiliateClick}
          onReact={handleReact}
          onAddComment={handleAddComment}
        />
      )}

      {/* Social Share Modal */}
      {selectedPostForShare && (
        <SocialShareModal
          post={selectedPostForShare}
          onClose={() => setSelectedPostForShare(null)}
        />
      )}

      {/* Affiliate Analytics Modal */}
      {isAnalyticsOpen && (
        <AffiliateAnalyticsModal
          posts={posts}
          onClose={() => setIsAnalyticsOpen(false)}
          onAddAffiliateLinkToPost={handleAddAffiliateLinkToPost}
        />
      )}

    </div>
  );
}

