//=require jquery_ujs
//Error message 
$(function () {
    $.notification = function (options) {
        $(".jbar").html("");
        var opts = $.extend({}, {
            type: 'notice',
            time: 10000
        }, options);
        var o = opts;

        timeout = setTimeout('$.notification.removebar()', o.time);
        var message_span = $('<span />').addClass('jbar-content').html(o.message);
        var wrap_bar = $('<div />').addClass('jbar jbar-top').css("cursor", "pointer");

        if (o.type == 'error') {
            wrap_bar.css({
                "color": "white",
                "background-color": "#DB3939",
                "border-bottom": "1px solid #AC2020"
            })
        };

        wrap_bar.click(function () {
            $.notification.removebar()
        });

        wrap_bar.append(message_span).hide().insertBefore($('.container')).fadeIn('fast');
    };


    var timeout;
    $.notification.removebar = function (txt) {
        if ($('.jbar').length) {
            clearTimeout(timeout);

            $('.jbar').fadeOut('fast', function () {
                $(this).remove();
            });
        }
    };
});




$(function () {



    $("table.viewpane-content").tablesorter({ sortList: [[0,0]] });

    $('a#copy').zclip({
        path: '/assets/ZeroClipboard.swf',
        copy: $('.copied').val()
    });


    $.g_config = {
        totalSize: 0,
        totalNumber: 0,
        error: false
    };


    var plan = getUrlVars()["plan"]

    if (plan != null) {
        var name = "." + plan + "_summary";
        $(name).show();
    }



    $("#planSelect").bind('change', function () {

        var name = "." + $("#planSelect").val() + "_summary";
        $(name).show();
        $(name).siblings().hide();


    });

    humane.timeout = (5000);
    humane.waitForMove = (true);




    $('#fileupload').fileupload({



        drop: function (e, data) {


            var response = $.ajax({
                url: "http://127.0.0.1:3000/priviledge",
                dataType: "json",
                type: "GET",
                processData: true,
                contentType: "application/json",
                async: false,
            });

            var response_object = eval('(' + response.responseText + ')');

            $.each(data.files, function (index, file) {
                $.g_config.totalSize += file.size;
            });
            var total = $.g_config.totalSize;
            var result;

            if (total >= 1000000000) {
                result = (total / 1000000000).toFixed(2) + ' GB, '+ $.g_config.totalNumber+' Files';
            } else if (total >= 1000000) {
                result = (total / 1000000).toFixed(2) + ' MB, '+ $.g_config.totalNumber+' Files';
            } else {
                result = (total / 1000).toFixed(2) + ' KB, '+ $.g_config.totalNumber+' Files';
            }

            $(".filesize").text(result);

            if (response_object.maxfilesize < total) {
                $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p>Over transfer size limit</p></div>');
                $.g_config.error = true;
            }

            if (response_object.maxfilenumber < $.g_config.totalNumber){
                $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p>Over file number limit</p></div>');
                $.g_config.error = true;
            }


            if (checkSpace() < total) {
                $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p>You don\'t have enough space for this account</p></div>');
                $.g_config.error = true;
            }

            if ((checkSpace() > total) && (response_object.maxfilesize > total)) {
                $.g_config.error = false;
            }


        },
        change: function (e, data) {


            var response = $.ajax({
                url: "http://127.0.0.1:3000/priviledge",
                dataType: "json",
                type: "GET",
                processData: true,
                contentType: "application/json",
                async: false,
            });

            var response_object = eval('(' + response.responseText + ')');

            $.each(data.files, function (index, file) {
                $.g_config.totalSize += file.size;
                $.g_config.totalNumber += 1;
            });
            var total = $.g_config.totalSize;
            var result;

            if (total >= 1000000000) {
                result = (total / 1000000000).toFixed(2) + ' GB, '+ $.g_config.totalNumber+' Files';
            } else if (total >= 1000000) {
                result = (total / 1000000).toFixed(2) + ' MB, '+ $.g_config.totalNumber+' Files';
            } else {
                result = (total / 1000).toFixed(2) + ' KB, '+ $.g_config.totalNumber+' Files';
            }

            $(".filesize").text(result);

            if (response_object.maxfilesize < total) {
                $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p>Over transfer size limit</p></div>');
                $.g_config.error = true;
            }
            if (response_object.maxfilenumber < $.g_config.totalNumber){
                $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p>Over file number limit</p></div>');
                $.g_config.error = true;
            }

            if (checkSpace() < total) {
                $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p>You don\'t have enough space for this account</p></div>');
                $.g_config.error = true;
            }

            if ((checkSpace() > total) && (response_object.maxfilesize > total)) {
                $.g_config.error = false;
            }


        },




    });



    $('#fileupload').bind('fileuploadstart', function () {
        var widget = $(this),
            progressElement = $('#fileupload-progress').fadeIn(),
            interval = 500,
            total = 0,
            loaded = 0,
            loadedBefore = 0,
            progressTimer,
            progressHandler = function (e, data) {
                loaded = data.loaded;
                total = data.total;
            },
            stopHandler = function () {
                widget
                    .unbind('fileuploadprogressall', progressHandler)
                    .unbind('fileuploadstop', stopHandler);
                window.clearInterval(progressTimer);
                progressElement.fadeOut(function () {
                    progressElement.html('');
                });
            },
            formatTime = function (seconds) {
                var date = new Date(seconds * 1000);
                return ('0' + date.getUTCHours()).slice(-2) + ':' +
                    ('0' + date.getUTCMinutes()).slice(-2) + ':' +
                    ('0' + date.getUTCSeconds()).slice(-2);
            },
            formatBytes = function (bytes) {
                if (bytes >= 1000000000) {
                    return (bytes / 1000000000).toFixed(2) + ' GB';
                }
                if (bytes >= 1000000) {
                    return (bytes / 1000000).toFixed(2) + ' MB';
                }
                if (bytes >= 1000) {
                    return (bytes / 1000).toFixed(2) + ' KB';
                }
                return bytes + ' B';
            },
            formatPercentage = function (floatValue) {
                return (floatValue * 100).toFixed(2) + ' %';
            },
            updateProgressElement = function (loaded, total, bps) {
                $(".percent").show();
                $(".percent").html(formatPercentage(loaded / total) + ' | ' + formatBytes(bps) + '/s');
                progressElement.html("").css("float", "left");
            },
            intervalHandler = function () {
            var diff = loaded - loadedBefore;
            if (!diff) {
                return;
            }
            loadedBefore = loaded;
            updateProgressElement(
                loaded,
                total,
                diff * (1000 / interval)
            );
        };
    widget
        .bind('fileuploadprogressall', progressHandler)
        .bind('fileuploadstop', stopHandler);
    progressTimer = window.setInterval(intervalHandler, interval);
});


    $("#premiumCheck").change(function () {
        if (this.checked) {
            $("#premiumSignup").modal('show');
        }
    });

    if(!($.browser.webkit)){
        $(".select_folder").hide();
        $(".select_files").css({"margin-left":"50px"});
        $(".select_files").addClass("large");
    }

    $(".select_files").bind('click',function(){
       $(".select_files_target").click();
    });

    $(".select_folder").bind('click',function(){
       $(".select_folder_target").click();
    });


    $(".expand1").click(

    function () {
        $(".subject-field1").toggle();
    }
);

    $(".expand2").click(

    function () {
        $(".subject-field2").toggle();
    });




    $('.topbar').dropdown();




});


