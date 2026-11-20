import { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('manga-coins');
    return saved !== null ? parseInt(saved) : 25; // 25 bonus coins for new users
  });

  const [vipTier, setVipTier] = useState(() => {
    return localStorage.getItem('manga-vip-tier') || 'free'; // 'free', 'pro', 'vip'
  });

  const [unlockedChapters, setUnlockedChapters] = useState(() => {
    try {
      const saved = localStorage.getItem('manga-unlocked');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    localStorage.setItem('manga-coins', coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem('manga-vip-tier', vipTier);
  }, [vipTier]);

  useEffect(() => {
    localStorage.setItem('manga-unlocked', JSON.stringify(unlockedChapters));
  }, [unlockedChapters]);

  const addCoins = (amount) => {
    setCoins((prev) => prev + amount);
  };

  const unlockChapter = (mangaId, chapterNum, price = 3) => {
    if (vipTier === 'vip') {
      // VIP users get all chapters free!
      return { success: true, message: 'VIP a\'zolik evaziga bepul ochildi!' };
    }

    const key = `${mangaId}_${chapterNum}`;
    if (unlockedChapters[key]) {
      return { success: true, message: 'Bob allaqachon ochilgan.' };
    }

    if (coins < price) {
      setPaymentModalOpen(true);
      return { success: false, message: 'Tangalar yetarli emas. Balansni to\'ldiring!' };
    }

    setCoins((prev) => prev - price);
    setUnlockedChapters((prev) => ({ ...prev, [key]: true }));
    return { success: true, message: `${price} tanga evaziga muvaffaqiyatli ochildi!` };
  };

  const isChapterUnlocked = (mangaId, chapterNum) => {
    if (vipTier === 'vip') return true;
    return !!unlockedChapters[`${mangaId}_${chapterNum}`];
  };

  const upgradeVip = (tier) => {
    setVipTier(tier);
    addCoins(tier === 'vip' ? 100 : 30);
  };

  return (
    <WalletContext.Provider
      value={{
        coins,
        addCoins,
        vipTier,
        upgradeVip,
        unlockChapter,
        isChapterUnlocked,
        paymentModalOpen,
        setPaymentModalOpen,
        selectedPlan,
        setSelectedPlan,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
