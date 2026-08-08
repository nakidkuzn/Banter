import React, { useState } from 'react';
import { Post, AffiliateLink } from '../types';
import {
  Star,
  Flame,
  MessageSquare,
  Share2,
  ExternalLink,
  ShieldAlert,
  ThumbsUp,
  Bookmark,
  CheckCircle2,
  Tag,
  DollarSign,
  TrendingUp,
  Sparkles,
  BarChart2
} from 'lucide-react';

interface PostCardProps {
  post: Post;
  onSelectPost: (post: Post) => void;
  onOpenShareModal: (post: Post) => void;
  onAffiliateClick: (postId: string, link: AffiliateLink) => void;
  onReact: (postId: string, reactionType: 'fire' | 'brain' | 'laugh' | 'trash') => void;
  onVotePoll?: (postId: string, optionId: string) => void;
  onBookmarkToggle?: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onSelectPost,
  onOpenShareModal,
  onAffiliateClick,
  onReact,
  onVotePoll,
  onBookmarkToggle
}) => {
  const [selectedPollOption, setSelectedPollOption] = useState<string | undefined>(post.poll?.userVotedOptionId);

  const handlePollVote = (optionId: string) => {
    setSelectedPollOption(optionId);
    if (onVotePoll) {
      onVotePoll(post.id, optionId);
    }
  };

  return (
    <article className="bg-[#0F0F0F] border border-white/10 rounded-none hover:border-white/20 transition-all duration-200 flex flex-col group p-6 sm:p-7">
      
      {/* Card Header & Author info */}
      <div className="pb-4 border-b border-white/10 flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-white/20 p-[2px] bg-gradient-to-tr from-[#FF4D00] to-[#FF0080] shrink-0">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs uppercase tracking-wider">{post.author.name}</span>
              <span className="text-[10px] text-[#FF4D00] font-mono">{post.author.handle}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white/40 font-mono italic mt-0.5">
              <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
              {post.readTime && (
                <>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Post Type & Category Badge */}
        <div className="flex flex-col items-end gap-1">
          {post.type === 'review' && (
            <span className="px-3 py-1 bg-[#FF4D00] text-black text-[10px] font-black uppercase tracking-wider">
              REVIEW {post.rating && `(${post.rating}/5)`}
            </span>
          )}
          {post.type === 'commentary' && (
            <span className="px-3 py-1 bg-[#FF0080] text-white text-[10px] font-black uppercase tracking-wider">
              EDITORIAL
            </span>
          )}
          {post.type === 'banter' && (
            <span className="px-3 py-1 bg-white text-black text-[10px] font-black uppercase tracking-wider">
              HOT TAKE
            </span>
          )}
          <span className="text-[10px] uppercase tracking-widest text-[#FF4D00] font-medium">{post.category}</span>
        </div>
      </div>

      {/* Optional Cover Image */}
      {post.coverImage && (
        <div
          onClick={() => onSelectPost(post)}
          className="relative h-52 sm:h-60 w-full overflow-hidden cursor-pointer bg-black mb-5 border border-white/10"
        >
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 hover:opacity-100"
          />
          {post.verdict && (
            <div className="absolute bottom-3 left-3 right-3 bg-black/90 backdrop-blur-md border border-[#FF4D00] text-white px-3 py-2 text-xs font-bold shadow-xl flex items-center justify-between">
              <span className="text-[#FF4D00] font-mono text-[11px] uppercase tracking-wider">{post.verdict}</span>
              {post.rating && (
                <div className="flex items-center text-[#FF4D00]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < Math.floor(post.rating || 0) ? 'fill-current' : 'opacity-20'}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Main Content Body */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="cursor-pointer" onClick={() => onSelectPost(post)}>
          
          <h2 className="text-2xl sm:text-3xl font-serif leading-tight italic font-medium text-white group-hover:text-[#FF4D00] transition-colors mb-3">
            "{post.title}"
          </h2>

          <p className="text-sm leading-relaxed text-white/70 line-clamp-3 mb-4">
            {post.excerpt}
          </p>

          {/* Pros & Cons Preview if Review */}
          {post.type === 'review' && (post.pros || post.cons) && (
            <div className="my-4 p-4 bg-white/5 border border-white/10 text-xs grid grid-cols-1 sm:grid-cols-2 gap-3">
              {post.pros && post.pros.length > 0 && (
                <div>
                  <span className="font-bold text-[#00FF88] uppercase tracking-wider text-[10px] flex items-center gap-1 mb-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> PROS
                  </span>
                  <ul className="text-white/80 space-y-1">
                    {post.pros.slice(0, 2).map((p, idx) => (
                      <li key={idx} className="line-clamp-1">• {p}</li>
                    ))}
                  </ul>
                </div>
              )}
              {post.cons && post.cons.length > 0 && (
                <div>
                  <span className="font-bold text-[#FF0080] uppercase tracking-wider text-[10px] flex items-center gap-1 mb-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" /> CONS
                  </span>
                  <ul className="text-white/80 space-y-1">
                    {post.cons.slice(0, 2).map((c, idx) => (
                      <li key={idx} className="line-clamp-1">• {c}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Interactive Poll Component if Banter */}
          {post.poll && (
            <div className="my-4 p-4 bg-black border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#FF4D00] uppercase tracking-widest">
                <BarChart2 className="w-3.5 h-3.5" />
                <span>COMMUNITY POLL</span>
              </div>
              <p className="text-xs font-semibold text-white">{post.poll.question}</p>

              <div className="space-y-2 pt-1">
                {post.poll.options.map((opt) => {
                  const isVoted = selectedPollOption === opt.id;
                  const totalVotes = post.poll?.totalVotes || 1;
                  const percentage = Math.round((opt.votes / totalVotes) * 100) || 0;

                  return (
                    <button
                      key={opt.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePollVote(opt.id);
                      }}
                      className={`w-full text-left p-2.5 text-xs font-medium border relative overflow-hidden transition-all flex items-center justify-between ${
                        isVoted
                          ? 'border-[#FF4D00] text-white bg-[#FF4D00]/10'
                          : 'border-white/10 text-white/80 hover:border-white/30 bg-white/5'
                      }`}
                    >
                      {/* Vote Progress Bar */}
                      {selectedPollOption && (
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-[#FF4D00]/30 pointer-events-none transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-2">
                        {isVoted && <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4D00]" />}
                        {opt.text}
                      </span>
                      {selectedPollOption && (
                        <span className="relative z-10 font-mono text-[10px] text-[#FF4D00] font-bold">{percentage}%</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="text-[10px] text-white/40 text-right pt-1 font-mono italic">
                {post.poll.totalVotes} votes cast
              </div>
            </div>
          )}

        </div>

        {/* Affiliate Buy Links Section (MONETIZATION HUB) */}
        {post.affiliateLinks && post.affiliateLinks.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <span className="text-[10px] font-bold text-[#FF4D00] uppercase tracking-widest flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" /> Tracked Monetization Active
              </span>
              <span className="text-[10px] font-mono text-[#00FF88] flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-[#00FF88]" />
                {post.affiliateLinks.reduce((acc, l) => acc + (l.clicks || 0), 0)} clicks
              </span>
            </div>

            <div className="space-y-2">
              {post.affiliateLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between gap-4 bg-white/5 border border-white/10 p-3 hover:border-white/30 transition-colors"
                >
                  <div className="w-8 h-8 bg-[#FF4D00] flex items-center justify-center shrink-0 text-black">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-[10px] uppercase font-bold text-[#FF4D00] tracking-wider">Affiliate Deal</span>
                    <span className="text-xs truncate font-mono text-white/90">{link.label}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAffiliateClick(post.id, link);
                    }}
                    className="ml-auto bg-white text-black px-3 py-1.5 text-xs font-black uppercase tracking-tighter hover:bg-[#FF4D00] transition-colors shrink-0"
                  >
                    Track
                  </button>
                </div>
              ))}
            </div>

            {/* FTC Disclosure */}
            {post.ftcDisclaimer && (
              <p className="mt-2 text-[9px] text-white/40 italic font-mono leading-tight">
                {post.ftcDisclaimer}
              </p>
            )}
          </div>
        )}

        {/* Footer Reactions & Share Toolbar */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
          
          {/* Reaction Counters */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onReact(post.id, 'fire')}
              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white text-xs flex items-center gap-1 border border-white/10 transition-colors font-mono"
              title="Hot Take / Fire"
            >
              <span>🔥</span>
              <span className="text-[11px]">{post.reactions.fire}</span>
            </button>

            <button
              onClick={() => onReact(post.id, 'brain')}
              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white text-xs flex items-center gap-1 border border-white/10 transition-colors font-mono"
              title="Smart Commentary"
            >
              <span>🧠</span>
              <span className="text-[11px]">{post.reactions.brain}</span>
            </button>

            <button
              onClick={() => onReact(post.id, 'laugh')}
              className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white text-xs flex items-center gap-1 border border-white/10 transition-colors font-mono"
              title="Banter / Hilarious"
            >
              <span>😂</span>
              <span className="text-[11px]">{post.reactions.laugh}</span>
            </button>
          </div>

          {/* Social Share & Comments Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectPost(post)}
              className="px-3 py-1 text-xs font-medium text-white/70 hover:text-white flex items-center gap-1 font-mono transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#FF4D00]" />
              <span>{post.comments?.length || 0}</span>
            </button>

            {/* Seamless Social Share Button */}
            <button
              onClick={() => onOpenShareModal(post)}
              className="px-3 py-1 bg-white/10 hover:bg-[#FF4D00] hover:text-black text-white border border-white/20 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all"
              title="Share with multi-platform studio & UTM affiliate link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

        </div>

      </div>

    </article>
  );
};

