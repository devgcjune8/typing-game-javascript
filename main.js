const modes = document.querySelector("#modes")
const modeForm = document.querySelector('#mode-form')
const modeDiv = document.querySelector('.mode-div')
const text = document.querySelector('#text')
const modeBTN = document.querySelector('.mode-btn')
const scoreDisplay = document.querySelector('.score')
const timeDisplay = document.querySelector('.time')
const gameOverDiv = document.querySelector('.game-over-wrapper')
const wordToType = document.querySelector('.word')
const gameWrapper = document.querySelector('.game-wrapper')
const gameStartWrapper = document.querySelector('.game-start-wrapper')
const addedTimeToast = document.querySelector('.toast-added-time')
const addedScoreToast = document.querySelector('.toast-added-score')

const wordsArray = [ 'run', 'walk', 'code', 'computer', 'language', 'compile', 'rust', 'withdrawal', 'monitor', 'science', 'rock', 'metal', 'black', 'mobile', 'electricity', 'temperature', 'wire', 'chemical', 'pink', 'fan', 'blue','mountain', 'bucket', 'rocket', 'basketball', 'hoop', 'squiggly', 'concatenate', 'revamp', 'trait', 'inheritance', 'borrowing', 'ownership','struct', 'vector', 'implement', 'cargo', 'crate', 'unsigned','integer', 'float', 'boolean', 'string', 'character', 'print','escape', 'javascript', 'socks', 'documentation', 'authenticate', 'authorize']

let randomSelectedWord

let score = 0;

let timeRemaining = 25;

let mode = ''

let timeInterval 

let loadedMode = localStorage.getItem('mode') !== null ? localStorage.getItem('mode') : 'mid'

mode.value = loadedMode

const initialPhase = () => {
    gameStartWrapper.innerHTML = 
    `
        <h1>Are you ready to type?</h1>
        <p>Select the mode you like <br> <br>Press Enter to Play</p>
        <button class="play-btn" onclick="startGame()">Play</button>
    `
    timeInterval = ''

    updateToast()
}

function updateToast() {
    if (loadedMode === 'difficult') {
        addedScoreToast.innerHTML = `<h3>+5</h3>`
        addedTimeToast.innerHTML = `<h3>+2</h3>`
    } else if (loadedMode === 'mid') {
        addedScoreToast.innerHTML = `<h3>+3</h3>`
        addedTimeToast.innerHTML = `<h3>+5</h3>`
    } else if (loadedMode === 'easy') {
        addedScoreToast.innerHTML = `<h3>+1</h3>`
        addedTimeToast.innerHTML = `<h3>+10</h3>`
    }
}

initialPhase()

const fetchRandomWord = () => {
    return wordsArray[Math.floor(Math.random() * wordsArray.length)]
}


const insertWordtoHTML = () => {
    randomSelectedWord = fetchRandomWord()
    wordToType.innerText = randomSelectedWord
}

insertWordtoHTML()

const scoreUpdate = () => {
    if (loadedMode === 'difficult') {
        score += 5
    } else if (loadedMode === 'mid') {
        score += 3
    } else if (loadedMode === 'easy') {
        score += 1
    }

    scoreDisplay.innerText = score
}



const gameEnded = () => {
    gameOverDiv.innerHTML = `
        <h1>Game Ended</h1>
        <p>You scored ${score <= 1 ? score + ' point' : score + ' points'}</p>
        <p>Play Again?</p>
        <button class="play-again-btn" onclick="restartGame()">Press Enter</button>
    `
    gameOverDiv.classList.add('ended')
    modeDiv.classList.remove('slideout')
    gameWrapper.classList.remove('centered')
}

const timeUpdate = () => {
    timeRemaining--

    if (timeRemaining > 5) {
        document.body.style.animation = ``
    }
    
    if (timeRemaining <= 5) {
        document.body.style.animation = `warning 1s linear infinite`
    }

    if (timeRemaining <= 0) {
        clearInterval(timeInterval)
        document.body.style.animation = ``
        gameEnded()
    }
    timeDisplay.innerText = `${timeRemaining < 10 ? '0' + timeRemaining + 's' : timeRemaining + 's'}`
}


function startGame() {
    timeInterval = setInterval(timeUpdate, 1000)
    modeDiv.classList.add('slideout')
    gameWrapper.classList.add('centered')
    gameStartWrapper.classList.add('started')
    text.focus()
} 

function restartGame() {
    score = 0;
    timeRemaining = 25;
    timeDisplay.innerText = "25s"
    gameOverDiv.classList.remove('ended')
    timeInterval = setInterval(timeUpdate, 1000)
    modeDiv.classList.add('slideout')
    gameWrapper.classList.add('centered')
    insertWordtoHTML()
    text.focus()
    text.value = ''
    updateToast()
}

text.addEventListener('input', (event) => {
    let typedText = event.target.value
    console.log(typedText)

    if (randomSelectedWord === typedText) {
        insertWordtoHTML()

        event.target.value = ''

        scoreUpdate()

        if (loadedMode === 'difficult') {
            timeRemaining += 2;
        } else if (loadedMode === 'mid') {
            timeRemaining += 5
        } else if (loadedMode === 'easy') {
            timeRemaining += 10
        }

        timeUpdate()

        addedScoreToast.classList.add('toasted')
        addedTimeToast.classList.add('toasted')

        setTimeout(() => {
            addedScoreToast.classList.remove('toasted')
            addedTimeToast.classList.remove('toasted')
        }, 1000)

    }
})

scoreDisplay.style.animation = `expand 5s`

modeBTN.addEventListener('click', () => {
    modeDiv.classList.toggle('slideout')
    gameWrapper.classList.toggle('centered')
})

modeForm.addEventListener('change', (event) => {
    mode = event.target.value
    document.body.style.animation = ``
    localStorage.setItem('mode', mode)
    location.reload()
})

document.addEventListener('keyup', (event) => {
    if (event.code == "Enter") {
        if (!gameStartWrapper.classList.contains('started')) {
            document.querySelector('.play-btn').click()
        } 
        if (gameOverDiv.classList.contains('ended')) {
        document.querySelector('.play-again-btn').click()
        }
    }
  });
