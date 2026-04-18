export type BlogSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  quote?: string;
};

export type BlogArticle = {
  slug: "saudade-meaning" | "textile-frequency" | "who-made-my-clothes";
  category: "PHILOSOPHY" | "CONSCIOUS FASHION";
  publishedAt: string;
  author: "Mayka";
  title: string;
  subtitle?: string;
  description: string;
  cardImage: string;
  heroImage: string;
  quote?: string;
  extraImages?: string[];
  sections: BlogSection[];
};

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "saudade-meaning",
    category: "PHILOSOPHY",
    publishedAt: "2024-10-18",
    author: "Mayka",
    title: "What Does Saudade Mean?",
    description:
      "Saudade is more than a word. It is a feeling, a sensation, and a call for awareness rooted in longing, love, and human connection.",
    cardImage:
      "/wp-content/uploads/2023/09/F56E23B8-D3FF-4BA1-BE97-73AC2B21B4CE_1_105_c-e1729254532272.jpeg",
    heroImage:
      "/wp-content/uploads/2023/09/pexels-tellez-erik-12747153.jpg",
    quote: '"When I think of saudade I think of the ocean"',
    sections: [
      {
        paragraphs: [
          "Saudade is the word I cherish most among the three languages I know, with Brazilian Portuguese being my favorite and my first language. What is interesting is that it has no translation in other languages. It's challenging to express what saudade truly means with words, as it is more than just a word; it's a feeling, a sensation, a call for awareness. To be precise, when you miss someone, you long for nothing more than that person's presence. You yearn to reach out to them, even when you don't have a specific reason. You simply crave to hear their voice. Saudade is the energy that bridges that gap, the confirmation in your heart that compels you to make that call. It is the embodiment of that yearning.",
          "Have you ever found yourself identifying with these words? If so, you know that saudade resides within you. It can take on various interpretations. Sometimes, it may be a sense of longing, nostalgia, a heart brimming with love, or even heartbreak. It is always profound and possesses immense power. Just as life itself, saudade is in a constant state of longing for love and change, forever expanding. The boundary between humans and saudade is infinite. Is it the mystical emotion that defines our humanity? Perhaps. Or maybe it's even greater: the will to live, the drive for meaning, the bond between ourselves, nature, and the universe.",
          "Saudade is woven into our nature, a testament to what makes us human. It's the connection I wish to share - the harmony between self and world, the individuality that unites us, and our intrinsic link to all existence.",
          "With love and joy, I present my vision: Saudade.",
          "For a world free from capitalist chains, patriarchal oppression, and the grip of financial empires. For a future built on universal values - integrity, tolerance, harmony, determination, and love.",
          "Together, we weave this tapestry. Remember: unity is our strength.",
        ],
      },
    ],
  },
  {
    slug: "textile-frequency",
    category: "CONSCIOUS FASHION",
    publishedAt: "2024-08-31",
    author: "Mayka",
    title: "The Frequency of Fabrics",
    subtitle:
      "Like the rhythms of nature, fabrics carry frequencies too. At Saudade we are all about weaving in the highest frequency!",
    description:
      "How linen, cotton, wool, and hemp carry different vibrational frequencies and why natural fibers matter for wellness and the planet.",
    cardImage:
      "/wp-content/uploads/2023/09/volha-flaxeco-L8QuQqL1ZJ8-unsplash-1.jpeg",
    heroImage:
      "/wp-content/uploads/2023/09/volha-flaxeco-L8QuQqL1ZJ8-unsplash-1.jpeg",
    extraImages: [
      "/wp-content/uploads/2024/10/pexels-photo-4405941-4405941-2.jpg",
    ],
    sections: [
      {
        heading: "What is Frequency?",
        paragraphs: [
          "Everything in the universe has a vibrational frequency, which refers to how often something oscillates or repeats its motion over a specific period. In physics, frequency describes how often a wave - such as sound, light, or electromagnetic energy - repeats in one second, measured in Hertz (Hz). Vibrational frequency can be measured using specialized tools like vibrometers or spectrometers. This frequency can affect how objects or materials interact with their surroundings, including the human body. Natural materials like cotton and linen, for example, resonate at frequencies harmonious with the body, promoting relaxation and well-being, while synthetic materials have lower frequencies that can disrupt energy balance.",
          "The human body's signature frequency is 100mHz. It can vary from 70 to 100. A frequency lower than 62 indicates a compromised immune system.",
        ],
      },
      {
        heading: "Super Fabrics",
        paragraphs: ["Linen - Made from flax, 5000 mHz"],
        bullets: [
          "Sleeping in linen helps a person fall asleep faster and deeper",
          "Improves mood",
          "Rapid healing from surgeries, which is why hospitals have used linen sheets",
          "Resistant to fungus and bacteria",
          "Barrier to some diseases",
          "Regulates body temperature - warm when cold, cools when warm",
        ],
      },
      {
        paragraphs: [
          "Cotton - healthier but not a super fabric",
          "Organic cotton: 70 to 110 mHz",
          "Non-organic cotton, bleached and/or dyed: 40 to 70 mHz",
          "Wool - 5000 mHz",
          "Something very interesting: Wool's energy flows from left to right, whereas the frequency of linen flows right to left. Mixing these two together will cancel out the healing effects to zero.",
        ],
      },
      {
        heading: "Hemp",
        quote:
          "\"Plant a lot of hemp in the land of Fukushima. Hemp's vibration has the potentiality to purify the contaminated environment made by radiation. It grows fast and uses very little water. The soil it grows in doesn't require rotating for many years.\" - Dr. Masaru Emoto",
        bullets: [
          "Has an extremely high vibration",
          "Is at least 4x stronger than cotton",
          "Breathes better than any synthetic",
          "Naturally resistant to mold, mildew, and UV light",
        ],
      },
    ],
  },
  {
    slug: "who-made-my-clothes",
    category: "CONSCIOUS FASHION",
    publishedAt: "2024-10-22",
    author: "Mayka",
    title: "Who Made My Clothes?",
    description:
      "A closer look at who makes our clothes, why fast fashion harms people and ecosystems, and why natural fibers are a conscious alternative.",
    cardImage:
      "/wp-content/uploads/2024/10/jon-tyson-uEXc4WGAI2c-unsplash-768x1024.jpg",
    heroImage:
      "/wp-content/uploads/2024/10/jon-tyson-uEXc4WGAI2c-unsplash-768x1024.jpg",
    extraImages: [
      "/wp-content/uploads/2024/10/fast-fashion.webp",
    ],
    sections: [
      {
        paragraphs: [
          "I believe (and hope) that we have all pondered this question at some point. It is, in fact, a very important question to consider because the commercial and manufacturing aspects of the clothing industry can be overwhelming.",
          "Saudade Clothing is designed by Mayka (founder of Saudade) and produced sustainably in Portugal.",
        ],
      },
      {
        heading: "The Fashion Industry",
        paragraphs: [
          "Let us focus on the fundamental materials, like textiles:",
          "Polyester: 55%, Cotton: 27%, Cellulosic Fibres: 7%, Polypropylene: 4%, Nylon: 5%, Wool: 1%",
          "Polyester is a man-made invention, a chemical product derived from petroleum, coal, and water. There's nothing inherently good about it; it's essentially plastic. However, it's cheap and readily available. But the use of chemicals and water in its production is necessary. Also the micro-plastics that end in the water with every wash is a serious problem.",
          "Nonetheless, we can reduce the enormous quantities of waste and pollution associated with it. Clean and free-flowing water is vital. We can save lives and raise awareness worldwide through daily actions.",
          "From an ethical perspective, numerous natural fibers can replace non-sustainable clothing materials. In fact, most natural materials offer better quality and durability. We have the power to create a sustainable world. Clothing is a critical area of focus and a potential means of reshaping the world and making a positive impact.",
          "How about starting with our shopping choices? What feels better against your skin, plastic or natural fibers?",
        ],
      },
    ],
  },
];

export const BLOG_SLUGS = BLOG_ARTICLES.map((article) => article.slug);

export function getBlogArticleBySlug(slug: string) {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}

export function getProxiedBlogImageSrc(src: string) {
  return `/api/blog-image?src=${encodeURIComponent(src)}`;
}
