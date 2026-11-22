// Spark — main app: state, navigation, home, learn, flashcards, quiz, stats
(function () {
'use strict';
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[Math.floor(Math.random() * a.length)];
const hash = s => { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };
const DAY = 86400000;
const today = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
const dayDiff = (a, b) => Math.round((new Date(b + 'T12:00') - new Date(a + 'T12:00')) / DAY);

/* ---------------- content indexing ---------------- */
const MODULES = window.MODULES, QUESTIONS = window.QUESTIONS, CARDS = window.CARDS;
const LESSON = {}, LESSON_MOD = {}, MOD = {};
MODULES.forEach(m => { MOD[m.id] = m; m.lessons.forEach((l, i) => { LESSON[l.id] = l; LESSON_MOD[l.id] = m.id; l.idx = i; }); });
QUESTIONS.forEach(q => { q.id = 'q' + hash(q.l + q.q); q.m = LESSON_MOD[q.l]; if (!q.m) console.warn('Question with unknown lesson', q.l); });
CARDS.forEach(c => { c.id = 'c' + hash(c.m + c.f); });
const ALL_LESSONS = MODULES.flatMap(m => m.lessons);

/* ---------------- state ---------------- */
const KEY = 'spark_v1';
const blank = () => ({ xp: 0, days: {}, streak: 0, lastDay: null, best: 0, lessons: {}, q: {}, cards: {}, games: {}, badges: {},
  newCards: { date: '', n: 0 }, settings: { vibrate: true, newPerDay: 20, goal: 60 }, counts: { cards: 0, answers: 0, right: 0, perfect: 0 } });
let S;
try { S = Object.assign(blank(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { S = blank(); }
S.settings = Object.assign(blank().settings, S.settings); S.counts = Object.assign(blank().counts, S.counts);
let saveT = null;
const save = () => { clearTimeout(saveT); saveT = setTimeout(saveNow, 300); };
function saveNow() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
window.saveNow = saveNow;

function touchDay() {
  const t = today();
  if (S.lastDay === t) return;
  if (S.lastDay && dayDiff(S.lastDay, t) === 1) S.streak += 1; else S.streak = 1;
  S.lastDay = t; S.best = Math.max(S.best, S.streak); save();
}
function addXP(n, label) {
  if (!n) return;
  touchDay();
  S.xp += n; const t = today(); S.days[t] = (S.days[t] || 0) + n;
  const before = levelOf(S.xp - n).level, after = levelOf(S.xp).level;
  toast(after > before ? `🎉 Level ${after}! ${levelOf(S.xp).name}` : `+${n} XP${label ? ' · ' + label : ''}`);
  checkBadges(); save(); updateTop();
}
const LEVEL_NAMES = ['Apprentice', 'Tinkerer', 'Solder Rookie', 'Board Builder', 'Line Tech', 'Technician', 'Senior Tech', 'Inspector', 'Test Engineer', 'Engineer', 'Senior Engineer', 'Circuit Wizard'];
function levelOf(xp) {
  let lvl = 1, need = 100, acc = 0;
  while (xp >= acc + need) { acc += need; lvl++; need = Math.round(need * 1.25); }
  return { level: lvl, into: xp - acc, need, name: LEVEL_NAMES[Math.min(lvl - 1, LEVEL_NAMES.length - 1)] };
}
function vibrate(ms) { if (S.settings.vibrate && window.Android && Android.vibrate) try { Android.vibrate(ms); } catch (e) { } }
let toastT;
function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 1700); }

/* ---------------- badges ---------------- */
const BADGES = [
  { id: 'first', ic: '🎓', name: 'First lesson', test: () => doneCount() >= 1 },
  { id: 'five', ic: '📚', name: '5 lessons', test: () => doneCount() >= 5 },
  { id: 'twenty', ic: '🧠', name: '20 lessons', test: () => doneCount() >= 20 },
  { id: 'all', ic: '🏆', name: 'All lessons', test: () => doneCount() >= ALL_LESSONS.length },
  { id: 'mod', ic: '🧩', name: 'Module done', test: () => MODULES.some(m => modProgress(m) === 1) },
  { id: 'c100', ic: '🃏', name: '100 cards', test: () => S.counts.cards >= 100 },
  { id: 'c500', ic: '🗂️', name: '500 cards', test: () => S.counts.cards >= 500 },
  { id: 'perfect', ic: '💯', name: 'Perfect quiz', test: () => S.counts.perfect >= 1 },
  { id: 'a250', ic: '✅', name: '250 right', test: () => S.counts.right >= 250 },
  { id: 's3', ic: '🔥', name: '3-day streak', test: () => S.best >= 3 },
  { id: 's7', ic: '🌟', name: '7-day streak', test: () => S.best >= 7 },
  { id: 's30', ic: '👑', name: '30-day streak', test: () => S.best >= 30 },
  { id: 'gamer', ic: '🎮', name: '5 games', test: () => Object.keys(S.games).length >= 5 },
  { id: 'allgames', ic: '🕹️', name: 'All games', test: () => window.GAMES && Object.keys(S.games).length >= window.GAMES.length },
  { id: 'lvl5', ic: '⚡', name: 'Level 5', test: () => levelOf(S.xp).level >= 5 },
  { id: 'lvl10', ic: '🔌', name: 'Level 10', test: () => levelOf(S.xp).level >= 10 },
];
function checkBadges() {
  BADGES.forEach(b => { if (!S.badges[b.id] && b.test()) { S.badges[b.id] = today(); setTimeout(() => toast(`${b.ic} Badge: ${b.name}`), 1800); } });
}
const doneCount = () => ALL_LESSONS.filter(l => S.lessons[l.id] && S.lessons[l.id].done).length;
const modProgress = m => m.lessons.filter(l => S.lessons[l.id] && S.lessons[l.id].done).length / m.lessons.length;

/* ---------------- navigation ---------------- */
const view = $('#view');
let stack = [];
let cleanup = null;
const SCREENS = {};
function go(name, args, replace) {
  if (replace) stack.pop();
  stack.push({ name, args });
  render();
}
function tab(name) { stack = [{ name }]; render(); }
function back() {
  if (stack.length <= 1) { if (stack[0] && stack[0].name !== 'home') { tab('home'); return 'ok'; } return 'exit'; }
  stack.pop(); render(); return 'ok';
}
window.handleBack = back;
function render() {
  if (cleanup) { try { cleanup(); } catch (e) { } cleanup = null; }
  const r = stack[stack.length - 1];
  const fn = SCREENS[r.name];
  view.innerHTML = ''; view.className = 'fade-in';
  void view.offsetWidth;
  setTitle('Spark');
  $('#backBtn').style.visibility = stack.length > 1 ? 'visible' : 'hidden';
  const root = stack[0].name;
  document.querySelectorAll('#tabs button').forEach(b => b.classList.toggle('on', b.dataset.tab === root));
  fn(view, r.args || {});
  if (window.onScreen) window.onScreen(r.name, root);
  window.scrollTo(0, 0);
  updateTop();
}
function setTitle(t) { $('#title').textContent = t; }
function onLeave(fn) { cleanup = fn; }
function updateTop() { $('#streakChip').textContent = '🔥 ' + (S.lastDay && dayDiff(S.lastDay, today()) <= 1 ? S.streak : 0); $('#xpChip').textContent = '⚡ ' + S.xp; }
function h(html) { const d = document.createElement('div'); d.innerHTML = html; return d; }
function on(el, sel, ev, fn) { el.querySelectorAll(sel).forEach(x => x.addEventListener(ev, e => fn(x, e))); }

/* ---------------- question helpers ---------------- */
function bankToMC(q) {
  const opts = shuffle(q.a.map((t, i) => ({ t, ok: i === 0 })));
  return { id: q.id, prompt: esc(q.q), options: opts.map(o => esc(o.t)), correct: opts.findIndex(o => o.ok), explain: esc(q.e), m: q.m };
}
function recordAnswer(qid, ok) {
  S.counts.answers++; if (ok) S.counts.right++;
  if (!qid) return;
  const r = S.q[qid] || (S.q[qid] = { c: 0, w: 0, s: 0, t: 0 });
  if (ok) { r.c++; r.s = Math.max(0, r.s) + 1; } else { r.w++; r.s = 0; }
  r.t = Date.now(); r.last = ok ? 1 : 0;
}
function weight(q) {
  const r = S.q[q.id];
  if (!r) return 2.5;
  const days = (Date.now() - r.t) / DAY;
  let w = 1 + r.w * 1.5 - Math.min(r.s, 4) * 0.6 + Math.min(days, 14) * 0.15;
  if (r.last === 0) w += 2;
  return Math.max(0.15, w);
}
function weightedPick(pool, n) {
  const items = pool.map(q => ({ q, k: Math.pow(Math.random(), 1 / weight(q)) }));
  items.sort((a, b) => b.k - a.k);
  return items.slice(0, n).map(i => i.q);
}

/* ---------------- generic multiple-choice runner ---------------- */
// cfg: {title, items:[{prompt, visual?, options[], correct, explain, id?}] | gen(i) , count, xpPer, timer(sec), onDone(score,total,items), gameId}
function runMC(cfg) { go('mc', cfg); }
SCREENS.mc = (el, cfg) => {
  setTitle(cfg.title || 'Quiz');
  const total = cfg.items ? cfg.items.length : cfg.count;
  let i = 0, score = 0, answered = false, items = [], wrongs = [], results = [], streak = 0, timeLeft = cfg.timer || 0, timerI = null, ended = false, xpEarned = 0;
  const getItem = k => items[k] || (items[k] = cfg.items ? cfg.items[k] : cfg.gen(k));
  if (cfg.timer) {
    timerI = setInterval(() => { timeLeft--; const t = $('.timer', el); if (t) t.textContent = '⏱ ' + timeLeft + 's'; if (timeLeft <= 0) { clearInterval(timerI); finish(); } }, 1000);
  }
  onLeave(() => clearInterval(timerI));
  function show() {
    answered = false;
    const it = getItem(i);
    el.innerHTML = `
      <div class="qhead"><span>${cfg.timer ? `Score ${score}` : `Question ${i + 1} of ${total}`}</span>
        <span>${cfg.timer ? `<span class="timer">⏱ ${timeLeft}s</span>` : `✓ ${score}`}${streak >= 3 ? ` · 🔥${streak}` : ''}</span></div>
      <div class="bar"><i style="width:${cfg.timer ? (timeLeft / cfg.timer * 100) : (i / total * 100)}%"></i></div>
      ${it.visual ? `<div class="qvisual">${it.visual}</div>` : ''}
      <div class="qprompt">${it.prompt}</div>
      <div id="opts">${it.options.map((o, k) => `<button class="opt" data-k="${k}">${o}</button>`).join('')}</div>
      <div id="after"></div>`;
    on(el, '.opt', 'click', b => choose(+b.dataset.k));
  }
  function choose(k) {
    if (answered || ended) return; answered = true;
    const it = getItem(i), ok = k === it.correct;
    recordAnswer(it.id, ok); results.push({ it, ok });
    el.querySelectorAll('.opt').forEach((b, j) => { b.classList.add(j === it.correct ? 'right' : (j === k ? 'wrong' : 'dim')); });
    if (ok) { score++; streak++; const x = (cfg.xpPer || 5) + (streak >= 5 ? 2 : 0); xpEarned += x; S.xp += x; S.days[today()] = (S.days[today()] || 0) + x; }
    else { streak = 0; wrongs.push({ it, k }); vibrate(120); $('#opts', el).classList.add('shake'); }
    touchDay(); updateTop(); save();
    if (cfg.timer) { setTimeout(() => { if (!ended) { i++; show(); } }, ok ? 350 : 1100); return; }
    $('#after', el).innerHTML = `${it.explain ? `<div class="explain ${ok ? 'good' : 'bad'}">${ok ? '✅ ' : '❌ '}${it.explain}</div>` : ''}
      <button class="btn" id="nextBtn">${i + 1 < total ? 'Next' : 'See results'}</button>`;
    $('#nextBtn', el).onclick = () => { i++; if (i < total) show(); else finish(); };
    $('#nextBtn', el).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  function finish() {
    if (ended) return; ended = true; clearInterval(timerI);
    const n = cfg.timer ? i + (answered ? 1 : 0) : total;
    const pct = n ? Math.round(score / n * 100) : 0;
    let bonus = 0;
    if (!cfg.timer && n >= 5 && score === n) { S.counts.perfect++; bonus = 20; }
    if (cfg.gameId) { const g = S.games[cfg.gameId] || (S.games[cfg.gameId] = { best: 0, plays: 0 }); g.plays++; g.best = Math.max(g.best, cfg.timer ? score : pct); }
    const extra = cfg.onDone ? cfg.onDone(score, n, items) : 0;
    addXP(bonus + (extra || 0), bonus ? 'Perfect!' : '');
    save(); checkBadges(); updateTop();
    const msg = cfg.timer ? `${score} correct in ${cfg.timer}s` : pct === 100 ? 'Perfect! ⚡' : pct >= 80 ? 'Great work!' : pct >= 50 ? 'Getting there!' : 'Keep practising!';
    el.innerHTML = `<div class="card center">
        <div class="result-big">${cfg.timer ? score : pct + '%'}</div>
        <p><b>${msg}</b></p><p class="muted">${cfg.timer ? '' : `${score} / ${n} correct · `}+${xpEarned + bonus + (extra || 0)} XP${cfg.gameId && S.games[cfg.gameId] ? ` · Best: ${S.games[cfg.gameId].best}${cfg.timer ? '' : '%'}` : ''}</p></div>
      ${cfg.afterHTML ? cfg.afterHTML(score, n, results) : ''}
      <div class="btn-row"><button class="btn ghost" id="again">${cfg.againLabel || 'Play again'}</button><button class="btn" id="done">Done</button></div>
      ${wrongs.length ? `<div class="card"><b>Review your mistakes</b>${wrongs.map(w => `<div class="review-item">${w.it.visual ? `<div class="qvisual" style="transform:scale(.8)">${w.it.visual}</div>` : ''}<div>${w.it.prompt}</div>
        <div class="small" style="color:var(--bad)">You said: ${w.it.options[w.k]}</div><div class="small" style="color:var(--good)">Answer: ${w.it.options[w.it.correct]}</div>${w.it.explain ? `<div class="small muted">${w.it.explain}</div>` : ''}</div>`).join('')}</div>` : ''}`;
    $('#done', el).onclick = () => back();
    $('#again', el).onclick = () => { if (cfg.again) cfg.again(); else { stack.pop(); runMC(Object.assign({}, cfg, cfg.regen ? cfg.regen() : {})); } };
  }
  show();
};

/* ---------------- HOME ---------------- */
SCREENS.home = el => {
  touchDayCheckOnly();
  const L = levelOf(S.xp), t = today(), todayXP = S.days[t] || 0, goal = S.settings.goal;
  const due = dueCards().length, next = nextLesson();
  const pctGoal = Math.min(1, todayXP / goal);
  const C = 2 * Math.PI * 32;
  const hr = new Date().getHours();
  const greet = hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening';
  el.innerHTML = `
  <div class="card hero"><div class="row">
    <svg class="ring" viewBox="0 0 76 76"><circle cx="38" cy="38" r="32" stroke="#2c3a48" stroke-width="8" fill="none"/>
      <circle cx="38" cy="38" r="32" stroke="${pctGoal >= 1 ? '#ffc94d' : '#3ddc97'}" stroke-width="8" fill="none" stroke-linecap="round"
       stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pctGoal)}" transform="rotate(-90 38 38)"/>
      <text x="38" y="43" text-anchor="middle" fill="#e8eef3" font-size="15" font-weight="700">${Math.round(pctGoal * 100)}%</text></svg>
    <div class="grow"><div class="muted small">${greet}</div><div class="level-name">Level ${L.level} · ${L.name}</div>
      <div class="bar gold" style="margin:6px 0"><i style="width:${L.into / L.need * 100}%"></i></div>
      <div class="small muted">${L.into}/${L.need} XP to next level · today ${todayXP}/${goal} XP</div></div></div></div>
  ${next ? `<button class="card tap list-item" id="cont" style="display:flex"><span class="ic" style="background:${MOD[LESSON_MOD[next.id]].color}22">${MOD[LESSON_MOD[next.id]].icon}</span>
    <span class="body"><small>Continue learning</small><b>${esc(next.title)}</b><small>${esc(MOD[LESSON_MOD[next.id]].title)}</small></span><span class="end">▶</span></button>` :
    `<div class="card center"><b>🏆 You've finished every lesson!</b><p class="muted small">Keep your knowledge sharp with reviews and games.</p></div>`}
  <div class="grid2">
    <button class="tile" data-go="cardsDue"><span class="ic">🃏</span><b>Review cards</b><small>${due} due${due ? ' now' : ''}</small></button>
    <button class="tile" data-go="smart"><span class="ic">🧠</span><b>Smart review</b><small>Mix of past topics</small></button>
    <button class="tile" data-go="games"><span class="ic">🎮</span><b>Mini games</b><small>${window.GAMES ? GAMES.length : ''} games</small></button>
    <button class="tile" data-go="speed"><span class="ic">⏱️</span><b>Speed round</b><small>60 second blitz</small></button>
    <button class="tile" data-go="tools"><span class="ic">🧰</span><b>Tools</b><small>Calculators & reference</small></button>
    <button class="tile" data-go="stats"><span class="ic">📊</span><b>Progress</b><small>Stats & badges</small></button>
  </div>
  <div class="card"><div class="row"><b class="grow">Your modules</b><span class="small muted">${doneCount()}/${ALL_LESSONS.length} lessons</span></div>
   <div class="spacer"></div>${MODULES.map(m => `<div class="row small" style="margin:5px 0"><span style="width:26px">${m.icon}</span><span class="grow">${esc(m.title)}</span><span style="width:90px" class="bar"><i style="width:${modProgress(m) * 100}%;background:${m.color}"></i></span></div>`).join('')}</div>
  <div class="card small" id="tip"></div>`;
  const tipCard = pick(CARDS); $('#tip', el).innerHTML = `💡 <b>Did you know?</b> ${esc(tipCard.f)} — ${esc(tipCard.b)}`;
  if (next) $('#cont', el).onclick = () => go('lesson', { id: next.id });
  on(el, '[data-go]', 'click', b => {
    const g = b.dataset.go;
    if (g === 'cardsDue') go('cardSession', { deck: 'due' });
    else if (g === 'smart') startSmartReview();
    else if (g === 'games') tab('games');
    else if (g === 'speed') window.startGame && startGame('speed');
    else go(g);
  });
};
function touchDayCheckOnly() { if (S.lastDay && dayDiff(S.lastDay, today()) > 1) { S.streak = 0; save(); } }
function nextLesson() { return ALL_LESSONS.find(l => !(S.lessons[l.id] && S.lessons[l.id].done)); }

/* ---------------- LEARN ---------------- */
SCREENS.learn = el => {
  setTitle('Learn');
  el.innerHTML = `<p class="muted small">${MODULES.length} modules · ${ALL_LESSONS.length} lessons · ${QUESTIONS.length} questions · ${CARDS.length} flashcards</p>` +
    MODULES.map(m => {
      const p = modProgress(m);
      return `<button class="list-item" data-m="${m.id}"><span class="ic" style="background:${m.color}22">${m.icon}</span>
      <span class="body"><b>${esc(m.title)}</b><small>${esc(m.blurb)}</small><span class="bar" style="margin-top:6px;display:block"><i style="width:${p * 100}%;background:${m.color}"></i></span></span>
      <span class="end">${p === 1 ? '<span class="tick">✓</span>' : Math.round(p * m.lessons.length) + '/' + m.lessons.length}</span></button>`;
    }).join('');
  on(el, '[data-m]', 'click', b => go('module', { id: b.dataset.m }));
};
SCREENS.module = (el, { id }) => {
  const m = MOD[id]; setTitle(m.title);
  const qn = QUESTIONS.filter(q => q.m === id).length, cn = CARDS.filter(c => c.m === id).length;
  el.innerHTML = `<div class="card" style="border-color:${m.color}55"><div class="row"><span style="font-size:36px">${m.icon}</span><div><b>${esc(m.title)}</b><div class="small muted">${esc(m.blurb)}</div></div></div></div>
    ${m.lessons.map((l, i) => { const st = S.lessons[l.id]; return `<button class="list-item" data-l="${l.id}"><span class="ic">${st && st.done ? '<span class="tick">✓</span>' : i + 1}</span>
      <span class="body"><b>${esc(l.title)}</b><small>${st && st.done ? 'Check score ' + Math.round(st.score * 100) + '%' : 'Not started'}</small></span><span class="end">›</span></button>`; }).join('')}
    <div class="grid2" style="margin-top:12px"><button class="tile" id="mq"><span class="ic">❓</span><b>Module quiz</b><small>${qn} questions</small></button>
    <button class="tile" id="mc"><span class="ic">🃏</span><b>Flashcards</b><small>${cn} cards</small></button></div>`;
  on(el, '[data-l]', 'click', b => go('lesson', { id: b.dataset.l }));
  $('#mq', el).onclick = () => startModuleQuiz(id);
  $('#mc', el).onclick = () => go('cardSession', { deck: id });
};
SCREENS.lesson = (el, { id }) => {
  const l = LESSON[id], m = MOD[LESSON_MOD[id]]; setTitle(l.title);
  const body = l.body.replace(/\{\{sym:(\w+)\}\}/g, (_, k) => window.symHTML(k));
  const qs = QUESTIONS.filter(q => q.l === id);
  const idx = m.lessons.indexOf(l), nextL = m.lessons[idx + 1] || (MODULES[MODULES.indexOf(m) + 1] || {}).lessons?.[0];
  const st = S.lessons[id];
  el.innerHTML = `<div class="small muted">${m.icon} ${esc(m.title)} · Lesson ${idx + 1} of ${m.lessons.length}</div>
    <h2>${esc(l.title)}</h2><div class="lesson">${body}</div>
    <div class="spacer"></div>
    <div class="card center"><b>Quick check</b><p class="small muted">${qs.length} questions on this lesson${st && st.done ? ` · last score ${Math.round(st.score * 100)}%` : ''}</p>
      <button class="btn" id="check">${st && st.done ? 'Retake check' : 'Take the quick check'}</button>
      ${nextL ? `<button class="btn ghost" id="nextL">Next: ${esc(nextL.title)} ›</button>` : ''}</div>`;
  $('#check', el).onclick = () => {
    const items = shuffle(qs).slice(0, 6).map(bankToMC);
    runMC({ title: 'Quick check', items, xpPer: 5, againLabel: 'Retry',
      onDone: (score, n) => {
        const prev = S.lessons[id] || {};
        if (score / n < 0.5) { S.lessons[id] = Object.assign({}, prev, { tries: (prev.tries || 0) + 1 }); return 0; }
        const first = !prev.done;
        S.lessons[id] = { done: true, score: Math.max(score / n, prev.score || 0), t: Date.now() };
        return first ? 30 : 5;
      },
      afterHTML: (score, n) => score / n < 0.5
        ? `<div class="card small">📖 You need 50% to complete this lesson. Have another read through, then retry the check — the questions get shuffled.</div><button class="btn" id="relesson">Re-read the lesson</button>`
        : `<div class="card small center">✅ Lesson complete${(nextL ? '' : ' — that was the last one!')}</div>` + (nextL ? `<button class="btn" id="nl2">Next lesson: ${esc(nextL.title)} ›</button>` : ''),
    });
  };
  if (nextL) $('#nextL', el).onclick = () => go('lesson', { id: nextL.id }, true);
  // hook for "next lesson" button on result screen
  window.__nextLesson = nextL ? () => { stack.pop(); go('lesson', { id: nextL.id }, true); } : null;
};
document.addEventListener('click', e => { if (!e.target) return; if (e.target.id === 'nl2' && window.__nextLesson) window.__nextLesson(); if (e.target.id === 'relesson') back(); });

/* ---------------- QUIZ ---------------- */
SCREENS.quiz = el => {
  setTitle('Quiz');
  const mistakes = QUESTIONS.filter(q => S.q[q.id] && S.q[q.id].last === 0).length;
  const seen = QUESTIONS.filter(q => S.q[q.id]).length;
  el.innerHTML = `
    <button class="list-item" id="smart"><span class="ic">🧠</span><span class="body"><b>Smart review</b><small>15 questions from topics you've studied — weighted towards ones you got wrong or haven't seen for a while</small></span></button>
    <button class="list-item" id="mist"><span class="ic">🎯</span><span class="body"><b>Fix my mistakes</b><small>${mistakes} questions you last got wrong</small></span></button>
    <button class="list-item" id="exam"><span class="ic">📝</span><span class="body"><b>Big exam</b><small>40 questions from every module, with a score breakdown</small></span></button>
    <button class="list-item" id="speed"><span class="ic">⏱️</span><span class="body"><b>Speed round</b><small>As many as you can in 60 seconds</small></span></button>
    <h3>Quiz by module</h3>
    ${MODULES.map(m => { const qs = QUESTIONS.filter(q => q.m === m.id); const r = qs.filter(q => S.q[q.id]); const acc = r.length ? Math.round(r.reduce((a, q) => a + S.q[q.id].c, 0) / r.reduce((a, q) => a + S.q[q.id].c + S.q[q.id].w, 0) * 100) : null;
      return `<button class="list-item" data-m="${m.id}"><span class="ic" style="background:${m.color}22">${m.icon}</span><span class="body"><b>${esc(m.title)}</b><small>${qs.length} questions${acc !== null ? ` · ${acc}% accuracy` : ''}</small></span><span class="end">›</span></button>`; }).join('')}
    <p class="small muted center">${seen}/${QUESTIONS.length} questions seen</p>`;
  $('#smart', el).onclick = startSmartReview;
  $('#mist', el).onclick = () => {
    const pool = QUESTIONS.filter(q => S.q[q.id] && S.q[q.id].last === 0);
    if (!pool.length) { toast('No mistakes to fix — nice!'); return; }
    runMC({ title: 'Fix my mistakes', items: shuffle(pool).slice(0, 15).map(bankToMC), xpPer: 6, regen: () => { const p = QUESTIONS.filter(q => S.q[q.id] && S.q[q.id].last === 0); return { items: shuffle(p.length ? p : QUESTIONS).slice(0, 15).map(bankToMC) }; } });
  };
  $('#exam', el).onclick = startExam;
  $('#speed', el).onclick = () => startGame('speed');
  on(el, '[data-m]', 'click', b => startModuleQuiz(b.dataset.m));
};
function startModuleQuiz(mid) {
  const mk = () => ({ items: weightedPick(QUESTIONS.filter(q => q.m === mid), 10).map(bankToMC) });
  runMC(Object.assign({ title: MOD[mid].title + ' quiz', xpPer: 5, regen: mk }, mk()));
}
function studiedPool() {
  const done = new Set(ALL_LESSONS.filter(l => S.lessons[l.id] && S.lessons[l.id].done).map(l => l.id));
  let pool = QUESTIONS.filter(q => done.has(q.l) || S.q[q.id]);
  if (pool.length < 15) { const first = MODULES.slice(0, 2).map(m => m.id); pool = QUESTIONS.filter(q => first.includes(q.m) || done.has(q.l) || S.q[q.id]); }
  return pool;
}
function startSmartReview() {
  const mk = () => ({ items: weightedPick(studiedPool(), 15).map(bankToMC) });
  runMC(Object.assign({ title: 'Smart review', xpPer: 6, regen: mk }, mk()));
}
function startExam() {
  const mk = () => {
    let pool = [];
    MODULES.forEach(m => pool.push(...shuffle(QUESTIONS.filter(q => q.m === m.id)).slice(0, 3)));
    return { items: shuffle(pool).slice(0, 40).map(bankToMC) };
  };
  runMC(Object.assign({ title: 'Big exam', xpPer: 5, regen: mk,
    afterHTML: (s, n, results) => {
      const by = {};
      results.forEach(r => { const b = by[r.it.m] || (by[r.it.m] = { c: 0, n: 0 }); b.n++; if (r.ok) b.c++; });
      return `<div class="card"><b>Breakdown</b>${MODULES.filter(m => by[m.id]).map(m => { const b = by[m.id], p = b.c / b.n;
        return `<div class="row small" style="margin:6px 0"><span style="width:24px">${m.icon}</span><span class="grow">${esc(m.title)}</span><span style="color:${p >= .8 ? '#3ddc97' : p >= .5 ? '#ffc94d' : '#ff6b6b'}">${b.c}/${b.n}</span></div>`; }).join('')}
        <p class="small muted">Weak areas? Open that module's lessons or flashcards.</p></div>`;
    } }, mk()));
}

