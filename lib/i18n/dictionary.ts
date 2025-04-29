// Define the type for translation dictionaries
export type TranslationDictionary<T extends Record<string, string>> = {
  [language: string]: T;
};

// The base type that all language dictionaries must follow
export type BaseTranslations = {
  // Navigation
  home: string;
  about: string;
  services: string;
  blog: string;
  contact: string;

  // Common actions
  login: string;
  register: string;
  applyNow: string;
  learnMore: string;
  viewAll: string;

  // Hero section
  name: string;
  post: string;
  line: string;
  heroTitle: string;
  heroDescription: string;
  exploreMore: string;

  // Blog specific
  blogTitle: string;
  blogDescription: string;
  featuredPost: string;
  allPosts: string;
  readMore: string;
  minRead: string;
  backToBlog: string;
  tableOfContents: string;
  ViewAllPosts: string;

  // Footer
  footerTagline: string;
  allRightsReserved: string;
  quickLinks: string;

  // Newsletter
  joinNewsletter: string;
  newsletterDescription: string;
  subscribeButton: string;
  privacyNotice: string;
  stayUpdated: string;
  subscribed: string;
  receiving: string;
  subscribeAnother: string;

  // Personal branding
  developer: string;
  educator: string;
  personalBio: string;
  downloadResume: string;
  viewProjects: string;
  connectWithMe: string;

  // Blog categories
  webDevelopment: string;
  javascript: string;
  react: string;
  nextjs: string;
  typescript: string;
  uiux: string;
  performance: string;
  careerGrowth: string;

  // Topics
  exploreTopics: string;
  recentArticles: string;

  // Project sections
  myProjects: string;
  projectsDescription: string;
  viewLiveDemo: string;
  viewSourceCode: string;
  technologiesUsed: string;

  // Skills section
  mySkills: string;
  frontendDevelopment: string;
  backendDevelopment: string;
  devOps: string;
  tools: string;

  // Contact form
  getInTouch: string;
  fullName: string;
  email: string;
  message: string;
  sendMessage: string;
  contactSuccess: string;

  // About page
  aboutMe: string;
  myJourney: string;
  myExperience: string;
  education: string;

  //About Me
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  line5: string;

  //YoutubeSection
  youTubeChannel: string;
  latestVideos: string;
  subscribe: string;
  vlogVideos: string;
  technicalContent: string;
  comingSoon: string;
  technicalLine: string;
  getNotified: string;

  // Allow for extension with any string key
  [key: string]: string;
};

