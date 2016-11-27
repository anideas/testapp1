(function () {

    $(document).delegate("#page-login", "pagebeforecreate", function () {        

        var $LoginPage = $("#page-login"),
            $btnLogin = $("#btn-login", $LoginPage);

        $btnLogin.off("tap").on("tap", function () {
            
            var $ctnErr = $("#ctn-err", $LoginPage),
                $myUserName = $("#my-username", $LoginPage),
                $myPassword = $("#my-password", $LoginPage);

            var userName = $myUserName.val().trim(),
                password = $myPassword.val().trim(),
                invalidInput = false,
                invisibleStyle = "bi-invisible",
                invalidInputStyle = "bi-invalid-input";

            // Reset styles.
            $ctnErr.removeClass().addClass(invisibleStyle);
            $myUserName.removeClass(invalidInputStyle);
            $myPassword.removeClass(invalidInputStyle);

            // Flag each invalid field.
            if (userName.length === 0) {
                $myUserName.addClass(invalidInputStyle);
                invalidInput = true;
            }
            if (password.length === 0) {
                $myPassword.addClass(invalidInputStyle);
                invalidInput = true;
            }

            // Make sure that all the required fields have values.
            if (invalidInput) {
                $ctnErr.html("<p>Please enter userid and password.</p>");
                $ctnErr.addClass("bi-ctn-err").slideDown();
                return;
            }


            $.ajax({
                type: 'POST',
                url: asm.Settings.signUpUrl,
				//todo: should pass data  as jason.. 
                data:"username=" + userName + "&password=" + password,

                success: function (resp) {
                    console.log("success-login");
                    console.log(resp);
                    // ***** SESSION MANAGEMENT NEEDED *****
					// todo: raja: should read the token and store it etc.
					// ***** SESSION MANAGEMENT NEEDED *****
                    if (resp.token.length > 0 ) {
                        $.mobile.navigate("dashboard.html");
                        return;
                    }
                    // ********************
                    // handle errors
                    // ********************
                   /* if (resp.extras.msg) {
                        switch (resp.extras.msg) {
                            case asm.ApiMessages.DB_ERROR:
                            case asm.ApiMessages.COULD_NOT_CREATE_USER:
                                // TODO: Use a friendlier error message below.
                                $ctnErr.html("<p>Oops! asm had a problem and could not register you.  Please try again in a few minutes.</p>");
                                $ctnErr.addClass("bi-ctn-err").slideDown();
                                break;
                            case asm.ApiMessages.EMAIL_ALREADY_EXISTS:
                                $ctnErr.html("<p>The email address that you provided is already registered.</p>");
                                $ctnErr.addClass("bi-ctn-err").slideDown();
                                $txtEmailAddress.addClass(invalidInputStyle);
                                break;
                        }
                    }*/
                    
                },
                error: function (e) {
                    console.log(e.message);
                    // TODO: Use a friendlier error message below.
                    $ctnErr.html("<p>Oops! asm had a problem and could not register you.  Please try again in a few minutes.</p>");
                    $ctnErr.addClass("bi-ctn-err").slideDown();
                }
            });
        });
    });
})();