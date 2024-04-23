// JavaScript code here
let words = {
    fruits: ["apple", "banana", "orange", "grape", "pineapple" , "blueberry" , "cherry" , "kiwi" , "watermelon"],
    countries: ["thailand", "japan", "france", "usa", "china" , "argentina",  "australia" , "brazil" , "germany"],
    animals: ["bird", "lion", "cat", "dog", "snake" , "bear" , "tiger" , "deer" , "horse"]
};

let randomWord;
let wordArray;
let guessedWord = [];
let score = 0;  
let currentCategory = ""; // Variable to store the current category
let hintCount = 0; // เพิ่มตัวแปร global สำหรับเก็บจำนวนครั้งที่ใช้งาน giveHint()
let maxHintPerRound = 3; // จำนวน hint สูงสุดต่อรอบ
let hintCountElement = document.getElementById("hintCount");
let hp = 100; // เลือดdefault

function updateHP() {
    const progressBar = document.querySelector('.prog');
    progressBar.style.width = hp + '%';
    // เปลี่ยนสีแทบเลือด
    if (hp > 10) {
        switch (hp) {
            case 80:
                progressBar.style.backgroundColor = '#41ff30';
                break;
            case 60:
                progressBar.style.backgroundColor = '#ddff1d';
                break;
            case 40:
                progressBar.style.backgroundColor = '#ff7c01';
                break;
            case 20:
                progressBar.style.backgroundColor = '#ca0202';
                break;
        }
    } else if (hp <= 0) {
        alert('GAME OVER');
        resetGame2();
        return; // หยุดการทำงานของ checkGuess เมื่อเกมจบ
    }
}


function resetHPBar(){
    const hp = document.querySelector('.prog');
    hp.style.width = 100 + '%';
    hp.style.backgroundColor = '#10c000';
}

function displayWord() {
    document.getElementById("wordDisplay").textContent = guessedWord.join(' ');
    
}

function checkGuess() {
    let guess = document.getElementById("guessInput").value.toLowerCase();
    if (guess.length === 1) {
        if (wordArray.includes(guess)) {
            let guessedIndexes = [];
            for (let i = 0; i < wordArray.length; i++) {
                if (wordArray[i] === guess && !guessedWord.includes(guess, i)) {
                    guessedIndexes.push(i);
                }
            }
            if (guessedIndexes.length > 0) {
                for (let index of guessedIndexes) {
                    guessedWord[index] = guess;
                }
                displayWord();
                document.getElementById("resultDisplay").textContent = "Correct!";
                score += 10;
                document.getElementById("score").textContent = score;
                if (!guessedWord.includes('_')) {
                    alert("Congratulations! You guessed the word!");
                    // Additional logic to restart the game or display high score
                }
            } else {
                document.getElementById("resultDisplay").textContent = "Already guessed!";
            }
        } else {
            document.getElementById("resultDisplay").textContent = "Incorrect!";
            hp -= 20;
            updateHP();
            score -= 5; // ลดคะแนนทีละ 5 เมื่อเกิดการตอบผิด
            document.getElementById("score").textContent = score;
        }
    } else {
        alert("Please enter only one letter.");
    }
    document.getElementById("guessInput").value = "";
}




function startNewGame(category) {
    let selectedWords;
    if (category === 'custom') {
        let customWord = document.getElementById("customWordInput").value.toLowerCase();
        if (customWord.trim() === "") {
            alert("Please enter a word.");
            return;
        }
        selectedWords = [customWord];
    } else {
        selectedWords = words[category];
    }
    currentCategory = category; // Update the current category
    randomWord = selectedWords[Math.floor(Math.random() * selectedWords.length)];
    wordArray = randomWord.split('');
    guessedWord = [];
    document.getElementById("score").textContent = score;
    initGame();
    //reset hp
    resetHPBar();
    // Reset hint count and update hint count display
    hintCount = 0;
    hintCountElement.textContent = maxHintPerRound;
}

function initGame() {
    let newGuessedWord = new Array(wordArray.length).fill('_');
    guessedWord = newGuessedWord;
    displayWord();

    // ล้างค่าใน input field
    document.getElementById("customWordInput").value = "";
}


function Nextword() {
    // Get words from the current category
    let selectedWords = words[currentCategory];
    randomWord = selectedWords[Math.floor(Math.random() * selectedWords.length)];
    wordArray = randomWord.split('');
    guessedWord = [];
    document.getElementById("score").textContent = score;
    initGame();
}

function giveHint() {
    if (hintCount < maxHintPerRound) { // ตรวจสอบว่ายังสามารถกด hint ได้อีกหรือไม่
        hintCount++;
        hintCountElement.textContent = maxHintPerRound - hintCount; // แสดงจำนวนครั้งที่สามารถกด hint ได้อีกใน HTML

        score -= 1; // ลดคะแนนทุกครั้งที่ใช้งาน Hint
        document.getElementById("score").textContent = score; // แสดงคะแนนใน HTML

        let notGuessedLetters = wordArray.filter(letter => !guessedWord.includes(letter));
        // เลือกอักษรแรกที่ยังไม่ถูกเดา
        let hintLetter = notGuessedLetters[0];
        // หา index ของ hintLetter ใน wordArray
        let hintIndex = wordArray.indexOf(hintLetter);
        // เฉลยคำตอบในช่องคำตอบที่ hintIndex
        guessedWord[hintIndex] = hintLetter;
        // แสดงคำที่ถูกเดาลงบนหน้าจอ
        displayWord();
    } else {
        alert("You've used all your hints for this round."); // แจ้งเตือนเมื่อกด hint ครบตามจำนวนที่กำหนด
    }
}

function resetGame() {
    guessedWord = [];
    score = 0;
    hintCount = 0;
    hp = 100;
    currentCategory = "";
    document.getElementById("guessInput").value = "";
    document.getElementById("score").textContent = score;
    document.getElementById("hintCount").textContent = hintCount; // รีเซ็ตจำนวนครั้งที่ใช้งาน Hint ใน HTML
    document.getElementById("resultDisplay").textContent = "";
    document.getElementById("customWordInput").value = "";
    displayWord();
    resetHPBar();
}

function resetGame2() {
    guessedWord = [];
    score = 5;
    hintCount = 0;
    hp = 100;
    currentCategory = "";
    document.getElementById("guessInput").value = "";
    document.getElementById("score").textContent = score;
    document.getElementById("hintCount").textContent = hintCount; // รีเซ็ตจำนวนครั้งที่ใช้งาน Hint ใน HTML
    document.getElementById("resultDisplay").textContent = "";
    document.getElementById("customWordInput").value = "";
    displayWord();
    resetHPBar();
}


function startCustomGame() {
    let customWord = document.getElementById("customWordInput").value.toLowerCase();
    if (customWord.trim() === "") {
        alert("Please enter a word.");
        return;
    }
    startNewGame('custom');

    // ซ่อนฟอร์มที่มี id เป็น "customWordForm"
    document.getElementById("customWordForm").style.display = "none";

    // ล้างค่าใน input field
    document.getElementById("customWordInput").value = "";
}

// Initialize the game
initGame();
