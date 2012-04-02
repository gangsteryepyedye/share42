



//=require jquery_ujs
//Error message 


var startTime, endTime;



var queueBytesLoaded = 0;
var queueBytesTotal = 0;
var myQueue = null;

String.prototype.trunc = function(n){
                          return this.substr(0,n-1)+(this.length>n?'...':'');
};




$(function () {
    
    $('#mycarousel').jcarousel({
        auto: 8,
        wrap: 'circular',
        initCallback: mycarousel_initCallback
    });
    
    if($.browser.name=="msie"){
        $(".content").html("<h1>Sorry, we do not support IE</h1><p>We are sorry if you are a genuine IE fan, changing your browser can be a real pain but it's definitely worth it. Think of it as you are supporting small companies on the web by not using IE. It isn't a joke, it really is a huge support. Thanks for your understanding.</p><br><p>42share works with Chrome, Firefox and Safari</p><br>")
    }

    //user payment processing(upgrade)
    $(".payment-form").submit(function(event) {



            // disable the submit button to prevent repeated clicks
            $('.submit-button').attr("disabled", "disabled");

            var amount = 1000; //amount you want to charge in cents
            Stripe.createToken({
                number: $('.card-number').val(),
                cvc: $('.card-cvc').val(),
                exp_month: $('.card-expiry-month').val(),
                exp_year: $('.card-expiry-year').val()
            }, amount, stripeResponseHandler);

            // prevent the form from submitting with the default action
            return false;
  });

   $(".payment-form-switch").submit(function(event) {
            // disable the submit button to prevent repeated clicks
            $('.submit-button').attr("disabled", "disabled");

            var amount = 1000; //amount you want to charge in cents
            Stripe.createToken({
                number: $('.card-number-switch').val(),
                cvc: $('.card-cvc-switch').val(),
                exp_month: $('.card-expiry-month-switch').val(),
                exp_year: $('.card-expiry-year-switch').val()
            }, amount, stripeResponseHandler2);

            // prevent the form from submitting with the default action
            return false;
  });


  $("#xlInput_tag").focus(function(){
    $(this).css("width","178px");
});
 


  $(".zip").click(function(event){
     
    var id=$("#folder_sha1").val();

    var response = $.ajax({
        url: "/compression_check?id="+id,
        dataType: "json",
        type: "GET",
        processData: true,
        contentType: "application/json",
        async: false,
    });
    var response_object = eval('(' + response.responseText + ')');

    if (response_object.status=='pass'){
        return true;
    }
    else{
      event.preventDefault();  
      $.notification({ message:response_object.status, type:"notice" });
      return false;
    } 

  });


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


   $("#showcase").awShowcase(
    {
        content_width:          1000,
        content_height:         400,
        fit_to_parent:          false,
        auto:                   false,
        continuous:             false,
        loading:                true,
        tooltip_width:          200,
        tooltip_icon_width:     32,
        tooltip_icon_height:    32,
        tooltip_offsetx:        18,
        tooltip_offsety:        0,
        arrows:                 true,
        buttons:                false,
        btn_numbers:            false,
        keybord_keys:           true,
        mousetrace:             false, /* Trace x and y coordinates for the mouse */
        pauseonover:            true,
        stoponclick:            false,
        transition:             'hslide', /* hslide/vslide/fade */
        transition_delay:       0,
        transition_speed:       500,
        show_caption:           'onload', /* onload/onhover/show */
        thumbnails:             false,
        thumbnails_position:    'outside-last', /* outside-last/outside-first/inside-last/inside-first */
        thumbnails_direction:   'vertical', /* vertical/horizontal */
        thumbnails_slidex:      1, /* 0 = auto / 1 = slide one thumbnail / 2 = slide two thumbnails / etc. */
        dynamic_height:         false, /* For dynamic height to work in webkit you need to set the width and height of images in the source. Usually works to only set the dimension of the first slide in the showcase. */
        speed_change:           true, /* Set to true to prevent users from swithing more then one slide at once. */
        viewline:               false, /* If set to true content_width, thumbnails, transition and dynamic_height will be disabled. As for dynamic height you need to set the width and height of images in the source. */
        custom_function:        null /* Define a custom function that runs on content change */
    });


   


    $('a#copy').zclip({
        path: '/assets/ZeroClipboard.swf',
        copy: $('.copied').val()
    });

    var response = $.ajax({
                url: "/priviledge",
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



    $(".signin-toggle").bind("click",function(){
        $("#sign_in_block").toggle();
    });

    $(".expand1").each(function() {

        
        var tis = $(this), state = false;
        
        tis.click(function() {
            state = !state;
            $(".subject-field1").toggle();
            $(".subject-field2").toggle();

            tis.toggleClass('active',state);

        });
    });




    $(".expand3").each(function() {

        var tis = $(this), state = false;

        tis.click(function() {
            state = !state;   
            $(".subject-field3").toggle();
            tis.toggleClass('active',state);
        });

    });






    $('.topbar').dropdown();

    $('#result-refinement').dropdown();

    $("#show_hide_stats").bind("click",function(){
        $(".stats").toggle();   
        if($(".stats").is(":visible")){
            $("#show_hide_stats").html("&nbspHide");
        }
        else{
            $("#show_hide_stats").html("&nbspShow");            
        }
           
    });


    $(".free_upgrade").bind("click",function(){
        
    });

    $(".cancel_upload_button").bind("click",function(){
        alert("Uploading cancelled, please refresh the page to start over.");
    });


    $("#modal-from-dom").modal({
              backdrop: true
            });
     $("#modal-from-dom1").modal({
              backdrop: true
            });



    var plan=getURLParam("plan");

    if(plan == 'plus'){
        $("#planSelect").val("plus");
    }
    else if(plan == "premium"){
        $("#planSelect").val("premium");
    }
    else{
        $("#planSelect").val("personal");
    }





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

    $("#search-form").bind("ajax:beforeSend", function(evt, xhr, settings){
        $("#dynamic_folder_display").css("opacity","0.4");
        $("#loader-div").show();
    })


    $("#sort-by a").bind("ajax:beforeSend", function(evt, xhr, settings){
        $("#dynamic_folder_display").css("opacity","0.4");
        $("#loader-div").show();
    })


     $(".nav-list a").bind("ajax:beforeSend", function(evt, xhr, settings){
        $("#dynamic_folder_display").css("opacity","0.4");
        $("#loader-div").show();
    })


    $('#flash').delay(500).fadeIn('normal', function() {
      $(this).delay(2500).fadeOut();
    });


    //footerslide tour
    var open = false;
    $('.slide_button').click(function() {
        if(open === false) {
            var browser_height = $(window).height();
            var content_height = browser_height*0.95;


            $("#footerSlideContent").focus();
            $('#footerSlideContent').animate({ height: content_height }, 'fast');
            $(this).css('backgroundPosition', 'bottom left');
            open = true;
        } else {
            $('#footerSlideContent').animate({ height: '0px' });
            $(this).css('backgroundPosition', 'top left');
            open = false;
        }
    });



});


var availableNumber = function(){
    var response = $.ajax({
                url: "/priviledge",
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
                url: "/priviledge",
                dataType: "json",
                type: "GET",
                processData: true,
                contentType: "application/json",
                async: false,
            });

    var response_object = eval('(' + response.responseText + ')');
    
    return parseInt(response_object.maxfilesize)+1;    


};


var spaceLimit = function(){
    $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p>Over Transfer Size Limit <a id="upgrade_link" href="/pages/pricing">Upgrade</a></p></div>');
    $.g_config.error = true;
};


var tooBig = function(){
       $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p>Over Transfer size Limit <a id="upgrade_link" href="/pages/pricing">Upgrade</a></p></div></p></div>');
       $.g_config.error = true;
};

var tooMany = function(){
       $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p>Over File Number Per Transfer limit</p></div>');
       $.g_config.error = true;
}




var overLimitCheck = function(fileNumber,totalSize,maxNumber,maxSize){
            
            if (checkSpace() < totalSize) {
                spaceLimit();
                return false;

            }
            

            if (maxNumber < fileNumber){
                tooMany();
                return false;

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
    var spaceCheckNeeded=true;

    // Add the new
    for (i=0;i<queue.files.length;i++)
    {
        fileNumber++;
        
        if (queue.files[i].size > $.g_config.maxSize) {
                tooBig();
                spaceCheckNeeded=false;
        }

        fileSize=fileSize+queue.files[i].size;
        addFileToTodoList(queue.files[i].name, queue.files[i].size, i);
    }

    //update information


    if(fileSize==0||fileSize==null||fileSize==NaN){
        $("#upload_info").html("");
        $("#upload_info").css("padding-bottom","0px");     
        $.g_config.totalNumber=0;
        $.g_config.totalSize=0;
    }
    else if (fileNumber==1){
        $("#upload_info").html("Total: 1 file, "+readableBytes(fileSize));
        $("#upload_info").css("padding-bottom","15px");
        $.g_config.totalNumber=1;
        $.g_config.totalSize=fileSize;
    }
    else{
        $("#upload_info").html("Total: "+fileNumber+" files, "+readableBytes(fileSize));
         $("#upload_info").css("padding-bottom","15px");       
        $.g_config.totalNumber=fileNumber;
        $.g_config.totalSize=fileSize;
    }

                  
    if(spaceCheckNeeded==true){
        overLimitCheck($.g_config.totalNumber,$.g_config.totalSize,$.g_config.maxNumber,$.g_config.maxSize);
    }

};

var uploadingStartHandler = function(){
    queueBytesTotal = 0;
    queueBytesLoaded = 0;
    var date = new Date();
    startTime = date.getTime()/1000;


    $(".head h4").html("Sending File(s)...");
    $("#upload_info").hide();
    $("#upload_control_panel").css('position','absolute');
    $("#upload_control_panel").css('left','-9999px');
    $("#overall_percentage .progress-bar").show();
    $("#overall_percentage #count").show();
    $("#cancel_upload").show();

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
    $("#cancel_upload").hide();
    $("#upload_control_panel").hide();
    $("#upload_col2").html("Size");
    $("#upload_col3").html("Action");

      $(".head h4").html("Transfer history");
      $("#input_button_container").hide();
      $(".upload_footer").hide();
      $(".help-block").hide();
      $(".widget").css({"margin-bottom":"40px","border-bottom":"1px solid #D5D5D5"});
    $(".head h4").css("margin-left","170px");





  $.notification({ message:"Success! We have uploaded your files. A notification has been sent to recipient(s).", type:"notice" });
                            var link = $(".link").val();
                            var sha1 =$(".container_id").val();
                            $("#syf").html('Send More Files');
                            $(".percent").hide();   
                            $(".error").html('<div class="nNote nSuccess" style="border:1px solid #D5D5D5"><p><label>Link to file(s): <a class="copied" href="'+link+'" target="_blank">'+link+'</a><a id="copy" href="#" style="margin-left:20px;color:#3190D3;"><img alt="directory" height="16" src="/assets/clipboard.png" width="16">Copy Link</a></label></p><p style="padding-top:0px;padding-left:10px;"><label style="margin-left: 6px;">&nbsp;You can <a href="javascript:location.reload(true)">reload to send another file.</a></label></p></div>');
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


var formatBytes = function (bytes) {
            if (bytes >= 1000000000) {
                return (bytes / 1000000000).toFixed(2) + ' GB/s';
            }
            if (bytes >= 1000000) {
                return (bytes / 1000000).toFixed(2) + ' MB/s';
            }
            if (bytes >= 1000) {
                return (bytes / 1000).toFixed(2) + ' KB/s';
            }
            return bytes + ' B/s';
};


var progressHandler = function(progress_event){
    var date = new Date();
    endTime=date.getTime() / 1000;

    var diff = endTime - startTime;

    var current_percentage = Math.floor((parseInt(progress_event.bytesLoaded)/parseInt(progress_event.bytesTotal))*100)+'%';
   
    var upload_speed = formatBytes((queueBytesLoaded+parseInt(progress_event.bytesLoaded))/diff);

    $(".head h4").html("Sending File(s)... "+upload_speed);
    $(".head h4").css("margin-left","125px");


    //change td width, hide delete button
    $("#file_todo_list").children().first().children().last().html('');
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
             $(".content").css("margin-top","160px");
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





var getURLParam = function (strParamName){
  var strReturn = "";
  var strHref = window.location.href;
  if ( strHref.indexOf("?") > -1 ){
    var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
    var aQueryString = strQueryString.split("&");
    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
      if ( 
aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
        var aParam = aQueryString[iParam].split("=");
        strReturn = aParam[1];
        break;
      }
    }
  }
  return unescape(strReturn);
}




var validateForm = function () {
    var files = $(".template-upload").length;

    validatePassword();

    if ($('.tagsinput').find(".tag").length == 0) {
        $(".error").html('<div class="alert-message success fade in" data-alert="alert"><a class="close" href="#">×</a><p>Please provide at least one email recipient to send your file(s)</p><p>(Tip: You can also send file(s) to your own email)</p></div>');
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
            $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p>Over transfer limit</p></div>');
        } else {
            return false
        }
    }   

}


var validatePassword = function () {
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


var passwordToggle = function() {
    $('.password-block').toggle();
    $("#container_password").val('');
    $("#container_password_confirm").val('');
}

var passwordEnable = function () {
    if (!($("#passwordCheckBox").is(':checked'))) {
        $("#container_password_confirm").val("");
        $("#container_password").val("");
        $("#container_password_confirm").attr('disabled', true);
        $("#container_password").attr('disabled', true);
    } else {

        $("#container_password_confirm").attr('disabled', false);
        $("#container_password").attr('disabled', false);
    }

}






var validateEmail = function (elementValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
}


var folderUpdate = function () {
    $(".edit_container").submit();

}

var updateTitle = function (){
    var title = $(".form_folder_name").val();
    $(".folder_name").html(title)    
}


var checkSpace = function () {
    var response = $.ajax({
        url: "/storage",
        dataType: "json",
        type: "GET",
        processData: true,
        contentType: "application/json",
        async: false,
    });
    var response_object = eval('(' + response.responseText + ')');

    return response_object.availablespace
}



var getUrlVars = function () {
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

var folderPassword = function () {
    var pwd = $("#folder_password").val();
    var container_id = $("#folder_sha1").val();

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
        alert("Incorrect password");
    }

}


localStorage["data"] = ({"hasAlreadyPlayed":true,"player":{"name":"AweseomCock","weapon":"goldensword","armor":"goldenarmor","image":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAADN0lEQVR4Xu2aP4gTQRTGc0oQ1EJsDgkKB3qNioVFUvgXKwmIYmW0uiLVBe0OCysLuU7JVSmu8iII1xwEURCUs0gKCxFFcpATJeg1p4V/kCg6eZkP3SGzs7vsrMm+STOZnTebne/7zXubTSYyzF8TzNefcQI4Apgr4LYAcwBcEnRbwG0B5gq4LcAcAFcFEtsC+Xz+dxjaWq1WIteWyIf0F85WACz8xpUNAmD6yEVfENovlmn85t1Jam2TYJ0AtgJg4YvXf5CT2d1nqN25I+tLwJevPRrvbT6mdubWNqskWCOArQAq8lN7d3kcBwk6DOA8xtfff7aaE2InwAkg6z2yvuo0sjtyA/Y4+nAc8xCPftxVwToBbAXAwkECnLx9doqGrj1Yp1bt6+aNHQHsBVCdbTabnt3QuzfnrQ6X5j39QqEwlJCxyQHsBYCdq1dP0tusdBjO4jjijt95Sm9BCgjB8bHNAakRQP06a9qLiIcAz9vvPHv86PQ+T183DgJMn6e7szQdD3wf4ASQd3j1ep1ELZVK1JqcUUmAIyYibDuP6whNAHsBkKU7nY4vCXC+VqtRXLlcplbN/uoehfPqPBNppr2uGw9NAFsBoCCc1QmBONwIHZhdoEPdbtdDgs4ROJ/L5ShkbWGWWnx3iJuEwAQ4ARTLTCSo9R8k4DQgAn04jj6cx/2CraoQmoCgJKRegLBCwMFGo+GbsIvF4tBqMXIEOAEMOeHn6wsUcWzmgycyKAFqNRmZKqDjV02KbAV4triHNGqvvaUWT30hXFACUO8hbNz1H9cTuQqoJOBC2QqgJkX0hXP0xX/u3GF6IPBkY7tvFTg1+Y3G51de7peBA5QymV++EyMOxkaAE0AqUKlU6OfcarV6ot+KrfGo38JZCKWSoBsXBJ2Xc+g84vU9otlDp8VOAHsBhMz4AwA5Jwi4328vH9xKDiy9Gmxl4ezgkZJ8iTh61OQT91CGbo40AU6Av/bgjwGHJAmrw5xX3QQJgpDTcuyNbD/G6TzOFXsO+Oci2QugMwzCbNEEfJLHQ/2vMCodNglwAkR1Jcl5/4OAJNdn/CwngFGilAc4AlJusHF5jgCjRCkP+AMoD3BfW0kwxgAAAABJRU5ErkJggg=="},"achievements":{"unlocked":[],"ratCount":0,"skeletonCount":0,"totalKills":0,"totalDmg":0,"totalRevives":0}})


    // this identifies your website in the createToken call below
    Stripe.setPublishableKey('pk_Oy6QEGiFXu7fcprluYEXZIfWC0lKH');
     
  var stripeResponseHandler = function (status, response) {
                if (response.error) {
                    var message_text = response.error.message;
                    $.notification({ message:message_text, type:"error" });
                    $(".submit-button").attr("disabled",false);

                        } else {
                    var form = $(".payment-form");
                    // token contains id, last4, and card type
                    var token = response['id'];
                    // insert the token into the form so it gets submitted to the server
                    form.append("<input type='hidden' name='stripeToken' value='" + token + "' />");
                    // and submit
                    form.get(0).submit();
                }
            }
 var stripeResponseHandler2 = function (status, response) {
                if (response.error) {
                    var message_text = response.error.message;
                    $.notification({ message:message_text, type:"error" });
                    $(".submit-button").attr("disabled",false);

                } else {
                    var form = $(".payment-form-switch");
                    // token contains id, last4, and card type
                    var token = response['id'];
                    // insert the token into the form so it gets submitted to the server
                    form.append("<input type='hidden' name='stripeToken' value='" + token + "' />");
                    // and submit
                    form.get(0).submit();
                }
    }

var mycarousel_initCallback = function (carousel)
{
    // Disable autoscrolling if the user clicks the prev or next button.
    carousel.buttonNext.bind('click', function() {
        carousel.startAuto(0);
    });

    carousel.buttonPrev.bind('click', function() {
        carousel.startAuto(0);
    });

    // Pause autoscrolling if the user moves with the cursor over the clip.
    carousel.clip.hover(function() {
        carousel.stopAuto();
    }, function() {
        carousel.startAuto();
    });
};


var move_transfer_div = function(){



}