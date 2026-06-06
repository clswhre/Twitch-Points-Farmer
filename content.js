const browser = window.browser || chrome;

function isLoggedIn() {
    return document.querySelector('button[data-a-target="login-button"]') === null;
}

function isChannelPage() {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    return pathSegments.length === 1 && !pathSegments[0].startsWith('directory') && !pathSegments[0].startsWith('videos');
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getStatus") {
        console.log('Popup checking status...');
        const status = {
            twitchLoggedIn: isLoggedIn(),
            twitchChannelPage: isChannelPage()
        };
        console.log('Sending status:', status);
        sendResponse(status);
    }
});

console.log('content.js is working on a page:', window.location.href);