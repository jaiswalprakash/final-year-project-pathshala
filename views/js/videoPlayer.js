$(document).ready(function () {
  getTopicDetail();
  //Recommended_video();
});

//------------ snackbar------------------------//
function snackbar() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2500);
}

var video_id = "";


//------------ postComment------------------------//

function postComment() {
  var topic_id = video_id;
  var user_id = localStorage.getItem("userId");
  var comment = $("#comment").val();

  var postComment = {
    topic_id: topic_id,
    user_id: user_id,
    comment: comment,
  };
  if(!postComment.topic_id || !postComment.user_id || !postComment.comment ){  
    document.getElementById("snackbar").innerHTML="Empty Field";
    snackbar();  
    return false;
  }
  else{
  $.post("/topic/postComment", postComment, function (data, status) {
    if (data.status===201) {
      document.getElementById("snackbar").innerHTML=data.message;
      snackbar();
      setTimeout(() => {
        location.reload()
      }, 1000);
      $("#comment").val("");
    } else {
      document.getElementById("snackbar").innerHTML=data.message;
      snackbar();
    }
  });
}
}

//------------ commentreply------------------------//
function commentreply(value){
  var comment_id=value
  var topic_id = video_id;
  var user_name = localStorage.getItem("name");
  var replycomment = $("#replycomment").val();
  var commentreply = {
    topic_id: topic_id,
    user_name: user_name,
    comment_id:comment_id,
    comment: replycomment,
  };
  console.log("commentreply",commentreply);
  if(!commentreply.topic_id || !commentreply.user_name || !commentreply.comment || !commentreply.comment_id ){  
    document.getElementById("snackbar").innerHTML="Empty Field";
    snackbar();  
    return false;
  }
  else{
  $.post("/topic/commentReply", commentreply, function (data, status) {
    if (data.status===201) {
      document.getElementById("snackbar").innerHTML=data.message;
      snackbar();
      setTimeout(() => {
        location.reload()
      }, 1000);
      $("#comment").val("");
    } else {
      document.getElementById("snackbar").innerHTML=data.message;
      snackbar();
    }
  });
}

}


function getTopicDetail() {
  var getTopicDetail = {
    _id: localStorage.getItem("_id"),
  };
  
  $.post("/topic/getTopicDetail", getTopicDetail, function (data, status) {
    console.log("getTopicDetail",data);
    if (data) {
      $("#videoUrl").html(
        `<source src="${data.code[0].videoUrl}" type="video/mp4">`
      );
      $("#title").html(data.code[0].title); // span
      $("#UploadedDate").html(data.code[0].UploadedDate); //span
      $("#documentUrl").attr("href", data.code[0].documentUrl); // href
      $("#description").append(data.code[0].description); // paragraph
      $("#like").text(data.code[0].liked.length);
      $("#dislike").text(data.code[0].disliked.length);

      localStorage.setItem("subject_id", data.code[0].subjectId._id + "");
      let view = data.code[0].viewed;
      console.log("view",view);
      $("#view").html(view.length); // span
      video_id = data.code[0]._id;
      var comment = data.code[0].comments;
      console.log("comment array ",comment)
      comment.reverse()
      comment.map((o) => {
      $("#getComment2").append(`<hr> 
      <div>
        <img src="./images/user.png" alt="user" style="width:60px;  border-radius: 50%; float:left; margin-right:10px">
        <div class="media-body">
          <h4>${o.userId.name}<small><i style="color:red"> Posted on ${o.date}</i></small></h4>
          <p style="text-align: left; color:purple">${o.text}</p>
        </div> 
      </div>
       <hr>`);
      //  <textarea class="form-control" rows="2" id="replycomment"></textarea>
      //  <br>
      //  <button class="btn btn-info" onclick="commentreply('${o._id}')">Reply</button>
      //  <div id="replySection" ></div>
      //  ${ o.reply.map((r)=>{
      //    $("#replySection").append(`
      //    <div  class="ml-5">
      //      <h4>${r.userName}<small><i style="color:red"> Replyed on ${r.date}</i></small></h4>
      //      <p style="text-align: left; color:purple">${r.text}</p>
      //    </div>
      //     <br>`)
      //  })}
      });
      Recommended_video();
    } else {
    }
  });
  // Recommended_video();
}





