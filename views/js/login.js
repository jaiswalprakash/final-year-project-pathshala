
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

//------------modalFade-------------------------------------//


function modalFade() {
   $('#student_login').modal('hide');
   $('#student_signUp').modal('hide');
   $('#teacher_login').modal('hide');
   $('#teacher_signUp').modal('hide');

}
 
//------------ snackbar------------------------//
function snackbar() {
   var x = document.getElementById("snackbar");
   x.className = "show";
   setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2500);
 }

//------------------------ logIn --------------------------//

const logIn =debounce(() =>{

   var email = $("#email").val();
   var password = $("#pwd").val();

   var logIn = {email,password}

   if(!logIn.email || !logIn.password){  
      document.getElementById("snackbar").innerHTML="All Field are Required";
      snackbar();  
   }
   else{
   $.post("/user/login",
      logIn,
      function (data, status) {
         if (data && data.code.role == 'STUDENT') {
            document.getElementById("snackbar").innerHTML=data.message;
            snackbar();
             localStorage.setItem('userId', data.code.userId);      
             localStorage.setItem('name', data.code.name);
             localStorage.setItem('branch', data.code.branchName);
             localStorage.setItem('branch_id', data.code.branchId+ "")
             setTimeout(()=>{
               window.location.href = 'studentView.html';
             },1000)
            return
         }
         else if (data && data.code.role == 'TEACHER') {
            document.getElementById("snackbar").innerHTML=data.message;
            snackbar();
                  localStorage.setItem('userId', data.code.userId);      
                  localStorage.setItem('name', data.code.name);
                  localStorage.setItem('teacherId', data.code.teacherId + "");
                  setTimeout(()=>{
                     window.location.href = '../instructor/instructor1.html', true;
                  },1000)
            return;
         }
         else {
            document.getElementById("snackbar").innerHTML=data.message;
            snackbar();
            return;
         }
      });
}
},1000);

//--------- forgot-----------------------------//


function forgotPassword() {
   var email = $("#emailF").val();
   var forgotPassword = {
      email: email,
   }
   console.log(JSON.stringify(forgotPassword));
   if (!forgotPassword.email ) {
      document.getElementById("snackbar").innerHTML="Enter Email";
      snackbar(); 
      return;
   }
   else {
      $.post("/user/forgot",
         forgotPassword,
         function (data) {
            if(data.status ===200){
               $("#emailF").val('');
               $('#forgotPassword').modal('hide');
               document.getElementById("snackbar").innerHTML=data.message;
               snackbar();
            }
            else{
               document.getElementById("snackbar").innerHTML=data.message;
               snackbar();
            }
            })  
   }
}


//----reset password----//

function recoverPassword() {
   var newPassword = $("#nPwd").val();
   var otp = $("#otp").val();
   var resetPassword = {
      otp: otp,
      newPassword: newPassword
   }
   console.log(JSON.stringify(resetPassword));
   if (!resetPassword.otp || !resetPassword.newPassword) {
      document.getElementById("snackbar").innerHTML="All Field are Required";
      snackbar(); 
      return;
   }
   else {
      $.post("/user/updatePassword",
         resetPassword,
         function (data) {
            if (data.status ===200 ) {
               document.getElementById("snackbar").innerHTML=data.message;
               snackbar();
            }
            else {
               document.getElementById("snackbar").innerHTML=data.message;
               snackbar();
            }
            $("#nPwd").val('');
            $("#otp").val('');
            $('#recoverPassword').modal('hide');

         });
   }
}


