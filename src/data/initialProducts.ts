/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Apex Mechanical Keyboard',
    description: 'A minimalist 75% hot-swappable mechanical keyboard featuring high-profile aluminum construction, tactile brown switches, and seamless dual-mode wireless connectivity.',
    price: 189,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    rating: 4.8,
    stock: 14,
    features: [
      'Gasket mounted layout with polycarbonate plate',
      'Dual mode 2.4GHz wireless & Bluetooth 5.1',
      'Hot-swappable mechanical switches (Tactile Brown)',
      'Up to 200 hours of continuous battery life'
    ],
    reviews: [
      {
        id: 'rev-1',
        userName: 'Alex Rivers',
        rating: 5,
        comment: 'Absolute masterpiece. The typing feel is incredibly robust, and the acoustic dampening gives it a perfect, clean thock tone.',
        createdAt: '2026-05-15T12:00:00Z'
      },
      {
        id: 'rev-2',
        userName: 'Sophia Chen',
        rating: 4,
        comment: 'Great build quality, connection has been rock solid over Bluetooth. Wish it came with a keycap puller, though.',
        createdAt: '2026-05-18T16:30:00Z'
      }
    ]
  },
  {
    id: 'prod-2',
    name: 'Vanguard Leather Backpack',
    description: 'Engineered for travel and daily commutes, constructed from full-grain vegetable-tanned leather. Fits up to a 16" laptop in a secure tech sleeve.',
    price: 245,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    rating: 4.9,
    stock: 8,
    features: [
      'Premium full-grain vegetable-tanned leather',
      'Shockproof dedicated 16-inch laptop compartment',
      'Water-resistant lining with expandable side pockets',
      'Luggage pass-through strap for frequent flyers'
    ],
    reviews: [
      {
        id: 'rev-3',
        userName: 'Marcus Sterling',
        rating: 5,
        comment: 'Excellent craftsmanship. The leather is thick and smells amazing. It has aged beautifully into a dark amber brown patina already.',
        createdAt: '2026-05-10T09:15:00Z'
      }
    ]
  },
  {
    id: 'prod-3',
    name: 'AeroCuff Noise-Isolating Headphones',
    description: 'Over-ear hybrid active noise cancellation headphones with custom-tuned 40mm beryllium drivers, spatial audio capability, and high-fidelity lossless codecs.',
    price: 320,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    rating: 4.7,
    stock: 6,
    features: [
      'Hybrid active noise cancellation (up to 42dB reduction)',
      'Custom 40mm Beryllium alloy drivers',
      'Bluetooth 5.3 with LDAC, AAC, and aptX Adaptive support',
      'Plush memory foam earcups covered in breathable vegan leather'
    ],
    reviews: [
      {
        id: 'rev-4',
        userName: 'Elena Rostova',
        rating: 5,
        comment: 'Pure elegance. The ANC blocks out almost everything in noisy coffee shops, and the mid-tones are crystal clear.',
        createdAt: '2026-05-12T14:22:00Z'
      }
    ]
  },
  {
    id: 'prod-4',
    name: 'Thermosphere Matte Mug',
    description: 'A double-walled insulated stainless steel ceramic-lined mug that keeps your coffee or cold brew at the optimal temperature for hours.',
    price: 38,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800',
    category: 'Home & Living',
    rating: 4.5,
    stock: 25,
    features: [
      'Shatterproof internal ceramic-fired lining',
      'Double-wall vacuum insulation keeps liquids hot for 6 hours',
      'Splash-resistant sliding premium lid',
      'Ergonomic balance handle with matte textured finish'
    ],
    reviews: [
      {
        id: 'rev-5',
        userName: 'Jordan Lee',
        rating: 4,
        comment: 'Keeps my coffee scorching hot all morning! Love the ceramic core because it does not leave any metallic taste.',
        createdAt: '2026-05-20T08:45:00Z'
      }
    ]
  },
  {
    id: 'prod-5',
    name: 'Helix Ergonomic Desk Chair',
    description: 'Intricately engineered with state-of-the-art auto-weight adjustment lumbar support, breathable weave mesh, and modular 4D adjustable armrests.',
    price: 499,
    image: 'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&q=80&w=800',
    category: 'Home & Living',
    rating: 4.6,
    stock: 5,
    features: [
      'Auto-conforming lumbar zone adapts to spine posture',
      'Highly breathable multi-weave elastomeric mesh',
      'Sync-tilt limiter lock with multiple relaxation angles',
      'High durability nylon casters safe for wood floors'
    ],
    reviews: [
      {
        id: 'rev-6',
        userName: 'Daniel Kim',
        rating: 5,
        comment: 'Completely eliminated my mid-day lower back pain. It is extremely adjustable and holds up great for long working days.',
        createdAt: '2026-05-02T11:10:00Z'
      }
    ]
  },
  {
    id: 'prod-6',
    name: 'Vanguard Leather Wallet',
    description: 'Minimalist front-pocket bifold wallet handcrafted from heavy vegetable tanned saddle leather, built to hold up to 10 cards and cash.',
    price: 65,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    rating: 4.9,
    stock: 12,
    features: [
      'Hand-stitched heavy durable wax thread construct',
      'Unlined natural suede cash sleeve pocket',
      'RFID blocking internal fabric layers',
      'Very slim profile for seamless front pocket wear'
    ],
    reviews: [
      {
        id: 'rev-7',
        userName: 'John Davis',
        rating: 5,
        comment: 'Beautifully minimalist. Craftsmanship is top tier, leather smells wonderful, and fits exactly what I need.',
        createdAt: '2026-05-19T21:40:00Z'
      }
    ]
  },
  {
    id: 'prod-7',
    name: 'Nomad Merino Wool Hoodie',
    description: 'Ultra-soft midweight 100% fine Tasmanian Merino wool hoodie. Naturally temperature-regulating, sweat-wicking, and odor-resistant.',
    price: 135,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    category: 'Apparel',
    rating: 4.7,
    stock: 18,
    features: [
      'Made from 100% long-fiber premium Merino wool',
      'Natural bacterial protection against body odor',
      'Dual direction knit for ultimate movement freedom',
      'Deep adjustable drawcord hood with tailored athletic fit'
    ],
    reviews: []
  },
  {
    id: 'prod-8',
    name: 'Zenith Titanium Flask',
    description: 'Constructed entirely from premium sandblasted medical-grade titanium. Keeps drinks fresh with zero flavor alter characteristics, weighing mere ounces.',
    price: 95,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=800',
    category: 'Outdoor',
    rating: 4.4,
    stock: 5,
    features: [
      '100% biocompatible medical grade titanium body',
      'Super light construct (only 4.2 ounces empty)',
      'Threaded screw lid with internal leakproof silicon seal',
      'Fingerprint resistant matte titanium sandblast'
    ],
    reviews: [
      {
        id: 'rev-8',
        userName: 'Brooke Wilder',
        rating: 4,
        comment: 'Incredibly light and looks spectacular. Barely notice it in my climbing pack. Screwing on the lid has a slight squeak since its metal on metal, but otherwise superb.',
        createdAt: '2026-04-28T10:05:00Z'
      }
    ]
  },
  {
    id: 'prod-9',
    name: 'Kashmiri Pashmina Cashmere Shawl',
    description: 'Hand-woven by master weavers in Kashmir from 100% authentic ultra-fine Changthangi cashmere. Delivers incomparable, weightless warmth, a butter-soft feel, and exquisite hand-embroidered border motifs.',
    price: 340,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    category: 'Apparel',
    rating: 4.9,
    stock: 7,
    features: [
      '100% fine hand-spun cashmere from Changthangi highlands',
      'Artisanal hand-needleworked Sozni embroidery floral design',
      'Feathery-weightless with superior natural insulation values',
      'Includes a premium scent-shield cedar storage chest'
    ],
    reviews: [
      {
        id: 'rev-9',
        userName: 'Ananya Sharma',
        rating: 5,
        comment: 'Absolutely breathtaking! The softness and intricate details are remarkable. A stunning heirloom representation of pure Indian heritage.',
        createdAt: '2026-05-18T10:15:00Z'
      },
      {
        id: 'rev-10',
        userName: 'Elena Rostova',
        rating: 5,
        comment: 'Unbelievably soft and drape is elegant. A beautiful conversation piece that keeps me comfortable in any weather.',
        createdAt: '2026-05-20T14:30:00Z'
      }
    ]
  },
  {
    id: 'prod-10',
    name: 'Mysore Sandalwood & Brass Diffuser',
    description: 'An premium heavyweight solid-cast brass essential oil burner accompanied by rare, authentic sandalwood oil concentrate, ethically obtained from forest plantations in Mysore, India.',
    price: 98,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=800',
    category: 'Home & Living',
    rating: 4.8,
    stock: 12,
    features: [
      'Pure organic steam-distilled Mysore Sandalwood essence',
      'Heavy bespoke solid raw brass candle-warmer basin',
      'Fills large spaces with warm, therapeutic woody notes for up to 24 hours',
      'Delivered in an exquisite velvet-lined hand-carved mahogany casket'
    ],
    reviews: [
      {
        id: 'rev-11',
        userName: 'Arjun Verma',
        rating: 5,
        comment: 'Beautifully soothing. Keeps my home office smelling rich and earthy, reminiscent of antique temples. Highly premium build.',
        createdAt: '2026-05-21T07:12:00Z'
      }
    ]
  },
  {
    id: 'prod-11',
    name: 'Darjeeling Imperial Tea Selection',
    description: 'A luxurious cedarwood tea chest containing rare, single-batch first-flush organic loose teas harvested from top-tier slopes in Darjeeling, India.',
    price: 75,
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    rating: 4.9,
    stock: 15,
    features: [
      'Rare hand-plucked spring first-flush leaves',
      'Includes a solid 24K gold-plated double-mesh infuser ball',
      'Gentle muscatel wine and wildflower notes with bright clarity',
      'Packaged in reusable airtight tins inside a high-gloss cedar chest'
    ],
    reviews: [
      {
        id: 'rev-12',
        userName: 'Alistair Brooks',
        rating: 5,
        comment: 'The champagne of teas indeed. Unbelievably fresh flavor and outstanding packaging. An exemplary luxury gift.',
        createdAt: '2026-05-19T11:45:00Z'
      }
    ]
  },
  {
    id: 'prod-12',
    name: 'Nomad Carbon Fiber Camera Tripod',
    description: 'The ultimate rugged light travel tripod made of 10-layer Japanese carbon-mesh with high-stability legs and fluid panoramic hydraulic head.',
    price: 280,
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800',
    category: 'Outdoor',
    rating: 4.7,
    stock: 9,
    features: [
      'Ultra lightweight construction weighing under 2.4 lbs while supporting up to 35 lbs',
      '10-layer high-density Toray cross-weave carbon fiber leg tubes',
      'Smooth 360-degree panning hydraulic ball head with Arca-Swiss plate',
      'Quick-release latches and durable weather-proof rubber grips'
    ],
    reviews: []
  },
  {
    id: 'prod-13',
    name: 'Prada Symbole Geometric Sunglasses',
    description: 'An iconic fashion-show centerpiece. These geometric acetate sunglasses feature a bold, sculptural frame design with structural temples characterized by the faceted Prada logo plaque. Outfitted with premium high-contrast protective lenses.',
    price: 480,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    rating: 4.8,
    stock: 12,
    features: [
      'Premium robust acetate body with sleek, multi-faceted geometric lines',
      'Faceted Prada Symbole dimensional brand insert integrated at temples',
      '100% UVA/UVB high-resistance protective tinted mineral lenses',
      'Includes custom signature hard case, protective pouch, and lens cloth'
    ],
    reviews: [
      {
        id: 'rev-13',
        userName: 'Ahan Kapur',
        rating: 5,
        comment: 'Breathtaking luxury eyewear. The geometric design is distinct and gets compliments immediately. Superb optical clarity.',
        createdAt: '2026-05-18T14:30:00Z'
      }
    ]
  },
  {
    id: 'prod-14',
    name: 'Royal Tanjore 22K Gold-Leaf Painting',
    description: 'An authentic masterpiece of Tanjore painting tradition. Features iconic classical reliefs embellished with pure 22-karat gold leaf work and inlaid with semi-precious Jaipur raw gem coordinates.',
    price: 620,
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800',
    category: 'Home & Living',
    rating: 5.0,
    stock: 4,
    features: [
      'Bespoke handwork by National Award-winning traditional artists',
      'Embellished with certified 22K gold foil of lifetime durability',
      'Inlaid with natural ruby, emerald, and sapphire micro-cabochons',
      'Teakwood timber frame with high-resistance antique varnish treatment'
    ],
    reviews: [
      {
        id: 'rev-14',
        userName: 'Devendra Hegde',
        rating: 5,
        comment: 'Stunning radiance in my living quarters! When light strikes the 22K gold foil, the depth of details is magnificent.',
        createdAt: '2026-05-10T11:45:00Z'
      }
    ]
  },
  {
    id: 'prod-15',
    name: 'Elite Walnut & Full-Grain Desk Desk Shelf',
    description: 'A beautiful executive console shelf CNC-machined from solid premium block American Oak and premium dark Walnut wood. Incorporates Qi charging coils encased in soft natural merino felt layers.',
    price: 210,
    image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800',
    category: 'Home & Living',
    rating: 4.8,
    stock: 14,
    features: [
      'Genuine solid kiln-dried Walnut and premium Oak wood console',
      'Supports up to two heavy screen configurations or 32-inch studio monitors',
      'Built-in dual fast Qi charger coils (15W wireless induction)',
      'Under-shelf clearance space for keyboard and tech ledger storage'
    ],
    reviews: [
      {
        id: 'rev-15',
        userName: 'Charles Vane',
        rating: 5,
        comment: 'Outstanding build quality and perfect desk organization tool. The walnut wood grain matches my executive workspace flawlessly.',
        createdAt: '2026-05-17T14:30:00Z'
      }
    ]
  },
  {
    id: 'prod-16',
    name: 'Imperial Himalayan Organic Shilajit & Saffron Extract',
    description: 'A sovereign longevity elixir containing purified high-altitude Shilajit resin matched with Grade-1 Kashmiri Mongra saffron threads. Rich in fulvic acid minerals in a hand-blown crystal flask.',
    price: 145,
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    rating: 4.9,
    stock: 22,
    features: [
      'Gold-grade Himalayan Shilajit resin purified through low-temperature spring water cycles',
      'Rich in over 84 active minerals, fulvic acid, and antioxidant compounds',
      'Injected with real Mongra Kashmiri saffron for cognitive clarity',
      'Hand-blown dark UV-filtering glass bottle with an ergonomic pearwood dosing stick'
    ],
    reviews: []
  },
  {
    id: 'prod-17',
    name: 'French Alps Lavender Scented Sleep Duvet',
    description: 'Ultra-luxurious premium double-sided cooling comforter quilted with organic French silk and infused with trace micro-encapsulated lavender botanical oils of natural soothing longevity.',
    price: 295,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800',
    category: 'Home & Living',
    rating: 4.7,
    stock: 8,
    features: [
      'Natural Mulberry silk fiber blends for a cooler sleep experience',
      'Micro-capsules slowly emit natural herbal lavender aroma upon body pressure',
      'Incredibly fluffy with hypoallergenic down-alternative fiber fill',
      'OEKO-TEX Class 1 certification ensuring total absence of skin irritants'
    ],
    reviews: [
      {
        id: 'rev-16',
        userName: 'Aria Dubois',
        rating: 5,
        comment: 'Heavenly sleep! The lavender aroma is exceptionally gentle, and the cooling weight on my skin is unparalleled.',
        createdAt: '2026-05-19T08:15:00Z'
      }
    ]
  },
  {
    id: 'prod-18',
    name: 'Kallai Teakwood Minimalist Chess Desk Set',
    description: 'A grand luxury chessboard, hand-lathed from premium golden Teakwood and dark Rosewood by historical toy block creators in Kallai, India. Includes magnetized lead-weighted timber chessmen.',
    price: 195,
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    rating: 4.9,
    stock: 6,
    features: [
      'Masterpiece craftsmanship using ethically harvested Kallai timber',
      'Fitted with magnetic bases under soft heavy velvet pads',
      'Solid bronze dual hinges and interior sculpted felt dividers',
      'Includes a premium leatherette traveling vault cover'
    ],
    reviews: [
      {
        id: 'rev-17',
        userName: 'Pranav Nair',
        rating: 5,
        comment: 'The weight of each chessman is absolute perfection. Magnets have the perfect soft click, and teak/rosewood contrasts beautifully.',
        createdAt: '2026-05-21T18:10:00Z'
      }
    ]
  },
  {
    id: 'prod-lv',
    name: 'Louis Vuitton Keepall Bandoulière 50 Eclipse',
    description: 'The premier iconic Louis Vuitton Monogram Eclipse canvas travel companion. Features luxurious cowhide-leather trim, secure double-zip lock, and elegant cabin-friendly proportions.',
    price: 3300,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    rating: 5.0,
    stock: 5,
    features: [
      'Authentic Monogram Eclipse coated canvas casing',
      'Removable leather strap with shoulder pad backing',
      'Compliant with standard international airline cabin dimensions',
      'Includes premium Louis Vuitton leather name tag and luggage lock'
    ],
    reviews: [
      {
        id: 'rev-lv-1',
        userName: 'Siddhartha Roy',
        rating: 5,
        comment: 'An exquisite travel piece. Extremely lightweight yet remarkably spacious. The Eclipse black monogram is extremely classy.',
        createdAt: '2026-05-18T10:00:00Z'
      }
    ]
  },
  {
    id: 'prod-rolex',
    name: 'Rolex Submariner Date Ceramic Chronometer',
    description: 'A sovereign self-winding mechanical diver chronometer with a custom black dial, large luminescent markers, and high-resistance solid Cerachrom bezel. Meticulously engineered in Geneva.',
    price: 12400,
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    rating: 4.9,
    stock: 3,
    features: [
      'Solid Oystersteel construction with high-tensile links',
      'Unidirectional rotatable 60-minute Cerachrom bezel insert',
      'Waterproof security down to 300 meters (1,000 feet) with Triplock winding crown',
      'Official Swiss Chronometer certification (COSC certified accuracy)'
    ],
    reviews: [
      {
        id: 'rev-rolex-1',
        userName: 'Vikram Grover',
        rating: 5,
        comment: 'The definitive luxury timepiece. Excellent weight on my wrist and coordinates perfectly with both evening dress and business suits.',
        createdAt: '2026-05-15T12:00:00Z'
      }
    ]
  },
  {
    id: 'prod-apple',
    name: 'Apple Vision Pro Spatial Computer',
    description: 'Apple\'s premium spatial computing headset wrapped in lightweight alloy framing and woven cooling head-straps. Integrates private high-fidelity dual-micro-OLED microdisplays.',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    rating: 4.8,
    stock: 12,
    features: [
      'Dual micro-OLED displays with 23 million pixels for unmatched realism',
      'Advanced dual-chip Apple M2 and custom R1 real-time processing co-processors',
      'Elegant spatial audio pod integration with custom driver alignments',
      'Intuitive hands, eyes, and voice navigational commands'
    ],
    reviews: [
      {
        id: 'rev-apple-1',
        userName: 'Deepak Mehta',
        rating: 5,
        comment: 'Truly magical spatial immersion. Reading architectural blueprints in full scale on my virtual workspace feels incredibly futuristic.',
        createdAt: '2026-05-19T14:30:00Z'
      }
    ]
  },
  {
    id: 'prod-boat',
    name: 'boAt Nirvana Luxury Edition Over-Cuffs',
    description: 'Special customized luxury edition crafted from gold-plated aluminum alloys and premium hand-stitched memory foam. Incorporates high-resolution signature acoustics and smart ANC.',
    price: 149,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&q=80&w=800',
    category: 'Electronics',
    rating: 4.7,
    stock: 25,
    features: [
      'Precious high-gloss gold-plated frame finish and polished brass details',
      'High-definition hybrid ANC up to 45dB with instant transparent smart modes',
      'Wired lossless connectivity support or wireless Bluetooth 5.4 multi-point routing',
      'Massive 80-hour battery stamina with rapid charge loops'
    ],
    reviews: [
      {
        id: 'rev-boat-1',
        userName: 'Ayush K.',
        rating: 5,
        comment: 'Absolutely love the beautiful gold accents. Best headphones boAt has ever delivered! Bass is warm and clean.',
        createdAt: '2026-05-20T09:00:00Z'
      }
    ]
  },
  {
    id: 'prod-hermes',
    name: 'Hermès Birkin Togo Gold Leather Carryall',
    description: 'An ultimate sovereign icon of high fashion. Handcrafted by master artisans in France from robust Togo calfskin, accented by certified polished gold-tier hardware closures.',
    price: 18900,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    rating: 5.0,
    stock: 2,
    features: [
      'Bespoke handwork from certified French ateliers',
      'Sturdy Togo calfskin texture with natural scratch resistance',
      'Equipped with signature padlock, key fob, and protective raincover accessory',
      'Includes luxury coordinate receipt with original custom orange box packing'
    ],
    reviews: [
      {
        id: 'rev-hermes-1',
        userName: 'Kiran Patel',
        rating: 5,
        comment: 'Absolute perfection. A timeless masterwork that commands appreciation inside any elegant ensemble.',
        createdAt: '2026-05-21T11:45:00Z'
      }
    ]
  },
  {
    id: 'prod-cartier',
    name: 'Cartier Love Bracelet 18K Yellow Gold',
    description: 'An iconic masterwork of luxury jewelry. Handcrafted from 18-karat yellow gold with a secure screwdriver closure mechanism, symbolizing eternal devotion and pure sculptural elegance.',
    price: 7300,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    rating: 4.9,
    stock: 4,
    features: [
      'Engineered in solid 18K yellow gold casing',
      'Includes signature bespoke gold-plated screwdriver accessory',
      'Sized in standard oval profile to seat comfortably on wrists',
      'Accompanied by a red velvet Cartier jewelry case and Certificate of Authenticity'
    ],
    reviews: [
      {
        id: 'rev-cartier-1',
        userName: 'Radhika Sen',
        rating: 5,
        comment: 'Truly magnificent. A premium item that holds its absolute prestige beautifully.',
        createdAt: '2026-05-20T14:15:00Z'
      }
    ]
  },
  {
    id: 'prod-gucci',
    name: 'Gucci GG Marmont Gold Double G Leather Belt',
    description: 'An elegant hallmark accessory by Gucci. Features the legendary double G buckle in shiny gold-plated metal hardware, mounted on full black calf leather straps.',
    price: 520,
    image: 'https://images.unsplash.com/photo-1624222247344-550fb8ec5519?auto=format&fit=crop&q=80&w=800',
    category: 'Accessories',
    rating: 4.8,
    stock: 15,
    features: [
      'Authenticated double-sided calfskin strap leather base',
      'Certified brass Double G metallic logo plate',
      'Can be worn as a hip or waist belt securely',
      'Handcrafted exclusively in trusted Italian workshops'
    ],
    reviews: [
      {
        id: 'rev-gucci-1',
        userName: 'Ayush Sharma',
        rating: 5,
        comment: 'Very premium leather, goes perfectly with both jeans and styling suits. Classic accessory.',
        createdAt: '2026-05-19T08:20:00Z'
      }
    ]
  }
];
