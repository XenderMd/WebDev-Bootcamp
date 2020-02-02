const express = require("express");
const app = express();
const port = 3000;

app.get("/", function(req, res){
    let file = __dirname +"/index.html";
    console.log(file);
    res.sendFile(file);
});

app.listen(port, ()=>{
    console.log(`Started listening on port ${port}`);
})