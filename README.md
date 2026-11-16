# DrugFinder

A standalone medication availability checker web application. Search a database of ~100 hardcoded medications and instantly see whether a drug is available — no backend, no database, no login required.

---

## Prerequisites

- [Node.js v18+](https://nodejs.org/) (includes npm)
- [VS Code](https://code.visualstudio.com/) (recommended editor)

---

## Local Setup

### 1. Download and extract the ZIP

Download `DrugFinder.zip` and extract it to a folder of your choice.

### 2. Open in VS Code

```
File → Open Folder → Select the extracted DrugFinder folder
```

### 3. Install dependencies

Open the VS Code terminal (`Ctrl + `` ` ``) and run:

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open in your browser

Visit: **http://localhost:5173**

### 6. Stop the server

Press `Ctrl + C` in the terminal.

---

## Updating the Drug Dataset

All medications are stored in `src/data/drugs.js`. To add, remove, or edit a drug:

1. Open `src/data/drugs.js`
2. Find the `drugs` array
3. Add or edit an entry like this:

```js
{ name: "DrugName", category: "B", description: "Short description" }
```

- Use `category: "A"` for DrugAssist medications
- Use `category: "B"` for general medications
- Save the file — the browser will auto-refresh

---

## Troubleshooting

| Problem | Solution |
|---|---|
| `npm: command not found` | Install Node.js from https://nodejs.org |
| Port 5173 already in use | Run `npm run dev -- --port 3000` |
| White screen in browser | Check terminal for errors; ensure `npm install` completed |
| Fonts not loading | Make sure you have an internet connection (fonts load from Google) |

---

## Build for Production

```bash
npm run build
```

Output is in the `dist/` folder. Ready for static hosting.

---

## Vercel Deployment Guide

### Step 1 — Create a Vercel account
Go to [https://vercel.com](https://vercel.com) and sign up (free tier works fine).

### Step 2 — Create a GitHub repository
1. Go to [https://github.com](https://github.com) and log in
2. Click **New repository**, name it `drugfinder`, set it to Public, click **Create**

### Step 3 — Upload the project to GitHub
In your terminal inside the project folder:
```bash
git init
git add .
git commit -m "Initial DrugFinder commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/drugfinder.git
git push -u origin main
```

### Step 4 — Import to Vercel
1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository** → Select your `drugfinder` repo
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Click **Deploy**

### Step 5 — Access your live site
Vercel will provide a URL like `https://drugfinder-abc123.vercel.app`

### Step 6 — Update after changes
1. Edit `src/data/drugs.js` locally
2. Commit and push to GitHub:
```bash
git add .
git commit -m "Updated drug dataset"
git push
```
3. Vercel automatically redeploys within ~30 seconds.

---

## Project Structure

```
DrugFinder/
├── index.html              # App entry HTML
├── vite.config.js          # Vite configuration
├── vercel.json             # Vercel deployment config
├── package.json            # Dependencies and scripts
├── README.md               # This file
└── src/
    ├── index.jsx           # React entry point
    ├── App.jsx             # Main application component
    ├── App.css             # Styles
    └── data/
        └── drugs.js        # ← All drug data lives here
```

---

## Notes

- This is a testing application only — not for clinical or prescribing use
- All data is hardcoded; no network calls are made during search
- No authentication, no backend, no database credentials required
