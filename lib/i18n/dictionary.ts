// Define the type for translation dictionaries
export type TranslationDictionary<T extends Record<string, string>> = {
  [language: string]: T;
};

// The base type that all language dictionaries must follow
export type BaseTranslations = {
  // Hero Section
  home: string;
  digitalInnovation: string;
  digitalSolutions: string;
  thatDriveGrowth: string;
  yourVisionBuilt: string;
  deliveringResults: string;
  partneringWith: string;
  clientSupport: string;
  getStarted: string;
  viewOurWork: string;
  transformingBusinesses: string;
  latestProjectGrowth: string;
  projects: string;
  clients: string;
  caseStudies: string;
  ourCoreValues: string;
  valuesDescription: string;
  integrity: string;
  integrityDescription: string;
  collaboration: string;
  collaborationDescription: string;
  reliability: string;
  reliabilityDescription: string;
  innovation: string;
  innovationDescription: string;
  uiUxDesign: string;
  uiUxDesignDescription: string;
  mobileApps: string;
  mobileAppsDescription: string;
  backendDevelopment: string;
  backendDevelopmentDescription: string;
  frontendDevelopment: string;
  frontendDevelopmentDescription: string;
  artificialIntelligence: string;
  artificialIntelligenceDescription: string;
  dataScience: string;
  dataScienceDescription: string;
  cloudDevOps: string;
  cloudDevOpsDescription: string;

  getStartedWithUs: string;
  readyToGetStarted: string;
  joinThousandsOfSatisfiedCustomersToday: string;
  contactUs: string;
  getInTouch: string;
  letsStartAConversation: string;
  wantToWorkTogether: string;
  trustedByClients: string;
  responseTime: string;
  freeConsultation: string;
  sendAMessage: string;
  willGetBack: string;
  yourName: string;
  vijeetShah: string;
  emailAddress: string;
  yourEmail: string;
  yourMessage: string;
  weCanHelpYou: string;
  sendMessage: string;
  creatingInnovativeDigitalSolutions: string;

  [key: string]: string;
};

// English translations
const en: BaseTranslations = {
  home: "Home",
  digitalInnovation: "Digital Innovation",
  digitalSolutions: "Digital Solutions",
  thatDriveGrowth: "That Drive Growth",
  yourVisionBuilt:
    "Your Vision, Validated and Built. We partner to efficiently develop your concepts into impactful digital solutions, delivering tangible results fast.",
  deliveringResults: "Delivering Proven Results",
  partneringWith: "Partnering with 100+ Visionaries",
  clientSupport: "Dedicated 5-Star Client Support",
  getStarted: "Get Started",
  viewOurWork: "View Our Work",
  transformingBusinesses: "Transforming Businesses",
  latestProjectGrowth: "Our latest project delivered 40% growth",
  projects: "Projects",
  clients: "Clients",
  caseStudies: "Case Studies",
  ourCoreValues: "Our Core Values",
  valuesDescription:
    "At the heart of our organization lies a set of unwavering principles that define who we are and guide every decision we make. These values aren't merely words on a wall—they're the DNA of our success, the promise we uphold with every client interaction, and the foundation upon which we build lasting partnerships.",
  integrity: "Integrity",
  integrityDescription:
    "Transparency and ethical excellence form the cornerstone of our identity. We operate with unwavering moral standards, fostering deep trust through authentic communication, complete accountability, and honest dealings in every interaction.",
  collaboration: "Collaboration",
  collaborationDescription:
    "Our greatest triumphs emerge from the synergy of collective brilliance. We cultivate an environment where diverse perspectives converge, knowledge flows freely, and individual strengths unite to create extraordinary outcomes that exceed expectations.",
  reliability: "Reliability",
  reliabilityDescription:
    "Consistency is our signature. We deliver unwavering performance, maintaining the highest standards of dependability. Our commitment to reliability means you can confidently rely on us to exceed expectations, every single time.",
  innovation: "Innovation",
  innovationDescription:
    "We are pioneers in an ever-evolving landscape, continuously pushing boundaries to redefine what's possible. Our relentless pursuit of innovation drives us to anticipate tomorrow's challenges and deliver cutting-edge solutions that transform industries.",
  uiUxDesign: "UI/UX Design",
  uiUxDesignDescription:
    "We focus on creating attractive and user-friendly interfaces that significantly boost engagement and user satisfaction. By emphasizing intuitive design elements, we create experiences that keep users connected.",
  mobileApps: "Mobile Apps",
  mobileAppsDescription:
    "We specialize in developing innovative and user-friendly mobile applications for both iOS and Android platforms. Our process covers every stage from ideation and design to final deployment.",
  backendDevelopment: "Backend Development",
  backendDevelopmentDescription:
    "We offer responsive, secure, and user-centric web solutions to elevate your online presence. Our approach ensures your website aligns with modern standards and supports business growth.",
  frontendDevelopment: "Frontend Development",
  frontendDevelopmentDescription:
    "We deliver expertly crafted website designs that blend aesthetics with functionality. Our designs prioritize user experience and intuitive navigation.",
  artificialIntelligence: "Artificial Intelligence",
  artificialIntelligenceDescription:
    "We harness the power of AI to connect information and convert data into actionable insights, helping organizations make strategic decisions with precision.",
  dataScience: "Data Science & Analytics",
  dataScienceDescription:
    "We specialize in uncovering hidden stories in your data using advanced visualizations, actionable insights, and precise forecasting to empower strategic decisions.",
  cloudDevOps: "Managed Cloud & DevOps",
  cloudDevOpsDescription:
    "We optimize your cloud infrastructure and streamline operations through managed cloud and DevOps services. Our approach integrates automation, continuous monitoring, and agile practices.",
      getStartedWithUs: "Get Started With Us",
      readyToGetStarted: "Ready to Get Started?",
      joinThousandsOfSatisfiedCustomersToday: "Join thousands of satisfied customers today.",
      contactUs: "Contact Us",
      getInTouch: "Get In Touch",
      letsStartAConversation: "Let's Start a Conversation",
      wantToWorkTogether: "Have a question or want to work together? We'd love to hear from you. Reach out through any of the methods below.",
      trustedByClients: "Trusted by 500+ clients",
      responseTime: "24h response time",
      freeConsultation: "Free consultation",
      sendAMessage: "Send a Message",
      willGetBack: "Fill out the form below and we'll get back to you within 24 hours.",
      yourName: "Your Name",
      vijeetShah: "Vijeet Shah",
      emailAddress: "Email Address",
      yourEmail: "your@email.com",
      yourMessage: "Your Message",
      weCanHelpYou: "Tell us about your project or how we can help you...",
      sendMessage: "Send Message",
      creatingInnovativeDigitalSolutions: "We specialize in creating innovative digital solutions that drive business growth. Our team of experts is dedicated to delivering exceptional results that exceed expectations."
    
};

