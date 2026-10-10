# 🛒 বাজার দর (BazarDor)

বাংলাদেশের প্রয়োজনীয় পণ্য — চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের বাজারদর এক নজরে দেখার ওয়েব অ্যাপ।

**Live:** _add your Vercel link_ · **Repo:** _add your GitHub link_

## Technologies
Next.js 16 (App Router) · React 19 · Tailwind CSS v4 + DaisyUI 5 · Better Auth (email/password, Google, GitHub) · MongoDB · react-hot-toast

## Key Features
1. 📈 Scrolling price ticker (▲/▼ %) + Bangla date + highlighted active category nav
2. 🔺🔻 Top 6 price risers / fallers on the home page, plus all products with search, category chips & sorting
3. 🔐 Better Auth: email/password + Google + GitHub, toast notifications, skeleton loaders
4. 🛡️ Protected product details page with min / max / average price and market-wise price table
5. ↕️ Category page with sort (default / low→high / high→low, numeric-safe), skeleton loading and 404 state
6. 👤 My Profile + update name (Better Auth `updateUser`)
7. 📱 Fully responsive (mobile, tablet, desktop)

## Getting started
```bash
npm install
cp .env.example .env.local   # fill in MongoDB + auth keys
npm run dev
```
OAuth callback URLs: `{BETTER_AUTH_URL}/api/auth/callback/google` and `/github`.

## Deploy (Vercel)
Add all variables from `.env.example` in project settings (set `BETTER_AUTH_URL` to the live URL) and redeploy.
