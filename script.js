/* ============================================================
  Araby Mobile Studio — script.js
  Vanilla JS — no frameworks, GitHub Pages compatible

  Features:
  1. i18n — auto-detect language by IP country + browser language
  2. RTL layout switching for Arabic
  3. Manual language toggle button
  4. Navbar scroll + active link
  5. Mobile hamburger menu
  6. Scroll fade-in animations (IntersectionObserver)
  7. Contact form (JS alert — no backend)
  8. Back to top button
  9. Stats counter animation
============================================================ */


/* ================================================================
  1. TRANSLATIONS
  Add / edit text here to update the page in both languages.
================================================================ */
const TRANSLATIONS = {
  en: {
    /* Nav */
    'nav.home':        'Home',
    'nav.products':    'Products',
    'nav.services':    'Services',
    'nav.portfolio':   'Portfolio',
    'nav.contact':     'Contact',
    'nav.cta':         'Contact Us',

    /* Hero */
    'hero.badge':      'Mobile Apps • Wallpapers • Themes',
    'hero.title':      'Premium Android Apps,<br /><span class="text-gradient-cyan">Wallpapers</span> &amp; <span class="text-gradient-gold">Mobile Themes</span>',
    'hero.subtitle':   'Araby Mobile Studio creates modern Android apps, premium mobile wallpapers, Samsung themes, icon packs, and lightweight HTML5 games for Arabic users and global Android audiences.',
    'hero.cta.primary':   'Explore Products',
    'hero.cta.secondary': 'Contact Us',
    'hero.trust':      'Designed for Android users, creators, and digital product brands.',

    /* Floating chips */
    'chip.themes': 'Samsung Themes',
    'chip.apps':   'Android Apps',

    /* Stats */
    'stat.1.num':   '10+',
    'stat.1.label': 'Apps &amp; Tools',
    'stat.1.sub':   'Android Apps',
    'stat.2.num':   '500+',
    'stat.2.label': 'Wallpaper Concepts',
    'stat.2.sub':   'Premium Wallpapers',
    'stat.3.num':   '50+',
    'stat.3.label': 'Theme Assets',
    'stat.3.sub':   'Samsung Themes',
    'stat.4.num':   '100%',
    'stat.4.label': 'Static Website Ready',
    'stat.4.sub':   'HTML5 Games',

    /* Section tags */
    'tag.build':     'What We Build',
    'tag.services':  'Our Work',
    'tag.portfolio': 'Our Work',
    'tag.edge':      'Our Edge',
    'tag.touch':     'Get In Touch',

    /* Products section */
    'products.title':    'Our Digital <span class="text-gradient-cyan">Products</span>',
    'products.subtitle': 'From utility apps to stunning visual assets — everything we make is built for the mobile-first world.',
    'product.apps.title':   'Android Apps',
    'product.apps.desc':    'Lightweight, useful Android apps built with clean UI and practical features.',
    'product.apps.tag':     'Google Play Ready',
    'product.walls.title':  'Mobile Wallpapers',
    'product.walls.desc':   'Premium wallpapers for Android screens, AMOLED displays, and modern mobile themes.',
    'product.walls.tag':    '4K · AMOLED',
    'product.themes.title': 'Samsung Themes',
    'product.themes.desc':  'Custom Samsung themes, icon packs, lock screens, and home screen visuals.',
    'product.themes.tag':   'Galaxy Store',
    'product.icons.title':  'Icon Packs',
    'product.icons.desc':   'High-quality icon packs for mobile customization and digital stores.',
    'product.icons.tag':    '1000+ Icons',
    'product.games.title':  'HTML5 Games',
    'product.games.desc':   'Simple browser games and mobile-friendly gaming experiences.',
    'product.games.tag':    'Browser · Mobile',
    'product.ui.title':     'UI Design',
    'product.ui.desc':      'Modern interface designs for apps, dashboards, and landing pages.',
    'product.ui.tag':       'Mobile-First',

    /* Services section */
    'services.title':    'What We Can <span class="text-gradient-gold">Create</span>',
    'services.subtitle': 'From concept to polished digital product, Araby Mobile Studio focuses on clean design, mobile-first layouts, and premium visual quality.',
    'service.1.title': 'Android App Design',
    'service.1.desc':  'Clean, intuitive Android apps with modern Material Design principles.',
    'service.2.title': 'Wallpaper Pack Creation',
    'service.2.desc':  'AMOLED-optimized, 4K-ready wallpaper packs for mobile stores.',
    'service.3.title': 'Samsung Theme Design',
    'service.3.desc':  'Full Galaxy Store theme packages — icons, lock screen, widgets, and more.',
    'service.4.title': 'Icon Pack Design',
    'service.4.desc':  'Consistent, premium icon sets ready for Google Play and Galaxy Store.',
    'service.5.title': 'Landing Page Design',
    'service.5.desc':  'High-converting product landing pages built for apps and digital products.',
    'service.6.title': 'Mobile UI Redesign',
    'service.6.desc':  'Modernize existing apps with refreshed visual design and better UX flows.',
    'panel.badge': 'Why Araby Mobile?',
    'panel.title': 'Built for the<br /><span class="text-gradient-cyan">Mobile Ecosystem</span>',
    'panel.desc':  'Every product we create is designed with the Google Play Store, Samsung Galaxy Store, and modern Android users in mind. We understand mobile-first design deeply.',
    'panel.li.1':  'Google Play Store ready',
    'panel.li.2':  'Samsung Galaxy Store compatible',
    'panel.li.3':  'AMOLED &amp; responsive-first',
    'panel.li.4':  'Arabic &amp; global audiences',
    'panel.cta':   'Start a Project',

    /* Portfolio section */
    'portfolio.title':    'Featured <span class="text-gradient-cyan">Concepts</span>',
    'portfolio.subtitle': 'A preview of the type of products we design and build for mobile audiences worldwide.',
    'preview.label': 'Preview',
    'port.1.tag':   'Wallpapers',
    'port.1.title': 'Luxury Wallpapers',
    'port.1.desc':  'Gold-tone premium wallpaper series for AMOLED Android screens.',
    'port.2.tag':   'Samsung Theme',
    'port.2.title': 'Anime Mobile Themes',
    'port.2.desc':  'Vibrant anime-inspired Samsung theme with custom icon pack.',
    'port.3.tag':   'Wallpapers',
    'port.3.title': 'AMOLED Backgrounds',
    'port.3.desc':  'Pure-black AMOLED backgrounds that save battery and look stunning.',
    'port.4.tag':   'Android App',
    'port.4.title': 'Educational Apps',
    'port.4.desc':  'Interactive learning apps for Arabic-speaking mobile users.',
    'port.5.tag':   'HTML5 Game',
    'port.5.title': 'HTML5 Games',
    'port.5.desc':  'Lightweight browser-based games optimized for mobile screens.',
    'port.6.tag':   'Icon Pack',
    'port.6.title': 'Icon Pack Collections',
    'port.6.desc':  'Cohesive icon sets for Android launchers and Samsung themes.',

    /* Why section */
    'why.title':   'Built for <span class="text-gradient-gold">Mobile-First</span> Digital Products',
    'why.1.title': 'Clean User Experience',
    'why.1.desc':  'Every app and theme we build prioritizes intuitive design. Users on Google Play and the Samsung Galaxy Store expect clean interfaces — we deliver exactly that, optimized for Android screens of all sizes.',
    'why.2.title': 'Premium Visual Style',
    'why.2.desc':  "Our visual language is sharp, modern, and premium. Whether it's mobile wallpapers for AMOLED displays, Samsung theme packages, or icon packs — every pixel is crafted with attention to mobile customization trends and user expectations.",
    'why.badge':   'Core Value',
    'why.3.title': 'Ready for Digital Stores',
    'why.3.desc':  'Products designed to meet Google Play, Samsung Galaxy Store, and digital marketplace requirements. Responsive design, proper sizing, and metadata-ready assets — built for real publishing and mobile customization communities.',

    /* Contact section */
    'contact.title':       "Let's Build Something <span class=\"text-gradient-cyan\">Mobile</span>",
    'contact.subtitle':    'For apps, wallpapers, themes, icon packs, or custom mobile design work, contact Araby Mobile Studio.',
    'contact.email.label': 'Email',
    'contact.web.label':   'Website',
    'contact.loc.label':   'Location',
    'contact.loc.value':   'Digital Studio',
    'form.name.label': 'Your Name',
    'form.name.ph':    'Enter your name',
    'form.email.label':'Email Address',
    'form.msg.label':  'Message',
    'form.msg.ph':     'Tell us about your project...',
    'form.submit':     'Send Message',

    /* Footer */
    'footer.desc':         'Premium Android apps, mobile wallpapers, Samsung themes, icon packs, and HTML5 games — built for Arabic users and global mobile audiences.',
    'footer.col.products': 'Products',
    'footer.col.company':  'Company',
    'footer.col.legal':    'Legal',
    'footer.link.apps':    'Android Apps',
    'footer.link.walls':   'Mobile Wallpapers',
    'footer.link.themes':  'Samsung Themes',
    'footer.link.icons':   'Icon Packs',
    'footer.link.games':   'HTML5 Games',
    'footer.link.home':    'Home',
    'footer.link.services':'Services',
    'footer.link.portfolio':'Portfolio',
    'footer.link.contact': 'Contact',
    'footer.link.privacy': 'Privacy Policy',
    'footer.link.terms':   'Terms of Service',
    'footer.copy':  '© 2026 Araby Mobile Studio. All rights reserved.',
    'footer.built': 'Built for the mobile-first world.',

    /* Form alert messages */
    'alert.thankyou': (name) => `Thank you, ${name}!\n\nPlease contact us directly at:\ncontact@arabymobile.com\n\nWe'll get back to you soon.`,
    'alert.fill':     'Please fill in all fields before sending.',
  },

  ar: {
    /* Nav */
    'nav.home':      'الرئيسية',
    'nav.products':  'المنتجات',
    'nav.services':  'الخدمات',
    'nav.portfolio': 'أعمالنا',
    'nav.contact':   'اتصل بنا',
    'nav.cta':       'تواصل معنا',

    /* Hero */
    'hero.badge':    'تطبيقات • خلفيات • ثيمات',
    'hero.title':    'تطبيقات أندرويد<br /><span class="text-gradient-cyan">خلفيات</span> و<span class="text-gradient-gold">ثيمات موبايل</span> احترافية',
    'hero.subtitle': 'عربي موبايل ستوديو يطور تطبيقات أندرويد حديثة، خلفيات موبايل فاخرة، ثيمات سامسونج، حزم أيقونات، وألعاب HTML5 للمستخدمين العرب والجمهور العالمي.',
    'hero.cta.primary':   'استكشف المنتجات',
    'hero.cta.secondary': 'تواصل معنا',
    'hero.trust':    'مصمم لمستخدمي أندرويد والمبدعين وعلامات المنتجات الرقمية.',

    /* Floating chips */
    'chip.themes': 'ثيمات سامسونج',
    'chip.apps':   'تطبيقات أندرويد',

    /* Stats */
    'stat.1.num':   '10+',
    'stat.1.label': 'تطبيقات وأدوات',
    'stat.1.sub':   'تطبيقات أندرويد',
    'stat.2.num':   '500+',
    'stat.2.label': 'تصاميم خلفيات',
    'stat.2.sub':   'خلفيات فاخرة',
    'stat.3.num':   '50+',
    'stat.3.label': 'أصول الثيمات',
    'stat.3.sub':   'ثيمات سامسونج',
    'stat.4.num':   '100%',
    'stat.4.label': 'جاهز للنشر الستاتيك',
    'stat.4.sub':   'ألعاب HTML5',

    /* Section tags */
    'tag.build':     'ما نبنيه',
    'tag.services':  'خدماتنا',
    'tag.portfolio': 'أعمالنا',
    'tag.edge':      'ميزتنا',
    'tag.touch':     'تواصل معنا',

    /* Products section */
    'products.title':    'منتجاتنا <span class="text-gradient-cyan">الرقمية</span>',
    'products.subtitle': 'من التطبيقات العملية إلى الأصول البصرية المذهلة — كل ما نصنعه مبني لعالم الموبايل.',
    'product.apps.title':   'تطبيقات أندرويد',
    'product.apps.desc':    'تطبيقات أندرويد خفيفة ومفيدة بواجهة نظيفة وميزات عملية.',
    'product.apps.tag':     'جاهز لـ Google Play',
    'product.walls.title':  'خلفيات الموبايل',
    'product.walls.desc':   'خلفيات فاخرة لشاشات أندرويد وشاشات AMOLED وثيمات الموبايل الحديثة.',
    'product.walls.tag':    '4K · AMOLED',
    'product.themes.title': 'ثيمات سامسونج',
    'product.themes.desc':  'ثيمات سامسونج مخصصة، حزم أيقونات، شاشات قفل وواجهات الشاشة الرئيسية.',
    'product.themes.tag':   'Galaxy Store',
    'product.icons.title':  'حزم الأيقونات',
    'product.icons.desc':   'حزم أيقونات عالية الجودة لتخصيص الموبايل والمتاجر الرقمية.',
    'product.icons.tag':    '+1000 أيقونة',
    'product.games.title':  'ألعاب HTML5',
    'product.games.desc':   'ألعاب بسيطة للمتصفح وتجارب ألعاب مناسبة للموبايل.',
    'product.games.tag':    'متصفح · موبايل',
    'product.ui.title':     'تصميم واجهات',
    'product.ui.desc':      'تصاميم واجهات حديثة للتطبيقات ولوحات التحكم والصفحات.',
    'product.ui.tag':       'موبايل أولاً',

    /* Services section */
    'services.title':    'ما يمكننا <span class="text-gradient-gold">إنشاؤه</span>',
    'services.subtitle': 'من الفكرة إلى المنتج الرقمي المصقول، يركز عربي موبايل ستوديو على التصميم النظيف والتخطيطات المحمولة أولاً والجودة البصرية الفاخرة.',
    'service.1.title': 'تصميم تطبيقات أندرويد',
    'service.1.desc':  'تطبيقات أندرويد نظيفة وبديهية بمبادئ Material Design الحديثة.',
    'service.2.title': 'إنشاء حزم الخلفيات',
    'service.2.desc':  'حزم خلفيات محسّنة لـ AMOLED وجاهزة بدقة 4K لمتاجر الموبايل.',
    'service.3.title': 'تصميم ثيمات سامسونج',
    'service.3.desc':  'حزم ثيمات كاملة لمتجر Galaxy — أيقونات، شاشة قفل، ودجات والمزيد.',
    'service.4.title': 'تصميم حزم الأيقونات',
    'service.4.desc':  'مجموعات أيقونات متسقة وفاخرة جاهزة لـ Google Play وGalaxy Store.',
    'service.5.title': 'تصميم صفحات هبوط',
    'service.5.desc':  'صفحات هبوط عالية التحويل للتطبيقات والمنتجات الرقمية.',
    'service.6.title': 'إعادة تصميم واجهات الموبايل',
    'service.6.desc':  'تحديث التطبيقات الحالية بتصميم بصري منعش وتدفقات UX أفضل.',
    'panel.badge': 'لماذا عربي موبايل؟',
    'panel.title': 'مبني لمنظومة<br /><span class="text-gradient-cyan">الموبايل</span>',
    'panel.desc':  'كل منتج نصنعه مصمم مع مراعاة Google Play Store وSamsung Galaxy Store ومستخدمي أندرويد الحديثين. نحن نفهم تصميم الموبايل أولاً بعمق.',
    'panel.li.1':  'جاهز لـ Google Play Store',
    'panel.li.2':  'متوافق مع Samsung Galaxy Store',
    'panel.li.3':  'AMOLED والاستجابة أولاً',
    'panel.li.4':  'الجمهور العربي والعالمي',
    'panel.cta':   'ابدأ مشروعاً',

    /* Portfolio section */
    'portfolio.title':    'مفاهيم <span class="text-gradient-cyan">مميزة</span>',
    'portfolio.subtitle': 'نظرة على نوع المنتجات التي نصممها ونبنيها للجماهير الموبايل حول العالم.',
    'preview.label': 'معاينة',
    'port.1.tag':   'خلفيات',
    'port.1.title': 'خلفيات فاخرة',
    'port.1.desc':  'سلسلة خلفيات فاخرة بتدرجات ذهبية لشاشات AMOLED.',
    'port.2.tag':   'ثيم سامسونج',
    'port.2.title': 'ثيمات أنيمي',
    'port.2.desc':  'ثيم سامسونج ملون مستوحى من الأنيمي مع حزمة أيقونات مخصصة.',
    'port.3.tag':   'خلفيات',
    'port.3.title': 'خلفيات AMOLED',
    'port.3.desc':  'خلفيات AMOLED سوداء نقية توفر البطارية وتبدو مذهلة.',
    'port.4.tag':   'تطبيق أندرويد',
    'port.4.title': 'تطبيقات تعليمية',
    'port.4.desc':  'تطبيقات تعلم تفاعلية للمستخدمين الناطقين بالعربية.',
    'port.5.tag':   'لعبة HTML5',
    'port.5.title': 'ألعاب HTML5',
    'port.5.desc':  'ألعاب خفيفة تعمل في المتصفح محسّنة لشاشات الموبايل.',
    'port.6.tag':   'حزمة أيقونات',
    'port.6.title': 'مجموعات الأيقونات',
    'port.6.desc':  'مجموعات أيقونات متجانسة للمشغلات وثيمات سامسونج.',

    /* Why section */
    'why.title':   'مبني للمنتجات <span class="text-gradient-gold">الرقمية المحمولة</span> أولاً',
    'why.1.title': 'تجربة مستخدم نظيفة',
    'why.1.desc':  'كل تطبيق وثيم نبنيه يُعطي الأولوية للتصميم البديهي. يتوقع مستخدمو Google Play وSamsung Galaxy Store واجهات نظيفة — نقدم ذلك بالضبط، محسّناً لشاشات أندرويد بجميع الأحجام.',
    'why.2.title': 'أسلوب بصري فاخر',
    'why.2.desc':  'لغتنا البصرية حادة وحديثة وفاخرة. سواء كانت خلفيات AMOLED أو ثيمات سامسونج أو حزم أيقونات — كل بكسل مصنوع باهتمام بتوقعات المستخدمين.',
    'why.badge':   'قيمة أساسية',
    'why.3.title': 'جاهز للمتاجر الرقمية',
    'why.3.desc':  'منتجات مصممة لتلبية متطلبات Google Play وSamsung Galaxy Store والأسواق الرقمية. تصميم متجاوب وأحجام مناسبة وأصول جاهزة للنشر الحقيقي.',

    /* Contact section */
    'contact.title':       'لنبني شيئاً <span class="text-gradient-cyan">للموبايل</span>',
    'contact.subtitle':    'للتطبيقات أو الخلفيات أو الثيمات أو حزم الأيقونات أو أعمال التصميم المخصصة، تواصل مع عربي موبايل ستوديو.',
    'contact.email.label': 'البريد الإلكتروني',
    'contact.web.label':   'الموقع الإلكتروني',
    'contact.loc.label':   'الموقع',
    'contact.loc.value':   'استوديو رقمي',
    'form.name.label':  'اسمك',
    'form.name.ph':     'أدخل اسمك',
    'form.email.label': 'البريد الإلكتروني',
    'form.msg.label':   'الرسالة',
    'form.msg.ph':      'أخبرنا عن مشروعك...',
    'form.submit':      'إرسال الرسالة',

    /* Footer */
    'footer.desc':         'تطبيقات أندرويد فاخرة، خلفيات موبايل، ثيمات سامسونج، حزم أيقونات وألعاب HTML5 — مبني للمستخدمين العرب والجماهير الموبايل العالمية.',
    'footer.col.products': 'المنتجات',
    'footer.col.company':  'الشركة',
    'footer.col.legal':    'قانوني',
    'footer.link.apps':    'تطبيقات أندرويد',
    'footer.link.walls':   'خلفيات الموبايل',
    'footer.link.themes':  'ثيمات سامسونج',
    'footer.link.icons':   'حزم الأيقونات',
    'footer.link.games':   'ألعاب HTML5',
    'footer.link.home':    'الرئيسية',
    'footer.link.services':'الخدمات',
    'footer.link.portfolio':'أعمالنا',
    'footer.link.contact': 'اتصل بنا',
    'footer.link.privacy': 'سياسة الخصوصية',
    'footer.link.terms':   'شروط الخدمة',
    'footer.copy':  '© 2026 عربي موبايل ستوديو. جميع الحقوق محفوظة.',
    'footer.built': 'مبني لعالم الموبايل أولاً.',

    /* Form alert messages */
    'alert.thankyou': (name) => `شكراً، ${name}!\n\nللتواصل المباشر:\ncontact@arabymobile.com\n\nسنرد عليك في أقرب وقت.`,
    'alert.fill':     'يرجى ملء جميع الحقول قبل الإرسال.',
  }
};


