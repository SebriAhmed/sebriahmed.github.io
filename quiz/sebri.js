const questions = [
    {
        vraag: "Vraag 1: Welke vlag is dit?",
        antwoorden: ["Rusland", "Frankrijk", "Duitsland", "China"], 
        juist: 1, 
        img: "images/FranceFlag.png"
    }
    ,
    {
        vraag: "Vraag 2: Welke vlag is dit?",
        antwoorden: ["Amerika", "Zwitserland", "Australië", "Engeland"],
        juist: 2,
        img: "images/AustraliaFlag.png"
    }
    ,
    {
        vraag: "Vraag 3: Welke vlag is dit?",
        antwoorden: ["België", "Nederland", "Luxemburg", "Frankrijk"],
        juist: 1,
        img: "images/NetherlandsFlag.png"
    },
    {
        vraag: "Vraag 4: Welke vlag is dit?",
        antwoorden: ["China", "Japan", "Zuid-Korea", "Vietnam"],
        juist: 1,
        img: "images/JapanFlag.png"
    },
    {
        vraag: "Vraag 5: Welke vlag is dit?",
        antwoorden: ["Griekenland", "Portugal", "Italië", "Spanje"],
        juist: 3,
        img: "images/SpainFlag.png"
    },
    {
        vraag: "Vraag 6: Welke vlag is dit?",
        antwoorden: ["Colombia", "Brazilië", "Mexico", "Argentinië"],
        juist: 2,
        img: "images/MexicoFlag.png"
    },
    {
        vraag: "Vraag 7: Welke vlag is dit?",
        antwoorden: ["Verenigd Koninkrijk", "Ierland", "Schotland", "Canada"],
        juist: 0,
        img: "images/UKFlag.png"
    },
    {
        vraag: "Vraag 8: Welke vlag is dit?",
        antwoorden: ["Tunesië", "Egypte", "Marokko", "Turkije"],
        juist: 3,
        img: "images/TurkeyFlag.png"
    },
    {
        vraag: "Vraag 9: Welke vlag is dit?",
        antwoorden: ["Noorwegen", "Zweden", "Finland", "Denemarken"],
        juist: 1,
        img: "images/SwedenFlag.png"
    },
    {
        vraag: "Vraag 10: Welke vlag is dit?",
        antwoorden: ["Bangladesh", "Pakistan", "India", "Nepal"],
        juist: 2,
        img: "images/IndiaFlag.png"
    },
    {
        vraag: "Vraag 11: Welke vlag is dit?",
        antwoorden: ["China", "Amerika", "Canada", "Nieuw-Zeeland"],
        juist: 2,
        img: "images/CanadaFlag.png"
    },
    {
        vraag: "Vraag 12: Welke vlag is dit?",
        antwoorden: ["Ghana", "Nigeria", "Egypte", "Zuid-Afrika"],
        juist: 3,
        img: "images/SouthAfricaFlag.png"
    },
    {
        vraag: "Vraag 13: Welke vlag is dit?",
        antwoorden: ["Oostenrijk", "Duitsland", "Zwitserland", "Polen"],
        juist: 1,
        img: "images/GermanyFlag.png"
    },
    {
        vraag: "Vraag 14: Welke vlag is dit?",
        antwoorden: ["Slowakije", "Tsjechië", "Hongarije", "Polen"],
        juist: 3,
        img: "images/PolandFlag.png"
    },
    {
        vraag: "Vraag 15: Welke vlag is dit?",
        antwoorden: ["Spanje", "Italië", "Vaticaanstad", "Portugal"],
        juist: 1,
        img: "images/ItalyFlag.png"
    },
    {
        vraag: "Vraag 16: Welke vlag is dit?",
        antwoorden: ["Brazilië", "Mexico", "Peru", "Colombia"],
        juist: 0,
        img: "images/BrazilFlag.png"
    },
    {
        vraag: "Vraag 17: Welke vlag is dit?",
        antwoorden: ["Noorwegen", "Denemarken", "Zwitserland", "Finland"],
        juist: 2,
        img: "images/SwitzerlandFlag.png"
    },
    {
        vraag: "Vraag 18: Welke vlag is dit?",
        antwoorden: ["Griekenland", "Cyprus", "Albanië", "Turkije"],
        juist: 0,
        img: "images/GreeceFlag.png"
    },
    {
        vraag: "Vraag 19: Welke vlag is dit?",
        antwoorden: ["Oekraine", "Rusland", "Wit-Rusland", "Kazachstan"],
        juist: 1,
        img: "images/RussiaFlag.png"
    },
    {
        vraag: "Vraag 20: Welke vlag is dit?",
        antwoorden: ["Australië", "Marokko", "Canada", "Amerika"],
        juist: 3,
        img: "images/USAFlag.png"
    }
];

