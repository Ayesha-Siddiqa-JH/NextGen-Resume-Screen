import os, asyncio

async def run_full_analysis(analysis_id: str, resume_text: str, parsed: dict, job_description: str, voice_path: str=None):
    # Mock implementation that returns realistic structured JSON
    await asyncio.sleep(0.05)
    analysis = {
        "analysis_id": analysis_id,
        "created_at": __import__('datetime').datetime.utcnow().isoformat(),
        "candidate_name": parsed.get("candidate_name") or "Unknown Candidate",
        "fit_score": 78,
        "ats_score": 65,
        "radar": {"ATS": 65, "RoleAlignment": 78, "TechnicalSkills": 70, "SoftSkills": 60, "ExperienceDepth": 72, "Integrity": 85},
        "role_matches": [{"role":"Data Analyst","score":0.92,"rationale":"Strong data projects + SQL"}],
        "salary_estimate": {"min":300000, "median":450000, "max":600000, "currency":"INR"},
        "skill_gap": [{"skill":"Deep Learning","required_level":"intermediate","suggestion":"Take a short DL project"}],
        "fake_experience_flags": [],
        "plagiarism": [],
        "personality": {"O":0.6,"C":0.7,"E":0.45,"A":0.6,"N":0.2},
        "future_projection": {"2yr":"Senior Data Analyst","5yr":"Data Science Lead"},
        "optimized_resume_url": f"/downloads/{analysis_id}_optimized.pdf",
        "reference_letter_url": f"/downloads/{analysis_id}_reference.pdf",
        "raw_parsed": parsed,
        "llm_explanations": "This is a mock explanation. Replace llm_adapter.run_full_analysis with real OpenAI calls to enable live analysis."
    }
    return analysis
