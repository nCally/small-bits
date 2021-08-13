require('dotenv').config()
const homeDir = require('os').homedir()
const exec = require('child_process').exec
const fs = require('fs');
const path = require('path');
const drive = require('./google/setup');

async function runBackUp() {
	const DB = process.env.DB_NAME;
	const bakDir = homeDir + '/backup/'

	exec(`mongodump -d ${DB} -o ${bakDir}`, (err, res) => {
		if (!err) {
			exec(`zip -r ${bakDir}backup-${Date.now()}.zip ${bakDir}${DB}`, async (err, res) => {

				const baks = fs.readdirSync(bakDir);
				for (let file of baks) {
					const pathToFile = `${bakDir}${file}`;
					const fileExt = path.extname(file);
					if (fileExt === '.zip') {
						const folderId = ""; // correct folder id
						const x = await drive.files.create({
							requestBody: {
								parents: [folderId],
								name: file,
								mimeType: 'application/zip'
							},
							media: {
								mimeType: 'application/zip',
								body: fs.createReadStream(pathToFile)
							},
							fields: 'id'
						})
						if (x.status === 200) {
							exec(`rm -rf ${bakDir}*`, (err, done) => console.log('done'))
						}
					}
				}
			});
		}
	})


}

runBackUp();