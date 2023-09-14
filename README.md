# Cribl Cloud Tab Renamer

This Google Chrome extension will update tab names with the Alias shown in the organization selection screen

## Features
- Update tab names to show aliases as defined in Cribl Cloud console

## Functionality
- On load of portal.cribl.cloud, a list of instance IDs and Names will be stored in the browsers local storage. When instances are opened, the tab name (`document.title`) will be updated to `Cribl Cloud - <Name>`

## Installation

### Google Chrome
Chrome does not allow packaged extensions that are not published to the Chrome Web Store to be installed on macOS or Windows. For this reason, a unpacked extension must be installed.

1. Download the artifacts for Google Chrome from the GitHub Actions workflow. Extract the zip file.
2. Open extensions page in your browser and enable the toggle for "Developer mode".
3. Click "Load Unpacked".
4. Select the folder extracted in step 1.

### Firefox

1. Download the artifacts for Firefox from the GitHub Actions workflow. Extract the zip file.
2. Open the Add-On Manager, click the gear, and select **Debug Add-ons**.
3. Click **Load Temporary Add-on...**.
4. Select the `manifest.json` from the folder extracted in step 1.


## Privacy
- No data is sent to any external source. All data lives in the browser and is not synced.