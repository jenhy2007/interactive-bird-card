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
let audio; 

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
        group.style.opacity = 1; // Restore full opacity
        group.style.backgroundColor = 'rgba(0, 0, 0, 0)'; // Ensure background is invisible
    });

    console.log("Card has been reset. Ready for another sequence!");
}


function playAudio(groupElement, filename) {
    
    // 1. Create and launch music notes
    const notes = ["♩", "♪"]; 
    const numberOfNotes = 4; 
    
    for (let i = 0; i < numberOfNotes; i++) {
        const note = document.createElement('span');
        note.classList.add('music-note');
        
        note.textContent = notes[Math.floor(Math.random() * notes.length)];
        
        // --- CRITICAL POSITIONING FIX ---
        // Pushes the notes to the right side of the hotspot (near the beak).
        const startLeft = 65 + Math.random() * 20; // 65% to 85% width
        const startBottom = 40 + Math.random() * 20; // 40% to 60% height
        
        note.style.left = `${startLeft}%`; 
        note.style.bottom = `${startBottom}%`; 

        groupElement.appendChild(note);

        // Set a timer to remove the note after its animation finishes 
        setTimeout(() => {
            note.remove();
        }, 3100); 
    }
    
    // 2. Trigger Audio and Animation
    
    // Trigger the is-singing class for timing
    groupElement.classList.add('is-singing');
    setTimeout(() => {
        groupElement.classList.remove('is-singing');
    }, 300); 

    // Play Audio: Recreate the audio element for safety on loop
    audio = new Audio('assets/' + filename); 

    audio.play().catch(error => {
        console.warn(`Audio playback error for ${filename}.`);
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
