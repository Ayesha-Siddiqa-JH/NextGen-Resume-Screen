from pydantic import BaseModel
from typing import Any, Dict, List, Optional

class RoleMatch(BaseModel):
    role: str
    score: float
    rationale: Optional[str]

class SalaryEstimate(BaseModel):
    min: int
    median: int
    max: int
    currency: str = "INR"

class AnalyzeResponse(BaseModel):
    analysis_id: str
    created_at: Optional[str]
    fit_score: int
    ats_score: int
    radar: Dict[str, int]
    role_matches: List[RoleMatch]
    salary_estimate: SalaryEstimate
    skill_gap: List[Dict[str, Any]]
    fake_experience_flags: List[Dict[str, Any]]
    plagiarism: List[Dict[str, Any]]
    personality: Dict[str, float]
    future_projection: Dict[str, str]
    optimized_resume_url: Optional[str]
    reference_letter_url: Optional[str]
    raw_parsed: Dict[str, Any]
    llm_explanations: Optional[str]