const hi: BaseTranslations = {
  home: "होम",
  digitalInnovation: "डिजिटल नवाचार",
  digitalSolutions: "डिजिटल समाधान",
  thatDriveGrowth: "जो विकास को आगे बढ़ाते हैं",
  yourVisionBuilt:
    "आपकी दृष्टि, मान्य और निर्मित। हम आपके विचारों को प्रभावशाली डिजिटल समाधानों में कुशलता से विकसित करने के लिए साझेदारी करते हैं, जो तेज़ी से ठोस परिणाम प्रदान करते हैं।",
  deliveringResults: "सिद्ध परिणाम प्रदान करना",
  partneringWith: "100+ दूरदर्शियों के साथ साझेदारी",
  clientSupport: "समर्पित 5-स्टार क्लाइंट समर्थन",
  getStarted: "शुरू करें",
  viewOurWork: "हमारा कार्य देखें",
  transformingBusinesses: "व्यवसायों का रूपांतरण",
  latestProjectGrowth: "हमारे नवीनतम प्रोजेक्ट ने 40% वृद्धि प्रदान की",
  projects: "प्रोजेक्ट्स",
  clients: "क्लाइंट्स",
  caseStudies: "मामले का अध्ययन",
  ourCoreValues: "हमारे मूल मूल्य",
  valuesDescription:
    "हमारे संगठन के केंद्र में ऐसी अटल सिद्धांतों की एक श्रृंखला है जो यह परिभाषित करती है कि हम कौन हैं और प्रत्येक निर्णय को मार्गदर्शन करती है। ये मूल्य केवल दीवार पर लिखे शब्द नहीं हैं—वे हमारी सफलता की डीएनए हैं, हर क्लाइंट बातचीत में हम जो वादा निभाते हैं, और दीर्घकालिक साझेदारियों की नींव हैं।",
  integrity: "ईमानदारी",
  integrityDescription:
    "पारदर्शिता और नैतिक उत्कृष्टता हमारी पहचान का आधार हैं। हम अडिग नैतिक मानकों के साथ कार्य करते हैं, हर बातचीत में प्रामाणिक संचार, पूर्ण जवाबदेही और ईमानदार व्यवहार के माध्यम से गहरी विश्वास पैदा करते हैं।",
  collaboration: "सहयोग",
  collaborationDescription:
    "हमारी सबसे बड़ी सफलताएँ सामूहिक प्रतिभा की समन्वय से उत्पन्न होती हैं। हम एक ऐसा वातावरण तैयार करते हैं जहाँ विविध दृष्टिकोण एकत्रित होते हैं, ज्ञान स्वतंत्र रूप से प्रवाहित होता है, और व्यक्तिगत ताकतें मिलकर असाधारण परिणाम उत्पन्न करती हैं जो अपेक्षाओं से परे जाते हैं।",
  reliability: "विश्वसनीयता",
  reliabilityDescription:
    "संगति हमारी पहचान है। हम अडिग प्रदर्शन प्रदान करते हैं, उच्चतम विश्वसनीयता मानकों को बनाए रखते हैं। हमारी प्रतिबद्धता विश्वसनीयता के लिए है, जिससे आप हर बार हम पर पूरी तरह भरोसा कर सकते हैं।",
  innovation: "नवाचार",
  innovationDescription:
    "हम निरंतर विकसित हो रहे परिदृश्य में अग्रणी हैं, लगातार संभावनाओं की सीमाओं को पार करते हैं। नवाचार की हमारी सतत खोज हमें आने वाली चुनौतियों की भविष्यवाणी करने और अत्याधुनिक समाधान प्रदान करने के लिए प्रेरित करती है जो उद्योगों को रूपांतरित करते हैं।",
  uiUxDesign: "यूआई-यूएक्स डिज़ाइन",
  uiUxDesignDescription:
    "हम आकर्षक और उपयोगकर्ता-अनुकूल इंटरफेस बनाने पर ध्यान केंद्रित करते हैं जो जुड़ाव और उपयोगकर्ता संतुष्टि को काफी बढ़ाते हैं। सहज डिज़ाइन तत्वों पर ध्यान केंद्रित करके, हम ऐसे अनुभव बनाते हैं जो उपयोगकर्ताओं को जोड़े रखते हैं।",

  mobileApps: "मोबाइल ऐप्स",
  mobileAppsDescription:
    "हम iOS और Android दोनों प्लेटफार्मों के लिए नवाचारी और उपयोगकर्ता-अनुकूल मोबाइल एप्लिकेशन के विकास में विशेषज्ञ हैं। हमारी प्रक्रिया विचार, डिज़ाइन से लेकर अंतिम डिप्लॉयमेंट तक हर चरण को शामिल करती है।",

  backendDevelopment: "बैकएंड डेवलपमेंट",
  backendDevelopmentDescription:
    "हम आपकी ऑनलाइन उपस्थिति को बेहतर बनाने के लिए प्रतिक्रियाशील, सुरक्षित और उपयोगकर्ता-अनुकूल वेब समाधान प्रदान करते हैं। हमारा दृष्टिकोण आपकी वेबसाइट को आधुनिक मानकों के अनुरूप बनाने और व्यवसायिक वृद्धि को बढ़ावा देने पर केंद्रित है।",

  frontendDevelopment: "फ्रंटएंड डेवलपमेंट",
  frontendDevelopmentDescription:
    "हम सौंदर्यशास्त्र और कार्यक्षमता का संयोजन करते हुए विशेषज्ञता से तैयार की गई वेबसाइट डिज़ाइन प्रदान करते हैं। हमारे डिज़ाइन उपयोगकर्ता अनुभव और सहज नेविगेशन को प्राथमिकता देते हैं।",

  artificialIntelligence: "कृत्रिम बुद्धिमत्ता",
  artificialIntelligenceDescription:
    "हम एआई की शक्ति का उपयोग करके जानकारी को जोड़ने और डेटा को कार्रवाई योग्य अंतर्दृष्टियों में बदलने पर ध्यान केंद्रित करते हैं। इससे संगठनों को सटीकता के साथ रणनीतिक निर्णय लेने में मदद मिलती है।",

  dataScience: "डेटा विश्लेषण और डेटा साइंस",
  dataScienceDescription:
    "हम उन्नत विज़ुअलाइज़ेशन, कार्रवाई योग्य अंतर्दृष्टियों और सटीक पूर्वानुमान का उपयोग करके आपके डेटा में छिपी कहानियों को उजागर करने में माहिर हैं, जिससे रणनीतिक निर्णयों को सशक्त बनाया जा सके।",

  cloudDevOps: "मैनेज्ड क्लाउड और देवऑप्स",
  cloudDevOpsDescription:
    "हम मैनेज्ड क्लाउड और देवऑप्स सेवाओं के माध्यम से आपके क्लाउड इन्फ्रास्ट्रक्चर को अनुकूलित करने और संचालन को सुव्यवस्थित करने में विशेषज्ञ हैं। हमारा दृष्टिकोण स्वचालन, सतत निगरानी और एगाइल पद्धतियों को एकीकृत करता है।",

    getStartedWithUs: "हमारे साथ शुरू करें",
  readyToGetStarted: "क्या आप शुरू करने के लिए तैयार हैं?",
  joinThousandsOfSatisfiedCustomersToday: "आज ही हजारों संतुष्ट ग्राहकों से जुड़ें।",
  contactUs: "हमसे संपर्क करें",
  getInTouch: "संपर्क करें",
  letsStartAConversation: "चलिए बात शुरू करते हैं",
  wantToWorkTogether: "कोई सवाल है या साथ काम करना चाहते हैं? हम आपसे सुनना पसंद करेंगे। नीचे दिए गए किसी भी माध्यम से हमसे जुड़ें।",
  trustedByClients: "500+ ग्राहकों द्वारा भरोसेमंद",
  responseTime: "24 घंटे में जवाब",
  freeConsultation: "नि:शुल्क परामर्श",
  sendAMessage: "संदेश भेजें",
  willGetBack: "नीचे दिए गए फॉर्म को भरें और हम 24 घंटे के भीतर आपसे संपर्क करेंगे।",
  yourName: "आपका नाम",
  vijeetShah: "विजीत शाह",
  emailAddress: "ईमेल पता",
  yourEmail: "your@email.com",
  yourMessage: "आपका संदेश",
  weCanHelpYou: "अपने प्रोजेक्ट के बारे में बताएं या हम आपकी कैसे मदद कर सकते हैं...",
  sendMessage: "संदेश भेजें",
  creatingInnovativeDigitalSolutions: "हम अभिनव डिजिटल समाधान बनाने में विशेषज्ञ हैं जो व्यापारिक विकास को बढ़ावा देते हैं। हमारी विशेषज्ञ टीम असाधारण परिणाम देने के लिए समर्पित है जो आपकी अपेक्षाओं से अधिक हों।"
};

