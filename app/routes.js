module.exports = function(app) {

    var path = require('path');
    // route to handle all angular requests
    app.get('*', function(req, res) {
        res.sendFile(path.resolve('./public/index.html'));        
    });
    
}