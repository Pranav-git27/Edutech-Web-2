/**
 * CodeArena - Frontend Script
 * 
 * ============================================================
 * HACKATHON: BACKEND API ENDPOINTS TO IMPLEMENT
 * ============================================================
 *
 * AUTH
 *   POST /api/auth/login          { email, password } -> { token, user }
 *   POST /api/auth/signup         { username, email, password } -> { token, user }
 *   POST /api/auth/logout         {} -> {}
 *   GET  /api/auth/me             -> { user }
 *
 * PROBLEMS
 *   GET  /api/problems            ?difficulty=&tag=&status=&search=&page= -> { problems[], total }
 *   GET  /api/problems/:id        -> { problem }
 *
 * CODE EXECUTION
 *   POST /api/run-code            { problemId, language, code, testCases } -> { results[], stdout, stderr }
 *   POST /api/submit-code         { problemId, language, code } -> { status, runtime, memory, passedCases }
 *
 * SUBMISSIONS
 *   GET  /api/submissions         ?userId=&problemId=&page= -> { submissions[], total }
 *   GET  /api/submissions/:id     -> { submission }
 *
 * LEADERBOARD
 *   GET  /api/leaderboard         ?page=&limit= -> { users[], total }
 *
 * CONTESTS
 *   GET  /api/contests            -> { upcoming[], ongoing[], past[] }
 *   GET  /api/contests/:id        -> { contest }
 *   POST /api/contests/:id/register -> { success }
 *
 * USER
 *   GET  /api/user/:username      -> { profile }
 *   GET  /api/user/stats          -> { solved, streak, rating, heatmap }
 *   PUT  /api/user/profile        { bio, avatar } -> { user }
 *
 * AI HINT
 *   POST /api/ai/hint             { problemId, code, language } -> { hint }
 *
 * REALTIME (Innovation Phase)
 *   Listen to 'site_activity' table for social proof notifications.
 *
 * ============================================================
 */
const SUPABASE_URL = "https://wadsgavbqlcaqkldlgne.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhZHNnYXZicWxjYXFrbGRsZ25lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzODY4ODUsImV4cCI6MjA5MTk2Mjg4NX0.59HPo2GYB_Txwvv06PvAJPDE2K6FZcq_jaJ4GNDs07A";

// Global for Real-time
let supabaseJS = null;


// ===== DUMMY DATA =====

const DUMMY_USERS = [
  { rank: 1, username: "tourneysolver", name: "Alex Chen", solved: 847, points: 12450, rating: 2891, avatar: "AC", color: "#58a6ff" },
  { rank: 2, username: "codemaster99", name: "Priya Sharma", solved: 812, points: 11980, rating: 2754, avatar: "PS", color: "#bc8cff" },
  { rank: 3, username: "algo_wizard", name: "Marcus Lee", solved: 798, points: 11200, rating: 2701, avatar: "ML", color: "#3fb950" },
  { rank: 4, username: "devninja42", name: "Sara Kim", solved: 765, points: 10850, rating: 2634, avatar: "SK", color: "#e3b341" },
  { rank: 5, username: "bytecruncher", name: "James Wu", solved: 741, points: 10200, rating: 2589, avatar: "JW", color: "#f85149" },
  { rank: 6, username: "recursion_fan", name: "Lena Patel", solved: 720, points: 9870, rating: 2512, avatar: "LP", color: "#58a6ff" },
  { rank: 7, username: "stackoverflower", name: "Tom Nguyen", solved: 698, points: 9450, rating: 2478, avatar: "TN", color: "#bc8cff" },
  { rank: 8, username: "dp_queen", name: "Aisha Johnson", solved: 675, points: 9100, rating: 2401, avatar: "AJ", color: "#3fb950" },
  { rank: 9, username: "greedy_gopher", name: "Ryan Park", solved: 654, points: 8750, rating: 2356, avatar: "RP", color: "#e3b341" },
  { rank: 10, username: "binarysearch_pro", name: "Mei Zhang", solved: 631, points: 8400, rating: 2289, avatar: "MZ", color: "#f85149" }
];

const DUMMY_SUBMISSIONS = [
  { id: 1, problem: "Two Sum", problemId: 1, status: "Accepted", language: "Python", runtime: "52 ms", memory: "14.2 MB", time: "2 hours ago" },
  { id: 2, problem: "Valid Parentheses", problemId: 6, status: "Accepted", language: "JavaScript", runtime: "68 ms", memory: "12.8 MB", time: "5 hours ago" },
  { id: 3, problem: "Add Two Numbers", problemId: 2, status: "Wrong Answer", language: "C++", runtime: "N/A", memory: "N/A", time: "1 day ago" },
  { id: 4, problem: "Maximum Subarray", problemId: 8, status: "Accepted", language: "Java", runtime: "1 ms", memory: "44.1 MB", time: "2 days ago" },
  { id: 5, problem: "Longest Substring Without Repeating Characters", problemId: 3, status: "Runtime Error", language: "Python", runtime: "N/A", memory: "N/A", time: "3 days ago" },
  { id: 6, problem: "Climbing Stairs", problemId: 11, status: "Accepted", language: "JavaScript", runtime: "45 ms", memory: "11.9 MB", time: "4 days ago" },
  { id: 7, problem: "Median of Two Sorted Arrays", problemId: 4, status: "Time Limit Exceeded", language: "Python", runtime: "N/A", memory: "N/A", time: "5 days ago" },
  { id: 8, problem: "Merge Two Sorted Lists", problemId: 7, status: "Accepted", language: "C++", runtime: "4 ms", memory: "14.5 MB", time: "1 week ago" }
];

