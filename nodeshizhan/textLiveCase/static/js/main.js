var socket = io.connect('http://localhost:3000');
socket.on('online_list', function (data) {
    var Dom = '';
    for(var i=0; i<data.length; i++){
        Dom = Dom + "<li class='lh_180'><a href='javascript:void(0)'>" + data[i] + "</a></li>";
        $(".friend_list").html(Dom);
    }
});

socket.on('msg', function (data) {
    var Dom = " <li><span class=''>["+data.username+"] </span><span class=''>" + data.msg + "</span></li>";
    $($('.live_area').find('ul').find('li').eq(0)).before(Dom);
});

socket.on('live_data', function (data) {
    $('.live_area').find('ul').html(data);
});

$("#send_msg").click(function(){
    var msg = $('textarea').val();
    socket.emit('public',{'msg' : msg});
	$('textarea').val('');//提交完 清空文本框
});
