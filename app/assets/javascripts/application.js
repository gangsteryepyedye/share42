



//=require jquery_ujs
//Error message 


var startTime, endTime;



var queueBytesLoaded = 0;
var queueBytesTotal = 0;
var myQueue = null;

String.prototype.trunc = function(n){
                          return this.substr(0,n-1)+(this.length>n?'...':'');
};


var availableNumber = function(){
    var response = $.ajax({
                url: "http://127.0.0.1:3000/priviledge",
                dataType: "json",
                type: "GET",
                processData: true,
                contentType: "application/json",
                async: false,
            });

    var response_object = eval('(' + response.responseText + ')');
    
    return parseInt(response_object.maxfilenumber)+1;    

};

var availableSpace = function(){
    var response = $.ajax({
                url: "http://127.0.0.1:3000/priviledge",
                dataType: "json",
                type: "GET",
                processData: true,
                contentType: "application/json",
                async: false,
            });

    var response_object = eval('(' + response.responseText + ')');
    
    return parseInt(response_object.maxfilesize)+1;    


};

var tooBig = function(){
       $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p>Over transfer size limit</p></div>');
                $.g_config.error = true;
};

var tooMany = function(){
       $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p>Over file number limit</p></div>');
                $.g_config.error = true;
}




var overLimitCheck = function(fileNumber,totalSize,maxNumber,maxSize){

            if (maxSize < totalSize) {
                tooBig();
            }

            if (maxNumber < fileNumber){
                tooMany();
            }
  
            if (checkSpace() < totalSize) {
                tooBig();
            }

            if ((checkSpace() > totalSize) && (maxNumber > fileNumber)) {
                $(".error").html('');
                $.g_config.error = false;
            }



};



var queueChangeHandler = function(queue){

    

        // alert('Uploading Started');
    myQueue = queue;
    // console.log("COLLECTION CHANGE!");
    var list = document.getElementById('file_todo_list');
    // Clear out the old
    while (list.hasChildNodes()){list.removeChild(list.firstChild);}

    var fileNumber=0;
    var fileSize=0;

    // Add the new
    for (i=0;i<queue.files.length;i++)
    {
        fileNumber++;
        fileSize=fileSize+queue.files[i].size;
        addFileToTodoList(queue.files[i].name, queue.files[i].size, i);
    }

    //update information

    if(fileSize==0||fileSize==null||fileSize==NaN){
        $("#upload_info").html("");

        $.g_config.totalNumber=0;
    }
    else if (fileNumber==1){
        $("#upload_info").html("Total: 1 file, "+readableBytes(fileSize));
        $.g_config.totalNumber=1;
    }
    else{
        $("#upload_info").html("Total: "+fileNumber+" files, "+readableBytes(fileSize));
        $.g_config.totalNumber=fileNumber;
    }

                  

    overLimitCheck(fileNumber,fileSize,$.g_config.maxNumber,$.g_config.maxSize);


};

var uploadingStartHandler = function(){
    queueBytesTotal = 0;
    queueBytesLoaded = 0;

    $(".head h4").html("Sending File(s)...");
    $("#upload_info").hide();
    $("#upload_control_panel").hide();
    $("#overall_percentage .progress-bar").show();
    $("#overall_percentage #count").show();

    for (i=0;i<myQueue.files.length;i++)
    {
        queueBytesTotal += parseInt(myQueue.files[i].size);
    }
    document.getElementById('queue_size').innerHTML = readableBytes(queueBytesTotal);
};

