# Birthday Website Personalization Checklist & Guide 🎁

Welcome to your personalized digital birthday experience! All content is completely configurable from `src/config/birthdayConfig.js` and local files in `public/`.

---

## 📋 Personalization Todo List

### 1. Basic Details (`src/config/birthdayConfig.js`)
- [ ] **Profile Name**: Update `profileName: "SK Gopi"`.
- [ ] **Profile Photo**: Add your avatar image at `public/images/profile.jpg` or set `profileImage`.
- [ ] **Birthday Person Name**: Change `birthdayPerson: "My Love"`.
- [ ] **Your Name**: Change `senderName: "Your Name"`.
- [ ] **Special Nickname**: Update `specialNickname: "Sweetheart"`.
- [ ] **Birthday Date & Birth Time**: Change `birthdayDate: "YYYY-MM-DD"` and `birthTime: "HH:MM:SS"`.
- [ ] **Hero Titles**: Customize `heroTitle` and `heroSubtitle`.

---

## 🖼️ Media & Photos Checklist (`public/` directory)

Place your personal images, audio, and video files in the following folders:

```text
public/
 ├── images/
 │    ├── profile.jpg   (Chat profile picture)
 │    ├── memory1.svg   (or .jpg / .png)
 │    ├── memory2.svg
 │    ├── memory3.svg
 │    ├── memory4.svg
 │    ├── gallery1.svg  (or .jpg / .png)
 │    ├── gallery2.svg
 │    ├── gallery3.svg
 │    ├── gallery4.svg
 │    ├── gallery5.svg
 │    └── gallery6.svg
 │
 ├── music/
 │    └── our-song.mp3          (Optional background music)
 │
 ├── audio/
 │    └── voice-message.mp3     (Optional personal voice recording)
 │
 └── video/
      └── birthday-message.mp4  (Optional personal video message)
```

> **Note**: If any optional audio, video, or profile photo file is missing, the website handles it gracefully with fallback avatars/placeholders.

---

## 💌 Personal Content Sections (`src/config/birthdayConfig.js`)

- [ ] **Chat Opening Messages**: Edit `chatMessages` array.
- [ ] **Wish Response**: Edit `wishResponse`.
- [ ] **Our Story Timeline**: Update `memories` array (date, title, description, image).
- [ ] **Birth Time Countdown**: Customize `birthdayDate` & `birthTime`.
- [ ] **Memory Constellation**: Update star locations, dates, & notes in `constellation`.
- [ ] **Photo Gallery**: Update captions & dates in `gallery`.
- [ ] **Then vs Now**: Update image paths & caption in `thenNow`.
- [ ] **Places We Have Been**: Edit location pins, names, & notes in `placesVisited`.
- [ ] **10+ Reasons I Love You**: Edit `reasons` array.
- [ ] **100 Things About You**: Edit `hundredThings` array.
- [ ] **Mood Messages**: Customize responses for happy, sad, tired, angry, missing, & peaceful in `moods`.
- [ ] **Open When Notes**: Edit `openWhenMessages` array.
- [ ] **Love Quiz**: Customize questions & answers in `quiz`.
- [ ] **Mystery Boxes**: Update box titles & secret notes in `mysteryBoxes`.
- [ ] **Love Letter**: Replace `letter.body` with your handwritten personal birthday letter.
- [ ] **Secret Password**: Change `secretPassword: "love"` to any secret word.
- [ ] **Bucket List**: Edit `bucketList` items.
- [ ] **Final Birthday Message**: Customize `finalMessage`.

---

## 🚀 Running & Testing Locally

```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

## 📦 Building for Production

```bash
npm run build
```
The output will be generated in `dist/` ready for static deployment to Vercel, Netlify, or GitHub Pages.
