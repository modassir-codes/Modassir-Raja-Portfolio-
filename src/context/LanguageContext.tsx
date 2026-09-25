import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'hi' | 'ur' | 'es';

export interface LanguageOption {
  code: LanguageCode;
  label: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'ur', label: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
  { code: 'es', label: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
];

export interface TranslationDictionary {
  nav: {
    home: string;
    about: string;
    experience: string;
    projects: string;
    skills: string;
    education: string;
    contact: string;
    resume: string;
    getInTouch: string;
    language: string;
  };
  hero: {
    volume: string;
    availableStatus: string;
    tagline: string;
    subtitle: string;
    summary: string;
    selectedWorks: string;
    resumePdf: string;
    contactBtn: string;
    coreStack: string;
    locationLabel: string;
    availableBadge: string;
  };
  experience: {
    sectionNum: string;
    title: string;
    subtitle: string;
    keyHighlights: string;
    coreTech: string;
  };
  projects: {
    sectionNum: string;
    title: string;
    subtitle: string;
    filterAll: string;
    filterReact: string;
    filterUi: string;
    filterFullstack: string;
    viewCode: string;
    liveDemo: string;
    caseStudy: string;
    keyFeatures: string;
    impactMetric: string;
    closeModal: string;
  };
  skills: {
    sectionNum: string;
    title: string;
    subtitle: string;
    proficiencyMap: string;
    levelScale: string;
  };
  education: {
    sectionNum: string;
    title: string;
    subtitle: string;
    eduTab: string;
    certTab: string;
    langTab: string;
    credentialBtn: string;
  };
  contact: {
    sectionNum: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendBtn: string;
    sendingBtn: string;
    dispatchedTitle: string;
    dispatchedDesc: string;
    receiptTitle: string;
    copyMessage: string;
    copied: string;
    openEmailApp: string;
    sendAnother: string;
    responseTime: string;
  };
  resumeModal: {
    title: string;
    subtitle: string;
    printBtn: string;
    downloadPdf: string;
    close: string;
    aboutSummary: string;
    workHistory: string;
    techInventory: string;
    academicBg: string;
  };
  footer: {
    craftStatement: string;
    quickLinks: string;
    connect: string;
    backToTop: string;
    rightsReserved: string;
  };
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    nav: {
      home: 'Overview',
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      skills: 'Skills',
      education: 'Credentials',
      contact: 'Contact',
      resume: 'Download Resume',
      getInTouch: 'Hire / Connect',
      language: 'Language',
    },
    hero: {
      volume: 'PORTFOLIO 2026',
      availableStatus: 'AVAILABLE FOR HIRE • HYDERABAD & REMOTE',
      tagline: 'Full Stack Web Developer',
      subtitle: 'Building modern, responsive and scalable web applications.',
      summary:
        'Full Stack Web Developer dedicated to building modern, responsive, and scalable web applications. Experienced in developing practical user-centric tools using React, modern JavaScript (ES6+), HTML5, CSS3, and backend RESTful architectures, backed by a strong foundation in computer science and software development life cycles.',
      selectedWorks: 'View My Projects',
      resumePdf: 'Download Resume',
      contactBtn: 'Contact',
      coreStack: 'CORE STACK',
      locationLabel: 'LOCATION',
      availableBadge: 'Available',
    },
    experience: {
      sectionNum: '01. Work History',
      title: 'Engineering Experience',
      subtitle: 'Hands-on roles building production software, full stack workflows, and secure web interfaces.',
      keyHighlights: 'KEY CONTRIBUTIONS',
      coreTech: 'TECHNOLOGIES APPLIED',
    },
    projects: {
      sectionNum: '02. Selected Works',
      title: 'Projects & Systems',
      subtitle: 'Production web applications, practical user tools, and full-stack software.',
      filterAll: 'All Projects',
      filterReact: 'React Apps',
      filterUi: 'UI & Systems',
      filterFullstack: 'Full-Stack',
      viewCode: 'View Code',
      liveDemo: 'Live Demo',
      caseStudy: 'Case Study',
      keyFeatures: 'Key Technical Features',
      impactMetric: 'Performance & Impact',
      closeModal: 'Close Overview',
    },
    skills: {
      sectionNum: '03. Technical Capabilities',
      title: 'Skills & Architecture',
      subtitle: 'Technologies, UI principles, and engineering methodologies practiced in production code.',
      proficiencyMap: 'Proficiency Breakdown',
      levelScale: 'Scale: 0% to 100% Production Mastery',
    },
    education: {
      sectionNum: '04. Academics & Credentials',
      title: 'Education & Certifications',
      subtitle: 'Formal computer science training, industry certifications, and spoken languages.',
      eduTab: 'Education',
      certTab: 'Certifications',
      langTab: 'Languages',
      credentialBtn: 'Verify Credential',
    },
    contact: {
      sectionNum: '05. Direct Inquiries',
      title: "Let's build something useful together.",
      subtitle: 'Have an open full stack web engineering opportunity or project? Feel free to reach out directly.',
      nameLabel: 'YOUR NAME',
      namePlaceholder: 'Alex Morgan / Hiring Lead',
      emailLabel: 'EMAIL ADDRESS',
      emailPlaceholder: 'alex@company.com',
      subjectLabel: 'SUBJECT / ROLE',
      subjectPlaceholder: 'Full Stack Web Developer Opportunity / Project Inquiry',
      messageLabel: 'MESSAGE DISPATCH',
      messagePlaceholder: 'Hi Modassir, we reviewed your portfolio and would like to discuss an opportunity...',
      sendBtn: 'Dispatch Message',
      sendingBtn: 'Transmitting...',
      dispatchedTitle: 'Message Dispatched to Modassir',
      dispatchedDesc: 'Your message has been sent directly to modassirraza722083@gmail.com.',
      receiptTitle: 'DISPATCH RECEIPT',
      copyMessage: 'Copy Message',
      copied: 'Copied Payload',
      openEmailApp: 'Open Email App',
      sendAnother: 'Send Another',
      responseTime: 'Average response turnaround: within 24 hours.',
    },
    resumeModal: {
      title: 'Curriculum Vitae',
      subtitle: 'Official Engineering Dossier',
      printBtn: 'Print / Save PDF',
      downloadPdf: 'Download Dossier',
      close: 'Close',
      aboutSummary: 'Professional Profile',
      workHistory: 'Work Experience',
      techInventory: 'Technical Stack',
      academicBg: 'Academic Background',
    },
    footer: {
      craftStatement: 'Designed with mathematical precision, high typography contrast, and semantic HTML5 standards.',
      quickLinks: 'Navigation',
      connect: 'Channels',
      backToTop: 'Back to Top',
      rightsReserved: 'All rights reserved. Available for full-time Full Stack Web Developer roles.',
    },
  },
  hi: {
    nav: {
      home: 'अवलोकन',
      about: 'परिचय',
      experience: 'अनुभव',
      projects: 'परियोजनाएं',
      skills: 'कौशल',
      education: 'प्रमाणपत्र',
      contact: 'संपर्क',
      resume: 'रिज्यूमे PDF',
      getInTouch: 'हायर करें / जुड़ें',
      language: 'भाषा',
    },
    hero: {
      volume: 'पोर्टफोलियो 2026',
      availableStatus: 'नौकरी के लिए उपलब्ध • हैदराबाद एवं रिमोट',
      tagline: 'फुल स्टैक वेब डेवलपर',
      subtitle: 'आधुनिक, उत्तरदायी और स्केलेबल वेब अनुप्रयोगों का निर्माण।',
      summary:
        'कंप्यूटर साइंस की मजबूत पृष्ठभूमि और React, JavaScript (ES6+), HTML5/CSS3 के साथ उत्तरदायी, सुलभ और उपयोगी वेब एप्लिकेशन बनाने का व्यावहारिक अनुभव रखने वाले फुल स्टैक वेब डेवलपर।',
      selectedWorks: 'मेरी परियोजनाएं देखें',
      resumePdf: 'रिज्यूमे डाउनलोड',
      contactBtn: 'संपर्क करें',
      coreStack: 'मुख्य तकनीकें',
      locationLabel: 'स्थान',
      availableBadge: 'उपलब्ध',
    },
    experience: {
      sectionNum: '01. कार्य इतिहास',
      title: 'इंजीनियरिंग अनुभव',
      subtitle: 'प्रोडक्शन सॉफ्टवेयर, फुल स्टैक वर्कफ़्लो और सुरक्षित वेब इंटरफेस बनाने का व्यावहारिक अनुभव।',
      keyHighlights: 'प्रमुख उपलब्धियां',
      coreTech: 'प्रयुक्त तकनीकें',
    },
    projects: {
      sectionNum: '02. परियोजनाएं',
      title: 'चयनित परियोजनाएं',
      subtitle: 'वेब एप्लिकेशन, कंपोनेंट लाइब्रेरी और इंटरैक्टिव इंटरफेस।',
      filterAll: 'सभी',
      filterReact: 'React ऐप्स',
      filterUi: 'UI सिस्टम',
      filterFullstack: 'फुल-स्टैक UI',
      viewCode: 'कोड देखें',
      liveDemo: 'लाइव डेमो',
      caseStudy: 'केस स्टडी',
      keyFeatures: 'प्रमुख तकनीकी विशेषताएं',
      impactMetric: 'प्रदर्शन एवं प्रभाव',
      closeModal: 'बंद करें',
    },
    skills: {
      sectionNum: '03. तकनीकी क्षमताएं',
      title: 'कौशल और वास्तुकला',
      subtitle: 'प्रोडक्शन कोड में उपयोग की जाने वाली तकनीकें, UI सिद्धांत और इंजीनियरिंग पद्धतियां।',
      proficiencyMap: 'दक्षता विवरण',
      levelScale: 'स्केल: 0% से 100% महारत',
    },
    education: {
      sectionNum: '04. शिक्षा और योग्यता',
      title: 'शिक्षा और प्रमाणन',
      subtitle: 'कंप्यूटर साइंस डिग्री, उद्योग प्रमाणपत्र और भाषाएं।',
      eduTab: 'शिक्षा',
      certTab: 'प्रमाणपत्र',
      langTab: 'भाषाएं',
      credentialBtn: 'प्रमाणपत्र सत्यापित करें',
    },
    contact: {
      sectionNum: '05. सीधा संपर्क',
      title: 'आइए मिलकर कुछ उपयोगी बनाएं।',
      subtitle: 'क्या आपके पास कोई फुल स्टैक वेब इंजीनियरिंग अवसर या परियोजना है? सीधा संदेश भेजें।',
      nameLabel: 'आपका नाम',
      namePlaceholder: 'राहुल वर्मा / हायरिंग लीड',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'rahul@company.com',
      subjectLabel: 'विषय / पद',
      subjectPlaceholder: 'फुल स्टैक वेब डेवलपर पद / प्रोजेक्ट पूछताछ',
      messageLabel: 'संदेश',
      messagePlaceholder: 'नमस्ते मुदस्सिर, हमने आपका पोर्टफोलियो देखा और हम आपसे जुड़ना चाहते हैं...',
      sendBtn: 'संदेश भेजें',
      sendingBtn: 'भेजा जा रहा है...',
      dispatchedTitle: 'मुदस्सिर को संदेश भेजा गया',
      dispatchedDesc: 'आपका संदेश सीधे modassirraza722083@gmail.com पर भेज दिया गया है।',
      receiptTitle: 'प्रेषण रसीद',
      copyMessage: 'संदेश कॉपी करें',
      copied: 'कॉपी हो गया',
      openEmailApp: 'ईमेल ऐप खोलें',
      sendAnother: 'नया संदेश भेजें',
      responseTime: 'औसत प्रतिक्रिया समय: 24 घंटे के भीतर।',
    },
    resumeModal: {
      title: 'बायोडाटा / रिज्यूमे',
      subtitle: 'आधिकारिक इंजीनियरिंग दस्तावेज़',
      printBtn: 'प्रिंट / PDF सहेजें',
      downloadPdf: 'दस्तावेज़ डाउनलोड करें',
      close: 'बंद करें',
      aboutSummary: 'प्रोफाइल सारांश',
      workHistory: 'कार्य अनुभव',
      techInventory: 'तकनीकी स्टैक',
      academicBg: 'शैक्षणिक पृष्ठभूमि',
    },
    footer: {
      craftStatement: 'गणितीय परिशुद्धता, उच्च टाइपोग्राफी कंट्रास्ट और सिमेंटिक HTML5 मानकों के साथ निर्मित।',
      quickLinks: 'नेविगेशन',
      connect: 'सोशल मीडिया',
      backToTop: 'ऊपर जाएं',
      rightsReserved: 'सर्वाधिकार सुरक्षित। पूर्णकालिक फुल स्टैक वेब इंजीनियरिंग भूमिकाओं के लिए उपलब्ध।',
    },
  },
  ur: {
    nav: {
      home: 'جائزہ',
      about: 'تعارف',
      experience: 'تجربہ',
      projects: 'منصوبے',
      skills: 'مہارتیں',
      education: 'تعلیم و اسناد',
      contact: 'رابطہ',
      resume: 'ریزیومے PDF',
      getInTouch: 'رابطہ کریں',
      language: 'زبان',
    },
    hero: {
      volume: 'پورٹ فولیو 2026',
      availableStatus: 'ملازمت کے لیے دستیاب • حیدرآباد و ریموٹ',
      tagline: 'فل اسٹیک ویب ڈویلپر',
      subtitle: 'جدید، ریسپانسیو اور اسکیل ایبل ویب ایپلی کیشنز کی تیاری۔',
      summary:
        'جدید، تیز رفتار اور معیاری ویب ایپلی کیشنز تیار کرنے والے فل اسٹیک ویب ڈویلپر۔ React، جدید جاوا اسکرپٹ (ES6+)، HTML5، CSS3 اور بیک اینڈ سسٹمز کے ساتھ عملی تجربہ۔',
      selectedWorks: 'میرے منصوبے دیکھیں',
      resumePdf: 'ریزیومے ڈاؤن لوڈ',
      contactBtn: 'رابطہ',
      coreStack: 'اہم ٹیکنالوجیز',
      locationLabel: 'مقام',
      availableBadge: 'دستیاب',
    },
    experience: {
      sectionNum: '01. کام کا تجربہ',
      title: 'انجینئرنگ کا تجربہ',
      subtitle: 'پروڈکشن سافٹ ویئر، فل اسٹیک سسٹمز اور محفوظ ویب انٹرفیس کی تعمیر کا عملی تجربہ۔',
      keyHighlights: 'اہم خدمات',
      coreTech: 'استعمال شدہ ٹیکنالوجیز',
    },
    projects: {
      sectionNum: '02. منصوبے',
      title: 'منتخب منصوبے',
      subtitle: 'ویب ایپلیکیشنز، کمپوننٹ لائبریریز اور انٹرایکٹو انٹرفیس۔',
      filterAll: 'تمام',
      filterReact: 'React ایپس',
      filterUi: 'UI سسٹمز',
      filterFullstack: 'فل اسٹیک UI',
      viewCode: 'کوڈ دیکھیں',
      liveDemo: 'لائیو ڈیمو',
      caseStudy: 'کیس اسٹڈی',
      keyFeatures: 'اہم تکنیکی خصوصیات',
      impactMetric: 'کارکردگی اور اثرات',
      closeModal: 'بند کریں',
    },
    skills: {
      sectionNum: '03. تکنیکی صلاحیتیں',
      title: 'مہارتیں اور فن تعمیر',
      subtitle: 'پروڈکشن کوڈ میں لاگو کی جانے والی ٹیکنالوجیز اور جدید اصول۔',
      proficiencyMap: 'مہارت کا جائزہ',
      levelScale: 'پیمانہ: 0% سے 100% مہارت',
    },
    education: {
      sectionNum: '04. تعلیم و اسناد',
      title: 'تعلیم اور سرٹیفیکیشنز',
      subtitle: 'کمپیوٹر سائنس کی ڈگری، صنعتی سرٹیفکیٹس اور زبانیں۔',
      eduTab: 'تعلیم',
      certTab: 'سرٹیفیکیشنز',
      langTab: 'زبانیں',
      credentialBtn: 'سند کی تصدیق کریں',
    },
    contact: {
      sectionNum: '05. رابطہ',
      title: 'آئیے مل کر کچھ مفید تعمیر کریں۔',
      subtitle: 'کیا آپ کے پاس کوئی فل اسٹیک ویب انجینئرنگ پوزیشن ہے؟ براہ راست رابطہ کریں۔',
      nameLabel: 'آپ کا نام',
      namePlaceholder: 'احمد خان / ہائرنگ لیڈ',
      emailLabel: 'ای میل ایڈریس',
      emailPlaceholder: 'ahmed@company.com',
      subjectLabel: 'موضوع / عہدہ',
      subjectPlaceholder: 'فل اسٹیک ویب ڈویلپر پوزیشن / پروجیکٹ کے لیے رابطہ',
      messageLabel: 'پیغام',
      messagePlaceholder: 'السلام علیکم مدثر، ہم آپ سے ویب ڈویلپمنٹ کے حوالے سے بات کرنا چاہتے ہیں...',
      sendBtn: 'پیغام بھیجیں',
      sendingBtn: 'ارسال کیا جا رہا ہے...',
      dispatchedTitle: 'پیغام کامیابی سے بھیج دیا گیا',
      dispatchedDesc: 'آپ کا پیغام براہ راست modassirraza722083@gmail.com پر پہنچ گیا ہے۔',
      receiptTitle: 'رسید برائے ارسال',
      copyMessage: 'پیغام کاپی کریں',
      copied: 'کاپی ہو گیا',
      openEmailApp: 'ای میل ایپ کھولیں',
      sendAnother: 'دوسرا پیغام بھیجیں',
      responseTime: 'اوسط جوابی وقت: 24 گھنٹے کے اندر۔',
    },
    resumeModal: {
      title: 'کریکولم ویٹائی',
      subtitle: 'سرکاری انجینئرنگ دستاویز',
      printBtn: 'پرنٹ / PDF محفوظ کریں',
      downloadPdf: 'دستاویز ڈاؤن لوڈ کریں',
      close: 'بند کریں',
      aboutSummary: 'پروفائل کا خلاصہ',
      workHistory: 'کام کا تجربہ',
      techInventory: 'تکنیکی مہارتیں',
      academicBg: 'تعلیمی پس منظر',
    },
    footer: {
      craftStatement: 'جدید اور معیاری HTML5 اور CSS3 معیارات کے مطابق ڈیزائن کیا گیا۔',
      quickLinks: 'نیویگیشن',
      connect: 'روابط',
      backToTop: 'اوپر جائیں',
      rightsReserved: 'تمام حقوق محفوظ ہیں۔ فل اسٹیک ویب انجینئرنگ کے مواقع کے لیے دستیاب۔',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      experience: 'Experiencia',
      projects: 'Proyectos',
      skills: 'Habilidades',
      education: 'Credenciales',
      contact: 'Contacto',
      resume: 'Descargar CV',
      getInTouch: 'Contratar',
      language: 'Idioma',
    },
    hero: {
      volume: 'PORTAFOLIO 2026',
      availableStatus: 'DISPONIBLE PARA CONTRATACIÓN • HYDERABAD & REMOTO',
      tagline: 'Desarrollador Web Full Stack',
      subtitle: 'Construcción de aplicaciones web modernas, responsivas y escalables.',
      summary:
        'Desarrollador Web Full Stack dedicado a construir aplicaciones web modernas, responsivas y escalables. Experiencia desarrollando herramientas prácticas orientadas al usuario con React, JavaScript moderno (ES6+), HTML5, CSS3 y arquitecturas backend RESTful.',
      selectedWorks: 'Ver Mis Proyectos',
      resumePdf: 'Descargar CV',
      contactBtn: 'Contacto',
      coreStack: 'STACK PRINCIPAL',
      locationLabel: 'UBICACIÓN',
      availableBadge: 'Disponible',
    },
    experience: {
      sectionNum: '01. Historial Laboral',
      title: 'Experiencia Profesional',
      subtitle: 'Roles prácticos desarrollando software de producción, flujos full stack e interfaces web seguras.',
      keyHighlights: 'LOGROS CLAVE',
      coreTech: 'TECNOLOGÍAS APLICADAS',
    },
    projects: {
      sectionNum: '02. Proyectos',
      title: 'Proyectos Seleccionados',
      subtitle: 'Aplicaciones web de producción, herramientas prácticas e interfaces interactivas.',
      filterAll: 'Todos',
      filterReact: 'Apps React',
      filterUi: 'Sistemas UI',
      filterFullstack: 'Full-Stack',
      viewCode: 'Ver Código',
      liveDemo: 'Demo en Vivo',
      caseStudy: 'Estudio de Caso',
      keyFeatures: 'Características Técnicas',
      impactMetric: 'Rendimiento e Impacto',
      closeModal: 'Cerrar Vista',
    },
    skills: {
      sectionNum: '03. Capacidades Técnicas',
      title: 'Habilidades y Arquitectura',
      subtitle: 'Tecnologías, principios de UI y metodologías de ingeniería aplicadas en código de producción.',
      proficiencyMap: 'Desglose de Competencias',
      levelScale: 'Escala: 0% a 100% de Dominio',
    },
    education: {
      sectionNum: '04. Formación y Certificaciones',
      title: 'Educación y Certificados',
      subtitle: 'Licenciatura en informática, certificaciones de la industria e idiomas.',
      eduTab: 'Educación',
      certTab: 'Certificaciones',
      langTab: 'Idiomas',
      credentialBtn: 'Verificar Credencial',
    },
    contact: {
      sectionNum: '05. Contacto',
      title: 'Construyamos algo útil juntos.',
      subtitle: '¿Tiene una oportunidad de ingeniería web full stack o un proyecto? Envíe un mensaje directo.',
      nameLabel: 'SU NOMBRE',
      namePlaceholder: 'Carlos Silva / Líder de Selección',
      emailLabel: 'CORREO ELECTRÓNICO',
      emailPlaceholder: 'carlos@empresa.com',
      subjectLabel: 'ASUNTO / PUESTO',
      subjectPlaceholder: 'Oportunidad para Desarrollador Web Full Stack / Consulta',
      messageLabel: 'MENSAJE',
      messagePlaceholder: 'Hola Modassir, revisamos tu portafolio y nos gustaría conversar sobre una oportunidad...',
      sendBtn: 'Enviar Mensaje',
      sendingBtn: 'Transmitiendo...',
      dispatchedTitle: 'Mensaje Enviado a Modassir',
      dispatchedDesc: 'Su mensaje ha sido enviado directamente a modassirraza722083@gmail.com.',
      receiptTitle: 'RECIBO DE TRANSMISIÓN',
      copyMessage: 'Copiar Mensaje',
      copied: 'Copiado al Portapapeles',
      openEmailApp: 'Abrir App de Correo',
      sendAnother: 'Enviar Otro',
      responseTime: 'Tiempo promedio de respuesta: menos de 24 horas.',
    },
    resumeModal: {
      title: 'Curriculum Vitae',
      subtitle: 'Expediente Oficial de Ingeniería',
      printBtn: 'Imprimir / Guardar PDF',
      downloadPdf: 'Descargar Expediente',
      close: 'Cerrar',
      aboutSummary: 'Perfil Profesional',
      workHistory: 'Experiencia Laboral',
      techInventory: 'Stack Tecnológico',
      academicBg: 'Historial Académico',
    },
    footer: {
      craftStatement: 'Diseñado con precisión matemática, alto contraste tipográfico y estándares semánticos HTML5.',
      quickLinks: 'Navegación',
      connect: 'Canales',
      backToTop: 'Volver Arriba',
      rightsReserved: 'Todos los derechos reservados. Disponible para roles Full Stack.',
    },
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  currentLanguageConfig: LanguageOption;
  t: TranslationDictionary;
  languages: LanguageOption[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('modassir_portfolio_language') as LanguageCode | null;
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      return saved;
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('modassir_portfolio_language', lang);
  };

  const currentLanguageConfig =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  useEffect(() => {
    // Set document lang attribute for accessibility & screen readers
    document.documentElement.lang = language;
    if (language === 'ur') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        currentLanguageConfig,
        t,
        languages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
