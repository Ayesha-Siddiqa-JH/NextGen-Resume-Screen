from fastapi import APIRouter, UploadFile, File, Form, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse, FileResponse
from uuid import uuid4
import shutil, os, datetime, json
from app.models import AnalyzeResponse
from app.services import parser
from app.services.gemini_service import gemini_service
from app.db import save_analysis, get_analysis

router = APIRouter()

STORAGE_DIR = os.path.join(os.getcwd(), "..", "..", "data", "uploads")
os.makedirs(STORAGE_DIR, exist_ok=True)

@router.post("/analyze")
async def analyze(
    background_tasks: BackgroundTasks,
    resume_file: UploadFile = File(...),
    job_description: str = Form(""),
    candidate_name: str = Form(""),
    candidate_email: str = Form(""),
    voice_file: UploadFile = File(None),
):
    analysis_id = str(uuid4())
    ts = datetime.datetime.utcnow().isoformat()
    resume_path = os.path.join(STORAGE_DIR, f"{analysis_id}_resume_{resume_file.filename}")
    with open(resume_path, "wb") as f:
        shutil.copyfileobj(resume_file.file, f)

    voice_path = None
    if voice_file:
        voice_path = os.path.join(STORAGE_DIR, f"{analysis_id}_voice_{voice_file.filename}")
        with open(voice_path, "wb") as f:
            shutil.copyfileobj(voice_file.file, f)

    try:
        extracted_text = parser.extract_text(resume_path)
        parsed = parser.parse_structure(extracted_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Parsing failed: {e}")

    # Use Gemini for comprehensive analysis
    try:
        gemini_analysis = gemini_service.analyze_resume_comprehensive(
            resume_text=extracted_text,
            candidate_name=candidate_name or "Candidate",
            candidate_email=candidate_email or "Not provided",
            job_description=job_description
        )
        
        # Build response with all 11 features
        analysis = {
            "analysis_id": analysis_id,
            "created_at": ts,
            "candidate_name": candidate_name,
            "candidate_email": candidate_email,
            
            # Feature 3: Enhanced Radar Scores
            "radar_scores": gemini_analysis.get("radar_scores", {}),
            "ats_score": gemini_analysis.get("radar_scores", {}).get("ats_score", 75),
            "fit_score": gemini_analysis.get("radar_scores", {}).get("overall_fit", 72),
            
            # Feature 1: Personality (OCEAN)
            "personality_ocean": gemini_analysis.get("personality_ocean", {}),
            
            # Feature 2: Skill Gap Analysis
            "skill_gap_analysis": gemini_analysis.get("skill_gap_analysis", {}),
            
            # Feature 4: Bias Detection
            "bias_detection": gemini_analysis.get("bias_detection", {}),
            
            # Feature 5: Top Role Matches
            "top_role_matches": gemini_analysis.get("top_role_matches", []),
            
            # Feature 6: Fraud Detection
            "fraud_detection": gemini_analysis.get("fraud_detection", {}),
            
            # Feature 7: Salary Prediction
            "salary_prediction": gemini_analysis.get("salary_prediction", {}),
            
            # Feature 8: Reference Letter
            "reference_letter": gemini_analysis.get("reference_letter", ""),
            
            # Feature 9: Soft Skills
            "soft_skills": gemini_analysis.get("soft_skills", []),
            
            # Feature 10: Plagiarism Check
            "plagiarism_check": gemini_analysis.get("plagiarism_check", {}),
            
            # Feature 11: Career Projection
            "career_projection": gemini_analysis.get("career_projection", {}),
            
            # Original parsed data
            "parsed_resume": parsed,
        }
        
    except Exception as e:
        print(f"Gemini analysis error: {e}")
        raise HTTPException(status_code=500, detail=f"AI analysis failed: {e}")

    save_analysis(analysis)
    return JSONResponse(content=analysis)

@router.get("/analysis/{analysis_id}")
async def get_analysis_route(analysis_id: str):
    result = get_analysis(analysis_id)
    if not result:
        raise HTTPException(status_code=404, detail="Not found")
    return result

@router.post("/send_email")
async def send_email(analysis_id: str = Form(...), template_type: str = Form(...)):
    # Mock email send for demo
    return {"analysis_id": analysis_id, "email_status": "sent (mock)"}

@router.delete("/analysis/{analysis_id}")
async def delete_analysis(analysis_id: str):
    # simple delete from JSON DB
    data = {}
    dbfile = os.path.join(os.getcwd(), "..", "..", "data", "db.json")
    if os.path.exists(dbfile):
        with open(dbfile, "r+") as f:
            data = json.load(f)
            if analysis_id in data.get("analyses", {}):
                del data["analyses"][analysis_id]
                f.seek(0); f.truncate(); json.dump(data, f, indent=2)
                return {"analysis_id": analysis_id, "deleted": True}
    return {"analysis_id": analysis_id, "deleted": False}
