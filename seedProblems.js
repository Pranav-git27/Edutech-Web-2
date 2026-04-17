const fs = require('fs');

function generateSQLSeed() {
    console.log("📖 Loading mock data from data/problems.json...");
    const rawData = fs.readFileSync('./data/problems.json');
    const problems = JSON.parse(rawData);

    let sql = `INSERT INTO public.problems (id, title, difficulty, tags, acceptance, description, examples, constraints, editorial) VALUES\n`;

    const values = problems.map((p, index) => {
        // Escape single quotes in text fields
        const title = p.title.replace(/'/g, "''");
        const difficulty = p.difficulty;
        const tags = `{${p.tags.map(t => `"${t}"`).join(',')}}`; // PostgreSQL Array format
        const acceptance = p.acceptance;
        const description = p.description.replace(/'/g, "''");
        const examples = JSON.stringify(p.examples).replace(/'/g, "''");
        const constraints = `{${p.constraints.map(c => `"${c.replace(/'/g, "''")}"`).join(',')}}`;
        const editorial = p.editorial ? p.editorial.replace(/'/g, "''") : '';

        return `(${p.id}, '${title}', '${difficulty}', '${tags}', ${acceptance}, '${description}', '${examples}', '${constraints}', '${editorial}')`;
    });

    sql += values.join(',\n') + `\nON CONFLICT (id) DO NOTHING;`;

    fs.writeFileSync('./supabase/run_seed.sql', sql);
    console.log("✅ Generated SQL seed file: supabase/run_seed.sql");
}

generateSQLSeed();
