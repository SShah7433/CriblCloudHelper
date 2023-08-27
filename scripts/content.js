
// References for setting MutationDiscovery
const targetNodeHtml = document.querySelector('html');

const configHtml = { attributes: true, childList: true, subtree: true };

// Handles updating Org IDs and Names once the instance list is loaded
var portalObserver = new MutationObserver(function (mutations) {
    if (document.querySelector("[data-testid='organization-box']")) {

        // Get Organization boxes
        const organizations = document.querySelectorAll("[data-testid='organization-box']");

        // Array to build storage object. This also clears the storage if new IDs/Names are found.
        var organizationInfo = [];

        organizations.forEach(organization => {
            const organizationName = organization.querySelector("div > div.ant-col.organizationbox-module--title--LcgJH > h2").textContent;
    
            const organiationIdString = organization.querySelector("div > div.ant-col.organizationbox-module--title--LcgJH > span").textContent;
            const organizationIdMatch = organiationIdString.match(/ID: (.*)/)
            const organizationId = organizationIdMatch[1];
    
            // If ID and Name are found, add to array.
            if (organizationId && organizationName) {
                organizationInfo.push({
                    "organizationId": organizationId,
                    "organizationName": organizationName
                });
            }
    
        })

        chrome.runtime.sendMessage(organizationInfo)

        // Stop listening
        portalObserver.disconnect(); // to stop observing the dom after one update
    }
})

// Prevents error messages indicating extension context invalidated due to redirects/upgrades.
typeof chrome.app !== "undefined";

// Handle different Cribl Cloud urls
if (/^(?:main-(\S+?))|(?:manage)\.cribl.cloud/.test(location.hostname)) {
    chrome.runtime.onMessage.addListener(function (msg, sender, response) {
        document.title = msg;
    });
} else if (/.cribl\.cloud$/.test(location.hostname) && location.pathname == "/") {
    chrome.runtime.onMessage.addListener(function (msg, sender, response) {
        document.title = msg;
    });
} else {
    portalObserver.observe(targetNodeHtml, configHtml);
    chrome.runtime.se
}