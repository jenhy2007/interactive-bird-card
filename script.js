// --- Initial Setup and DEBUGGING CHECKS ---
const birdGroups = document.querySelectorAll('.bird-group');
const audio = document.getElementById('hbd-audio');
const finalMessage = document.getElementById('final-message');
const cardContainer = document.getElementById('card-container');

const TOTAL_CLICKS_NEEDED = 3;
let clickCounter = 0;
let clickedGroups = new Set();

// **DEBUGGING 1: Check if all crucial elements were found in the HTML**
function checkElements() {
    let errorLog = [];
    if (birdGroups.length === 0) {
        errorLog.push("ERROR: Could not find any elements with class 'bird-group'. Check index.html structure.");
    }
    if (!audio) {
        errorLog.push("ERROR: Could not find audio element with ID 'hbd-audio'.");
    }
    if (!finalMessage) {
        errorLog.push("ERROR: Could not find final message element with ID 'final-message'.");
    }
    
    if (errorLog.length > 0) {
        console.error("--- JAVASCRIPT ELEMENT LOADING ERRORS ---");
        errorLog.forEach(msg => console.error(msg));
        alert("CRITICAL ERROR: Card setup failed. See browser console for details.");
    } else {
        console.log("SUCCESS: All HTML elements found.");
    }
}
checkElements();

// **DEBUGGING 2: Check for audio file loading failure**
if (audio) {
    audio.addEventListener('error', function(e) {
        console.error("AUDIO ERROR: hbd_tune.mp3 failed to load. Check the filename and path in index.html, and ensure the file is uploaded.", e);
        alert("WARNING: Audio file (hbd_tune.mp3) failed to load. Interactive features may still work, but there will be no sound.");
    });
}


// --- Functions (Unchanged) ---

function playAudio() {
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
        // The .catch() handles cases where the browser blocks autoplay
        audio.play().catch(error => {
            console.warn("Autoplay block detected. Audio playback requires user interaction.");
        });
    } else {
        console.warn("Attempted to play audio, but audio element was not found.");
    }
}

function revealFinalMessage() {
    birdGroups.forEach(group => {
        group.style.display = 'none';
    });
    
    cardContainer.innerHTML = ''; 
    finalMessage.style.display = 'flex'; 
    cardContainer.appendChild(finalMessage);
}

// --- Main Event Listener (Unchanged Logic) ---
birdGroups.forEach(group => {
    group.addEventListener('click', function() {
        const groupKey = this.dataset.group;
        
        if (clickedGroups.has(groupKey)) {
            return; 
        }

        this.classList.add('clicked');
        clickedGroups.add(groupKey);
        
        playAudio();
        
        clickCounter++;
        console.log(`Click count: ${clickCounter}`); 
        
        if (clickCounter >= TOTAL_CLICKS_NEEDED) {
            setTimeout(revealFinalMessage, 1000); 
        }
    });
});
