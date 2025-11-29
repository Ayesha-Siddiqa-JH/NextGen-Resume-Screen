# NextGen Resume Screen - 3D Enhanced Version with 11 AI Features

A stunning, futuristic resume screening application with **3D visualization**, **11 advanced AI features** powered by **FREE Google Gemini API**, and modern UI/UX.
## 🎥 Project Demo

Click to watch the full working demo:

➡️ **[Watch Demo Video](https://github.com/Ayesha-Siddiqa-JH/NextGen-Resume-Screen/releases/download/v1.0/NextGen.Resume.Screen.-.AI-Powered.Analysis.-.Personal.-.Microsoft.Edge.2025-11-29.18-34-29.mp4)**  



## ✨ Features

### 🎨 Visual Features
- **3D Animated Background** - Particle fields, animated spheres, and rotating resume document
- **Glassmorphism UI** - Modern, translucent design with blur effects
- **Smooth Animations** - Framer Motion powered transitions
- **Tabbed Interface** - Organized results across 9 tabs

### 🤖 11 AI-Powered Features (FREE with Gemini API)

1. **🧠 Personality Prediction (OCEAN Model)** - Analyzes writing patterns for Big 5 personality traits
2. **📚 Skill-Gap Analysis & Roadmap** - Identifies missing skills + personalized learning plan
3. **📊 8-Axis Radar Chart** - Comprehensive scoring (ATS, Skills, Experience, Alignment, Soft Skills, Education, Integrity, Fit)
4. **⚖️ Bias Detection & Neutralization** - Flags gender/religious/regional bias with neutral suggestions
5. **🎯 Top 5 Job Role Matches** - Reverse job matching with percentages and reasoning
6. **🛡️ Fraud Detection** - Timeline checks, duplicate content, unrealistic claims
7. **💰 Salary Prediction** - Min/Median/Max estimates based on market data
8. **📄 AI Reference Letter** - Professional reference letter generator with download
9. **💬 Soft Skills Analysis** - Leadership, teamwork, communication detection from NLP
10. **🔍 Plagiarism Check** - Originality score and suspicious section detection
11. **🚀 Career Path Projection** - 2yr/5yr career predictions with skill development priorities

## 🚀 Quick Start (Single Command!)

### Prerequisites
- Python 3.8+ (for backend)
- Node.js 16+ (for frontend)
- **FREE Gemini API Key** from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Run Everything with One Command

1. Navigate to the project root:
```bash
cd "d:\My Downloads\nextgen_resume_screen_demo"
```

2. Run the launcher:
```bash
python run.py
```

That's it! The script will:
- ✅ Start the backend server (port 8001)
- ✅ Start the frontend server (port 5173)
- ✅ Install frontend dependencies if needed
- ✅ Open your browser automatically

**Press `Ctrl+C` to stop both servers**

---

## 📖 Manual Setup (Alternative)

If you prefer to run servers separately:

### Backend Setup

1. Open a terminal:
```bash
cd backend
pip install -r app/requirements.txt
python -m uvicorn app.main:app --reload --port 8001
```

### Frontend Setup

2. Open a **new terminal**:
```bash
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
nextgen_resume_screen_demo/
├── backend/
│   └── app/
│       ├── main.py              # FastAPI application
│       ├── requirements.txt     # Python dependencies
│       ├── routers/            # API endpoints
│       └── services/           # Business logic
├── frontend/
│   ├── src/
│   │   ├── components/         # 3D React components
│   │   │   ├── AnimatedSphere.jsx
│   │   │   ├── ParticleField.jsx
│   │   │   └── ResumeDocument.jsx
│   │   ├── App.jsx             # Main application
│   │   ├── App.css             # Styling
│   │   └── api.js              # Backend communication
│   ├── package.json
│   └── vite.config.js
└── data/
    └── sample_resume.txt       # Sample resume for testing
```

## 🎨 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Backend
- **FastAPI** - Modern Python web framework
- **Uvicorn** - ASGI server
- **PDFMiner** - PDF text extraction
- **python-docx** - DOCX parsing
- **Spacy** - NLP processing

## 🎭 3D Features

- **Particle Field**: 2000 animated particles creating a starfield effect
- **Animated Spheres**: Distorted, metallic spheres with color gradients
- **Resume Document**: 3D representation that glows and rotates during scanning
- **Auto-rotating Camera**: Smooth orbital camera movement

## 🔧 Customization

### Change Colors
Edit `frontend/src/App.css` and modify the gradient colors:
```css
background: linear-gradient(135deg, #00d4ff 0%, #ff00ff 100%);
```

### Adjust 3D Elements
Edit component files in `frontend/src/components/` to modify:
- Particle count
- Sphere positions
- Animation speeds
- Colors and materials

## 📝 Notes

- The demo uses a mock LLM adapter for testing without API keys
- Results are simulated for demonstration purposes
- For production, replace the mock LLM with real OpenAI integration
- The JSON database (`data/db.json`) should be replaced with PostgreSQL for production

## 🐛 Troubleshooting

**Backend won't start:**
- Make sure you're in the `backend` directory when running uvicorn
- Check that all dependencies are installed: `pip install -r app/requirements.txt`
- If port 8001 is in use, change it in both `run.py` and `frontend/vite.config.js`

**Frontend won't start:**
- Delete `node_modules` and run `npm install` again
- Make sure you're using Node.js 16 or higher

**CORS errors:**
- Ensure backend is running on port 8001
- Check that Vite proxy is configured correctly in `vite.config.js`

**3D elements not showing:**
- Check browser console for WebGL errors
- Try a different browser (Chrome/Edge recommended)
- Update your graphics drivers

## 📄 License

This is a demo project for educational purposes.

---

**Enjoy the futuristic resume screening experience! 🚀**