// English translations
const en: BaseTranslations = {
  // Navigation
  home: "Home",
  about: "About",
  services: "Services",
  blog: "Blog",
  contact: "Contact",

  // Common actions
  login: "Login",
  register: "Register",
  applyNow: "Apply Now",
  learnMore: "Learn More",
  viewAll: "View All",

  // Hero section
  name: "Vijeet Shah",
  post: "Technical Product Manager",
  line: "Turning ideas into impactful products | Product leadership with engineering excellence",
  heroTitle: "Vijeet Shah's Blog",
  heroDescription:
    "Sharing ideas, tutorials, and insights about development and technology.",
  exploreMore: "Explore More",

  // Blog specific
  blogTitle: "Blog",
  blogDescription: "All my writing in one place",
  featuredPost: "Featured Post",
  allPosts: "All Posts",
  readMore: "Read More",
  minRead: "min read",
  backToBlog: "Back to Blog",
  tableOfContents: "Table of Contents",
  ViewAllPosts: "View All Posts",

  // Footer
  footerTagline: "Software Engineer & Educator",
  allRightsReserved: "All rights reserved.",
  quickLinks: "Quick Links",

  // Newsletter
  joinNewsletter: "Join My Newsletter",
  newsletterDescription:
    "Get the latest articles, tutorials, and updates delivered to your inbox.",
  subscribeButton: "Subscribe",
  privacyNotice: "I respect your privacy. No spam, ever. Unsubscribe anytime.",
  stayUpdated: "Stay Updated with My Newsletter",
  subscribed: "You're subscribed to our newsletter",
  receiving: "is receiving our weekly updates.",
  subscribeAnother: "Subscribe with another email",

  // Personal branding
  developer: "Developer",
  educator: "Educator",
  personalBio:
    "Versatile software engineer, committed to delivering high-quality and scalable web applications.",
  downloadResume: "Download Resume",
  viewProjects: "View Projects",
  connectWithMe: "Connect with me",

  // Blog categories
  webDevelopment: "Web Development",
  javascript: "JavaScript",
  react: "React",
  nextjs: "Next.js",
  typescript: "TypeScript",
  uiux: "UI/UX",
  performance: "Performance",
  careerGrowth: "Career Growth",

  // Topics
  exploreTopics: "Explore Topics",
  recentArticles: "Recent Articles",

  // Project sections
  myProjects: "My Projects",
  projectsDescription: "Here are some of the projects I've worked on.",
  viewLiveDemo: "View Live Demo",
  viewSourceCode: "View Source Code",
  technologiesUsed: "Technologies Used",

  // Skills section
  mySkills: "My Skills",
  frontendDevelopment: "Frontend Development",
  backendDevelopment: "Backend Development",
  devOps: "DevOps",
  tools: "Tools",

  // Contact form
  getInTouch: "Get in Touch",
  fullName: "Full Name",
  email: "Email",
  message: "Message",
  sendMessage: "Send Message",
  contactSuccess: "Thank you for your message! I'll get back to you soon.",

  // About page
  aboutMe: "About Me",
  myJourney: "My Journey",
  myExperience: "My Experience",
  education: "Education",

  //About me
  line1: "My Journey",
  line2:
    "After graduating in Computer Science, I started my career as a Software Engineer while also completing my Master's degree. After nearly two years in the corporate world, I transitioned to working remotely with international startups.",
  line3:
    "During this time, I discovered my passion for management and product development, leading me to start my own agency, Loopxo. There, I helped clients build MVPs, websites, and digital products (SAAS), while also taking on marketing projects.",
  line4:
    "Later, I founded Shri Laxmi Finance, a loan business in India, after securing an RBI license. Managing both Loopxo and Srilakshmi Finance strengthened my leadership, operational, and technical skills.",
  line5:
    "Today, I focus on building tech products and managing the technical side of my financial business, combining entrepreneurship, technology, and innovation.",

  youTubeChannel: "My YouTube Channel",
  latestVideos: "Check out my latest videos",
  subscribe: "Subscribe",
  vlogVideos: "Fun & Vlog Videos",
  technicalContent: "Technical Content",
  comingSoon: "Coming Soon",
  technicalLine:
    "Technical tutorials and coding videos are in production. Subscribe to my channel to be notified when new content is released!",
  getNotified: "Get Notified",
};

