# Cribl Cloud Tab Renamer

This Google Chrome extension will update tab names with the Alias shown in the organization selection screen

## Features
- Update tab names to show aliases as defined in Cribl Cloud console

## Functionality
- On load of portal.cribl.cloud, a list of instance IDs and Names will be stored in the browsers local storage. When instanecs are opened, the tab name (`document.title`) will be updated to `Cribl Cloud - <Name>`

## Installation

### Google Chrome
Chrome does not allow packaged extensions that are not published to the Chrome Web Store to be installed on macOS or Windows. For this reason, a unpacked extension must be installed.

1. Clone this repository to a local folder on your computer. Navigate to the `src` folder.
2. Copy `manifest_v3.json` with a name of `manifest.json` to the same directory.
3. Open extensions page in your browser and enable the toggle for "Developer mode"
4. Click "Load Unpacked"
5. Select the `src` folder from the folder into which you cloned this repository.

### Firefox

1. Clone this repository to a local folder on your computer. Navigate to the `src` folder.
2. Copy `manifest_v2.json` with a name of `manifest.json` to the same directory.
3. Open the Add-On Manager, click the gear, and select **Debug Add-ons**
4. Click **Load Temporary Add-on...**
5. Select the `manifest.json` from the cloned repository.


## Privacy
- No data is sent to any external source. All data lives in the browser and is not synced.