/* ================================================================
  2. i18n ENGINE — apply translations to DOM
================================================================ */

// Current active language (set during init)
let currentLang = 'en';

/**
 * Apply a language to the entire page.
 * Swaps text content, innerHTML, placeholders, dir, and font.
 */
function applyLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;

  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  /* ── Set document direction and language ── */
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');

  /* ── Apply Arabic font when RTL ── */
  document.body.style.fontFamily = isRTL
    ? "'Cairo', 'Inter', Arial, sans-serif"
    : "'Inter', Arial, sans-serif";

  /* ── Translate [data-i18n] elements (textContent) ── */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (typeof t[key] === 'string') el.textContent = t[key];
  });

  /* ── Translate [data-i18n-html] elements (innerHTML — preserves spans) ── */
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (typeof t[key] === 'string') el.innerHTML = t[key];
  });

  /* ── Translate placeholder attributes ── */
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (typeof t[key] === 'string') el.setAttribute('placeholder', t[key]);
  });

  /* ── Update toggle button label (show the OTHER language) ── */
  const label = document.getElementById('lang-label');
  if (label) label.textContent = isRTL ? 'EN' : 'AR';

  /* ── Save preference ── */
  try { localStorage.setItem('araby-lang', lang); } catch (e) {}

  /* ── Reset counter data-original so counters retranslate ── */
  document.querySelectorAll('.stat-num').forEach(el => {
    delete el.dataset.original;
  });
}