const de: BaseTranslations = {
  home: "Startseite",
  digitalInnovation: "Digitale Innovation",
  digitalSolutions: "Digitale Lösungen",
  thatDriveGrowth: "Die Wachstum fördern",
  yourVisionBuilt:
    "Ihre Vision, validiert und umgesetzt. Wir arbeiten partnerschaftlich zusammen, um Ihre Konzepte effizient in wirkungsvolle digitale Lösungen umzusetzen und schnell greifbare Ergebnisse zu liefern.",
  deliveringResults: "Erzielte Ergebnisse",
  partneringWith: "Partnerschaft mit über 100 Visionären",
  clientSupport: "Engagierter 5-Sterne-Kundensupport",
  getStarted: "Loslegen",
  viewOurWork: "Unsere Arbeit ansehen",
  transformingBusinesses: "Unternehmen transformieren",
  latestProjectGrowth: "Unser letztes Projekt erzielte ein Wachstum von 40%",
  projects: "Projekte",
  clients: "Kunden",
  caseStudies: "Fallstudien",
  ourCoreValues: "Unsere Grundwerte",
  valuesDescription:
    "Im Herzen unserer Organisation liegt ein unverrückbares Wertesystem, das uns definiert und jede Entscheidung leitet. Diese Werte sind nicht nur Worte an der Wand – sie sind die DNA unseres Erfolgs, das Versprechen, das wir bei jeder Kundeninteraktion einhalten, und das Fundament, auf dem wir dauerhafte Partnerschaften aufbauen.",
  integrity: "Integrität",
  integrityDescription:
    "Transparenz und ethische Exzellenz sind das Fundament unserer Identität. Wir handeln mit festen moralischen Standards und fördern durch authentische Kommunikation, vollständige Verantwortlichkeit und ehrliches Handeln tiefes Vertrauen.",
  collaboration: "Zusammenarbeit",
  collaborationDescription:
    "Unsere größten Erfolge entstehen aus der Synergie kollektiver Brillanz. Wir fördern ein Umfeld, in dem vielfältige Perspektiven zusammenkommen, Wissen frei fließt und individuelle Stärken sich zu außergewöhnlichen Ergebnissen vereinen, die Erwartungen übertreffen.",
  reliability: "Zuverlässigkeit",
  reliabilityDescription:
    "Beständigkeit ist unser Markenzeichen. Wir liefern konstante Leistung und halten die höchsten Standards an Verlässlichkeit ein. Unsere Zuverlässigkeit gibt Ihnen das Vertrauen, sich bei jedem Projekt auf uns verlassen zu können.",
  innovation: "Innovation",
  innovationDescription:
    "Wir sind Pioniere in einem sich ständig wandelnden Umfeld und überschreiten kontinuierlich Grenzen, um das Mögliche neu zu definieren. Unser Innovationsgeist treibt uns an, zukünftige Herausforderungen vorherzusehen und bahnbrechende Lösungen zu liefern, die Branchen transformieren.",
  uiUxDesign: "UI/UX-Design",
  uiUxDesignDescription:
    "Wir konzentrieren uns auf die Erstellung attraktiver und benutzerfreundlicher Oberflächen, die Engagement und Benutzerzufriedenheit erheblich steigern. Durch intuitive Designelemente schaffen wir Erlebnisse, die Nutzer binden.",

  mobileApps: "Mobile Apps",
  mobileAppsDescription:
    "Wir sind auf die Entwicklung innovativer und benutzerfreundlicher mobiler Anwendungen für iOS- und Android-Plattformen spezialisiert. Unser Prozess umfasst alle Phasen von der Idee über das Design bis hin zur finalen Bereitstellung.",

  backendDevelopment: "Backend-Entwicklung",
  backendDevelopmentDescription:
    "Wir bieten reaktionsfähige, sichere und benutzerzentrierte Weblösungen zur Verbesserung Ihrer Online-Präsenz. Unser Ansatz richtet sich nach modernen Standards und fördert das Unternehmenswachstum.",

  frontendDevelopment: "Frontend-Entwicklung",
  frontendDevelopmentDescription:
    "Wir liefern fachmännisch gestaltete Webseiten, die Ästhetik und Funktionalität vereinen. Unsere Designs legen Wert auf Benutzererfahrung und intuitive Navigation.",

  artificialIntelligence: "Künstliche Intelligenz",
  artificialIntelligenceDescription:
    "Wir nutzen die Kraft der KI, um Informationen zu verknüpfen und Daten in umsetzbare Erkenntnisse zu verwandeln, damit Organisationen präzise strategische Entscheidungen treffen können.",

  dataScience: "Datenwissenschaft & Analyse",
  dataScienceDescription:
    "Wir decken mit fortschrittlichen Visualisierungen, umsetzbaren Erkenntnissen und präzisen Prognosen verborgene Geschichten in Ihren Daten auf, um strategische Entscheidungen zu stärken.",

  cloudDevOps: "Managed Cloud & DevOps",
  cloudDevOpsDescription:
    "Wir optimieren Ihre Cloud-Infrastruktur und vereinfachen Abläufe durch verwaltete Cloud- und DevOps-Dienste. Unser Ansatz integriert Automatisierung, kontinuierliche Überwachung und agile Methoden.",

    getStartedWithUs: "Starten Sie mit uns",
  readyToGetStarted: "Bereit loszulegen?",
  joinThousandsOfSatisfiedCustomersToday: "Schließen Sie sich noch heute tausenden zufriedenen Kunden an.",
  contactUs: "Kontaktieren Sie uns",
  getInTouch: "Kontakt aufnehmen",
  letsStartAConversation: "Lassen Sie uns ein Gespräch beginnen",
  wantToWorkTogether: "Haben Sie eine Frage oder möchten Sie mit uns zusammenarbeiten? Wir würden uns freuen, von Ihnen zu hören.",
  trustedByClients: "Vertrauen von über 500 Kunden",
  responseTime: "Antwortzeit: 24 Stunden",
  freeConsultation: "Kostenlose Beratung",
  sendAMessage: "Nachricht senden",
  willGetBack: "Füllen Sie das folgende Formular aus und wir melden uns innerhalb von 24 Stunden bei Ihnen.",
  yourName: "Ihr Name",
  vijeetShah: "Vijeet Shah",
  emailAddress: "E-Mail-Adresse",
  yourEmail: "your@email.com",
  yourMessage: "Ihre Nachricht",
  weCanHelpYou: "Erzählen Sie uns von Ihrem Projekt oder wie wir Ihnen helfen können...",
  sendMessage: "Nachricht senden",
  creatingInnovativeDigitalSolutions: "Wir sind spezialisiert auf die Entwicklung innovativer digitaler Lösungen, die das Unternehmenswachstum fördern. Unser Expertenteam ist bestrebt, außergewöhnliche Ergebnisse zu liefern, die die Erwartungen übertreffen."
};

