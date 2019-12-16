var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var porta = process.env.PORT || 8080

var people = {}; 

app.get('/', function(req, res){
  res.send('Rodando :)');
});

io.on('connection', function (person) {  
    person.on("join", function(name){
    	console.log("Entrou: " + name);
        people[person.id] = name;
        person.emit("update", "Você entrou!.");
        person.broadcast.emit("update", name + " entrou.")
    });

    person.on("send", function(msg){
    	console.log("Mensagem: " + msg);
        person.broadcast.emit("chat", people[person.id], msg);
    });

    person.on('disconnect', function(){
        io.emit("update", people[person.id] + " saiu.");
        delete people[person.id];
    });
});


var porta = process.env.PORT || 8080;
http.listen(porta);