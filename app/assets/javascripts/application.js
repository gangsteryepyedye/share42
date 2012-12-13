//=require jquery_ujs
//Error message 
var startTime, endTime;
var queueBytesLoaded = 0;
var queueBytesTotal = 0;
var myQueue = null;
String.prototype.trunc = function(n){
                          return this.substr(0,n-1)+(this.length>n?'...':'');
};

/*  SWFObject v2.2 <http://code.google.com/p/swfobject/> 
  is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
var s3_upload_swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

/* S3_Upload V0.1
    Copyright (c) 2008 Elctech,
    This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
/* S3_Upload V0.2
    Copyright (c) 2010 Nathan Colgate,
    This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/
var s3_swf;
function s3_swf_init(id, options)
{
  buttonWidth                       = (options.buttonWidth != undefined) ?                          options.buttonWidth :                           50;
  buttonHeight                  = (options.buttonHeight != undefined) ?                         options.buttonHeight :                          50;
  flashVersion                      = (options.flashVersion != undefined) ?                         options.flashVersion :                          '9.0.0';
  queueSizeLimit                    = (options.queueSizeLimit != undefined) ?                   options.queueSizeLimit :                        10;
  fileSizeLimit                     = (options.fileSizeLimit != undefined) ?                        options.fileSizeLimit :                         524288000;
  fileTypes                         = (options.fileTypes != undefined) ?                                options.fileTypes :                                 "*.*";
  fileTypeDescs                     = (options.fileTypeDescs != undefined) ?                        options.fileTypeDescs :                         "All Files";
  selectMultipleFiles           = (options.selectMultipleFiles != undefined) ?          options.selectMultipleFiles :           true;
  keyPrefix                         = (options.keyPrefix != undefined) ?                                options.keyPrefix :                                 "";
    signaturePath                           = (options.signaturePath != undefined) ?                        options.signaturePath :                         "s3_uploads.xml";
  swfFilePath               = (options.swfFilePath != undefined) ?              options.swfFilePath :               "/flash/s3_upload.swf";
  buttonUpPath                          = (options.buttonUpPath != undefined) ?                         options.buttonUpPath :                          "";
    buttonOverPath                      = (options.buttonOverPath != undefined) ?                   options.buttonOverPath :                        "";
    buttonDownPath                      = (options.buttonDownPath != undefined) ?                   options.buttonDownPath :                        "";
                                    
    onFileAdd                                   = (options.onFileAdd != undefined) ?                                options.onFileAdd :                                 function(file){};
    onFileRemove                            = (options.onFileRemove != undefined) ?                         options.onFileRemove :                          function(file){};
    onFileSizeLimitReached      = (options.onFileSizeLimitReached != undefined) ?   options.onFileSizeLimitReached :        function(file){};
    onFileNotInQueue                    = (options.onFileNotInQueue != undefined) ?                 options.onFileNotInQueue :                  function(file){};
                                                                                                                        
    onQueueChange                           = (options.onQueueChange != undefined) ?                        options.onQueueChange :                         function(queue){};
    onQueueClear                            = (options.onQueueClear != undefined) ?                         options.onQueueClear :                          function(queue){};
    onQueueSizeLimitReached     = (options.onQueueSizeLimitReached != undefined) ?  options.onQueueSizeLimitReached :   function(queue){};
    onQueueEmpty                            = (options.onQueueEmpty != undefined) ?                         options.onQueueEmpty :                          function(queue){};
    
    onUploadingStop                     = (options.onUploadingStop != undefined) ?                  options.onUploadingStop :                   function(){};
    onUploadingStart                    = (options.onUploadingStart != undefined) ?                 options.onUploadingStart :                  function(){};
    onUploadingFinish                   = (options.onUploadingFinish != undefined) ?                options.onUploadingFinish :                 function(){};
                                                                                                                    
    onSignatureOpen                     = (options.onSignatureOpen != undefined) ?                  options.onSignatureOpen :                   function(file,event){};
    onSignatureProgress             = (options.onSignatureProgress != undefined) ?          options.onSignatureProgress :           function(file,progress_event){};
    onSignatureHttpStatus           = (options.onSignatureHttpStatus != undefined) ?        options.onSignatureHttpStatus :         function(file,http_status_event){};
    onSignatureComplete             = (options.onSignatureComplete != undefined) ?          options.onSignatureComplete :           function(file,event){};
    onSignatureSecurityError    = (options.onSignatureSecurityError != undefined) ? options.onSignatureSecurityError :  function(file,security_error_event){};
    onSignatureIOError              = (options.onSignatureIOError != undefined) ?           options.onSignatureIOError :                function(file,io_error_event){};
    onSignatureXMLError             = (options.onSignatureXMLError != undefined) ?          options.onSignatureXMLError :           function(file,error_message){};
                                                                                                                        
    onUploadOpen                            = (options.onUploadOpen != undefined) ?                         options.onUploadOpen :                          function(upload_options,event){};
    onUploadProgress                    = (options.onUploadProgress != undefined) ?                 options.onUploadProgress :                  function(upload_options,progress_event){};
    onUploadHttpStatus              = (options.onUploadHttpStatus != undefined) ?           options.onUploadHttpStatus :                function(upload_options,http_status_event){};
    onUploadComplete                    = (options.onUploadComplete != undefined) ?                 options.onUploadComplete :                  function(upload_options,event){};
    onUploadIOError                     = (options.onUploadIOError != undefined) ?                  options.onUploadIOError :                   function(upload_options,io_error_event){};
    onUploadSecurityError           = (options.onUploadSecurityError != undefined) ?        options.onUploadSecurityError :         function(upload_options,security_error_event){};
    onUploadError                           = (options.onUploadError != undefined) ?                        options.onUploadError :                         function(upload_options,error){};
  
  var flashvars = {};
  var params = {};
  var attributes = {};
  params.wmode = "transparent";
  params.menu = "false";
  params.quality = "low";

  s3_upload_swfobject.embedSWF(swfFilePath, id, buttonWidth, buttonHeight, flashVersion, false, flashvars, params, attributes);
 
  signatureUrl = window.location.protocol + '//' + window.location.host + signaturePath;
  buttonUpUrl = window.location.protocol + '//' + window.location.host + buttonUpPath;
  buttonDownUrl = window.location.protocol + '//' + window.location.host + buttonDownPath;
  buttonOverUrl = window.location.protocol + '//' + window.location.host + buttonOverPath;

  s3_swf = {
    obj: function() { return document[id]; },

    init: function() { this.obj().init(signatureUrl, keyPrefix, fileSizeLimit, queueSizeLimit, fileTypes, fileTypeDescs, selectMultipleFiles,buttonWidth,buttonHeight,buttonUpUrl,buttonDownUrl,buttonOverUrl); },
        clearQueue: function() { this.obj().clearQueue();},
        startUploading: function() { this.obj().startUploading();},
        stopUploading: function() { this.obj().stopUploading();},
        removeFileFromQueue: function(index) { this.obj().removeFileFromQueue(index); },
        
        onFileAdd: onFileAdd,
        onFileRemove: onFileRemove,
        onFileSizeLimitReached: onFileSizeLimitReached,
        onFileNotInQueue: onFileNotInQueue,
        
        onQueueChange: onQueueChange,
        onQueueClear: onQueueClear,
        onQueueSizeLimitReached: onQueueSizeLimitReached,
        onQueueEmpty: onQueueEmpty,
        
        onUploadingStop: onUploadingStop,
        onUploadingStart: onUploadingStart,
        onUploadingFinish: onUploadingFinish,
        
        onSignatureOpen: onSignatureOpen,
        onSignatureProgress: onSignatureProgress,
        onSignatureHttpStatus: onSignatureHttpStatus,
        onSignatureComplete: onSignatureComplete,
        onSignatureSecurityError: onSignatureSecurityError,
        onSignatureIOError: onSignatureIOError,
        onSignatureXMLError: onSignatureXMLError,

        onUploadOpen: onUploadOpen,
        onUploadProgress: onUploadProgress,
        onUploadHttpStatus: onUploadHttpStatus,
        onUploadComplete: onUploadComplete,
        onUploadIOError: onUploadIOError,
        onUploadSecurityError: onUploadSecurityError,
        onUploadError: onUploadError
        
  }

  return(s3_swf);
}

$(function () {
        // this identifies your website in the createToken call below
    Stripe.setPublishableKey('pk_8QSFtQZHXA1V6vYgFixNDaVt6le5p');  
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
 
  $('#container_password_confirm').live('blur', function() {
    validatePassword();
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

    $('#flash').delay(500).fadeIn('normal', function() {
      $(this).delay(4500).fadeOut();
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
    $("#upload_control_panel").hide();
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
    $("#flash_upload_button").hide();
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