var express = require('express'),
    marqdown  = require('./marqdown.js')
var app = express();

app.get('/markdown', 
	function(req,res)
	{
		// console.log(req.body.markdown);
		// //var text = marqdown.render( req.query.markdown );
		// var text = marqdown.render( req.body.markdown );
		res.send("Hello world");
		// res.send( {preview: text} );
	}
);

var port = process.env.APP_PORT;
app.listen(port);
console.log(`Listening on port ${port}...`);