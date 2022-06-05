var semId = '';
var branchId = '';
var videoUrl = '';
var imageUrl = '';
var documentUrl = '';

function fun1(value, type) {
    if (type == "SEMID") {
        semId = value;
    }
    else {
        branchId = value;
    }
    if (semId && branchId) {
        var getSubject = {
            branch_id: branchId,
            semester_id: semId
        }
        $.post("/subject/getSubjectList",
            getSubject,
            function (data, status) {
                $('#subjectLst').append('<option value= "" hidden ></option>')
                console.log('subjectLst-->', data,status);
                if (data.code && data.code.length > 0) {
                    $('#subjectLst').empty();
                    data.code.map(o => {
                        $('#subjectLst').append(`<option value= ${o._id} >${o.subjectName}</option>`);
                    });
                } else {
                    $('#subjectLst').empty();
                }

            });

    }
}
//-------------fileUpload-----------------//
function fileUpload(event, value) {
    // if (event.size > 500) {
    //     return;
    // }
    console.log(event);
    let formData = new FormData();
    formData.append('file', event.files[0]);
    $.ajax({
        type: "POST",
        url: '/fileUpload',
        processData: false,
        contentType: false,
        data: formData,
        success: function (data) {
            console.log("success", data.path)

            if (value == 'VID') {
                let url = data.path;
                videoUrl = url.slice(5);

                console.log('video--', videoUrl)
            }
            else if (value == 'IMG') {
                let url = data.path;
                imageUrl = url.slice(5);
                console.log('image--', imageUrl);
            }
            else {
                let url = data.path;
                documentUrl = url.slice(5);
                console.log('document--', documentUrl);
            }
        }

    })

}


//------------ snackbar------------------------//
function snackbar() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 2500);
}

function upload() {
    var branch = $("#branchLst").val();
    var semester = $("#semesterLst").val();
    var subject = $("#subjectLst").val();
    var title = $("#title").val();
    var description = $("#description").val();
    var uploadData = {
        
        branch_id: branch,
        semester_id: semester,
        subject_id: subject,
        video_Url: videoUrl,
        image_Url: imageUrl,
        document_Url: documentUrl,
        title: title,
        description: description,
        teacherId:localStorage.getItem('teacherId')
    }
    console.log(JSON.stringify(uploadData));
    $.post("/topic/insertDocument",
        uploadData,
        function (data, status) {
            console.log("data",data);
            if (data.status==201) {
                console.log(data.meaasge);
                document.getElementById("snackbar").innerHTML=data.message;
                snackbar();
                setTimeout(() => {
                    window.location.href = 'instructor1.html';
                }, 1500);
               
            }
            else {
                document.getElementById("snackbar").innerHTML=data.message;
                snackbar();
            }
        }
    )


}
