
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

app.get('/', routes.index);
app.get('/users', user.list);

// socket.io 모듈 불러오기
var io = require('socket.io')();

// 웹소켓서버 포트 지정
io.listen(7897);

// 웹 소켓 서비스 시작
	// 자동으로 자바스크립트 파일이 생김
	// http://컴퓨터IP포트/socket.io/socket.io.js

	// 주어.동사
	//  주어
	//		io.sockets : 연결된 모든 클라이언트들
	//		socket : 클라이언트 하나
	//  동사
	//		on('제목', 콜백함수) : 받으면
	//		emit : 보내기

// 클라이언트가 연결되면
//		자동으로
//		서버한테 connection이라는 제목의 메시지를 보냄
io.sockets.on('connection', function(socket){
	
	socket.on('msg', function(data){
		
		io.sockets.emit('msg2', data);
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
