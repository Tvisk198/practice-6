// Навігація між завданнями
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Видалити активний клас у всіх кнопок і секцій
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.task-section').forEach(sec => sec.classList.remove('active'));

        // Додати активний клас до натиснутої кнопки
        button.classList.add('active');

        // Показати відповідну секцію
        const targetId = button.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// Завдання 1: Зміна кольору фону
function changeBgColor() {
    const select = document.getElementById('bgColorSelect');
    document.body.style.background = select.value;
}

// Завдання 2: Тестування логічної функції
function checkLogic() {
    // Отримуємо вибрані радіо кнопки та операцію
    const inputA = document.querySelector('input[name="inputA"]:checked').value;
    const inputB = document.querySelector('input[name="inputB"]:checked').value;
    const op = document.getElementById('logicOp').value;
    
    // Перетворюємо в числа (булеві значення)
    const valA = parseInt(inputA);
    const valB = parseInt(inputB);
    
    let result;
    let opName;

    // Виконуємо обрану логічну операцію
    if (op === 'OR') {
        result = valA || valB;
        opName = 'АБО (OR)';
    } else if (op === 'AND') {
        result = valA && valB;
        opName = 'І (AND)';
    } else if (op === 'XOR') {
        result = valA ^ valB;
        opName = 'Виключне АБО (XOR)';
    }
    
    // Вивід результату
    const resultBox = document.getElementById('logicResult');
    resultBox.classList.remove('hidden', 'success', 'error');
    
    resultBox.innerHTML = `Вхідні дані: A=${valA}, B=${valB}. <br>Результат операції <strong>${opName}</strong> = ${result}`;
    resultBox.classList.add('success');
}

// Завдання 3: Інтерактивний тест (Динамічний Квіз)
const quizData = [
    {
        question: "Яка мова використовується для створення структури веб-сторінок?",
        options: ["HTML", "JavaScript", "CSS", "Python"],
        correct: 0
    },
    {
        question: "Що означає абревіатура DOM?",
        options: ["Data Object Manager", "Document Object Model", "Dynamic Oriented Markup", "Digital Output Method"],
        correct: 1
    },
    {
        question: "Який тег використовується для підключення JavaScript?",
        options: ["<js>", "<javascript>", "<script>", "<code>"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

function loadQuiz() {
    const qData = quizData[currentQuestion];
    document.getElementById('qCurrent').innerText = currentQuestion + 1;
    document.getElementById('qTotal').innerText = quizData.length;
    document.getElementById('quizQuestion').innerText = qData.question;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    qData.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option-btn';
        btn.innerText = opt;
        btn.onclick = () => selectQuizOption(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function selectQuizOption(selectedIndex, btnElement) {
    const buttons = document.querySelectorAll('.quiz-option-btn');
    buttons.forEach(b => b.style.pointerEvents = 'none'); // Вимикаємо кліки
    
    const correctIndex = quizData[currentQuestion].correct;
    
    if (selectedIndex === correctIndex) {
        btnElement.classList.add('correct');
        score++;
    } else {
        btnElement.classList.add('wrong');
        buttons[correctIndex].classList.add('correct'); // Підсвічуємо правильну
    }
    
    // Перехід до наступного питання через 1.5 сек
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuiz();
        } else {
            document.getElementById('quizApp').classList.add('hidden');
            const finalBox = document.getElementById('quizFinal');
            finalBox.classList.remove('hidden');
            document.getElementById('quizScore').innerText = score;
        }
    }, 1500);
}

function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('quizApp').classList.remove('hidden');
    document.getElementById('quizFinal').classList.add('hidden');
    loadQuiz();
}

// Запуск квізу при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    loadQuiz();
});

// Завдання 4: Реєстрація (Заглушка з перевіркою)
function submitRegistration(event) {
    event.preventDefault(); // Зупиняємо стандартну відправку форми
    
    const user = document.getElementById('regUsername').value;
    const pass = document.getElementById('regPassword').value;
    const email = document.getElementById('regEmail').value;

    if (pass.length < 6) {
        alert('Пароль має містити мінімум 6 символів!');
        return;
    }

    alert(`Реєстрація успішна!\nКористувач: ${user}\nEmail: ${email}`);
    document.getElementById('regForm').reset();
}

// Завдання 5: Калькулятор
function calculateSum() {
    const inputA = document.getElementById('calcA').value;
    const inputB = document.getElementById('calcB').value;
    const resultBox = document.getElementById('calcResult');
    
    resultBox.classList.remove('hidden', 'success', 'error');

    if (inputA === "" || inputB === "") {
        resultBox.textContent = 'Будь ласка, введіть обидва числа!';
        resultBox.classList.add('error');
        return;
    }

    const sum = parseFloat(inputA) + parseFloat(inputB);
    resultBox.textContent = `Сума: ${inputA} + ${inputB} = ${sum}`;
    resultBox.classList.add('success');
}

// Завдання 6: Email форма з правильним кодуванням кирилиці
function sendEmail(event) {
    event.preventDefault(); // Зупиняємо стандартну відправку форми
    
    // Отримуємо значення полів
    const name = document.getElementById('emailName').value;
    const subject = document.getElementById('emailSubject').value;
    const message = document.getElementById('emailMessage').value;
    
    // Формуємо текст листа
    const bodyText = `Ім'я: ${name}\n\nПовідомлення:\n${message}`;
    
    // Кодуємо рядки у формат URI для коректної передачі кирилиці
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(bodyText);
    
    // Відкриваємо поштовий клієнт користувача з уже закодованими даними
    window.location.href = `mailto:test@example.com?subject=${encodedSubject}&body=${encodedBody}`;
}