const DUMMY_CONTESTS = [
  { id: 1, name: "Weekly Contest 389", status: "upcoming", start: "2026-04-05T10:00:00", duration: "1h 30m", participants: 0, problems: 4 },
  { id: 2, name: "Biweekly Contest 127", status: "upcoming", start: "2026-04-07T14:00:00", duration: "1h 30m", participants: 0, problems: 4 },
  { id: 3, name: "CodeArena Spring Championship", status: "upcoming", start: "2026-04-12T09:00:00", duration: "3h 00m", participants: 0, problems: 6 },
  { id: 4, name: "Weekly Contest 388", status: "ongoing", start: "2026-04-02T10:00:00", duration: "1h 30m", participants: 8421, problems: 4 },
  { id: 5, name: "Weekly Contest 387", status: "past", start: "2026-03-26T10:00:00", duration: "1h 30m", participants: 9102, problems: 4 },
  { id: 6, name: "Biweekly Contest 126", status: "past", start: "2026-03-22T14:00:00", duration: "1h 30m", participants: 7854, problems: 4 },
  { id: 7, name: "Weekly Contest 386", status: "past", start: "2026-03-19T10:00:00", duration: "1h 30m", participants: 8765, problems: 4 }
];

const AI_HINTS = [
  "Think about what data structure allows O(1) lookups. A hash map might be your best friend here.",
  "Consider the sliding window technique — it can reduce O(n²) to O(n) for substring problems.",
  "Dynamic programming often helps when you see overlapping subproblems. Try defining dp[i] as the answer for the first i elements.",
  "Binary search works on any monotonic function, not just sorted arrays. Can you define a condition that's monotonic?",
  "For tree problems, think recursively: what does the function return for a leaf node? Build up from there.",
  "Greedy works when a locally optimal choice leads to a globally optimal solution. Can you prove that here?"
];

const CODE_TEMPLATES = {
  python: `def solution(nums, target):
    # TODO: Implement your solution
    pass

# Test your solution
print(solution([2, 7, 11, 15], 9))`,
  javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var solution = function(nums, target) {
    // TODO: Implement your solution
};

// Test your solution
console.log(solution([2, 7, 11, 15], 9));`,
  java: `class Solution {
    public int[] solution(int[] nums, int target) {
        // TODO: Implement your solution
        return new int[]{};
    }
}`,
  cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> solution(vector<int>& nums, int target) {
        // TODO: Implement your solution
        return {};
    }
};`
};

// ===== UTILITY FUNCTIONS =====

function getDifficultyClass(diff) {
  return { Easy: 'easy', Medium: 'medium', Hard: 'hard' }[diff] || 'easy';
}

function getStatusIcon(status) {
  if (status === 'solved') return '<span class="status-check" title="Solved">✓</span>';
  if (status === 'attempted') return '<span class="status-partial" title="Attempted">◐</span>';
  return '<span class="status-dash" title="Not Attempted">·</span>';
}

