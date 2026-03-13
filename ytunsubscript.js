(async function() {
    // Look for the modern YouTube subscribe buttons
    const buttons = document.querySelectorAll('ytd-subscribe-button-renderer button');
    console.log(`Found ${buttons.length} subscription buttons. Starting...`);

    for (let i = 0; i < buttons.length; i++) {
        let btn = buttons[i];
        
        // Scroll to the button to ensure it's loaded in the browser's view
        btn.scrollIntoView({behavior: "smooth", block: "center"});
        
        // Click "Subscribed" to open the pop-up
        btn.click();
        await new Promise(r => setTimeout(r, 700)); // Wait for pop-up animation
        
        // Look for the "Unsubscribe" confirmation button in the pop-up
        let confirmBtn = document.querySelector('yt-confirm-dialog-renderer #confirm-button button') || 
                         document.querySelector('yt-confirm-dialog-renderer yt-button-shape button');
                         
        if (confirmBtn) {
            confirmBtn.click();
            console.log(`Unsubscribed ${i + 1}/${buttons.length}`);
        } else {
            console.log("Couldn't find confirm button for this channel, skipping...");
            // Try to close the pop-up so it doesn't get stuck
            let cancelBtn = document.querySelector('yt-confirm-dialog-renderer #cancel-button button');
            if(cancelBtn) cancelBtn.click();
        }
        
        // Wait 1.5 seconds before doing the next one to avoid bot-detection
        await new Promise(r => setTimeout(r, 1500)); 
    }
    
    console.log("Batch complete! Refresh the page and run again if more remain.");
})();
