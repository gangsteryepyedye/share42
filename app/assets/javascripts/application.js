


   $(function () {
   	
$('.topbar').dropdown();

});




$.g_config = {
	totalSize:0,
	error:false
};






$(".expand1").click(
	function(){
		$(".subject-field1").toggle();
	}	
);

$(".expand2").click(
	function(){
		$(".subject-field2").toggle();
	}	
);



$('#fileupload').fileupload({
	
 
    
	drop: function (e, data) {
    	

       var response=$.ajax({
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
          var total =$.g_config.totalSize;
          var result;
				
				if (total >= 1000000000) {
                	result = (total / 1000000000).toFixed(2) + ' GB';
            	}
            	else if (total >= 1000000) {
                	result = (total / 1000000).toFixed(2) + ' MB';
            	}
            	else{
             		result = (total / 1000).toFixed(2) + ' KB';				
				}
			
		$(".filesize").text(result);
 
 	if(response_object.maxfilesize<total){
 		$(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p><strong>Oh snap!</strong>Over Free transfer size limit</p></div>');	
 	}
 	
   },
    change: function (e, data) {
   
   
    var response=$.ajax({
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
          var total =$.g_config.totalSize;
          var result;
				
				if (total >= 1000000000) {
                	result = (total / 1000000000).toFixed(2) + ' GB';
            	}
            	else if (total >= 1000000) {
                	result = (total / 1000000).toFixed(2) + ' MB';
            	}
            	else{
             		result = (total / 1000).toFixed(2) + ' KB';				
				}
			
		$(".filesize").text(result);
 
 	if(response_object.maxfilesize<total){
 		$(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p><strong>Oh snap!</strong>Over Free transfer size limit</p></div>');	
 	}
 	
    },




});



$('.recipients').tagsInput({
	'height':'30px',
   'width':'483px',
   'unique':true,
   'defaultText':'Add an email recipient'	
});    
    

    $(function () {
    	
    	
    	
    	
        // Initialize the jQuery File Upload widget:
        $('#fileupload').fileupload();
        // 
        // Load existing files:
        $.getJSON($('#fileupload form').prop('action'), function (files) {
            var fu = $('#fileupload').data('fileupload');
            fu._adjustMaxNumberOfFiles(-files.length);
            fu._renderDownload(files)
                .appendTo($('#fileupload .files'))
                .fadeIn(function () {
                    // Fix for IE7 and lower:
                    $(this).show();
                });
        });

        // Open download dialogs via iframes,
        // to prevent aborting current uploads:
        $('#fileupload .files a:not([target^=_blank])').live('click', function (e) {
            e.preventDefault();
            $('<iframe style="display:none;"></iframe>')
                .prop('src', this.href)
                .appendTo('body');
        });

    });
    
    


    
function validateForm()
{
	var email=document.forms["main-form"]["email"].value;
	var files=$(".template-upload").length;

	validatePassword();
	
	if($('.tagsinput').find(".tag").length==0){
		$(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p><strong>Oh snap!</strong> Please provide at least one email recipient to send your file</p></div>');	
		return false;
	}
	else if(files==0){
		$(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p><strong>Holy guacamole!</strong> Please select at least one file</p></div>');	
		return false;
	}
	else{
		$(".error").html('');
		return true;
	}

  uploadAll();
}


function validatePassword(){
  var a=document.forms["main-form"]["container_password"].value;
  var b=document.forms["main-form"]["container_password_confirm"].value



  if(a!=b){
    $(".error").html('<div class="alert-message error fade in" data-alert="alert"><a class="close" href="#">×</a><p><strong>Oh snap!</strong> Your Passwords do not match</p></div>');  
    return false;
  }

  return true; 
}


function passwordToggle(){
  $('.password-block').toggle();
}


function divpoll() {
	
  
   if($(".template-upload").length==0){
         $(".drag-drop-show").html('<h1 style="margin-left:55px;margin-top:40px;color:#777777">Drag &amp; Drop Files Here</h1><p style="margin-left:150px; font-weight:bold;">(Up to 100MB for free)</p>')	            	
 		 $(".fileupload-content").css('background','#F2F5F7');    

   }
   else{
   	if($(".template-upload").length!=0){
        	  $(".drag-drop-show").html('<h2 style="color:#888888">Drag &amp; Drop Files Here</h2>');
        	$(".fileupload-content").css('background','transparent');  
      }
   }
   	
}


setInterval('divpoll()', 300);




function validateEmail(elementValue){
   var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   return emailPattern.test(elementValue);
 }



function uploadAll(){
	
	
	  var emails=$('.input').find('.tag span').text();
	  $('.emails').val(emails);
	
	
	
	   var filesList = $('.files');
	   filesList.find('.start button').each(function(){
	   		$(this).click();	   	
	   });
}

function checkStorage(){
  var response=$.ajax({
      url: "http://127.0.0.1:3000/storage",
      dataType: "json",
      type: "GET",
      processData: true,
      contentType: "application/json",
      async: false,
    }); 
   var response_object = eval('(' + response.responseText + ')');

   return response_object.storage
}






