# GDrive sync

## Why is GDrive sync

For internal / development purpose, GUI Editor of TER's Localization is quite ok.
But what happen when the translator isn't sitting next to you, or even client want to update the translate?
With that problem, TER offer you a function to sync your local localization to a Google Spreadsheet

## What is GDrive sync

GDrive Sync is a GUI Function which can help you:

* **Upload / download from Google Spreadsheet**
* **Share sheet to your client / translator to translate it, with security guaranteed by Google**
* **Have more familiar way to work with your client**

## How to use

### First time setting up

#### Create Google API Credential and JSON file

Step 1. Go to [Google Sheet API NodeJS Quick Start](https://developers.google.com/sheets/api/quickstart/nodejs).

Step 2. Press `Enable the Google Sheet API` 

![Google Sheets API Quick Start](/docs/images/03.GSheetsAPIQuickStart.png?raw=true "Google Sheets API Quick Start")

Step 3. Press `Download Client Configuration`

![Download Client Configuration](/docs/images/04.GSheetsDownloadConfiguration.png?raw=true "Download Client Configuration")

Step 4. Save the JSON file into your root folder with original name `credentials.json`

Step 5. Reset the library

#### Config the application

Step 1. Go to Sync page via side menu

Step 2. Config Spreadsheet ID and Sheet ID

Step 3. Save


#### Authorization

Step 1. Go to Sync menu via side menu

Step 2. Press Authorization

Step 3. Select your account and allow application to access your Sheets

Step 4. Wait until page reload

#### Download and upload

Step 1. Go to Sync menu via side menu

Step 2. Press download or upload

Step 3. Check the output

![GSheet Output](/docs/images/05.GSheetOutput.png?raw=true "GSheet Output")