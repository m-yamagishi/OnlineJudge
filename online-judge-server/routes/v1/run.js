var express = require('express');
var router = express.Router();
var child_process = require('child_process');
var fs = require('fs');

// POST  http://localhost:3000/api/v1/run/
router.post('/', function (req, res) {
	var language = req.body.language;
	var source_code = req.body.source_code;
	var input = req.body.input;

	var filename, execCmd;
	if (language === 'ruby') {
		filename = 'Main.rb';
		execCmd = 'ruby Main.rb';
	} else if (language === 'python') {
		filename = 'Main.py';
		execCmd = 'python Main.py';
	} else if (language === 'c_cpp') {
		filename = 'Main.c';
		execCmd = 'cc -Wall -o Main Main.c && ./Main';
	} else if (language === 'java') {
		filename = 'Main.java';
		execCmd = 'javac Main.java && java Main ' + input
	}

	//Create a container
	var dockerCmd =
		'docker create -i ' +
		'--net none ' +
		// '--cpuset-cpus 0 ' +
		// '--memory 512m --memory-swap 512m ' +
		'--ulimit nproc=10:10 ' +
		'--ulimit fsize=1000000 ' +
		'-w /workspace ' +
		'ubuntu-dev ' +
		'/usr/bin/time -q -f "%e" -o /time.txt ' +
		'timeout 3 ' +
		// 'su nobody -s ' +
		'/bin/bash -c "' +
		execCmd +
		'"';

	console.log("Running: " + dockerCmd);
	var containerId = child_process.execSync(dockerCmd).toString().substr(0, 12);
	console.log("ContainerId: " + containerId);

	//Copy the source code to the container
	child_process.execSync('rm -rf /tmp/workspace && mkdir /tmp/workspace && chmod 777 /tmp/workspace');
	fs.writeFileSync('/tmp/workspace/' + filename, source_code);
	dockerCmd = "docker cp /tmp/workspace " + containerId + ":/";
	console.log("Running: " + dockerCmd);
	child_process.execSync(dockerCmd);

	//Start the container
	dockerCmd = "docker start -i " + containerId;
	console.log("Running: " + dockerCmd);
	var child = child_process.exec(dockerCmd, {}, function (error, stdout, stderr) {

		//Copy time command result
		dockerCmd = "docker cp " + containerId + ":/time.txt /tmp/time.txt";
		console.log("Running: " + dockerCmd);
		child_process.execSync(dockerCmd);
		var time = fs.readFileSync("/tmp/time.txt").toString();

		//Remove the container
		dockerCmd = "docker rm " + containerId;
		console.log("Running: " + dockerCmd);
		child_process.execSync(dockerCmd);

		console.log("Result:", error, stdout, stderr);
		res.send({
			stdout: stdout,
			stderr: stderr,
			exit_code: error && error.code || 0,
			time: time
		});
	});
	child.stdin.write(input);
	child.stdin.end();
});

module.exports = router;