-- Supabase Schema for Coding Platform 

-- Enable 'uuid-ossp' extension to generate UUIDs if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (extends Supabase auth.users)
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    total_score INT DEFAULT 0,
    problems_solved INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Problems Table
CREATE TABLE problems (
    id SERIAL PRIMARY KEY, 
    title TEXT UNIQUE NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')) NOT NULL,
    tags TEXT[] DEFAULT '{}',
    acceptance DECIMAL(5,2) DEFAULT 0.0,
    description TEXT NOT NULL,
    examples JSONB DEFAULT '[]',
    constraints TEXT[] DEFAULT '{}',
    editorial TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Contests Table
CREATE TABLE contests (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    status TEXT CHECK (status IN ('Upcoming', 'Active', 'Past')) DEFAULT 'Upcoming',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Submissions Table
CREATE TABLE submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    problem_id INT REFERENCES problems(id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    language TEXT NOT NULL,
    verdict TEXT CHECK (verdict IN ('Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error', 'Compilation Error', 'Pending')) DEFAULT 'Pending',
    execution_time DECIMAL(10,2), -- in milliseconds
    memory_used DECIMAL(10,2), -- in kilobytes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Contest Registrations Table
CREATE TABLE contest_registrations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    contest_id INT REFERENCES contests(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    score INT DEFAULT 0,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(contest_id, user_id)
);

-- Set up Row Level Security (RLS) - Basic configuration
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE contests ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contest_registrations ENABLE ROW LEVEL SECURITY;

-- Everyone can read problems and contests
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Problems are viewable by everyone." ON problems FOR SELECT USING (true);
CREATE POLICY "Contests are viewable by everyone." ON contests FOR SELECT USING (true);

-- Submissions are only viewable by the user who created them (for now)
CREATE POLICY "Users can insert their own submissions." ON submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own submissions." ON submissions FOR SELECT USING (auth.uid() = user_id);