const fr: BaseTranslations = {
  home: "Accueil",
  digitalInnovation: "Innovation numérique",
  digitalSolutions: "Solutions numériques",
  thatDriveGrowth: "Qui stimulent la croissance",
  yourVisionBuilt:
    "Votre vision, validée et concrétisée. Nous collaborons pour développer efficacement vos concepts en solutions numériques percutantes, livrant des résultats tangibles rapidement.",
  deliveringResults: "Des résultats éprouvés",
  partneringWith: "Partenariat avec plus de 100 visionnaires",
  clientSupport: "Support client 5 étoiles dédié",
  getStarted: "Commencer",
  viewOurWork: "Voir notre travail",
  transformingBusinesses: "Transformer les entreprises",
  latestProjectGrowth: "Notre dernier projet a généré une croissance de 40%",
  projects: "Projets",
  clients: "Clients",
  caseStudies: "Études de cas",
  ourCoreValues: "Nos valeurs fondamentales",
  valuesDescription:
    "Au cœur de notre organisation se trouvent des principes inébranlables qui définissent qui nous sommes et guident chacune de nos décisions. Ces valeurs ne sont pas que des mots – elles sont l'ADN de notre succès, la promesse que nous tenons à chaque interaction avec un client, et la base sur laquelle nous construisons des partenariats durables.",
  integrity: "Intégrité",
  integrityDescription:
    "La transparence et l'excellence éthique sont les pierres angulaires de notre identité. Nous agissons selon des normes morales strictes, favorisant une confiance profonde grâce à une communication authentique, une responsabilité totale et une conduite honnête.",
  collaboration: "Collaboration",
  collaborationDescription:
    "Nos plus grands succès naissent de la synergie des talents collectifs. Nous favorisons un environnement où les perspectives diverses se rejoignent, où la connaissance circule librement, et où les forces individuelles s’unissent pour créer des résultats extraordinaires qui dépassent les attentes.",
  reliability: "Fiabilité",
  reliabilityDescription:
    "La constance est notre signature. Nous livrons des performances constantes en maintenant les normes les plus élevées de fiabilité. Notre engagement envers la fiabilité signifie que vous pouvez toujours compter sur nous pour dépasser les attentes.",
  innovation: "Innovation",
  innovationDescription:
    "Nous sommes des pionniers dans un paysage en constante évolution, repoussant sans cesse les limites pour redéfinir ce qui est possible. Notre quête incessante d'innovation nous pousse à anticiper les défis de demain et à fournir des solutions de pointe qui transforment les industries.",
  uiUxDesign: "Conception UI/UX",
  uiUxDesignDescription:
    "Nous nous concentrons sur la création d’interfaces attrayantes et conviviales qui augmentent considérablement l’engagement et la satisfaction des utilisateurs. En mettant l’accent sur des éléments de conception intuitifs, nous créons des expériences captivantes.",

  mobileApps: "Applications mobiles",
  mobileAppsDescription:
    "Nous sommes spécialisés dans le développement d’applications mobiles innovantes et conviviales pour les plateformes iOS et Android. Notre processus couvre toutes les étapes de l’idéation à la mise en production.",

  backendDevelopment: "Développement backend",
  backendDevelopmentDescription:
    "Nous proposons des solutions web réactives, sécurisées et centrées sur l’utilisateur pour renforcer votre présence en ligne. Notre approche vise à répondre aux standards modernes et à favoriser la croissance de votre activité.",

  frontendDevelopment: "Développement frontend",
  frontendDevelopmentDescription:
    "Nous proposons des designs de sites web élaborés avec soin, alliant esthétique et fonctionnalité. Nos créations mettent l’accent sur l’expérience utilisateur et la navigation intuitive.",

  artificialIntelligence: "Intelligence artificielle",
  artificialIntelligenceDescription:
    "Nous utilisons la puissance de l’IA pour connecter les informations et transformer les données en insights exploitables, aidant les organisations à prendre des décisions stratégiques avec précision.",

  dataScience: "Science des données & Analyse",
  dataScienceDescription:
    "Nous révélons les histoires cachées dans vos données grâce à des visualisations avancées, des insights exploitables et des prévisions précises pour appuyer vos décisions stratégiques.",

  cloudDevOps: "Cloud géré & DevOps",
  cloudDevOpsDescription:
    "Nous optimisons votre infrastructure cloud et rationalisons les opérations grâce à des services de cloud géré et DevOps. Notre approche intègre l’automatisation, la surveillance continue et les pratiques agiles.",

    getStartedWithUs: "Commencez avec nous",
  readyToGetStarted: "Prêt à commencer ?",
  joinThousandsOfSatisfiedCustomersToday: "Rejoignez des milliers de clients satisfaits dès aujourd'hui.",
  contactUs: "Contactez-nous",
  getInTouch: "Entrer en contact",
  letsStartAConversation: "Commençons une conversation",
  wantToWorkTogether: "Vous avez une question ou souhaitez collaborer ? Nous serions ravis d'échanger avec vous.",
  trustedByClients: "Fait confiance par plus de 500 clients",
  responseTime: "Délai de réponse de 24h",
  freeConsultation: "Consultation gratuite",
  sendAMessage: "Envoyer un message",
  willGetBack: "Remplissez le formulaire ci-dessous et nous vous répondrons sous 24 heures.",
  yourName: "Votre nom",
  vijeetShah: "Vijeet Shah",
  emailAddress: "Adresse e-mail",
  yourEmail: "your@email.com",
  yourMessage: "Votre message",
  weCanHelpYou: "Parlez-nous de votre projet ou de la manière dont nous pouvons vous aider...",
  sendMessage: "Envoyer le message",
  creatingInnovativeDigitalSolutions: "Nous sommes spécialisés dans la création de solutions numériques innovantes qui stimulent la croissance des entreprises. Notre équipe d'experts est dédiée à fournir des résultats exceptionnels qui dépassent les attentes."
};

