const browser = window.browser || chrome;

document.addEventListener("DOMContentLoaded", () => {
    const loginStatus = document.getElementById("login-status");
    const twitchStatus = document.getElementById("twitch-status");

    console.log('Popup is loading...');

    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];
        const url = currentTab.url;
        
        console.log('URL:', url);

        if (!url.includes('twitch.tv')) {
            console.log('Not on Twitch"');
            loginStatus.textContent = "Not on Twitch";
            loginStatus.style.color = "orange";
            twitchStatus.textContent = "False";
            twitchStatus.style.color = "red";
            return;
        }

        browser.tabs.sendMessage(currentTab.id, { action: "getStatus" }, (response) => {
            if (browser.runtime.lastError) {
                console.error('Error in content.js:', browser.runtime.lastError);
                loginStatus.textContent = "Error";
                loginStatus.style.color = "red";
                return;
            }

            console.log('Received:', response);
            
            const isLogged = response.twitchLoggedIn === true;
            const isChannel = response.twitchChannelPage === true;
            
            loginStatus.textContent = isLogged ? "Logged" : "Not logged";
            loginStatus.style.color = isLogged ? "green" : "red";
            
            twitchStatus.textContent = isChannel ? "True" : "False";
            twitchStatus.style.color = isChannel ? "green" : "red";
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const yearContainer = document.getElementById('current-year');

    if (yearContainer) {
        yearContainer.textContent = new Date().getFullYear();
    } else {
        console.error('err');
    }
});