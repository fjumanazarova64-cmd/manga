import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  uz: {
    translation: {
      nav: {
        home: 'Bosh sahifa', browse: 'Barcha manga', genres: 'Janrlar',
        topRated: 'Top baholangan', new: 'Yangi', login: 'Kirish',
        register: 'Ro\'yxatdan o\'tish', profile: 'Profil', logout: 'Chiqish',
        search: 'Manga qidiring...',
      },
      home: {
        hero: 'MANGA OLAMIGA XUSH KELIBSIZ', heroSub: 'Minglab manga, bitta joyda. O\'qing, baholang, zavqlaning.',
        trending: 'Trendda', latest: 'So\'nggi yangilanganlar', popular: 'Ommabop',
        startReading: 'O\'qishni boshlash', viewAll: 'Hammasini ko\'rish',
        chapters: 'bob', views: 'ko\'rish', rating: 'Reyting',
      },
      auth: {
        welcomeBack: 'Xush kelibsiz!', loginSub: 'Manga olamiga qayting',
        email: 'Email manzil', password: 'Parol', username: 'Foydalanuvchi nomi',
        login: 'Kirish', register: 'Ro\'yxatdan o\'tish', noAccount: 'Hisobingiz yo\'qmi?',
        haveAccount: 'Allaqachon hisobingiz bormi?', forgotPass: 'Parolni unutdingizmi?',
        createAccount: 'Hisob yaratish', orContinue: 'yoki bilan davom eting',
        loginGoogle: 'Google bilan kirish', loginGuest: 'Mehmon sifatida kirish',
        confirmPass: 'Parolni tasdiqlang', agreeTerms: 'Shartlarga roziman',
      },
      manga: {
        read: 'O\'qish', addFav: 'Sevimlilarga qo\'shish', removeFav: 'Sevimlilardan olib tashlash',
        chapter: 'Bob', status: 'Holat', ongoing: 'Davom etmoqda', completed: 'Tugagan',
        author: 'Muallif', genre: 'Janr', synopsis: 'Tavsif', comments: 'Izohlar',
        related: 'O\'xshash mangalar', noChapters: 'Boblar yo\'q', loading: 'Yuklanmoqda...',
      },
      themes: { title: 'Mavzu tanlang', crimson: 'Qizil Tun', neon: 'Neon Kiber',
        sakura: 'Sakura Orzu', gold: 'Qora Oltin', emerald: 'Zumrad Soya' },
      footer: { rights: 'Barcha huquqlar himoyalangan', about: 'Haqida',
        contact: 'Aloqa', privacy: 'Maxfiylik', terms: 'Shartlar' },
    },
  },
  ru: {
    translation: {
      nav: {
        home: 'Главная', browse: 'Все манги', genres: 'Жанры',
        topRated: 'Топ рейтинга', new: 'Новые', login: 'Войти',
        register: 'Регистрация', profile: 'Профиль', logout: 'Выйти',
        search: 'Поиск манги...',
      },
      home: {
        hero: 'ДОБРО ПОЖАЛОВАТЬ В МИР МАНГИ', heroSub: 'Тысячи манг в одном месте. Читайте, оценивайте, наслаждайтесь.',
        trending: 'В тренде', latest: 'Последние обновления', popular: 'Популярное',
        startReading: 'Начать читать', viewAll: 'Смотреть всё',
        chapters: 'глав', views: 'просмотров', rating: 'Рейтинг',
      },
      auth: {
        welcomeBack: 'С возвращением!', loginSub: 'Вернитесь в мир манги',
        email: 'Email адрес', password: 'Пароль', username: 'Имя пользователя',
        login: 'Войти', register: 'Регистрация', noAccount: 'Нет аккаунта?',
        haveAccount: 'Уже есть аккаунт?', forgotPass: 'Забыли пароль?',
        createAccount: 'Создать аккаунт', orContinue: 'или продолжить с',
        loginGoogle: 'Войти через Google', loginGuest: 'Войти как гость',
        confirmPass: 'Подтвердите пароль', agreeTerms: 'Я согласен с условиями',
      },
      manga: {
        read: 'Читать', addFav: 'В избранное', removeFav: 'Убрать из избранного',
        chapter: 'Глава', status: 'Статус', ongoing: 'Продолжается', completed: 'Завершена',
        author: 'Автор', genre: 'Жанр', synopsis: 'Описание', comments: 'Комментарии',
        related: 'Похожие манги', noChapters: 'Нет глав', loading: 'Загрузка...',
      },
      themes: { title: 'Выбор темы', crimson: 'Алая Ночь', neon: 'Неон Кибер',
        sakura: 'Сакура Мечты', gold: 'Тёмное Золото', emerald: 'Изумрудная Тень' },
      footer: { rights: 'Все права защищены', about: 'О нас',
        contact: 'Контакт', privacy: 'Конфиденциальность', terms: 'Условия' },
    },
  },
  en: {
    translation: {
      nav: {
        home: 'Home', browse: 'Browse', genres: 'Genres',
        topRated: 'Top Rated', new: 'New', login: 'Login',
        register: 'Register', profile: 'Profile', logout: 'Logout',
        search: 'Search manga...',
      },
      home: {
        hero: 'WELCOME TO MANGA WORLD', heroSub: 'Thousands of manga, one place. Read, rate, enjoy.',
        trending: 'Trending', latest: 'Latest Updates', popular: 'Popular',
        startReading: 'Start Reading', viewAll: 'View All',
        chapters: 'chapters', views: 'views', rating: 'Rating',
      },
      auth: {
        welcomeBack: 'Welcome Back!', loginSub: 'Return to the manga world',
        email: 'Email Address', password: 'Password', username: 'Username',
        login: 'Login', register: 'Register', noAccount: 'No account?',
        haveAccount: 'Already have an account?', forgotPass: 'Forgot password?',
        createAccount: 'Create Account', orContinue: 'or continue with',
        loginGoogle: 'Login with Google', loginGuest: 'Continue as Guest',
        confirmPass: 'Confirm Password', agreeTerms: 'I agree to the terms',
      },
      manga: {
        read: 'Read', addFav: 'Add to Favorites', removeFav: 'Remove from Favorites',
        chapter: 'Chapter', status: 'Status', ongoing: 'Ongoing', completed: 'Completed',
        author: 'Author', genre: 'Genre', synopsis: 'Synopsis', comments: 'Comments',
        related: 'Related Manga', noChapters: 'No chapters', loading: 'Loading...',
      },
      themes: { title: 'Choose Theme', crimson: 'Crimson Night', neon: 'Neon Cyber',
        sakura: 'Sakura Dream', gold: 'Dark Gold', emerald: 'Emerald Shadow' },
      footer: { rights: 'All rights reserved', about: 'About',
        contact: 'Contact', privacy: 'Privacy', terms: 'Terms' },
    },
  },
};

i18n.use(initReactI18next).init({
  resources, lng: localStorage.getItem('manga-lang') || 'uz',
  fallbackLng: 'en', interpolation: { escapeValue: false },
});

export default i18n;
