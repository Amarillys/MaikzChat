

/* eslint-env browser */
/* global $ */

$(document).ready( function() {
    getText(-20, 0);
    $('#start').val(-20);
    $('#limit').val(0);
    setInterval('getText($("#start").val(), $("#limit").val());', 2560);
$('#submit').on('click', function() {
        // Push Ajax
        $.ajax({
            url: './chat/send',
            data: `${getTime()}  ${$('#name').val()} : ${$('#note').val().replace(/</g,'')}`,
            type: 'POST',
            dataType: 'text',
            async: true,
            timeout: 5000,
            success: function(data, textStatus, jqXHR) {
                getText(-20, 0);
            },
        });
    });

    $('#get').on('click', function() {
        getText($('#start').val(), $('#limit').val());
    });
});

function getText(start, limit) {
    $.ajax({
        url: './chat/get',
        data: {
            start: start,
            limit: limit,
        },
        type: 'POST',
        dataType: 'text',
        async: true,
        timeout: 5000,
        success: function(data, textStatus) {
            var strlst = data.split(',');
            // console.log(strlst + textStatus);
            $('tr').remove();
            for (var str of strlst) {
                $('#dataT').after('<tr><td style="width:840px">' +
                str.replace(/>/g, '') + '</tr></td>');
            }
        },
        error: function(textStatus) {
            // console.log(textStatus);
        },
        complete: function(textStatus) {
            // console.log(textStatus);
        }
    });
}

function getTime() {
	var time = new Date();
	return `${time.getFullYear() % 100}-${format(time.getMonth() + 1)}-${format(time.getDate())} ${format(time.getHours())}:${format(time.getMinutes())}`
	function format(number) { return number < 10 ? '0' + number : number }
}
