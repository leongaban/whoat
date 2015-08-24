<div class="verify_container">
    
    <div class="verify_widget">

        <div class="center_logo">
            <a href="/" title="Who@"><div class="whoat_logo_svg"></div></a>
        </div>

        <div class="verify_box">

            <h1>Please Verify Your Email</h1>
            <h2>(${username})</h2>

            <button class="btn orange_button" title="sent verify email to ${username}">resend verification email</button>

            <p>After you verify click continue:</p>

            <button class="btn blue_continue">continue</button>

        </div>

        <div class="verify_logout">logout</div>
    </div>

</div>

<script>
    $('.orange_button').unbind('click').bind('click', function() {

        var theBtn = $(this);
        $(theBtn).css('cursor','auto');
        $(theBtn).css('background','#ccc');
        $(theBtn).text('email sent');
        $(theBtn).attr("disabled", "true");

        WHOAT.networking.postToServerWithAjax('/resend/verify', null, function (response) {

            if (response.result === 'success') {
                $('h3').empty();
                $('h3').append("Check your email, then click the verify link.");
                $('.verify_box').css('height', '260px');
                $('h3').fadeIn('fast');

            } else if (response.result === 'error') {
                //
            }
        });
    });

    $('.blue_continue').unbind('click').bind('click', function() {
        location.reload();
    });

    $('.verify_logout').bind('click', function () {
        WHOAT.networking.redirectToURL('/logout');
    });
</script>