// Hindi translations
const hi: BaseTranslations = {
  // Navigation
  home: "होम",
  about: "मेरे बारे में",
  services: "सेवाएं",
  blog: "ब्लॉग",
  contact: "संपर्क",

  // Common actions
  login: "लॉगिन",
  register: "रजिस्टर",
  applyNow: "अभी आवेदन करें",
  learnMore: "और जानें",
  viewAll: "सभी देखें",

  // Hero section
  name: "विजीत शाह",
  post: "तकनीकी उत्पाद प्रबंधक",
  line: "विचारों को प्रभावशाली उत्पादों में बदलना | इंजीनियरिंग उत्कृष्टता के साथ उत्पाद नेतृत्व",
  heroTitle: "विजीत शाह के ब्लॉग में आपका स्वागत है",
  heroDescription:
    "विकास और प्रौद्योगिकी के बारे में विचार, ट्यूटोरियल और अंतर्दृष्टि साझा करना।",
  exploreMore: "और एक्सप्लोर करें",

  // Blog specific
  blogTitle: "ब्लॉग",
  blogDescription: "मेरी सारी लिखी गई सामग्री एक ही जगह एकत्रित है",
  featuredPost: "विशेष पोस्ट",
  allPosts: "सभी पोस्ट",
  readMore: "और पढ़ें",
  minRead: "मिनट का पठन",
  backToBlog: "ब्लॉग पर वापस जाएं",
  tableOfContents: "विषय-सूची",
  ViewAllPosts: "सभी पोस्ट देखें",

  // Footer
  footerTagline: "सॉफ्टवेयर इंजीनियर और शिक्षक",
  allRightsReserved: "सर्वाधिकार सुरक्षित।",
  quickLinks: "त्वरित लिंक",

  // Newsletter
  joinNewsletter: "मेरे न्यूज़लेटर में शामिल हों",
  newsletterDescription:
    "नवीनतम लेख, ट्यूटोरियल और अपडेट अपने इनबॉक्स में प्राप्त करें।",
  subscribeButton: "सब्सक्राइब",
  privacyNotice:
    "मैं आपकी गोपनीयता का सम्मान करता हूं। कोई स्पैम नहीं, कभी भी। किसी भी समय अनसब्सक्राइब करें।",
    stayUpdated: "मेरे न्यूज़लेटर के साथ अपडेटेड रहें",
  subscribed: "आप हमारे न्यूज़लेटर के सदस्य हैं",
  receiving: "हमारे साप्ताहिक अपडेट प्राप्त कर रहा है।",
  subscribeAnother: "दूसरे ईमेल के साथ सदस्यता लें",

  // Personal branding
  developer: "डेवलपर",
  educator: "शिक्षक",
  personalBio:
    "बहुमुखी सॉफ्टवेयर इंजीनियर, उच्च गुणवत्ता और स्केलेबल वेब एप्लिकेशन देने के लिए प्रतिबद्ध।",
  downloadResume: "रिज्यूमे डाउनलोड करें",
  viewProjects: "प्रोजेक्ट्स देखें",
  connectWithMe: "मुझसे जुड़ें",

  // Blog categories
  webDevelopment: "वेब डेवलपमेंट",
  javascript: "जावास्क्रिप्ट",
  react: "रिएक्ट",
  nextjs: "नेक्स्ट.जेएस",
  typescript: "टाइपस्क्रिप्ट",
  uiux: "यूआई/यूएक्स",
  performance: "परफॉरमेंस",
  careerGrowth: "करियर ग्रोथ",

  // Topics
  exploreTopics: "विषयों की खोज करें",
  recentArticles: "हाल के लेख",

  // Project sections
  myProjects: "मेरे प्रोजेक्ट्स",
  projectsDescription: "यहां कुछ प्रोजेक्ट्स हैं जिन पर मैंने काम किया है।",
  viewLiveDemo: "लाइव डेमो देखें",
  viewSourceCode: "सोर्स कोड देखें",
  technologiesUsed: "प्रयुक्त तकनीकें",

  // Skills section
  mySkills: "मेरे कौशल",
  frontendDevelopment: "फ्रंटएंड डेवलपमेंट",
  backendDevelopment: "बैकएंड डेवलपमेंट",
  devOps: "डेवऑप्स",
  tools: "टूल्स",

  // Contact form
  getInTouch: "संपर्क में रहें",
  fullName: "पूरा नाम",
  email: "ईमेल",
  message: "संदेश",
  sendMessage: "संदेश भेजें",
  contactSuccess: "आपके संदेश के लिए धन्यवाद! मैं जल्द ही आपसे संपर्क करूंगा।",

  // About page
  aboutMe: "मेरे बारे में",
  myJourney: "मेरी यात्रा",
  myExperience: "मेरा अनुभव",
  education: "शिक्षा",

  line1: "मेरी यात्रा",
  line2:
    "कंप्यूटर साइंस में स्नातक करने के बाद, मैंने अपना करियर एक सॉफ्टवेयर इंजीनियर के रूप में शुरू किया, साथ ही मैंने अपनी मास्टर्स डिग्री भी पूरी की। कॉर्पोरेट जगत में लगभग दो साल बिताने के बाद, मैंने अंतरराष्ट्रीय स्टार्टअप के साथ रिमोट काम करने का फैसला किया।",
  line3:
    "इस दौरान, मुझे प्रबंधन और उत्पाद विकास के प्रति अपना जुनून मिला, जिससे मैंने अपनी खुद की एजेंसी, Loopxo शुरू की। वहां, मैंने ग्राहकों को MVPs, वेबसाइट और डिजिटल उत्पाद (SAAS) बनाने में मदद की, साथ ही मार्केटिंग प्रोजेक्ट्स भी हाथ में लिए।",
  line4:
    "बाद में, मैंने RBI लाइसेंस प्राप्त करने के बाद श्रीलक्ष्मी फाइनेंस की स्थापना की, जो भारत में एक ऋण व्यवसाय है। Loopxo और श्रीलक्ष्मी फाइनेंस दोनों का प्रबंधन करने से मेरे नेतृत्व, परिचालन और तकनीकी कौशल मजबूत हुए।",
  line5:
    "आज, मैं तकनीकी उत्पादों के निर्माण और अपने वित्तीय व्यवसाय के तकनीकी पहलू के प्रबंधन पर ध्यान केंद्रित करता हूं, जिसमें उद्यमिता, प्रौद्योगिकी और नवाचार का संयोजन है।",

  youTubeChannel: "मेरा यूट्यूब चैनल",
  latestVideos: "मेरे नवीनतम वीडियो देखें",
  subscribe: "सदस्यता लें",
  vlogVideos: "मज़ेदार और व्लॉग वीडियो",
  technicalContent: "तकनीकी सामग्री",
  comingSoon: "जल्द आ रहा है",
  technicalLine:
    "तकनीकी ट्यूटोरियल और कोडिंग वीडियो निर्माणाधीन हैं। नई सामग्री जारी होने पर सूचित किए जाने के लिए मेरे चैनल को सब्सक्राइब करें!",
  getNotified: "सूचित रहें",
};

