const form = document.getElementById('analyzeForm');
const results = document.getElementById('results');
const parsedEl = document.getElementById('parsed');
const roleMatchesEl = document.getElementById('roleMatches');
const fitScoreEl = document.getElementById('fitScore');
const atsScoreEl = document.getElementById('atsScore');
let radarChart;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const btn = document.getElementById('analyzeBtn');
  btn.disabled = true; btn.textContent = 'Analyzing...';

  const resp = await fetch('/api/analyze', {method:'POST', body:fd});
  if (!resp.ok) {
    alert('Analysis failed. Make sure backend is running.');
    btn.disabled=false; btn.textContent='Analyze Resume';
    return;
  }
  const data = await resp.json();
  btn.disabled=false; btn.textContent='Analyze Resume';
  showResults(data);
});

function showResults(data){
  results.style.display='block';
  parsedEl.textContent = JSON.stringify(data.raw_parsed, null, 2);
  fitScoreEl.textContent = 'Fit: ' + data.fit_score + '%';
  atsScoreEl.textContent = 'ATS: ' + data.ats_score + '%';
  // role matches
  roleMatchesEl.innerHTML = '';
  (data.role_matches || []).forEach(r => {
    const li = document.createElement('li');
    li.textContent = `${r.role} — ${(r.score*100).toFixed(0)}% — ${r.rationale||''}`;
    roleMatchesEl.appendChild(li);
  });
  // radar
  const labels = ['ATS','RoleAlignment','TechnicalSkills','SoftSkills','ExperienceDepth','Integrity'];
  const vals = labels.map(l => data.radar[l] || 0);
  const ctx = document.getElementById('radarChart').getContext('2d');
  if(radarChart) radarChart.destroy();
  radarChart = new Chart(ctx, {type:'radar', data:{labels, datasets:[{label:'Candidate profile', data:vals, fill:true}]}, options:{elements:{line:{borderWidth:2}}}});
}
