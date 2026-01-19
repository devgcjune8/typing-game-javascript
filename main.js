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

const wordsArray = ["ability", "able", "above", "abroad", 
    "absence", "abuse", "academy", "accept", "access", 
    "account", "accused", "achieve", "ace", "acid", 
    "acquire", "across", "act", "acting", "action", 
    "active", "actor", "actual", "acute", "add", "address", 
    "admit", "adopt", "adult", "advance", "adverse", 
    "advice", "advised", "adviser", "advise", "affect", 
    "afford", "afraid", "after", "again", "against", "age", 
    "aged", "agency", "agenda", "agent", "ago", "agree", 
    "ahead", "air", "airline", "airport", "alarm", "album", 
    "alcohol", "alike", "alive", "all", "alleged", "almost", 
    "allow", "alone", "along", "already", "also", "alter", 
    "always", "among", "and", "analyst", "ancient", "anger", 
    "angle", "angry", "animal", "annual", "another", "answer", 
    "anxiety", "anxious", "anyone", "anyway", "apart", "ape", 
    "appeal", "appear", "apple", "applied", "apply", "are", "arena", 
    "argue", "arise", "arm", "arrange", "arrival", "arrive", "array", 
    "article", "artist", "aside", "ask", "aspect", "assault", "assess", 
    "asset", "assist", "assumed", "assume", "assured", "ate", "attempt", 
    "attract", "attack", "attend", "auction", "audio", "audit", 
    "august", "author", "avenue", "average", "avoid", "award", 
    "aware", "away", "baby", "back", "backed", "backing", "bad", 
    "badly", "bag", "bake", "baker", "balance", "ball", "bank", 
    "banking", "barely", "barrier", "base", "bases", "basic", 
    "basis", "bat", "battery", "battle", "beach", "beaker", "beam", 
    "bearing", "beating", "beauty", "became", "because", "become",
    "bed", "bedroom", "bee", "been", "before", "began", "begin", 
    "begun", "behalf", "behind", "being", "belief", "believe", 
    "bell", "belong", "below", "bench", "bend", "beneath", 
    "benefit", "best", "better", "between", "beyond", "big", 
    "billion", "billy", "binding", "bird", "birth", "bishop", 
    "bit", "black", "blame", "blind", "block", "blood", "board", 
    "boost", "booth", "border", "bottle", "bottom", "bought", 
    "bound", "box", "boy", "brain", "branch", "brand", "bread", 
    "break", "breath", "breed", "brief", "bright", "bring", "broad",
    "broke", "brother", "brought", "brown", "budget", "build", 
    "built", "bun", "burden", "bureau", "burning", "bus", "busy",
    "but", "button", "buy", "buyer", "bye", "cab", "cabinet", 
    "cable", "cactus", "calibre", "calif", "calling", "calm", 
    "came", "camera", "can", "cancer", "capable", "capital", 
    "captain", "caption", "capture", "carbon", "car", "card",
    "career", "careful", "carrier", "carry", "cash", "castle", 
    "cat", "catch", "caught", "cause", "caution", "ceiling", 
    "center", "central", "centric", "centre", "centum", 
    "century", "certain", "chain", "chair", "chamber", "chance",
    "change", "channel", "chapter", "charge", "charity", 
    "charlie", "chart", "chase", "chat", "cheap", "checked",
    "check", "chest", "chicken", "chief", "child", "china", 
    "choice", "choose", "chosen", "chose", "chronic", 
    "church", "circle", "circuit", "city", "civil", "claim", 
    "classic", "classes", "class", "clean", "clear", "client", 
    "click", "climate", "clock", "closed", "closer", "close", 
    "closing", "closure", "clothes", "coach", "coast", "coat",
    "coffee", "cold", "collect", "college", "column", "combat",
    "combine", "come", "comfort", "coming", "command", "comment", "common", "compact", "company", "compare", "compete", "complex", "comply", "concept", "concern", "concert", "conduct", "confirm", "connect", "consent", "consist", "contact", "contain", "content", "contest", "context", "control", "convert", "cook", "cool", "copper", "corner", "correct", "costly", "could", "council", "counsel", "counter", "country", "count", "county", "couple", "course", "court", "cover", "covers", "cow", "craft", "crash", "cream", "create", "credit", "crime", "crisis", "cross", "crow", "crowd", "crown", "crucial", "cry", "crystal", "cub", "culture", "current", "curve", "custom", "cut", "cute", "cutting", "cycle", "dab", "dad", "daily", "damage", "dam", "dance", "danger", "dark", "dated", "day", "dealing", "dealt", "dealer", "death", "debate", "debut", "decade", "decided", "decide", "decline", "default", "defeat", "defence", "defend", "deficit", "define", "degree", "delay", "deliver", "demand", "den", "density", "depend", "deposit", "depth", "deputy", "desert", "design", "desire", "desktop", "despite", "destroy", "detail", "detect", "develop", "device", "devoted", "diamond", "did", "differ", "digital", "dinner", "dip", "direct", "discuss", "disease", "display", "dispute", "distant", "diverse", "divided", "doctor", "doing", "dollar", "domain", "dot", "double", "doubt", "dozen", "draft", "drama", "drawing", "drawn", "dream", "dress", "drill", "drink", "driven", "driver", "drive", "driving", "drove", "dug", "during", "dynamic", "dying", "each", "eager", "ear", "early", "earth", "eastern", "easily", "eating", "eat", "economy", "edition", "editor", "effect", "effort", "egg", "eight", "eighth", "either", "elderly", "element", "eleven", "elite", "elf", "emerge", "empty", "end", "enemy", "engaged", "enhance", "enjoy", "enter", "entry", "equal", "error", "essence", "even", "event", "evening", "ever", "every", "evident", "evil", "exactly", "examine", "example", "excited", "exclude", "exhibit", "exist", "exit", "expense", "explain", "explore", "express", "extra", "extreme", "eye", "face", "fact", "factory", "faculty", "failing", "failure", "fair", "faith", "false", "fan", "far", "fashion", "fat", "fault", "feature", "federal", "feeling", "feel", "fell", "few", "fibre", "fiction", "field", "fifteen", "fifth", "fifty", "fight", "filling", "finance", "finding", "fine", "fin", "fire", "first", "fishing", "fish", "fitness", "fit", "five", "fixed", "fix", "flash", "fleet", "floor", "fluid", "fly", "focus", "foreign", "forever", "formula", "forth", "fortune", "forty", "forward", "for", "forum", "founder", "found", "four", "fox", "frame", "frank", "fraud", "freedom", "fresh", "from", "front", "fruit", "fry", "fully", "funny", "fun", "further", "gallery", "game", "gas", "gateway", "gel", "general", "genetic", "genuine", "get", "giant", "gigabit", "girl", "given", "glass", "globe", "god", "going", "gold", "gone", "good", "got", "grace", "grade", "grand", "grant", "grass", "greater", "great", "green", "gross", "group", "grown", "guard", "guess", "guest", "guide", "had", "hair", "hanging", "happy", "harry", "has", "hat", "have", "heading", "healthy", "hear", "hearing", "heart", "heavily", "heavy", "helpful", "helping", "hence", "hen", "here", "herself", "her", "hide", "highway", "himself", "his", "history", "hit", "holding", "holiday", "hope", "horse", "hotel", "house", "housing", "however", "huge", "human", "hundred", "husband", "ice", "ideal", "illegal", "illness", "ill", "image", "imaging", "imagine", "improve", "include", "index", "initial", "ink", "inner", "input", "inquiry", "insight", "install", "instant", "instead", "intense", "interim", "into", "involve", "iron", "irony", "issue", "jab", "jam", "jar", "jet", "job", "jog", "jointly", "joint", "journal", "journey", "judge", "jug", "juice", "jump", "justice", "justify", "keeping", "keep", "key", "kick", "killing", "kill", "kingdom", "kitchen", "kit", "knowing", "known", "label", "lace", "landing", "largely", "large", "laser", "lasting", "later", "laugh", "layer", "lay", "leading", "learned", "learn", "lease", "least", "leave", "legal", "leisure", "let", "level", "liberal", "liberty", "license", "library", "life", "light", "like", "limited", "limit", "listing", "lit", "local", "logical", "logic", "loose", "lot", "love", "lower", "loyalty", "lucky", "lunch", "lying", "machine", "mad", "magic", "main", "major", "maker", "manager", "man", "map", "march", "married", "mars", "massive", "match", "mat", "maximum", "mayor", "may", "meaning", "meant", "measure", "medical", "media", "meeting", "meet", "mention", "message", "met", "metal", "might", "million", "mineral", "minimal", "minimum", "minor", "minus", "missing", "mission", "mistake", "mixture", "mix", "mixed", "model", "mom", "money", "monitor", "monthly", "month", "moral", "more", "morning", "motor", "mount", "mouse", "mouth", "move", "movie", "mud", "mug", "mum", "musical", "music", "mystery", "nap", "natural", "near", "need", "needs", "neither", "nervous", "net", "network", "neutral", "never", "newly", "new", "night", "nine", "noble", "nod", "noise", "north", "nose", "notable", "nothing", "not", "noted", "novel", "nowhere", "now", "nuclear", "nurse", "nursing", "nut", "oar", "obvious", "ocean", "odd", "offence", "offer", "officer", "often", "old", "one", "ongoing", "only", "opening", "open", "operate", "opinion", "optical", "order", "organic", "other", "ought", "outcome", "outdoor", "outlook", "outside", "our", "out", "overall", "owl", "own", "pacific", "package", "painted", "paint", "panel", "paper", "parking", "partial", "partner", "party", "passage", "passing", "passion", "passive", "patient", "pat", "pattern", "payable", "paw", "payment", "pealing", "peace", "peg", "penalty", "pending", "pension", "perfect", "perform", "perhaps", "pet", "phase", "phoenix", "phone", "photo", "picking", "picture", "piece", "pilot", "pioneer", "pin", "pitch", "pit", "place", "plain", "plane", "plant", "plastic", "plate", "pointed", "point", "popular", "pop", "portion", "pot", "pound", "poverty", "power", "precise", "predict", "premier", "premium", "prepare", "present", "press", "prevent", "price", "pride", "primary", "prime", "printer", "print", "prior", "privacy", "private", "prize", "problem", "proceed", "process", "produce", "product", "profile", "project", "promise", "promote", "proof", "protect", "protein", "protest", "proudly", "proud", "prove", "provide", "publish", "pull", "pup", "purpose", "pushing", "push", "put", "qualify", "quality", "quarter", "queen", "quick", "quiet", "quite", "race", "radical", "radio", "rag", "railway", "raise", "ram", "range", "rapid", "rap", "rat", "ratio", "reach", "reading", "readily", "ready", "realise", "reality", "receipt", "receive", "recover", "refer", "reflect", "regular", "related", "release", "remains", "removal", "removed", "replace", "request", "require", "reserve", "resolve", "respect", "respond", "restore", "retired", "revenue", "reverse", "rice", "ride", "right", "rival", "river", "rollout", "roman", "rough", "round", "route", "routine", "row", "royal", "rub", "rug", "running", "run", "rural", "sale", "satisfy", "sat", "saw", "scale", "scene", "science", "scope", "score", "section", "see", "segment", "sell", "sense", "serious", "serve", "service", "serving", "session", "set", "setting", "seven", "seventh", "several", "shall", "shape", "share", "sharp", "sheet", "shelf", "shell", "shift", "shirt", "shock", "shoot", "shortly", "short", "showing", "shown", "sight", "silence", "silicon", "similar", "since", "sir", "sitting", "sit", "sixteen", "sixth", "sixty", "sized", "skilled", "skill", "sleep", "slide", "small", "smart", "smile", "smith", "smoking", "smoke", "sob", "society", "solid", "solve", "somehow", "someone", "sorry", "sound", "south", "sow", "space", "spare", "speaker", "special", "species", "speed", "spend", "spent", "split", "spoke", "sponsor", "sport", "staff", "stage", "stake", "stand", "station", "start", "state", "stay", "steam", "steel", "stick", "still", "stock", "stone", "stood", "storage", "store", "storm", "story", "strange", "stretch", "strip", "stuck", "studied", "student", "study", "stuff", "style", "subject", "succeed", "success", "sugar", "suggest", "suite", "summary", "super", "support", "suppose", "supreme", "surface", "surgery", "surplus", "survive", "suspect", "sustain", "sweet", "table", "taken", "tan", "tap", "taste", "taxes", "teacher", "teach", "teeth", "telecom", "telling", "tension", "ten", "texas", "thank", "theatre", "theft", "their", "thereby", "theme", "there", "therapy", "these", "thick", "thing", "think", "third", "those", "thought", "three", "threw", "through", "throw", "tide", "tight", "times", "tip", "tired", "title", "today", "toe", "tonight", "topic", "top", "totally", "total", "touched", "touch", "tough", "towards", "tower", "tow", "track", "trade", "traffic", "train", "treat", "trend", "trial", "tried", "tries", "trouble", "truly", "trust", "truth", "tug", "turning", "twice", "two", "typical", "under", "undue", "uniform", "union", "unity", "unknown", "until", "unusual", "upgrade", "upper", "upscale", "upset", "urban", "usage", "use", "usual", "utility", "valid", "value", "van", "variety", "various", "vehicle", "venture", "version", "veteran", "vet", "victory", "video", "viewing", "village", "violent", "virtual", "virus", "visible", "visit", "vital", "voice", "waiting", "walking", "wanting", "warning", "warrant", "war", "was", "waste", "watch", "water", "way", "wearing", "weather", "webcast", "website", "wedding", "weekend", "welcome", "welfare", "western", "wet", "whereas", "whereby", "where", "whether", "wheel", "which", "while", "white", "whole", "who", "whose", "why", "wig", "willing", "winning", "win", "without", "witness", "woman", "won", "wordlist", "working", "world", "worry", "worse", "worst", "worth", "would", "wound", "wow", "write", "writing", "written", "wrote", "yak", "yes", "yet", "yield", "young", "youth", "you", "zap", "zero", "zip"]


    
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
    

    if (randomSelectedWord === typedText.toLowerCase()) {
        insertWordtoHTML()
        
        

        event.target.value = ''

        scoreUpdate()
        //pointSound()

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

// function playPointSound() {
//   const pointSound = document.querySelector('#beep');
//   pointSound.play()
//     .then(() => {
//       console.log('Audio is playing');
//     })
//     .catch(error => {
//       console.error('Playback failed:', error);
//     });
// }

// function playWarningSound() {
//   const warningSound = document.querySelector('#warning');
//   warningSound.play()
//     .then(() => {
//       console.log('Audio is playing');
//     })
//     .catch(error => {
//       console.error('Playback failed:', error);
//     });
// }


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