var uploadingFinishHandler = function(){

    $("#upload_control_panel").show();
    $("#overall_percentage .progress-bar").hide();
    $("#overall_percentage #count").hide();
    $("#upload_control_panel").hide();
    $("#upload_col2").html("Size");
    $("#upload_col3").html("Action");

      $(".head h4").html("Transfer history");
      $("#input_button_container").hide();
      $(".upload_footer").hide();
      $(".widget").css({"margin-bottom":"40px","border-bottom":"1px solid #D5D5D5"});





  $.notification({ message:"Success! We have uploaded your files. A notification is sent to recipient(s).", type:"notice" });
                            var link = $(".link").val();
                            var sha1 =$(".container_id").val();
                            $("#syf").html('Send More Files');
                            $(".percent").hide();   
                            $(".error").html('<div class="nNote nSuccess" style="border:1px solid #D5D5D5"><p><label>Link to file(s): <a class="copied" href="'+link+'" target="_blank">'+link+'</a><a id="copy" href="#" style="margin-left:20px;color:#3190D3;"><img alt="directory" height="16" src="/assets/clipboard.png" width="16">Copy Link</a></label></p><p style="padding-top:0px;padding-left:10px;"><label style="margin-left: 6px;">&nbsp;You can <a href="javascript:location.reload(true)">click here to send another file.</a></label></p></div>');
                            $('a#copy').zclip({
                                    path:'/assets/ZeroClipboard.swf',
                                    copy:$('a.copied').text()
                            });
                          
                            $(".beforesend").hide();
                                         
                            $.get('/send_notification?id='+sha1, function(data) {
                                return true
                            });



                            $.g_config.totalSize=0; 
        
                             $.ajax({
                                  url: '/partial_update',
                                  data: data,
                                  beforeSend: function() {
                                    $(".recent_activity").css("opacity","0.4"); 
                                    $("#loader-div").css({"margin-top":"40px","margin-left":"150px"})   
                                    $("#loader-div").show();   
                                  },
                                   success: function( data ) {
                                    $('.recent_activity').html(data);
                                    $(".recent_activity").css("opacity","1");    
                                    $("#loader-div").hide();   
                                  },
                             });



};

var queueClearHandler = function(queue){
    document.getElementById('overall').firstChild.style.display = 'none';
    document.getElementById('overall').firstChild.style.width = '0%';
    document.getElementById('overall').firstChild.firstChild.innerHTML = '0%';
    var list = document.getElementById('file_done_list');
    while (list.hasChildNodes()){list.removeChild(list.firstChild);}
};

var addFileToDoneList = function(file_name, file_size){

    var list = $('#file_done_list');
    
    var tr = document.createElement("tr");
    tr.innerHTML = 
        '<td align="center">'+file_name.trunc(40)+'</td>'+
        '<td><div id="bytes">'+readableBytes(file_size)+
        '<td>&nbsp;&nbsp;</td>'

    $("#file_done_list").append(tr);
};


var addFileToTodoList = function(file_name, file_size, index){



    $(".capacity_show").hide(); 
    var list = $('#file_todo_list');




    //$(".drag-drop-show").html('<h2 style="color:#B7CFDF;margin-left:3px;">Drag &amp; Drop Files Here</h2>');


    var tr = document.createElement("tr");
    tr.innerHTML = 
        '<td align="center">'+file_name.trunc(40)+'</td>'+
        '<td><div id="bytes">'+readableBytes(file_size)+
        '</div><div class="progress-bar blue stripes" id="progress-bar">'+
        '<span style="width: 0%; "></span></div>'+
        '<td style="padding-bottom:5px"><span class="close delete" onclick="javascript:s3_swf_1_object.removeFileFromQueue('+index+');">&nbsp;&nbsp;</span></td>'
    $("#file_todo_list").append(tr);
};





var progressHandler = function(progress_event){
    var current_percentage = Math.floor((parseInt(progress_event.bytesLoaded)/parseInt(progress_event.bytesTotal))*100)+'%';

    //change td width, hide delete button
    $("#file_todo_list").children().first().children().last().html("");
    $("#file_todo_list").children().first().children().first().next().css({"width":"300px"});   
    

    //change header's display
    $("#upload_col2").html("Progress");
    $("#upload_col3").html("");

    $("#file_todo_list").children().first().find("#bytes").hide();
    $("#progress-bar").show();

    var single_progress_bar = $("#file_todo_list").children().first().find("#progress-bar span");
    single_progress_bar.css({"width":current_percentage});


    var overall_percentage = Math.floor(((queueBytesLoaded+parseInt(progress_event.bytesLoaded))/queueBytesTotal)*100)+'%';


    $("#overall_percentage .progress-bar span").css({"width":overall_percentage});
    $("#overall_percentage #count").html(overall_percentage);

    if(overall_percentage=="100%"){
             $(".beforesend").hide();
             $(".error").html('<div style="height:31px;float:left;padding-top:11px;margin-bottom:30px;width:100%"><div id="loader" style="height:31px;float:left;margin-right:20px"><img alt="directory" height="31" src="/assets/loader8.gif" width="31" style="margin-top:3px"></div><h2 style="margin-left:30px;color:#777">Processing your request...please wait</h2></div>');
             $("#loader").html('<img alt="directory" height="31" src="/assets/loader8.gif" width="31" style="margin-top:3px">');
    }


};



