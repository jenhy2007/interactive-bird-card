// --- Initial Setup ---
const birdGroups = document.querySelectorAll('.bird-group');
const audio = document.getElementById('hbd-audio');
const finalMessage = document.getElementById('final-message');
const cardContainer = document.getElementById('card-container');

// We now only need three successful clicks to trigger the final screen.
const TOTAL_CLICKS_NEEDED = 3;
let clickCounter = 0;
let clickedGroups = new Set(); // To ensure each group is only counted once

// --- Functions ---

// Function to play the audio and reset it immediately for the next click
function playAudio() {
    // Stop and reset audio to the beginning
    audio.pause();
    audio.currentTime = 0;
    // Play the audio
    audio.play();
}

// Function to reveal the final message
function revealFinalMessage() {
    // 1. Hide the individual bird groups
    birdGroups.forEach(group => {
        group.style.display = 'none';
    });
    
    // 2. Clear any existing children (just in case) and append the final message
    // A clean way to show the final screen: hide all and show the one
    cardContainer.innerHTML = ''; 
    finalMessage.style.display = 'flex'; // Make the final message visible
    cardContainer.appendChild(finalMessage);
    
    // Optional: You could play a final song or fanfare here!
}

// --- Main Event Listener ---
birdGroups.forEach(group => {
    group.addEventListener('click', function() {
        const groupKey = this.dataset.group;
        
        // 1. Check if this group has already been clicked
        if (clickedGroups.has(groupKey)) {
            // If already clicked, just exit and do nothing
            return; 
        }

        // 2. Mark this group as clicked (visual feedback from CSS)
        this.classList.add('clicked');
        clickedGroups.add(groupKey);
        
        // 3. Play the music
        playAudio();
        
        // 4. Update the counter
        clickCounter++;
        console.log(`Click count: ${clickCounter}`); // For debugging
        
        // 5. Check if we reached the required count
        if (clickCounter >= TOTAL_CLICKS_NEEDED) {
            // Wait briefly to let the last song start before revealing the final message
            setTimeout(revealFinalMessage, 1000); 
        }
    });
});
