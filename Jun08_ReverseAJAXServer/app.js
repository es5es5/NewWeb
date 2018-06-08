
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// http://localhost:2311/socket.io/socket.io.js
var io = require('socket.io')();
io.listen(2311);

// http://localhost:3000/product.reg?n=ddd&p=123&callback=ZZZ
// http://localhost:3000/product.get?callback=ZZZ
app.get('/product.reg', function(req, res){
	var n = req.query.n;
	var p = req.query.p;
	var cb = req.query.callback;
	
	var db = require('mongojs')('localhost/jun08', ['product']);
	
	db.product.insert({_id:n, p:p}, function(err, result){
		
		db.product.find(function(err2, result2){
			io.sockets.emit('products', result2);
		});
		
		res.send(cb + '('+ JSON.stringify(result)+')');			
	});
});



app.get('/product.get', function(req, res){
	// var n = req.query.n;
	// var p = req.query.p;
	var cb = req.query.callback;
	
	var db = require('mongojs')('localhost/jun08', ['product']);
	
	db.product.find(function(err, result){
		res.send(cb + '('+ JSON.stringify(result)+')');			
	});
});







http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});











