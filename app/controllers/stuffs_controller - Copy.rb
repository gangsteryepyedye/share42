class StuffsController < ApplicationController
  
 # def download
   # @stuff=Stuff.find(params[:id])
   # url=@stuff.file

  #  redirect_to(url.expiring_url(15),:type=>@stuff.file_content_type)
 # end
def download
   
    require 'aws/s3'

    @stuff=Stuff.find_by_id_or_sha1(params[:id])   


    @container=Container.find(@stuff.container_id)
    

    @container.downloaded=@container.downloaded+1
    @container.save
  
  
  
    if (!params[:email].nil?) 
         query=url_unescape(params[:email])

        @email=@container.emails.where("name =?",query).first
          if(!@email.nil?)
            @email.downloads=@email.downloads+1
            @email.save
        end
    end        

    AWS::S3::Base.establish_connection!(
    :access_key_id => "AKIAICDXU5SXRWQA5RQA",
    :secret_access_key => "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"
    )
    filename=CGI::unescape(@stuff.file.to_s.scan(/nel\/([^"]*)\?/).first.first)

    s3obj = AWS::S3::S3Object.find(filename, 'filetunnel')
    file_type = s3obj.about["content-type"]
    file_length = s3obj.about["content-length"]


    send_file_headers!(:length => file_length, :type => file_type, :filename => @stuff.file_file_name)
    render :status => 200, :text => Proc.new { |response, output|
    AWS::S3::S3Object.stream(filename, 'filetunnel') do |chunk|
    output.write chunk
    end
    }

  

end







<style type="text/css" media="screen">
body {text-align:center;background:#ffffff;}
div#wrapper {width:800px;margin:0px auto;text-align:left;}

h1 {font-size:300%;font-weight:bold;}

div#file_lists {border-top:1px solid #ccc;border-bottom:1px solid #ccc;margin-bottom:10px;color:#B7CFDF;background: none repeat scroll 0% 0% rgb(242, 247, 250);    border: 1px solid #B7CFDF; border-style: dashed !important;
    border-width: 2px !important;
    min-height: 160px;
    margin: auto;
    vertical-align: middle;
    width: 450px;}
ul.file_list {font-size:130%;}
ul.file_list li {height:20px;line-height:20px;position:relative;padding: 5px 5px 5px 10px;}



ul.file_list li span.progress {display:block;position:absolute;background:transparent;text-align:right;}
ul.file_list li span.progress span.amount {padding-right:10px;color:#DFFFE3;font-weight:bold;}

span.file_name {display:block;position:absolute;left:15px;font-size:13px;color:#395069;}
span.file_size {margin-top:2px;display:block;position:absolute;left: 340px;font-size:13px;color:#395069;}

span.delete {width:16px;height:16px;margin-top:3px;display:block;position:absolute;left:420px;cursor:pointer;background:url('/assets/trash.png') no-repeat;}

ul#file_done_list li span.progress {width:100%;border-right:0;}
ul#file_todo_list li span.progress {display:none;}

div#overall {height:16px;position:relative;margin: 0px;width:100%; text-align: left;}
div#overall span.progress {border: 1px solid #AED0EA;background: url(/assets/pbar.png) repeat-x;color: #fff;font-weight: bold;
margin: 0px;
height: 100%;
overflow: hidden;
border-image: initial;}
span.amount {position: relative;
margin-right: 50px;
text-align: right;
font-size: 11px;
display: none;
}

div#overall span#status {text-align:center;display:block;width:100%;font-weight:bold;color:#aaa;position:absolute;}

div#overall span.progress {display:none;}
</style>












<script type="text/javascript">
var queueBytesLoaded = 0;
var queueBytesTotal = 0;
var myQueue = null;


var queueChangeHandler = function(queue){
// alert('Uploading Started');
myQueue = queue;
// console.log("COLLECTION CHANGE!");
var list = document.getElementById('file_todo_list');
// Clear out the old
while (list.hasChildNodes()){list.removeChild(list.firstChild);}
// Add the new
for (i=0;i<queue.files.length;i++)
{
addFileToTodoList(queue.files[i].name, queue.files[i].size, i);
}
};

var uploadingStartHandler = function(){
queueBytesTotal = 0;
queueBytesLoaded = 0;
for (i=0;i<myQueue.files.length;i++)
{
queueBytesTotal += parseInt(myQueue.files[i].size);
}
document.getElementById('queue_size').innerHTML = readableBytes(queueBytesTotal);
};

var uploadingFinishHandler = function(){
document.getElementById('overall').firstChild.style.width = '100%';
document.getElementById('overall').firstChild.firstChild.innerHTML = '100%';
  alert('All files have been successfully uploaded');
};

var queueClearHandler = function(queue){
document.getElementById('overall').firstChild.style.display = 'none';
document.getElementById('overall').firstChild.style.width = '0%';
document.getElementById('overall').firstChild.firstChild.innerHTML = '0%';
var list = document.getElementById('file_done_list');
while (list.hasChildNodes()){list.removeChild(list.firstChild);}
};

var addFileToDoneList = function(file_name, file_size){

    progressTimer = window.setInterval(intervalHandler, interval);



var list = document.getElementById('file_done_list');
var li = document.createElement("li");
li.innerHTML =
'<span class="progress"></span>'+
'<span class="file_name">'+file_name+'</span>'+
'<span class="file_size">'+readableBytes(file_size)+'</span>';
list.appendChild(li);
};

var addFileToTodoList = function(file_name, file_size, index){
var list = document.getElementById('file_todo_list');
$("#file_lists").css('background', 'transparent');
$(".drag-drop-show").html('<h2 style="color:#B7CFDF;margin-left:3px;">Drag &amp; Drop Files Here</h2>');

var li = document.createElement("li");
li.innerHTML =
'<span class="progress"></span>'+
'<span class="file_name">'+file_name+'</span>'+
'<span class="file_size">'+readableBytes(file_size)+'</span>'+
'<span class="close delete" onclick="javascript:s3_swf_1_object.removeFileFromQueue('+index+');">&nbsp;&nbsp;</span>';
list.appendChild(li);
};

var progressHandler = function(progress_event){

$(".amount").show();
document.getElementById('file_todo_list').firstChild.children[3].style.display = 'none';
  var current_percentage = Math.floor((parseInt(progress_event.bytesLoaded)/parseInt(progress_event.bytesTotal))*100)+'%';
  document.getElementById('file_todo_list').firstChild.firstChild.style.display = 'block';
  document.getElementById('file_todo_list').firstChild.firstChild.style.width = current_percentage;
  document.getElementById('file_todo_list').firstChild.firstChild.firstChild.innerHTML = current_percentage;

  var overall_percentage = Math.floor(((queueBytesLoaded+parseInt(progress_event.bytesLoaded))/queueBytesTotal)*100)+'%';
  document.getElementById('overall').firstChild.style.display = 'block';
  document.getElementById('overall').firstChild.style.width = overall_percentage;
  document.getElementById('overall').firstChild.firstChild.innerHTML = overall_percentage;
$(".amount").innerHTML = overall_percentage;

};


var uploadCompleteHandler = function(upload_options,event){
queueBytesLoaded += parseInt(upload_options.FileSize);

$.ajax({
  url: '/stuffs',
    global:false,
    type: 'POST',
    async: false,
    data: ({
          'authenticity_token' : '<%= form_authenticity_token %>',
      'upload' : {
          'file_file_name' : upload_options.FileName,
              'file_file_size' : upload_options.FileSize,
              'file_content_type' : upload_options.ContentType
      }
  }),
  dataType: 'script'
});













};

var readableBytes = function(bytes) {
var s = ['bytes', 'kb', 'MB', 'GB', 'TB', 'PB'];
var e = Math.floor(Math.log(bytes)/Math.log(1024));
return (bytes/Math.pow(1024, Math.floor(e))).toFixed(2)+" "+s[e];
};


var formatBytes = function (bytes) {
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
};





</script>
<h2>Send Your Files</h2>


<div id="file_lists">
    <table style="margin-bottom:0px;">
        <tbody><tr>
          <td style="vertical-align: middle;">
            <div class="drag-drop-show" style="color:#777777">
          <h2 style="margin-left:65px;margin-top:50px;color:#B7CFDF;font-size:200%;">Drag &amp; Drop Files Here</h2>        
            </div>
          </td>
        </tr>
      </tbody></table>
<ul id="file_todo_list" class="file_list"></ul>
<span class="amount">10%</span>
<div id="overall"><span class="progress"></span><span id="status"></span></div>
</div>

<div id="queue_size"></div>


<%=raw s3_swf_upload_tag(
:fileTypes => '*.*',
:fileTypeDescs => 'All files.',
:onFileNotInQueue => "",
:onFileSizeLimitReached => "alert('That file is too big');",
:onQueueChange => "queueChangeHandler(queue);",
:onQueueSizeLimitReached => "alert('There are too many files in the queue');",
:onQueueEmpty => "alert('You gotta have at least one file in there');",
:onQueueClear => "queueClearHandler(queue);",
:onUploadingStart => "uploadingStartHandler();",
:onUploadingFinish => "uploadingFinishHandler();",
:onSignatureIOError => "alert('There was an error');",
:onSignatureXMLError => "alert('There was an error');",
:onSignatureSecurityError => "alert('There was an error');",
:onUploadError => "alert('There was an error');",
:onUploadIOError => "alert('There was an error');",
:onUploadSecurityError => "alert('There was an error');",
:onUploadProgress => "progressHandler(progress_event);",
:onUploadComplete => "uploadCompleteHandler(upload_options,event);"

) %>

<div>
<input type="submit" id="StartButton" value="Start Uploading" onclick="s3_swf_1_object.startUploading();" />
<input type="submit" id="ResetButton" value="Clear Queue" onclick="s3_swf_1_object.clearQueue();" />
<input type="submit" id="StopButton" value="Stop Uploading" onclick="s3_swf_1_object.stopUploading();" />
</div>


</div>




  
  def destroy
     @stuff=Stuff.find(params[:id])
     @stuff.destroy
     render :json => true    
  end
  

  
  def new
    @stuff = Stuff.new
  end
   
  def create

    @stuff = Stuff.new(params[:stuff])
    @stuff.container_id = params[:container_id]        
    sha1=Digest::SHA1.hexdigest([@stuff.id.to_s,rand].join)
    @stuff.sha1=sha1
  


    @container=Container.find(params[:container_id])
    @container.empty=false
    
    if current_user.priviledge=="1"||current_user.nil?
      @container.exptime=Time.now+14.days
    end
    
      

    if (@container.emails.empty?)
      



      if !(params[:email]=="")
        emails=params[:email].to_s.split(/,/)
        
          for email in emails
          #get sender's name
          sender=params[:sender]
          #get subject if there is any
          subject=params[:subject]
          #get message if there is any
          message=params[:message]
          #send the email
          Notifier.notify(sender,message,sender,email,@stuff.file_file_name).deliver

          #add the email to collection
          a=@container.emails.new(:name=>email)
          a.save
          end
      end


      if(@stuff.notif==true)
        @container.notif=true
      else
        @container.notif=false
      end

      #set number of downloads to 0
      @container.downloaded=0
      @container.name=@stuff.file_file_name
      #get the password
      @container.password=params[:container_password]
        




    end
   



   @container.save






    if current_user
      left=current_user.capacity-current_user.storage
    end


    if(!@stuff.validate_storage_left(params[:stuff],left))
       render :json => { :result => 'error'}, :content_type => 'text/html'
    else    
      if @stuff.save
        reduce_storage(params[:stuff][:file].size)
        render :json =>  [@stuff.to_jq_upload.to_json]
      else
        render :json => { :result => 'error'}, :content_type => 'text/html'
      end
    end
  end

  def index
   
  end

  def show
    
  end




  def reduce_storage(amount)  

    if(current_user)
      current_user.storage = current_user.storage+amount
      current_user.save
    else

    end
      
  end

end
