
const path = require('path');

let clientsController = {

    main: (req,res) => {

        if (!req.session.isAuthenticated) return res.redirect('/');

        res.render(path.join(__dirname, '../views/cliente'));
    }
}

module.exports = clientsController;