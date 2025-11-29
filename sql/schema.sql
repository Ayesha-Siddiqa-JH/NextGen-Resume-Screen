-- Minimal SQL schema (for reference). This demo uses a JSON file as a lightweight DB.
CREATE TABLE candidates (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text, email text, created_at timestamptz DEFAULT now());
CREATE TABLE resumes (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), candidate_id uuid REFERENCES candidates(id), file_path text, text_extracted text, parsed_json jsonb, optimized_resume_path text, created_at timestamptz DEFAULT now());
CREATE TABLE analyses (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), candidate_id uuid REFERENCES candidates(id), resume_id uuid REFERENCES resumes(id), job_description text, fit_score int, ats_score int, radar jsonb, analysis_json jsonb, created_at timestamptz DEFAULT now());
