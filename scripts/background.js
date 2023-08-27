
chrome.tabs.onUpdated.addListener(tabUpdatedListener);
chrome.runtime.onMessage.addListener(storeOrganizationInformation);

function storeOrganizationInformation(message) {

    // Get Organization boxes
    const organizationInfo = message;

    // If array has content, update storage
    if (organizationInfo.length > 0) {
        chrome.storage.local.set({ organizationMapping: organizationInfo }).then(() => {
            console.log("Successfully stored organization info")
            console.info({ organizationMapping: organizationInfo });
        });
    }
}

function tabUpdatedListener() {

    function setTitle(organization) {
        document.title = `Cribl Cloud - ${organization}`
    }

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // since only one tab should be active and in the current window at once
        // the return variable should only have one entry
        var activeTab = tabs[0];

        // Array to store mappings between Org IDs and Names
        var orgIdMatch = Array();

        // Find Org ID from URL. Locations differ based on hostname
        if (/^https:\/\/main/.test(activeTab.url)) {
            // PATTERN: https://main-(INSTANCE ID).cribl.cloud
            orgIdMatch = activeTab.url.match(/main-(\S+?)\.cribl\.cloud/)
        } else if (/^https:\/\/manage/.test(activeTab.url)) {
            // PATTERN: https://manage.cribl.cloud/(INSTANCE ID)
            orgIdMatch = activeTab.url.match(/https:\/\/manage\.cribl\.cloud\/?([^\?\/]+)/)
        } else if (/^https:\/\/([^\.]+\-[^\.]+)\.cribl\.cloud/.test(activeTab.url)) {
            // PATTERN: https://(INSTANCE ID).cribl.cloud/
            orgIdMatch = activeTab.url.match(/^https:\/\/([^\.]+\-[^\.]+)\.cribl\.cloud/)
        } else {
            // No OrgID found, return.
            return;
        }

        // Get name from storage and set document title
        chrome.storage.local.get(["organizationMapping"]).then((result) => {
            try {
                const orgInformation = result["organizationMapping"].find((organization) => organization["organizationId"] == orgIdMatch[1]);
                chrome.scripting.executeScript({
                    target: { tabId: activeTab.id },
                    func: setTitle,
                    args: [orgInformation["organizationName"]]
                });

            } catch (e) {
                console.info(`Org ID Not Found: ${orgIdMatch} for URL: ${activeTab.url}`)
            }
        });
    });
}