const es: BaseTranslations = {
  home: "Inicio",
  digitalInnovation: "Innovación digital",
  digitalSolutions: "Soluciones digitales",
  thatDriveGrowth: "Que impulsan el crecimiento",
  yourVisionBuilt:
    "Tu visión, validada y construida. Colaboramos para desarrollar eficientemente tus conceptos en soluciones digitales impactantes, entregando resultados tangibles rápidamente.",
  deliveringResults: "Entregando resultados comprobados",
  partneringWith: "Colaborando con más de 100 visionarios",
  clientSupport: "Soporte al cliente de 5 estrellas",
  getStarted: "Comenzar",
  viewOurWork: "Ver nuestro trabajo",
  transformingBusinesses: "Transformando negocios",
  latestProjectGrowth: "Nuestro último proyecto generó un crecimiento del 40%",
  projects: "Proyectos",
  clients: "Clientes",
  caseStudies: "Estudios de caso",
  ourCoreValues: "Nuestros valores fundamentales",
  valuesDescription:
    "En el corazón de nuestra organización hay un conjunto de principios inquebrantables que definen quiénes somos y guían cada decisión que tomamos. Estos valores no son solo palabras: son el ADN de nuestro éxito, la promesa que cumplimos en cada interacción con el cliente y la base sobre la que construimos asociaciones duraderas.",
  integrity: "Integridad",
  integrityDescription:
    "La transparencia y la excelencia ética son la base de nuestra identidad. Operamos con estándares morales inquebrantables, fomentando una profunda confianza a través de una comunicación auténtica, plena responsabilidad y tratos honestos.",
  collaboration: "Colaboración",
  collaborationDescription:
    "Nuestros mayores logros surgen de la sinergia del talento colectivo. Fomentamos un entorno donde convergen perspectivas diversas, el conocimiento fluye libremente y las fortalezas individuales se unen para crear resultados extraordinarios que superan las expectativas.",
  reliability: "Fiabilidad",
  reliabilityDescription:
    "La constancia es nuestra firma. Entregamos un rendimiento constante, manteniendo los más altos estándares de confiabilidad. Nuestro compromiso con la fiabilidad significa que puedes confiar plenamente en nosotros para superar las expectativas cada vez.",
  innovation: "Innovación",
  innovationDescription:
    "Somos pioneros en un entorno en constante evolución, empujando continuamente los límites para redefinir lo posible. Nuestra búsqueda incansable de la innovación nos impulsa a anticipar los desafíos del mañana y ofrecer soluciones innovadoras que transforman industrias.",

  uiUxDesign: "Diseño UI/UX",
  uiUxDesignDescription:
    "Nos enfocamos en crear interfaces atractivas y fáciles de usar que aumentan significativamente el compromiso y la satisfacción del usuario. Con un enfoque en elementos de diseño intuitivos, creamos experiencias que mantienen a los usuarios conectados.",

  mobileApps: "Aplicaciones móviles",
  mobileAppsDescription:
    "Nos especializamos en desarrollar aplicaciones móviles innovadoras y fáciles de usar para plataformas iOS y Android. Nuestro proceso abarca desde la ideación y el diseño hasta la implementación final.",

  backendDevelopment: "Desarrollo Backend",
  backendDevelopmentDescription:
    "Ofrecemos soluciones web seguras, receptivas y centradas en el usuario para mejorar su presencia en línea. Nuestro enfoque se centra en cumplir con los estándares modernos y promover el crecimiento empresarial.",

  frontendDevelopment: "Desarrollo Frontend",
  frontendDevelopmentDescription:
    "Entregamos diseños de sitios web cuidadosamente elaborados que combinan estética y funcionalidad. Nuestros diseños priorizan la experiencia del usuario y la navegación intuitiva.",

  artificialIntelligence: "Inteligencia artificial",
  artificialIntelligenceDescription:
    "Aprovechamos el poder de la IA para conectar la información y convertir los datos en conocimientos procesables, ayudando a las organizaciones a tomar decisiones estratégicas con precisión.",

  dataScience: "Ciencia de datos y análisis",
  dataScienceDescription:
    "Nos especializamos en descubrir historias ocultas en sus datos utilizando visualizaciones avanzadas, conocimientos procesables y pronósticos precisos para fortalecer las decisiones estratégicas.",

  cloudDevOps: "Nube gestionada y DevOps",
  cloudDevOpsDescription:
    "Optimizamos su infraestructura en la nube y racionalizamos las operaciones mediante servicios gestionados de nube y DevOps. Nuestro enfoque integra automatización, monitoreo continuo y metodologías ágiles.",

    getStartedWithUs: "Empieza con nosotros",
  readyToGetStarted: "¿Listo para empezar?",
  joinThousandsOfSatisfiedCustomersToday: "Únete hoy a miles de clientes satisfechos.",
  contactUs: "Contáctanos",
  getInTouch: "Ponte en contacto",
  letsStartAConversation: "Comencemos una conversación",
  wantToWorkTogether: "¿Tienes una pregunta o quieres trabajar con nosotros? Nos encantaría saber de ti.",
  trustedByClients: "Confiado por más de 500 clientes",
  responseTime: "Tiempo de respuesta de 24h",
  freeConsultation: "Consulta gratuita",
  sendAMessage: "Enviar un mensaje",
  willGetBack: "Rellena el siguiente formulario y te responderemos en un plazo de 24 horas.",
  yourName: "Tu nombre",
  vijeetShah: "Vijeet Shah",
  emailAddress: "Correo electrónico",
  yourEmail: "your@email.com",
  yourMessage: "Tu mensaje",
  weCanHelpYou: "Cuéntanos sobre tu proyecto o cómo podemos ayudarte...",
  sendMessage: "Enviar mensaje",
  creatingInnovativeDigitalSolutions: "Nos especializamos en crear soluciones digitales innovadoras que impulsan el crecimiento empresarial. Nuestro equipo de expertos se dedica a ofrecer resultados excepcionales que superan las expectativas."
};

