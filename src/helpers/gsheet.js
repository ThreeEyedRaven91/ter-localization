import fs from 'fs';
import readline from 'readline';
import { google } from 'googleapis';
import open from 'open';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const TOKEN_PATH = 'token.json';

const authorize = () => {
  return new Promise((resolve, reject) => {
    fs.readFile('credentials.json', async (err, content) => {
      if (err) reject(err);
      const credentials = JSON.parse(content);
      const {client_secret, client_id, redirect_uris} = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

      try {
        const token = fs.readFileSync(TOKEN_PATH);
        oAuth2Client.setCredentials(JSON.parse(token));
        resolve(oAuth2Client);
      }
      catch (err) {
        resolve(await getNewToken(oAuth2Client))
      }
    });

  });
};

const getNewToken = (oAuth2Client) => {
  return new Promise((resolve, reject) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    open(authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) reject(err);

        oAuth2Client.setCredentials(token);
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) reject(err);
        });
        resolve(oAuth2Client);
      });
    });
  })
};

const writeData = ({ auth, spreadsheetId, sheetId, values }) => {
  return new Promise((resolve, reject) => {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetId}!A1`,
      valueInputOption: 'RAW',
      resource: { values }
    }, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  })
};

const gSheet = {
  authorize,
  writeData,
};

export default gSheet;