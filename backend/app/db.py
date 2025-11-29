# Simple file-based 'DB' for demo (JSON). Replace with Postgres in production.
import os, json
DB_FILE = os.path.join(os.getcwd(), "..", "..", "data", "db.json")
os.makedirs(os.path.dirname(DB_FILE), exist_ok=True)
if not os.path.exists(DB_FILE):
    with open(DB_FILE, "w") as f:
        json.dump({"analyses": {}}, f, indent=2)

def save_analysis(analysis):
    with open(DB_FILE, "r+") as f:
        data = json.load(f)
        data["analyses"][analysis["analysis_id"]] = analysis
        f.seek(0); f.truncate(); json.dump(data, f, indent=2)

def get_analysis(analysis_id):
    with open(DB_FILE, "r") as f:
        data = json.load(f)
        return data["analyses"].get(analysis_id)
