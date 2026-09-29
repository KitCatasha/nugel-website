"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const products = {
  starter: {
    id: "starter",
    name: "NÜGEL Starter Kit",
    price: 115000,
  },
  energy: {
    id: "energy",
    name: "NÜGEL Sports Drink Concentrate 200 mL",
    price: 85000,
  },
  energy500: {
    id: "energy500",
    name: "NÜGEL Sports Drink Concentrate 515 mL",
    price: 185000,
  },
  antifog: {
    id: "antifog",
    name: "NÜGEL Anti-Fog 10 mL",
    price: 45000,
  },
  bottle: {
    id: "bottle",
    name: "NÜGEL Measuring Container",
    price: 10000,
  },
} as const;

const STARTER_REGULAR_PRICE =
  products.energy.price + products.bottle.price + products.antifog.price;
const STARTER_SAVINGS = STARTER_REGULAR_PRICE - products.starter.price;

type ProductId = keyof typeof products;

const emptyCart: Record<ProductId, number> = {
  starter: 0,
  energy: 0,
  energy500: 0,
  antifog: 0,
  bottle: 0,
};

const WHATSAPP_NUMBER = "6281234567890";
const WHATSAPP_DISPLAY = "+62 812-3456-7890";


const searchItemsEn: Array<{
  title: string;
  description: string;
  href: string;
  keywords: string;
  productIndex?: number;
}> = [
  {
    title: "Starter Kit",
    description: "What is included in the NÜGEL Starter Kit.",
    href: "#starter",
    keywords: "starter kit essentials energy anti-fog antifog measuring container cup",
  },
  {
    title: "NÜGEL Sports Drink Concentrate",
    description: "200 ml and 515 ml, nutrition and how to use.",
    href: "#products",
    keywords: "sports drink concentrate 200 515 ml nutrition ingredients how to use fuel",
    productIndex: 0,
  },
  {
    title: "Anti-Fog Drops",
    description: "Product details and how to use NÜGEL Anti-Fog.",
    href: "#products",
    keywords: "anti fog antifog drops goggles 10 ml how to use",
    productIndex: 1,
  },
  {
    title: "Measuring Container",
    description: "Product details, care and how to use the measuring container.",
    href: "#products",
    keywords: "measuring container cup shaker how to use care",
    productIndex: 2,
  },
  {
    title: "Shop",
    description: "Buy the Starter Kit or individual NÜGEL products.",
    href: "#shop",
    keywords: "shop buy price cart order starter energy antifog bottle",
  },
  {
    title: "About NÜGEL",
    description: "Learn more about the NÜGEL brand and story.",
    href: "#about",
    keywords: "about story brand why nugel values",
  },
  {
    title: "FAQ",
    description: "Common questions about products, ordering and shipping.",
    href: "#faq",
    keywords: "faq questions shipping order starter kit separately",
  },
];


const searchItemsId: typeof searchItemsEn = [
  {
    title: "Paket Pemula",
    description: "Apa saja yang termasuk dalam NÜGEL Starter Kit.",
    href: "#starter",
    keywords: "paket pemula starter kit perlengkapan energi anti-fog antifog wadah takar gelas",
  },
  {
    title: "Konsentrat Minuman Olahraga NÜGEL",
    description: "Ukuran 200 mL dan 515 mL, nutrisi, serta cara penggunaan.",
    href: "#products",
    keywords: "konsentrat minuman olahraga sports drink 200 515 ml nutrisi bahan cara pakai energi",
    productIndex: 0,
  },
  {
    title: "Tetes Anti-Fog",
    description: "Detail produk dan cara menggunakan NÜGEL Anti-Fog.",
    href: "#products",
    keywords: "anti fog antifog tetes kacamata renang 10 ml cara pakai",
    productIndex: 1,
  },
  {
    title: "Wadah Takar",
    description: "Detail produk, perawatan, dan cara menggunakan wadah takar.",
    href: "#products",
    keywords: "wadah takar gelas ukur shaker cara pakai perawatan",
    productIndex: 2,
  },
  {
    title: "Belanja",
    description: "Beli Paket Pemula atau produk NÜGEL secara satuan.",
    href: "#shop",
    keywords: "belanja beli harga keranjang pesan paket energi antifog wadah",
  },
  {
    title: "Tentang NÜGEL",
    description: "Pelajari lebih lanjut tentang merek dan cerita NÜGEL.",
    href: "#about",
    keywords: "tentang cerita merek brand nilai nugel",
  },
  {
    title: "FAQ",
    description: "Pertanyaan umum tentang produk, pemesanan, dan pengiriman.",
    href: "#faq",
    keywords: "faq pertanyaan pengiriman pesan order paket pemula satuan",
  },
];


const aboutBubblesEn = [
  {
    title: "Born from Swimming",
    eyebrow: "NÜGEL story",
    preview:
      "NÜGEL was created from a swimmer’s perspective — practical products built around real needs in the water.",
    paragraphs: [
      "NÜGEL was created from a swimmer’s perspective, with a simple idea: develop practical products that address real needs in the water.",
      "The brand was developed by Dieter Machate, a competitive Masters swimmer and Gold Medalist at the 2024 World Masters Championships. Years of regular training and competition gave him firsthand experience with two recurring challenges: maintaining energy and hydration through demanding sessions, and keeping goggles clear so he could stay focused in the water.",
      "Rather than simply creating products for swimmers, Dieter wanted to develop solutions that he himself would use as part of his own training and competition routine. That thinking became the foundation of NÜGEL.",
    ],
    images: [
      {
        src: "/images/dieter-doha-podium.jpeg",
        alt: "Dieter Machate on the first-place podium at the World Aquatics Masters Championships Doha 2024",
        caption:
          "Dieter Machate on the first-place podium at the World Aquatics Masters Championships Doha 2024.",
      },
      {
        src: "/images/dieter-doha-medal-hd.jpeg",
        alt: "Dieter Machate with his gold medal at the World Aquatics Masters Championships Doha 2024",
        caption:
          "Dieter Machate, a gold medalist at the World Aquatics Masters Championships Doha 2024.",
      },
    ],
    imageCaption: null,
  },
  {
    title: "The Origin of the Concentrate",
    eyebrow: "From sap to fuel",
    preview:
      "A patented palm-sap process became the starting point for a natural-origin approach to sports nutrition.",
    paragraphs: [
      "Long before NÜGEL, Dieter worked with palm sap (Nira) and developed a patented processing method designed to preserve its naturally occurring nutritional components during concentration.",
      "The resulting palm-sap concentrate retains a broad nutritional profile, with more than 50 naturally occurring macro- and micronutrients identified and documented.",
      "As an athlete, Dieter saw an opportunity to bring that experience into sports nutrition. NÜGEL Sports Drink Concentrate grew from that idea, with 95% of its formulation based on coconut palm sap concentrate and sea salt.",
    ],
    images: [
      {
        src: "/images/nugel-palm-sap-process.jpeg",
        alt: "Palm sap concentrate being poured during processing",
        caption:
          "Palm sap concentrate — part of the ingredient and processing story behind NÜGEL Sports Drink Concentrate.",
      },
    ],
    imageCaption: null,
    learnMoreUrl: "https://coconutrate.com/",
    learnMoreLabel: "Want to read more about the palm-sap process? Visit Coconutrate.com",
  },
  {
    title: "Fuel & Hydrate",
    eyebrow: "Inside NÜGEL Concentrate",
    preview:
      "Natural energy, dual-source carbohydrates, six key electrolytes and a broader nutritional profile in every serving.",
    richSections: [
      {
        heading: "Natural Energy and Electrolytes; More Than Just Fuel.",
        paragraphs: [
          "NÜGEL Sports Drink Concentrate takes a different approach to conventional sports nutrition. Instead of building a drink around isolated sugars and powders, we start with 95% coconut palm sap concentrate, sea salt, and lime juice.",
          "Coconut palm sap — nira kelapa — is the naturally sweet liquid from coconut palm blossoms. We carefully process it to retain its natural nutritional matrix: sugars, minerals, amino acids, and fiber. Sea salt complements it with additional minerals and trace elements. Together, they form the complete foundation for a sports drink designed for swimmers and other endurance athletes.",
        ],
      },
      {
        heading: "DUAL-SOURCE CARBOHYDRATES FOR SUSTAINED ENERGY",
        paragraphs: [
          "Each 28.5 mL serving provides 29g of carbohydrates and 120 kcal. The sugars are naturally present as glucose and fructose in a 1:1 ratio.",
          "This matters for endurance: glucose and fructose use different intestinal transport pathways. Research shows that combining them can increase the amount of carbohydrate available for oxidation during prolonged exercise compared to glucose alone — especially when your energy demands are high. The sap also retains natural dietary fiber, including inulin.",
        ],
      },
      {
        heading: "SIX KEY ELECTROLYTES FOR HYDRATION",
        paragraphs: [
          "NÜGEL is more than just energy. Each serving contains 713 mg of electrolytes with six key minerals:",
          "Sodium, Potassium, Chloride, Magnesium, Calcium, and Phosphorus.",
          "Together with water, they help maintain fluid and mineral balance during activity."
        ],
        boldTerms: ["Sodium", "Potassium", "Chloride", "Magnesium", "Calcium", "Phosphorus"],
      },
      {
        heading: "COMPLETE PROFILE IN EVERY SERVING",
        paragraphs: [
          "One serving (28.5 mL concentrate + water to 400 mL) provides:",
          "120 kcal Energy / 29g Carbohydrates / 713 mg Electrolytes / 580 mg Amino Acids",
          "Accompanied by naturally occurring vitamins, trace elements, and fiber.",
          "We also retain functional micronutrients naturally present in the sap:",
        ],
        bullets: [
          {
            label: "Niacin (Vitamin B3)",
            text: "contributes to normal energy-yielding metabolism — how your body converts nutrients into usable energy.",
          },
          {
            label: "Vitamin C & Zinc",
            text: "contribute to the normal function of the immune system, relevant for anyone with a regular, demanding training schedule.",
          },
        ],
        closing:
          "No isolated energy boost. Just a broader nutritional profile from natural sources, supplied as a concentrate so you can prepare it fresh when you need it.",
      },
    ],
    stats: ["120 kcal", "29 g carbs", "713 mg electrolytes"],
    imageCaption: null,
  },
  {
    title: "Clear Vision and No Waste.",
    eyebrow: "NÜGEL Anti-Fog",
    preview:
      "A precision-drop anti-fog solution developed around the wet, high-humidity conditions swimmers actually experience.",
    paragraphs: [
      "NÜGEL Anti-Fog grew from another challenge familiar to regular swimmers: fogged goggles.",
      "It was developed around the actual wet, high-humidity environment of swimming, including situations where condensation, perspiration or small amounts of pool water reach the inside of the goggles.",
      "Instead of spraying more product than the small lens surface needs, the precision drop applicator places a controlled amount directly on each lens. The idea is simple: effective clarity, precise application and no waste.",
    ],
    imageCaption: null,
  },
  {
    title: "Two Products, One Purpose.",
    eyebrow: "The NÜGEL philosophy",
    preview:
      "One supports the swimmer from within. The other helps keep the swimmer focused in the water.",
    paragraphs: [
      "NÜGEL Sports Drink Concentrate and NÜGEL Anti-Fog serve very different functions, but they share the same origin: real needs identified through years spent in water.",
      "One supports the swimmer from within by providing energy and hydration. The other supports the swimmer in water by helping maintain clear vision and reduce distraction.",
      "Together they reflect the same NÜGEL philosophy: practical, swimmer-focused essentials developed from firsthand experience. NÜGEL is not about making swimming more complicated — it is about making some of the essentials simpler.",
    ],
    imageCaption: null,
  },
] as const;


const aboutBubblesId = [
  {
    title: "Lahir dari Dunia Renang",
    eyebrow: "Cerita NÜGEL",
    preview:
      "NÜGEL diciptakan dari sudut pandang seorang perenang — produk praktis yang dibuat berdasarkan kebutuhan nyata di dalam air.",
    paragraphs: [
      "NÜGEL diciptakan dari sudut pandang seorang perenang, dengan satu ide sederhana: mengembangkan produk praktis yang menjawab kebutuhan nyata di dalam air.",
      "Merek ini dikembangkan oleh Dieter Machate, perenang Masters kompetitif dan peraih Medali Emas pada World Masters Championships 2024. Bertahun-tahun berlatih dan berkompetisi memberinya pengalaman langsung dengan dua tantangan yang terus berulang: menjaga energi dan hidrasi selama sesi yang berat, serta menjaga kacamata renang tetap jernih agar fokus di dalam air.",
      "Alih-alih sekadar membuat produk untuk perenang, Dieter ingin mengembangkan solusi yang juga akan ia gunakan sendiri dalam rutinitas latihan dan kompetisinya. Pemikiran inilah yang menjadi dasar NÜGEL.",
    ],
    images: [
      {
        src: "/images/dieter-doha-podium.jpeg",
        alt: "Dieter Machate di podium juara pertama World Aquatics Masters Championships Doha 2024",
        caption:
          "Dieter Machate di podium juara pertama World Aquatics Masters Championships Doha 2024.",
      },
      {
        src: "/images/dieter-doha-medal-hd.jpeg",
        alt: "Dieter Machate dengan medali emasnya di World Aquatics Masters Championships Doha 2024",
        caption:
          "Dieter Machate, peraih medali emas World Aquatics Masters Championships Doha 2024.",
      },
    ],
    imageCaption: null,
  },
  {
    title: "Awal Mula Konsentrat",
    eyebrow: "Dari nira menjadi energi",
    preview:
      "Proses nira aren yang dipatenkan menjadi titik awal pendekatan berbahan alami untuk nutrisi olahraga.",
    paragraphs: [
      "Jauh sebelum NÜGEL, Dieter bekerja dengan nira dan mengembangkan metode pengolahan berpaten yang dirancang untuk mempertahankan komponen nutrisi alaminya selama proses pemekatan.",
      "Konsentrat nira yang dihasilkan mempertahankan profil nutrisi yang luas, dengan lebih dari 50 makro- dan mikronutrien alami yang telah diidentifikasi dan didokumentasikan.",
      "Sebagai atlet, Dieter melihat peluang untuk membawa pengalaman tersebut ke dalam nutrisi olahraga. NÜGEL Sports Drink Concentrate berkembang dari gagasan itu, dengan 95% formulanya berbasis konsentrat nira kelapa dan garam laut.",
    ],
    images: [
      {
        src: "/images/nugel-palm-sap-process.jpeg",
        alt: "Konsentrat nira sedang dituangkan saat proses pengolahan",
        caption:
          "Konsentrat nira — bagian dari cerita bahan dan proses di balik NÜGEL Sports Drink Concentrate.",
      },
    ],
    imageCaption: null,
    learnMoreUrl: "https://coconutrate.com/",
    learnMoreLabel: "Ingin membaca lebih lanjut tentang proses nira? Kunjungi Coconutrate.com",
  },
  {
    title: "Energi & Hidrasi",
    eyebrow: "Di dalam Konsentrat NÜGEL",
    preview:
      "Energi alami, karbohidrat dua sumber, enam elektrolit utama, dan profil nutrisi yang lebih luas dalam setiap sajian.",
    richSections: [
      {
        heading: "Energi Alami dan Elektrolit; Lebih dari Sekadar Bahan Bakar.",
        paragraphs: [
          "NÜGEL Sports Drink Concentrate menggunakan pendekatan berbeda dari nutrisi olahraga konvensional. Alih-alih membangun minuman dari gula terisolasi dan bubuk, kami memulai dengan 95% konsentrat nira kelapa, garam laut, dan air jeruk nipis.",
          "Nira kelapa adalah cairan manis alami dari bunga kelapa. Kami mengolahnya dengan hati-hati untuk mempertahankan matriks nutrisinya: gula, mineral, asam amino, dan serat. Garam laut melengkapinya dengan mineral tambahan dan unsur jejak. Bersama-sama, keduanya menjadi dasar lengkap untuk minuman olahraga yang dirancang bagi perenang dan atlet daya tahan lainnya.",
        ],
      },
      {
        heading: "KARBOHIDRAT DUA SUMBER UNTUK ENERGI BERKELANJUTAN",
        paragraphs: [
          "Setiap sajian 28,5 mL menyediakan 29 g karbohidrat dan 120 kkal. Gula secara alami hadir sebagai glukosa dan fruktosa dengan rasio 1:1.",
          "Hal ini penting untuk daya tahan: glukosa dan fruktosa menggunakan jalur transportasi usus yang berbeda. Riset menunjukkan bahwa menggabungkannya dapat meningkatkan jumlah karbohidrat yang tersedia untuk oksidasi selama olahraga berkepanjangan dibandingkan glukosa saja — terutama saat kebutuhan energi tinggi. Nira juga mempertahankan serat pangan alami, termasuk inulin.",
        ],
      },
      {
        heading: "ENAM ELEKTROLIT UTAMA UNTUK HIDRASI",
        paragraphs: [
          "NÜGEL bukan sekadar sumber energi. Setiap sajian mengandung 713 mg elektrolit dengan enam mineral utama:",
          "Natrium, Kalium, Klorida, Magnesium, Kalsium, dan Fosfor.",
          "Bersama air, mineral-mineral ini membantu mempertahankan keseimbangan cairan dan mineral selama aktivitas.",
        ],
        boldTerms: ["Natrium", "Kalium", "Klorida", "Magnesium", "Kalsium", "Fosfor"],
      },
      {
        heading: "PROFIL LENGKAP DALAM SETIAP SAJIAN",
        paragraphs: [
          "Satu sajian (28,5 mL konsentrat + air hingga total 400 mL) menyediakan:",
          "120 kkal Energi / 29 g Karbohidrat / 713 mg Elektrolit / 580 mg Asam Amino",
          "Disertai vitamin, unsur jejak, dan serat yang secara alami terdapat di dalam bahan.",
          "Kami juga mempertahankan mikronutrien fungsional yang secara alami terdapat dalam nira:",
        ],
        bullets: [
          {
            label: "Niasin (Vitamin B3)",
            text: "berkontribusi pada metabolisme penghasil energi yang normal — yaitu cara tubuh mengubah nutrisi menjadi energi yang dapat digunakan.",
          },
          {
            label: "Vitamin C & Zinc",
            text: "berkontribusi pada fungsi normal sistem imun, relevan bagi siapa pun dengan jadwal latihan yang rutin dan menuntut.",
          },
        ],
        closing:
          "Bukan dorongan energi terisolasi. Hanya profil nutrisi yang lebih luas dari sumber alami, dalam bentuk konsentrat agar dapat disiapkan segar saat dibutuhkan.",
      },
    ],
    stats: ["120 kkal", "29 g karbohidrat", "713 mg elektrolit"],
    imageCaption: null,
  },
  {
    title: "Penglihatan Jernih Tanpa Pemborosan.",
    eyebrow: "NÜGEL Anti-Fog",
    preview:
      "Larutan anti-fog dengan aplikasi tetes presisi yang dikembangkan untuk kondisi basah dan lembap tinggi yang benar-benar dialami perenang.",
    paragraphs: [
      "NÜGEL Anti-Fog lahir dari tantangan lain yang sangat familiar bagi perenang rutin: kacamata renang yang berembun.",
      "Produk ini dikembangkan untuk kondisi nyata saat berenang yang basah dan memiliki kelembapan tinggi, termasuk ketika kondensasi, keringat, atau sedikit air kolam masuk ke bagian dalam kacamata.",
      "Alih-alih menyemprotkan produk lebih banyak daripada yang dibutuhkan permukaan lensa yang kecil, aplikator tetes presisi menempatkan jumlah yang terkontrol langsung pada setiap lensa. Idenya sederhana: kejernihan yang efektif, aplikasi presisi, dan tanpa pemborosan.",
    ],
    imageCaption: null,
  },
  {
    title: "Dua Produk, Satu Tujuan.",
    eyebrow: "Filosofi NÜGEL",
    preview:
      "Satu mendukung perenang dari dalam. Yang lain membantu menjaga fokus perenang di dalam air.",
    paragraphs: [
      "NÜGEL Sports Drink Concentrate dan NÜGEL Anti-Fog memiliki fungsi yang sangat berbeda, tetapi keduanya berasal dari sumber yang sama: kebutuhan nyata yang ditemukan melalui bertahun-tahun berada di dalam air.",
      "Satu mendukung perenang dari dalam dengan menyediakan energi dan hidrasi. Yang lain mendukung perenang di dalam air dengan membantu mempertahankan penglihatan yang jernih dan mengurangi gangguan.",
      "Bersama-sama, keduanya mencerminkan filosofi NÜGEL yang sama: produk esensial praktis yang berfokus pada perenang dan dikembangkan dari pengalaman langsung. NÜGEL bukan tentang membuat aktivitas berenang menjadi lebih rumit — melainkan membuat beberapa hal penting menjadi lebih sederhana.",
    ],
    imageCaption: null,
  },
] as const;