var uploadCompleteHandler = function(upload_options,event){

     $.ajax({
          url: '/stuffs',
          global: false,
          type: 'POST',
          data: ({
//                'authenticity_token' : '<%= form_authenticity_token %>',
                'container_id' : $(".container_id").val(),
                'email' : $(".recipients").val(),
                'sender' : $(".sender").val(),
                'subject' : $(".subject-field1").val(),
                'message' : $(".subject-field2").val(),
                'container_password' : $("#container_password").val(),
                'stuff' : {
                    'file_file_name' : upload_options.FileName,
                    'file_file_size' : upload_options.FileSize,
                    'file_content_type' : upload_options.ContentType,
                    'notif' :  $("#stuff_notif").val()
                }
        }),
          dataType: 'script'
       }
    )

    queueBytesLoaded += parseInt(upload_options.FileSize);
    addFileToDoneList(upload_options.FileName,upload_options.FileSize);
};

var readableBytes = function(bytes) {
    var s = ['bytes', 'kb', 'MB', 'GB', 'TB', 'PB'];
    var e = Math.floor(Math.log(bytes)/Math.log(1024));
    return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+" "+s[e];       
    
}














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

   


    $('a#copy').zclip({
        path: '/assets/ZeroClipboard.swf',
        copy: $('.copied').val()
    });

    var response = $.ajax({
                url: "http://127.0.0.1:3000/priviledge",
                dataType: "json",
                type: "GET",
                processData: true,
                contentType: "application/json",
                async: false,
    });

    var response_object = eval('(' + response.responseText + ')');


    $.g_config = {
        maxSize: response_object.maxfilesize,
        maxNumber: response_object.maxfilenumber,
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

    $('#result-refinement').dropdown();


    $(".free_upgrade").bind("click",function(){
        
    });

    $("#modal-from-dom").modal({
              backdrop: true
            });
     $("#modal-from-dom1").modal({
              backdrop: true
            });


    $(".personal_switch").bind("click",function(){
        $(".plan").val("personal");
        $(".plan_show").html("<strong>Personal </strong>");
        $("#modal-from-dom1").modal("show");
    });

    $(".premium_switch").bind("click",function(){
        $(".plan").val("premium");
        $(".plan_show").html("<strong>Premium </strong>");
        $("#modal-from-dom1").modal("show");
    });

    $(".plus_switch").bind("click",function(){
        $(".plan").val("plus");
        $(".plan_show").html("<strong>Plus </strong>");
        $("#modal-from-dom1").modal("show");     
    });





    $(".personal_upgrade").bind("click",function(){
        $(".plan").val("personal");
        $(".plan_show").html("<strong>Personal </strong>");
        $("#modal-from-dom").modal("show");
    });

    $(".premium_upgrade").bind("click",function(){
        $(".plan").val("premium");
        $(".plan_show").html("<strong>Premium </strong>");
        $("#modal-from-dom").modal("show");
    });

    $(".plus_upgrade").bind("click",function(){
        $(".plan").val("plus");
        $(".plan_show").html("<strong>Plus </strong>");
        $("#modal-from-dom").modal("show");     
    });




    $("#sort-by a").bind("ajax:beforeSend", function(evt, xhr, settings){
        $("#dynamic_folder_display").css("opacity","0.4");
        $("#loader-div").show();
    })










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
    } else if ($.g_config.totalNumber==0) {
        $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p>Please select at least one file</p></div>');
        return false;
    } else {
        if ($.g_config.error == false) {
            $(".error").html('');
            s3_swf_1_object.startUploading();
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






function validateEmail(elementValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
}


function folderUpdate() {
    $(".edit_container").submit();

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