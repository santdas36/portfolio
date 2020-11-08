export default async (request, response) => {
	if (request.method !== 'POST') {
		return response.status(400).send('400 Bad Request');
	}
	console.log(request.body);
	return response.json({received: request.body});
}