/* ---------------- FLASHCARDS (spaced repetition) ---------------- */
const INTERVALS = [0, 1, 3, 7, 14, 30, 60, 120]; // days per box
function cardState(c) { return S.cards[c.id]; }
function dueCards(deck) {
  const now = Date.now();
  return CARDS.filter(c => (!deck || deck === 'due' || c.m === deck) && S.cards[c.id] && S.cards[c.id].due <= now);
}
function newCards(deck, limit) {
  let pool = CARDS.filter(c => !S.cards[c.id] && (!deck || deck === 'due' || c.m === deck));
  if (deck === 'due') {
    // prefer modules you have studied, then module order
    const studied = new Set(ALL_LESSONS.filter(l => S.lessons[l.id] && S.lessons[l.id].done).map(l => LESSON_MOD[l.id]));
    const order = MODULES.map(m => m.id);
    pool.sort((a, b) => ((studied.has(b.m) ? 1 : 0) - (studied.has(a.m) ? 1 : 0)) || (order.indexOf(a.m) - order.indexOf(b.m)));
  } else pool = shuffle(pool);
  return pool.slice(0, limit);
}
function newLeftToday() { if (S.newCards.date !== today()) S.newCards = { date: today(), n: 0 }; return Math.max(0, S.settings.newPerDay - S.newCards.n); }
SCREENS.cards = el => {
  setTitle('Flashcards');
  const due = dueCards('due').length, learned = Object.keys(S.cards).length, mastered = Object.values(S.cards).filter(s => s.box >= 4).length;
  el.innerHTML = `<div class="card hero"><div class="row"><div class="grow"><b style="font-size:20px">${due} due</b><div class="small muted">${learned}/${CARDS.length} learned · ${mastered} mastered · ${newLeftToday()} new left today</div></div><span style="font-size:40px">🃏</span></div>
     <button class="btn" id="go">${due ? 'Review now' : 'Learn new cards'}</button></div>
    <div class="grid2"><button class="tile" id="match"><span class="ic">🧩</span><b>Match pairs</b><small>Memory game with cards</small></button>
      <button class="tile" id="browse"><span class="ic">📖</span><b>Browse all</b><small>Read every card</small></button></div>
    <h3>Decks</h3>
    ${MODULES.map(m => { const cs = CARDS.filter(c => c.m === m.id); const d = dueCards(m.id).length; const ln = cs.filter(c => S.cards[c.id]).length;
      return `<button class="list-item" data-m="${m.id}"><span class="ic" style="background:${m.color}22">${m.icon}</span><span class="body"><b>${esc(m.title)}</b><small>${ln}/${cs.length} learned${d ? ` · <span style="color:var(--gold)">${d} due</span>` : ''}</small></span><span class="end">›</span></button>`; }).join('')}
    <p class="small muted">Cards you rate "Again" come back in the same session; "Good" pushes them out to 1, 3, 7, 14, 30+ days. A few minutes a day beats cramming.</p>`;
  $('#go', el).onclick = () => go('cardSession', { deck: 'due' });
  $('#match', el).onclick = () => startGame('match');
  $('#browse', el).onclick = () => go('browse', {});
  on(el, '[data-m]', 'click', b => go('cardSession', { deck: b.dataset.m }));
};
SCREENS.browse = (el, { m }) => {
  setTitle('All cards');
  el.innerHTML = `<div class="seg"><select id="msel" style="flex:1;background:var(--card2);color:var(--text);border:0;padding:8px;border-radius:8px;font-size:15px">
     <option value="">All modules</option>${MODULES.map(x => `<option value="${x.id}" ${m === x.id ? 'selected' : ''}>${x.icon} ${esc(x.title)}</option>`).join('')}</select></div>
    ${CARDS.filter(c => !m || c.m === m).map(c => `<div class="card" style="padding:10px 12px"><b>${esc(c.f)}</b><div class="small" style="color:#bfe9d4">${esc(c.b)}</div></div>`).join('')}`;
  $('#msel', el).onchange = e => { stack[stack.length - 1].args = { m: e.target.value }; render(); };
};
SCREENS.cardSession = (el, { deck }) => {
  const deckName = deck === 'due' ? 'Daily review' : MOD[deck].title;
  setTitle(deckName);
  let queue = shuffle(dueCards(deck));
  const nNew = deck === 'due' ? newLeftToday() : Math.max(newLeftToday(), 10);
  const fresh = newCards(deck, Math.min(nNew, Math.max(0, 30 - queue.length)));
  queue = queue.concat(fresh.map(c => Object.assign({ isNew: true }, c)));
  let done = 0, again = 0, startLen = queue.length, xp = 0;
  if (!queue.length) {
    el.innerHTML = `<div class="card center"><div style="font-size:48px">🎉</div><b>All caught up!</b><p class="muted small">No cards due in this deck. Come back later, or cram the whole deck anyway.</p>
      <button class="btn" id="cram">Cram this deck anyway</button><button class="btn ghost" id="bk">Back</button></div>`;
    $('#bk', el).onclick = back;
    $('#cram', el).onclick = () => { queue = shuffle(CARDS.filter(c => deck === 'due' || c.m === deck)).slice(0, 25).map(c => Object.assign({ cram: true }, c)); startLen = queue.length; show(); };
    return;
  }
  function label(box) { const d = INTERVALS[Math.min(box, INTERVALS.length - 1)]; return d === 0 ? 'now' : d < 30 ? d + 'd' : Math.round(d / 30) + 'mo'; }
  function show() {
    if (!queue.length) return finish();
    const c = queue[0], st = S.cards[c.id] || { box: 0 };
    const m = MOD[c.m];
    el.innerHTML = `<div class="qhead"><span>${done} done · ${queue.length} left</span><span>${c.isNew ? '<span class="pill" style="color:var(--gold)">NEW</span>' : c.cram ? '<span class="pill">CRAM</span>' : ''}</span></div>
      <div class="bar"><i style="width:${done / (done + queue.length) * 100}%"></i></div>
      <div class="flash-wrap"><div class="flash" id="fc">
        <div class="face front"><span class="tag">${m.icon} ${esc(m.title)}</span>${esc(c.f)}<span class="hint">Tap to flip</span></div>
        <div class="face back"><span class="tag">${esc(c.f)}</span>${esc(c.b)}</div></div></div>
      <div id="ctrl"><button class="btn" id="flip">Show answer</button></div>`;
    const flip = () => {
      $('#fc', el).classList.add('flipped');
      const b = st.box || 0;
      $('#ctrl', el).innerHTML = `<p class="center small muted" style="margin:0 0 6px">How well did you know it?</p><div class="rate">
        <button class="r0" data-r="0">Again<small>${'now'}</small></button>
        <button class="r1" data-r="1">Hard<small>${b <= 1 ? 'soon' : label(Math.max(1, b - 1))}</small></button>
        <button class="r2" data-r="2">Good<small>${label(b + 1)}</small></button>
        <button class="r3" data-r="3">Easy<small>${label(b + 2)}</small></button></div>`;
      on(el, '[data-r]', 'click', btn => rate(+btn.dataset.r));
    };
    $('#fc', el).onclick = () => { if (!$('#fc', el).classList.contains('flipped')) flip(); else $('#fc', el).classList.remove('flipped'); };
    $('#flip', el).onclick = flip;
  }
  function rate(r) {
    const c = queue.shift();
    if (c.isNew && !S.cards[c.id]) { newLeftToday(); S.newCards.n++; }
    const st = S.cards[c.id] || { box: 0, due: 0, reps: 0, lapses: 0 };
    st.reps = (st.reps || 0) + 1;
    if (r === 0) { st.box = 0; st.lapses = (st.lapses || 0) + 1; st.due = Date.now(); again++; queue.splice(Math.min(queue.length, 3), 0, Object.assign({}, c, { isNew: false })); vibrate(60); }
    else {
      if (r === 1 && st.box <= 1) { st.box = 1; st.due = Date.now() + DAY - 3600000; queue.splice(Math.min(queue.length, 6), 0, Object.assign({}, c, { isNew: false, hardRepeat: true })); S.cards[c.id] = st; S.counts.cards++; done++; xp += 1; S.xp += 1; touchDay(); updateTop(); save(); show(); return; }
      st.box = r === 1 ? Math.max(1, st.box - 1) : r === 2 ? st.box + 1 : st.box + 2;
      st.box = Math.min(st.box, INTERVALS.length - 1);
      st.due = Date.now() + INTERVALS[st.box] * DAY - 3600000; // an hour early so "tomorrow" means tomorrow
    }
    S.cards[c.id] = st; S.counts.cards++; done++;
    const x = r === 0 ? 1 : 2; xp += x; S.xp += x; S.days[today()] = (S.days[today()] || 0) + x; touchDay(); updateTop(); save();
    show();
  }
  function finish() {
    checkBadges(); save();
    addXP(10, 'Session done');
    el.innerHTML = `<div class="card center"><div style="font-size:48px">✅</div><b>Session complete</b>
      <p class="muted">${done} reviews · ${again} "again" · +${xp + 10} XP</p></div>
      <button class="btn" id="more">Keep going</button><button class="btn ghost" id="bk">Done</button>`;
    $('#bk', el).onclick = back;
    $('#more', el).onclick = () => render();
  }
  show();
};

