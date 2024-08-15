const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const dataService = require("./data-service.js");
const userService = require("./user-service.js");
const app = express();

app.use(express.json());
app.use(cors());


app.use(passport.initialize());


let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;


let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: 'H=`C;S/EvB}wb4t)P-2#akDhTJWRY:_QV8^~A{q,@"x?[K]_yg',
};



let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log('payload received', jwt_payload);

  if (jwt_payload) {
    next(null, {
      _id: jwt_payload._id,
      userName: jwt_payload.userName,
      fullName: jwt_payload.fullName,
      role: jwt_payload.role,
    });
  } else {
    next(null, false);
  }
});


passport.use(strategy);
const HTTP_PORT = process.env.PORT || 8080;

app.get("/api/products",passport.authenticate('jwt', { session: false }), (req,res)=>{
    dataService.getAllProducts().then((data)=>{
        res.json(data);
    }).catch(()=>{
        res.status(500).end();
    });
});

app.post('/api/register', (req, res) => {
    userService
      .registerUser(req.body)
      .then((msg) => {
        res.json({ message: msg });
      })
      .catch((msg) => {
        res.status(422).json({ message: msg });
      });
  });

  app.post('/api/login', (req, res) => {
    userService
      .checkUser(req.body)
      .then((user) => {
        let payload = {
            _id: user._id,
            userName: user.userName,
            fullName: user.fullName,
            role: user.role,
          };
          
          let token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ message: 'User Login successful', token: token });
      })
      .catch((msg) => {
        res.status(422).json({ message: msg });
      });
  });

app.use((req, res) => {
    res.status(404).end();
});

//connecting with the database
userService.connect().then(() => {
    app.listen(HTTP_PORT, () => { console.log("API listening on: " + HTTP_PORT) });
})
    .catch((err) => {
        console.log("unable to start the server: " + err);
        process.exit();
    });
