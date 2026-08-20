# PERINTIS

**PERINTIS** is a concept for a personal-finance app: snap a receipt and it's read, categorized, and logged **automatically** — so your money stays tracked without the tedious manual entry. As a bonus, it can recommend a *kost* (boarding house) that fits your financial situation.

> A personal project — idea, design & prototype by **Gianne Angely**.

### ▶ Live prototype — https://perintis-id.vercel.app

![PERINTIS](screenshot.png)

## The idea

- **Scan struk (OCR)** — photograph a receipt; it's read and categorized on its own, no manual typing.
- **Buku kas & budget** — spending mapped in real time, with an early warning before you overspend.
- **Split bill** — split shared bills (kost utilities and the like) fairly.
- **Cari kost — _bonus_** — recommends boarding houses that match your financial condition.

## What's in this repo

- **`landing/`** — the site, one link, two pages:
  - `index.html` — the landing page (the pitch).
  - `app.html` — the interactive prototype you can actually click through.

Open `landing/index.html` locally, or just visit the live link above.

## Tech

A self-contained **web prototype** today (vanilla HTML/CSS/JS, mock data). Envisioned build: **React Native + Expo** (mobile), **Next.js + PostgreSQL** (API), and **Python** with **OpenCV + Tesseract OCR + NLP** for the receipt reading.

---

Concept, design & prototype by **Gianne Angely** · 2026