/* ---------------- STATS ---------------- */
SCREENS.stats = el => {
  setTitle('Progress');
  const L = levelOf(S.xp);
  const last14 = []; for (let i = 13; i >= 0; i--) { const d = new Date(Date.now() - i * DAY); const k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); last14.push({ k, v: S.days[k] || 0, l: 'SMTWTFS'[d.getDay()] }); }
  const mx = Math.max(S.settings.goal, ...last14.map(d => d.v));
  const acc = S.counts.answers ? Math.round(S.counts.right / S.counts.answers * 100) : 0;
  el.innerHTML = `<div class="grid3">
      <div class="card center"><b style="font-size:22px">${S.xp}</b><div class="small muted">Total XP</div></div>
      <div class="card center"><b style="font-size:22px">${S.best}</b><div class="small muted">Best streak</div></div>
      <div class="card center"><b style="font-size:22px">${acc}%</b><div class="small muted">Accuracy</div></div></div>
    <div class="card"><b>Last 14 days</b><svg viewBox="0 0 280 110" style="width:100%;margin-top:8px">
      <line x1="0" x2="280" y1="${90 - S.settings.goal / mx * 80}" y2="${90 - S.settings.goal / mx * 80}" stroke="#ffc94d" stroke-dasharray="4 4" stroke-width="1"/>
      ${last14.map((d, i) => `<rect x="${i * 20 + 3}" y="${90 - d.v / mx * 80}" width="14" height="${d.v / mx * 80}" rx="3" fill="${d.v >= S.settings.goal ? '#ffc94d' : '#3ddc97'}"/><text x="${i * 20 + 10}" y="104" fill="#8ea0b2" font-size="9" text-anchor="middle">${d.l}</text>`).join('')}</svg>
      <div class="small muted">Dashed line = daily goal (${S.settings.goal} XP)</div></div>
    <div class="card"><b>Module accuracy</b>${MODULES.map(m => { const qs = QUESTIONS.filter(q => q.m === m.id && S.q[q.id]); const c = qs.reduce((a, q) => a + S.q[q.id].c, 0), w = qs.reduce((a, q) => a + S.q[q.id].w, 0); const p = c + w ? c / (c + w) : 0;
      return `<div class="row small" style="margin:6px 0"><span style="width:24px">${m.icon}</span><span class="grow">${esc(m.title)}</span><span style="width:70px" class="bar"><i style="width:${p * 100}%;background:${p > .8 ? '#3ddc97' : p > .5 ? '#ffc94d' : '#ff6b6b'}"></i></span><span style="width:40px;text-align:right">${c + w ? Math.round(p * 100) + '%' : '–'}</span></div>`; }).join('')}</div>
    <div class="card"><b>Badges</b><div class="spacer"></div><div class="badges">${BADGES.map(b => `<div class="badge ${S.badges[b.id] ? 'got' : ''}"><span>${b.ic}</span>${b.name}</div>`).join('')}</div></div>
    <div class="card"><b>Settings</b>
      <div class="field"><label>Daily XP goal</label><select id="goal">${[30, 60, 100, 150, 250].map(v => `<option ${v === S.settings.goal ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
      <div class="field"><label>New flashcards per day</label><select id="npd">${[10, 20, 30, 50, 100].map(v => `<option ${v === S.settings.newPerDay ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
      <div class="field"><label>Vibrate on wrong answer</label><select id="vib"><option value="1" ${S.settings.vibrate ? 'selected' : ''}>On</option><option value="0" ${!S.settings.vibrate ? 'selected' : ''}>Off</option></select></div>
      <button class="btn bad" id="reset" style="margin-top:14px">Reset all progress</button></div>
    <p class="small muted center">Spark · ${MODULES.length} modules · ${ALL_LESSONS.length} lessons · ${QUESTIONS.length} questions · ${CARDS.length} cards</p>`;
  $('#goal', el).onchange = e => { S.settings.goal = +e.target.value; save(); };
  $('#npd', el).onchange = e => { S.settings.newPerDay = +e.target.value; save(); };
  $('#vib', el).onchange = e => { S.settings.vibrate = e.target.value === '1'; save(); };
  let armed = false;
  $('#reset', el).onclick = e => { if (!armed) { armed = true; e.target.textContent = 'Tap again to confirm reset'; return; } S = blank(); saveNow(); tab('home'); toast('Progress reset'); };
};

/* ---------------- start ---------------- */
document.querySelectorAll('#tabs button').forEach(b => b.onclick = () => tab(b.dataset.tab));
$('#backBtn').onclick = back;

window.App = {
  start() { touchDayCheckOnly(); tab('home'); },
  go, back, tab, runMC, render, setTitle, onLeave, toast, addXP, vibrate, save, shuffle, pick, esc, on, $,
  SCREENS, MOD, MODULES, QUESTIONS, CARDS, LESSON, bankToMC, recordAnswer, studiedPool, weightedPick, get S() { return S; },
};
})();
