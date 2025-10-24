function logger(req, res, next) {
    console.log(req.method);
    console.log(req.originalUrl);

    const ip = req.headers['x-forwarded-for']?.split(',').shift() ||
    req.socket?.remoteAddress;
    console.log("IP Address: ", ip);

    // Desabilitado por cuestiones de prueba en el servidor
    // if (ip != "::1") {
    //     return res.status(401).json({ error: 'Invalid Referrer!' });
    // }
    
    // var corsOptions = {
    //     origin: 'http://example.com',
    //     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    //   }
    
    // app.listen(3001, function () {
    // console.log('CORS-enabled El web server está corriendo por el puerto 3001')
    // })

    next();
}

module.exports = logger;