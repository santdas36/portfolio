const { GoogleSpreadsheet } = require('google-spreadsheet');

export default async (request, response) => {
	if (request.method !== 'POST') {
		return response.status(400).send('400 Bad Request');
	}

	const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
	await doc.useServiceAccountAuth({
		client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		private_key: process.env.GOOGLE_PRIVATE_KEY,
	});
	await doc.loadInfo();
	const sheet = doc.sheetsByIndex[0];
	console.log(sheet.title);
	console.log(sheet.rowCount);
	const newRow = await sheet.addRow({
		timestamp: new Date().toLocaleString('en-IN', {dateStyle: 'full', timeStyle: 'long'}),
		email: request.body.get('email')
	}); 
	console.log(newRow);
	return response.status(201).send('OK');
}