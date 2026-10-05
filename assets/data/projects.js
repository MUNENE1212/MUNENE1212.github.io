/* Public project catalogue.

   This file is PUBLIC. Only put here what a client may read:
   no credentials, server addresses, internal paths or private notes.
   The private, internal index lives in the `vault` repository.

   Fields
     id        short slug, used as an anchor
     name      display name
     division  "tech" | "lighting" | "ai"   (which Emen line it belongs to)
     status    "live" | "building" | "research"
     summary   one or two sentences, outcome first
     stack     short list of technologies
     url       live product link (optional)
     repo      public repository link (optional; leave out for private work)
     featured  true to show as a case study
     story     for featured items: { problem, approach, result }
     metric    optional headline number, e.g. "30+ active users"
     images    optional screenshots: [{ src, alt }] (WebP, ~1200px wide,
               never showing real customers' names or data)
*/

const PROJECTS = [
  {
    id: "dumuwaks",
    name: "Dumu Waks",
    division: "tech",
    status: "live",
    featured: true,
    summary: "A maintenance and repair marketplace for Kenya: technician matching, booking, real-time chat and M-Pesa payments.",
    stack: ["TypeScript", "React", "Node.js", "MongoDB", "Socket.IO", "M-Pesa"],
    url: "https://dumuwaks.ementech.co.ke",
    repo: "https://github.com/MUNENE1212/dumuwaks",
    metric: "30+ active users",
    images: [
      { src: "assets/img/work/dumuwaks-landing.webp", alt: "Dumu Waks landing page: search for maintenance and repair services" },
      { src: "assets/img/work/dumuwaks-dashboard.webp", alt: "Dumu Waks customer dashboard with bookings and quick actions" }
    ],
    story: {
      problem: "Finding a trusted technician is word-of-mouth, and paying one safely is awkward for both sides.",
      approach: "Matching on location, skills and availability; booking with a fee held in escrow; real-time messaging; M-Pesa STK push and payouts; dashboards for clients, technicians, support and admins.",
      result: "Live in production with continuous deployment on every merge."
    }
  },
  {
    id: "emen-shop",
    name: "Emen Shop",
    division: "tech",
    status: "live",
    featured: true,
    summary: "An electronics store and installation-services business online: catalogue, cart, orders, accounts, WhatsApp checkout and admin analytics.",
    stack: ["Next.js", "TypeScript", "MongoDB", "WhatsApp"],
    url: "https://baitech.co.ke",
    images: [
      { src: "assets/img/work/emen-shop-landing.webp", alt: "Emen Shop home page with search and today's offers" },
      { src: "assets/img/work/emen-shop-catalogue.webp", alt: "Emen Shop product catalogue filtered by category" }
    ],
    story: {
      problem: "A shop selling electronics and installation services needed to sell online without asking customers to trust an unfamiliar card checkout.",
      approach: "Server-rendered storefront for search visibility, products and services in one catalogue, checkout that continues on WhatsApp, and an admin dashboard for orders and analytics.",
      result: "Live at baitech.co.ke (formerly BaiTech), running on Emen-managed infrastructure."
    }
  },
  {
    id: "ardalink",
    name: "ArdaLink",
    division: "ai",
    status: "building",
    featured: true,
    summary: "Drought intelligence for pastoralists in Isiolo County, from satellite data to a phone call in the herder's language.",
    stack: ["Python", "FastAPI", "Earth Engine", "PostgreSQL", "TypeScript", "React", "Voice AI"],
    repo: "https://github.com/MUNENE1212/ardalink-engine",
    story: {
      problem: "Herders decide where to move livestock with little warning of pasture and water loss, and most are reached by voice, not apps.",
      approach: "An engine scores vegetation (NDVI) and plans livestock journeys; an API turns that into voice calls over Africa's Talking; an operator dashboard captures ground truth.",
      result: "Three open repositories — engine, API and web — that work as one system and can be deployed independently."
    }
  },
  {
    id: "emen-signage",
    name: "Emen Signage",
    division: "lighting",
    status: "building",
    featured: true,
    summary: "One ESP32 firmware for every LED sign installation — panel, geometry, content and duty class are configuration, not code.",
    stack: ["C++", "ESP32", "PlatformIO", "MQTT", "OTA"],
    story: {
      problem: "Each shop sign used to need its own firmware, which made every new installation a software project.",
      approach: "A single firmware built on the EmenSense hardware layer: 14 animations, content pushed over MQTT, over-the-air updates with rollback, and tests that run on a laptop.",
      result: "New installations are configured, not reprogrammed. Supersedes two earlier one-off sign builds."
    }
  },
  {
    id: "keroma",
    name: "KEROMA",
    division: "ai",
    status: "live",
    featured: true,
    summary: "African heritage recipes that start from what is already in your kitchen, with the cultural story behind each meal.",
    stack: ["Next.js", "TypeScript", "MongoDB", "LLMs", "M-Pesa"],
    url: "https://keroma.ementech.co.ke",
    repo: "https://github.com/MUNENE1212/keroma",
    story: {
      problem: "Recipe apps assume Western pantries and say nothing about where a dish comes from.",
      approach: "AI generation with provider fallback so the product keeps working when one model is unavailable, curated heritage articles, and M-Pesa for premium access.",
      result: "Live, installable as a PWA, and works end to end even before paid AI keys are added."
    }
  },
  {
    id: "transittag",
    name: "TransitTag",
    division: "lighting",
    status: "building",
    featured: true,
    summary: "An IoT platform for public transport: vehicle devices, live telemetry and M-Pesa-enabled passenger experiences.",
    stack: ["C", "MQTT", "WebSockets", "PWA", "InfluxDB", "Grafana"],
    repo: "https://github.com/MUNENE1212/transittag",
    story: {
      problem: "Matatu operators have little live visibility of their fleet, and passengers have no digital touchpoint on board.",
      approach: "Devices publish telemetry over MQTT; a C WebSocket gateway streams it to dashboards and a passenger web app with payments.",
      result: "A working demo of the full path, from device to dashboard to passenger phone."
    }
  },
  {
    id: "lectern",
    name: "Lectern",
    division: "ai",
    status: "live",
    summary: "Turns any PDF, ebook or article into a chaptered audiobook, entirely offline.",
    stack: ["Python", "Piper TTS", "PyMuPDF"],
    repo: "https://github.com/MUNENE1212/lectern",
    story: {
      problem: "Text-to-speech on real documents stumbles over broken ligatures and has no idea where chapters begin.",
      approach: "Ligature repair, chapter detection you can check before converting, local speech synthesis and a small web library.",
      result: "Open source; runs on a laptop with no cloud account."
    }
  },

  /* ---- Further work (shown in the index, not as case studies) ---- */
  {
    id: "ementech",
    name: "Emen company website",
    division: "tech",
    status: "live",
    summary: "Company site for Emen Engineering Limited with product showcase, lead capture, quote requests, integrated email and an AI chat assistant.",
    stack: ["React", "TypeScript", "Vite", "Node.js", "Tailwind"],
    url: "https://ementech.co.ke",
    images: [
      { src: "assets/img/work/ementech-landing.webp", alt: "Emen company website hero: We Build For Africa" }
    ]
  },
  {
    id: "smartbiz",
    name: "SmartBiz",
    division: "tech",
    status: "building",
    summary: "Business suite for Kenyan SMEs: inventory, point of sale, suppliers, payroll, sales analytics and M-Pesa.",
    stack: ["FastAPI", "Python", "MongoDB"],
    images: [
      { src: "assets/img/work/smartbiz-dashboard.webp", alt: "SmartBiz dashboard with daily sales trend and payment methods" }
    ]
  },
  {
    id: "greenrent",
    name: "GreenRent",
    division: "tech",
    status: "building",
    summary: "Housing access for every income level: flexible rent plans, daily micro-savings and virtual viewings.",
    stack: ["Node.js", "Next.js", "MongoDB", "IntaSend"],
    images: [
      { src: "assets/img/work/greenrent-landing.webp", alt: "GreenRent landing page" }
    ]
  },
  {
    id: "intelligent-receptionist",
    name: "Intelligent Receptionist",
    division: "ai",
    status: "research",
    summary: "BSc thesis at JKUAT: automated visitor check-in using Haar Cascade face detection and QR-code appointment booking.",
    stack: ["Python", "OpenCV", "QR codes"],
    images: [
      { src: "assets/img/work/intelligent-receptionist.webp", alt: "Intelligent Receptionist thesis project title card" }
    ]
  },
  {
    id: "tomtin",
    name: "TomTin ERP",
    division: "tech",
    status: "live",
    summary: "Offline-first point of sale and business intelligence for owners running several small businesses — water, laundry, retail, LPG.",
    stack: ["React", "Django", "PostgreSQL", "PWA"]
  },

  {
    id: "kuku",
    name: "Kuku Savings Group",
    division: "tech",
    status: "live",
    summary: "A poultry-production and savings PWA for a youth group: daily egg logs, sales, expenses, loans and contributions.",
    stack: ["Next.js", "Firebase", "PWA"],
    url: "https://zebra.ementech.co.ke"
  },
  {
    id: "the-ambitious",
    name: "The Ambitious",
    division: "tech",
    status: "building",
    summary: "Mobile-first app for a Kenyan self-help group: contributions, group funds, investments, governance and a member forum.",
    stack: ["Next.js", "TypeScript", "Firebase"],
    repo: "https://github.com/MUNENE1212/the-ambitious"
  },
  {
    id: "pricing-engine",
    name: "Pricing engine",
    division: "tech",
    status: "live",
    summary: "Works out selling prices from a target margin, with Kenyan tax (VAT, withholding, turnover tax) handled per sales channel.",
    stack: ["Next.js", "Prisma", "Recharts"]
  },
  {
    id: "onlineduka",
    name: "OnlineDuka",
    division: "tech",
    status: "building",
    summary: "Multi-shop directory and retail platform so small Kenyan shops can sell online under one roof.",
    stack: ["Next.js", "Prisma", "PostgreSQL"]
  },
  {
    id: "image-generator",
    name: "Image Generator",
    division: "ai",
    status: "live",
    summary: "A studio for identity-preserving portraits that compares generation strategies side by side with automated quality metrics.",
    stack: ["Python", "Streamlit", "SDXL", "FLUX", "LoRA"],
    url: "https://image-generator.ementech.co.ke",
    repo: "https://github.com/MUNENE1212/image-generator"
  },
  {
    id: "emensense",
    name: "EmenSense",
    division: "lighting",
    status: "building",
    summary: "The modular sensing-and-control layer every Emen firmware builds on, with a hardware abstraction layer and host-run tests.",
    stack: ["C++", "ESP32", "CI"]
  },
  {
    id: "esp32-labs",
    name: "ESP32 engineering labs",
    division: "lighting",
    status: "research",
    summary: "Four progressive, simulated hardware labs — GPIO and PWM, I2C displays, SPI sensors, and serial protocols.",
    stack: ["C++", "ESP32", "PlatformIO", "Wokwi"],
    repo: "https://github.com/MUNENE1212/LED"
  }
];

const DIVISIONS = {
  tech: "Emen Tech",
  ai: "Applied AI",
  lighting: "Emen Lighting"
};

const STATUS_LABEL = {
  live: "Live",
  building: "In development",
  research: "Research"
};
