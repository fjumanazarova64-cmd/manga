# 🚀 Render.com ga Deploy Qilish Bo'yicha To'liq Qo'llanma

Loyihangiz **Render.com** bepul (Free Tier) hostingiga 100% moslab sozlangan.
Frontend (React SPA) va Backend (Node.js API) bitta umumiy xizmat (Unified Web Service) sifatida ishlaydi. Bu Render bepul rejasida 1 ta servis kvotasi bilan to'liq bepul ishlashini ta'minlaydi!

---

## 1-Qadam: Loyihani GitHub'ga yuklash

Agar hali GitHub'ga yuklamagan bo'lsangiz, terminalda:

```bash
git init
git add .
git commit -m "MangaUz sayti Render deploy uchun tayyor"
git branch -M main
git remote add origin https://github.com/SIZNING_PROFIL/SIZNING_REPO.git
git push -u origin main
```

---

## 2-Qadam: Render.com da sozlash

1. [https://dashboard.render.com](https://dashboard.render.com) ga kiring.
2. Yuqori o'ng burchakdagi **"New +"** tugmasini bosing va **"Web Service"** ni tanlang.
3. GitHub hisobingizni ulab, manga repozitoriyangizni tanlang.
4. Quyidagi parametrlarni kiriting (yoki `render.yaml` orqali avtomatik to'ldiriladi):

| Parametr | Qiymati |
|---|---|
| **Name** | `mangauz` (yoki o'zingiz xohlagan nom) |
| **Language / Environment** | `Node` |
| **Region** | `Frankfurt (EU Central)` |
| **Branch** | `main` |
| **Build Command** | `npm run render-build` |
| **Start Command** | `npm start` |
| **Plan** | `Free` (0$ / bepul) |

5. Pastdagi **"Advanced"** bo'limida:
   - **Health Check Path**: `/api/health`
6. **"Deploy Web Service"** tugmasini bosing!

---

## 3-Qadam: Tayyor! 🎉

Bir necha daqiqada Render saytingizni build qiladi va sizga bepul HTTPS domen beradi:
👉 `https://mangauz.onrender.com`

- **Frontend**: `https://mangauz.onrender.com/`
- **Manga Katalogi**: `https://mangauz.onrender.com/browse`
- **VIP & To'lovlar**: `https://mangauz.onrender.com/pricing`
- **Backend API**: `https://mangauz.onrender.com/api/manga`
- **Health Check**: `https://mangauz.onrender.com/api/health`
