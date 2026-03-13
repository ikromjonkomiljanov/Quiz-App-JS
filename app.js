const QUESTIONS = {
  html: [
    {
      q: "HTML'da eng katta sarlavha qaysi?",
      opts: ["<h6>", "<h1>", "<div>"],
      ans: 1,
    },
    { q: "Rasm qo'shish tegi?", opts: ["<pic>", "<img>", "<image>"], ans: 1 },
  ],
  js: [
    {
      q: "O'zgaruvchi e'lon qilish kalit so'zi?",
      opts: ["var", "int", "varchat"],
      ans: 0,
    },
    {
      q: "typeof null natijasi?",
      opts: ["null", "object", "undefined"],
      ans: 1,
    },
  ],
  general: [
    {
      q: "GitHub nima?",
      opts: ["Dizayn", "Versiya nazorati", "Brauzer"],
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
});