// German translations
const de: BaseTranslations = {
  // Navigation
  home: "Startseite",
  about: "Über mich",
  services: "Dienstleistungen",
  blog: "Blog",
  contact: "Kontakt",

  // Common actions
  login: "Anmelden",
  register: "Registrieren",
  applyNow: "Jetzt bewerben",
  learnMore: "Mehr erfahren",
  viewAll: "Alle anzeigen",

  // Hero section
  name: "Vijeet Shah",
  post: "Technischer Produktmanager",
  line: "Ideen in wirkungsvolle Produkte verwandeln | Produktführung mit technischer Exzellenz",
  heroTitle: "Willkommen auf Vijeet Shahs Blog",
  heroDescription:
    "Teilen von Ideen, Tutorials und Einblicken über Entwicklung und Technologie.",
  exploreMore: "Mehr entdecken",

  // Blog specific
  blogTitle: "Blog",
  blogDescription: "All meine schriftlichen Inhalte an einem Ort gesammelt",
  featuredPost: "Empfohlener Beitrag",
  allPosts: "Alle Beiträge",
  readMore: "Weiterlesen",
  minRead: "Min. Lesezeit",
  backToBlog: "Zurück zum Blog",
  tableOfContents: "Inhaltsverzeichnis",
  ViewAllPosts: "Alle Beiträge anzeigen",

  // Footer
  footerTagline: "Software-Ingenieur & Pädagoge",
  allRightsReserved: "Alle Rechte vorbehalten.",
  quickLinks: "Schnelllinks",

  // Newsletter
  joinNewsletter: "Abonnieren Sie meinen Newsletter",
  newsletterDescription:
    "Erhalten Sie die neuesten Artikel, Tutorials und Updates direkt in Ihren Posteingang.",
  subscribeButton: "Abonnieren",
  privacyNotice:
    "Ich respektiere Ihre Privatsphäre. Kein Spam, niemals. Jederzeit abmelden.",
    stayUpdated: "Bleiben Sie mit meinem Newsletter auf dem Laufenden",
  subscribed: "Sie haben unseren Newsletter abonniert",
  receiving: "erhält unsere wöchentlichen Updates.",
  subscribeAnother: "Mit einer anderen E-Mail abonnieren",

  // Personal branding
  developer: "Entwickler",
  educator: "Pädagoge",
  personalBio:
    "Vielseitiger Software-Ingenieur, der sich der Bereitstellung hochwertiger und skalierbarer Webanwendungen verschrieben hat.",
  downloadResume: "Lebenslauf herunterladen",
  viewProjects: "Projekte anzeigen",
  connectWithMe: "Verbinden Sie sich mit mir",

  // Blog categories
  webDevelopment: "Webentwicklung",
  javascript: "JavaScript",
  react: "React",
  nextjs: "Next.js",
  typescript: "TypeScript",
  uiux: "UI/UX",
  performance: "Performance",
  careerGrowth: "Karrierewachstum",

  // Topics
  exploreTopics: "Themen erkunden",
  recentArticles: "Neueste Artikel",

  // Project sections
  myProjects: "Meine Projekte",
  projectsDescription:
    "Hier sind einige der Projekte, an denen ich gearbeitet habe.",
  viewLiveDemo: "Live-Demo ansehen",
  viewSourceCode: "Quellcode ansehen",
  technologiesUsed: "Verwendete Technologien",

  // Skills section
  mySkills: "Meine Fähigkeiten",
  frontendDevelopment: "Frontend-Entwicklung",
  backendDevelopment: "Backend-Entwicklung",
  devOps: "DevOps",
  tools: "Werkzeuge",

  // Contact form
  getInTouch: "Kontakt aufnehmen",
  fullName: "Vollständiger Name",
  email: "E-Mail",
  message: "Nachricht",
  sendMessage: "Nachricht senden",
  contactSuccess:
    "Vielen Dank für Ihre Nachricht! Ich werde mich in Kürze bei Ihnen melden.",

  // About page
  aboutMe: "Über mich",
  myJourney: "Mein Werdegang",
  myExperience: "Meine Erfahrung",
  education: "Ausbildung",

  line1: "Mein Werdegang",
  line2:
    "Nach meinem Abschluss in Informatik begann ich meine Karriere als Software-Ingenieur, während ich gleichzeitig meinen Master abschloss. Nach fast zwei Jahren in der Unternehmenswelt wechselte ich zur Remote-Arbeit mit internationalen Startups.",
  line3:
    "Während dieser Zeit entdeckte ich meine Leidenschaft für Management und Produktentwicklung, was mich dazu führte, meine eigene Agentur, Loopxo, zu gründen. Dort half ich Kunden beim Aufbau von MVPs, Websites und digitalen Produkten (SAAS) und übernahm auch Marketingprojekte.",
  line4:
    "Später gründete ich Srilakshmi Finance, ein Kreditunternehmen in Indien, nachdem ich eine RBI-Lizenz erhalten hatte. Die Verwaltung von sowohl Loopxo als auch Srilakshmi Finance stärkte meine Führungs-, Betriebs- und technischen Fähigkeiten.",
  line5:
    "Heute konzentriere ich mich auf die Entwicklung von Technologieprodukten und die Verwaltung der technischen Seite meines Finanzgeschäfts, wobei ich Unternehmertum, Technologie und Innovation kombiniere.",

  youTubeChannel: "Mein YouTube-Kanal",
  latestVideos: "Schauen Sie sich meine neuesten Videos an",
  subscribe: "Abonnieren",
  vlogVideos: "Spaß- und Vlog-Videos",
  technicalContent: "Technische Inhalte",
  comingSoon: "Demnächst",
  technicalLine:
    "Technische Tutorials und Coding-Videos sind in Produktion. Abonnieren Sie meinen Kanal, um benachrichtigt zu werden, wenn neue Inhalte veröffentlicht werden!",
  getNotified: "Benachrichtigt werden",
};

