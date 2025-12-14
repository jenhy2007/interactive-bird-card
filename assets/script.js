// --- Initial Setup ---
const birdGroups = document.querySelectorAll('.bird-group');
const cardContainer = document.getElementById('card-container');

// Map click count to the audio file segment name
const audioMap = {
    1: 'sentence1.mp3', // Hotspot 1: Blue Jay
    2: 'sentence2.mp3', // Hotspot 2: Cardinal
    3: 'sentence3.mp3', // Hotspot 3: Woodpeckers
    4: 'sentence4.mp3', // Hotspot 4: Sparrows
};

// We need 4 clicks to complete the sequence
const TOTAL_CLICKS_NEEDED = 4; 
let clickCounter = 0;
let clickedGroups = new Set(); 
let audio; // We will define this when playing, to fix the looping bug

// --- Functions ---

function resetCard() {
    // 1. Reset state variables
    clickCounter = 0;
    clickedGroups.clear();

    // 2. Remove final effects
    cardContainer.classList.remove('finished-sequence'); 

    // 3. Reset the visual elements (Hotspots)
    birdGroups.forEach(group => {
        group.style.pointerEvents = 'auto'; // Re-enable clicking
        group.classList.remove('clicked'); // Remove dimming/clicked state
        group.classList.remove('is-singing'); // Ensure animation class is gone
        group.style.opacity = 1; // Ensure full opacity
        group.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // Ensure background is invisible
    });

    console.log("Card has been reset. Ready for another sequence!");
}


function playAudio(groupElement, filename) {
    // 1. Trigger Animation (Flash the clickable hotspot DIV)
    groupElement.classList.add('is-singing');
    
    // Remove the class after the animation is done (0.3 seconds, matching CSS)
    setTimeout(() => {
        groupElement.classList.remove('is-singing');
    }, 300); 

    // 2. Play Audio: Recreate the audio element for safety on loop
    // THIS FIXES THE SILENCE BUG on subsequent plays.
    audio = new Audio('assets/' + filename); 

    audio.play().catch(error => {
        console.warn(`Audio playback error for ${filename}. Autoplay may be blocked by the browser.`, error);
        // If the audio fails to play, check the browser console for details.
    });
}


function revealFinalMessage() {
    // 1. Adds final flourish effect (finished-sequence CSS class)
    cardContainer.classList.add('finished-sequence'); 
    
    // 2. Disable clicking on the hotspots
    birdGroups.forEach(group => {
        group.style.pointerEvents = 'none'; 
    });

    // 3. Set a timer to automatically reset the card after 5 seconds
    const LOOP_DELAY_MS = 5000; 

    setTimeout(() => {
        resetCard();
    }, LOOP_DELAY_MS); 
}


// --- Main Event Listener ---
birdGroups.forEach(group => {
    group.addEventListener('click', function() {
        const groupKey = this.dataset.group;
        
        // Stop if this bird has already been clicked
        if (clickedGroups.has(groupKey)) {
            return; 
        }

        // Mark this group as clicked (for visual dimming)
        this.classList.add('clicked');
        clickedGroups.add(groupKey);
        
        clickCounter++;
        
        // Always play the corresponding audio and animate
        const audioFile = audioMap[clickCounter];
        playAudio(this, audioFile);
        
        if (clickCounter === TOTAL_CLICKS_NEEDED) {
            // Last click: animate, play sentence4.mp3, THEN trigger the auto-reset
            setTimeout(revealFinalMessage, 700); // 0.7 second delay to let the music finish
        }
    });
});
