var app = require('koa')(),
	router = require('koa-router')(),
	logger = require('koa-logger')(),
	compress = require('koa-compress')(),
	path = require('path'),
	fs = require('fs'),
	extname = path.extname,
	routers = require('./server/routes/router.js');

app.use(function *(){
	var path = __dirname + this.path,
		fstat = yield stat(path);

		if(fstat.isFile()){
			this.compress = true;
			this.type = extname(path);
			this.body = fs.createReadStream(path);
		}
});

routers(router);
app.use(router.routes());
app.use(logger);

app.listen(3000);

function stat (file) {
	return function(done){
		fs.stat(file, done);
	};
}