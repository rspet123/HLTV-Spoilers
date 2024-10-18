document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');

    // Ensure the button exists before proceeding
    if (!toggleButton) {
        console.error('Toggle button not found in popup.');
        return;
    }

    // Fetch the stored state from chrome.storage
    chrome.storage.local.get(['spoilerHidden'], (result) => {
        if (result.spoilerHidden) {
            toggleButton.innerText = 'Spoilers Hidden (Click to Show)';
        } else {
            toggleButton.innerText = 'Spoilers Shown (Click to Hide)';
        }
    });

    // Add click listener to toggle button
    toggleButton.addEventListener('click', () => {
        chrome.storage.local.get(['spoilerHidden'], (result) => {
            let newState = !result.spoilerHidden; // Toggle state
            chrome.storage.local.set({ spoilerHidden: newState }, () => {
                toggleButton.innerText = newState
                    ? 'Spoilers Hidden (Click to Show)'
                    : 'Spoilers Shown (Click to Hide)';
            });

            // Send a message to the content script to update the page accordingly
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0]) {
                    chrome.tabs.sendMessage(tabs[0].id, { spoilerHidden: newState });
                }
            });
        });
    });
});