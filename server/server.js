const express = require("express");
const bodyParser = require("body-parser");
const app  = express();
const PORT = process.env.PORT || 5000;
const router = require("./routes/authRoutes");
require('./services/passport.js');


app.get("/", (req, res) => {

    res.send("HOLA!!!! TERE MUH ME LOL...");
});

app.use('/auth/google', router);

app.listen(PORT, function(){
    console.log(`server is up and running on port ${PORT}`);
})