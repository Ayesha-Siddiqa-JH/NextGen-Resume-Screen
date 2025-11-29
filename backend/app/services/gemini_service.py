"""
Google Gemini AI Service
Handles all AI-powered analysis using Gemini 1.5 Flash (FREE)
"""
import google.generativeai as genai
import json
from typing import Dict, Any, Optional
from app.config import settings
import time
import traceback

class GeminiService:
    def __init__(self):
        """Initialize Gemini AI with API key"""
        if not settings.GEMINI_API_KEY:
            print("WARNING: GEMINI_API_KEY is not set!")
        else:
            print(f"INFO: Gemini API key loaded: {settings.GEMINI_API_KEY[:20]}...")
        
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel(settings.GEMINI_MODEL)
        
    def analyze_resume_comprehensive(
        self, 
        resume_text: str, 
        candidate_name: str,
        candidate_email: str,
        job_description: str = ""
    ) -> Dict[str, Any]:
        """
        Comprehensive resume analysis with all 11 features
        Returns structured JSON with all analysis results
        """
        
        prompt = f"""
You are an expert AI recruiter analyzing a resume. Provide a comprehensive analysis with ALL of the following:

**CANDIDATE INFO:**
Name: {candidate_name}
Email: {candidate_email}

**JOB DESCRIPTION:**
{job_description if job_description else "General analysis (no specific job)"}

**RESUME TEXT:**
{resume_text[:3000]}

---

Analyze this resume and return a JSON object with the following structure:

{{
  "personality_ocean": {{
    "openness": <0-100>,
    "conscientiousness": <0-100>,
    "extraversion": <0-100>,
    "agreeableness": <0-100>,
    "neuroticism": <0-100>,
    "summary": "<brief personality summary>"
  }},
  
  "skill_gap_analysis": {{
    "missing_skills": ["skill1", "skill2"],
    "learning_roadmap": [
      {{"skill": "...", "priority": "high/medium/low", "resources": ["resource1"], "estimated_time": "..."}}
    ],
    "verified_additions": ["addition1"]
  }},
  
  "radar_scores": {{
    "ats_score": <0-100>,
    "technical_skills": <0-100>,
    "experience_level": <0-100>,
    "job_alignment": <0-100>,
    "soft_skills": <0-100>,
    "education_match": <0-100>,
    "integrity_score": <0-100>,
    "overall_fit": <0-100>
  }},
  
  "bias_detection": {{
    "detected_biases": [],
    "bias_score": <0-100>,
    "neutralized_version": "..."
  }},
  
  "top_role_matches": [
    {{"role": "Software Engineer", "match_percentage": 92, "reasoning": "Strong technical skills"}},
    {{"role": "Backend Developer", "match_percentage": 88, "reasoning": "API experience"}},
    {{"role": "Full Stack Developer", "match_percentage": 85, "reasoning": "Frontend and backend"}},
    {{"role": "DevOps Engineer", "match_percentage": 78, "reasoning": "CI/CD knowledge"}},
    {{"role": "Technical Lead", "match_percentage": 75, "reasoning": "Leadership potential"}}
  ],
  
  "fraud_detection": {{
    "risk_score": <0-100>,
    "red_flags": [],
    "timeline_analysis": "...",
    "authenticity_score": <0-100>
  }},
  
  "salary_prediction": {{
    "min": <number>,
    "median": <number>,
    "max": <number>,
    "currency": "USD",
    "factors": ["factor1"],
    "market_comparison": "..."
  }},
  
  "reference_letter": "To Whom It May Concern...",
  
  "soft_skills": [
    {{"skill": "leadership", "score": <0-100>, "evidence": "..."}}
  ],
  
  "plagiarism_check": {{
    "originality_score": <0-100>,
    "suspicious_sections": [],
    "overall_assessment": "..."
  }},
  
  "career_projection": {{
    "two_year": {{
      "likely_role": "...",
      "skills_to_develop": ["skill1"],
      "estimated_salary_range": "..."
    }},
    "five_year": {{
      "likely_role": "...",
      "skills_to_develop": ["skill1"],
      "estimated_salary_range": "..."
    }},
    "development_priorities": ["priority1"]
  }}
}}

IMPORTANT: 
1. Return ONLY valid JSON, no markdown formatting
2. Match roles to the resume content and job description
3. Be specific and realistic in your analysis
4. Use actual data from the resume
"""

        try:
            # Verify API key
            if not settings.GEMINI_API_KEY:
                print("ERROR: GEMINI_API_KEY is not set!")
                return self._get_fallback_response()
            
            print(f"DEBUG: Analyzing resume for {candidate_name}")
            print(f"DEBUG: Resume length: {len(resume_text)} chars")
            print(f"DEBUG: Job description: {job_description[:100] if job_description else 'None'}...")
            
            # Call Gemini API
            print("DEBUG: Calling Gemini API...")
            response = self.model.generate_content(prompt)
            print("DEBUG: Got response from Gemini")
            
            # Extract JSON from response
            response_text = response.text.strip()
            print(f"DEBUG: Response length: {len(response_text)} chars")
            print(f"DEBUG: First 300 chars: {response_text[:300]}")
            
            # Remove markdown code blocks if present
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.startswith("```"):
                response_text = response_text[3:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            
            response_text = response_text.strip()
            
            # Parse JSON
            print("DEBUG: Parsing JSON...")
            result = json.loads(response_text)
            print("DEBUG: Successfully parsed JSON!")
            print(f"DEBUG: Top roles: {[r['role'] for r in result.get('top_role_matches', [])[:3]]}")
            
            return result
            
        except json.JSONDecodeError as e:
            print(f"ERROR: JSON parsing failed: {e}")
            print(f"ERROR: Response (first 1000 chars): {response_text[:1000]}")
            return self._get_fallback_response()
            
        except Exception as e:
            print(f"ERROR: Gemini API error: {type(e).__name__}: {e}")
            print(f"ERROR: Traceback:\n{traceback.format_exc()}")
            return self._get_fallback_response()
    
    def _get_fallback_response(self) -> Dict[str, Any]:
        """Fallback response if API fails"""
        print("WARNING: Using fallback response - API call failed!")
        return {
            "personality_ocean": {
                "openness": 70,
                "conscientiousness": 75,
                "extraversion": 60,
                "agreeableness": 80,
                "neuroticism": 40,
                "summary": "⚠️ API ERROR - Using default values"
            },
            "skill_gap_analysis": {
                "missing_skills": ["⚠️ API ERROR - Analysis unavailable"],
                "learning_roadmap": [],
                "verified_additions": []
            },
            "radar_scores": {
                "ats_score": 75,
                "technical_skills": 70,
                "experience_level": 65,
                "job_alignment": 70,
                "soft_skills": 75,
                "education_match": 70,
                "integrity_score": 85,
                "overall_fit": 72
            },
            "bias_detection": {
                "detected_biases": [],
                "bias_score": 0,
                "neutralized_version": "⚠️ API ERROR"
            },
            "top_role_matches": [
                {"role": "⚠️ API ERROR - Default Role", "match_percentage": 85, "reasoning": "API call failed - check backend logs"}
            ],
            "fraud_detection": {
                "risk_score": 10,
                "red_flags": [],
                "timeline_analysis": "⚠️ API ERROR",
                "authenticity_score": 90
            },
            "salary_prediction": {
                "min": 60000,
                "median": 80000,
                "max": 100000,
                "currency": "USD",
                "factors": ["⚠️ API ERROR"],
                "market_comparison": "⚠️ API ERROR"
            },
            "reference_letter": "⚠️ API ERROR - Reference letter generation unavailable.",
            "soft_skills": [
                {"skill": "communication", "score": 75, "evidence": "⚠️ API ERROR"}
            ],
            "plagiarism_check": {
                "originality_score": 90,
                "suspicious_sections": [],
                "overall_assessment": "⚠️ API ERROR"
            },
            "career_projection": {
                "two_year": {
                    "likely_role": "⚠️ API ERROR",
                    "skills_to_develop": ["Check backend logs"],
                    "estimated_salary_range": "N/A"
                },
                "five_year": {
                    "likely_role": "⚠️ API ERROR",
                    "skills_to_develop": ["Check backend logs"],
                    "estimated_salary_range": "N/A"
                },
                "development_priorities": ["Fix API connection"]
            }
        }

# Global instance
gemini_service = GeminiService()
