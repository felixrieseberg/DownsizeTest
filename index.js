var prompt = require('prompt'),
	console = require('better-console'),
	test = require('./test'), 

	testOptions = [{
		name: 'testType',
		description: 'Which tests do you want to run? (\'img\', \'video\', \'text\' or \'all\')',
		default: 'all'
	},
	{
		name: 'writeToFilesystem',
		description: 'Do you want to write the results to a file?',
		validator: /y[es]*|n[o]?/,
  		warning: 'Must respond yes or no',
  		default: 'no'
	}];

prompt.start();

console.clear();

prompt.get(testOptions, function (error, result) {
	if (!error) {
		if (result.writeToFilesystem === 'yes') {
			test.outputFile(true);
		}
		switch (result.testType) {
			case 'all':
				test.runTest('text');
				test.runTest('img');
				test.runTest('video');
				break;
			case 'video':
				test.runTest('video');
				break;
			case 'img':
				test.runTest('img');
				break;
			case 'text':
				test.runTest('text');
				break;
			default:
				test.runTest('text');
				test.runTest('img');
				test.runTest('video');
				break;
		}
		console.info('\nAll done!\n');
	}
})