function getSubmissionBadge(status) {
  const map = {
    'Accepted': 'accepted',
    'Wrong Answer': 'wrong',
    'Runtime Error': 'runtime',
    'Time Limit Exceeded': 'tle'
  };
  return `<span class="badge badge-${map[status] || 'wrong'}">${status}</span>`;
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function getCountdown(isoDate) {
  const diff = new Date(isoDate) - new Date();
  if (diff <= 0) return 'Started';
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const d = Math.floor(h / 24);
  if (d > 0) return `${d}d ${h % 24}h ${m}m`;
  return `${h}h ${m}m`;
}

function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ===== NAVBAR HTML =====
const LOGO_SVG = `<svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M9 1L3 9h5l-1 6 6-8H8l1-6z"/></svg>`;

function renderNavbar(container) {
  container.innerHTML = `
    <nav class="navbar">
      <a href="index.html" class="nav-brand">
        <div class="nav-logo">${LOGO_SVG}</div>
        CodeArena
      </a>
      <div class="nav-links">
        <a href="index.html">Home</a>
        <a href="problems.html">Problems</a>
        <a href="contests.html">Contests</a>
        <a href="leaderboard.html">Leaderboard</a>
        <a href="dashboard.html">Dashboard</a>
      </div>
      <div class="nav-actions">
        <a href="login.html" class="btn btn-ghost btn-sm">Log in</a>
        <a href="signup.html" class="btn btn-primary btn-sm">Sign up</a>
      </div>
    </nav>`;
  setActiveNav();
}

// ===== FOOTER HTML =====
function renderFooter(container) {
  container.innerHTML = `
    <footer>
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="nav-brand" style="justify-content:flex-start;margin-bottom:0.6rem">
            <div class="nav-logo">${LOGO_SVG}</div> CodeArena
          </a>
          <p>A modern platform for competitive programming practice. Sharpen your skills, climb the leaderboard.</p>
        </div>
        <div class="footer-col">
          <h4>Practice</h4>
          <a href="problems.html">All Problems</a>
          <a href="problems.html?difficulty=Easy">Easy</a>
          <a href="problems.html?difficulty=Medium">Medium</a>
          <a href="problems.html?difficulty=Hard">Hard</a>
        </div>
        <div class="footer-col">
          <h4>Compete</h4>
          <a href="contests.html">Contests</a>
          <a href="leaderboard.html">Leaderboard</a>
          <a href="dashboard.html">Dashboard</a>
        </div>
        <div class="footer-col">
          <h4>Account</h4>
          <a href="login.html">Log in</a>
          <a href="signup.html">Sign up</a>
          <a href="profile.html">Profile</a>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2026 CodeArena — Built for hackathon participants. All backend APIs are stubs waiting to be implemented.</p>
      </div>
    </footer>`;
}

// ===== PROBLEMS PAGE =====
const API_URL = 'http://localhost:3000/api';

function initProblemsPage() {
  console.log("Fetching live data from Backend API...");
  fetch(`${API_URL}/problems`)
    .then(r => r.json())
    .then(response => {
      if (response.status === 'success') {
        renderProblemsTable(response.data);
      } else {
        console.error("Backend Error:", response.message);
        renderProblemsTable([]);
      }
    })
    .catch((err) => {
      console.error("Fetch failed! Is the 'node server.js' backend running?", err);
      // Fallback to static JSON file if server is offline
      fetch('data/problems.json').then(r => r.json()).then(renderProblemsTable).catch(() => renderProblemsTable([]));
    });
}

function renderProblemsTable(problems) {
  const searchEl = document.getElementById('search-input');
  const diffEl = document.getElementById('filter-difficulty');
  const tagEl = document.getElementById('filter-tag');
  const statusEl = document.getElementById('filter-status');
  const tbody = document.getElementById('problems-tbody');
  const countEl = document.getElementById('problems-count');
  let currentPage = 1;
  const perPage = 10;

  // Collect all tags
  const allTags = [...new Set(problems.flatMap(p => p.tags))].sort();
  allTags.forEach(tag => {
    const opt = document.createElement('option');
    opt.value = tag; opt.textContent = tag;
    tagEl.appendChild(opt);
  });

  function filter() {
    const q = searchEl.value.toLowerCase();
    const diff = diffEl.value;
    const tag = tagEl.value;
    const status = statusEl.value;
    return problems.filter(p => {
      if (q && !p.title.toLowerCase().includes(q)) return false;
      if (diff && p.difficulty !== diff) return false;
      if (tag && !p.tags.includes(tag)) return false;
      if (status && p.status !== status) return false;
      return true;
    });
  }

  function render() {
    const filtered = filter();
    const total = filtered.length;
    const start = (currentPage - 1) * perPage;
    const page = filtered.slice(start, start + perPage);
    countEl.textContent = `${total} problems`;

    tbody.innerHTML = page.map(p => `
      <tr>
        <td>${getStatusIcon(p.status)}</td>
        <td><a href="problem.html?id=${p.id}" class="problem-title-link">${p.id}. ${p.title}</a></td>
        <td><span class="badge badge-${getDifficultyClass(p.difficulty)}">${p.difficulty}</span></td>
        <td>${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</td>
        <td class="acceptance">${p.acceptance}%</td>
      </tr>`).join('');

    renderPagination(total, currentPage, perPage);
  }

  function renderPagination(total, page, per) {
    const pages = Math.ceil(total / per);
    const el = document.getElementById('pagination');
    if (!el) return;
    let html = '';
    if (page > 1) html += `<button class="page-btn" onclick="changePage(${page - 1})">‹</button>`;
    for (let i = Math.max(1, page - 2); i <= Math.min(pages, page + 2); i++) {
      html += `<button class="page-btn ${i === page ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }
    if (page < pages) html += `<button class="page-btn" onclick="changePage(${page + 1})">›</button>`;
    el.innerHTML = html;
  }

  window.changePage = (p) => { currentPage = p; render(); };
  [searchEl, diffEl, tagEl, statusEl].forEach(el => el.addEventListener('input', () => { currentPage = 1; render(); }));
  render();
}

// ===== PROBLEM DETAIL PAGE =====
function initProblemPage() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id')) || 1;

  fetch('data/problems.json')
    .then(r => r.json())
    .then(problems => {
      const p = problems.find(x => x.id === id) || problems[0];
      renderProblemDetail(p);
      initDiscussions(id);
    })
    .catch(() => renderProblemDetail(null));
}

function renderProblemDetail(p) {
  if (!p) return;
  document.title = `${p.title} - CodeArena`;

  // Header
  document.getElementById('problem-title').textContent = `${p.id}. ${p.title}`;
  document.getElementById('problem-difficulty').innerHTML = `<span class="badge badge-${getDifficultyClass(p.difficulty)}">${p.difficulty}</span>`;
  document.getElementById('problem-tags').innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');

  // Description
  document.getElementById('problem-description').innerHTML = `<p>${p.description}</p>`;

  // Examples
  document.getElementById('problem-examples').innerHTML = p.examples.map((ex, i) => `
    <div class="example-block">
      <div class="label">Example ${i + 1}</div>
      <code><strong>Input:</strong> ${ex.input}</code><br>
      <code><strong>Output:</strong> ${ex.output}</code>
      ${ex.explanation ? `<br><code><strong>Explanation:</strong> ${ex.explanation}</code>` : ''}
    </div>`).join('');

  // Constraints
  document.getElementById('problem-constraints').innerHTML =
    `<ul class="constraints-list">${p.constraints.map(c => `<li><code>${c}</code></li>`).join('')}</ul>`;

  // Editorial
  document.getElementById('problem-editorial').innerHTML = `<p style="color:var(--text-secondary)">${p.editorial}</p>`;

  // Set default code
  const editor = document.getElementById('code-editor');
  if (editor) editor.value = CODE_TEMPLATES.python;
}

// ===== TABS =====
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('[data-tab-group]') || btn.closest('.problem-tabs, .problem-left');
      const target = btn.dataset.tab;
      const allBtns = group ? group.querySelectorAll('.tab-btn') : document.querySelectorAll('.tab-btn');
      const allContents = document.querySelectorAll('.tab-content');
      allBtns.forEach(b => b.classList.remove('active'));
      allContents.forEach(c => { if (c.dataset.tab === target) c.classList.add('active'); else c.classList.remove('active'); });
      btn.classList.add('active');
    });
  });
}

// ===== LANGUAGE SELECTOR =====
function initLanguageSelector() {
  const sel = document.getElementById('lang-select');
  const editor = document.getElementById('code-editor');
  if (!sel || !editor) return;
  sel.addEventListener('change', () => {
    editor.value = CODE_TEMPLATES[sel.value] || '';
  });
}

// ===== RUN / SUBMIT =====
function initCodeActions() {
  const runBtn = document.getElementById('run-btn');
  const submitBtn = document.getElementById('submit-btn');
  const output = document.getElementById('console-output');

  // Helper auth check function
  const getAuthHeader = () => {
    const sessionStr = localStorage.getItem('sb-session');
    if (!sessionStr) return null;
    try { return JSON.parse(sessionStr).access_token; } catch { return null; }
  };

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      output.innerHTML = '<span class="out-info">Running mock test cases... </span>';
      setTimeout(() => {
        output.innerHTML = `
          <span class="out-success">✓ Test case 1 passed</span><br>
          <span class="out-info">Mock local engine executed. Click Submit to save to DB!</span>`;
      }, 600);
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const token = getAuthHeader();
      if (!token) {
        output.innerHTML = '<span class="out-error" style="color:var(--red); font-weight:bold;">Security Warning:<br>Please Log In or Sign Up first to submit code!</span>';
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const problemId = parseInt(params.get('id')) || 1;
      const language = document.getElementById('lang-select').value;
      const code = document.getElementById('code-editor').value;

      output.innerHTML = '<span class="out-info">Securely evaluating via Express API inside Node.js...</span>';

      fetch(`${API_URL || 'http://localhost:3000/api'}/submit-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ problemId, language, code })
      })
        .then(r => r.json())
        .then(res => {
          if (res.status === 'success') {
            const o = res.data;
            const color = o.verdict === 'Accepted' ? 'var(--green)' : 'var(--red)';
            output.innerHTML = `
                <span style="color:${color}; font-weight: bold; font-size: 1.2rem">${o.verdict}</span><br>
                <span class="out-info">Runtime: ${o.execution_time}ms · Memory: ${o.memory_used} MB</span><br>
                <span class="out-info" style="color:#d29e3a;">Result seamlessly stored inside Supabase [Submissions] Table! Points Updated.</span>`;
          } else {
            output.innerHTML = `<span class="out-error" style="color:var(--red)">Authentication/Eval Error: ${res.message}</span>`;
          }
        })
        .catch(err => {
          output.innerHTML = `<span class="out-error" style="color:var(--red)">Server network failure.</span>`;
        });
    });
  }
}

