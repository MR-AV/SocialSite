const express = require("express");
const bodyParser = require("body-parser");
const app  = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {

    res.send("HOLA!!!! TERE MUH ME LOL...");
});
app.listen(PORT, function(){
    console.log(`server is up and running on port ${PORT}`);
})