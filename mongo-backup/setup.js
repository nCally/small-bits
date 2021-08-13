const { google } = require('googleapis');



const scopes = [
	'https://www.googleapis.com/auth/drive',
	// 'https://www.googleapis.com/auth/drive.metadata.readonly'
];


const auth = new google.auth.JWT(
	credentials.client_email, null,
	credentials.private_key, scopes
)


const drive = google.drive({ version: 'v3', auth })


module.exports = drive;


const credentials = {
	"type": "",
	"project_id": "",
	"private_key_id": "",
	"private_key": "",
	"client_email": "",
	"client_id": "",
	"auth_uri": "",
	"token_uri": "",
	"auth_provider_x509_cert_url": "",
	"client_x509_cert_url": ""
}