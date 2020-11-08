const { GoogleSpreadsheet } = require('google-spreadsheet');

export default async (request, response) => {
	if (request.method !== 'POST') {
		return response.status(400).send('400 Bad Request');
	}
	console.log(request.query.email);
	const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
	await doc.useServiceAccountAuth({
		client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
		private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
	});
	await doc.loadInfo();
	const sheet = doc.sheetsByIndex[0];
	console.log(sheet.title);
	console.log(sheet.rowCount);
	const newRow = await sheet.addRow({
		timestamp: new Date().toLocaleString('en-IN', {dateStyle: 'full', timeStyle: 'long', timeZone: 'Asia/Kolkata'}),
		email: request.query.email
	}); 
	console.log(newRow);
	return response.status(201).send('OK');
}