$(function () {




    // Initialize the jQuery File Upload widget:
    $('#fileupload').fileupload();
    // 
    // Load existing files:
    $.getJSON($('#fileupload form').prop('action'), function (files) {
        var fu = $('#fileupload').data('fileupload');
        fu._adjustMaxNumberOfFiles(-files.length);
        fu._renderDownload(files).appendTo($('#fileupload .files')).fadeIn(function () {
            // Fix for IE7 and lower:
            $(this).show();
        });
    });

    // Open download dialogs via iframes,
    // to prevent aborting current uploads:
    $('#fileupload .files a:not([target^=_blank])').live('click', function (e) {
        e.preventDefault();
        $('<iframe style="display:none;"></iframe>').prop('src', this.href).appendTo('body');
    });

});




function validateForm() {
    var email = document.forms["main-form"]["sender"].value;
    var files = $(".template-upload").length;

    validatePassword();

    if (email == "" || (!validateEmail(email))) {
        $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p>A valid sender\'s email address is required</p></div>');
        return false;
    } else if ($('.tagsinput').find(".tag").length == 0) {
        $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p>Please provide at least one email recipient to send your file(s)</p></div>');
        return false;
    } else if (files == 0) {
        $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p>Please select at least one file</p></div>');
        return false;
    } else {
        if ($.g_config.error == false) {
            $(".error").html('');
            uploadAll();
            return true;
        } else if ($.g_config.error == true) {
            $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p>Over transfer size/number limit</p></div>');
        } else {
            return false
        }
    }   

}


function validatePassword() {
    var a = $("#container_password").val();
    var b = $("#container_password_confirm").val();



    if (a != b) {
        $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p>Your Passwords do not match</p></div>');
        return false;
    } else {
        $(".error").html('');
        return true;
    }


}


function passwordToggle() {
    $('.password-block').toggle();
}

function passwordEnable() {
    if (!($("#passwordCheckBox").is(':checked'))) {
        $("#container_password_confirm").val("");
        $("#container_password").val("");
        $("#container_password_confirm").prop('disabled', true);
        $("#container_password").prop('disabled', true);
    } else {

        $("#container_password_confirm").prop('disabled', false);
        $("#container_password").prop('disabled', false);
    }

}



function divpoll() {




    if ($(".template-upload").length == 0) {
        $(".drag-drop-show").html('<h1 style="margin-left:55px;margin-top:40px;color:#B7CFDF">Drag &amp; Drop Files Here</h1><br>')
        $(".fileupload-content").css('background', '#F2F7FA');
        $(".percent").hide();


    } else {
        if ($(".template-upload").length != 0) {
            $(".drag-drop-show").html('<h2 style="color:#B7CFDF">Drag &amp; Drop Files Here</h2>');
            $(".fileupload-content").css('background', 'transparent');
        }
    }




}


setInterval('divpoll()', 300);




function validateEmail(elementValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
}


function folderUpdate() {
    $(".edit_container").submit();

}


function uploadAll() {



    var filesList = $('.files');
    filesList.find('.start button').each(function () {
        $(this).click();
    });



}

function checkSpace() {
    var response = $.ajax({
        url: "http://127.0.0.1:3000/storage",
        dataType: "json",
        type: "GET",
        processData: true,
        contentType: "application/json",
        async: false,
    });
    var response_object = eval('(' + response.responseText + ')');

    return response_object.availablespace
}

function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function folderPassword() {
    var pwd = $("#folder_password").val();
    var container_id = $("#container_id").val();

    var response = $.ajax({
        url: "/password_match",
        dataType: "json",
        type: "GET",
        data: {
            password: pwd,
            id: container_id
        },
        processData: true,
        contentType: "application/json",
        async: false
    });

    var response_object = eval('(' + response.responseText + ')');

    if (response_object.match == "true") {
        $.get('/show_container?' + 'password=' + pwd + '&id=' + container_id, function (data) {
            $('#folder_display').html(data);
        });
    } else {
        alert("Incorrec t password");
    }

}