// French translations
const fr: BaseTranslations = {
  // Navigation
  home: "Accueil",
  about: "À propos",
  services: "Services",
  blog: "Blog",
  contact: "Contact",

  // Common actions
  login: "Connexion",
  register: "S'inscrire",
  applyNow: "Postuler maintenant",
  learnMore: "En savoir plus",
  viewAll: "Voir tout",

  // Hero section
  name: "Vijeet Shah",
  post: "Chef de produit technique",
  line: "Transformer des idées en produits percutants | Leadership produit avec excellence en ingénierie",
  heroTitle: "Bienvenue sur le blog de Vijeet Shah",
  heroDescription:
    "Partage d'idées, de tutoriels et d'aperçus sur le développement et la technologie.",
  exploreMore: "Explorer davantage",

  // Blog specific
  blogTitle: "Blog",
  blogDescription: "Tout mon contenu écrit rassemblé en un seul endroit",
  featuredPost: "Article à la une",
  allPosts: "Tous les articles",
  readMore: "Lire la suite",
  minRead: "min de lecture",
  backToBlog: "Retour au blog",
  tableOfContents: "Table des matières",
  ViewAllPosts: "Voir tous les articles",

  // Footer
  footerTagline: "Ingénieur logiciel et éducateur",
  allRightsReserved: "Tous droits réservés.",
  quickLinks: "Liens rapides",

  // Newsletter
  joinNewsletter: "Rejoignez ma newsletter",
  newsletterDescription:
    "Recevez les derniers articles, tutoriels et mises à jour directement dans votre boîte de réception.",
  subscribeButton: "S'abonner",
  privacyNotice:
    "Je respecte votre vie privée. Jamais de spam. Désabonnez-vous à tout moment.",
    stayUpdated: "Restez à jour avec ma newsletter",
  subscribed: "Vous êtes abonné à notre newsletter",
  receiving: "reçoit nos mises à jour hebdomadaires.",
  subscribeAnother: "S'abonner avec une autre adresse e-mail",

  // Personal branding
  developer: "Développeur",
  educator: "Éducateur",
  personalBio:
    "Ingénieur logiciel polyvalent, engagé à fournir des applications web de haute qualité et évolutives.",
  downloadResume: "Télécharger le CV",
  viewProjects: "Voir les projets",
  connectWithMe: "Connectez-vous avec moi",

  // Blog categories
  webDevelopment: "Développement Web",
  javascript: "JavaScript",
  react: "React",
  nextjs: "Next.js",
  typescript: "TypeScript",
  uiux: "UI/UX",
  performance: "Performance",
  careerGrowth: "Évolution de carrière",

  // Topics
  exploreTopics: "Explorer les sujets",
  recentArticles: "Articles récents",

  // Project sections
  myProjects: "Mes projets",
  projectsDescription: "Voici quelques projets sur lesquels j'ai travaillé.",
  viewLiveDemo: "Voir la démo en direct",
  viewSourceCode: "Voir le code source",
  technologiesUsed: "Technologies utilisées",

  // Skills section
  mySkills: "Mes compétences",
  frontendDevelopment: "Développement frontend",
  backendDevelopment: "Développement backend",
  devOps: "DevOps",
  tools: "Outils",

  // Contact form
  getInTouch: "Contactez-moi",
  fullName: "Nom complet",
  email: "Email",
  message: "Message",
  sendMessage: "Envoyer le message",
  contactSuccess: "Merci pour votre message ! Je vous répondrai bientôt.",

  // About page
  aboutMe: "À propos de moi",
  myJourney: "Mon parcours",
  myExperience: "Mon expérience",
  education: "Éducation",

  line1: "Mon Parcours",
  line2:
    "Après avoir obtenu mon diplôme en informatique, j'ai commencé ma carrière en tant qu'ingénieur logiciel tout en terminant mon master. Après près de deux ans dans le monde de l'entreprise, j'ai fait la transition vers le travail à distance avec des startups internationales.",
  line3:
    "Pendant cette période, j'ai découvert ma passion pour la gestion et le développement de produits, ce qui m'a conduit à créer ma propre agence, Loopxo. Là, j'ai aidé des clients à créer des MVP, des sites web et des produits numériques (SAAS), tout en travaillant également sur des projets marketing.",
  line4:
    "Plus tard, j'ai fondé Srilakshmi Finance, une entreprise de prêts en Inde, après avoir obtenu une licence RBI. La gestion simultanée de Loopxo et de Srilakshmi Finance a renforcé mes compétences en leadership, en exploitation et en technique.",
  line5:
    "Aujourd'hui, je me concentre sur la création de produits technologiques et la gestion du côté technique de mon entreprise financière, combinant entrepreneuriat, technologie et innovation.",

  youTubeChannel: "Ma chaîne YouTube",
  latestVideos: "Découvrez mes dernières vidéos",
  subscribe: "S'abonner",
  vlogVideos: "Vidéos amusantes et vlogs",
  technicalContent: "Contenu technique",
  comingSoon: "Bientôt disponible",
  technicalLine:
    "Des tutoriels techniques et des vidéos de codage sont en cours de production. Abonnez-vous à ma chaîne pour être informé lorsque du nouveau contenu est publié!",
  getNotified: "Être notifié",
};

