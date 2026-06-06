const browser = window.browser || chrome;

document.addEventListener("DOMContentLoaded", () => {
    const loginStatus = document.getElementById("login-status");
    const twitchStatus = document.getElementById("twitch-status");
    const yearContainer = document.getElementById("current-year");

    if (yearContainer) {
        yearContainer.textContent = new Date().getFullYear();
    }

    browser.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const currentTab = tabs[0];

        if (!currentTab?.url?.includes("twitch.tv")) {
            loginStatus.textContent = "Not on Twitch";
            loginStatus.style.color = "orange";
            twitchStatus.textContent = "False";
            twitchStatus.style.color = "red";
            return;
        }

        browser.tabs.sendMessage(currentTab.id, { action: "getStatus" }, (response) => {
            if (browser.runtime.lastError || !response) {
                loginStatus.textContent = "Error";
                loginStatus.style.color = "red";
                return;
            }

            const isLogged = response.twitchLoggedIn === true;
            const isChannel = response.twitchChannelPage === true;

            loginStatus.textContent = isLogged ? "Logged" : "Not logged";
            loginStatus.style.color = isLogged ? "green" : "red";
            twitchStatus.textContent = isChannel ? "True" : "False";
            twitchStatus.style.color = isChannel ? "green" : "red";
        });
    });
});