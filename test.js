var fs = require('fs'),
	console = require('better-console'),
	downsize = require('downsize'),

	writeToFilesystem, dataToAppend,
	testRunning,

	downsizeOptions = {words: "0"};

function output(index, input, output, title) {
	if (writeToFilesystem) {
		if (!testRunning) {
			console.warn('results.txt already exists, overwriting');
			fs.unlinkSync('results.txt');
		}
		if (title) {
			dataToAppend = title;
		} else {
			dataToAppend = 'Case ' + index + '\n' + 'Input:  ' + input + '\n' + 'Output: ' + output + '\n';
		}
		fs.appendFile("results.txt", dataToAppend, function(err) {
		    if(err) {
		        console.error(err);
		    }
		});
	} else {
		if (title) {
			console.warn(title);
		} else {
			console.info('Case ' + index);
			console.log('Input:  ' + input);
			console.warn('Output: ' + output);
		}
	}
	testRunning = true;
}

function outputTitle(title) {
	output(null, null, null, '\n' + title + 'Tests \n' + '------------------------------------------------' + '\n');
}

module.exports = {

	outputFile: function(value) {
		writeToFilesystem = (value) ? true: false;
	},

	runTest: function(name) {
		var file = __dirname + '/tests/' + name + '.json';
			outputArray = [],
			inputArray = [];

		outputTitle(name);

		inputArray = JSON.parse(fs.readFileSync(file, 'utf8'));

		inputArray.forEach(function (entry, index) {
			outputArray.push(downsize(entry, downsizeOptions))
			output(index, entry, outputArray[index]);
		});
	}

};