
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
  
  // Footer
  footerTagline: string;
  allRightsReserved: string;
  quickLinks: string;
  
  // Newsletter
  joinNewsletter: string;
  newsletterDescription: string;
  subscribeButton: string;
  privacyNotice: string;
  
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
  heroTitle: "Vijeet Shah's Blog",
  heroDescription: "Sharing ideas, tutorials, and insights about development and technology.",
  exploreMore: "Explore More",
  
  // Blog specific
  blogTitle: "Blog",
  blogDescription: "Latest articles and updates",
  featuredPost: "Featured Post",
  allPosts: "All Posts",
  readMore: "Read More",
  minRead: "min read",
  backToBlog: "Back to Blog",
  tableOfContents: "Table of Contents",
  
  // Footer
  footerTagline: "Software Engineer & Educator",
  allRightsReserved: "All rights reserved.",
  quickLinks: "Quick Links",
  
  // Newsletter
  joinNewsletter: "Join My Newsletter",
  newsletterDescription: "Get the latest articles, tutorials, and updates delivered to your inbox.",
  subscribeButton: "Subscribe",
  privacyNotice: "I respect your privacy. No spam, ever. Unsubscribe anytime.",
  
  // Personal branding
  developer: "Developer",
  educator: "Educator",
  personalBio: "Versatile software engineer, committed to delivering high-quality and scalable web applications.",
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
  heroTitle: "विजीत शाह के ब्लॉग में आपका स्वागत है",
  heroDescription: "विकास और प्रौद्योगिकी के बारे में विचार, ट्यूटोरियल और अंतर्दृष्टि साझा करना।",
  exploreMore: "और एक्सप्लोर करें",
  
  // Blog specific
  blogTitle: "ब्लॉग",
  blogDescription: "नवीनतम लेख और अपडेट",
  featuredPost: "विशेष पोस्ट",
  allPosts: "सभी पोस्ट",
  readMore: "और पढ़ें",
  minRead: "मिनट का पठन",
  backToBlog: "ब्लॉग पर वापस जाएं",
  tableOfContents: "विषय-सूची",
  
  // Footer
  footerTagline: "सॉफ्टवेयर इंजीनियर और शिक्षक",
  allRightsReserved: "सर्वाधिकार सुरक्षित।",
  quickLinks: "त्वरित लिंक",

  // Newsletter
  joinNewsletter: "मेरे न्यूज़लेटर में शामिल हों",
  newsletterDescription: "नवीनतम लेख, ट्यूटोरियल और अपडेट अपने इनबॉक्स में प्राप्त करें।",
  subscribeButton: "सब्सक्राइब",
  privacyNotice: "मैं आपकी गोपनीयता का सम्मान करता हूं। कोई स्पैम नहीं, कभी भी। किसी भी समय अनसब्सक्राइब करें।",
  
  // Personal branding
  developer: "डेवलपर",
  educator: "शिक्षक",
  personalBio: "बहुमुखी सॉफ्टवेयर इंजीनियर, उच्च गुणवत्ता और स्केलेबल वेब एप्लिकेशन देने के लिए प्रतिबद्ध।",
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
  heroTitle: "Willkommen auf Vijeet Shahs Blog",
  heroDescription: "Teilen von Ideen, Tutorials und Einblicken über Entwicklung und Technologie.",
  exploreMore: "Mehr entdecken",
  
  // Blog specific
  blogTitle: "Blog",
  blogDescription: "Neueste Artikel und Updates",
  featuredPost: "Empfohlener Beitrag",
  allPosts: "Alle Beiträge",
  readMore: "Weiterlesen",
  minRead: "Min. Lesezeit",
  backToBlog: "Zurück zum Blog",
  tableOfContents: "Inhaltsverzeichnis",
  
  // Footer
  footerTagline: "Software-Ingenieur & Pädagoge",
  allRightsReserved: "Alle Rechte vorbehalten.",
  quickLinks: "Schnelllinks",
  
  // Newsletter
  joinNewsletter: "Abonnieren Sie meinen Newsletter",
  newsletterDescription: "Erhalten Sie die neuesten Artikel, Tutorials und Updates direkt in Ihren Posteingang.",
  subscribeButton: "Abonnieren",
  privacyNotice: "Ich respektiere Ihre Privatsphäre. Kein Spam, niemals. Jederzeit abmelden.",
  
  // Personal branding
  developer: "Entwickler",
  educator: "Pädagoge",
  personalBio: "Vielseitiger Software-Ingenieur, der sich der Bereitstellung hochwertiger und skalierbarer Webanwendungen verschrieben hat.",
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
  projectsDescription: "Hier sind einige der Projekte, an denen ich gearbeitet habe.",
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
  contactSuccess: "Vielen Dank für Ihre Nachricht! Ich werde mich in Kürze bei Ihnen melden.",
  
  // About page
  aboutMe: "Über mich",
  myJourney: "Mein Werdegang",
  myExperience: "Meine Erfahrung",
  education: "Ausbildung",
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
  heroTitle: "Bienvenue sur le blog de Vijeet Shah",
  heroDescription: "Partage d'idées, de tutoriels et d'aperçus sur le développement et la technologie.",
  exploreMore: "Explorer davantage",
  
  // Blog specific
  blogTitle: "Blog",
  blogDescription: "Derniers articles et mises à jour",
  featuredPost: "Article à la une",
  allPosts: "Tous les articles",
  readMore: "Lire la suite",
  minRead: "min de lecture",
  backToBlog: "Retour au blog",
  tableOfContents: "Table des matières",
  
  // Footer
  footerTagline: "Ingénieur logiciel et éducateur",
  allRightsReserved: "Tous droits réservés.",
  quickLinks: "Liens rapides",
  
  // Newsletter
  joinNewsletter: "Rejoignez ma newsletter",
  newsletterDescription: "Recevez les derniers articles, tutoriels et mises à jour directement dans votre boîte de réception.",
  subscribeButton: "S'abonner",
  privacyNotice: "Je respecte votre vie privée. Jamais de spam. Désabonnez-vous à tout moment.",
  
  // Personal branding
  developer: "Développeur",
  educator: "Éducateur",
  personalBio: "Ingénieur logiciel polyvalent, engagé à fournir des applications web de haute qualité et évolutives.",
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
  heroTitle: "Bienvenido al blog de Vijeet Shah",
  heroDescription: "Compartiendo ideas, tutoriales y perspectivas sobre desarrollo y tecnología.",
  exploreMore: "Explorar más",
  
  // Blog specific
  blogTitle: "Blog",
  blogDescription: "Últimos artículos y actualizaciones",
  featuredPost: "Artículo destacado",
  allPosts: "Todos los artículos",
  readMore: "Leer más",
  minRead: "min de lectura",
  backToBlog: "Volver al blog",
  tableOfContents: "Tabla de contenidos",
  
  // Footer
  footerTagline: "Ingeniero de software y educador",
  allRightsReserved: "Todos los derechos reservados.",
  quickLinks: "Enlaces rápidos",
  
  // Newsletter
  joinNewsletter: "Únete a mi boletín",
  newsletterDescription: "Recibe los últimos artículos, tutoriales y actualizaciones directamente en tu bandeja de entrada.",
  subscribeButton: "Suscribirse",
  privacyNotice: "Respeto tu privacidad. Sin spam, nunca. Cancela la suscripción en cualquier momento.",
  
  // Personal branding
  developer: "Desarrollador",
  educator: "Educador",
  personalBio: "Ingeniero de software versátil, comprometido con la entrega de aplicaciones web de alta calidad y escalables.",
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
  projectsDescription: "Aquí hay algunos de los proyectos en los que he trabajado.",
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
  contactSuccess: "¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.",
  
  // About page
  aboutMe: "Sobre mí",
  myJourney: "Mi trayectoria",
  myExperience: "Mi experiencia",
  education: "Educación",
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
  heroTitle: "欢迎来到Vijeet Shah的博客",
  heroDescription: "分享关于开发和技术的想法、教程和见解。",
  exploreMore: "探索更多",
  
  // Blog specific
  blogTitle: "博客",
  blogDescription: "最新文章和更新",
  featuredPost: "精选文章",
  allPosts: "所有文章",
  readMore: "阅读更多",
  minRead: "分钟阅读",
  backToBlog: "返回博客",
  tableOfContents: "目录",
  
  // Footer
  footerTagline: "软件工程师和教育者",
  allRightsReserved: "版权所有。",
  quickLinks: "快速链接",
  
  // Newsletter
  joinNewsletter: "订阅我的通讯",
  newsletterDescription: "获取最新文章、教程和更新直接发送到您的收件箱。",
  subscribeButton: "订阅",
  privacyNotice: "我尊重您的隐私。绝不发送垃圾邮件。随时可以取消订阅。",
  
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
};

// Export the dictionary with all supported languages
export const dictionary: TranslationDictionary<BaseTranslations> = {
  en,
  hi,
  de,
  fr,
  es,
  zh
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