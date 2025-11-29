# 🚀 Deployment Guide for NextGen Resume Screen

This guide will help you deploy your application for **FREE** using **Render** (Backend) and **Vercel** (Frontend).

---

## 🛠️ Prerequisites

1.  **GitHub Account**: You need to push your code to a GitHub repository.
2.  **Render Account**: Sign up at [render.com](https://render.com).
3.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).

---

## 📦 Step 1: Push Code to GitHub

1.  Create a new repository on GitHub (e.g., `nextgen-resume-screen`).
2.  Push your local code to this repository:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin https://github.com/YOUR_USERNAME/nextgen-resume-screen.git
    git push -u origin main
    ```

---

## 🐍 Step 2: Deploy Backend (Render)

1.  Go to your **Render Dashboard** and click **New +** -> **Web Service**.
2.  Connect your GitHub repository.
3.  Configure the service:
    *   **Name**: `nextgen-backend`
    *   **Region**: Choose one close to you (e.g., Singapore, Frankfurt, Oregon).
    *   **Branch**: `main`
    *   **Root Directory**: `backend` (Important!)
    *   **Runtime**: `Python 3`
    *   **Build Command**: `pip install -r requirements.txt`
    *   **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
    *   **Instance Type**: `Free`
4.  **Environment Variables** (Advanced):
    *   Click "Add Environment Variable".
    *   Key: `GEMINI_API_KEY`
    *   Value: `AIzaSyCe6UYjOlCKGH_QO2VVpyz_07xJJ0HLiTU` (Your API Key)
    *   Key: `PYTHON_VERSION`
    *   Value: `3.9.0` (Optional, but good for stability)
5.  Click **Create Web Service**.
6.  Wait for deployment. Once done, copy your **Backend URL** (e.g., `https://nextgen-backend.onrender.com`).

---

## ⚛️ Step 3: Deploy Frontend (Vercel)

1.  Go to your **Vercel Dashboard** and click **Add New...** -> **Project**.
2.  Import your GitHub repository.
3.  Configure the project:
    *   **Framework Preset**: `Vite`
    *   **Root Directory**: Click `Edit` and select `frontend`.
4.  **Environment Variables**:
    *   Expand the "Environment Variables" section.
    *   Key: `VITE_API_URL`
    *   Value: `https://nextgen-backend.onrender.com/api` (Paste your Render Backend URL here and add `/api` at the end).
5.  Click **Deploy**.

---

## 🎉 Done!

Your app is now live!
*   **Frontend**: `https://nextgen-resume-screen.vercel.app` (Share this link!)
*   **Backend**: `https://nextgen-backend.onrender.com`

### 💡 Troubleshooting

*   **Backend Initial Delay**: The free tier on Render "sleeps" after inactivity. The first request might take 50 seconds to wake up. This is normal for the free tier.
*   **CORS Issues**: If you see CORS errors, ensure your Backend URL in Vercel is correct (starts with `https://` and ends with `/api`).
