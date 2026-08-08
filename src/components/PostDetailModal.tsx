import React, { useState } from 'react';
import { Post, Comment, AffiliateLink } from '../types';
import {
  X,
  Star,
  Flame,
  MessageSquare,
  Share2,
  ExternalLink,
  ShieldAlert,
  CheckCircle2,
  Tag,
  DollarSign,
  TrendingUp,
  ThumbsUp,
  Send,
  Bookmark,
  Calendar,
  Clock
} from 'lucide-react';

interface PostDetailModalProps {
  post: Post | null;
  onClose: () => void;
  onOpenShareModal: (post: Post) => void;
  onAffiliateClick: (postId: string, link: AffiliateLink) => void;
  onReact: (postId: string, reactionType: 'fire' | 'brain' | 'laugh' | 'trash') => void;
  onAddComment: (postId: string, commentText: string) => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  onClose,
  onOpenShareModal,
  onAffiliateClick,
  onReact,
  onAddComment
}) => {
  if (!post) return null;

  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(post.id, newComment.trim());
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#0F0F0F] border border-white/10 max-w-3xl w-full my-auto shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Sticky Top Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#0F0F0F] flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black px-3 py-1 bg-[#FF4D00] text-black uppercase tracking-wider">
              {post.type} • {post.category}
            </span>
            {post.rating && (
              <span className="text-[10px] font-bold px-2.5 py-1 bg-white text-black font-mono flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" /> {post.rating}/5
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenShareModal(post)}
              className="px-3 py-1.5 bg-[#FF4D00] text-black text-xs font-black uppercase tracking-wider flex items-center gap-1.5 hover:bg-white transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 bg-white/10 text-white hover:bg-white hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Header Title & Author */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif italic font-medium text-white leading-tight mb-4">
              "{post.title}"
            </h1>

            <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-full border border-white/20 p-[2px] bg-gradient-to-tr from-[#FF4D00] to-[#FF0080] shrink-0">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm uppercase tracking-wider">{post.author.name}</h4>
                    <p className="text-xs text-[#FF4D00] font-mono">{post.author.handle}</p>
                  </div>
                  <div className="text-right text-[10px] text-white/40 font-mono space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    {post.readTime && (
                      <div className="flex items-center gap-1 text-white/30">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative overflow-hidden border border-white/10 bg-black">
              <img src={post.coverImage} alt={post.title} className="w-full h-64 sm:h-80 object-cover opacity-90" />
              {post.verdict && (
                <div className="absolute bottom-3 left-3 right-3 bg-black/95 border border-[#FF4D00] text-white p-3 text-xs font-bold shadow-xl">
                  <span className="text-[#FF4D00] font-mono uppercase tracking-widest block mb-0.5">Verdict</span>
                  {post.verdict}
                </div>
              )}
            </div>
          )}

          {/* Monetized Affiliate Callout Box (Top Prominent Placement) */}
          {post.affiliateLinks && post.affiliateLinks.length > 0 && (
            <div className="p-5 bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#FF4D00] flex items-center gap-1.5 uppercase tracking-wider">
                  <DollarSign className="w-4 h-4" /> Tracked Monetization Active
                </span>
                <span className="text-[10px] text-[#00FF88] font-mono">
                  {post.affiliateLinks.reduce((acc, l) => acc + (l.clicks || 0), 0)} Clicks Tracked
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {post.affiliateLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => onAffiliateClick(post.id, link)}
                    className="p-3 bg-black border border-white/10 hover:border-[#FF4D00] text-white text-xs font-bold flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Tag className="w-4 h-4 text-[#FF4D00] flex-shrink-0" />
                      <span className="truncate">{link.label}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {link.price && (
                        <span className="text-[#00FF88] bg-white/10 px-2 py-0.5 text-[11px] font-mono">
                          {link.price}
                        </span>
                      )}
                      <ExternalLink className="w-4 h-4 text-[#FF4D00]" />
                    </div>
                  </button>
                ))}
              </div>

              {post.ftcDisclaimer && (
                <p className="text-[10px] text-white/40 italic font-mono">
                  {post.ftcDisclaimer}
                </p>
              )}
            </div>
          )}

          {/* Pros & Cons Section if Review */}
          {(post.pros || post.cons) && (
            <div className="p-4 bg-white/5 border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {post.pros && (
                <div>
                  <h4 className="font-bold text-[#00FF88] text-xs flex items-center gap-1.5 mb-2 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" /> PROS
                  </h4>
                  <ul className="space-y-1.5 text-xs text-white/80 font-mono">
                    {post.pros.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#00FF88] font-bold">•</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {post.cons && (
                <div>
                  <h4 className="font-bold text-[#FF0080] text-xs flex items-center gap-1.5 mb-2 uppercase tracking-wider">
                    <ShieldAlert className="w-4 h-4" /> CONS
                  </h4>
                  <ul className="space-y-1.5 text-xs text-white/80 font-mono">
                    {post.cons.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#FF0080] font-bold">•</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Main Full Article Body */}
          <div className="text-white/80 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans">
            {post.content}
          </div>

          {/* Reaction Bar */}
          <div className="p-4 bg-white/5 border border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold text-white/60 uppercase tracking-wider">Reactions:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onReact(post.id, 'fire')}
                className="px-3 py-1.5 bg-black hover:bg-[#FF4D00] hover:text-black text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-white/10"
              >
                <span>🔥 Fire</span>
                <span className="font-mono text-[#FF4D00]">{post.reactions.fire}</span>
              </button>
              <button
                onClick={() => onReact(post.id, 'brain')}
                className="px-3 py-1.5 bg-black hover:bg-[#FF0080] hover:text-white text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-white/10"
              >
                <span>🧠 Smart</span>
                <span className="font-mono text-[#FF0080]">{post.reactions.brain}</span>
              </button>
              <button
                onClick={() => onReact(post.id, 'laugh')}
                className="px-3 py-1.5 bg-black hover:bg-white hover:text-black text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-white/10"
              >
                <span>😂 Banter</span>
                <span className="font-mono">{post.reactions.laugh}</span>
              </button>
            </div>
          </div>

          {/* Visitor Comments Thread */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="font-bold text-white text-sm flex items-center gap-2 uppercase tracking-wider">
              <MessageSquare className="w-4 h-4 text-[#FF4D00]" />
              <span>Community Comments ({post.comments?.length || 0})</span>
            </h3>

            {/* Add Comment Form */}
            <form onSubmit={handleCommentSubmit} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Join the banter or leave feedback..."
                className="flex-1 px-4 py-2 bg-black border border-white/10 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#FF4D00]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#FF4D00] text-black font-black uppercase text-xs flex items-center gap-1 hover:bg-white transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>

            {/* List of Comments */}
            <div className="space-y-2.5">
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <div key={comment.id} className="p-3 bg-white/5 border border-white/10 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white uppercase">{comment.author}</span>
                      <span className="text-[10px] text-white/40 font-mono">{comment.createdAt}</span>
                    </div>
                    <p className="text-white/80 leading-relaxed">{comment.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-white/40 text-xs italic font-mono">
                  No comments yet. Be the first to start the banter!
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

