

document.getElementById("reset-password-btn").addEventListener("click", () => {
    //var data = {}
    var userid = $("#resetId").val();
    var newPass = $("#reset-password").val();
    var confPass = $("#reset-confirm-password").val();
    if (newPass == confPass) {
        var model = {
            UserId: userid,
            NewPassword: newPass,

        };
        alert(userid + newPass);
        $.ajax(
            {
                type: 'POST',
                url: '/Account/Resetpasswod',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                data: model,
                success:
                    function (response) {
                        alert("reset-success")
                    },
                error:
                    function (response) {
                        console.error(response);
                        alert("reset-error");
                    }
            });
    }
    else {
        alert("confirm password not matched")
    }
});
