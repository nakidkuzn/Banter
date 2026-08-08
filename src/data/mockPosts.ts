import { Post } from '../types';

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'Kendrick Lamar "GNX" 2xLP Vinyl Review: Masterclass in West Coast Loyalty',
    type: 'review',
    category: 'Hip Hop Reviews',
    excerpt: 'The 2xLP 180g blood-orange vinyl pressing of GNX finally landed on our turntable. From Mustard beatcraft to immaculate vinyl audio dynamics, here is our unfiltered breakdown.',
    content: `When Kendrick Lamar dropped *GNX* without warning, the hip-hop world stopped. But for vinyl heads and audiophiles, the true test begins when the needle drops on the physical wax. We secured the limited edition 2xLP translucent orange pressing to test dynamic range, bass response, and sleeve packaging.

### Sound Quality & Mixing
Pressed at 45 RPM across two heavy 180g discs, the low-end frequency separation is breathtaking. Mustard's signature West Coast basslines rumble without distorting the crisp snare transients. Tracks like "wacchedmeflip" and "squabble up" sound strikingly warmer and punchier on analog groove playback compared to compressed 320kbps Spotify streams.

### Packaging & Collector Value
The heavy gatefold sleeve features matte-finish photography of the iconic Buick GNX, custom printed inner sleeves with full lyric sheets, and a high-gloss obi-strip. Zero surface noise out of the shrink-wrap.

### The Verdict
*GNX* isn't just one of the year's top hip-hop releases—it is a mandatory piece of wax for any serious rap collector's crate.`,
    rating: 4.9,
    verdict: 'VERDICT: Essential Hip-Hop Vinyl Pressing',
    pros: [
      'Warm analog master with incredible sub-bass presence',
      'Flawless 45 RPM 180g double vinyl pressing',
      'Gorgeous matte gatefold art with custom obi-strip',
      'No surface noise or factory warpage'
    ],
    cons: [
      'Discs fit tight in inner sleeves (recommend anti-static rice paper sleeves)',
      'High demand causes frequent stock sell-outs'
    ],
    coverImage: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Ricky EZ',
      handle: '@RickyReviews',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      bio: 'Unfiltered reviewer, vinyl collector & hip-hop purist.'
    },
    createdAt: '2026-08-06T14:20:00Z',
    readTime: '5 min read',
    affiliateLinks: [
      {
        id: 'aff-1',
        label: 'Buy Kendrick Lamar "GNX" 2xLP on Amazon ($34.99)',
        originalUrl: 'https://www.amazon.com/dp/B0CXGNXVINYL',
        affiliateUrl: 'https://amazon.com/dp/B0CXGNXVINYL?tag=banterrevs-20&linkCode=osi',
        provider: 'amazon',
        price: '$34.99',
        clicks: 412,
        conversions: 35,
        estimatedRevenue: 385.00
      },
      {
        id: 'aff-2',
        label: 'Get Exclusive Color Wax on Vinyl Me, Please ($39.99)',
        originalUrl: 'https://www.vinylmeplease.com',
        affiliateUrl: 'https://vinylmeplease.com/?ref=banterrevs_gnx',
        provider: 'shareasale',
        price: '$39.99',
        clicks: 230,
        conversions: 19,
        estimatedRevenue: 199.50
      }
    ],
    ftcDisclaimer: 'FTC Disclosure: When you purchase vinyl through our affiliate links, we earn a small commission that keeps our turntable spinning at no extra cost to you.',
    reactions: {
      fire: 310,
      brain: 142,
      laugh: 28,
      trash: 4
    },
    comments: [
      {
        id: 'c1',
        author: 'Marcus "Waxhead" T.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        content: 'The 45 RPM pressing makes a HUGE difference on "tv off". My subwoofers literally shook the floorboards!',
        createdAt: '3 hours ago',
        likes: 19
      },
      {
        id: 'c2',
        author: 'CrateDigger99',
        content: 'Mustard produced some of his best work on this record. Glad to see it getting the proper vinyl treatment.',
        createdAt: '6 hours ago',
        likes: 11
      }
    ],
    views: 4820,
    shares: 210,
    bookmarked: true
  },
  {
    id: 'post-2',
    title: 'Audio-Technica AT-LP120XUSB Review: The Undisputed King of Mid-Range Turntables',
    type: 'review',
    category: 'Music & Vinyl Releases',
    excerpt: 'Direct-drive motor, switchable phono preamp, and anti-skate control. Why the LP120X remains the gold standard starter deck for vinyl enthusiasts.',
    content: `If you are stepping up from a cheap suitcase record player that chews through your valuable vinyl grooves, the Audio-Technica AT-LP120XUSB is almost universally recommended as the ultimate gateway to true hi-fi analog sound.

### Build & Direct Drive Precision
Unlike flimsy belt-driven entry decks, the LP120X features a DC servo direct-drive motor that hits 33-1/3, 45, and 78 RPM with rock-solid rotational accuracy. The die-cast aluminum platter with felt mat damps vibrations cleanly.

### Preamp & Cartridge
Out of the box, it comes pre-mounted with the excellent AT-VM95E Dual Magnet phono cartridge. The elliptical diamond stylus tracks grooves with clarity and minimal inner-groove distortion. The built-in switchable phono preamp allows you to plug directly into active powered speakers or an external audiophile receiver.

### The Verdict
At under $350, nothing comes close to the LP120X's combination of upgradeability, durability, and rich sound performance.`,
    rating: 4.8,
    verdict: 'VERDICT: Must-Buy Starter & Mid-Tier Turntable',
    pros: [
      'Direct-drive motor provides pitch-perfect rotational stability',
      'Includes great AT-VM95E cartridge with replaceable stylus options',
      'Built-in switchable phono preamp for instant setup',
      'USB output for digitizing rare vinyl records to FLAC/MP3'
    ],
    cons: [
      'Included felt mat collects static dust (upgrade to acrylic or cork)',
      'Full manual tonearm return (no auto-shutoff)'
    ],
    coverImage: 'https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Ricky EZ',
      handle: '@RickyReviews',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      bio: 'Unfiltered reviewer, vinyl collector & hip-hop purist.'
    },
    createdAt: '2026-08-05T11:15:00Z',
    readTime: '6 min read',
    affiliateLinks: [
      {
        id: 'aff-3',
        label: 'Audio-Technica AT-LP120XUSB on Amazon ($349.00)',
        originalUrl: 'https://amazon.com/audio-technica-lp120xusb',
        affiliateUrl: 'https://amazon.com/dp/B07N3W8B5M?tag=banterrevs-20',
        provider: 'amazon',
        price: '$349.00',
        clicks: 580,
        conversions: 24,
        estimatedRevenue: 501.60
      },
      {
        id: 'aff-4',
        label: 'Turntable Lab Custom LP120X Edition ($349.00)',
        originalUrl: 'https://www.turntablelab.com',
        affiliateUrl: 'https://turntablelab.com/?aff=banterrevs_lp120x',
        provider: 'bestbuy',
        price: '$349.00',
        clicks: 290,
        conversions: 18,
        estimatedRevenue: 314.10
      }
    ],
    ftcDisclaimer: 'FTC Disclosure: We earn affiliate fees from qualifying purchases made through Amazon & Turntable Lab links.',
    reactions: {
      fire: 245,
      brain: 188,
      laugh: 12,
      trash: 2
    },
    comments: [
      {
        id: 'c3',
        author: 'AudioPhile_Dave',
        content: 'Swapped the stock stylus for the VMN95EN nude elliptical and it unlocked even more detail. Greatest table for the money!',
        createdAt: '1 day ago',
        likes: 27
      }
    ],
    views: 6120,
    shares: 340
  },
  {
    id: 'post-3',
    title: 'Buying $40 vinyl records just to hang them on the wall without owning a turntable is a felony',
    type: 'banter',
    category: 'Hot Takes & Memes',
    excerpt: 'Vinyl spinning vs aesthetic wall art decor. Plus: Vote on the ultimate vinyl habit crime!',
    content: `We need to talk about the epidemic of people buying limited Taylor Swift, Tyler The Creator, and Frank Ocean vinyl variants just to nail the jackets to their bedroom wall without ever dropping a needle on them. 

Vinyl is meant to be spun, felt, and heard through speakers! If you just want 12x12 art prints, buy poster prints for $8 and leave the wax for people with turntables. What is your ultimate vinyl habit crime?`,
    author: {
      name: 'Ricky EZ',
      handle: '@RickyReviews',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      bio: 'Unfiltered reviewer, vinyl collector & hip-hop purist.'
    },
    createdAt: '2026-08-07T11:00:00Z',
    poll: {
      id: 'poll-1',
      question: 'Which vinyl record habit causes maximum physical pain?',
      options: [
        { id: 'opt-1', text: 'Framing unopened records on wall with tape', votes: 412 },
        { id: 'opt-2', text: 'Playing rare $150 wax on a $35 Crosley suitcase', votes: 520 },
        { id: 'opt-3', text: 'Stacking records horizontally in a heavy pile', votes: 298 },
        { id: 'opt-4', text: 'Touching the vinyl grooves with oily fingers', votes: 384 }
      ],
      totalVotes: 1614
    },
    affiliateLinks: [
      {
        id: 'aff-5',
        label: 'Spin-Clean Vinyl Record Washer Kit ($79.99)',
        originalUrl: 'https://amazon.com/spin-clean-record-washer',
        affiliateUrl: 'https://amazon.com/dp/B002UKSZUU?tag=banterrevs-20',
        provider: 'amazon',
        price: '$79.99',
        clicks: 640,
        conversions: 52,
        estimatedRevenue: 249.56
      }
    ],
    ftcDisclaimer: 'FTC Disclaimer: Includes affiliate link for Spin-Clean washer because dirty grooves ruin good music.',
    reactions: {
      fire: 420,
      brain: 85,
      laugh: 680,
      trash: 15
    },
    comments: [
      {
        id: 'c4',
        author: 'AnalogSam',
        content: 'Playing a rare record on a suitcase needle with 6 grams of tracking force is literally vinyl murder!',
        createdAt: '45 mins ago',
        likes: 42
      }
    ],
    views: 7800,
    shares: 512
  },
  {
    id: 'post-4',
    title: 'MF DOOM "Operation: Doomsday" 20th Anniversary Box Set Review',
    type: 'review',
    category: 'Hip Hop Reviews',
    excerpt: 'Double picture disc vinyl, metallic foil jacket, and remastered audio tape. Is this the ultimate physical tribute to Hip-Hop\'s ultimate villain?',
    content: `ALL CAPS WHEN YOU SPELL THE MAN'S NAME. Daniel Dumile's debut masterpiece *Operation: Doomsday* remains the cornerstone of underground hip-hop culture. The 20th Anniversary Box Set reissue from Get On Down and Gasdrawls promises premium archival presentation for die-hard fans.

### Production & Remastering
Rhymes like "Doomsday", "Rhymes Like Dope", and "Gas Drawls" hit with raw, sampling warmth. The cassette and vinyl transfers preserve the crunchy SP-1200 drum samples and vintage cartoon interludes without harsh artificial remastering compression.

### Box Set Content
The set includes two heavy picture disc vinyls featuring the iconic metal mask artwork, a metallic silver embossed outer box, a 32-page booklet with rare studio session photos, and a custom poster.

### The Verdict
An essential centerpiece for any hip-hop library and a fitting monument to the Metal Face Villain.`,
    rating: 5.0,
    verdict: 'VERDICT: Flawless Underground Hip-Hop Masterpiece',
    pros: [
      'Immaculate metallic foil packaging & 32-page archival booklet',
      'Iconic picture disc art looks incredible spinning on table',
      'Raw, uncompressed SP-1200 drum sample warmth'
    ],
    cons: [
      'Picture discs have minor ambient surface noise compared to standard black wax'
    ],
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Ricky EZ',
      handle: '@RickyReviews',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      bio: 'Unfiltered reviewer, vinyl collector & hip-hop purist.'
    },
    createdAt: '2026-08-04T16:45:00Z',
    readTime: '4 min read',
    affiliateLinks: [
      {
        id: 'aff-6',
        label: 'MF DOOM Operation: Doomsday Vinyl on Amazon ($42.99)',
        originalUrl: 'https://amazon.com/mf-doom-operation-doomsday',
        affiliateUrl: 'https://amazon.com/dp/B000000DOOM?tag=banterrevs-20',
        provider: 'amazon',
        price: '$42.99',
        clicks: 380,
        conversions: 31,
        estimatedRevenue: 266.53
      }
    ],
    ftcDisclaimer: 'FTC Disclosure: We earn affiliate commissions from Amazon and partner music retailers.',
    reactions: {
      fire: 380,
      brain: 210,
      laugh: 18,
      trash: 1
    },
    comments: [
      {
        id: 'c5',
        author: 'Villain_Fanatic',
        content: 'Got mine last week. The metallic sleeve in person is breathtaking. RIP DOOM!',
        createdAt: '2 days ago',
        likes: 38
      }
    ],
    views: 4190,
    shares: 195
  },
  {
    id: 'post-5',
    title: 'Breville Barista Touch Impress Review: Is a $1,499 Home Espresso Machine Worth It?',
    type: 'review',
    category: 'Consumer Gear & Products',
    excerpt: 'Assisted tamping, auto microfoam milk texturing, and precision PID heating. Is this the dream countertop coffee machine for vinyl & music sessions?',
    content: `Great music sessions demand great coffee. The Breville Barista Touch Impress promises cafe-quality espresso drinks with zero learning curve thanks to automated dosage, assisted tamping, and intelligent milk frothing.

### Espresso Quality & Extraction
The built-in Baratza European precision burr grinder delivers fresh grounds directly into the portafilter. The Impress puck system automatically calculates dosage and provides a perfect 22lb tamp with a 7-degree barista twist, eliminating channeling errors.

### Auto MilQ Microfoam
Whether using dairy, oat, almond, or soy milk, the Auto MilQ steam wand adjusts temperature and air pressure to create silky latte art microfoam automatically.

### The Verdict
If you spend $6-$8 daily at specialty cafes, the Barista Touch Impress pays for itself in less than a year while elevating your morning routine.`,
    rating: 4.7,
    verdict: 'VERDICT: Home Barista Countertop Perfection',
    pros: [
      'Assisted tamping lever eliminates messy puck prep & channeling',
      'Auto MilQ textures oat milk to silky latte-art perfection',
      'Intuitive touchscreen with custom drink presets',
      'ThermoJet 3-second instant heat-up time'
    ],
    cons: [
      'Significant upfront investment ($1,499)',
      'Requires regular water filter replacements and group head cleaning'
    ],
    coverImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Ricky EZ',
      handle: '@RickyReviews',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      bio: 'Unfiltered reviewer, vinyl collector & hip-hop purist.'
    },
    createdAt: '2026-08-03T10:00:00Z',
    readTime: '5 min read',
    affiliateLinks: [
      {
        id: 'aff-7',
        label: 'Breville Barista Touch Impress on Amazon ($1,499.95)',
        originalUrl: 'https://amazon.com/breville-barista-touch-impress',
        affiliateUrl: 'https://amazon.com/dp/B0BTOUCH?tag=banterrevs-20',
        provider: 'amazon',
        price: '$1,499.95',
        clicks: 210,
        conversions: 8,
        estimatedRevenue: 479.98
      },
      {
        id: 'aff-8',
        label: 'Williams Sonoma Special Bundle Deal',
        originalUrl: 'https://www.williams-sonoma.com',
        affiliateUrl: 'https://williams-sonoma.com/?aff=banterrevs_breville',
        provider: 'shareasale',
        price: '$1,499.95',
        clicks: 110,
        conversions: 4,
        estimatedRevenue: 239.99
      }
    ],
    ftcDisclaimer: 'FTC Disclosure: We earn an affiliate commission when you order espresso equipment using our links.',
    reactions: {
      fire: 195,
      brain: 140,
      laugh: 22,
      trash: 6
    },
    comments: [
      {
        id: 'c6',
        author: 'EspressoAddict',
        content: 'Upgraded from a basic Bambino to this. The automated tamping lever is absolute black magic.',
        createdAt: '3 days ago',
        likes: 15
      }
    ],
    views: 3500,
    shares: 140
  },
  {
    id: 'post-6',
    title: 'Why 90s Hip Hop Album Covers on 12-Inch Wax Will Never Be Beaten by Spotify Thumbnails',
    type: 'commentary',
    category: 'Pop Culture & Media',
    excerpt: 'From Raekwon\'s Only Built 4 Cuban Linx purple tape to Ol\' Dirty Bastard\'s food stamp card: how 12x12 vinyl sleeve artwork turned rap albums into legendary pop culture artifacts.',
    content: `When you stream a song on a smartphone, the album artwork is reduced to a tiny 1-inch square pixel thumbnail on a locked glass screen. But in the 1990s, opening a brand new 12-inch vinyl record was a sacred multi-sensory ritual.

### The Power of the 12x12 Canvas
Albums like *Liquid Swords*, *Illmatic*, *The Infamous*, and *Ready to Die* weren't just musical masterworks—their cover art defined streetwear aesthetics, urban photography, and visual graphic language for generations. 

Holding a physical 12x12 cardboard jacket, reading liner notes, checking producer credits, and admiring gatefold artwork creates an emotional bond with the music that digital streaming algorithms simply cannot replicate.

### The Vinyl Renaissance
This is precisely why vinyl record sales have hit 17 consecutive years of growth. Listeners aren't just buying analog sound—they are reclaiming physical ownership of pop culture history.`,
    coverImage: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Ricky EZ',
      handle: '@RickyReviews',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      bio: 'Unfiltered reviewer, vinyl collector & hip-hop purist.'
    },
    createdAt: '2026-08-02T15:30:00Z',
    readTime: '5 min read',
    affiliateLinks: [
      {
        id: 'aff-9',
        label: 'Recommended Book: Hip Hop Raised Me (Hardcover)',
        originalUrl: 'https://amazon.com/hip-hop-raised-me',
        affiliateUrl: 'https://amazon.com/dp/0500518981?tag=banterrevs-20',
        provider: 'amazon',
        price: '$35.00',
        clicks: 175,
        conversions: 16,
        estimatedRevenue: 33.60
      }
    ],
    ftcDisclaimer: 'FTC Disclosure: We earn small affiliate fees when you purchase recommended books through our links.',
    reactions: {
      fire: 312,
      brain: 290,
      laugh: 14,
      trash: 2
    },
    comments: [
      {
        id: 'c7',
        author: 'WuTangForever',
        content: 'Liquid Swords comic book artwork in 12x12 format is museum-worthy art. Great article!',
        createdAt: '4 days ago',
        likes: 31
      }
    ],
    views: 4900,
    shares: 280
  }
];

