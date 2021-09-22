import { google, sheets_v4 } from 'googleapis';

const KEY_FILE_PATH = 'src/credentials/service_account_secret.json';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const getAuth = async () => {

    const auth = await google.auth.getClient({

        keyFile: KEY_FILE_PATH,
        scopes: SCOPES

    });

    return auth;

};

const getSheetValues = async () => {

    const auth = await getAuth();

    const sheetsApi = google.sheets('v4');

    const spreadsheetId = '1Nf3e4hib_TYB0uN4RAd8xFZD9Iqx7IKGzYTTSGyKxkg';

    const range = "'Página1'!1:9999";

    const values:any = await new Promise((resolve, reject) => {

        sheetsApi.spreadsheets.values.get({ auth, spreadsheetId, range }, (err, data) => {

            if(!!err) {

                reject(err);      
                
            } else {

                resolve(data);

            }

        });

    });

    return values.data.values;

};

const main = async () => {

    const rows = await getSheetValues();

    console.log(rows);

};

main();





