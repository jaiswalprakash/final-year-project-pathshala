$(document).ready(function () {
  teacherInfo();
});

function play(value) {
  var topic_id = value;
  var userId = localStorage.getItem('userId');
  localStorage.setItem('topic_id', topic_id + "")

  var view = {
    topic_id: topic_id,
    userId: userId
  }
  $.post("/topic/view",
    view,
    function (data, status) {
      if (data) {
        localStorage.setItem('_id', topic_id);
        window.location.href = '../../videoPlayer.html', true;
      }
      else {

      }
    }
  )
}

function teacherInfo() {
  var teacherInfoId = localStorage.getItem('teacherInfoId');

  $.get("/teacher/teacherInfo/" + teacherInfoId,
    function (data, status) {
      if (data.code) {
        $("#teacherName").html(data.code[0].name);//span
        $("#designation").append(data.code[0].designation);
        $("#email").append(data.code[0].userId.email);
        $("#description").append(data.code[0].description); // paragraph



        var getTopicList = {
          teacherId: teacherInfoId
        }
        $.post("/topic/getTopicList",
          getTopicList,
          function (data, status) {
            // console.log("getTopicList",data);
            if (data.code && data.code.length > 0) {
              $("#videoNumber").html(' My Cources ' + data.length);//span
              data.code.map(o => { 
              $('#topicList').append(`<div class="col-sm-3 my-1">
              <div class="card uploadImage" style="width: 100%;  box-shadow: 0 5px 8px 0 rgba(0, 0, 0,
              0.2),
              0 9px 26px 0 rgba(0, 0, 0, 0.19); ">
                <img class="card-img-top " height="175px" src="${o.imageUrl}" alt="Card image cap" onclick="play('${o._id}')">
                
                <div class="card-body"  style="height:175px; overflow-x:auto" >
                  <h5 class="card-title " style="color:brown">${o.title} </h5>
                  <p class="card-text">${o.branchId.branchName},${o.semesterId.semesterName},${o.subjectId.subjectName}</p>
                 
                </div>
              
              </div>
            </div> `);
           

               


              });
            }
            else {

            }

          })
      }

    }

  )
}

{/* <p><b class="font-weight-bold text-danger">Instructor:</b> SAHIL SINGH</p>

$('#topicList').append(`<div class="col-sm-3 uploadImage ">
<img src="${o.imageUrl}" alt=""style="width:250px;height:200px;" onclick="play('${o._id}')" class="pointer"><br>
<span style="font-size:20px; color: brown;" > ${o.title} </span><br>
<span style="font-size:15px; color:  black;"> ${o.branchId.branchName} </span> 
<span style="font-size: 15px; color: black;">${o.semesterId.semesterName} </span>
<span style="font-size: 15px; color: black;">${o.subjectId.subjectName} </span><br>
</div> `); */}