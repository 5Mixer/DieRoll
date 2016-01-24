// Load the http module to create an http server.
var http = require('http');

var helpText = "You need to pass in some roll info"

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
	var input = request.url.substr(1);

	response.writeHead(200, {"Content-Type": "text/plain"});
	if (request.url == "/"){
		response.end(helpText+"\n");
	}else{

		var result = 1;

		var tokens = "";

		for (i = 0; i < input.length; i++) {
			if (isInt(ch(input,i+1))){
				tokens+= "I"; //INT
			}else{
				tokens+= "L"; //LETTER
			}
		}
		console.log(tokens);


		if ((ch(input,1) == "d" || ch(input,1) == "D") && tokens=="L" ){
			result = randomInt (1,6);
		}

		if (tokens == "IL"){
			//first is int.
			//Roll several die, 1-6
			result = "";
			var die = ch(input,1);
			console.log(die);
			for (i = 0; i < die; i++) {
				result += randomInt(1,6);
				if (i != die-1){
					result += ", ";
				}
			}
		}

		if (tokens == "LI"){
			result = randomInt(1,parseInt(ch(input,2)));
		}
		if (tokens == "ILI"){
			//first is int.
			//Roll several die, 1-6
			result = "";
			var die = ch(input,1);
			console.log(die);
			for (i = 0; i < die; i++) {
				result += randomInt(1,parseInt(ch(input,3)));
				if (i != die-1){
					result += ", ";
				}
			}
		}

		response.end("Rolled "+result+"\n");
	}
	
});

function randomInt (low, high) {
	return Math.floor(Math.random() * ((high+1) - low) + low);
}


function ch(str,place){
	return str.charAt(place-1);
}

function isInt(chara){
	var c =  chara;
	if (c >= '0' && c <= '9') {
	    // it is a number
	    return true;
	} else {
	    // it isn't
	    return false;
	}
}


// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(8000);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:8000/");