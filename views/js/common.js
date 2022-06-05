
$(document).ready(function () {
    $("#userName").html(" HELLO ! " + localStorage.getItem('name'));
});

function getLoggedInData(){
  if( JSON.parse(localStorage.getItem('name'))){
      
      let data=JSON.parse(localStorage.getItem('user'));
      return data;

  }
}

function logout() {
    localStorage.clear();
    window.location.href = '/';
}
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}
//--------- get branch list-----------------//
function getBranchList() {
    $.get("/branch/getBranchList",
      function (data, status) {
        console.log(data);
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


 //------------ snackbar------------------------//


 