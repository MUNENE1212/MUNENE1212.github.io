/* Career story, experience, education and skills.
   Used by about.html and resume.html, so the two pages never disagree.
   Source: the original multi-page portfolio (plp-final-web-project), updated Oct 2026. */

const CAREER = {
  company: {
    legalName: "Emen Engineering Limited",
    founded: 2020
  },

  // Three-part story shown at the top of the About page.
  story: [
    {
      title: "Started with circuits",
      text: "Studied Electrical & Electronic Engineering at JKUAT. For my thesis I built an intelligent receptionist that uses Haar Cascade face detection and QR codes to automate visitor check-in. It showed me what happens when hardware meets software."
    },
    {
      title: "Crossed into code",
      text: "Software could scale what hardware alone couldn't. I taught myself Python, JavaScript, React, Node.js and the databases behind them, and started building full-stack systems — APIs, real-time features, payment integrations — for problems I saw around me."
    },
    {
      title: "Built a company",
      text: "Emen Engineering Limited now ships live products — a technician marketplace, an online shop, AI products and LED signage — on infrastructure we run ourselves, across three lines: Emen Tech, Applied AI and Emen Lighting."
    }
  ],

  // Newest first.
  timeline: [
    { year: "2026", title: "Emen Lighting and Applied AI", text: "Launched KEROMA and Lectern; began ArdaLink drought intelligence and the Emen Signage firmware platform." },
    { year: "2025", title: "DumuWaks and the Emen Shop go live", text: "Two-sided technician marketplace and e-commerce storefront launched to real customers." },
    { year: "2025", title: "Data science, AI and software engineering certifications", text: "KIEP-SKIES (Data Science & AI) and Power Learn Project (Software Engineering)." },
    { year: "2023", title: "Graduated from JKUAT", text: "BSc Electrical & Electronic Engineering. Thesis: Intelligent Receptionist." },
    { year: "2020", title: "Founded Emen Engineering Limited", text: "A technology company building software and hardware for Kenyan businesses." }
  ],

  experience: [
    {
      role: "Founder & CTO",
      org: "Emen Engineering Limited",
      period: "2020 – present",
      points: [
        "Lead product, architecture and infrastructure across Emen Tech, Applied AI and Emen Lighting.",
        "Built and launched DumuWaks (technician marketplace, 30+ active users) and the Emen Shop storefront.",
        "Shipped KEROMA and Lectern; leading development of ArdaLink drought intelligence and the Emen Signage ESP32 firmware.",
        "Run the production VPS estate: containers, reverse proxy, CI/CD and monitoring."
      ]
    },
    {
      role: "Community Technology Leader",
      org: "Youth groups, Kenya",
      period: "2020 – present",
      points: [
        "Pioneer and lead youth groups focused on skills and community development.",
        "Run workshops on web development and emerging technology; build tools such groups use to manage savings and production."
      ]
    }
  ],

  education: [
    { title: "BSc Electrical & Electronic Engineering", org: "Jomo Kenyatta University of Agriculture and Technology (JKUAT)", period: "2017 – 2023", note: "Thesis: Intelligent Receptionist — face detection and QR-code appointment booking." },
    { title: "Data Science & Artificial Intelligence", org: "KIEP-SKIES (Kenya Industry and Entrepreneurship Project)", period: "2025" },
    { title: "Software Engineering", org: "Power Learn Project (PLP)", period: "2025" },
    { title: "Applied Data Science & Computer Vision", org: "WorldQuant University", period: "Ongoing" }
  ],

  skills: [
    { group: "Languages", items: ["Python", "TypeScript", "JavaScript", "C / C++", "SQL"] },
    { group: "Backend", items: ["FastAPI", "Django", "Node.js", "Express", "REST & OpenAPI", "WebSockets"] },
    { group: "Frontend", items: ["React", "Next.js", "Vite", "Tailwind CSS", "PWAs"] },
    { group: "Data & AI", items: ["PostgreSQL", "MongoDB", "Redis", "scikit-learn", "LLM integration", "Voice AI", "Earth Engine"] },
    { group: "Infrastructure", items: ["Docker", "Nginx", "GitHub Actions", "Linux", "Grafana", "MQTT"] },
    { group: "Hardware", items: ["ESP32", "Arduino", "PlatformIO", "LED signage", "Control systems", "Signal processing"] },
    { group: "Payments", items: ["M-Pesa Daraja", "IntaSend", "WhatsApp checkout"] }
  ],

  languages: ["English (fluent)", "Swahili (native)"],

  values: [
    { title: "Field-first", text: "Decisions start with the people, devices, networks and payments that exist where the product will live." },
    { title: "Built to last", text: "Tests, monitoring and documentation, so systems can be operated and handed over." },
    { title: "Hardware-aware", text: "The best architecture respects both the cloud and the board at the edge." },
    { title: "Impact over demos", text: "A technically impressive system only matters when it solves a real problem clearly." }
  ]
};
