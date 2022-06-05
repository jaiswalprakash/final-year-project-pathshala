function totalVideo(){
    $.get("/topic/totalVideo",
    function (data) {
       if (data) {
          $("#video").val(data);
       }
       else {
          alert(error);
          $("#video").val(0);
       }
    });   
}

function totalStudent(){
    $.get("/student/totalStudent",
    function (data) {
       if (data) {
          $("#student").val(data);
       }
       else {
          alert(error);
          $("#student").val(0);
       }
    });   
}

function totalInstructor(){
    $.get("/teacher/totalInstructor",
    function (data) {
       if (data) {
          $("#Instructor").val(data);
       }
       else {
          alert(error);
          $("#Instructor").val(0);
       }
    });   
}