// Helper functions for Local Storage & Sync
const STORAGE_KEY = 'banter_reviews_posts_v2';

export function getStoredPosts(): Post[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to parse stored posts', e);
  }
  return INITIAL_POSTS;
}

export function saveStoredPosts(posts: Post[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {
    console.error('Failed to save posts', e);
  }
}

export function computeAnalytics(posts: Post[]) {
  let totalViews = 0;
  let totalClicks = 0;
  let totalEstimatedRevenue = 0;
  const postPerformance: { id: string; title: string; type: Post['type']; clicks: number; revenue: number }[] = [];

  posts.forEach((post) => {
    totalViews += post.views || 0;
    let postClicks = 0;
    let postRev = 0;

    post.affiliateLinks?.forEach((link) => {
      totalClicks += link.clicks || 0;
      totalEstimatedRevenue += link.estimatedRevenue || 0;
      postClicks += link.clicks || 0;
      postRev += link.estimatedRevenue || 0;
    });

    postPerformance.push({
      id: post.id,
      title: post.title,
      type: post.type,
      clicks: postClicks,
      revenue: postRev
    });
  });

  postPerformance.sort((a, b) => b.revenue - a.revenue);

  const ctrPercentage = totalViews > 0 ? Number(((totalClicks / totalViews) * 100).toFixed(2)) : 0;

  return {
    totalPosts: posts.length,
    totalViews,
    totalAffiliateClicks: totalClicks,
    totalEstimatedRevenue: Number(totalEstimatedRevenue.toFixed(2)),
    ctrPercentage,
    topPerformingPosts: postPerformance.slice(0, 5)
  };
}
