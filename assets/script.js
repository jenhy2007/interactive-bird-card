// --- Initial Setup ---
const birdGroups = document.querySelectorAll('.bird-group');
const finalMessage = document.getElementById('final-message');
const cardContainer = document.getElementById('card-container');

// Map click count to the audio file segment
const audioMap = {
    1: 'sentence1.mp3',
    2: 'sentence2.mp3',
    3: 'sentence3.mp3',
    4: 'sentence4.mp3', // The 4th click plays the last segment
};

// We now need 4 clicks to trigger the reveal!
const TOTAL_CLICKS_NEEDED = 4; 
let clickCounter = 0;
let clickedGroups = new Set(); 
let audio = new Audio(); // Create a dynamic audio object

// --- Functions ---

function playAudio(groupElement, filename) {
    // 1. Trigger Animation
    groupElement.classList.add('is-singing');
    
    // Remove the class after the animation is done (0.3 seconds, matching CSS)
    setTimeout(() => {
        groupElement.classList.remove('is-singing');
    }, 300); 

    // 2. Play Audio
    audio.pause();
    audio.currentTime = 0;
    audio.src = 'assets/' + filename; 
    
    audio.play().catch(error => {
        console.warn(`Audio playback error for ${filename}.`);
    });
}

function revealFinalMessage() {
    // No new audio plays on reveal, as the last audio plays on the 4th click
    
    // Hide all the bird groups
    birdGroups.forEach(group => {
        group.style.display = 'none';
    });
    
    // Show the final image
    cardContainer.innerHTML = ''; // Clear the container
    finalMessage.style.display = 'flex'; 
    cardContainer.appendChild(finalMessage);
}

// --- Main Event Listener ---
birdGroups.forEach(group => {
    group.addEventListener('click', function() {
        const groupKey = this.dataset.group;
        
        if (clickedGroups.has(groupKey)) {
            return; 
        }

        this.classList.add('clicked');
        clickedGroups.add(groupKey);
        
        clickCounter++;
        
        // Always play the corresponding audio and animate
        const audioFile = audioMap[clickCounter];
        playAudio(this, audioFile);
        
        if (clickCounter === TOTAL_CLICKS_NEEDED) {
            // Last bird click (Sparrows): animate, play sentence4.mp3, THEN reveal
            setTimeout(revealFinalMessage, 700); // 0.7 second delay to let the music finish
        }
    });
});
