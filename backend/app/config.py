import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Settings:
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = "gemini-2.0-flash"  # Updated to available model
    
    # API Settings
    MAX_RETRIES: int = 3
    TIMEOUT: int = 120  # Increased to 120 seconds for comprehensive analysis
    
    # Feature Flags
    ENABLE_PLAGIARISM_CHECK: bool = True
    ENABLE_SALARY_PREDICTION: bool = True
    ENABLE_FRAUD_DETECTION: bool = True

settings = Settings()
