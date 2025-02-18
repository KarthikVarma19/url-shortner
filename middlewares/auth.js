const {getUser} = require("../service/auth");


async function restrictToLoggedInUserOnly(req, res, next){
    // const useruid = req.cookies.uid;
    const useruid = req.headers["authorization"];
    if(!useruid){
        return res.redirect("/login");
    }
    let token;
    if (useruid && useruid.startsWith("Bearer ")) {
        token = useruid.split("Bearer ")[1]; //"[Bearer ], [12123123;12312332542345]s"
    } else {
        return res.redirect("/login");
    }
    const user = getUser(token);
    if(!user){
        return res.redirect("/login");
    }
    req.user = user;
    next();
}


async function checkAuth(req, res, next){
    //const useruid = req.cookies.uid;
    const useruid = req.headers['authorization']
    let token = null;
    if(useruid && useruid.startsWith("Bearer ")){
        token = useruid.split("Bearer ")[1]; //"[Bearer ], [12123123;12312332542345]s"
    }
    const user = getUser(token);
    req.user = user;
    next();
}

module.exports = {restrictToLoggedInUserOnly, checkAuth};