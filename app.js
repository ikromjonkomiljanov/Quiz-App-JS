const QUESTIONS = {
  html: [
    {
      q: "HTML'da eng katta sarlavha qaysi?",
      opts: ["<h6>", "<h1>", "<div>"],
      ans: 1,
    },
    { q: "Rasm qo'shish tegi?", opts: ["<video>", "<img>", "<image>"], ans: 1 },
    {
      q: "HTML nima uchun ishlatiladi?",
      opts: ["Ma'lumot bazasi", "Stil berish", "Veb sahifa tuzish"],
      ans: 2,
    },
  ],
  js: [
    {
      q: "O'zgaruvchi e'lon qilish kalit so'zi?",
      opts: ["cls", "let & const", "npm"],
      ans: 1,
    },
    {
      q: "typeof null natijasi?",
      opts: ["null", "object", "undefined"],
      ans: 1,
    },
    {
      q: "JavaScript nima uchun ishlatiladi?",
      opts: ["Veb sahifa tuzish", "Ma'lumot bazasi", "Interaktivlik qo'shish"],
      ans: 2,
    },
  ],
  general: [
    {
      q: "GitHub nima?",
      opts: ["Dizayn", "Versiya nazorati", "Brauzer"],
      ans: 1,
    },
    {
      q: "CSS nima uchun ishlatiladi?",
      opts: ["Ma'lumot bazasi", "Stil berish", "Server"],
      ans: 1,
    },
    {
      q: "HTTP protokoli nima uchun ishlatiladi?",
      opts: ["Veb sahifa tuzish", "Ma'lumot uzatish", "Dasturlash"],
      ans: 1,
    },
  ],
};

let selectedCats = [];
let quizQuestions = [];
let currentIdx = 0;
let score = 0;

const catCards = document.querySelectorAll(".cat-card");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

catCards.forEach((card) => {
  card.addEventListener("click", () => {
    const cat = card.dataset.cat;
    if (selectedCats.includes(cat)) {
      selectedCats = selectedCats.filter((c) => c !== cat);
      card.classList.remove("selected");
    } else {
      selectedCats.push(cat);
      card.classList.add("selected");
    }
    startBtn.disabled = selectedCats.length === 0;
  });
});

function showScreen(id) {
  document
    .querySelectorAll(".screen")
    .forEach((s) => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

startBtn.addEventListener("click", () => {
  quizQuestions = [];
  selectedCats.forEach((cat) => {
    quizQuestions = [...quizQuestions, ...QUESTIONS[cat]];
  });
  currentIdx = 0;
  score = 0;
  showScreen("quizScreen");
  renderQuestion();
});

function renderQuestion() {
  const q = quizQuestions[currentIdx];
  document.getElementById("qText").textContent = q.q;
  document.getElementById("qCounter").textContent =
    `Savol ${currentIdx + 1}/${quizQuestions.length}`;

  const grid = document.getElementById("optionsGrid");
  grid.innerHTML = "";
  nextBtn.style.display = "none";

  q.opts.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(index);
    grid.appendChild(btn);
  });
}

function checkAnswer(idx) {
  const q = quizQuestions[currentIdx];
  const btns = document.querySelectorAll(".option-btn");

  if (idx === q.ans) {
    score++;
    btns[idx].style.background = "#22c55e";
  } else {
    btns[idx].style.background = "#ef4444";
    btns[q.ans].style.background = "#22c55e";
  }

  btns.forEach((b) => (b.disabled = true));
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentIdx++;
  if (currentIdx < quizQuestions.length) {
    renderQuestion();
  } else {
    alert("O'yin tugadi! Ballingiz: " + score);
    showScreen("homeScreen");
  }
});
