// onload function //
$(document).ready(function () {
  getTopicList();

})

//------------ snackbar------------------------//
function snackbar() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2500);
}


//function to remove all the document when user click on remove button //
function removeTopic( topic_id,documentUrl,videoUrl,imageUrl){
  var topic_id=topic_id;
  var documentUrl=documentUrl;
  var videoUrl=videoUrl;
  var imageUrl=imageUrl;
  var removeTopic ={
    topic_id:topic_id,
    documentUrl:documentUrl,
    videoUrl:videoUrl,
    imageUrl:imageUrl
  }
  //console.log(removeTopic);
  $.post('/topic/removeTopic',
  removeTopic,function(data,status){
    if(data.status===200){
      document.getElementById("snackbar").innerHTML=data.message;
      snackbar();
      setTimeout(() => {
        location.reload()
      }, 2000);
    }
    else{
      document.getElementById("snackbar").innerHTML=data.message;
      snackbar();
    }

  })

}



// function to go to upload page when user click on upload button//
function uploadPage() {
  window.location.href = 'uploadForm.html';
}


// function to play the video when teacher click on play button//
function play(value) {

  var _id = value;
  localStorage.setItem('_id', _id);
  window.location.href = '../../videoPlayer.html';
}


// function to get all the video uploaded by teacher //
function getTopicList() {
  var teacherId = localStorage.getItem('teacherId')

  var getTopicList = {
    teacherId: teacherId
  }
  $.post("/topic/getTopicList",
    getTopicList,
    function (data, status) {
      console.log("getTopicList",data)
      if (data.code && data.code.length > 0) {
        data.code.map(o => {
          $('#topicList').append(`<div class="col-sm-3 my-3">
                <div class="card uploadImage" style="width: 90%; height: 95%; box-shadow: 0 5px 8px 0 rgba(0, 0, 0,
                  0.2),
                  0 9px 26px 0 rgba(0, 0, 0, 0.19);">
                  
                    <img class="card-img-top " height="175px" src="${o.imageUrl}" alt="Card image cap" onclick="play('${o._id}')">
                    <div class="card-body" style="height: 180px; overflow-x: auto;">
                      <h5 class="card-title" style="color:brown">${o.title}</h5>
                      <p class="card-text ">${o.branchId.branchName},${o.semesterId.semesterName},${o.subjectId.subjectName}</p>
                    </div>
                  <div class="card-footer text-muted">
                    <a class="btn btn-danger" href="#" onclick="play('${o._id}')"><i class="fas fa-play-circle"> play</i></a>
                    <a class="btn btn-info" href="#" style="border-radius: 30px;" onclick="removeTopic('${o._id}','${o.documentUrl}','${o.videoUrl}','${o.imageUrl}')"><i class="fas fa-trash" > Remove</i></a>
                  </div>
                </div>
              </div> `);

        });
      }
      else {

      }

    })
}


