# BDKao 🎂

Birthday surprise website crafted with love for Kào 🌸.

Includes interactive screens, PIN lock verification, vinyl music player, scrapbook photo gallery, interactive mini-games, customizable letter, and confetti fireworks finale!

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

---

## ✨ Features & Flow

- 🔒 **PIN Lock Screen**: Secure 4-digit code unlock to start the experience with interactive sound effect triggers.
- 🎵 **Vinyl Record & Music Player**: Custom vinyl turntable UI with interactive play controls and background audio track.
- 💌 **Interactive Secret Note**: Clickable envelope modal with hidden personal messages.
- 📸 **Scrapbook Photo Gallery**: Interactive polaroid photo stack with tap-to-reveal animations.
- 📖 **Our Story Timeline**: Scrollable memory timeline cards.
- 🎂 **Interactive Cake Cutting**: Tap-to-slice birthday cake with candle blow-out effect.
- 🎁 **Surprise Gift Boxes**: Interactive gift box selection and mini-game.
- 📜 **Personal Stationery Letter**: Beautiful vintage paper styling for your main birthday letter.
- 🎉 **Confetti Fireworks Finale**: Dynamic canvas confetti explosion with celebratory typography.

---

## 🛠️ Quick Start

### Option A: Local Browser (No installation required)
Simply double-click `index.html` to open it directly in your browser.

### Option B: Local Development Server (Recommended for audio autoplay)
Using Python:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

Using Node (`npx`):
```bash
npx serve .
```

---

## ⚙️ Configuration & Customization

All personal details can be configured in a single central place inside **`js/script.js`**:

```javascript
/* ============ CONFIG — customize this per person ============ */
const CONFIG = {
  correctPin: "1107",     // Change to your 4-digit PIN code
  recipientName: "Fahimm", // Recipient's name
  senderName: "Raazik",   // Sender's name
  autoplayMusic: true
};
```

### 🔑 Environment Configuration (`.env`)
Copy `.env.example` to `.env` to keep your environment variables organized locally:

```bash
cp .env.example .env
```

### 🖼️ Adding Custom Photos

For privacy, personal photos are excluded from public Git tracking by default. To display your own custom photos on the scrapbook polaroid cards, drop your images into `assets/photos/` with the following expected file names:

| Polaroid Card | Expected File Path | Description |
| :--- | :--- | :--- |
| **Polaroid 1** (`.ph1`) | `assets/photos/p1.jpeg` | First memory photo |
| **Polaroid 2** (`.ph2`) | `assets/photos/p2.png` | Second memory photo |
| **Polaroid 3** (`.ph3`) | `assets/photos/ph3.jpeg` | Third memory photo |
| **Polaroid 4** (`.ph4`) | `assets/photos/ph4.png` | Fourth memory photo |

> 💡 **Tip:** You can also change the photo file paths or formats (`.jpg`, `.webp`) by editing `.ph1`, `.ph2`, `.ph3`, and `.ph4` classes in `css/style.css`.

### 🎵 Customizing Audio / Background Song

Place your `.mp3` audio track in `assets/audio/` and reference it in `index.html` (around line 520):

```html
<audio id="bg-music" loop>
  <source src="assets/audio/JVKE - golden hour (instrumental).mp3" type="audio/mpeg">
</audio>
```

### 🎨 Color Theme Customization

You can change the color scheme at the top of `css/style.css` in the `:root` block:

```css
:root {
  --pink: #ffb7c5;
  --gold: #d4af37;
  --rose: #e63946;
}
```

---

## 📁 Project Structure

```text
birthday-surprise/
├── index.html        # Main HTML layout & screen structure
├── css/
│   └── style.css     # Design system, animations & scrapbook theme
├── js/
│   └── script.js    # Interactive logic & central CONFIG
├── assets/
│   ├── audio/        # Background music tracks (.mp3)
│   └── photos/       # Photo gallery & graphic assets
├── .env.example      # Public environment configuration template
├── .gitignore        # Keeps private photos and .env safe
└── README.md         # Documentation
```

---

## 🚀 One-Click Free Deployment

This static web application can be deployed for free in under a minute:

- **Netlify**: Drag & drop the project folder directly into [Netlify Drop](https://app.netlify.com/drop).
- **Vercel**: Run `vercel` in your terminal or connect your GitHub repository.
- **GitHub Pages**: Go to **Settings > Pages** in your GitHub repository and select the `main` branch.

---

## 🔒 Privacy & Safety
The repository is pre-configured with a comprehensive `.gitignore` file that automatically excludes personal photos (`*.jpeg`, `*.jpg`, private assets) and `.env` credentials from being pushed to public repositories.

---

Made with ❤️ by [Raazik](https://github.com/raazix)