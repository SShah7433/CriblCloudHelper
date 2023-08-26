
// References for setting MutationDiscovery
const targetNodeHtml = document.querySelector('html');
const targetNodeHead = document.querySelector('head');

const config = { attributes: true, childList: true, subtree: true };

// Get the Organization IDs and Names from the webpage. Parse out and store into storage.
function storeOrganizationIds() {
    // Get Organization boxes
    const organizations = document.querySelectorAll("[data-testid='organization-box']");

    // Array to build storage object. This also clears the storage if new IDs/Names are found.
    var organizationInfo = [];

    // Get the relevant text fields for each organization
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

    // If array has content, update storage
    if (organizationInfo.length > 0) {
        chrome.storage.local.set({ organizationMapping: organizationInfo }).then(() => {
            console.log({ organizationMapping: organizationInfo });
        });
    }

}

// Handles updating Org IDs and Names once the instance list is loaded
var portalObserver = new MutationObserver(function (mutations) {
    if (document.querySelector("[data-testid='organization-box']")) {
        storeOrganizationIds();
        portalObserver.disconnect(); // to stop observing the dom after one update
    }
})

// Handles updating tab titles
var titleObserver = new MutationObserver(function (mutations) {

    // Array to store mappings between Org IDs and Names
    var orgIdMatch = Array();

    // Find Org ID from URL. Locations differ based on hostname
    if (/^main/.test(location.hostname)) {
        orgIdMatch = location.hostname.match(/main-(\S+?).cribl.cloud/)
    } else if (/^manage/.test(location.hostname)) {
        orgIdMatch = location.pathname.match(/\/([^\/]+)/)
    } else if (location.hostname.endsWith('cribl.cloud') && location.pathname == "/") {
        orgIdMatch = location.hostname.match(/^([^\.]+)\./)
    } else {
        // No OrgID found, return.
        return;
    }

    // Get name from storage and set document title
    chrome.storage.local.get(["organizationMapping"]).then((result) => {
        try {
            const orgInformation = result["organizationMapping"].find((organization) => organization["organizationId"] == orgIdMatch[1]);
            document.title = `Cribl Cloud - ${orgInformation['organizationName']}`
        } catch (e) {
            console.log(`Org ID Not Found: ${orgIdMatch[1]}`)
        }
    });
})

// Prevents error messages indicating extension context invalidated due to redirects/upgrades.
typeof chrome.app !== "undefined";

// Handle different Cribl Cloud urls
if (/^(?:main-(\S+?))|(?:manage)\.cribl.cloud/.test(location.hostname)) {
    titleObserver.observe(targetNodeHtml, config);
} else if (location.hostname.endsWith('cribl.cloud') && location.pathname == "/") {
    titleObserver.observe(targetNodeHtml, config);
} else {
    portalObserver.observe(targetNodeHtml, config);
}



