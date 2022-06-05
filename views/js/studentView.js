$(document).ready(function () {
  getTopic_Branch();
  recentAdded();
  $("#branchName").html(localStorage.getItem('branch') + "_Branch Video"); // span
  localStorage.setItem('searchText', " ");
 });
//------------debounce function -------------------------------------//

const debounce =function(fn,delay){
  let timer;
  return function(...args){
      clearTimeout(timer);
      timer =setTimeout(()=>{
          fn(...args);
      },delay)
  }
}
//---------------------------------------------------------------------//

function play(value) {
  var topic_id = value;
  localStorage.setItem("topic_id", topic_id + "");
  var userId = localStorage.getItem("userId");

  var view = {
    topic_id: topic_id,
    userId: userId,
  };
  $.post("/topic/view", view, function (data, status) {
    if (data) {
      localStorage.setItem("_id", topic_id);
      setTimeout(() => {
        window.location.href = "videoPlayer.html";
      }, 1000);
     
    } else {
    }
  });
}



const searchVideo =debounce(() =>{
  var searchText = $("#searchText").val();
  if (searchText == null || searchText == "") {

    return false;
  }
  else {
    localStorage.setItem('searchText', searchText);
    $("#searchText").val("");
    window.location.href = 'view.html';
  }
},1500);



function teacherInfo(value) {
  let teacherInfoId = value;
  localStorage.setItem('teacherInfoId', teacherInfoId + "");
  window.location.href = '../instructor/teacherProfile.html', true;

}
// ---------- shuffle video  array ----------//

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
// ------------getTopic_Branch--------------//

function getTopic_Branch() {
  var branchId = localStorage.getItem('branch_id')
  $.get("/topic/getTopic_Branch/" + branchId,
    function (data, status) {

      if (data.code && data.code.length > 0) {
        shuffle(data.code);
        data.code.map(o => {
          $('#getTopic_Branch').append(`  <div class="col-sm-3 my-3">
        <div class="card uploadImage" style="width: 90%; height: 95%; box-shadow: 0 5px 8px 0 rgba(0, 0, 0,
        0.2),
        0 9px 26px 0 rgba(0, 0, 0, 0.19);">
          <img class="card-img-top " height="150px" src="${o.imageUrl}" alt="Card image cap" onclick="play('${o._id}')">
          <div class="card-body" style="height: 225px; overflow-x: auto;">
            <h5 class="card-title" style="color:brown">${o.title}</h5>
            <p class="card-text ">${o.branchId.branchName},${o.semesterId.semesterName},${o.subjectId.subjectName}</p>
            <a onclick="teacherInfo('${o.teacherId._id}')" ><b class="font-weight-bold text-danger card-text ">Instructor:</b>${o.teacherId.name}</a>
          </div>
         
        </div>
      </div>`);
        })



      }
    })
}

function recentAdded() {
  
  $.get("/topic/recentAdded/",
    function (data, status) {
      if (data.code && data.code.length > 0) {
        // shuffle(data.code);
        data.code.map(o => {
          $('#recentAdded').append(`  <div class="col-sm-3 my-3">
        <div class="card uploadImage" style="width: 90%; height: 95%; box-shadow: 0 5px 8px 0 rgba(0, 0, 0,
        0.2),
        0 9px 26px 0 rgba(0, 0, 0, 0.19);">
        
          <img class="card-img-top " height="150px" src="${o.imageUrl}" alt="Card image cap" onclick="play('${o._id}')">
          <div class="card-body" style="height: 225px; overflow-x: auto;">
            <h5 class="card-title" style="color:brown">${o.title}</h5>
            <p class="card-text ">${o.branchId.branchName},${o.semesterId.semesterName},${o.subjectId.subjectName}</p>
            <a onclick="teacherInfo('${o.teacherId._id}')" ><b class="font-weight-bold text-danger card-text ">Instructor:</b>${o.teacherId.name}</a>
          </div>
         
        </div>
      </div>`);
        })
      }
    })
}





function topicList() {
  window.location.href = ""
}

{/* <div class="card-footer text-muted">
<a class="btn btn-danger" href="#" onclick="play('${o._id}')"><i class="fas fa-play-circle"> play</i></a>
</div> */}