let huidigeVraag = 0;
let score = 0;

const startDiv = document.querySelector('.startContainer');
const startBox = document.querySelector('.start');
const nameInput = document.getElementById('nameInput');
const startBtn = document.getElementById('startBtn');
const quizContainer = document.querySelector('.quiz-container');
const vraagEl = document.getElementById('question');
const antwoordenEl = document.getElementById('answers');
const imgBox = document.getElementById('imgbox');
const scoreEl = document.getElementById('score');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const finalEl = document.getElementById('final');
const playAgainBtn = document.getElementById('playAgainBtn');

startBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    if(name === "") return;
    startDiv.style.display = 'none';
    quizContainer.style.display = 'block';
    toonVraag();
});

function toonVraag() {
    const q = questions[huidigeVraag];
    imgBox.innerHTML = `<img src="${q.img}" alt="Vlag">`;
    vraagEl.textContent = q.vraag;
    antwoordenEl.innerHTML = "";
    feedbackEl.textContent = "";
    nextBtn.style.display = "none";

    // Knoppen toevoegen
    q.antwoorden.forEach((antwoord, idx) => {
        const btn = document.createElement('button');
        btn.textContent = antwoord;
        btn.disabled = false;
        btn.classList.remove('selected', 'fout'); // verwijder oude styling
        btn.addEventListener('click', () => selecteerAntwoord(idx, btn));
        antwoordenEl.appendChild(btn);
    });
}

function selecteerAntwoord(idx, button) {
    Array.from(antwoordenEl.children).forEach(btn => btn.disabled = true);
    const juistIdx = questions[huidigeVraag].juist;

    if(idx === juistIdx){
        score += 5;
        feedbackEl.textContent = "Goed gedaan! +5 punten";
        feedbackEl.style.color = "green";
        button.classList.add("selected");
    } else {
        score -= 5;
        feedbackEl.textContent = `Fout! Het juiste antwoord is: ${questions[huidigeVraag].antwoorden[juistIdx]}`;
        feedbackEl.style.color = "red";
        button.classList.add("fout");
    }
    scoreEl.textContent = `Score: ${score}`;
    nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener('click', () => {
    huidigeVraag++;
    if(huidigeVraag < questions.length){
        toonVraag();
    } else {
        toonResultaat();
    }
});

function toonResultaat(){
    vraagEl.textContent = "Quiz afgelopen!";
    imgBox.innerHTML = "";
    antwoordenEl.innerHTML = "";
    nextBtn.style.display = "none";
    feedbackEl.textContent = "";
    finalEl.style.display = "block";
    finalEl.textContent = `Jouw eindscore is: ${score} van ${questions.length*5} punten.`;
    playAgainBtn.style.display = "inline-block";
}

playAgainBtn.addEventListener('click', () => {
    huidigeVraag = 0;
    score = 0;
    scoreEl.textContent = `Score: ${score}`;
    finalEl.style.display = "none";
    playAgainBtn.style.display = "none";
    quizContainer.style.display = "block";
    toonVraag();
});

document.addEventListener('DOMContentLoaded', function() {
    const naamDisplay = document.querySelector('.naam');
    const naamInput = document.querySelector('#nameInput');
    naamInput.addEventListener('input', function() {
      naamDisplay.textContent = naamInput.value;
    });
  });