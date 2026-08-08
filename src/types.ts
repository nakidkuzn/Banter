export type PostType = 'review' | 'commentary' | 'banter';

export type Category =
  | 'Music & Vinyl Releases'
  | 'Hip Hop Reviews'
  | 'Pop Culture & Media'
  | 'Consumer Gear & Products'
  | 'Culture & Opinions'
  | 'Tech & Gadgets'
  | 'Hot Takes & Memes';

export interface AffiliateLink {
  id: string;
  label: string;
  originalUrl: string;
  affiliateUrl: string;
  provider: 'amazon' | 'shareasale' | 'bestbuy' | 'custom';
  price?: string;
  clicks: number;
  conversions: number;
  estimatedRevenue: number;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  userVotedOptionId?: string;
}

export interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  createdAt: string;
  likes: number;
}

export interface Post {
  id: string;
  title: string;
  type: PostType;
  category: Category;
  content: string;
  excerpt: string;
  rating?: number; // 0 to 5
  verdict?: string; // e.g. "Instant Classic", "Overhyped", "Worth Every Penny"
  pros?: string[];
  cons?: string[];
  coverImage?: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    bio: string;
  };
  createdAt: string;
  readTime?: string;
  affiliateLinks: AffiliateLink[];
  ftcDisclaimer?: string;
  sponsorName?: string;
  sponsorUrl?: string;
  poll?: Poll;
  reactions: {
    fire: number;
    brain: number;
    laugh: number;
    trash: number;
  };
  userReactions?: Record<string, boolean>;
  comments: Comment[];
  views: number;
  shares: number;
  bookmarked?: boolean;
}

export interface AnalyticsSummary {
  totalPosts: number;
  totalViews: number;
  totalAffiliateClicks: number;
  totalEstimatedRevenue: number;
  ctrPercentage: number;
  topPerformingPosts: {
    id: string;
    title: string;
    type: PostType;
    clicks: number;
    revenue: number;
  }[];
}

export interface SocialShareConfig {
  post: Post;
  platform: 'twitter' | 'threads' | 'instagram' | 'linkedin' | 'facebook';
  customCaption?: string;
  includeAffiliateLink: boolean;
  utmSource?: string;
}
