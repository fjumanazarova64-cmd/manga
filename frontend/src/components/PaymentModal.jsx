import { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { FiX, FiCheck, FiZap, FiShield, FiStar } from 'react-icons/fi';
import '../styles/PaymentModal.css';

const coinPackages = [
  { id: 'coin_50', coins: 50, price: '15 000', bonus: '+5 Tanga', popular: false },
  { id: 'coin_150', coins: 150, price: '39 000', bonus: '+25 Tanga', popular: true },
  { id: 'coin_500', coins: 500, price: '99 000', bonus: '+100 Tanga', popular: false },
];

const vipPackages = [
  { id: 'vip_month', title: 'PRO Oylik', price: '29 000 so\'m/oy', tier: 'pro', features: ['Reklamasiz o\'qish', 'Barcha boblar 24 soat oldin', '30 ta bonus tanga'] },
  { id: 'vip_year', title: 'VIP ULTRA Yillik', price: '199 000 so\'m/yil', tier: 'vip', features: ['Barcha pullik boblar CHEKSIZ bepul', 'Eksklyuziv VIP nishon', '100 ta bonus tanga', 'VIP maxsus chat'] },
];

const paymentMethods = [
  { id: 'click', name: 'Click Up', icon: '🔵', color: '#0070ba' },
  { id: 'payme', name: 'Payme', icon: '🟢', color: '#00cccc' },
  { id: 'uzum', name: 'Uzum Bank', icon: '🟣', color: '#7000ff' },
  { id: 'card', name: 'UzCard / Humo', icon: '💳', color: '#ff9900' },
];

export default function PaymentModal() {
  const { paymentModalOpen, setPaymentModalOpen, addCoins, upgradeVip } = useWallet();
  const [activeTab, setActiveTab] = useState('coins'); // 'coins' or 'vip'
  const [selectedCoin, setSelectedCoin] = useState(coinPackages[1]);
  const [selectedVip, setSelectedVip] = useState(vipPackages[1]);
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!paymentModalOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (activeTab === 'coins') {
        addCoins(selectedCoin.coins);
        setSuccessMsg(`Tabriklaymiz! Hisobingizga ${selectedCoin.coins} tanga qo'shildi!`);
      } else {
        upgradeVip(selectedVip.tier);
        setSuccessMsg(`Tabriklaymiz! ${selectedVip.title} a'zoligi faollashtirildi!`);
      }
      setTimeout(() => {
        setSuccessMsg('');
        setPaymentModalOpen(false);
      }, 2200);
    }, 1500);
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal-box animate-fadeInUp">
        {/* Close Button */}
        <button className="payment-close-btn" onClick={() => setPaymentModalOpen(false)}>
          <FiX />
        </button>

        {successMsg ? (
          <div className="payment-success-view animate-fadeIn">
            <div className="success-icon-wrap">
              <FiCheck />
            </div>
            <h2>To'lov Muvaffaqiyatli!</h2>
            <p>{successMsg}</p>
          </div>
        ) : (
          <>
            <div className="payment-modal-header">
              <span className="pay-badge">⚡ Tezkor & Xavfsiz To'lov</span>
              <h2>Tangalar va VIP A'zolik</h2>
              <p>Yangi boblarni birinchilardan bo'lib o'qing va tarjimonlarni qo'llab-quvvatlang</p>
            </div>

            {/* Tab selector */}
            <div className="pay-tabs">
              <button
                className={`pay-tab ${activeTab === 'coins' ? 'active' : ''}`}
                onClick={() => setActiveTab('coins')}
              >
                🟡 Tangalar Sotib Olish
              </button>
              <button
                className={`pay-tab ${activeTab === 'vip' ? 'active' : ''}`}
                onClick={() => setActiveTab('vip')}
              >
                👑 VIP Obuna Rejalari
              </button>
            </div>

            {/* Coins Tab */}
            {activeTab === 'coins' && (
              <div className="packages-grid">
                {coinPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`package-card ${selectedCoin.id === pkg.id ? 'active' : ''}`}
                    onClick={() => setSelectedCoin(pkg)}
                  >
                    {pkg.popular && <span className="popular-badge">ENG MASHHUR</span>}
                    <div className="coin-amount">🟡 {pkg.coins} Tanga</div>
                    <span className="coin-bonus">{pkg.bonus}</span>
                    <div className="pkg-price">{pkg.price} so'm</div>
                  </div>
                ))}
              </div>
            )}

            {/* VIP Tab */}
            {activeTab === 'vip' && (
              <div className="vip-packages-grid">
                {vipPackages.map((vip) => (
                  <div
                    key={vip.id}
                    className={`vip-card ${selectedVip.id === vip.id ? 'active' : ''}`}
                    onClick={() => setSelectedVip(vip)}
                  >
                    <div className="vip-card-head">
                      <h3>{vip.title}</h3>
                      <div className="vip-card-price">{vip.price}</div>
                    </div>
                    <ul className="vip-features">
                      {vip.features.map((f, i) => (
                        <li key={i}>
                          <FiCheck style={{ color: 'var(--primary)' }} /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Payment Method Selector */}
            <div className="methods-section">
              <h4>To'lov usulini tanlang:</h4>
              <div className="methods-grid">
                {paymentMethods.map((m) => (
                  <button
                    key={m.id}
                    className={`method-btn ${selectedMethod.id === m.id ? 'active' : ''}`}
                    onClick={() => setSelectedMethod(m)}
                  >
                    <span className="method-icon">{m.icon}</span>
                    <span className="method-name">{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              className="pay-submit-btn"
              onClick={handlePay}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <span>Tranzaksiya tekshirilmoqda...</span>
              ) : (
                <span>
                  {activeTab === 'coins' ? selectedCoin.price : selectedVip.price} to'lash ({selectedMethod.name})
                </span>
              )}
            </button>
            <div className="security-note">
              <FiShield /> 100% Xavfsiz to'lov shifrlanishi (256-bit SSL)
            </div>
          </>
        )}
      </div>
    </div>
  );
}
