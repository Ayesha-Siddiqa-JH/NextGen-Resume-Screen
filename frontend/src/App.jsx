import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, FileText, Mail, User } from 'lucide-react';
import ParticleField from './components/ParticleField';
import ResumeDocument from './components/ResumeDocument';
import AnimatedSphere from './components/AnimatedSphere';
import FloatingOrbs from './components/FloatingOrbs';
// import StarField from './components/StarField';
import TwinklingLights from './components/TwinklingLights';
import CSSStars from './components/CSSStars';
import PersonalityChart from './components/PersonalityChart';
import EnhancedRadar from './components/EnhancedRadar';
import RoleMatchCards from './components/RoleMatchCards';
import SalaryRange from './components/SalaryRange';
import FraudIndicators from './components/FraudIndicators';
import SkillGapPanel from './components/SkillGapPanel';
import BiasReport from './components/BiasReport';
import CareerTimeline from './components/CareerTimeline';
import ReferenceLetter from './components/ReferenceLetter';
import { analyzeResume } from './api';
import './App.css';

function App() {
    const [formData, setFormData] = useState({
        candidate_name: '',
        candidate_email: '',
        job_description: '',
        resume_file: null
    });
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState(null);
    const [fileName, setFileName] = useState('');
    const [activeTab, setActiveTab] = useState('overview');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({ ...prev, resume_file: file }));
            setFileName(file.name);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsAnalyzing(true);
        setResults(null);

        const data = new FormData();
        data.append('candidate_name', formData.candidate_name);
        data.append('candidate_email', formData.candidate_email);
        data.append('job_description', formData.job_description);
        data.append('resume_file', formData.resume_file);

        try {
            const response = await analyzeResume(data);
            // Show results immediately
            setResults(response);
            setIsAnalyzing(false);
            setActiveTab('overview');
        } catch (error) {
            console.error('Analysis failed:', error);
            setIsAnalyzing(false);
            const errorMsg = error.response?.data?.detail || error.message;
            alert(`Analysis failed: ${errorMsg}\n\nPlease check:\n1. Backend is running on port 8001\n2. Gemini API key is configured in backend/.env\n3. Resume file is valid PDF/DOCX\n\nNote: First analysis may take 30-60 seconds as Gemini processes all 11 features.`);
        }
    };

    const tabs = [
        { id: 'overview', label: '📊 Overview' },
        { id: 'personality', label: '🧠 Personality' },
        { id: 'skills', label: '📚 Skills & Gaps' },
        { id: 'roles', label: '🎯 Job Matches' },
        { id: 'salary', label: '💰 Salary' },
        { id: 'fraud', label: '🛡️ Fraud Check' },
        { id: 'bias', label: '⚖️ Bias Detection' },
        { id: 'career', label: '🚀 Career Path' },
        { id: 'letter', label: '📄 Reference' }
    ];

    return (
        <div className="app">
            {/* CSS Stars Background */}
            <CSSStars />
            
            {/* Animated Background Gradient */}
            <div className="animated-bg-gradient" />
            
            {/* 3D Background */}
            <div className="canvas-container">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                    <ambientLight intensity={0.3} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#00d4ff" />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
                    <pointLight position={[0, 15, 0]} intensity={0.8} color="#00ff88" />
                    <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#00d4ff" />
                    <spotLight position={[5, -5, 5]} angle={0.2} penumbra={1} intensity={0.3} color="#ff00ff" />

                    {/* <StarField /> */}
                    <TwinklingLights />
                    <ParticleField />
                    <FloatingOrbs />
                    <ResumeDocument isScanning={isAnalyzing} />
                    <AnimatedSphere position={[-4, 2, -5]} color="#ff00ff" />
                    <AnimatedSphere position={[4, -2, -5]} color="#00d4ff" />
                    <AnimatedSphere position={[0, 3, -8]} color="#00ff88" size={0.5} />
                    <AnimatedSphere position={[-2, -3, -6]} color="#ffaa00" size={0.3} />
                    <AnimatedSphere position={[3, 4, -7]} color="#ff44ff" size={0.4} />

                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
                </Canvas>
            </div>

            {/* Main Content */}
            <div className="content">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                    className="header"
                >
                    <motion.div 
                        className="header-icon-container"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <Sparkles className="header-icon" />
                    </motion.div>
                    <h1>NextGen Resume Screen</h1>
                    <p className="header-subtitle">AI-Powered Resume Analysis with 11 Advanced Features</p>
                    <div className="feature-badges">
                        <span className="badge">🧠 AI Analysis</span>
                        <span className="badge">📊 11 Features</span>
                        <span className="badge">⚡ Real-time</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                    className="card"
                    whileHover={{ y: -5, boxShadow: "0 25px 60px rgba(0, 212, 255, 0.3)" }}
                >
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>
                                <User size={18} />
                                Candidate Name
                            </label>
                            <input
                                type="text"
                                name="candidate_name"
                                value={formData.candidate_name}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <Mail size={18} />
                                Candidate Email
                            </label>
                            <input
                                type="email"
                                name="candidate_email"
                                value={formData.candidate_email}
                                onChange={handleInputChange}
                                placeholder="john@example.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <FileText size={18} />
                                Job Description (Optional)
                            </label>
                            <textarea
                                name="job_description"
                                value={formData.job_description}
                                onChange={handleInputChange}
                                placeholder="Paste the job description here for better matching..."
                                rows="4"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <Upload size={18} />
                                Upload Resume (PDF/DOCX)
                            </label>
                            <div className="file-upload">
                                <input
                                    type="file"
                                    id="resume_file"
                                    name="resume_file"
                                    onChange={handleFileChange}
                                    accept=".pdf,.docx"
                                    required
                                />
                                <label htmlFor="resume_file" className="file-label">
                                    {fileName || 'Choose file...'}
                                </label>
                            </div>
                        </div>

                        <button type="submit" className="submit-btn" disabled={isAnalyzing}>
                            {isAnalyzing ? (
                                <>
                                    <span className="spinner"></span>
                                    Analyzing with Gemini AI... (may take 30-60s)
                                </>
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    Analyze Resume (11 Features)
                                </>
                            )}
                        </button>
                    </form>
                </motion.div>

                <AnimatePresence>
                    {results && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.6 }}
                            className="results-container"
                        >
                            {/* Tabs */}
                            <div className="tabs">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="tab-content">
                                {activeTab === 'overview' && (
                                    <div className="overview-grid">
                                        <div className="scores-summary">
                                            <div className="premium-score-badge ats-score">
                                                <div className="score-header">
                                                    <div className="score-icon">
                                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="score-title">ATS Score</div>
                                                        <div className="score-subtitle">Applicant Tracking System</div>
                                                    </div>
                                                </div>
                                                <div className="score-value-large">
                                                    <span className="score-number">{results.ats_score || 'N/A'}</span>
                                                    <span className="score-max">/100</span>
                                                </div>
                                                <div className="score-progress">
                                                    <div className="progress-ring">
                                                        <svg className="progress-svg">
                                                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8"/>
                                                            <circle 
                                                                cx="50" cy="50" r="45" 
                                                                fill="none" 
                                                                stroke="url(#gradient1)" 
                                                                strokeWidth="8"
                                                                strokeLinecap="round"
                                                                strokeDasharray={`${2 * Math.PI * 45}`}
                                                                strokeDashoffset={`${2 * Math.PI * 45 * (1 - (results.ats_score || 75) / 100)}`}
                                                                className="progress-circle"
                                                            />
                                                            <defs>
                                                                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                                                    <stop offset="0%" stopColor="#00d4ff" />
                                                                    <stop offset="100%" stopColor="#00ff88" />
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="premium-score-badge fit-score">
                                                <div className="score-header">
                                                    <div className="score-icon">
                                                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                                                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="score-title">Overall Fit</div>
                                                        <div className="score-subtitle">Job Match Analysis</div>
                                                    </div>
                                                </div>
                                                <div className="score-value-large">
                                                    <span className="score-number">{results.fit_score || 'N/A'}</span>
                                                    <span className="score-max">/100</span>
                                                </div>
                                                <div className="score-progress">
                                                    <div className="progress-ring">
                                                        <svg className="progress-svg">
                                                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8"/>
                                                            <circle 
                                                                cx="50" cy="50" r="45" 
                                                                fill="none" 
                                                                stroke="url(#gradient2)" 
                                                                strokeWidth="8"
                                                                strokeLinecap="round"
                                                                strokeDasharray={`${2 * Math.PI * 45}`}
                                                                strokeDashoffset={`${2 * Math.PI * 45 * (1 - (results.fit_score || 72) / 100)}`}
                                                                className="progress-circle"
                                                            />
                                                            <defs>
                                                                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                                                    <stop offset="0%" stopColor="#ff00ff" />
                                                                    <stop offset="100%" stopColor="#00d4ff" />
                                                                </linearGradient>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <EnhancedRadar scores={results.radar_scores} />
                                        <RoleMatchCards matches={results.top_role_matches} />
                                    </div>
                                )}

                                {activeTab === 'personality' && (
                                    <PersonalityChart personality={results.personality_ocean} />
                                )}

                                {activeTab === 'skills' && (
                                    <SkillGapPanel skillGap={results.skill_gap_analysis} />
                                )}

                                {activeTab === 'roles' && (
                                    <RoleMatchCards matches={results.top_role_matches} />
                                )}

                                {activeTab === 'salary' && (
                                    <SalaryRange salary={results.salary_prediction} />
                                )}

                                {activeTab === 'fraud' && (
                                    <FraudIndicators fraud={results.fraud_detection} />
                                )}

                                {activeTab === 'bias' && (
                                    <BiasReport bias={results.bias_detection} />
                                )}

                                {activeTab === 'career' && (
                                    <CareerTimeline projection={results.career_projection} />
                                )}

                                {activeTab === 'letter' && (
                                    <ReferenceLetter letter={results.reference_letter} />
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default App;