// ===== AI HINT =====
function initAIHint() {
  const btn = document.getElementById('ai-hint-btn');
  const panel = document.getElementById('ai-hint-panel');
  const hintText = document.getElementById('hint-text');
  const newHintBtn = document.getElementById('new-hint-btn');
  if (!btn || !panel) return;

  const fetchHint = () => {
    hintText.textContent = "AI is analyzing your code snippet...";
    fetch(`${API_URL || 'http://localhost:3000/api'}/ai/hint`, { method: 'POST' })
      .then(r => r.json())
      .then(res => {
        if (res.status === 'success') hintText.textContent = res.data;
        else hintText.textContent = "AI Engine offline.";
      }).catch(() => hintText.textContent = "Network Error.");
  };

  btn.addEventListener('click', () => {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) fetchHint();
  });

  if (newHintBtn) {
    newHintBtn.addEventListener('click', fetchHint);
  }

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== btn) panel.classList.remove('open');
  });
}

// ===== LEADERBOARD =====
function initLeaderboard() {
  const tbody = document.getElementById('leaderboard-tbody');
  const podium = document.getElementById('top3-podium');
  const searchInput = document.getElementById('leaderboard-search');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const pageBtns = document.querySelectorAll('.page-btn');

  if (!tbody) return;

  let currentPage = 1;
  let currentSearch = '';

  const renderPodium = (top3) => {
    if (!podium || top3.length === 0) return;
    const getBox = (u, rank) => {
      if (!u) return `<div style="flex:1;max-width:150px"></div>`;
      const isGold = rank === 1;
      const height = rank === 1 ? 100 : rank === 2 ? 72 : 52;
      const clr = rank === 1 ? '#d4a017' : rank === 2 ? '#9ba3af' : '#a0714f';
      const rClass = rank === 1 ? 'rank-gold' : rank === 2 ? 'rank-silver' : 'rank-bronze';
      return `
          <div style="text-align:center;flex:1;max-width:${isGold ? 170 : 150}px">
            <div class="avatar" style="width:${isGold ? 64 : 52}px;height:${isGold ? 64 : 52}px;font-size:${isGold ? 1.35 : 1.1}rem;margin:0 auto 0.5rem;background:${clr}18;color:${clr}">${u.username.substring(0, 2).toUpperCase()}</div>
            <div style="font-weight:700;font-size:${isGold ? 0.95 : 0.875}rem;letter-spacing:-0.01em">${u.username}</div>
            <div style="color:var(--text-muted);font-size:0.75rem;margin-bottom:0.75rem">${u.total_score || 0} pts</div>
            <div style="background:var(--bg-secondary);border:1px solid ${clr}33;border-radius:var(--radius-sm) var(--radius-sm) 0 0;height:${height}px;display:flex;align-items:center;justify-content:center">
              <span class="${rClass}" style="font-size:${isGold ? 1.5 : 1.25}rem;font-weight:800">${rank}</span>
            </div>
          </div>`;
    };

    // HTML ordering puts the 2nd place array first, then 1st, then 3rd
    podium.innerHTML = getBox(top3[1], 2) + getBox(top3[0], 1) + getBox(top3[2], 3);
  };

  const loadLeaderboard = () => {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;">Fetching Live Global Data...</td></tr>';
    fetch(`${API_URL || 'http://localhost:3000/api'}/leaderboard?page=${currentPage}&search=${currentSearch}`)
      .then(r => r.json())
      .then(res => {
        if (res.status === 'success' && res.data.length > 0) {
          // Instantly overwrite massive 3D podium if no search constraints match Page 1
          if (currentPage === 1 && !currentSearch) renderPodium(res.data.slice(0, 3));

          tbody.innerHTML = res.data.map((u, i) => {
            const absRank = ((currentPage - 1) * 10) + i;
            const rankClass = absRank === 0 ? 'rank-gold' : absRank === 1 ? 'rank-silver' : absRank === 2 ? 'rank-bronze' : 'rank-num';
            return `
                      <tr>
                        <td><span class="${rankClass}">${absRank + 1}</span></td>
                        <td>
                          <div class="user-cell">
                            <div class="avatar" style="background:#58a6ff18;color:#58a6ff">${u.username.substring(0, 2).toUpperCase()}</div>
                            <div><div style="font-weight:600;font-size:0.875rem">${u.username}</div></div>
                          </div>
                        </td>
                        <td style="font-weight:600;font-variant-numeric:tabular-nums">${u.problems_solved || 0}</td>
                        <td style="color:var(--accent);font-weight:600;font-variant-numeric:tabular-nums">${u.total_score || 0}</td>
                        <td>
                          <div class="rating-display">
                            <div class="rating-bar-track"><div class="rating-bar-fill" style="width:100%"></div></div>
                            <span style="font-weight:700;color:var(--purple);font-variant-numeric:tabular-nums">${(u.total_score || 0) * 8}</span>
                          </div>
                        </td>
                      </tr>`;
          }).join('');
        } else {
          tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;">No users found in standard database matching search rules.</td></tr>';
          if (currentPage === 1 && currentSearch && podium) podium.innerHTML = '';
        }
      }).catch(err => tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--red)">Network Routing failed.</td></tr>');
  };

  // 1. Search Logic
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      currentPage = 1;
      loadLeaderboard();
    });
  }

  // 2. Filter Buttons Logic
  filterBtns.forEach(b => {
    b.addEventListener('click', () => {
      filterBtns.forEach(x => { x.classList.remove('btn-primary'); x.classList.add('btn-ghost'); });
      b.classList.remove('btn-ghost'); b.classList.add('btn-primary');
      currentPage = 1;
      loadLeaderboard();
    });
  });

  // 3. Pagination Logic
  pageBtns.forEach(b => {
    b.addEventListener('click', () => {
      const p = b.dataset.page;
      pageBtns.forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      if (p === 'next') currentPage++; else currentPage = parseInt(p);
      loadLeaderboard();
    });
  });

  // Explicit initialization trigger
  loadLeaderboard();
}

