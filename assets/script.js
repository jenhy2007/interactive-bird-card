// --- Initial Setup ---
const birdGroups = document.querySelectorAll('.bird-group');
const cardContainer = document.getElementById('card-container');

// Map click count to the audio file segment name
const audioMap = {
    1: 'sentence1.mp3', // Blue Jay
    2: 'sentence2.mp3', // Cardinal
    3: 'sentence3.mp3', // Woodpeckers
    4: 'sentence4.mp3', // Sparrows
};

// We now need 4 clicks to trigger the sequence completion
const TOTAL_CLICKS_NEEDED = 4; 
let clickCounter = 0;
let clickedGroups = new Set(); 
let audio = new Audio(); // Create a dynamic audio object

// --- Functions ---

function playAudio(groupElement, filename) {
    // 1. Trigger Animation on the clickable hotspot DIV
    groupElement.classList.add('is-singing');
    
    // Remove the class after the animation is done (0.3 seconds, matching CSS)
    setTimeout(() => {
        groupElement.classList.remove('is-singing');
    }, 300); 

    // 2. Play Audio
    audio.pause();
    audio.currentTime = 0;
    
    // Set the source path (MUST be 'assets/' + filename)
    audio.src = 'assets/' + filename; 
    
    audio.play().catch(error => {
        console.warn(`Audio playback error for ${filename}. Autoplay may be blocked by the browser.`, error);
    });
}

function revealFinalMessage() {
    // Since the final message (Chinese text) is already visible in the backdrop,
    // this function primarily adds a final flourish effect.
    cardContainer.classList.add('finished-sequence'); 
    
    // Optional: You could fade out the clickable hotspots here if you wanted.
    birdGroups.forEach(group => {
        group.style.pointerEvents = 'none'; // Disable further clicking
    });
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
            // Last click: animate, play sentence4.mp3, THEN trigger the final reveal effect
            setTimeout(revealFinalMessage, 700); // 0.7 second delay to let the music finish
        }
    });
});