export default function Home({
  language = "en",
}: {
  language?: "en" | "id";
}) {
  const isIndonesian = language === "id";
  const t = (english: string, indonesian: string) =>
    isIndonesian ? indonesian : english;
  const searchItems = isIndonesian ? searchItemsId : searchItemsEn;
  const aboutBubbles = isIndonesian ? aboutBubblesId : aboutBubblesEn;

  const productDisplayName = (id: ProductId) => {
    if (!isIndonesian) return products[id].name;

    const names: Record<ProductId, string> = {
      starter: "NÜGEL Starter Kit",
      energy: "NÜGEL Konsentrat Minuman Olahraga 200 mL",
      energy500: "NÜGEL Konsentrat Minuman Olahraga 515 mL",
      antifog: "NÜGEL Anti-Fog 10 mL",
      bottle: "NÜGEL Wadah Takar",
    };

    return names[id];
  };

  const [cart, setCart] =
    useState<Record<ProductId, number>>({ ...emptyCart });
  const [cartLoaded, setCartLoaded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartNotice, setCartNotice] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [energySizeOpen, setEnergySizeOpen] = useState(false);
  const [spotlightSize, setSpotlightSize] = useState<200 | 515>(515);
  // Start visible so the header/hero are present in the server-rendered HTML too.
  // This gives mobile browsers a safe fallback even if hydration is delayed.
  const [pageReady, setPageReady] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeAboutBubble, setActiveAboutBubble] = useState<number | null>(null);

  const productStageRef = useRef<HTMLDivElement>(null);
  const heroVisualRef = useRef<HTMLDivElement>(null);
  const energyMoverRef = useRef<HTMLDivElement>(null);
  const antifogMoverRef = useRef<HTMLDivElement>(null);
  const cupMoverRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const productRailRef = useRef<HTMLDivElement>(null);
  const cartNoticeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("nugel-cart");

    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart);
        setCart({ ...emptyCart, ...parsed });
      } catch {
        console.error("Could not load saved cart.");
      }
    }

    setCartLoaded(true);
  }, []);

  useEffect(() => {
    const savedScroll = sessionStorage.getItem(
      "nugel-language-scroll"
    );

    if (!savedScroll) return;

    sessionStorage.removeItem("nugel-language-scroll");

    try {
      const {
        sectionId,
        sectionProgress,
        pageProgress,
        productIndex,
      } = JSON.parse(savedScroll);

      const restorePosition = () => {
        let targetTop: number | null = null;

        if (sectionId) {
          const section = document.getElementById(sectionId);

          if (section) {
            const rect = section.getBoundingClientRect();

            const absoluteSectionTop =
              window.scrollY + rect.top;

            const viewportAnchor =
              window.innerHeight * 0.35;

            targetTop =
              absoluteSectionTop +
              section.offsetHeight * sectionProgress -
              viewportAnchor;
          }
        }

        // Fallback if we weren't inside one of the named sections.
        if (targetTop === null) {
          const maxScroll = Math.max(
            document.documentElement.scrollHeight -
              window.innerHeight,
            1
          );

          targetTop = maxScroll * pageProgress;
        }

        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: "auto",
        });

        // Restore Products carousel too.
        if (
          productIndex !== null &&
          productIndex !== undefined
        ) {
          const rail = productRailRef.current;

          if (rail && rail.clientWidth > 0) {
            rail.scrollTo({
              left: rail.clientWidth * productIndex,
              behavior: "auto",
            });
          }
        }
      };

      // Give the translated page a moment to finish its layout.
      requestAnimationFrame(() => {
        requestAnimationFrame(restorePosition);
      });

      const timeout = window.setTimeout(
        restorePosition,
        150
      );

      return () => window.clearTimeout(timeout);
    } catch {
      console.error(
        "Could not restore language scroll position."
      );
    }
  }, []);

  useEffect(() => {
    if (!cartLoaded) return;
    localStorage.setItem("nugel-cart", JSON.stringify(cart));
  }, [cart, cartLoaded]);

  useEffect(() => {
    return () => {
      if (cartNoticeTimerRef.current !== null) {
        window.clearTimeout(cartNoticeTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const entranceTimer = window.setTimeout(() => {
      setPageReady(true);
    }, 70);

    const revealElements =
      document.querySelectorAll<HTMLElement>("[data-reveal]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            "nugel-visible",
            entry.isIntersecting
          );
        });
      },
      {
        threshold: 0.12,
        rootMargin: "-8% 0px -8% 0px",
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => {
      window.clearTimeout(entranceTimer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let ticking = false;

    const updateScrollEffects = () => {
      const stage = productStageRef.current;
      const heroVisual = heroVisualRef.current;
      const energy = energyMoverRef.current;
      const antifog = antifogMoverRef.current;
      const cup = cupMoverRef.current;
      const background = backgroundRef.current;

      const viewportHeight = window.innerHeight;
      const documentScrollDistance = Math.max(
        document.documentElement.scrollHeight - viewportHeight,
        1
      );

      // ONE continuous movement from the very top of the website
      // to the very bottom. No hero handoff, no fade, no reset.
      const pageProgress = Math.max(
        0,
        Math.min(1, window.scrollY / documentScrollDistance)
      );

      if (background) {
        background.style.backgroundPosition = `center ${pageProgress * 100}%`;
      }

      // Home-page product composition transition.
      // Keep it fully visible: the whole product group physically moves upward
      // as the user scrolls toward the Starter Kit.
      if (heroVisual) {
        const heroProgress = Math.max(
          0,
          Math.min(1, window.scrollY / Math.max(viewportHeight * 0.82, 1))
        );

        const eased =
          heroProgress * heroProgress * (3 - 2 * heroProgress);

        const translateY = -155 * eased;
        const translateX = 24 * eased;
        const scale = 1 + 0.035 * eased;

        heroVisual.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
      }

      if (stage) {
        const rect = stage.getBoundingClientRect();

        const rawProgress =
          (viewportHeight - rect.top) /
          (viewportHeight + rect.height);

        const progress = Math.max(0, Math.min(1, rawProgress));
        const centered = progress - 0.5;

        if (energy) {
          const x = Math.sin(progress * Math.PI) * 6;
          const y = centered * 40;
          const rotate = -1 + progress * 2;

          energy.style.transform = `
            translate3d(${x}px, ${y}px, 0)
            rotate(${rotate}deg)
          `;
        }

        if (antifog) {
          const x = Math.sin(progress * Math.PI * 1.2) * -5;
          const y = centered * -28;
          const rotate = 0.8 - progress * 1.6;

          antifog.style.transform = `
            translate3d(${x}px, ${y}px, 0)
            rotate(${rotate}deg)
          `;
        }

        if (cup) {
          const x = Math.sin(progress * Math.PI * 0.85) * 5;
          const y = centered * 28;
          const rotate = -0.6 + progress * 1.2;

          cup.style.transform = `
            translate3d(${x}px, ${y}px, 0)
            rotate(${rotate}deg)
          `;
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(updateScrollEffects);
    };

    updateScrollEffects();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  function switchLanguage(targetLanguage: "en" | "id") {
    // Don't reload if the visitor clicks the language they're already using.
    if (
      (targetLanguage === "id" && isIndonesian) ||
      (targetLanguage === "en" && !isIndonesian)
    ) {
      return;
    }

    const sectionIds = [
      "home",
      "starter",
      "products",
      "shop",
      "about",
      "faq",
    ];

    // Use a point slightly above the middle of the screen
    // to determine what the visitor is currently reading.
    const viewportAnchor = window.innerHeight * 0.35;

    let sectionId: string | null = null;
    let sectionProgress = 0;

    for (const id of sectionIds) {
      const section = document.getElementById(id);

      if (!section) continue;

      const rect = section.getBoundingClientRect();

      if (rect.top <= viewportAnchor && rect.bottom > viewportAnchor) {
        sectionId = id;

        sectionProgress = Math.max(
          0,
          Math.min(
            1,
            (viewportAnchor - rect.top) / Math.max(rect.height, 1)
          )
        );

        break;
      }
    }

    // Fallback for areas such as the final CTA/footer.
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );

    const pageProgress = Math.max(
      0,
      Math.min(1, window.scrollY / maxScroll)
    );

    // Remember which product is visible in the desktop carousel.
    const rail = productRailRef.current;

    const productIndex =
      sectionId === "products" && rail && rail.clientWidth > 0
        ? Math.round(rail.scrollLeft / rail.clientWidth)
        : null;

    sessionStorage.setItem(
      "nugel-language-scroll",
      JSON.stringify({
        sectionId,
        sectionProgress,
        pageProgress,
        productIndex,
      })
    );

    const hash =
      sectionId && sectionId !== "home"
        ? `#${sectionId}`
        : "";

    window.location.href = `/${targetLanguage}${hash}`;
  }
  function addToCart(productId: ProductId) {
    setCart((current) => ({
      ...current,
      [productId]: current[productId] + 1,
    }));

    setCartNotice(
      `${productDisplayName(productId)} ${
        isIndonesian ? "ditambahkan ke keranjang" : "added to your cart"
      }`
    );

    if (cartNoticeTimerRef.current !== null) {
      window.clearTimeout(cartNoticeTimerRef.current);
    }

    cartNoticeTimerRef.current = window.setTimeout(() => {
      setCartNotice(null);
      cartNoticeTimerRef.current = null;
    }, 2400);
  }

  function increaseQuantity(productId: ProductId) {
    setCart((current) => ({
      ...current,
      [productId]: current[productId] + 1,
    }));
  }

  function decreaseQuantity(productId: ProductId) {
    setCart((current) => ({
      ...current,
      [productId]: Math.max(0, current[productId] - 1),
    }));
  }

  function clearCart() {
    setCart({ ...emptyCart });
    localStorage.removeItem("nugel-cart");
  }

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const cartTotal = (
    Object.keys(products) as ProductId[]
  ).reduce((total, id) => {
    return total + products[id].price * cart[id];
  }, 0);

  function formatRupiah(value: number) {
    return `Rp ${new Intl.NumberFormat(isIndonesian ? "id-ID" : "en-US", {
      maximumFractionDigits: 0,
    }).format(value)}`;
  }

  function goToProduct(index: number) {
    const productSection = document.getElementById("products");

    if (window.innerWidth < 768) {
      const mobileProduct = document.querySelector<HTMLElement>(
        `[data-product-index="${index}"]`
      );

      mobileProduct?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    productSection?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    window.setTimeout(() => {
      const rail = productRailRef.current;

      if (!rail) return;

      rail.scrollTo({
        left: rail.clientWidth * index,
        behavior: "smooth",
      });
    }, 420);
  }

  function scrollToSection(href: string) {
    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    if (href === "#home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // Start every section from its top on both mobile and desktop.
      // Leave space for the fixed navigation header.
      const rect = target.getBoundingClientRect();
      const headerOffset = window.innerWidth < 768 ? 78 : 88;
      const top = window.scrollY + rect.top - headerOffset;

      window.scrollTo({
        top: Math.max(0, top),
        behavior: "smooth",
      });
    }

    window.history.pushState(null, "", href);
  }

  function scrollRailLoop(
    railRef: { current: HTMLDivElement | null },
    direction: -1 | 1,
    itemCount: number
  ) {
    const rail = railRef.current;
    if (!rail) return;

    const width = rail.clientWidth;
    if (!width) return;

    const currentIndex = Math.round(rail.scrollLeft / width);
    let nextIndex = currentIndex + direction;

    // Keep carousel navigation circular: last -> first and first -> last.
    if (nextIndex >= itemCount) nextIndex = 0;
    if (nextIndex < 0) nextIndex = itemCount - 1;

    rail.scrollTo({
      left: nextIndex * width,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    // Products also loop when swiping horizontally on a mousepad/trackpad.
    // Ordinary vertical scrolling remains untouched.
    const bindInfiniteTrackpad = (
      rail: HTMLDivElement | null,
      itemCount: number
    ) => {
      if (!rail || window.innerWidth < 768) return () => {};

      let wrapLocked = false;
      let unlockTimer: number | null = null;

      const unlockWrap = () => {
        if (unlockTimer !== null) {
          window.clearTimeout(unlockTimer);
        }

        unlockTimer = window.setTimeout(() => {
          wrapLocked = false;
          unlockTimer = null;
        }, 360);
      };

      const onWheel = (event: WheelEvent) => {
        const isHorizontalGesture =
          Math.abs(event.deltaX) > Math.abs(event.deltaY);

        const horizontalDelta = isHorizontalGesture
          ? event.deltaX
          : event.shiftKey
            ? event.deltaY
            : 0;

        if (Math.abs(horizontalDelta) < 1) return;

        const width = rail.clientWidth;
        if (!width || itemCount < 2) return;

        const maxScrollLeft = width * (itemCount - 1);
        const edgeTolerance = Math.max(4, width * 0.01);

        if (
          horizontalDelta > 0 &&
          rail.scrollLeft >= maxScrollLeft - edgeTolerance
        ) {
          event.preventDefault();

          if (!wrapLocked) {
            wrapLocked = true;
            rail.scrollTo({
              left: 0,
              behavior: "smooth",
            });
            unlockWrap();
          }

          return;
        }

        if (
          horizontalDelta < 0 &&
          rail.scrollLeft <= edgeTolerance
        ) {
          event.preventDefault();

          if (!wrapLocked) {
            wrapLocked = true;
            rail.scrollTo({
              left: maxScrollLeft,
              behavior: "smooth",
            });
            unlockWrap();
          }
        }
      };

      rail.addEventListener("wheel", onWheel, { passive: false });

      return () => {
        rail.removeEventListener("wheel", onWheel);

        if (unlockTimer !== null) {
          window.clearTimeout(unlockTimer);
        }
      };
    };

    const unbindProducts = bindInfiniteTrackpad(
      productRailRef.current,
      3
    );
    return () => {
      unbindProducts();
    };
  }, []);

  useEffect(() => {
    if (activeAboutBubble === null) return;

    const previousOverflow = document.body.style.overflow;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveAboutBubble(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeAboutBubble]);

  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  const filteredSearchItems = normalizedSearchQuery
    ? searchItems.filter((item) =>
        `${item.title} ${item.description} ${item.keywords}`
          .toLowerCase()
          .includes(normalizedSearchQuery)
      )
    : searchItems;

  function orderViaWhatsApp() {
    const orderLines = (
      Object.keys(products) as ProductId[]
    )
      .filter((id) => cart[id] > 0)
      .map((id) => {
        const quantity = cart[id];
        const subtotal = products[id].price * quantity;

        return `${quantity}x ${productDisplayName(id)} - ${formatRupiah(
          subtotal
        )}`;
      });

    const message = isIndonesian
      ? `Halo NÜGEL! 👋

Saya ingin melakukan pemesanan:

${orderLines.join("\n")}

Total: ${formatRupiah(cartTotal)}

Nama:
Alamat:
Kota/Kabupaten:
Kode Pos:

Terima kasih!`
      : `Hello NÜGEL! 👋

I would like to place an order:

${orderLines.join("\n")}

Total: ${formatRupiah(cartTotal)}

Name:
Address:
City/Regency:
Postal Code:

Thank you!`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  }


  const faqItems = isIndonesian
    ? [
      [
        "Apa isi Starter Kit?",
        `NÜGEL Starter Kit berisi:
• 200 mL Konsentrat Minuman Olahraga
• Wadah Takar NÜGEL
• 10 mL NÜGEL Anti-Fog

Jika dibeli terpisah, total harga ketiga produk adalah ${formatRupiah(STARTER_REGULAR_PRICE)}. Harga Starter Kit adalah ${formatRupiah(products.starter.price)}, jadi Anda hemat ${formatRupiah(STARTER_SAVINGS)}.`,
      ],
      [
        "Apakah produknya bisa dibeli satuan?",
        `Ya. Konsentrat Minuman Olahraga, Wadah Takar, dan Anti-Fog semuanya dapat dibeli secara terpisah. Jika Anda menginginkan ketiganya, Starter Kit menghemat ${formatRupiah(STARTER_SAVINGS)} dibandingkan membeli satuan.`,
      ],
      [
        "NÜGEL Konsentrat Minuman Olahraga tersedia dalam ukuran apa saja?",
        `NÜGEL Konsentrat Minuman Olahraga tersedia dalam botol 200 mL (7 sajian) dan 515 mL (18 sajian).

- 200 mL menghasilkan 7 × 400 mL* = total 2,8 L minuman olahraga.

- 515 mL menghasilkan 18 × 400 mL* = total 7,2 L minuman olahraga.

*Cara membuat 400 mL: Campurkan satu sajian (28,5 mL konsentrat) dengan sekitar 375 mL air.`,
      ],
      [
        "Berapa lama konsentrat larut dalam air?",
        "Konsentrat larut seketika hanya dengan 2–3 kali kocokan atau adukan — tanpa gumpalan dan tanpa menunggu, berbeda dengan bubuk.",
      ],
      [
        "Apakah Minuman Olahraga NÜGEL yang sudah disiapkan bersifat isotonik?",
        `Ya. NÜGEL diformulasikan agar berada dalam rentang isotonik ketika disiapkan sesuai petunjuk (28,5 mL konsentrat + 375 mL air ≈ 400 mL).

Bagaimana kami memperkirakannya:

Suatu minuman disebut hipotonik, isotonik, atau hipertonik terutama berdasarkan osmolalitasnya. Minuman olahraga isotonik umumnya digambarkan memiliki osmolalitas sekitar 270–330 mOsm/kg, mendekati konsentrasi cairan tubuh.

Per sekitar 400 mL minuman yang sudah disiapkan:

1. Karbohidrat:
27 g gula ≈ 197,2 mOsm/kg

2. Elektrolit:

Natrium 190 mg ≈ 20,6 mOsm/kg
Kalium 190 mg ≈ 12,1 mOsm/kg
Klorida 310 mg ≈ 21,8 mOsm/kg
Mineral lain (Mg, Ca, P) ≈ 5,0 mOsm/kg
Total Elektrolit ≈ 59,6 mOsm/kg

3. Serat + Protein:
≈ 2,0 mOsm/kg

4. Asam organik dari nira kelapa, air jeruk nipis, dan asam tambahan:
≈ 21,2 mOsm/kg

Perkiraan total:

197,2 + 59,6 + 2,0 + 21,2 ≈ 280 mOsm/kg

Perkiraan berbasis formulasi ini menempatkan minuman NÜGEL yang sudah disiapkan dalam rentang isotonik yang umum digunakan, yaitu sekitar 270–330 mOsm/kg. Osmolalitas sebenarnya dapat bervariasi dan dapat dikonfirmasi melalui pengukuran laboratorium.

Gula dalam nira kelapa terutama berupa sukrosa, yang setelah dikonsumsi dipecah menjadi glukosa dan fruktosa dengan rasio sekitar 1:1. Keduanya kemudian diserap melalui jalur transportasi usus yang berbeda — terutama SGLT1 untuk glukosa dan GLUT5 untuk fruktosa. Prinsip karbohidrat ganda ini banyak digunakan dalam formulasi nutrisi olahraga daya tahan profesional.`,
      ],
      [
        "Apakah NÜGEL halal?",
        "Ya. NÜGEL Konsentrat Minuman Olahraga berlabel Halal Indonesia.",
      ],
      [
        "Apakah NÜGEL Konsentrat Minuman Olahraga cocok untuk anak-anak?",
        "NÜGEL dapat digunakan oleh atlet muda berusia sekitar 9–18 tahun selama aktivitas olahraga yang berkepanjangan atau berat. Untuk aktivitas harian normal dan sesi yang lebih singkat, air tetap sebaiknya menjadi minuman utama, dan atlet yang lebih muda sebaiknya menggunakan minuman olahraga sesuai kebutuhan masing-masing serta dengan pengawasan orang tua.",
      ],
      [
        "Apakah NÜGEL Konsentrat Minuman Olahraga mengandung kafein dan aman dari sisi doping?",
        "NÜGEL tidak mengandung kafein atau stimulan tambahan dan tidak secara sengaja mengandung zat yang dilarang oleh WADA (World Anti-Doping Agency). Seperti produk nutrisi olahraga lainnya, atlet kompetitif tetap sebaiknya memeriksa persyaratan anti-doping terbaru sebelum digunakan.",
      ],
      [
        "Apakah NÜGEL Anti-Fog boleh digunakan pada kacamata renang baru?",
        `Kacamata renang baru biasanya sudah memiliki lapisan anti-fog dari pabrik di bagian dalam lensa. Jika lapisan asli ini masih bekerja dengan baik, biasanya NÜGEL belum perlu langsung digunakan. Sebaiknya biarkan lapisan pabrik tetap utuh dan hindari menggosok bagian dalam lensa tanpa perlu.

Seiring waktu, lapisan anti-fog asli dapat perlahan kehilangan efektivitasnya. Tergantung merek, jenis lensa, dan frekuensi penggunaan, hal ini dapat terjadi setelah beberapa minggu atau bulan. Anda mungkin mulai melihat kacamata lebih cepat berembun, atau sebagian lensa tetap jernih sementara bagian lain mulai berkabut.

Saat lapisan asli sudah jelas menurun efektivitasnya, periksa terlebih dahulu petunjuk perawatan dari produsen kacamata renang. Jika pembersihan bagian dalam lensa diperbolehkan, cuci perlahan menggunakan air hangat bersih dan sedikit deterjen lembut, lalu bilas hingga bersih. Hindari pembersih abrasif, pasta gigi, pelarut kuat, atau menggosok terlalu keras karena dapat merusak lensa.

Setelah bagian dalam lensa bersih dan cukup merata, NÜGEL Anti-Fog dapat digunakan sebagai perawatan anti-fog selanjutnya.`,
      ],
      [
        "Bagaimana cara memesan?",
        "Produk NÜGEL saat ini dapat dipesan melalui website kami atau langsung melalui WhatsApp.",
      ],
      [
        "Bagaimana ongkos kirim dihitung?",
        "Biaya pengiriman dihitung berdasarkan lokasi tujuan, berat paket, dan layanan pengiriman yang dipilih. Ongkos kirim yang berlaku akan dikonfirmasi melalui WhatsApp dan dicantumkan dalam invoice.",
      ],
      [
        "Bagaimana cara pembayarannya?",
        "Pembayaran dapat dilakukan melalui QRIS atau transfer bank ke BNI, BCA, atau BRI, berdasarkan jumlah total yang tercantum pada invoice.",
      ],
    ]
    : [
              [
                "What is in the Starter Kit?",
                `The NÜGEL Starter Kit includes:
• 200 mL Sports Drink Concentrate
• NÜGEL Measuring Container
• 10 mL NÜGEL Anti-Fog

Bought separately, the three products total ${formatRupiah(STARTER_REGULAR_PRICE)}. The Starter Kit is ${formatRupiah(products.starter.price)}, so you save ${formatRupiah(STARTER_SAVINGS)}.`,
              ],
              [
                "Can I buy the products separately?",
                `Yes. The Sports Drink Concentrate, Measuring Container, and Anti-Fog can all be purchased separately. If you want all three, the Starter Kit saves you ${formatRupiah(STARTER_SAVINGS)} compared with buying them individually.`,
              ],
              [
                "What sizes does NÜGEL Sports Drink Concentrate come in?",
                `NÜGEL Sports Drink Concentrate comes in 200 mL (7 servings) and 515 mL (18 servings) bottles.

- 200 mL makes 7 × 400 mL* = 2.8 L total sports drink.

- 515 mL makes 18 × 400 mL* = 7.2 L total sports drink.

*How to make 400 mL: Mix one serving (28.5 mL concentrate) with about 375 mL water.`,
              ],
              [
                "How long does it take to dissolve the concentrate in water?",
                "It dissolves instantly with 2-3 shakes or stirs — no clumps, no waiting, unlike powder.",
              ],
              [
                "Is the prepared NÜGEL Sports Drink isotonic?",
                `Yes. NÜGEL is formulated to fall within the isotonic range when prepared as directed (28.5 mL concentrate + 375 mL water ≈ 400 mL).

How we estimated it:

A drink is hypotonic, isotonic or hypertonic depending largely on its osmolality. Isotonic sports drinks are commonly described as having an osmolality of approximately 270–330 mOsm/kg, close to the concentration of body fluids.

Per approximately 400 mL prepared drink:

1. Carbohydrates:
27 g sugar ≈ 197.2 mOsm/kg

2. Electrolytes:

Sodium 190 mg ≈ 20.6 mOsm/kg
Potassium 190 mg ≈ 12.1 mOsm/kg
Chloride 310 mg ≈ 21.8 mOsm/kg
Other minerals (Mg, Ca, P) ≈ 5.0 mOsm/kg
Total Electrolytes ≈ 59.6 mOsm/kg

3. Fiber + Protein:
≈ 2.0 mOsm/kg

4. Organic acids from coconut palm sap, lime juice and added acids:
≈ 21.2 mOsm/kg

Estimated total:

197.2 + 59.6 + 2.0 + 21.2 ≈ 280 mOsm/kg

This formulation-based estimate places the prepared NÜGEL drink within the commonly used isotonic range of approximately 270–330 mOsm/kg. Actual osmolality may vary and can be confirmed by laboratory measurement.

The sugar in coconut palm sap is mainly sucrose, which is broken down after consumption into glucose and fructose in approximately a 1:1 ratio. These are then absorbed through different intestinal transport pathways—primarily SGLT1 for glucose and GLUT5 for fructose. This dual-carbohydrate principle is widely used in pro endurance sports nutrition formulations.`,
              ],
              [
                "Is NÜGEL halal?",
                "Yes. NÜGEL Sports Drink Concentrate is labeled Halal Indonesia.",
              ],
              [
                "Is NÜGEL Sports Drink Concentrate suitable for kids?",
                "NÜGEL can be used by young athletes aged approximately 9–18 years during prolonged or demanding sports activities. For normal daily activity and shorter sessions, water should remain the primary drink, and younger athletes should use sports drinks according to their individual needs and with parental supervision.",
              ],
              [
                "Does NÜGEL Sports Drink Concentrate contain caffeine, and is it doping-safe?",
                "NÜGEL contains no caffeine or added stimulants and does not intentionally contain substances prohibited by WADA (World Anti-Doping Agency). As with any sports nutrition product, competitive athletes should always check current anti-doping requirements before use.",
              ],
              [
                "Can I apply NÜGEL Anti-Fog Drops on new goggles?",
                `New swimming goggles usually already have a factory-applied anti-fog coating on the inside of the lenses. If this original coating is still working well, there is normally no need to apply NÜGEL immediately. It is better to leave the factory coating intact and avoid unnecessary rubbing of the inner lens.

Over time, the original anti-fog layer may gradually lose its effectiveness. Depending on the brand, lens type and frequency of use, this may happen after several weeks or months. You may notice that the goggles begin to fog more quickly, or that some parts of the lens remain clear while other areas become foggy.

When the original coating has clearly deteriorated, first check the goggle manufacturer's care instructions. If cleaning of the inner lens is permitted, gently wash the lens with clean lukewarm water and a small amount of mild detergent, then rinse thoroughly. Avoid abrasive cleaners, toothpaste, strong solvents or aggressive rubbing, as these may damage the lens.

Once the inner lens is clean and reasonably uniform, NÜGEL Anti-Fog Drops can be applied as the ongoing anti-fog treatment.`,
              ],
              [
                "How do I order?",
                "NÜGEL products can currently be ordered through our website or directly via WhatsApp.",
              ],
              [
                "How is shipping calculated?",
                "Shipping costs are calculated based on your delivery location, package weight, and selected shipping service. The applicable shipping cost will be confirmed via WhatsApp and included in the invoice.",
              ],
              [
                "How is payment made?",
                "Payment can be made via QRIS or bank transfer to BNI, BCA, or BRI, based on the total amount stated in the invoice.",
              ],
            ];

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#02131f] text-white">
      {/* ONE pool scene for the whole website. Its position is tied directly to
          total page scroll: 0% at the top, 100% at the footer. */}
      <div
        ref={backgroundRef}
        className="nugel-continuous-pool-scene fixed inset-0 -z-20 will-change-transform"
        style={{
          backgroundImage: "url('/images/pool-continuous.png')",
          backgroundPosition: "center 0%",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Global contrast overlay; this does not create section boundaries. */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#02131f]/5 via-[#02131f]/14 to-[#010911]/52" />
      {/* HEADER */}
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/10 bg-[#02131f]/45 px-6 py-3 shadow-[0_8px_35px_rgba(0,0,0,0.12)] backdrop-blur-xl transition-all duration-700 md:px-12 lg:px-20 ${
          pageReady
            ? "translate-y-0 opacity-100"
            : "-translate-y-5 opacity-0"
        }`}
      >
        <a
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            setMobileMenuOpen(false);
            scrollToSection("#home");
          }}
          className="transition hover:scale-105"
        >
          <Image
            src="/images/nugel-logo.png"
            alt="NÜGEL"
            width={210}
            height={70}
            priority
            className="h-auto w-[112px] sm:w-[128px] md:w-[158px]"
          />
        </a>

        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {[
            ["#starter", t("Starter Kit", "Paket Pemula")],
            ["#products", t("Products", "Produk")],
            ["#shop", t("Shop", "Belanja")],
            ["#about", t("About", "Tentang")],
            ["#faq", "FAQ"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={(event) => {
                event.preventDefault();
                scrollToSection(href);
              }}
              className="nugel-nav-link relative py-2"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? t("Close navigation", "Tutup navigasi") : t("Open navigation", "Buka navigasi")}
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center text-white/90 transition hover:text-[#9DFF00] md:hidden"
          >
            {mobileMenuOpen ? (
              <span className="text-2xl leading-none">×</span>
            ) : (
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={t("Search NÜGEL", "Cari di NÜGEL")}
            className="flex h-10 w-10 items-center justify-center text-white/90 transition hover:scale-110 hover:text-[#9DFF00]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6"
            >
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="m20 20-4-4" />
            </svg>
          </button>

          <button
            onClick={() => setCartOpen(true)}
            aria-label={t(`Open cart with ${cartCount} item${cartCount === 1 ? "" : "s"}`, `Buka keranjang dengan ${cartCount} item`)}
            className="relative flex h-10 w-10 items-center justify-center text-white/95 transition hover:scale-110 hover:text-[#9DFF00]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 1.9-1.4L21 7H7"
              />
              <circle cx="10" cy="20" r="1" />
              <circle cx="18" cy="20" r="1" />
            </svg>

            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#9DFF00] px-1 text-[10px] font-black text-black">
                {cartCount}
              </span>
            )}
          </button>
          <div className="flex items-center rounded-full border border-white/15 bg-white/[0.06] p-1 text-[10px] font-black backdrop-blur-md sm:text-xs">
            <button
              type="button"
              onClick={() => switchLanguage("en")}
              aria-label="View website in English"
              aria-pressed={!isIndonesian}
              className={`rounded-full px-2 py-1.5 transition sm:px-2.5 ${
                !isIndonesian
                  ? "bg-[#9DFF00] text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              EN
            </button>

            <button
              type="button"
              onClick={() => switchLanguage("id")}
              aria-label="Lihat website dalam Bahasa Indonesia"
              aria-pressed={isIndonesian}
              className={`rounded-full px-2 py-1.5 transition sm:px-2.5 ${
                isIndonesian
                  ? "bg-[#9DFF00] text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              ID
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-x-3 top-[72px] z-[80] overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#031522]/95 p-2 shadow-2xl backdrop-blur-2xl md:hidden">
          {[
            ["#home", t("Home", "Beranda")],
            ["#starter", t("Starter Kit", "Paket Pemula")],
            ["#products", t("Products", "Produk")],
            ["#shop", t("Shop", "Belanja")],
            ["#about", t("About", "Tentang")],
            ["#faq", "FAQ"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={(event) => {
                event.preventDefault();
                setMobileMenuOpen(false);
                scrollToSection(href);
              }}
              className="block rounded-xl px-4 py-3 text-sm font-bold text-white/90 transition active:bg-white/10 active:text-[#9DFF00]"
            >
              {label}
            </a>
          ))}
        </div>
      )}

      {searchOpen && (
        <div className="fixed inset-0 z-[90]">
          <button
            type="button"
            aria-label={t("Close search", "Tutup pencarian")}
            onClick={() => setSearchOpen(false)}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
          />

          <div className="absolute left-1/2 top-24 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 overflow-hidden rounded-[2rem] border border-white/15 bg-[#031522]/95 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-5 w-5 shrink-0 text-white/55"
              >
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" d="m20 20-4-4" />
              </svg>

              <input
                autoFocus
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t("Search NÜGEL, nutrition, anti-fog...", "Cari NÜGEL, nutrisi, anti-fog...")}
                className="min-w-0 flex-1 bg-transparent py-2 text-base text-white outline-none placeholder:text-white/35"
              />

              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label={t("Close search", "Tutup pencarian")}
                className="flex h-9 w-9 items-center justify-center text-2xl text-white/60 transition hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-3">
              {filteredSearchItems.length > 0 ? (
                filteredSearchItems.map((item) => (
                  <a
                    key={`${item.title}-${item.href}`}
                    href={item.href}
                    onClick={(event) => {
                      setSearchOpen(false);
                      setSearchQuery("");

                      event.preventDefault();

                      if (item.productIndex !== undefined) {
                        goToProduct(item.productIndex);
                      } else {
                        scrollToSection(item.href);
                      }
                    }}
                    className="block rounded-2xl px-4 py-4 transition hover:bg-white/[0.08]"
                  >
                    <p className="font-bold">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-white/55">
                      {item.description}
                    </p>
                  </a>
                ))
              ) : (
                <div className="px-4 py-10 text-center text-white/50">
                  {t("No matching result yet.", "Belum ada hasil yang cocok.")}
                </div>
              )}
            </div>
          </div>
        </div>
      )}


      {cartNotice && (
        <div
          role="status"
          aria-live="polite"
          className="nugel-cart-notice fixed right-4 top-24 z-[60] flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-2xl border border-white/15 bg-[#041827]/95 px-4 py-3 shadow-2xl backdrop-blur-2xl sm:right-6 md:right-12 lg:right-20"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9DFF00] font-black text-black">
            ✓
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold">{t("Added to cart", "Ditambahkan ke keranjang")}</p>
            <p className="truncate text-xs text-white/60">{cartNotice}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setCartNotice(null);
              setCartOpen(true);
            }}
            className="ml-2 shrink-0 text-xs font-bold text-[#9DFF00] transition hover:text-white"
          >
            {t("View cart", "Lihat keranjang")}
          </button>
        </div>
      )}

      {/* HERO — the same global pool image keeps moving behind this section */}
      <section id="home" className="relative min-h-[100svh] lg:h-svh">
        <div className="min-h-[100svh] overflow-hidden lg:sticky lg:top-0 lg:h-svh">
          {/* contrast for the headline while preserving the pool artwork */}
          <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#00121f]/80 via-[#00121f]/30 to-transparent" />
          <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-white/[0.04] via-transparent to-[#00101c]/20" />

          {/* HERO CONTENT */}
          <div
            className={`relative z-20 flex min-h-[100svh] items-center px-6 pb-10 pt-24 transition-opacity duration-1000 md:px-12 lg:h-full lg:min-h-0 lg:px-20 lg:pb-0 lg:pt-12 ${
              pageReady ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="mx-auto grid w-full max-w-7xl items-center gap-7 sm:gap-9 lg:-translate-y-3 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10">
              <div className="max-w-2xl">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.38em] text-[#9DFF00]">
                  {t("Made for swimmers", "Dibuat untuk perenang")}
                </p>

                <h1 className="text-[2.7rem] font-black leading-[0.93] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-[5.5rem] lg:leading-[0.9] xl:text-[6rem]">
                  <span className="block">
                    {t("Stay fueled,", "Tetap bertenaga,")}
                  </span>

                  <span className="mt-4 block">
                    {t("hydrated &", "terhidrasi &")}
                  </span>

                  <span className="mt-4 block">
                    {t("clear.", "jernih.")}
                  </span>
                </h1>

                <p className="mt-5 max-w-xl text-base font-medium leading-7 text-white/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.28)] md:text-lg">
                  {t("Keep your stamina up and your swim focused. NÜGEL essentials designed for every swim session.", "Jaga stamina dan tetap fokus saat berenang. Produk esensial NÜGEL dirancang untuk setiap sesi renang.")}
                </p>

                <div className="mt-7 flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-4">
                  <a
                    href="#starter"
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection("#starter");
                    }}
                    className="w-full cursor-pointer rounded-full bg-[#9DFF00] px-6 py-3.5 text-center font-bold text-black transition duration-300 hover:scale-[1.03] hover:bg-[#B7FF4A] md:w-auto"
                  >
                    {t("Start with the essentials", "Mulai dengan yang esensial")}
                  </a>

                  <a
                    href="#shop"
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection("#shop");
                    }}
                    className="w-full cursor-pointer rounded-full border border-white/60 bg-[#031827]/55 px-6 py-3.5 text-center font-bold text-white shadow-[0_10px_30px_rgba(0,0,0,0.16)] backdrop-blur-md transition duration-300 hover:scale-[1.03] hover:border-[#9DFF00]/70 hover:bg-[#08283a]/80 md:w-auto"
                  >
                    {t("Shop all", "Belanja semua")}
                  </a>
                </div>

                <div className="relative mx-auto mt-7 flex w-full max-w-[290px] justify-center lg:hidden">
                  <div className="pointer-events-none absolute bottom-[6%] left-1/2 h-10 w-[78%] -translate-x-1/2 rounded-full bg-black/25 blur-xl" />
                  <Image
                    src="/images/nugel-home-products.png"
                    alt={t(
                      "NÜGEL Starter Kit with Sports Drink Concentrate, Measuring Container and Anti-Fog Drops",
                      "NÜGEL Starter Kit dengan Konsentrat Minuman Olahraga, Wadah Takar, dan Anti-Fog"
                    )}
                    width={952}
                    height={1310}
                    loading="eager"
                    className="relative z-10 h-auto w-[235px] max-w-full object-contain drop-shadow-[0_24px_36px_rgba(0,0,0,0.28)] sm:w-[270px]"
                  />
                </div>
              </div>

              {/* Featured Starter Kit — single composite hero image. */}
              <div
                ref={heroVisualRef}
                className="relative hidden min-h-[540px] origin-center lg:flex lg:items-center lg:justify-center"
                style={{ willChange: "transform" }}
              >
                <div className="absolute left-[65%] top-[24%] z-40 -translate-x-1/2 -translate-y-1/2">
                  <p
                    className="font-sans text-[1.1rem] font-black uppercase leading-[1.02] tracking-[0.12em] text-[#07131a] xl:text-[1.28rem]"
                    style={{
                      textShadow:
                        "0 0 6px rgba(255,255,255,1), 0 0 14px rgba(255,255,255,1), 0 0 28px rgba(255,255,255,0.95), 0 0 42px rgba(255,255,255,0.8), 0 0 60px rgba(255,255,255,0.55)",
                    }}
                  >
                    <span className="block">{t("Featured", "Unggulan")}</span>
                    <span className="block">{t("Starter Kit", "Starter Kit")}</span>
                  </p>
                </div>

                <div className="pointer-events-none absolute left-1/2 top-[60%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200/10 blur-3xl" />

                {/* Lower the full product composition slightly, including its pool shadow */}
                <div className="relative z-10 mt-16 flex items-center justify-center">
                  {/* Ground shadow / pool contact shadow under the hero image */}
                  <div className="pointer-events-none absolute bottom-[3%] left-1/2 z-0 h-[54px] w-[420px] -translate-x-1/2 rounded-[999px] bg-black/30 blur-2xl xl:h-[60px] xl:w-[470px]" />
                  <div className="pointer-events-none absolute bottom-[2%] left-1/2 z-0 h-[26px] w-[360px] -translate-x-1/2 rounded-[999px] bg-slate-900/35 blur-xl xl:w-[400px]" />
                  <div className="pointer-events-none absolute bottom-[1.5%] left-1/2 z-0 h-[20px] w-[300px] -translate-x-1/2 rounded-[999px] bg-cyan-300/10 blur-xl xl:w-[340px]" />

                  <Image
                    src="/images/nugel-home-products.png"
                    alt={t("NÜGEL Starter Kit with Energy, Mixing Cup and Anti-Fog Drops", "NÜGEL Starter Kit dengan Konsentrat Minuman Olahraga, Wadah Takar, dan Anti-Fog")}
                    width={952}
                    height={1310}
                    loading="eager"
                    className="hero-composite-image relative z-10 h-auto w-[465px] max-w-full translate-y-4 object-contain drop-shadow-[0_34px_54px_rgba(0,0,0,0.28)] xl:w-[510px]"
                  />

                  <div className="pointer-events-none absolute inset-0 z-30">
                    <div
                      tabIndex={0}
                      className="hero-product-hotspot hero-product-hotspot-energy pointer-events-auto"
                      aria-label={t("NÜGEL Sports Drink Concentrate", "NÜGEL Konsentrat Minuman Olahraga")}
                    >
                      <span className="hero-product-tooltip">{t("Sports Drink Concentrate", "Konsentrat Minuman Olahraga")}</span>
                    </div>
                    <div
                      tabIndex={0}
                      className="hero-product-hotspot hero-product-hotspot-container pointer-events-auto"
                      aria-label={t("NÜGEL Measuring Container", "NÜGEL Wadah Takar")}
                    >
                      <span className="hero-product-tooltip">
                        {t("Measuring", "Wadah")}
                        <br />
                        {t("Container", "Takar")}
                      </span>
                    </div>
                    <div
                      tabIndex={0}
                      className="hero-product-hotspot hero-product-hotspot-antifog pointer-events-auto"
                      aria-label="NÜGEL Anti-Fog"
                    >
                      <span className="hero-product-tooltip">Anti-Fog</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* STARTER KIT */}
      <section
        id="starter"
        ref={productStageRef}
        className="scroll-mt-24 relative flex min-h-0 items-center px-5 py-14 sm:px-6 md:px-12 md:py-16 lg:min-h-[90svh] lg:px-20 lg:py-12"
      >
        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 md:gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="lg:translate-x-8 xl:translate-x-10">
            <div
              data-reveal
              className="nugel-reveal rounded-[1.75rem] border border-white/18 bg-[#021522]/72 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur-xl md:p-6"
            >
              <p className="text-xs font-black uppercase tracking-[0.35em] text-[#B7FF4A] drop-shadow-[0_1px_8px_rgba(157,255,0,0.18)]">
                {t("Don\'t know where to start?", "Bingung mulai dari mana?")}
              </p>

              <h2 className="mt-3 max-w-xl text-3xl font-black tracking-tight md:text-4xl">
                {t("Start with", "Mulai dengan")}
                <br />
                {t("the essentials.", "yang esensial.")}
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-6 text-white/90 md:text-base">
                {t("The NÜGEL Starter Kit brings together the essentials you need for a fueled, hydrated and focused swim.", "NÜGEL Starter Kit menyatukan perlengkapan esensial yang Anda butuhkan agar tetap bertenaga, terhidrasi, dan fokus saat berenang.")}
              </p>

              <div className="mt-5 rounded-2xl border border-[#9DFF00]/20 bg-[#9DFF00]/[0.06] p-4">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <p className="text-sm font-black uppercase tracking-[0.12em] text-white">
                    NÜGEL Starter Kit
                  </p>
                </div>

                <p className="mt-2 text-sm leading-6 text-white/70">
                  {t("200 mL Sports Drink Concentrate + Measuring Container + 10 mL Anti-Fog", "200 mL Konsentrat Minuman Olahraga + Wadah Takar + 10 mL Anti-Fog")}
                </p>

                <div className="mt-3 flex flex-wrap items-end gap-x-3 gap-y-2">
                  <span className="-translate-y-1.5 text-sm font-semibold text-white/50 line-through decoration-white/65 decoration-2">
                    {formatRupiah(STARTER_REGULAR_PRICE)}
                  </span>
                  <span className="text-xl font-black text-[#9DFF00]">
                    {formatRupiah(products.starter.price)}
                  </span>
                  <span className="pb-0.5 text-xs font-black uppercase tracking-[0.12em] text-[#C7FF72]">
                    {t("Save", "Hemat")} {formatRupiah(STARTER_SAVINGS)}
                  </span>
                </div>
              </div>

              <div className="mt-5 border-t border-white/12 pt-4">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/75">
                  {t("What\'s included in the kit?", "Apa saja isi paketnya?")}
                </p>

                <div className="mt-3 divide-y divide-white/10">
                  {[
                    {
                      name: t("Sports Drink Concentrate", "Konsentrat Minuman Olahraga"),
                      detail: t("Maintain your energy and hydration levels", "Jaga tingkat energi dan hidrasi Anda"),
                      productIndex: 0,
                    },
                    {
                      name: t("Anti-Fog Drops", "Tetes Anti-Fog"),
                      detail: t("Keep your goggles clear and fog-free", "Jaga kacamata renang tetap jernih dan bebas embun"),
                      productIndex: 1,
                    },
                    {
                      name: t("Measuring Container", "Wadah Takar"),
                      detail: t("Reusable container for your swim routine", "Wadah pakai ulang untuk rutinitas berenang Anda"),
                      productIndex: 2,
                    },
                  ].map((item) => (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => {
                        if (item.productIndex === 0) {
                          setSpotlightSize(200);
                        }
                        goToProduct(item.productIndex);
                      }}
                      className="starter-kit-item -mx-2 flex w-[calc(100%+1rem)] items-center justify-between gap-5 px-2 py-3 text-left"
                    >
                      <div>
                        <p className="starter-kit-item-name font-bold text-white">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-white/72">
                          {item.detail}
                        </p>
                      </div>

                      <span className="starter-kit-arrow relative grid h-8 w-8 shrink-0 place-items-center text-base text-white/65">
                        <span
                          aria-hidden="true"
                          className="starter-kit-arrow-circle absolute inset-0 rounded-full"
                        />
                        <span className="starter-kit-arrow-symbol relative z-10">
                          →
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <button
                  onClick={() => addToCart("starter")}
                  className="w-full rounded-full bg-white px-6 py-3.5 text-sm font-bold text-[#031522] transition duration-300 hover:scale-[1.03] sm:w-auto"
                >
                  {t("Get the Starter Kit", "Dapatkan Starter Kit")} · {formatRupiah(products.starter.price)}
                </button>

                <div className="mt-6 flex justify-end border-t border-white/12 pb-2 pt-5">
                  <a
                    href="#products"
                    onClick={(event) => {
                      event.preventDefault();
                      setSpotlightSize(200);
                      goToProduct(0);
                    }}
                    className="text-sm font-bold text-[#9DFF00] transition-colors hover:text-white"
                  >
                    {t("Want to buy separately?", "Ingin membeli satuan?")}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[350px] sm:min-h-[460px] lg:min-h-[540px] lg:translate-x-10 xl:translate-x-14">
            <div className="flex min-h-[350px] items-center justify-center sm:min-h-[460px] lg:min-h-[540px]">
              <div className="relative h-[350px] w-full max-w-[780px] sm:h-[460px] lg:h-[540px]">
                <div className="absolute bottom-[1%] left-1/2 h-[340px] w-[340px] -translate-x-1/2 sm:h-[450px] sm:w-[520px] md:h-[500px] md:w-[600px] lg:h-[525px] lg:w-[620px] xl:h-[555px] xl:w-[700px]">
                  {/* Back-left: Energy stays dominant, but sits slightly behind the cup. */}
                  <div
                    ref={energyMoverRef}
                    className="absolute bottom-[7%] left-[1%] z-20 will-change-transform"
                  >
                    <div className="nugel-starter-float-energy">
                      <div style={{ transform: "rotate(-5deg)" }}>
                        <Image
                          src="/images/nugel-energy-200.png"
                          alt={t("NÜGEL Sports Drink Concentrate 200 mL", "NÜGEL Konsentrat Minuman Olahraga 200 mL")}
                          width={1122}
                          height={1402}
                          className="h-[315px] w-auto object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.38)] sm:h-[420px] md:h-[470px] lg:h-[495px] xl:h-[535px]"
                          priority
                        />
                      </div>
                    </div>
                  </div>

                  {/* Front-center: the mixing cup is the visual anchor of the bundle. */}
                  <div
                    ref={cupMoverRef}
                    className="absolute bottom-[-1%] left-[52%] z-40 -translate-x-1/2 will-change-transform"
                  >
                    <div className="nugel-starter-float-cup">
                      <div style={{ transform: "rotate(0deg)" }}>
                        <Image
                          src="/images/nugel-mixing-cup.png"
                          alt={t("NÜGEL measuring container", "NÜGEL Wadah Takar")}
                          width={1225}
                          height={1284}
                          className="h-[160px] w-auto object-contain drop-shadow-[0_32px_42px_rgba(0,0,0,0.34)] sm:h-[205px] md:h-[235px] lg:h-[258px] xl:h-[280px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Back-right: Anti-Fog gets its own breathing room from the other two. */}
                  <div
                    ref={antifogMoverRef}
                    className="absolute bottom-[8%] right-[8%] z-20 will-change-transform sm:right-[12%] md:right-[15%] lg:right-[18%]"
                  >
                    <div className="nugel-starter-float-antifog">
                      <div style={{ transform: "rotate(8deg)" }}>
                        <Image
                          src="/images/nugel-antifog.png"
                          alt={t("NÜGEL Anti-Fog Drops 10 mL", "NÜGEL Anti-Fog 10 mL")}
                          width={620}
                          height={1000}
                          className="h-[128px] w-auto object-contain drop-shadow-[0_28px_38px_rgba(0,0,0,0.42)] sm:h-[165px] md:h-[190px] lg:h-[202px] xl:h-[220px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pointer-events-none absolute bottom-[4%] left-1/2 -z-10 h-52 w-[82%] -translate-x-1/2 rounded-[50%] bg-cyan-300/10 blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        id="products"
        className="scroll-mt-24 relative flex min-h-0 flex-col justify-center px-0 py-14 md:py-16 lg:min-h-[90svh] lg:py-12"
      >
        <div className="px-6 md:px-12 lg:px-20">
          <div className="mx-auto w-full max-w-7xl">
            <div data-reveal className="nugel-reveal text-center">
              <div className="mx-auto inline-block rounded-2xl bg-[#021522]/16 px-5 py-3 backdrop-blur-sm">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-[#9DFF00]">
                  {t("Products", "Produk")}
                </p>
                <h2 className="mt-1 text-2xl font-black drop-shadow-lg md:text-3xl">
                  {t("Get to know each NÜGEL essential.", "Kenali setiap produk esensial NÜGEL.")}
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-3">
          <button
            type="button"
            aria-label={t("Previous product", "Produk sebelumnya")}
            onClick={() => scrollRailLoop(productRailRef, -1, 3)}
            className="absolute left-2 top-[22rem] z-30 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-[#02131f]/58 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:border-[#9DFF00] hover:text-[#9DFF00] md:left-6 md:top-1/2 md:grid md:h-9 md:w-9"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="block h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            aria-label={t("Next product", "Produk berikutnya")}
            onClick={() => scrollRailLoop(productRailRef, 1, 3)}
            className="absolute right-2 top-[22rem] z-30 hidden h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-[#02131f]/58 text-white shadow-lg backdrop-blur-md transition hover:scale-105 hover:border-[#9DFF00] hover:text-[#9DFF00] md:right-6 md:top-1/2 md:grid md:h-9 md:w-9"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="block h-3.5 w-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
            </svg>
          </button>

          <div
            ref={productRailRef}
            className="nugel-horizontal-rail flex flex-col gap-12 md:flex-row md:gap-0 md:snap-x md:snap-mandatory md:overflow-x-auto md:scroll-smooth"
          >
            {/* ENERGY */}
            <article data-product-index="0" className="scroll-mt-24 w-full px-5 pb-6 md:min-w-full md:snap-center md:px-8 md:pb-0 lg:px-10 xl:px-16">
              <div className="mx-auto grid max-w-[1380px] items-center gap-4 lg:-translate-x-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-4 xl:-translate-x-10">
                <div className="flex min-h-[300px] flex-col items-center justify-center p-2 sm:min-h-[360px] md:min-h-[400px] lg:min-h-[470px] lg:translate-x-5">
                  <Image
                    src={
                      spotlightSize === 200
                        ? "/images/nugel-energy-200.png"
                        : "/images/nugel-energy-515.png"
                    }
                    alt={t(`NÜGEL Sports Drink Concentrate ${spotlightSize} mL`, `NÜGEL Konsentrat Minuman Olahraga ${spotlightSize} mL`)}
                    width={1122}
                    height={1402}
                    className={`w-auto object-contain drop-shadow-[0_30px_44px_rgba(0,0,0,0.36)] transition-all duration-300 ${
                      spotlightSize === 200
                        ? "h-[302px] scale-x-[0.9] sm:h-[350px] md:h-[402px] lg:h-[455px]"
                        : "h-[285px] scale-x-[1.14] sm:h-[330px] md:h-[380px] lg:h-[430px]"
                    }`}
                  />

                  <div
                    className="mt-3 inline-flex items-center rounded-full border border-white/20 bg-[#031827]/72 p-1 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-md"
                    aria-label={t("Select product size to preview", "Pilih ukuran produk untuk dilihat")}
                  >
                    {[200, 515].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSpotlightSize(size as 200 | 515)}
                        aria-pressed={spotlightSize === size}
                        className={`rounded-full px-4 py-2 text-xs font-black transition ${
                          spotlightSize === size
                            ? "bg-[#9DFF00] text-black shadow-[0_4px_14px_rgba(157,255,0,0.22)]"
                            : "text-white/72 hover:bg-white/[0.08] hover:text-white"
                        }`}
                      >
                        {size} mL
                      </button>
                    ))}
                  </div>

                  <p className="mt-3 max-w-[360px] text-center text-xs leading-5 text-white/92 drop-shadow-[0_2px_10px_rgba(0,0,0,0.72)] sm:text-[13px]">
                    <span className="font-bold">{t("Product shown for illustration.", "Gambar produk hanya untuk ilustrasi.")}</span> {t("Actual", "Dimensi botol")} {spotlightSize} mL {t("bottle dimensions:", "sebenarnya:")} {spotlightSize === 200
                      ? t("height 18.9 cm; diameter 4.2 cm; total weight 295 g.", "tinggi 18,9 cm; diameter 4,2 cm; berat total 295 g.")
                      : t("height 17.9 cm; diameter 6.5 cm; total weight 735 g.", "tinggi 17,9 cm; diameter 6,5 cm; berat total 735 g.")}
                  </p>
                </div>

                <div className="rounded-[2rem] border border-white/14 bg-[#031827]/96 p-5 shadow-[0_22px_65px_rgba(0,0,0,0.28)] md:p-6 xl:p-7">
                  <p className="text-xs font-black uppercase tracking-[0.34em] text-[#B7FF4A]">
                    {t("NÜGEL Sports Drink Concentrate", "NÜGEL Konsentrat Minuman Olahraga")}
                  </p>

                  <h3 className="mt-3 text-3xl font-black leading-[1.03] tracking-[-0.035em] md:text-[2.35rem]">
                    {t("Quality Ingredients and Real Nutrition; More Than Just Sugar & Water.", "Bahan Berkualitas dan Nutrisi Nyata; Lebih dari Sekadar Gula & Air.")}
                  </h3>

                  <div className="mt-4 max-w-5xl space-y-3 text-sm leading-7 text-white/88 md:text-base">
                    <p>
                      {isIndonesian ? (
                        <>
                          NÜGEL Konsentrat Minuman Olahraga dibuat dengan 95% konsentrat nira kelapa, garam laut, dan air jeruk nipis. Nira kelapa adalah
                          cairan manis alami yang dikumpulkan dari bunga kelapa. Bahan ini memberikan
                          gula alami, mineral, dan nutrisi lainnya pada NÜGEL Konsentrat Minuman Olahraga.
                        </>
                      ) : (
                        <>
                          NÜGEL sports drink concentrate is made with 95% coconut palm sap concentrate, sea salt and lime juice. Coconut palm sap is
                          also known in Indonesia as <span className="italic">nira kelapa</span>. Coconut sap is
                          a naturally sweet liquid collected from coconut palm blossoms. It gives
                          NÜGEL sports drink concentrate its natural sugars, minerals and other nutrients.
                        </>
                      )}
                    </p>

                    <p>
                      {t(
                        "Sea salt provides additional important minerals as electrolytes, while real lime juice combined with citric and malic acids gives the drink a fresh taste to balance the sweetness of the sap and create a smooth, refreshing tartness that works well during exercise.",
                        "Garam laut menyediakan mineral penting tambahan sebagai elektrolit, sementara air jeruk nipis asli yang dipadukan dengan asam sitrat dan malat memberikan rasa segar untuk menyeimbangkan manisnya nira dan menghasilkan rasa asam yang halus serta menyegarkan saat berolahraga."
                      )}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {/* HOW TO USE + STORAGE */}
                    <div className="rounded-[1.25rem] border border-white/14 bg-white/[0.025] p-4 md:p-5">
                      <div className="flex items-center gap-3">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-7 w-7 shrink-0 text-[#9DFF00]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3.5c-2.3 3.1-5.2 6.3-5.2 10.2A5.2 5.2 0 0 0 12 18.9a5.2 5.2 0 0 0 5.2-5.2C17.2 9.8 14.3 6.6 12 3.5Z"
                          />
                        </svg>
                        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/90">
                          {t("How to use", "Cara penggunaan")}
                        </p>
                      </div>

                      <p className="mt-4 text-sm leading-6 text-white/88">
                        {t(
                          "Mix 1 serving (28.5 mL / 2 tbsp) with about 375 mL of water to prepare 400 mL of sports drink. Shake briefly — concentrate dissolves instantly.",
                          "Campurkan 1 sajian (28,5 mL / 2 sdm) dengan sekitar 375 mL air untuk menyiapkan 400 mL minuman olahraga. Kocok sebentar — konsentrat larut seketika."
                        )}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-white/78">
                        {t(
                          "Use before, during and/or after training according to your energy, hydration and tolerance needs.",
                          "Gunakan sebelum, selama, dan/atau setelah latihan sesuai kebutuhan energi, hidrasi, dan toleransi Anda."
                        )}
                      </p>

                      <div className="mt-5 border-t border-white/14 pt-4">
                        <div className="flex items-center gap-3">
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-6 w-6 shrink-0 text-[#9DFF00]"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 8 7.5-4.2L19.5 8v8L12 20.2 4.5 16V8Z"
                            />
                            <path strokeLinecap="round" d="M4.8 8 12 12l7.2-4M12 12v8" />
                          </svg>
                          <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/90">
                            {t("Storage", "Penyimpanan")}
                          </p>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-white/78">
                          {t(
                            "Store in a cool, dry place away from direct sunlight. Once opened, keep refrigerated and consume within 30 days.",
                            "Simpan di tempat sejuk dan kering, jauh dari sinar matahari langsung. Setelah dibuka, simpan di lemari es dan habiskan dalam 30 hari."
                          )}
                        </p>
                      </div>
                    </div>

                    {/* NUTRITION */}
                    <div className="rounded-[1.25rem] border border-white/14 bg-white/[0.025] p-4 md:p-5">
                      <div className="flex items-center gap-3">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-7 w-7 shrink-0 text-[#9DFF00]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.2 2.8 6.7 13h4.8l-.7 8.2L17.3 11h-4.8l.7-8.2Z"
                          />
                        </svg>
                        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/90">
                          {t("Per 28.5 mL serving", "Per sajian 28,5 mL")}
                        </p>
                      </div>

                      <div className="mt-4 divide-y divide-white/14 text-sm">
                        {[
                          [t("Energy", "Energi"), "120 kcal"],
                          [t("Carbohydrates", "Karbohidrat"), "29 g"],
                          [t("Electrolytes", "Elektrolit"), "713 mg"],
                          [t("Amino acids", "Asam amino"), "580 mg"],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className="flex items-center justify-between gap-4 py-3"
                          >
                            <span className="text-white/76">{label}</span>
                            <span className="font-black text-white">{value}</span>
                          </div>
                        ))}
                      </div>

                      <p className="mt-5 border-t border-white/14 pt-4 text-sm leading-6 text-white/72">
                        {t(
                          "Includes six key electrolytes and dual-source carbohydrates in a 1:1 glucose-to-fructose ratio.",
                          "Mengandung enam elektrolit utama dan karbohidrat dua sumber dengan rasio glukosa terhadap fruktosa 1:1."
                        )}
                      </p>
                    </div>

                    {/* SIZE CHOOSER */}
                    <div className="rounded-[1.25rem] border border-white/14 bg-white/[0.025] p-4 md:col-span-2 md:p-5 xl:col-span-1">
                      <div className="flex items-center gap-3">
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-7 w-7 shrink-0 text-[#9DFF00]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 3h6v3.2l1.7 1.7v12.2H7.3V7.9L9 6.2V3Z"
                          />
                          <path strokeLinecap="round" d="M9 10h6M9 14h6" />
                        </svg>
                        <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/90">
                          {t("Choose your size", "Pilih ukuran")}
                        </p>
                      </div>

                      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                        <div className="rounded-xl border border-white/15 bg-black/10 p-3 text-left">
                          <p className="text-lg font-black">200 mL</p>
                          <p className="text-xs text-white/62">{t("bottle", "botol")}</p>
                          <div className="mt-3 border-t border-white/14 pt-3">
                            <p className="text-sm font-black text-white">{t("7 servings", "7 sajian")}</p>
                            <p className="mt-2 text-xs leading-5 text-white/62">
                              {t("Makes", "Menghasilkan")}
                              <br />
                              <span className="font-bold text-white/88">2.8 L</span> {t("of prepared", "minuman olahraga")}
                              <br />
                              {t("sports drink", "siap minum")}
                            </p>
                          </div>
                        </div>

                        <div className="rounded-xl border border-white/15 bg-black/10 p-3 text-left">
                          <p className="text-lg font-black">515 mL</p>
                          <p className="text-xs text-white/62">{t("bottle", "botol")}</p>
                          <div className="mt-3 border-t border-white/14 pt-3">
                            <p className="text-sm font-black text-white">{t("18 servings", "18 sajian")}</p>
                            <p className="mt-2 text-xs leading-5 text-white/62">
                              {t("Makes", "Menghasilkan")} 
                              <br />
                              <span className="font-bold text-white/88">7.2 L</span> {t("of prepared", "minuman olahraga")}
                              <br />
                              {t("sports drink", "siap minum")}
                            </p>
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 text-xs leading-5 text-white/65">
                        {t("Each serving = 28.5 mL concentrate + 375 mL water", "Setiap sajian = 28,5 mL konsentrat + 375 mL air")}
                      </p>

                      <button
                        type="button"
                        onClick={() => setEnergySizeOpen(true)}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#9DFF00] px-5 py-3 text-sm font-black text-black transition hover:scale-[1.02] hover:bg-[#B7FF4A]"
                      >
                        {t("Choose size", "Pilih ukuran")}
                        <span aria-hidden="true">›</span>
                      </button>


                    </div>
                  </div>


                </div>
              </div>
            </article>

            {/* ANTI-FOG */}
            <article data-product-index="1" className="scroll-mt-24 w-full px-5 pb-6 md:min-w-full md:snap-center md:px-8 md:pb-0 lg:px-10 xl:px-16">
              <div className="mx-auto grid max-w-[1380px] items-center gap-4 lg:-translate-x-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-4 xl:-translate-x-10">
                <div className="flex min-h-[300px] items-center justify-center p-2 sm:min-h-[360px] md:min-h-[400px] lg:min-h-[470px] lg:justify-end lg:pr-0 lg:-translate-x-[30px] xl:-translate-x-[30px]">
                  <div className="flex flex-col items-center">
                    <Image
                      src="/images/nugel-antifog.png"
                      alt={t("NÜGEL Anti-Fog Drops 10 mL", "NÜGEL Anti-Fog 10 mL")}
                      width={460}
                      height={760}
                      className="h-[285px] w-auto object-contain drop-shadow-[0_30px_44px_rgba(0,0,0,0.36)] sm:h-[335px] md:h-[390px] lg:h-[455px]"
                    />
                    <p className="mt-3 max-w-[360px] text-center text-xs leading-5 text-white/92 drop-shadow-[0_2px_10px_rgba(0,0,0,0.72)] sm:text-[13px]">
                      <span className="font-bold">{t("Product shown for illustration.", "Gambar produk hanya untuk ilustrasi.")}</span>{" "}
                      {t(
                        "Actual dimensions: height 7.3 cm; diameter 2.2 cm; total weight 18 g.",
                        "Dimensi sebenarnya: tinggi 7,3 cm; diameter 2,2 cm; berat total 18 g."
                      )}
                    </p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/14 bg-[#031827]/96 p-5 shadow-[0_22px_65px_rgba(0,0,0,0.28)] md:p-6 xl:p-7">
                  <p className="text-xs font-black uppercase tracking-[0.34em] text-[#B7FF4A]">
                    {t("NÜGEL Anti-Fog Drops", "NÜGEL Tetes Anti-Fog")}
                  </p>
                  <h3 className="mt-3 text-3xl font-black leading-[1.03] tracking-[-0.035em] md:text-[2.35rem]">
                    {t("Maximum clarity with just one drop.", "Kejernihan maksimal hanya dengan satu tetes.")}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/88 md:text-base">
                    {t(
                      "NÜGEL anti-fog drops is designed for the wet, high-humidity swimming environment. It maintains clear vision despite minor moisture, condensation, or perspiration inside the goggles. Its hydrophilic coating distributes moisture evenly across the lens surface, preventing droplet formation and fogging. NÜGEL anti-fog drops comes with drop applicator which ensures precision product application onto the lens.",
                      "NÜGEL Anti-Fog dirancang untuk lingkungan berenang yang basah dan memiliki kelembapan tinggi. Produk ini membantu menjaga penglihatan tetap jernih meskipun terdapat sedikit kelembapan, kondensasi, atau keringat di bagian dalam kacamata renang. Lapisan hidrofiliknya menyebarkan kelembapan secara merata pada permukaan lensa sehingga membantu mencegah terbentuknya tetesan air dan embun. NÜGEL Anti-Fog dilengkapi aplikator tetes untuk penggunaan yang lebih presisi pada lensa."
                    )}
                  </p>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/90">
                        {t("1 drop per lens", "1 tetes per lensa")}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-white/82">
                        {t(
                          "Apply 1 drop to the inner surface of each clean lens, spread evenly with a clean finger, allow it to settle for a few minutes, then wear the goggles. Prior to racing, briefly dip the goggles in water and shake off any excess water.",
                          "Teteskan 1 tetes pada permukaan bagian dalam setiap lensa yang bersih, ratakan dengan jari yang bersih, diamkan selama beberapa menit, lalu gunakan kacamata renang. Sebelum perlombaan, celupkan kacamata sebentar ke dalam air lalu kibaskan kelebihan air."
                        )}
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/90">
                        {t("Product details", "Detail produk")}
                      </p>

                      <div className="mt-3 divide-y divide-white/10 text-sm">
                        {[
                          [t("Bottle size", "Ukuran botol"), "10 mL"],
                          [t("Approx. drops", "Perkiraan jumlah tetes"), "600"],
                          [t("Approx. applications", "Perkiraan pemakaian"), "300"],
                          [t("Use", "Penggunaan"), t("Training & racing", "Latihan & perlombaan")],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className="flex items-center justify-between gap-4 py-2"
                          >
                            <span className="text-white/76">{label}</span>
                            <span className="font-semibold">{value}</span>
                          </div>
                        ))}
                      </div>
                      <p className="mt-3 text-xs leading-5 text-white/72">
                        {t(
                          "Apply only to a clean inner lens. Avoid direct eye contact and reapply when necessary. Actual drop count and number of applications may vary.",
                          "Gunakan hanya pada permukaan bagian dalam lensa yang bersih. Hindari kontak langsung dengan mata dan aplikasikan kembali bila diperlukan. Jumlah tetes dan jumlah pemakaian sebenarnya dapat bervariasi."
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-sm font-bold">{t("Want to buy it separately?", "Ingin membelinya secara terpisah?")}</p>
                    <button
                      onClick={() => addToCart("antifog")}
                      className="mt-3 rounded-full bg-[#9DFF00] px-5 py-2.5 text-sm font-bold text-black transition hover:scale-[1.02]"
                    >
                      {t("Add Anti-Fog", "Tambah Anti-Fog")} · {formatRupiah(products.antifog.price)}
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* MIXING BOTTLE */}
            <article data-product-index="2" className="scroll-mt-24 w-full px-5 pb-2 md:min-w-full md:snap-center md:px-8 md:pb-0 lg:px-10 xl:px-16">
              <div className="mx-auto grid max-w-[1380px] items-center gap-4 lg:-translate-x-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-4 xl:-translate-x-10">
                <div className="flex min-h-[300px] items-center justify-center p-2 sm:min-h-[360px] md:min-h-[400px] lg:min-h-[470px] lg:justify-end lg:pr-0 lg:translate-x-4 xl:translate-x-6">
                  <div className="flex flex-col items-center">
                    <Image
                      src="/images/nugel-mixing-cup.png"
                      alt={t("NÜGEL measuring container", "NÜGEL Wadah Takar")}
                      width={1225}
                      height={1284}
                      className="h-[285px] w-auto object-contain drop-shadow-[0_30px_44px_rgba(0,0,0,0.28)] sm:h-[335px] md:h-[390px] lg:h-[455px]"
                    />
                    <p className="mt-1 max-w-[360px] text-center text-xs leading-5 text-white/92 drop-shadow-[0_2px_10px_rgba(0,0,0,0.72)] sm:mt-0 sm:text-[13px] md:-mt-2 lg:-mt-3">
                      <span className="font-bold">{t("Product shown for illustration.", "Gambar produk hanya untuk ilustrasi.")}</span>{" "}
                      {t(
                        "Actual container (empty) dimensions: height 5.5 cm; diameter 4 cm; weight 15 g.",
                        "Dimensi wadah kosong sebenarnya: tinggi 5,5 cm; diameter 4 cm; berat 15 g."
                      )}
                    </p>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-white/14 bg-[#031827]/96 p-5 shadow-[0_22px_65px_rgba(0,0,0,0.28)] md:p-6 xl:p-7">
                  <p className="text-xs font-black uppercase tracking-[0.34em] text-[#B7FF4A]">
                    {t("NÜGEL Measuring Container", "NÜGEL Wadah Takar")}
                  </p>
                  <h3 className="mt-3 text-3xl font-black leading-[1.03] tracking-[-0.035em] md:text-[2.35rem]">
                    {t("Measure, mix, ready.", "Takar, campur, siap.")}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-white/88 md:text-base">
                    {t("A reusable measuring container designed for consistent and effortless preparation of sports drink.", "Wadah takar pakai ulang yang dirancang untuk membantu menyiapkan minuman olahraga secara konsisten dan praktis.")}
                  </p>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/90">
                        {t("How to use the measuring container", "Cara menggunakan wadah takar")}
                      </p>

                      <p className="mt-3 text-sm font-semibold leading-6 text-white/86">
                        {t("Prepare now, use later.", "Siapkan sekarang, gunakan nanti.")}
                      </p>

                      <ul className="mt-3 space-y-2 pl-5 text-sm leading-6 text-white/82">
                        <li className="list-disc">
                          {t("Pour NÜGEL Concentrate up to the 28.5 mL mark.", "Tuangkan Konsentrat NÜGEL hingga tanda 28,5 mL.")}
                        </li>
                        <li className="list-disc">
                          {t("Add water until the total reaches 60 mL.", "Tambahkan air hingga total mencapai 60 mL.")}
                        </li>
                        <li className="list-disc">
                          {t("Close tightly, then shake briefly.", "Tutup rapat, lalu kocok sebentar.")}
                        </li>
                        <li className="list-disc">
                          {t("Keep it sealed and use it on the same day.", "Simpan dalam keadaan tertutup dan gunakan pada hari yang sama.")}
                        </li>
                        <li className="list-disc">
                          {t("When ready to drink, pour the entire mixture into a bottle or tumbler.", "Saat siap diminum, tuangkan seluruh campuran ke dalam botol atau tumbler.")}
                        </li>
                        <li className="list-disc">
                          {t("Add approximately 340 mL of water, then shake or stir.", "Tambahkan sekitar 340 mL air, lalu kocok atau aduk.")}
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                      <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/90">
                        {t("Care", "Perawatan")}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-white/82">
                        {t("After each use, rinse with clean water and wash with mild detergent. Rinse thoroughly and allow to air-dry completely before storing or reusing. Do not use abrasive cleaners or boiling water.", "Setelah digunakan, bilas dengan air bersih dan cuci menggunakan deterjen lembut. Bilas hingga bersih dan biarkan kering sepenuhnya sebelum disimpan atau digunakan kembali. Jangan gunakan pembersih abrasif atau air mendidih.")}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 border-t border-white/10 pt-4">
                    <p className="text-sm font-bold">{t("Want to buy it separately?", "Ingin membelinya secara terpisah?")}</p>
                    <button
                      onClick={() => addToCart("bottle")}
                      className="mt-3 rounded-full bg-[#9DFF00] px-5 py-2.5 text-sm font-bold text-black transition hover:scale-[1.02]"
                    >
                      {t("Add Measuring Container", "Tambah Wadah Takar")} · {formatRupiah(products.bottle.price)}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </div>

        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="scroll-mt-24 flex min-h-0 items-center px-5 py-14 sm:px-6 md:px-12 md:py-16 lg:min-h-[90svh] lg:px-20 lg:py-12">
        <div className="mx-auto w-full max-w-7xl">
          <div data-reveal className="nugel-reveal">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#9DFF00]">
              {t("Know what you need?", "Sudah tahu yang Anda butuhkan?")}
            </p>
            <h2 className="mt-2 text-3xl font-black md:text-4xl">
              {t("Build your NÜGEL setup.", "Susun perlengkapan NÜGEL Anda.")}
            </h2>
          </div>

          <p data-reveal className="nugel-reveal mt-3 max-w-2xl text-base leading-7 text-white/65">
            {t("Choose the products that fit your swim routine.", "Pilih produk yang sesuai dengan rutinitas berenang Anda.")}
          </p>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr_1fr_1fr]">
            {(Object.keys(products) as ProductId[]).filter((id) => id !== "energy500").map((id, index) => {
              const product = products[id];

              return (
                <article
                  key={id}
                  data-reveal
                  className={`nugel-reveal group relative flex h-full flex-col rounded-[2rem] border p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${
                    id === "starter"
                      ? "border-[#9DFF00]/35 bg-[#041d2b]/72 shadow-[0_18px_55px_rgba(157,255,0,0.08)] hover:border-[#9DFF00]/55 hover:bg-[#062536]/78"
                      : "border-white/15 bg-[#021827]/28 hover:bg-white/[0.08]"
                  }`}
                  style={{ transitionDelay: `${index * 65}ms` }}
                >
                  {id === "starter" && (
                    <div className="absolute right-5 top-5 z-20 rounded-full bg-[#9DFF00] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-black shadow-[0_8px_24px_rgba(157,255,0,0.20)]">
                      {t("Most Popular", "Paling Populer")}
                    </div>
                  )}

                  <div className="relative flex h-56 items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.035]">
                    {id === "starter" ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative h-[184px] w-[258px] max-w-[94%] translate-y-1">
                          {/* Back-left: Energy */}
                          <div className="absolute bottom-0 left-0 z-10">
                            <Image
                              src="/images/nugel-energy-200.png"
                              alt=""
                              width={1122}
                              height={1402}
                              className="h-[190px] w-auto object-contain transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02]"
                            />
                          </div>

                          {/* Front-center: Mixing cup */}
                          <div className="absolute bottom-[-6px] left-[52%] z-30 -translate-x-1/2">
                            <Image
                              src="/images/nugel-mixing-cup.png"
                              alt=""
                              width={1225}
                              height={1284}
                              className="h-[82px] w-auto object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.18)] transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02]"
                            />
                          </div>

                          {/* Back-right: Anti-Fog, separated from the central pair */}
                          <div className="absolute bottom-0 right-[30px] z-10">
                            <Image
                              src="/images/nugel-antifog.png"
                              alt=""
                              width={260}
                              height={450}
                              className="h-[90px] w-auto object-contain transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02]"
                            />
                          </div>
                        </div>
                      </div>                    ) : id === "energy" ? (
                      <div className="relative flex h-full w-full items-center justify-center">
                        <Image
                          src="/images/nugel-energy-200.png"
                          alt={t("NÜGEL Sports Drink Concentrate 200 mL", "NÜGEL Konsentrat Minuman Olahraga 200 mL")}
                          width={1122}
                          height={1402}
                          className="relative z-10 -mr-[42px] translate-x-[3px] scale-x-[0.9] h-[204px] w-auto object-contain transition duration-500 group-hover:-translate-y-1 sm:-mr-[48px]"
                        />
                        <Image
                          src="/images/nugel-energy-515.png"
                          alt={t("NÜGEL Sports Drink Concentrate 515 mL", "NÜGEL Konsentrat Minuman Olahraga 515 mL")}
                          width={1122}
                          height={1402}
                          className="relative z-20 -translate-x-[20px] translate-y-[14px] scale-x-[1.16] h-[175px] w-auto object-contain transition duration-500 group-hover:-translate-x-[18px] group-hover:translate-y-[6px]"
                        />
                      </div>
                    ) : id === "antifog" ? (
                      <Image
                        src="/images/nugel-antifog.png"
                        alt={t("NÜGEL Anti-Fog Drops 10 mL", "NÜGEL Anti-Fog 10 mL")}
                        width={300}
                        height={520}
                        className="h-[205px] w-auto object-contain transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <Image
                        src="/images/nugel-mixing-cup.png"
                        alt="NÜGEL mixing cup"
                        width={1225}
                        height={1284}
                        className="h-[200px] w-auto object-contain transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.02]"
                      />
                    )}
                  </div>

                  <h3 className="mt-6 min-h-[3.5rem] text-xl font-bold">
                    {id === "starter"
                      ? "NÜGEL STARTER KIT"
                      : id === "energy"
                        ? t("NÜGEL Sports Drink Concentrate", "NÜGEL Konsentrat Minuman Olahraga")
                        : productDisplayName(id)}
                  </h3>

                  {id === "starter" ? (
                    <div className="mt-2 min-h-[5.5rem]">
                      <div className="flex flex-wrap items-end gap-x-3 gap-y-1">
                        <span className="-translate-y-1 text-sm font-semibold text-white/50 line-through decoration-white/60 decoration-2">
                          {formatRupiah(STARTER_REGULAR_PRICE)}
                        </span>
                        <span className="text-lg font-black text-[#9DFF00]">
                          {formatRupiah(products.starter.price)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-5 text-white/55">
                        {t("200 mL Sports Drink Concentrate + Measuring Container + 10 mL Anti-Fog", "200 mL Konsentrat Minuman Olahraga + Wadah Takar + 10 mL Anti-Fog")}
                      </p>
                      <p className="mt-2 text-xs font-black uppercase tracking-[0.1em] text-[#C7FF72]">
                        {t("SAVE", "HEMAT")} {formatRupiah(STARTER_SAVINGS)}
                      </p>
                    </div>
                  ) : (
                    <div className="mt-2 min-h-[3.25rem]">
                      {id === "energy" ? (
                        <div className="space-y-1 text-sm text-white/70">
                          <p>
                            <span className="font-semibold text-white/88">200 mL</span>
                            {" · "}
                            {formatRupiah(products.energy.price)}
                            <span className="text-white/45"> · {t("7 servings", "7 sajian")}</span>
                          </p>
                          <p>
                            <span className="font-semibold text-white/88">515 mL</span>
                            {" · "}
                            {formatRupiah(products.energy500.price)}
                            <span className="text-white/45"> · {t("18 servings", "18 sajian")}</span>
                          </p>
                        </div>
                      ) : (
                        <p className="text-white/70">{formatRupiah(product.price)}</p>
                      )}

                      {id === "antifog" && (
                        <p className="mt-1 text-xs font-semibold text-white/48">
                          {t("∼300 applications", "∼300 pemakaian")}
                        </p>
                      )}

                      {id === "bottle" && (
                        <p className="mt-1 text-xs font-semibold text-white/48">
                          {t("Reusable, marked 28.5 mL", "Pakai ulang, bertanda 28,5 mL")}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="mt-auto pt-6">
                    {id === "energy" ? (
                      <button
                        type="button"
                        onClick={() => setEnergySizeOpen(true)}
                        className="shop-action-button flex min-h-12 w-full items-center justify-center rounded-full px-5 py-3 font-bold backdrop-blur-sm"
                      >
                        {t("Choose size", "Pilih ukuran")}
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart(id)}
                        className="shop-action-button flex min-h-12 w-full items-center justify-center rounded-full px-5 py-3 font-bold backdrop-blur-sm"
                      >
                        {t("Add to Cart", "Tambah ke Keranjang")}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div
            data-reveal
            className="nugel-reveal mt-6 rounded-[1.75rem] border border-[#9DFF00]/25 bg-[#031827]/95 px-5 py-5 shadow-[0_18px_55px_rgba(0,0,0,0.22)] sm:px-6 md:flex md:items-center md:justify-between md:gap-8"
          >
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.32em] text-[#9DFF00]">
                {t("Club pricing", "Harga klub")}
              </p>
              <h3 className="mt-2 text-xl font-black sm:text-2xl">
                {t("Swim with your squad?", "Berenang bersama tim Anda?")}
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/78 sm:text-base">
                {t(
                  "We do volume discounts for clubs or teams. Get in touch to learn more about our club pricing.",
                  "Kami menyediakan diskon pembelian dalam jumlah besar untuk klub atau tim. Hubungi kami untuk mengetahui lebih lanjut tentang harga khusus klub."
                )}
              </p>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full shrink-0 items-center justify-center rounded-full bg-[#9DFF00] px-5 py-3 text-sm font-black text-black transition hover:scale-[1.02] hover:bg-[#B7FF4A] md:mt-0 md:w-auto"
            >
              {t("Get Club Price", "Tanyakan Harga Klub")}
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT — interactive story bubbles */}
      <section
        id="about"
        className="scroll-mt-24 relative flex min-h-0 items-center overflow-hidden px-5 py-14 sm:px-6 md:min-h-[100svh] md:px-10 md:py-14 lg:px-16"
      >
        <div className="mx-auto w-full max-w-[1500px]">
          <div data-reveal className="nugel-reveal relative z-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.38em] text-[#9DFF00]">
              {t("About NÜGEL", "Tentang NÜGEL")}
            </p>
            <h2 className="mt-2 text-3xl font-black md:text-5xl">
              {t("Dive Deeper Into NÜGEL", "Kenali NÜGEL Lebih Dalam")}
            </h2>
          </div>

          <div className="about-bubble-field relative mx-auto mt-5 min-h-[560px] w-full">
            {aboutBubbles.map((bubble, index) => (
              <button
                key={bubble.title}
                type="button"
                onClick={() => setActiveAboutBubble(index)}
                aria-label={t(`Open ${bubble.title}`, `Buka ${bubble.title}`)}
                className={`about-story-bubble about-story-bubble-${index + 1} group text-left`}
              >
                <span className="about-bubble-shine" aria-hidden="true" />
                <span className="about-bubble-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="relative z-10 flex h-full flex-col items-center justify-center px-6 py-7 text-center sm:px-7 sm:py-8">
                  <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#9DFF00] sm:text-[10px]">
                    {bubble.eyebrow}
                  </span>

                  <span className="mt-2 block max-w-[90%] text-center text-lg font-black leading-tight text-white sm:text-xl">
                    {bubble.title}
                  </span>

                  <span className="about-bubble-preview mt-3 block max-w-[88%] text-[11px] leading-5 text-white/72">
                    {bubble.preview}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeAboutBubble !== null && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6">
          <button
            type="button"
            aria-label={t("Close About story", "Tutup cerita NÜGEL")}
            onClick={() => setActiveAboutBubble(null)}
            className="absolute inset-0 cursor-default bg-[#00101a]/72 backdrop-blur-md"
          />

          <article
            role="dialog"
            aria-modal="true"
            aria-labelledby="about-bubble-dialog-title"
            className="about-expanded-bubble relative z-10 max-h-[90svh] w-full max-w-6xl overflow-y-auto border border-white/20 bg-[#062b3d]/90 p-6 shadow-[0_36px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl sm:p-9 md:p-12"
          >
            <button
              type="button"
              aria-label={t("Close", "Tutup")}
              onClick={() => setActiveAboutBubble(null)}
              className="absolute right-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/20 text-2xl text-white/80 transition hover:scale-110 hover:border-[#9DFF00] hover:text-[#9DFF00]"
            >
              ×
            </button>

            <div
              className={`grid items-center gap-8 ${
                (("images" in aboutBubbles[activeAboutBubble] &&
                  aboutBubbles[activeAboutBubble].images?.length === 1) ||
                  aboutBubbles[activeAboutBubble].imageCaption)
                  ? "lg:grid-cols-[1.08fr_0.92fr]"
                  : ""
              }`}
            >
              <div
                className={`flex flex-col ${
                  "images" in aboutBubbles[activeAboutBubble] &&
                  aboutBubbles[activeAboutBubble].images?.length === 1
                    ? "items-center text-center lg:items-start lg:text-left"
                    : "items-center text-center"
                }`}
              >
                <p className="px-8 text-xs font-bold uppercase tracking-[0.3em] text-[#9DFF00] sm:px-14 sm:tracking-[0.34em]">
                  {aboutBubbles[activeAboutBubble].eyebrow}
                </p>

                <h3
                  id="about-bubble-dialog-title"
                  className="mt-3 max-w-4xl px-6 text-3xl font-black leading-[1.04] sm:px-12 md:text-5xl md:leading-[1.02]"
                >
                  {aboutBubbles[activeAboutBubble].title}
                </h3>

                {"richSections" in aboutBubbles[activeAboutBubble] &&
                aboutBubbles[activeAboutBubble].richSections ? (
                  <div className="mt-6 w-full max-w-4xl space-y-7 text-left">
                    {aboutBubbles[activeAboutBubble].richSections.map((section, sectionIndex) => (
                      <section
                        key={section.heading}
                        className={sectionIndex === 0 ? "" : "border-t border-white/10 pt-6"}
                      >
                        <h4
                          className={`font-black leading-snug ${
                            sectionIndex === 0
                              ? "text-xl text-white md:text-2xl"
                              : "text-sm uppercase tracking-[0.14em] text-[#C7FF72] md:text-base"
                          }`}
                        >
                          {section.heading}
                        </h4>

                        <div className="mt-3 space-y-3">
                          {section.paragraphs.map((paragraph) => {
                            const boldTerms: readonly string[] =
                              "boldTerms" in section && section.boldTerms
                                ? section.boldTerms
                                : [];

                            if (boldTerms.length === 0) {
                              return (
                                <p
                                  key={paragraph}
                                  className="text-sm leading-7 text-white/76 md:text-base md:leading-8"
                                >
                                  {paragraph}
                                </p>
                              );
                            }

                            const pattern = new RegExp(
                              `(${boldTerms
                                .map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
                                .join("|")})`,
                              "g"
                            );

                            return (
                              <p
                                key={paragraph}
                                className="text-sm leading-7 text-white/76 md:text-base md:leading-8"
                              >
                                {paragraph.split(pattern).map((part, partIndex) =>
                                  boldTerms.includes(part) ? (
                                    <strong
                                      key={`${part}-${partIndex}`}
                                      className="font-black text-white"
                                    >
                                      {part}
                                    </strong>
                                  ) : (
                                    <span key={`${partIndex}-${part}`}>{part}</span>
                                  )
                                )}
                              </p>
                            );
                          })}
                        </div>

                        {"bullets" in section && section.bullets && (
                          <ul className="mt-4 space-y-3 pl-5 text-sm leading-7 text-white/76 md:text-base md:leading-8">
                            {section.bullets.map((bullet) => (
                              <li key={bullet.label} className="list-disc">
                                <span className="font-black text-white">{bullet.label}</span>{" "}
                                {bullet.text}
                              </li>
                            ))}
                          </ul>
                        )}

                        {"closing" in section && section.closing && (
                          <p className="mt-5 text-sm font-semibold leading-7 text-white/90 md:text-base md:leading-8">
                            {section.closing}
                          </p>
                        )}
                      </section>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    {"paragraphs" in aboutBubbles[activeAboutBubble] &&
                      aboutBubbles[activeAboutBubble].paragraphs.map((paragraph) => (
                        <p
                          key={paragraph}
                          className={`max-w-3xl text-sm leading-7 text-white/76 md:text-base md:leading-8 ${
                            "images" in aboutBubbles[activeAboutBubble] &&
                            aboutBubbles[activeAboutBubble].images?.length === 1
                              ? "mx-auto lg:mx-0"
                              : "mx-auto"
                          }`}
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>
                )}

                {"stats" in aboutBubbles[activeAboutBubble] &&
                  aboutBubbles[activeAboutBubble].stats && (
                    <div className="mt-7 flex flex-wrap justify-center gap-x-7 gap-y-2 border-y border-white/10 py-4">
                      {aboutBubbles[activeAboutBubble].stats.map((stat) => (
                        <span
                          key={stat}
                          className="text-sm font-black text-[#C7FF72]"
                        >
                          {stat}
                        </span>
                      ))}
                    </div>
                  )}

                {"learnMoreUrl" in aboutBubbles[activeAboutBubble] &&
                  aboutBubbles[activeAboutBubble].learnMoreUrl && (
                    <a
                      href={aboutBubbles[activeAboutBubble].learnMoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#9DFF00] underline decoration-[#9DFF00]/35 underline-offset-4 transition hover:text-white"
                    >
                      {aboutBubbles[activeAboutBubble].learnMoreLabel}
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
              </div>

              {"images" in aboutBubbles[activeAboutBubble] &&
                aboutBubbles[activeAboutBubble].images && (
                  aboutBubbles[activeAboutBubble].images.length === 1 ? (
                    <figure className="mx-auto w-full max-w-[520px] lg:ml-auto lg:mr-0">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-[1.6rem] border border-white/18 bg-white/[0.04] shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
                        <Image
                          src={aboutBubbles[activeAboutBubble].images[0].src}
                          alt={aboutBubbles[activeAboutBubble].images[0].alt}
                          fill
                          sizes="(max-width: 1024px) 92vw, 520px"
                          className="object-cover object-center"
                        />
                      </div>
                      <figcaption className="mt-2 text-center text-[11px] leading-5 text-white/55">
                        {aboutBubbles[activeAboutBubble].images[0].caption}
                      </figcaption>
                    </figure>
                  ) : (
                    <div className="mx-auto mt-2 grid w-full max-w-4xl grid-cols-1 items-start justify-center gap-5 md:grid-cols-[minmax(0,1.55fr)_minmax(220px,0.72fr)] md:gap-6">
                      <figure className="mx-auto w-full max-w-[560px]">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[1.6rem] border border-white/18 bg-white/[0.04] shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
                          <Image
                            src={aboutBubbles[activeAboutBubble].images[0].src}
                            alt={aboutBubbles[activeAboutBubble].images[0].alt}
                            fill
                            sizes="(max-width: 640px) 92vw, 560px"
                            className="object-cover object-[42%_35%]"
                          />
                        </div>
                        <figcaption className="mx-auto mt-2 max-w-[520px] text-center text-[11px] leading-5 text-white/55">
                          {aboutBubbles[activeAboutBubble].images[0].caption}
                        </figcaption>
                      </figure>

                      <figure className="mx-auto w-full max-w-[285px]">
                        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] border border-white/18 bg-white/[0.04] shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
                          <Image
                            src={aboutBubbles[activeAboutBubble].images[1].src}
                            alt={aboutBubbles[activeAboutBubble].images[1].alt}
                            fill
                            sizes="(max-width: 640px) 76vw, 285px"
                            className="object-cover object-center"
                          />
                        </div>
                        <figcaption className="mt-2 text-center text-[11px] leading-5 text-white/55">
                          {aboutBubbles[activeAboutBubble].images[1].caption}
                        </figcaption>
                      </figure>
                    </div>
                  )
                )}

              {aboutBubbles[activeAboutBubble].imageCaption && (
                <figure className="mx-auto w-full max-w-[390px]">
                  <div className="about-dieter-placeholder flex aspect-[4/5] items-center justify-center overflow-hidden border border-dashed border-white/28 bg-white/[0.055]">
                    <div className="px-8 text-center">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/18 bg-white/[0.07] text-2xl text-white/55">
                        +
                      </div>
                      <p className="mt-5 text-xs font-bold uppercase tracking-[0.28em] text-white/55">
                        {t("Dieter photo placeholder", "Placeholder foto Dieter")}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-white/38">
                        {t("Replace this area with your final Dieter photo later.", "Ganti area ini dengan foto final Dieter nanti.")}
                      </p>
                    </div>
                  </div>
                  <figcaption className="mt-3 text-center text-xs leading-5 text-white/55">
                    {aboutBubbles[activeAboutBubble].imageCaption}
                  </figcaption>
                </figure>
              )}
            </div>
          </article>
        </div>
      )}

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 flex min-h-0 items-center px-5 py-14 sm:px-6 md:px-12 md:py-16 lg:min-h-[90svh] lg:px-20 lg:py-12">
        <div className="mx-auto w-full max-w-4xl">
          <div data-reveal className="nugel-reveal text-center">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#9DFF00]">
              {t("Questions?", "Ada pertanyaan?")}
            </p>
            <h2 className="mt-3 text-3xl font-black md:text-4xl">
              FAQ
            </h2>
          </div>

          <div className="mt-6 space-y-3">
            {faqItems.map(([question, answer], index) => (
              <details
                key={question}
                data-reveal
                className="nugel-reveal group rounded-2xl border border-white/10 bg-[#021522]/24 p-4 backdrop-blur-md"
                style={{ transitionDelay: `${index * 55}ms` }}
              >
                <summary className="cursor-pointer list-none font-bold">
                  <span className="flex items-center justify-between gap-5">
                    {question}
                    <span className="text-2xl text-[#9DFF00] transition group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl whitespace-pre-line leading-7 text-white/78">
                  {answer}
                </p>
              </details>
            ))}
          </div>

          <div
            data-reveal
            className="nugel-reveal mt-6 flex flex-col items-stretch justify-between gap-4 rounded-2xl border border-[#C7FF72] bg-[#9DFF00] px-5 py-5 text-center text-black shadow-[0_18px_50px_rgba(157,255,0,0.18)] sm:px-6 md:flex-row md:items-center md:text-left"
          >
            <div>
              <p className="text-lg font-black">{t("Have more questions?", "Masih ada pertanyaan?")}</p>
              <p className="mt-1 text-sm font-medium text-black/70">
                {t("Send us a message and we'll help you directly.", "Kirim pesan kepada kami dan kami akan membantu Anda langsung.")}
              </p>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                t(
                  "Hello NÜGEL! I have a question about your products.",
                  "Halo NÜGEL! Saya punya pertanyaan tentang produk Anda."
                )
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full border border-black/20 bg-black px-5 py-3 text-sm font-black text-white transition hover:scale-[1.02] hover:bg-[#06202f] md:w-auto"
            >
              {t("Ask a Question", "Ajukan Pertanyaan")}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden px-6 pb-20 pt-14 md:px-12 lg:px-20">
        <div
          data-reveal
          className="nugel-reveal mx-auto grid max-w-7xl items-center gap-8 rounded-[2.25rem] border border-white/12 bg-[#031827]/58 px-6 py-8 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-lg md:px-9 md:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-12"
        >
          <div className="text-center lg:text-left">
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#9DFF00]">
              {t("Ready for your next swim?", "Siap untuk sesi renang berikutnya?")}
            </p>

            <h2 className="mt-3 text-4xl font-black md:text-6xl">
              {t("Fuel. Prepare. Swim.", "Isi energi. Siapkan. Berenang.")}
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/76 md:text-base lg:mx-0">
              {t(
                "Start with the NÜGEL essentials and get your swim setup ready in one kit.",
                "Mulai dengan produk esensial NÜGEL dan siapkan kebutuhan berenang Anda dalam satu paket."
              )}
            </p>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full cursor-pointer items-center justify-center rounded-full bg-[#9DFF00] px-8 py-4 font-black text-black shadow-[0_14px_35px_rgba(157,255,0,0.20)] transition duration-300 hover:scale-[1.04] hover:bg-[#B7FF4A] md:w-auto"
            >
              {t("Order via WhatsApp", "Pesan via WhatsApp")}
            </a>
          </div>

          <div className="relative flex min-h-[300px] items-center justify-center lg:min-h-[360px] lg:justify-end">
            <div className="pointer-events-none absolute right-[8%] top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[#9DFF00]/10 blur-3xl lg:h-80 lg:w-80" />
            <div className="pointer-events-none absolute bottom-[8%] right-[5%] h-12 w-[72%] rounded-full bg-black/25 blur-2xl lg:w-[78%]" />

            <Image
              src="/images/nugel-home-products.png"
              alt={t("NÜGEL Starter Kit with Sports Drink Concentrate, Measuring Container and Anti-Fog", "NÜGEL Starter Kit dengan Konsentrat Minuman Olahraga, Wadah Takar, dan Anti-Fog")}
              width={952}
              height={1310}
              className="nugel-final-kit-float relative z-10 h-auto w-[270px] object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.32)] sm:w-[320px] lg:w-[390px] xl:w-[430px]"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#010a12]/68 px-6 py-12 backdrop-blur-xl md:px-12 lg:px-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.25fr_0.8fr_0.9fr]">
          <div>
            <Image
              src="/images/nugel-logo.png"
              alt="NÜGEL"
              width={190}
              height={65}
              className="h-auto w-[150px]"
            />
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/55">
              {t(
                "Stay fueled, hydrated, and clear with practical essentials for your swim routine.",
                "Tetap bertenaga, terhidrasi, dan jernih dengan perlengkapan praktis untuk rutinitas berenang Anda."
              )}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/45">
              {t("Navigate", "Navigasi")}
            </p>
            <div className="mt-4 grid grid-cols-1 gap-x-7 gap-y-3 text-sm font-semibold md:grid-cols-2">
              {[
                ["#home", t("Home", "Beranda")],
                ["#starter", t("Starter Kit", "Paket Pemula")],
                ["#products", t("Products", "Produk")],
                ["#shop", t("Shop", "Belanja")],
                ["#about", t("About", "Tentang")],
                ["#faq", "FAQ"],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(href);
                  }}
                  className="w-fit text-white/65 transition hover:text-[#9DFF00]"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/45">
              {t("Contact & order", "Kontak & pemesanan")}
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-fit font-bold text-white transition hover:text-[#9DFF00]"
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
            <p className="mt-3 max-w-xs text-sm leading-6 text-white/50">
              {t(
                "Product orders, delivery details and shipping confirmation are handled through WhatsApp.",
                "Pemesanan produk, detail pengiriman, dan konfirmasi ongkos kirim ditangani melalui WhatsApp."
              )}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} NÜGEL. {t("All rights reserved.", "Hak cipta dilindungi.")}</p>
          <p>Indonesia</p>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t("Chat with NÜGEL on WhatsApp", "Chat dengan NÜGEL di WhatsApp")}
        className="fixed bottom-10 right-6 z-40 flex cursor-pointer items-center justify-center drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)] transition duration-300 hover:scale-105 md:bottom-4 md:right-5"
      >
        <Image
          src="/images/whatsapp.png"
          alt="WhatsApp"
          width={52}
          height={52}
          className="h-[52px] w-[52px] object-contain md:h-14 md:w-14"
        />
      </a>

      {/* ENERGY SIZE CHOOSER */}
      {energySizeOpen && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center px-4">
          <button
            type="button"
            aria-label={t("Close energy size chooser", "Tutup pemilih ukuran")}
            onClick={() => setEnergySizeOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="relative z-10 w-full max-w-md rounded-[2rem] border border-white/15 bg-[#041827]/95 p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9DFF00]">
                  {t("NÜGEL Sports Drink Concentrate", "NÜGEL Konsentrat Minuman Olahraga")}
                </p>
                <h2 className="mt-2 text-2xl font-black">{t("Choose your size", "Pilih ukuran")}</h2>
              </div>
              <button
                type="button"
                onClick={() => setEnergySizeOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-xl text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="mt-6 grid gap-3">
              <button
                type="button"
                onClick={() => {
                  setEnergySizeOpen(false);
                  addToCart("energy");
                }}
                className="group flex items-center justify-between rounded-2xl border border-white/15 bg-white/[0.035] p-4 text-left text-white transition duration-200 hover:border-[#9DFF00]/55 hover:bg-[#9DFF00]/[0.08]"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/nugel-energy-200.png"
                    alt=""
                    width={1122}
                    height={1402}
                    className="h-16 w-auto object-contain transition duration-200 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_8px_14px_rgba(157,255,0,0.20)]"
                  />
                  <div>
                    <p className="font-bold">200 ml</p>
                    <p className="mt-1 text-sm text-white/55">{t("NÜGEL Sports Drink Concentrate", "NÜGEL Konsentrat Minuman Olahraga")}</p>
                  </div>
                </div>
                <span className="ml-3 shrink-0 whitespace-nowrap text-sm font-black text-[#9DFF00]">
                  {formatRupiah(products.energy.price)}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEnergySizeOpen(false);
                  addToCart("energy500");
                }}
                className="group flex items-center justify-between rounded-2xl border border-white/15 bg-white/[0.035] p-4 text-left text-white transition duration-200 hover:border-[#9DFF00]/55 hover:bg-[#9DFF00]/[0.08]"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/nugel-energy-515.png"
                    alt=""
                    width={1122}
                    height={1402}
                    className="h-16 w-auto object-contain transition duration-200 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_8px_14px_rgba(157,255,0,0.20)]"
                  />
                  <div>
                    <p className="font-bold">515 ml</p>
                    <p className="mt-1 text-sm text-white/55">{t("NÜGEL Sports Drink Concentrate", "NÜGEL Konsentrat Minuman Olahraga")}</p>
                  </div>
                </div>
                <span className="ml-3 shrink-0 whitespace-nowrap text-sm font-black text-[#9DFF00]">
                  {formatRupiah(products.energy500.price)}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CART */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100]">
          <button
            aria-label={t("Close cart", "Tutup keranjang")}
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 cursor-pointer bg-black/70 backdrop-blur-sm"
          />

          <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/15 bg-[#041827]/95 p-6 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#9DFF00]">
                  {t("Your order", "Pesanan Anda")}
                </p>
                <h2 className="mt-2 text-3xl font-black">{t("Cart", "Keranjang")}</h2>
              </div>

              <button
                onClick={() => setCartOpen(false)}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 text-xl transition hover:scale-105 hover:bg-white/20"
              >
                ×
              </button>
            </div>

            <div className="mt-8 flex-1 space-y-4 overflow-y-auto">
              {cartCount === 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 text-center text-white/65">
                  {t("Your cart is empty.", "Keranjang Anda masih kosong.")}
                </div>
              )}

              {(Object.keys(products) as ProductId[]).map((id) => {
                const product = products[id];
                const quantity = cart[id];

                if (quantity === 0) return null;

                return (
                  <div
                    key={id}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                  >
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="font-bold">{productDisplayName(id)}</h3>
                        <p className="mt-1 text-sm text-white/55">
                          {formatRupiah(product.price)}
                        </p>
                      </div>

                      <p className="font-bold">
                        {formatRupiah(product.price * quantity)}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => decreaseQuantity(id)}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:scale-105"
                      >
                        −
                      </button>

                      <span className="min-w-6 text-center font-bold">
                        {quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(id)}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 transition hover:scale-105"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {cartCount > 0 && (
              <div className="border-t border-white/10 pt-6">
                <div className="flex items-center justify-between">
                  <p className="text-white/65">{t("Total", "Total")}</p>
                  <p className="text-2xl font-black">
                    {formatRupiah(cartTotal)}
                  </p>
                </div>

                <button
                  onClick={orderViaWhatsApp}
                  className="mt-5 w-full cursor-pointer rounded-full bg-[#9DFF00] px-6 py-4 font-black text-black transition hover:scale-[1.02]"
                >
                  {t("Order via WhatsApp", "Pesan via WhatsApp")}
                </button>

                <button
                  onClick={clearCart}
                  className="mt-4 w-full cursor-pointer text-sm font-bold text-white/45 transition hover:text-white"
                >
                  {t("Clear Cart", "Kosongkan Keranjang")}
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        button,
        a,
        summary {
          cursor: pointer;
        }

        .nugel-nav-link {
          color: rgba(255, 255, 255, 0.92);
          transition: color 220ms ease;
        }

        .nugel-nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 2px;
          height: 2px;
          border-radius: 9999px;
          background: #9dff00;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 220ms ease;
        }

        .nugel-nav-link:hover,
        .nugel-nav-link:focus-visible {
          color: #ffffff;
        }

        .nugel-nav-link:hover::after,
        .nugel-nav-link:focus-visible::after {
          transform: scaleX(1);
        }

        .nugel-continuous-pool-scene {
          background-color: #02131f;
          background-size: 100% auto;
          background-repeat: no-repeat;
        }


        @media (max-width: 767px) {
          .nugel-continuous-pool-scene {
            background-size: auto 220%;
          }
        }

        .nugel-cart-notice {
          animation: nugelCartNoticeIn 260ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes nugelCartNoticeIn {
          from {
            opacity: 0;
            transform: translate3d(0, -10px, 0) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        .nugel-horizontal-rail {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        @media (max-width: 767px) {
          .nugel-horizontal-rail {
            overflow: visible;
            touch-action: auto;
            overscroll-behavior: auto;
          }
        }

        @media (min-width: 768px) {
          .nugel-horizontal-rail {
            overscroll-behavior-x: contain;
            touch-action: pan-x;
          }
        }

        .nugel-horizontal-rail::-webkit-scrollbar {
          display: none;
        }

        .nugel-reveal {
          opacity: 0;
          transform: translate3d(0, 38px, 0);
          filter: blur(10px);
          transition:
            opacity 720ms cubic-bezier(0.22, 1, 0.36, 1),
            transform 720ms cubic-bezier(0.22, 1, 0.36, 1),
            filter 720ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform, filter;
        }

        .nugel-reveal.nugel-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }

        /* Starter Kit product links:
           no zoom/movement; only name color + arrow circle on hover. */
        .starter-kit-item {
          transform: none !important;
          transition: none !important;
        }

        .starter-kit-item:hover,
        .starter-kit-item:focus-visible {
          transform: none !important;
        }

        .starter-kit-item-name {
          transition: color 180ms ease;
        }

        .starter-kit-arrow-symbol {
          transition: color 180ms ease;
        }

        .starter-kit-arrow-circle {
          opacity: 0;
          transform: scale(0.68);
          border: 1px solid rgba(157, 255, 0, 0.55);
          background: rgba(157, 255, 0, 0.10);
          transition:
            opacity 180ms ease,
            transform 180ms ease;
        }

        .starter-kit-item:hover .starter-kit-item-name,
        .starter-kit-item:focus-visible .starter-kit-item-name {
          color: #9dff00;
        }

        .starter-kit-item:hover .starter-kit-arrow-symbol,
        .starter-kit-item:focus-visible .starter-kit-arrow-symbol {
          color: #9dff00;
        }

        .starter-kit-item:hover .starter-kit-arrow-circle,
        .starter-kit-item:focus-visible .starter-kit-arrow-circle {
          opacity: 1;
          transform: scale(1);
        }

        .shop-action-button {
          min-height: 48px;
          border: 1px solid rgba(255, 255, 255, 0.58);
          background: rgba(3, 24, 39, 0.58);
          color: #ffffff;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
          transition:
            transform 180ms ease,
            background-color 180ms ease,
            border-color 180ms ease,
            color 180ms ease;
        }

        .shop-action-button:hover,
        .shop-action-button:focus-visible {
          border-color: #9dff00 !important;
          background: #9dff00 !important;
          color: #000000 !important;
        }


        .hero-product-hotspot {
          position: absolute;
          border-radius: 999px;
          outline: none;
          cursor: default;
          transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .hero-product-hotspot::after {
          content: "";
          position: absolute;
          inset: 16%;
          border-radius: 999px;
          background: radial-gradient(circle, rgba(157,255,0,0.15), rgba(157,255,0,0) 68%);
          opacity: 0;
          transform: scale(0.72);
          transition:
            opacity 220ms ease,
            transform 220ms ease;
          pointer-events: none;
        }

        .hero-product-hotspot:hover,
        .hero-product-hotspot:focus-visible {
          transform: translateY(-8px);
        }

        .hero-product-hotspot:hover::after,
        .hero-product-hotspot:focus-visible::after {
          opacity: 1;
          transform: scale(1.08);
        }

        .hero-product-hotspot-energy {
          left: 14%;
          top: 11%;
          width: 31%;
          height: 72%;
        }

        .hero-product-hotspot-energy .hero-product-tooltip {
          top: -50px;
          left: 50%;
        }

        .hero-product-hotspot-container {
          left: 43%;
          top: 51%;
          width: 26%;
          height: 35%;
        }

        .hero-product-hotspot-container .hero-product-tooltip {
          top: -30px;
          left: 45%;
          min-width: 0;
          width: 92px;
          white-space: normal;
        }

        .hero-product-hotspot-antifog {
          right: 12%;
          top: 49%;
          width: 19%;
          height: 34%;
        }

        .hero-product-hotspot-antifog .hero-product-tooltip {
          top: -12px;
          left: 42%;
        }

        .hero-product-tooltip {
          position: absolute;
          left: 50%;
          top: -22px;
          min-width: max-content;
          transform: translate(-50%, 7px);
          border: 0;
          background: transparent;
          padding: 0;
          color: #07131a;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.08em;
          line-height: 1.05;
          text-align: center;
          text-transform: uppercase;
          text-shadow:
            0 0 6px rgba(255,255,255,1),
            0 0 14px rgba(255,255,255,1),
            0 0 28px rgba(255,255,255,0.95),
            0 0 42px rgba(255,255,255,0.80),
            0 0 60px rgba(255,255,255,0.55);
          box-shadow: none;
          opacity: 0;
          pointer-events: none;
          white-space: nowrap;
          transition:
            opacity 180ms ease,
            transform 180ms ease;
        }

        .hero-product-hotspot:hover .hero-product-tooltip,
        .hero-product-hotspot:focus-visible .hero-product-tooltip {
          opacity: 1;
          transform: translate(-50%, 0);
        }

        .nugel-float-energy {
          animation: nugelFloatEnergy 5.2s ease-in-out infinite;
          will-change: transform;
        }

        .nugel-float-antifog {
          animation: nugelFloatAntifog 4.1s ease-in-out infinite;
          will-change: transform;
        }

        .nugel-float-cup {
          animation: nugelFloatCup 5.8s ease-in-out infinite;
          will-change: transform;
        }

        .nugel-starter-float-energy {
          animation: nugelStarterFloatEnergy 6.5s ease-in-out infinite;
          will-change: transform;
        }

        .nugel-starter-float-antifog {
          animation: nugelStarterFloatAntifog 5.8s ease-in-out infinite;
          will-change: transform;
        }

        .nugel-starter-float-cup {
          animation: nugelStarterFloatCup 7s ease-in-out infinite;
          will-change: transform;
        }

        .nugel-final-kit-float {
          animation: nugelFinalKitFloat 5.8s ease-in-out infinite;
          will-change: transform;
        }

        .nugel-scroll-arrow {
          animation: nugelScrollArrow 1.5s ease-in-out infinite;
        }

        @keyframes nugelFloatEnergy {
          0%,
          100% {
            transform: translate3d(0, -8px, 0) rotate(-1deg);
          }
          50% {
            transform: translate3d(0, 13px, 0) rotate(1.5deg);
          }
        }

        @keyframes nugelFloatAntifog {
          0%,
          100% {
            transform: translate3d(0, 7px, 0) rotate(1deg);
          }
          50% {
            transform: translate3d(0, -12px, 0) rotate(-2deg);
          }
        }

        @keyframes nugelFloatCup {
          0%,
          100% {
            transform: translate3d(0, -5px, 0) rotate(1.2deg);
          }
          50% {
            transform: translate3d(0, 10px, 0) rotate(-1.2deg);
          }
        }

        @keyframes nugelStarterFloatEnergy {
          0%, 100% { transform: translate3d(0, -2px, 0); }
          50% { transform: translate3d(0, 3px, 0); }
        }

        @keyframes nugelStarterFloatAntifog {
          0%, 100% { transform: translate3d(0, 2px, 0); }
          50% { transform: translate3d(0, -3px, 0); }
        }

        @keyframes nugelStarterFloatCup {
          0%, 100% { transform: translate3d(0, -2px, 0); }
          50% { transform: translate3d(0, 2px, 0); }
        }

        @keyframes nugelFinalKitFloat {
          0%, 100% { transform: translate3d(0, -4px, 0) rotate(-0.4deg); }
          50% { transform: translate3d(0, 7px, 0) rotate(0.5deg); }
        }

        @keyframes nugelScrollArrow {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(8px);
            opacity: 1;
          }
        }

        .nugel-water-line {
          transform: translateY(-50%);
          will-change: top;
        }

        .nugel-water-surface {
          border-radius: 48% 52% 46% 54% / 45% 52% 48% 55%;
          background:
            radial-gradient(
              ellipse at 15% 35%,
              rgba(255, 255, 255, 0.28),
              transparent 22%
            ),
            radial-gradient(
              ellipse at 40% 70%,
              rgba(160, 235, 255, 0.18),
              transparent 25%
            ),
            radial-gradient(
              ellipse at 68% 30%,
              rgba(255, 255, 255, 0.2),
              transparent 19%
            ),
            radial-gradient(
              ellipse at 88% 65%,
              rgba(130, 225, 255, 0.18),
              transparent 20%
            ),
            linear-gradient(
              180deg,
              rgba(220, 250, 255, 0.22),
              rgba(45, 190, 230, 0.1) 40%,
              rgba(0, 94, 140, 0.02)
            );
          filter: blur(8px);
          box-shadow:
            0 -12px 45px rgba(220, 250, 255, 0.1),
            0 15px 55px rgba(19, 178, 220, 0.12);
          animation: nugelWaterSurface 5.5s ease-in-out infinite;
          will-change: transform;
        }

        .nugel-caustics {
          background:
            repeating-radial-gradient(
              ellipse at 20% 20%,
              rgba(255, 255, 255, 0.14) 0,
              rgba(255, 255, 255, 0.07) 3px,
              transparent 8px,
              transparent 34px
            ),
            repeating-radial-gradient(
              ellipse at 75% 65%,
              rgba(130, 230, 255, 0.12) 0,
              transparent 6px,
              transparent 42px
            );
          background-size: 190px 120px, 250px 160px;
          mix-blend-mode: screen;
          opacity: 0.18;
          animation: nugelCausticsMove 9s linear infinite;
        }

        .nugel-bubble {
          position: absolute;
          bottom: -40px;
          border: 1px solid rgba(255, 255, 255, 0.4);
          border-radius: 9999px;
          background: radial-gradient(
            circle at 30% 25%,
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.08) 45%,
            rgba(65, 200, 240, 0.05)
          );
          box-shadow: inset 2px 2px 8px rgba(255, 255, 255, 0.25);
          opacity: 0;
          animation: nugelBubbleRise linear infinite;
        }

        .nugel-bubble-1 {
          left: 15%;
          width: 12px;
          height: 12px;
          animation-duration: 7s;
        }

        .nugel-bubble-2 {
          left: 28%;
          width: 7px;
          height: 7px;
          animation-duration: 9s;
          animation-delay: 2s;
        }

        .nugel-bubble-3 {
          left: 46%;
          width: 10px;
          height: 10px;
          animation-duration: 8s;
          animation-delay: 4s;
        }

        .nugel-bubble-4 {
          left: 62%;
          width: 14px;
          height: 14px;
          animation-duration: 10s;
          animation-delay: 1s;
        }

        .nugel-bubble-5 {
          left: 78%;
          width: 9px;
          height: 9px;
          animation-duration: 8s;
          animation-delay: 3s;
        }

        .nugel-bubble-6 {
          left: 90%;
          width: 18px;
          height: 18px;
          animation-duration: 12s;
          animation-delay: 5s;
        }

        @keyframes nugelWaterSurface {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scaleX(1.02) rotate(-0.4deg);
          }
          50% {
            transform: translate3d(-1.5%, 6px, 0) scaleX(1.06)
              rotate(0.5deg);
          }
        }

        @keyframes nugelCausticsMove {
          0% {
            background-position: 0 0, 0 0;
          }
          50% {
            background-position: 70px 40px, -80px 55px;
          }
          100% {
            background-position: 140px 80px, -160px 110px;
          }
        }

        @keyframes nugelBubbleRise {
          0% {
            transform: translate3d(0, 0, 0) scale(0.7);
            opacity: 0;
          }
          12% {
            opacity: 0.65;
          }
          80% {
            opacity: 0.45;
          }
          100% {
            transform: translate3d(28px, -110vh, 0) scale(1.15);
            opacity: 0;
          }
        }

        .about-bubble-field {
          isolation: isolate;
          display: grid;
          min-height: 0 !important;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          align-items: center;
          gap: clamp(16px, 2.1vw, 30px);
          padding: 22px 0 12px;
        }

        .about-story-bubble {
          position: relative;
          grid-column: span 2;
          justify-self: center;
          width: min(100%, 230px);
          aspect-ratio: 1;
          height: auto;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: 48% 52% 45% 55% / 51% 44% 56% 49%;
          background:
            radial-gradient(circle at 28% 20%, rgba(255,255,255,0.22), transparent 28%),
            radial-gradient(circle at 75% 82%, rgba(157,255,0,0.09), transparent 35%),
            linear-gradient(145deg, rgba(20,113,145,0.76), rgba(3,47,70,0.72));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.16),
            inset 0 -22px 55px rgba(0,26,42,0.18),
            0 24px 60px rgba(0,0,0,0.22);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          transition:
            transform 300ms cubic-bezier(0.22, 1, 0.36, 1),
            border-color 300ms ease,
            box-shadow 300ms ease,
            background 300ms ease;
          will-change: transform;
        }

        .about-story-bubble:nth-child(2) {
          width: min(100%, 276px);
          z-index: 8;
        }

        .about-story-bubble:nth-child(4) {
          grid-column: 2 / span 2;
        }

        .about-story-bubble:nth-child(5) {
          grid-column: 4 / span 2;
        }

        .about-story-bubble::after {
          content: "";
          position: absolute;
          inset: 9%;
          z-index: 1;
          border: 1px solid rgba(157,255,0,0.24);
          border-radius: inherit;
          box-shadow:
            0 0 20px rgba(157,255,0,0.08),
            inset 0 0 24px rgba(157,255,0,0.04);
          opacity: 0;
          transform: scale(0.78);
          transition:
            opacity 280ms ease,
            transform 360ms cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: none;
        }

        .about-story-bubble:hover,
        .about-story-bubble:focus-visible {
          z-index: 20;
          border-color: rgba(157,255,0,0.58);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.24),
            0 0 0 1px rgba(157,255,0,0.14),
            0 28px 80px rgba(0,0,0,0.28),
            0 0 45px rgba(157,255,0,0.14);
          transform: translateY(-6px) scale(1.045);
        }

        .about-story-bubble:hover::after,
        .about-story-bubble:focus-visible::after {
          opacity: 1;
          transform: scale(1.06);
        }

        .about-bubble-shine {
          position: absolute;
          left: 14%;
          top: 8%;
          width: 42%;
          height: 22%;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0));
          filter: blur(8px);
          opacity: 0.72;
          transform: rotate(-14deg);
          pointer-events: none;
        }

        .about-bubble-index {
          position: absolute;
          left: 18%;
          top: 14%;
          z-index: 4;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.42);
          transition: color 220ms ease;
        }

        .about-story-bubble:hover .about-bubble-index,
        .about-story-bubble:focus-visible .about-bubble-index {
          color: #9dff00;
        }

        .about-bubble-preview {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transform: translateY(8px);
          transition:
            max-height 320ms ease,
            opacity 240ms ease,
            transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .about-story-bubble:hover .about-bubble-preview,
        .about-story-bubble:focus-visible .about-bubble-preview {
          max-height: 5.5rem;
          opacity: 1;
          transform: translateY(0);
        }

        .about-expanded-bubble {
          border-radius: 5rem 4rem 5.5rem 4.5rem / 4rem 5.5rem 4rem 5rem;
          animation: aboutBubbleExpand 420ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        .about-dieter-placeholder {
          border-radius: 44% 56% 49% 51% / 48% 44% 56% 52%;
          background:
            radial-gradient(circle at 28% 18%, rgba(255,255,255,0.14), transparent 24%),
            linear-gradient(145deg, rgba(255,255,255,0.065), rgba(0,33,51,0.18));
        }

        @keyframes aboutBubbleFloat {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -9px; }
        }

        @keyframes aboutBubbleExpand {
          from { opacity: 0; transform: scale(0.72); filter: blur(8px); }
          to { opacity: 1; transform: scale(1); filter: blur(0); }
        }

        @media (max-width: 1100px) {
          .about-story-bubble {
            width: min(100%, 210px);
          }

          .about-story-bubble:nth-child(2) {
            width: min(100%, 252px);
          }
        }

        @media (max-width: 767px) {
          .about-bubble-field {
            grid-template-columns: 1fr;
            gap: 14px;
            padding-top: 14px;
          }

          .about-story-bubble,
          .about-story-bubble:nth-child(2),
          .about-story-bubble:nth-child(4),
          .about-story-bubble:nth-child(5) {
            grid-column: auto;
            width: min(100%, 360px);
            min-height: 150px;
            aspect-ratio: auto;
            justify-self: center;
            border-radius: 2rem;
            transform: none;
          }

          .about-story-bubble:hover,
          .about-story-bubble:focus-visible {
            transform: translateY(-3px) scale(1.015);
          }

          .about-bubble-preview {
            max-height: 5.5rem;
            opacity: 0.72;
            transform: none;
          }

          .about-expanded-bubble {
            border-radius: 2.25rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .nugel-reveal,
          .nugel-reveal.nugel-visible {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .nugel-float-energy,
          .nugel-float-antifog,
          .nugel-float-cup,
          .nugel-starter-float-energy,
          .nugel-starter-float-antifog,
          .nugel-starter-float-cup,
          .nugel-final-kit-float,
          .nugel-scroll-arrow,
          .about-story-bubble,
          .about-expanded-bubble,
          .nugel-water-surface,
          .nugel-caustics,
          .nugel-bubble {
            animation: none;
          }
        }
      `}</style>
    </main>
  );
}