// ===== SUBMISSIONS PAGE =====
function initSubmissionsPage() {
  const tbody = document.getElementById('submissions-tbody');
  if (!tbody) return;

  fetch(`${API_URL || 'http://localhost:3000/api'}/submissions`)
    .then(r => r.json())
    .then(res => {
      if (res.status === 'success' && res.data.length > 0) {
        tbody.innerHTML = res.data.map(s => `
                <tr>
                  <td><a href="problem.html?id=${s.problem_id}" style="color:var(--accent)">${s.problems?.title || 'Unknown Issue'}</a></td>
                  <td>${getSubmissionBadge(s.verdict)}</td>
                  <td><span class="tag">${s.language}</span></td>
                  <td style="color:var(--text-secondary)">${s.execution_time || 0} ms</td>
                  <td style="color:var(--text-secondary)">${s.memory_used || 0} MB</td>
                  <td style="color:var(--text-muted);font-size:0.8rem">${formatDate(s.created_at)}</td>
                </tr>`).join('');
      } else {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">No active submissions exist. Write some code!</td></tr>';
      }
    })
    .catch(() => tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:var(--red)">Failed to fetch submissions.</td></tr>');
}

// ===== CONTESTS PAGE =====
function initContestsPage() {
  fetch(`${API_URL || 'http://localhost:3000/api'}/contests`)
    .then(r => r.json())
    .then(res => {
      if (res.status === 'success' && res.data) {
        ['Upcoming', 'Active', 'Past'].forEach(type => {
          const el = document.getElementById(`${type.toLowerCase()}-contests`);
          if (!el) return;
          const list = res.data.filter(c => c.status === type);
          el.innerHTML = list.map(c => {
            const pillClass = { Upcoming: 'pill-upcoming', Active: 'pill-ongoing', Past: 'pill-past' }[c.status];
            const pillLabel = { Upcoming: 'Upcoming', Active: 'Live', Past: 'Ended' }[c.status];
            const liveDot = c.status === 'Active' ? '<span class="live-dot"></span>' : '';
            return `
                  <div class="contest-card">
                    <div class="contest-status-pill ${pillClass}">${liveDot}${pillLabel}</div>
                    <div class="contest-name">${c.title}</div>
                    <div class="contest-meta">
                      <span class="contest-meta-item"><span class="contest-meta-icon">★</span>${formatDate(c.start_time)}</span>
                      <span class="contest-meta-item">Ranked</span>
                    </div>
                    ${c.status === 'Upcoming' ? `<div class="countdown-text" id="cd-${c.id}">Starts very soon!</div>` : ''}
                    <div style="margin-top:1rem;display:flex;gap:0.6rem">
                      ${c.status === 'Upcoming' ? `<button class="btn btn-primary btn-sm" onclick="registerContest(${c.id})">Register</button>` : ''}
                      ${c.status === 'Active' ? `<button class="btn btn-success btn-sm" onclick="enterContest(${c.id})">Enter Contest</button>` : ''}
                      ${c.status === 'Past' ? `<button class="btn btn-ghost btn-sm">View Results</button>` : ''}
                      <button class="btn btn-ghost btn-sm" onclick="viewContestDetails(${c.id})">Details</button>
                    </div>
                  </div>`}).join('');
        });
      }
    }).catch(console.error);
}

window.viewContestDetails = (id) => {
  fetch(`${API_URL || 'http://localhost:3000/api'}/contests`)
    .then(r => r.json())
    .then(res => {
      if (res.status === 'success') {
        const c = res.data.find(x => x.id === id);
        if (c) {
          alert(`🏆 CONTEST INFO: ${c.title}\n\nStatus: ${c.status}\nDuration: 1.5 Hours\n\n📌 ABOUT THIS EVENT:\n${c.description || 'No description assigned yet.'}`);
        }
      }
    });
};

window.registerContest = (id) => {
  const sessionStr = localStorage.getItem('sb-session');
  if (!sessionStr) return alert("Security Warning: You must log in first to save your Registration to the Database!");

  fetch(`${API_URL || 'http://localhost:3000/api'}/contests/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${JSON.parse(sessionStr).access_token}`
    },
    body: JSON.stringify({ contestId: id })
  }).then(r => r.json()).then(data => {
    if (data.status === 'success') alert(`Success! You have officially registered for Contest #${id}. Check the Database!`);
    else alert(`Registration Error: ${data.message}`);
  });
};

