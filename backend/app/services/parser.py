import os, re
from pdfminer.high_level import extract_text as pdf_extract
from docx import Document

def extract_text(file_path: str) -> str:
    ext = os.path.splitext(file_path)[1].lower()
    if ext == ".pdf":
        try:
            return pdf_extract(file_path)
        except Exception:
            with open(file_path, "rb") as f:
                return f.read().decode(errors="ignore")
    elif ext in [".docx", ".doc"]:
        try:
            doc = Document(file_path)
            return "\n".join([p.text for p in doc.paragraphs])
        except Exception:
            return ""
    else:
        with open(file_path, "rb") as f:
            return f.read().decode(errors="ignore")

def parse_structure(text: str) -> dict:
    lines = [l.strip() for l in text.splitlines() if l.strip()]
    skills = []
    experience = []
    projects = []
    for i, line in enumerate(lines):
        if line.lower().startswith("skills") or "skills:" in line.lower():
            skills_line = lines[i+1] if i+1 < len(lines) else ""
            skills = [s.strip() for s in re.split(r"[,;\u2022]", skills_line) if s.strip()]
    years = re.findall(r"(20\d{2}|19\d{2})", text)
    total_years = 0
    if years:
        try:
            total_years = max([int(y) for y in years]) - min([int(y) for y in years]) if len(years) >=2 else 0
        except Exception:
            total_years = 0
    return {"raw_text": text, "skills": skills, "experience": experience, "projects": projects, "estimated_years": total_years}