// Spanish translations
const es: BaseTranslations = {
  // Navigation
  home: "Inicio",
  about: "Sobre mí",
  services: "Servicios",
  blog: "Blog",
  contact: "Contacto",

  // Common actions
  login: "Iniciar sesión",
  register: "Registrarse",
  applyNow: "Aplicar ahora",
  learnMore: "Saber más",
  viewAll: "Ver todo",

  // Hero section
  name: "Vijeet Shah",
  post: "Gerente de producto técnico",
  line: "Convertir ideas en productos impactantes | Liderazgo de producto con excelencia en ingeniería",
  heroTitle: "Bienvenido al blog de Vijeet Shah",
  heroDescription:
    "Compartiendo ideas, tutoriales y perspectivas sobre desarrollo y tecnología.",
  exploreMore: "Explorar más",

  // Blog specific
  blogTitle: "Blog",
  blogDescription: "Todo mi contenido escrito recopilado en un solo lugar",
  featuredPost: "Artículo destacado",
  allPosts: "Todos los artículos",
  readMore: "Leer más",
  minRead: "min de lectura",
  backToBlog: "Volver al blog",
  tableOfContents: "Tabla de contenidos",
  ViewAllPosts: "Ver todas las publicaciones",

  // Footer
  footerTagline: "Ingeniero de software y educador",
  allRightsReserved: "Todos los derechos reservados.",
  quickLinks: "Enlaces rápidos",

  // Newsletter
  joinNewsletter: "Únete a mi boletín",
  newsletterDescription:
    "Recibe los últimos artículos, tutoriales y actualizaciones directamente en tu bandeja de entrada.",
  subscribeButton: "Suscribirse",
  privacyNotice:
    "Respeto tu privacidad. Sin spam, nunca. Cancela la suscripción en cualquier momento.",
    stayUpdated: "Mantente actualizado con mi boletín",
  subscribed: "Estás suscrito a nuestro boletín",
  receiving: "está recibiendo nuestras actualizaciones semanales.",
  subscribeAnother: "Suscribirse con otro correo electrónico",

  // Personal branding
  developer: "Desarrollador",
  educator: "Educador",
  personalBio:
    "Ingeniero de software versátil, comprometido con la entrega de aplicaciones web de alta calidad y escalables.",
  downloadResume: "Descargar currículum",
  viewProjects: "Ver proyectos",
  connectWithMe: "Conecta conmigo",

  // Blog categories
  webDevelopment: "Desarrollo Web",
  javascript: "JavaScript",
  react: "React",
  nextjs: "Next.js",
  typescript: "TypeScript",
  uiux: "UI/UX",
  performance: "Rendimiento",
  careerGrowth: "Crecimiento profesional",

  // Topics
  exploreTopics: "Explorar temas",
  recentArticles: "Artículos recientes",

  // Project sections
  myProjects: "Mis proyectos",
  projectsDescription:
    "Aquí hay algunos de los proyectos en los que he trabajado.",
  viewLiveDemo: "Ver demostración en vivo",
  viewSourceCode: "Ver código fuente",
  technologiesUsed: "Tecnologías utilizadas",

  // Skills section
  mySkills: "Mis habilidades",
  frontendDevelopment: "Desarrollo frontend",
  backendDevelopment: "Desarrollo backend",
  devOps: "DevOps",
  tools: "Herramientas",

  // Contact form
  getInTouch: "Ponte en contacto",
  fullName: "Nombre completo",
  email: "Correo electrónico",
  message: "Mensaje",
  sendMessage: "Enviar mensaje",
  contactSuccess:
    "¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.",

  // About page
  aboutMe: "Sobre mí",
  myJourney: "Mi trayectoria",
  myExperience: "Mi experiencia",
  education: "Educación",

  line1: "Mi Trayectoria",
  line2:
    "Después de graduarme en Informática, comencé mi carrera como Ingeniero de Software mientras completaba mi maestría. Tras casi dos años en el mundo corporativo, hice la transición a trabajar de forma remota con startups internacionales.",
  line3:
    "Durante este tiempo, descubrí mi pasión por la gestión y el desarrollo de productos, lo que me llevó a iniciar mi propia agencia, Loopxo. Allí, ayudé a clientes a construir MVPs, sitios web y productos digitales (SAAS), mientras también asumía proyectos de marketing.",
  line4:
    "Más tarde, fundé Srilakshmi Finance, un negocio de préstamos en India, después de obtener una licencia del RBI. Gestionar tanto Loopxo como Srilakshmi Finance fortaleció mis habilidades de liderazgo, operativas y técnicas.",
  line5:
    "Hoy, me enfoco en desarrollar productos tecnológicos y gestionar el lado técnico de mi negocio financiero, combinando emprendimiento, tecnología e innovación.",

  youTubeChannel: "Mi canal de YouTube",
  latestVideos: "Mira mis videos más recientes",
  subscribe: "Suscribirse",
  vlogVideos: "Videos divertidos y vlogs",
  technicalContent: "Contenido técnico",
  comingSoon: "Próximamente",
  technicalLine:
    "Los tutoriales técnicos y videos de codificación están en producción. ¡Suscríbete a mi canal para recibir notificaciones cuando se publique nuevo contenido!",
  getNotified: "Recibir notificaciones",
};