window.enterContest = (id) => {
  alert(`Redirecting you to Live Contest #${id}...`);
  window.location.href = 'problems.html'; // Route competitors to problems arena
};

// ===== DASHBOARD =====
function initDashboard() {
  const sessionStr = localStorage.getItem('sb-session');
  const board = document.getElementById('admin-board');
  const welcome = document.getElementById('dash-welcome-user');

  if (sessionStr) {
    try {
      const { user } = JSON.parse(sessionStr);
      if (welcome) welcome.textContent = user.user_metadata?.username || user.email.split('@')[0];

      // We show the Admin board for ALL users in this demo/hackathon version as a "Platform Stats" feature
      if (board) board.style.display = 'block';
    } catch (e) { }
  }

  // Fetch Live Admin Stats
  fetch(`${API_URL || 'http://localhost:3000/api'}/admin/stats`)
    .then(r => r.json())
    .then(res => {
      if (res.status === 'success') {
        const d = res.data;
        if (document.getElementById('admin-total-users')) document.getElementById('admin-total-users').textContent = d.totalUsers.toLocaleString();
        if (document.getElementById('admin-total-submissions')) document.getElementById('admin-total-submissions').textContent = d.totalSubmissions.toLocaleString();
        if (document.getElementById('admin-total-problems')) document.getElementById('admin-total-problems').textContent = d.totalProblems.toLocaleString();
      }
    });

  renderHeatmap();
  renderMiniCharts();
}

