'use strict';

function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
};

jQuery(function () {
    jQuery('input[type="tel"]').on('input', function () {
        var val = jQuery(this).val().replace(/[^0-9() +-]/, '');
        jQuery(this).val(val);
    });

    jQuery('#js-kontakt-submit').click(function() {
        var name = jQuery('input[name="name"]').val();
        var email = jQuery('input[name="email"]').val();
        var phone = jQuery('input[name="phone"]').val();


        if (!name || !email || !phone)
        {
            jQuery('#kontakt-form-message').show();
            jQuery('#kontakt-form-message').html('<font color="red">Error empty field(s)</font>');
            return false;
        }

        if (!isValidEmailAddress(email))
        {
            jQuery('#kontakt-form-message').show();
            jQuery('#kontakt-form-message').html('<font color="red">Incorrect email!</font>');
            return false;
        }

        jQuery.post('assets/action.php', jQuery('form[name="kontakt-form"]').serialize(), function(data) {
            if (data == 'OK')
            {
                jQuery('form[name="kontakt-form"]').reset();
                jQuery('#kontakt-form-message').show();
                jQuery('#kontakt-form-message').html('<font color="red">Your message has been sent. Thank you!</font>');

                setTimeout(function () {
                    jQuery('#kontakt-form-message').empty().hide();
                }, 5000);
            } else {
                jQuery('#kontakt-form-message').show();
                jQuery('#kontakt-form-message').html('<font color="red"><i>'+data+'</i></font>');
            }
            return false;
        });
        return false;
    });
});
