// ... (keep all the existing code above this point, including the audioMap and TOTAL_CLICKS_NEEDED) ...

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
    });

    console.log("Card has been reset. Ready for another sequence!");
}


function revealFinalMessage() {
    // 1. Adds final flourish effect
    cardContainer.classList.add('finished-sequence'); 
    
    // 2. Disable clicking on the hotspots
    birdGroups.forEach(group => {
        group.style.pointerEvents = 'none'; // Disable further clicking
    });

    // 3. Set a timer to automatically reset the card after 5 seconds (5000 milliseconds)
    const LOOP_DELAY_MS = 5000; 

    setTimeout(() => {
        resetCard();
    }, LOOP_DELAY_MS); 
}

// ... (keep all the existing code below this point, including the Main Event Listener) ...
