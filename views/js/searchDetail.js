
$(document).ready(function () {
    search2();
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
    localStorage.setItem('topic_id', topic_id + "")
    var userId = localStorage.getItem('userId');

    var view = {
        topic_id: topic_id,
        userId: userId
    }
    $.post("/topic/view",
        view,
        function (data, status) {
            if (data) {
                localStorage.setItem('_id', topic_id);
                window.location.href = 'videoPlayer.html';
            }
            else {

            }
        }
    )
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
  
  

function search2() {
    var searchText = localStorage.getItem('searchText');
    $.get("/topic/search/" + searchText, function (data, status) {
        if (data) {
            console.log(data);
            $("#search_number").html(data.code.length +' '+ "Result Found " ); // span
            data.code.map(o => {
            $('#searchResult').append(`  <div class="col-sm-3 my-3">
            <div class="card uploadImage" style="width: 90%; height: 95%; box-shadow: 0 5px 8px 0 rgba(0, 0, 0,
            0.2),
            0 9px 26px 0 rgba(0, 0, 0, 0.19);">
            
              <img class="card-img-top " height="150px" src="${o.imageUrl}" alt="Card image cap" onclick="play('${o._id}')">
              <div class="card-body" style="height: 225px; overflow-x: auto;">
                <h5 class="card-title">${o.title}</h5>
                <p class="card-text ">${o.branchId.branchName},${o.semesterId.semesterName},${o.subjectId.subjectName}</p>
                <p onclick="teacherInfo('${o.teacherId._id}')" ><b class="font-weight-bold text-danger card-text ">Instructor:</b>${o.teacherId.name}</p>
              </div>
             
            </div>
          </div>`);
            });
        }
        else { }
    })
}