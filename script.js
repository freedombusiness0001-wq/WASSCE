// Mobile nav toggle
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');
mobileToggle.addEventListener('click', () => navLinks.classList.toggle('open'));

// Active nav links + smooth close mobile
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    navLinks.classList.remove('open');
  });
});

// Navbar shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 12);
});

// Scroll reveal animations
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.12 });
revealElements.forEach(el => observer.observe(el));

// Animated counters
const counters = document.querySelectorAll('.counter');
const animateCounter = counter => {
  const target = +counter.dataset.target;
  let count = 0;
  const step = Math.max(1, Math.floor(target / 80));
  const timer = setInterval(() => {
    count += step;
    if (count >= target) {
      counter.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      counter.textContent = count.toLocaleString();
    }
  }, 18);
};
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.done) {
      entry.target.dataset.done = 'true';
      animateCounter(entry.target);
    }
  });
}, { threshold: 0.7 });
counters.forEach(counter => counterObserver.observe(counter));

// FAQ accordion
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-question').addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

// Quiz functionality
const quizData = [
  {
    question: 'Which organelle is known as the powerhouse of the cell?',
    answers: ['Nucleus', 'Mitochondrion', 'Ribosome', 'Golgi apparatus'],
    correct: 1
  },
  {
    question: 'Solve: 3x + 5 = 20. What is x?',
    answers: ['3', '5', '7', '9'],
    correct: 1
  },
  {
    question: 'Choose the correct synonym of "diligent".',
    answers: ['Lazy', 'Careful', 'Hardworking', 'Rude'],
    correct: 2
  }
];

let currentQuestion = 0;
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const nextBtn = document.getElementById('nextBtn');

function loadQuiz() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = '';
  q.answers.forEach((ans, idx) => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = ans;
    btn.addEventListener('click', () => {
      [...answersEl.children].forEach(c => c.disabled = true);
      btn.classList.add(idx === q.correct ? 'correct' : 'wrong');
      if (idx !== q.correct) answersEl.children[q.correct].classList.add('correct');
    });
    answersEl.appendChild(btn);
  });
}

nextBtn.addEventListener('click', () => {
  currentQuestion = (currentQuestion + 1) % quizData.length;
  loadQuiz();
});
loadQuiz();

// Ripple effect on buttons
function addRipple(e) {
  const btn = e.currentTarget;
  const circle = document.createElement('span');
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - diameter / 2}px`;
  circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - diameter / 2}px`;
  circle.className = 'ripple-ink';
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
}
document.querySelectorAll('.ripple').forEach(btn => btn.addEventListener('click', addRipple));