function renderHeatmap() {
  const el = document.getElementById('heatmap');
  if (!el) return;
  const levels = ['', 'l1', 'l2', 'l3', 'l4'];
  let html = '';
  for (let i = 0; i < 364; i++) {
    const r = Math.random();
    const lvl = r > 0.85 ? 'l4' : r > 0.7 ? 'l3' : r > 0.55 ? 'l2' : r > 0.4 ? 'l1' : '';
    html += `<div class="heatmap-cell ${lvl}" title="Day ${i + 1}"></div>`;
  }
  el.innerHTML = html;
}

function renderMiniCharts() {
  const el = document.getElementById('mini-chart');
  if (!el) return;
  const vals = [20, 45, 30, 60, 40, 80, 55, 70, 90, 65, 85, 100];
  el.innerHTML = vals.map(v => `<div class="bar" style="height:${v}%"></div>`).join('');
}

// ===== AUTH FORMS =====
function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    showFormMessage('login-msg', 'Authenticating...', 'info');

    fetch(`${API_URL || 'http://localhost:3000/api'}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(r => r.json())
      .then(data => {
        if (data.status === 'success') {
          showFormMessage('login-msg', 'Login successful! Redirecting...', 'success');
          localStorage.setItem('sb-session', JSON.stringify(data.session));
          setTimeout(() => window.location.href = 'problems.html', 1000);
        } else {
          showFormMessage('login-msg', data.message, 'error');
        }
      })
      .catch(err => showFormMessage('login-msg', 'Server connection failed.', 'error'));
  });
}

function initSignupForm() {
  const form = document.getElementById('signup-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm-password').value;

    if (password !== confirm) {
      showFormMessage('signup-msg', 'Passwords do not match.', 'error');
      return;
    }

    showFormMessage('signup-msg', 'Creating your account...', 'info');

    fetch(`${API_URL || 'http://localhost:3000/api'}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username })
    })
      .then(r => r.json())
      .then(data => {
        if (data.status === 'success') {
          showFormMessage('signup-msg', 'Account created! Redirecting...', 'success');
          localStorage.setItem('sb-session', JSON.stringify(data.session));
          setTimeout(() => window.location.href = 'problems.html', 1500);
        } else {
          showFormMessage('signup-msg', data.message, 'error');
        }
      })
      .catch(err => showFormMessage('signup-msg', 'Server connection failed.', 'error'));
  });
}

function showFormMessage(id, msg, type) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.style.color = type === 'error' ? 'var(--red)' : type === 'success' ? 'var(--green)' : 'var(--accent)';
  el.style.display = 'block';
}

// ===== REAL-TIME INNOVATION ENGINE =====
function initInnovationEngine() {
  if (typeof supabase === 'undefined') {
    // Dynamically load Supabase script if not present
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
    s.onload = setupRealtime;
    document.head.appendChild(s);
  } else {
    setupRealtime();
  }
}

