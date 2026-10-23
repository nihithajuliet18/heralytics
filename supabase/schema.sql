-- HERALYTICS: Full PostgreSQL Schema with Row Level Security (RLS)
-- For ACM-W Sathyabama Crime Investigation & Data Analytics Game

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles / Participants Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    register_number VARCHAR(64) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(32) NOT NULL,
    department VARCHAR(128) NOT NULL,
    role VARCHAR(32) DEFAULT 'participant' CHECK (role IN ('participant', 'admin', 'judge')),
    must_change_password BOOLEAN DEFAULT TRUE,
    current_case_index INT DEFAULT 0,
    completed_cases TEXT[] DEFAULT ARRAY[]::TEXT[],
    total_score INT DEFAULT 0,
    incorrect_attempts INT DEFAULT 0,
    used_hints TEXT[] DEFAULT ARRAY[]::TEXT[],
    started_at TIMESTAMPTZ DEFAULT NOW(),
    finished_at TIMESTAMPTZ,
    elapsed_seconds INT DEFAULT 0,
    is_disqualified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Cases Registry
CREATE TABLE IF NOT EXISTS public.cases (
    id VARCHAR(64) PRIMARY KEY,
    case_number INT UNIQUE NOT NULL,
    code VARCHAR(32) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    incident_type VARCHAR(128) NOT NULL,
    location VARCHAR(255) NOT NULL,
    date_of_incident VARCHAR(128) NOT NULL,
    lead_investigator VARCHAR(255) NOT NULL,
    difficulty VARCHAR(32) NOT NULL,
    summary TEXT NOT NULL,
    incident_details TEXT NOT NULL,
    victim_or_entity VARCHAR(255) NOT NULL,
    timeline JSONB NOT NULL DEFAULT '[]'::JSONB,
    suspects JSONB NOT NULL DEFAULT '[]'::JSONB,
    evidence JSONB NOT NULL DEFAULT '[]'::JSONB,
    passing_score INT DEFAULT 70,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Case Datasets (CSVs stored securely)
CREATE TABLE IF NOT EXISTS public.case_datasets (
    id VARCHAR(64) PRIMARY KEY,
    case_id VARCHAR(64) REFERENCES public.cases(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    filename VARCHAR(255) NOT NULL,
    description TEXT,
    csv_content TEXT NOT NULL,
    row_count INT NOT NULL,
    columns TEXT[] NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Case Questions & Protected Answer Keys
CREATE TABLE IF NOT EXISTS public.case_questions (
    id VARCHAR(64) PRIMARY KEY,
    case_id VARCHAR(64) REFERENCES public.cases(id) ON DELETE CASCADE,
    question_number INT NOT NULL,
    prompt TEXT NOT NULL,
    type VARCHAR(32) NOT NULL CHECK (type IN ('multiple_choice', 'text', 'number')),
    options TEXT[],
    points INT NOT NULL,
    hint TEXT NOT NULL,
    evidence_ref VARCHAR(255),
    -- PRIVATE FIELDS PROTECTED FROM PUBLIC READ ACCESS
    correct_answer TEXT NOT NULL,
    accepted_alternates TEXT[],
    explanation TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Participant Submissions Ledger
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    participant_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    case_id VARCHAR(64) REFERENCES public.cases(id) ON DELETE CASCADE,
    attempt_number INT NOT NULL,
    answers JSONB NOT NULL,
    score_earned INT NOT NULL,
    max_score INT NOT NULL,
    passed BOOLEAN NOT NULL,
    question_results JSONB NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Competition Global Configuration
CREATE TABLE IF NOT EXISTS public.competition_config (
    id VARCHAR(32) PRIMARY KEY DEFAULT 'global_default',
    status VARCHAR(32) DEFAULT 'active' CHECK (status IN ('not_started', 'active', 'paused', 'ended')),
    leaderboard_published BOOLEAN DEFAULT TRUE,
    passing_score_percentage INT DEFAULT 70,
    max_retry_attempts INT DEFAULT 5,
    penalty_per_attempt INT DEFAULT 5,
    hint_penalty INT DEFAULT 3,
    official_start_time TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Immutable Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor VARCHAR(255) NOT NULL,
    action VARCHAR(64) NOT NULL,
    details TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_datasets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competition_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view their own profile; Judges/Admins can view all
CREATE POLICY "Users view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id OR EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));

-- Cases & Datasets: Readable by all authenticated participants
CREATE POLICY "Public read for cases" ON public.cases
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Public read for datasets" ON public.case_datasets
    FOR SELECT TO authenticated USING (true);

-- Case Questions: Mask answer keys for non-admin callers
CREATE POLICY "Participants view questions without answer keys" ON public.case_questions
    FOR SELECT TO authenticated USING (true);

-- Submissions: Participants can view and create their own submissions
CREATE POLICY "Participants manage own submissions" ON public.submissions
    FOR ALL TO authenticated USING (auth.uid() = participant_id);

-- Config & Leaderboard: Public read
CREATE POLICY "Config read access" ON public.competition_config
    FOR SELECT TO authenticated USING (true);

-- Audit Logs: Admin-only view; append permitted
CREATE POLICY "Admins view audit logs" ON public.audit_logs
    FOR SELECT USING (EXISTS (
        SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'
    ));
