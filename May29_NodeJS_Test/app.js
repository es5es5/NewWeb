
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

// 콜백함수 : 어떤 이벤트에 연결해 놓고,
// 그 이벤트가 발생하면 자동으로 호출되는 함수
app.get('/asdf.asd', function(req, res){
	res.send('ddaf');
});

app.get('/test.haha', function(req, res){
	var cnt = req.query.cnt; 
	var a = req.query.a;
	var txt = '';
	
	for (var i = 0; i < cnt; i++) {
		txt += a;
	}
	res.send(txt);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
