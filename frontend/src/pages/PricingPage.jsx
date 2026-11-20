import { useWallet } from '../contexts/WalletContext';
import { FiCheck, FiZap, FiShield, FiStar, FiHelpCircle } from 'react-icons/fi';
import '../styles/PricingPage.css';

export default function PricingPage() {
  const { setPaymentModalOpen, vipTier } = useWallet();

  const plans = [
    {
      name: 'Standart (Bepul)',
      price: '0 so\'m',
      desc: 'Barcha yangi boshlovchi manga ixlosmandlari uchun',
      badge: 'BEPUL',
      features: [
        'Barcha ommaviy boblarni bepul o\'qish',
        'Tanlangan 5 ta mavzu (Dark/Red/Sakura/Neon)',
        '3 tildagi interfeys (UZ, RU, EN)',
        'Oddiy o\'qish lentalari',
      ],
      isPopular: false,
      buttonText: 'Hozir foydalanilmoqda',
      disabled: true,
    },
    {
      name: 'MangaUz PRO',
      price: '29 000 so\'m / oy',
      desc: 'Haqiqiy manga sevuvchilar va tezkor o\'quvchilar uchun',
      badge: 'ENG MASHHUR',
      features: [
        'Saytdagi barcha reklamalarni o\'chirish',
        'Yangi boblar chiqishi bilan 24 soat oldin o\'qish',
        'Har oy 30 ta bonus tanga',
        'VIP maxsus o\'quvchi nishoni',
        'Yuqori sifatli (HD Ultra) sahifalar',
      ],
      isPopular: true,
      buttonText: 'PRO Ta\'rifni Tanlash',
      disabled: false,
    },
    {
      name: 'VIP ULTRA',
      price: '199 000 so\'m / yil',
      desc: 'Cheksiz erkinlik va tarjimonlar jamoasining eng faxriy a\'zosi',
      badge: 'MAKSIMAL TEJAMKORLIK',
      features: [
        'BARCHA pullik boblar CHEKSIZ bepul',
        'Hech qanday tanga sarflanmaydi',
        'Bir zumda 100 ta bonus tanga sovg\'a',
        'Mualliflar va tarjimonlar bilan yopiq VIP chat',
        'Yangi manga tarjimasini buyurtma qilish huquqi',
      ],
      isPopular: false,
      buttonText: 'VIP ULTRA Obuna Bo\'lish',
      disabled: false,
    },
  ];

  const faqs = [
    {
      q: 'Tangalar nima uchun kerak?',
      a: 'Tangalar MangaLab va rasmiy tarjimonlar tomonidan endi chiqarilgan eng so\'nggi yopiq boblarni 1-bo\'lib ochish uchun ishlatiladi.',
    },
    {
      q: 'Qanday to\'lov turlari mavjud?',
      a: 'O\'zbekistondagi barcha to\'lov tizimlari: Payme, Click Up, Uzum Bank hamda UzCard / Humo kartalari qo\'llab-quvvatlanadi.',
    },
    {
      q: 'Obunani bekor qilish mumkinmi?',
      a: 'Ha, istalgan paytda shaxsiy profilingiz orqali obunani bir bosishda bekor qilishingiz mumkin.',
    },
  ];

  return (
    <div className="pricing-page container">
      {/* Header */}
      <div className="pricing-header">
        <span className="badge badge-hot">👑 Eksklyuziv Imkoniyatlar</span>
        <h1 className="pricing-title">VIP Obuna va Tangalar</h1>
        <p className="pricing-subtitle">
          O'zingizga mos ta'rifni tanlang va eng sevimli mangalaringizni birinchilardan bo'lib zavq bilan o'qing!
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="pricing-cards-grid">
        {plans.map((p, idx) => (
          <div key={idx} className={`pricing-card ${p.isPopular ? 'popular' : ''}`}>
            {p.isPopular && <div className="popular-ribbon">{p.badge}</div>}
            <div className="card-top">
              <span className="tier-badge">{p.badge}</span>
              <h3 className="card-name">{p.name}</h3>
              <div className="card-price">{p.price}</div>
              <p className="card-desc">{p.desc}</p>
            </div>

            <ul className="card-features">
              {p.features.map((f, i) => (
                <li key={i}>
                  <FiCheck className="feature-check" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              className={`plan-btn ${p.isPopular ? 'btn-popular' : ''}`}
              onClick={() => setPaymentModalOpen(true)}
              disabled={p.disabled && vipTier === 'free'}
            >
              {p.buttonText}
            </button>
          </div>
        ))}
      </div>

      {/* Coin Top-up Banner */}
      <div className="coin-promo-box">
        <div className="coin-promo-content">
          <div className="coin-promo-icon">🟡</div>
          <div>
            <h3>Faqat tanga kerakmi?</h3>
            <p>15 000 so'mdan boshlab 50, 150 yoki 500 tangalik paketlarni istalgan vaqtda to'ldiring!</p>
          </div>
        </div>
        <button className="coin-promo-btn" onClick={() => setPaymentModalOpen(true)}>
          <FiZap /> Tangalar Xarid Qilish
        </button>
      </div>

      {/* FAQ Section */}
      <div className="pricing-faq-section">
        <h2 className="faq-title">
          <FiHelpCircle style={{ color: 'var(--primary)' }} /> Ko'p Beriladigan Savollar
        </h2>
        <div className="faq-grid">
          {faqs.map((f, i) => (
            <div key={i} className="faq-card">
              <h4>{f.q}</h4>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