/* ================================================================
  3. LANGUAGE DETECTION
  Priority: localStorage → browser language → IP geolocation
================================================================ */

// Arabic-speaking countries (ISO 3166-1 alpha-2)
const ARABIC_COUNTRIES = new Set([
  'MA','DZ','TN','LY','EG','SD','MR','SO','DJ','KM','ER',
  'SA','AE','KW','QA','BH','OM','YE','IQ','SY','JO','LB','PS'
]);

function initLanguage() {
  // 1. Check saved preference
  let saved = null;
  try { saved = localStorage.getItem('araby-lang'); } catch(e) {}
  if (saved && TRANSLATIONS[saved]) {
    applyLanguage(saved);
    return; // Done — user's explicit choice wins
  }

  // 2. Check browser language synchronously
  const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  if (browserLang.startsWith('ar')) {
    applyLanguage('ar');
    return;
  }

  // 3. Async IP geolocation — only runs if no browser preference was Arabic
  //    Uses ipapi.co free tier (no API key needed, 1000 req/day)
  fetch('https://ipapi.co/json/')
    .then(r => r.json())
    .then(data => {
      // Only switch if user hasn't manually chosen and IP is Arabic country
      let pref = null;
      try { pref = localStorage.getItem('araby-lang'); } catch(e) {}
      if (!pref && data.country_code && ARABIC_COUNTRIES.has(data.country_code)) {
        applyLanguage('ar');
      }
    })
    .catch(() => {
      // Silently fail — default English is already showing
    });
}


