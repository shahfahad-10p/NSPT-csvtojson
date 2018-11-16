const fs = require('fs');
const path = require('path');
const csv = require('csvtojson/v2')

var fileUrl = path.join(__dirname, 'customer-data.csv');


const convertFile = (url, callback) => {
	csv()
		.fromFile(url)
		.then((jsonObj) => {
			callback(null, jsonObj);
		})
		.catch(error => {
			callback(error);
		});
}

const writeFile = (fileName, jsonContent) => {
	fs.writeFile(fileName, JSON.stringify(jsonContent, null, 2), { encoding: 'utf-8' }, (error) => {
		if (error) {
			return console.log('ERROR WRITING FILE : ', error);
		}
		console.log('WRITE FINISHED');
	})
}

convertFile(fileUrl, (error, jsonContent) => {
	if (error)
		return console.log('ERROR CONVERTING FILE : ', error);

	writeFile(path.join(__dirname, 'customer-data.json'), jsonContent);
});