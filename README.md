# Cribl Cloud Tab Renamer

This Google Chrome extension will update tab names with the Alias shown in the organization selection screen

## Features
- Update tab names to show aliases as defined in Cribl Cloud console

## Functionality
- On load of portal.cribl.cloud, a list of instance IDs and Names will be stored in the browsers local storage. When instanecs are opened, the tab name (`document.title`) will be updated to `Cribl Cloud - <Name>`

## Installation
Chrome does not allow packaged extensions that are not published to the Chrome Web Store to be installed on macOS or Windows. For this reason, a unpacked extension must be installed.

1. Clone this repository to a local folder on your computer
2. Open extensions page in your browser and enable the toggle for "Developer mode"
3. Click "Load Unpacked"
4. Select the `src` folder from the folder into which you cloned this repository.

## Privacy
- No data is sent to any external source. All data lives in the browser and is not synced.