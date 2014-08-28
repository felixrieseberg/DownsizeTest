var fs = require('fs'),
	console = require('better-console'),
	downsize = require('downsize'),
	downzero = require('./downzero'),

	writeToFilesystem, dataToAppend,
	testRunning, showErrorOnly,

	downsizeOptions = {words: "0"};

function output(index, input, output, outputDZ, title) {
	if (writeToFilesystem) {
		if (!testRunning) {
			console.warn('results.txt already exists, overwriting');
			fs.unlinkSync('results.txt');
		}
		if (title) {
			dataToAppend = title;
		} else {
			dataToAppend = 'Case ' + index + '\n' + 'Input:  ' + input + '\n' + 'Output: ' + output + '\n' + 'Downzero: ' + outputDZ;
		}
		fs.appendFileSync("results.txt", dataToAppend);
	} else {
		if (title) {
			console.warn(title);
		} else {
			console.info('Case ' + index);
			console.log('Input:  ' + input);
			console.warn('Output: ' + output);
			console.log('Output Downzero: ' + outputDZ);
		}
	}
	testRunning = true;
}

function outputTitle(title) {
	output(null, null, null, null, '\n' + title + 'Tests \n' + '------------------------------------------------' + '\n');
}

module.exports = {

	outputFile: function(value) {
		writeToFilesystem = (value) ? true: false;
	},

	errorOnly: function(value) {
		showErrorOnly = (value) ? true: false;
	},

	runTest: function(name) {
		var file = __dirname + '/tests/' + name + '.json',
			inputArray = [];

		outputTitle(name);

		inputArray = JSON.parse(fs.readFileSync(file, 'utf8'));

		inputArray.forEach(function (entry, index) {
			if (entry !== null && index !== null) {
				var downsizeOutput = downsize(entry, downsizeOptions),
					downzeroOutput = downzero(entry);
					
				if (downsizeOutput !== downzeroOutput) {
					console.error('CASE ' + index + ' OUTPUT NOT IDENTICAL');
				} else if (showErrorOnly !== true) {
					output(index, entry, downsizeOutput, downzeroOutput);
				}
			}
		});
	}

};