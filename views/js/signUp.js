//------------ document.ready function---------------------//

$(document).ready(function () {
  getBranchList();
  getSemesterList();
})


//------------ snackbar------------------------//
function snackbar() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2500);
}
//-----------------studentSignUp-----------------------//
function studentSignUp() {
  var name = $("#nameSS").val();
  var email = $("#emailSS").val();
  var phone = $("#phoneSS").val();
  var password = $("#pwdSS").val();
  var usn = $("#usnSS").val();
  var branch = $('#branchLst').val();
  var signUp = {
    name: name,
    email: email,
    password: password,
    phone: phone,
    usn: usn,
    branch: branch
  }

  if(!signUp.name || !signUp.email || !signUp.password || !signUp.usn || !signUp.branch||!signUp.phone){  
    document.getElementById("snackbar").innerHTML="All fields required";
    snackbar();  
    return false;
  }
  else {
    $.post("/student/signUp",
      signUp,
      function (data) {
        console.log("data-signUp",data);
        if (data.status === 201) {
          console.log("message",data.message);
          document.getElementById("snackbar").innerHTML=data.message;
          snackbar();
          setTimeout(() => {
            window.location.href = '/#log';
          }, 2000)
        }
        else {
          document.getElementById("snackbar").innerHTML=data.message;
          snackbar();
        }
      });
  }
}
//-----------------teacherSignUp-----------------------//

function teacherSignUp() {
  $('#teacher_login').modal('hide');
  var name = $("#nameTS").val();
  var email = $("#emailTS").val();
  var phone = $("#phoneTS").val();
  var password = $("#pwdTS").val();
  var designation = $("#Designation").val();
  var description = $("#description").val();

  var signUp = {
    name: name,
    email: email,
    password: password,
    phone: phone,
    designation: designation,
    description: description 
  }
  if(!signUp.name || !signUp.email || !signUp.password || !signUp.designation ||!signUp.phone){  
    document.getElementById("snackbar").innerHTML="All fields required";
    snackbar();  
    return false;
  }
  else {
    console.log(JSON.stringify(signUp));
    $.post("/teacher/signup",
      signUp,
      function (data, status) {
        if (data.status === 201) {
          document.getElementById("snackbar").innerHTML=data.message;
          snackbar();
          setTimeout(() => {
            window.location.href = '/#log';
          }, 2000)
        }
        else {
          document.getElementById("snackbar").innerHTML=data.message;
          snackbar();
        }
      });
  }
}
//--------- get branch list-----------------//
function getBranchList() {
  $.get("/branch/getBranchList",
    function (data, status) {
      $('#branchLst').append('<option value= "" hidden >select branch</option>')
      data.code.map(o => {
        $('#branchLst').append(`<option value= ${o._id} >${o.branchName}</option>`);
      });
    }
  )
};
//--------- get semester list-----------------//
function getSemesterList() {
  $.get("/semester/getSemesterList",
    function (data, status) {
      $('#semesterLst').append('<option value= "" hidden >select semester</option>')
      data.code.map(o => {
        $('#semesterLst').append(`<option value= ${o._id} >${o.semesterName}</option>`);
      });

    }
  )
}

//--------- get subject list-----------------//







