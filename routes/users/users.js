var express = require("express");
var router = express.Router();
global = [];

// if (typeof localStorage === "undefined" || localStorage === null) {
//     var LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./scratch');
// }
// let users = JSON.parse(JSON.stringify(global.localStorage.getItem('users'))) || [];

router.post("/users/register", async function (req, res, next) {
    let newUser = JSON.parse(JSON.stringify(req.body));
    let duplicateUser = global.filter(user => { return user.username === newUser.username; }).length;
    if (duplicateUser) {
        return res.status(500).json({
            "message": 'Username "' + newUser.username + '" is already taken'
        });
    }
    newUser.id = global.length ? Math.max(...global.map(user => user.id)) + 1 : 1;
    global.push(newUser);
    return res.status(200).json({
        "ok": true,
        "message": "Record Saved"
    });
});

router.post("/users/authenticate", async function (req, res, next) {
    let params = JSON.parse(JSON.stringify(req.body));
    let filteredUsers = global.filter(user => {
        return user.username === params.username && user.password === params.password;
    });
    if (filteredUsers.length) {
        let user = filteredUsers[0];
        let responseJson = {
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            token: 'fake-jwt-token'
        };
        return res.status(200).json({
            "ok": true,
            "text": JSON.stringify(responseJson)
        });
    } else {
        return res.status(500).json({
            "message": 'Username or password is incorrect'
        });
    }
});

router.get("/users", async function (req, res, next) {
    if (req.headers && req.headers.authorization === 'Bearer fake-jwt-token') {
        return res.status(200).json({
            "ok": true,
            "text": JSON.stringify(global)
        });
    } else {
        return res.status(500).json({
            "message": 'Unauthorised'
        });
    }
});

module.exports = router;
