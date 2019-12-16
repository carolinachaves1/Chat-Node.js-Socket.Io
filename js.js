$(document).ready(function(){  
    var socket = io.connect("http://localhost:3000");
    var ready = false;

    $("#submit").submit(function(e) {
		e.preventDefault();
		$(".login_area").fadeOut();
		$("#chat").fadeIn();
		$(".container").css("background","#fdfdfd");
		var name = $("#nickname").val();
		var time = new Date();
		$("#name").html(name);
		$("#time").html(time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds());

		ready = true;
		socket.emit("join", name);

	});


    socket.on("update", function(msg) {
    	if (ready) {
    		$('.chat').append('<li class="info">' + msg + '</li>')
    	}
    }); 

    socket.on("chat", function(client,msg) {
    	if (ready) {
				var time = new Date();
				$(".chat").append('<li class="field"><div class="msg"><span>' + client + ':</span><p>' + msg + '</p><time>' + time.getHours() + ':' + time.getMinutes() + '</time></div></li>');
				
    	}
    });

	$("#textarea").keypress(function(e){
        if(e.which == 13) {
        	var text = $("#textarea").val();
        	$("#textarea").val('');
        	var time = new Date();
					$(".chat").append('<li class="self"><div class="msg"><span>' + $("#nickname").val() + ':</span><p>' + text + '</p><time>' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds() + '</time></div></li>');
					
					socket.emit("send", text);

        }
    });



});