/* ================================================================
  4. LANGUAGE TOGGLE BUTTON
================================================================ */
(function initLangToggle() {
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const next = currentLang === 'en' ? 'ar' : 'en';
    applyLanguage(next);
  });
})();


/* ================================================================
  5. NAVBAR: SCROLL SHADOW + ACTIVE LINK HIGHLIGHT
================================================================ */
(function initNavbar() {
  const header   = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);

    // Active link tracking
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top  = section.offsetTop;
      const h    = section.offsetHeight;
      const id   = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (link && scrollY >= top && scrollY < top + h) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Inject active link style
  const s = document.createElement('style');
  s.textContent = `.nav-link.active { color: var(--cyan); }`;
  document.head.appendChild(s);
})();


/* ================================================================
  6. MOBILE HAMBURGER MENU
================================================================ */
(function initMobileMenu() {
  const hamburger   = document.getElementById('hamburger');
  const mobileNav   = document.getElementById('mobile-nav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');

  const open  = () => { hamburger.classList.add('open'); mobileNav.classList.add('open'); hamburger.setAttribute('aria-expanded','true'); document.body.style.overflow='hidden'; };
  const close = () => { hamburger.classList.remove('open'); mobileNav.classList.remove('open'); hamburger.setAttribute('aria-expanded','false'); document.body.style.overflow=''; };

  hamburger.addEventListener('click', () => mobileNav.classList.contains('open') ? close() : open());
  mobileLinks.forEach(l => l.addEventListener('click', close));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();


/* ================================================================
  7. SCROLL FADE-IN (IntersectionObserver)
================================================================ */
(function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');

  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
})();


/* ================================================================
  8. CONTACT FORM (JS alert — GitHub Pages has no backend)
================================================================ */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const t    = TRANSLATIONS[currentLang];
    const name = document.getElementById('form-name').value.trim();
    const email= document.getElementById('form-email').value.trim();
    const msg  = document.getElementById('form-message').value.trim();

    if (!name || !email || !msg) {
      alert(t['alert.fill']);
      return;
    }
    alert(t['alert.thankyou'](name));
    form.reset();
  });
})();


/* ================================================================
  9. BACK TO TOP BUTTON
================================================================ */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 400), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();


/* ================================================================
  10. STATS COUNTER ANIMATION
================================================================ */
(function initCounters() {
  const statNums = document.querySelectorAll('.stat-num');
  if (!('IntersectionObserver' in window)) return;

  function animateCounter(el, end, suffix, duration) {
    const start = performance.now();
    (function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(end * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el  = entry.target;
      const txt = el.dataset.original || el.textContent;
      if (!el.dataset.original) el.dataset.original = txt;
      const num    = parseFloat(txt.replace(/[^0-9.]/g, ''));
      const suffix = txt.replace(/[0-9.,]/g, '').trim();
      if (!isNaN(num)) animateCounter(el, num, suffix, 1500);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => obs.observe(el));
})();


/* ================================================================
  11. SMOOTH ANCHOR SCROLL (offset for fixed header)
================================================================ */
(function initAnchors() {
  const OFFSET = 68;
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - OFFSET, behavior: 'smooth' });
    });
  });
})();


/* ================================================================
  INIT — detect and apply language on page load
================================================================ */
initLanguage();