function setupRealtime() {
  try {
    const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Create Toast Container
    if (!document.querySelector('.toast-container')) {
      const container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    // Subscribe to site_activity
    client
      .channel('site_activity_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'site_activity' }, payload => {
        const activity = payload.new;
        showActivityToast(activity);
      })
      .subscribe();

    console.log("📡 Real-time Innovation Engine Active!");
  } catch (err) {
    console.warn("Real-time init failed:", err);
  }
}

function showActivityToast(activity) {
  const container = document.querySelector('.toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';

  const iconMap = {
    'USER_SIGNUP': '👤',
    'USER_LOGIN': '🔑',
    'PROBLEM_SOLVED': '✅',
    'CONTEST_REGISTER': '🏆'
  };

  const titleMap = {
    'USER_SIGNUP': 'New Rival Joined!',
    'USER_LOGIN': 'Student Online',
    'PROBLEM_SOLVED': 'Challenge Conquered!',
    'CONTEST_REGISTER': 'Contest Signup',
    'DISCUSSION_POST': 'New Discussion'
  };

  const msgMap = {
    'USER_SIGNUP': `New student joined from ${activity.user_email}!`,
    'USER_LOGIN': `${activity.user_email} logged back in to practice.`,
    'PROBLEM_SOLVED': `Hooray! ${activity.user_email} just solved a problem.`,
    'CONTEST_REGISTER': `Get ready! ${activity.user_email} registered for a contest.`,
    'DISCUSSION_POST': `${activity.user_email} posted a new thought.`
  };

  const icon = iconMap[activity.event_type] || '⚡';
  const title = titleMap[activity.event_type] || 'Live Update';
  const msg = msgMap[activity.event_type] || 'Something exciting just happened!';

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${msg}</div>
    </div>
  `;

  container.appendChild(toast);

  // Auto remove after 5s
  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

function initDiscussions(problemId) {
  const list = document.getElementById('discussion-list');
  const input = document.getElementById('discussion-input');
  const btn = document.getElementById('post-discussion-btn');
  const msg = document.getElementById('discussion-msg');

  if (!list || !btn) return;

  const fetchDiscussions = () => {
    fetch(`${API_URL}/problems/${problemId}/discussions`)
      .then(r => r.json())
      .then(res => {
        if (res.status === 'success') {
          if (res.data.length === 0) {
            list.innerHTML = '<p style="text-align:center;color:var(--text-muted);padding:1rem;">Be the first to start the discussion!</p>';
            return;
          }
          list.innerHTML = res.data.map(d => `
            <div class="comment">
              <div class="comment-header">
                <div class="avatar" style="width:28px;height:28px;font-size:0.72rem;background:var(--accent-dim);color:var(--accent)">${d.username.substring(0, 2).toUpperCase()}</div>
                <span style="font-weight:600;font-size:0.82rem">${d.username}</span>
                <span style="color:var(--text-muted);font-size:0.75rem">${formatDate(d.created_at)}</span>
              </div>
              <div class="comment-body">${d.content}</div>
              <div class="comment-actions">
                <button>${d.upvotes || 0} upvotes</button>
                <button>Reply</button>
              </div>
            </div>`).join('');
        }
      });
  };

  btn.addEventListener('click', () => {
    const sessionStr = localStorage.getItem('sb-session');
    if (!sessionStr) {
      alert("You must be logged in to post a comment!");
      return;
    }

    const content = input.value.trim();
    if (!content) return;

    btn.disabled = true;
    btn.textContent = 'Posting...';

    fetch(`${API_URL}/problems/${problemId}/discussions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(sessionStr).access_token}`
      },
      body: JSON.stringify({ content })
    })
      .then(r => r.json())
      .then(data => {
        btn.disabled = false;
        btn.textContent = 'Post Comment';
        if (data.status === 'success') {
          input.value = '';
          fetchDiscussions();
        } else {
          alert(data.message);
        }
      })
      .catch(() => {
        btn.disabled = false;
        btn.textContent = 'Post Comment';
        alert("Network Error");
      });
  });

  fetchDiscussions();
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  initInnovationEngine();
});

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  const navEl = document.getElementById('navbar');
  const footerEl = document.getElementById('footer');
  if (navEl) renderNavbar(navEl);
  if (footerEl) renderFooter(footerEl);

  const page = window.location.pathname.split('/').pop();
  if (page === 'problems.html') initProblemsPage();
  if (page === 'problem.html') { initProblemPage(); initTabs(); initLanguageSelector(); initCodeActions(); initAIHint(); }
  if (page === 'leaderboard.html') initLeaderboard();
  if (page === 'submissions.html') initSubmissionsPage();
  if (page === 'contests.html') initContestsPage();
  if (page === 'dashboard.html') initDashboard();
  if (page === 'login.html') initLoginForm();
  if (page === 'signup.html') initSignupForm();
});
