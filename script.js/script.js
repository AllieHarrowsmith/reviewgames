console.log("script.js loaded ✅");

// QUESTIONS
const questionsOriginal = [
  { text: "Thin sheets of tightly packed cells.", answer: "Epithelial" },
  { text: "Lines internal organs and covers surfaces.", answer: "Epithelial" },
  { text: "Forms skin and glands.", answer: "Epithelial" },
  { text: "Protects from dehydration.", answer: "Epithelial" },

  { text: "Holds other tissues together.", answer: "Connective" },
  { text: "Has cells and fibers in a matrix.", answer: "Connective" },
  { text: "Examples include bones, tendons, and blood.", answer: "Connective" },
  { text: "Stores fat and provides support.", answer: "Connective" },

  { text: "Bundles of long cells that contract.", answer: "Muscle" },
  { text: "Skeletal muscle moves bones.", answer: "Muscle" },
  { text: "Smooth muscle is involuntary.", answer: "Muscle" },

  { text: "Transmits electrical signals.", answer: "Nervous" }
];

// ELEMENTS
const q = document.getElementById("q");
const pick = document.getElementById("pick");
const fb = document.getElementById("fb");
const checkBtn = document.getElementById("check");
const nextBtn = document.getElementById("next");
const restartBtn = document.getElementById("restart");
const scoreEl = document.getElementById("score");
const statusEl = document.getElementById("status");
const banner = document.getElementById("banner");
const bName = document.getElementById("bName");
const bTime = document.getElementById("bTime");
const nameInput = document.getElementById("name");

let questions = [];
let index = 0;
let answered = 0;
let correct = 0;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function updateScore() {
  const pct = answered === 0 ? 0 : Math.round((correct / answered) * 100);
  scoreEl.textContent = `Score: ${correct} / ${answered} (${pct}%)`;

  if (answered === questions.length && pct === 100) {
    statusEl.textContent = "✅ Round complete — 100%!";
    statusEl.style.color = "green";
    banner.style.display = "block";
    bName.textContent = "Name: " + (nameInput.value || "Student");
    bTime.textContent = "Date & Time: " + new Date().toLocaleString();
  } else {
    statusEl.textContent = "Round in progress";
    statusEl.style.color = "black";
    banner.style.display = "none";
  }
}

function loadQuestion() {
  const current = questions[index];
  q.textContent = `Question ${index + 1} of ${questions.length}: ${current.text}`;
  pick.value = "";
  fb.textContent = "";
  checkBtn.disabled = false;
  nextBtn.disabled = true;
}

function startRound() {
  questions = shuffle(questionsOriginal.slice());
  index = 0;
  answered = 0;
  correct = 0;
  updateScore();
  loadQuestion();
}

checkBtn.onclick = () => {
  if (!pick.value) return;
  answered++;
  if (pick.value === questions[index].answer) {
    correct++;
    fb.textContent = "✅ Correct!";
    fb.style.color = "green";
  } else {
    fb.textContent = "❌ Incorrect. Correct answer: " + questions[index].answer;
    fb.style.color = "red";
  }
  updateScore();
  checkBtn.disabled = true;
  nextBtn.disabled = false;
};

nextBtn.onclick = () => {
  index++;
  if (index >= questions.length) {
    q.textContent = "Round finished. Screenshot if you have 100%.";
    nextBtn.disabled = true;
    return;
  }
  loadQuestion();
};

restartBtn.onclick = startRound;

// START
startRound();