const zh: BaseTranslations = {
  home: "首页",
  digitalInnovation: "数字创新",
  digitalSolutions: "数字解决方案",
  thatDriveGrowth: "推动增长",
  yourVisionBuilt:
    "您的愿景已验证并实现。我们合作高效地将您的构想转化为有影响力的数字解决方案，快速交付切实成果。",
  deliveringResults: "交付可靠成果",
  partneringWith: "与100多位远见者合作",
  clientSupport: "专属五星客户支持",
  getStarted: "立即开始",
  viewOurWork: "查看我们的作品",
  transformingBusinesses: "转型企业",
  latestProjectGrowth: "我们最近的项目带来了40%的增长",
  projects: "项目",
  clients: "客户",
  caseStudies: "案例研究",
  ourCoreValues: "我们的核心价值观",
  valuesDescription:
    "我们组织的核心是一组坚定不移的原则，定义了我们是谁，并指导我们做出的每一个决策。这些价值观不仅仅是墙上的字句——它们是我们成功的DNA，是我们与每一位客户互动时坚持的承诺，也是我们建立长期合作伙伴关系的基础。",
  integrity: "诚信",
  integrityDescription:
    "透明度和道德卓越是我们身份的基石。我们秉持坚定的道德标准，通过真实沟通、完全责任感和诚实交易建立深厚信任。",
  collaboration: "协作",
  collaborationDescription:
    "我们最伟大的成就源于集体智慧的协同。我们营造一个多元观点汇聚、知识自由流动、个体优势融合的环境，创造出超越期望的非凡成果。",
  reliability: "可靠性",
  reliabilityDescription:
    "一致性是我们的标志。我们提供始终如一的表现，保持最高的可靠性标准。我们的可靠性承诺意味着您每次都可以放心依赖我们。",
  innovation: "创新",
  innovationDescription:
    "我们是不断变化环境中的先驱，不断突破界限，重新定义可能性。我们对创新的不懈追求驱使我们预见未来挑战，并提供改变行业的尖端解决方案。",
  uiUxDesign: "UI/UX设计",
  uiUxDesignDescription:
    "我们专注于打造具有吸引力且用户友好的界面，大幅提升用户参与度和满意度。通过注重直观的设计元素，我们创造能够持续吸引用户的体验。",

  mobileApps: "移动应用",
  mobileAppsDescription:
    "我们专注于为iOS和Android平台开发创新且用户友好的移动应用程序。从构思、设计到最终部署，我们覆盖整个流程。",

  backendDevelopment: "后端开发",
  backendDevelopmentDescription:
    "我们提供响应迅速、安全且以用户为中心的网页解决方案，帮助提升您的在线形象。我们的策略致力于满足现代标准并推动业务增长。",

  frontendDevelopment: "前端开发",
  frontendDevelopmentDescription:
    "我们提供精心打造的网站设计，兼顾美感与功能。我们的设计优先考虑用户体验和直观导航。",

  artificialIntelligence: "人工智能",
  artificialIntelligenceDescription:
    "我们利用人工智能的力量连接信息，将数据转化为可操作的洞察，帮助组织精准地做出战略决策。",

  dataScience: "数据科学与分析",
  dataScienceDescription:
    "我们擅长利用高级可视化、可操作的洞察和准确预测，揭示数据背后的故事，为战略决策赋能。",

  cloudDevOps: "托管云和DevOps",
  cloudDevOpsDescription:
    "我们通过托管云和DevOps服务优化您的云基础设施并简化操作。我们的方法融合了自动化、持续监控和敏捷实践。",

    getStartedWithUs: "与我们一起开始",
  readyToGetStarted: "准备好开始了吗？",
  joinThousandsOfSatisfiedCustomersToday: "立即加入数千名满意客户的行列。",
  contactUs: "联系我们",
  getInTouch: "取得联系",
  letsStartAConversation: "让我们开始对话",
  wantToWorkTogether: "有问题或想合作？我们非常乐意听到您的声音。",
  trustedByClients: "获得500+客户信任",
  responseTime: "24小时响应时间",
  freeConsultation: "免费咨询",
  sendAMessage: "发送消息",
  willGetBack: "请填写以下表格，我们将在24小时内与您联系。",
  yourName: "您的姓名",
  vijeetShah: "Vijeet Shah",
  emailAddress: "电子邮箱地址",
  yourEmail: "your@email.com",
  yourMessage: "您的信息",
  weCanHelpYou: "请告诉我们您的项目或我们如何帮助您...",
  sendMessage: "发送信息",
  creatingInnovativeDigitalSolutions: "我们专注于创建推动业务增长的创新数字解决方案。我们的专家团队致力于提供超出预期的卓越成果。"
};

export const dictionary: TranslationDictionary<BaseTranslations> = {
  en,
  hi,
  de,
  fr,
  es,
  zh,
};

export const languageNames: Record<string, string> = {
  en: "English",
  hi: "हिन्दी",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  zh: "中文",
};