// Chinese translations
const zh: BaseTranslations = {
  // Navigation
  home: "首页",
  about: "关于我",
  services: "服务",
  blog: "博客",
  contact: "联系",

  // Common actions
  login: "登录",
  register: "注册",
  applyNow: "立即申请",
  learnMore: "了解更多",
  viewAll: "查看全部",

  // Hero section
  name: "Vijeet Shah",
  post: "技术产品经理",
  line: "将创意转化为有影响力的产品 | 具有工程卓越性的产品领导力",
  heroTitle: "欢迎来到Vijeet Shah的博客",
  heroDescription: "分享关于开发和技术的想法、教程和见解。",
  exploreMore: "探索更多",

  // Blog specific
  blogTitle: "博客",
  blogDescription: "我所有的书面内容都集中在一个地方",
  featuredPost: "精选文章",
  allPosts: "所有文章",
  readMore: "阅读更多",
  minRead: "分钟阅读",
  backToBlog: "返回博客",
  tableOfContents: "目录",
  ViewAllPosts: "查看所有帖子",

  // Footer
  footerTagline: "软件工程师和教育者",
  allRightsReserved: "版权所有。",
  quickLinks: "快速链接",

  // Newsletter
  joinNewsletter: "订阅我的通讯",
  newsletterDescription: "获取最新文章、教程和更新直接发送到您的收件箱。",
  subscribeButton: "订阅",
  privacyNotice: "我尊重您的隐私。绝不发送垃圾邮件。随时可以取消订阅。",
  stayUpdated: "订阅我的通讯以获取最新消息",
  subscribed: "您已订阅我们的通讯",
  receiving: "正在接收我们的每周更新。",
  subscribeAnother: "使用其他电子邮箱订阅",

  // Personal branding
  developer: "开发者",
  educator: "教育者",
  personalBio: "多才多艺的软件工程师，致力于提供高质量和可扩展的网络应用程序。",
  downloadResume: "下载简历",
  viewProjects: "查看项目",
  connectWithMe: "与我联系",

  // Blog categories
  webDevelopment: "网页开发",
  javascript: "JavaScript",
  react: "React",
  nextjs: "Next.js",
  typescript: "TypeScript",
  uiux: "UI/UX",
  performance: "性能优化",
  careerGrowth: "职业发展",

  // Topics
  exploreTopics: "探索主题",
  recentArticles: "近期文章",

  // Project sections
  myProjects: "我的项目",
  projectsDescription: "这里是我参与过的一些项目。",
  viewLiveDemo: "查看在线演示",
  viewSourceCode: "查看源代码",
  technologiesUsed: "使用的技术",

  // Skills section
  mySkills: "我的技能",
  frontendDevelopment: "前端开发",
  backendDevelopment: "后端开发",
  devOps: "DevOps",
  tools: "工具",

  // Contact form
  getInTouch: "联系我",
  fullName: "全名",
  email: "电子邮件",
  message: "消息",
  sendMessage: "发送消息",
  contactSuccess: "感谢您的留言！我会尽快回复您。",

  // About page
  aboutMe: "关于我",
  myJourney: "我的旅程",
  myExperience: "我的经验",
  education: "教育背景",

  line1: "我的历程",
  line2:
    "在计算机科学专业毕业后，我开始了软件工程师的职业生涯，同时完成了硕士学位。在企业界工作近两年后，我转向与国际初创公司远程合作。",
  line3:
    "在此期间，我发现了自己对管理和产品开发的热情，这促使我创办了自己的代理公司 Loopxo。在那里，我帮助客户构建最小可行产品(MVP)、网站和数字产品(SAAS)，同时也承担营销项目。",
  line4:
    "之后，我在获得印度储备银行(RBI)许可证后创立了 Srilakshmi Finance，这是一家在印度的贷款业务。同时管理 Loopxo 和 Srilakshmi Finance 加强了我的领导能力、运营能力和技术技能。",
  line5:
    "如今，我专注于构建技术产品和管理我的金融业务的技术方面，将创业精神、技术和创新结合起来。",

  youTubeChannel: "我的YouTube频道",
  latestVideos: "查看我的最新视频",
  subscribe: "订阅",
  vlogVideos: "有趣和视频博客",
  technicalContent: "技术内容",
  comingSoon: "即将推出",
  technicalLine:
    "技术教程和编程视频正在制作中。订阅我的频道，以便在发布新内容时收到通知！",
  getNotified: "获取通知",
};

// Export the dictionary with all supported languages
export const dictionary: TranslationDictionary<BaseTranslations> = {
  en,
  hi,
  de,
  fr,
  es,
  zh,
};

// Export language names for the language selector
export const languageNames: Record<string, string> = {
  en: "English",
  hi: "हिन्दी",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  zh: "中文",
};
