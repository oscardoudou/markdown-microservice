var express = require('express'),
    marqdown  = require('./marqdown.js')
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.configure(function () {
    app.use(express.logger('dev'));     / 'default', 'short', 'tiny', 'dev' /
    app.use(express.bodyParser());
});   

app.post('/markdown', 
	function(req,res)
	{
		// console.log(req.body.markdown);
		// var text = marqdown.render( req.query.markdown );
		console.log(req.body);
		var text = marqdown.render( req.body.markdown );
		// res.send("Hello world");
		res.send( {preview: text} );
	}
);

var port = process.env.APP_PORT;
app.listen(port);
console.log(`Listening on port ${port}...`);