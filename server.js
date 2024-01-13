const express = require("express");
const app = express();

app.listen(8000, function(){
    console.log("listen")
});

app.get('/', function(request, response){
    response.sendFile(__dirname + "/index.html");
})

app.get('/pet', function(request, response){
        response.send('펫 용품을 사용할 수 있는 페이지입니다.');
})