//--------------------this is for recommended video to play-------------------------//
function play(value) {
  var topic_id = value;
  localStorage.setItem("topic_id", topic_id + "");
  var userId = localStorage.getItem("userId");

  var view = {
    topic_id: topic_id,
    userId: userId,
  };
  $.post("/topic/view", view, function (data, status) {
    if (data.status===201) {
      localStorage.setItem("_id", topic_id);
      window.location.href = "videoPlayer.html";
    } else {
    }
  });
}
// ---------- shuffle video  array ----------//

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
// ---------- Recommended video ----------//

function Recommended_video() {
  var Recommended = {
    subjectId: localStorage.getItem("subject_id"),
  };
  $.post("/topic/Recommended_video", Recommended, function (data, status) {
    if (data.code && data.code.length > 0) {
      shuffle(data.code);
      data.code.map((o) => {
        $("#Recommended_video").append(`
            <div class="col-sm-12" style=" margin-right:0 px;margin-top: 5px; margin-bottom: 10px;" >
              <img
                  src="${o.imageUrl}"
                  alt="Recomended video "
                  style="width: 300px; height: 200px;"
                  onclick="play('${o._id}')"
                  class="pointer"
                   />
              <br>
              <!-- image details -->
                        
              <span style="font-size: large; color: firebrick; text-align: left;"  >${o.title}
              </span ><br>
              <span> ${o.branchId.branchName}, </span> 
              <span> ${o.semesterId.semesterName},</span>
              <span> ${o.subjectId.subjectName}</span><br />
              <span style="font-size:15px; color: brown;">Instructor :-</span> <span style="font-size: 15px; color: black;">${o.teacherId.name} </span><br>
              </div>
              </div>
            `);
      });
    } else {
    }
  });
}

// ----------------- for liking the video-----------------//

function like() {
  var userId = localStorage.getItem("userId");
  var like = {
    topic_id: video_id,
    userId: userId,
  };
  if(!like.topic_id || !like.userId){  
    document.getElementById("snackbar").innerHTML="Empty Field";
    snackbar();  
    return false;
  }
  else{
  $.post("/topic/like", like, function (data, status) {
    if (data.status==201) {
      document.getElementById("snackbar").innerHTML=data.message;
      snackbar();
      setTimeout(() => {
        location.reload()
      }, 1000);
      $("#like").text(data[0].liked.length);
    } else {
      document.getElementById("snackbar").innerHTML=data.message;
      snackbar();
    }
  });
 }
}
// ----------------- for disliking the video-----------------//
function dislike() {
  var userId = localStorage.getItem("userId");
  var dislike = {
    topic_id: video_id,
    userId: userId,
  };
  $.post("/topic/dislike", dislike, function (data, status) {
    if (data.status==201) {
      document.getElementById("snackbar").innerHTML=data.message;
      snackbar();
      setTimeout(() => {
        location.reload()
      }, 1000);
    } else {
      document.getElementById("snackbar").innerHTML=data.message;
      snackbar();
    }
  });
}
function searchVideo() {
  var searchText = $("#searchText").val();
  if (searchText == null || searchText == "") {
    return false;
  } else {
    localStorage.setItem("searchText", searchText);
    window.location.href = "view.html";
  }
}
// ----------------- for wishlist the video-----------------//

function wishList() {
  var userId = localStorage.getItem("userId");
  var topicId = localStorage.getItem("topic_id");
  var wishlist = {
    userId: userId,
    topicId: topicId,
  };
  $.post("/user/wishlist", wishlist, function (data, status) {
    if (data) {
    } else {
    }
  });
}

function getWishList() {
  var userId = localStorage.getItem("userId");
  $.get("user/getWishlist" + userId),
    function (data, status) {
      if (data) {
      } else {
      }
    };
}

