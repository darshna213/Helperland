  var pwd = document.getElementById("reset-password");
        var conf = document.getElementById("reset-confirm-password");
        var submit = document.getElementById("reset-password-btn");
        var re_pwd_message = document.getElementById("confirm-password-message");
        conf.addEventListener("change", function () {
            if (pwd.value != conf.value) {
                submit.disabled = true;
                re_pwd_message.textContent = "password does not matched!"
            }
            else {
                submit.disabled = false;
            }
        });