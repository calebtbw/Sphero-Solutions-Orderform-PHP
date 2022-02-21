$(document).ready(function () {
    function wsdispayerror(error = '') {
        $('#wserrormessage').text(error);
        $('.wsformerrors').slideDown(500);
        var position = $(".wsorder-box").position();
        scroll(0, position.top);
    }

    function wsreseterror() {
        $('.wsformerrors').hide();
    }

    function wshidesteps() {
        $('.wssteparea').slideUp(500);
    }


    function wsshowstep(step = '') {
        $('.wsstep' + step).slideDown(900);
    }
    function wsshowsteparea(step = '') {
        $('.wssteparea' + step).slideDown(900);
    }
    function wshidestep(step = '') {
        $('.wsstep' + step).slideUp(500);
    }
    function wshidesteparea(step = '') {
        $('.wssteparea' + step).slideUp(500);
    }
    function wshidesteps1(step = '') {
        $('.wsstep' + (parseInt(step) + 1)).slideUp(500);
        $('.wsstep' + (parseInt(step) + 2)).slideUp(500);
        $('.wsstep' + (parseInt(step) + 3)).slideUp(500);
        $('.wsstep' + (parseInt(step) + 4)).slideUp(500);
        $('.wsstep' + (parseInt(step) + 5)).slideUp(500);
        $('.wssteparea' + (parseInt(step) + 1)).slideUp(500);
        $('.wssteparea' + (parseInt(step) + 2)).slideUp(500);
        $('.wssteparea' + (parseInt(step) + 3)).slideUp(500);
        $('.wssteparea' + (parseInt(step) + 4)).slideUp(500);
        $('.wssteparea' + (parseInt(step) + 5)).slideUp(500);
    }

    $('.wschangefirststep').click(function () {
        wsreseterror();
        wshidesteps();
        $('.wssteps').hide();
        wsshowsteparea('1');
    });
    $('.wschange2step').click(function (e) {
        wsreseterror();
        wshidesteps1('2');
        wshidestep('2');
        wshidesteparea('3');
        wsshowsteparea('2');
    });
    $('.wschange3step').click(function () {
        wsreseterror();
        wshidesteps1('3');
        wshidestep('3');
        wshidesteparea('4');
        wsshowsteparea('3');
    });
    $('.wschange4step').click(function () {
        wsreseterror();
        wshidesteps1('4');

        wshidestep('4');
        wshidesteparea('5');
        wsshowsteparea('4');
    });
    $('.wschange5step').click(function () {
        wsreseterror();
        wshidesteps1('5');
        wshidestep('5');
        wshidesteparea('6');
        wsshowsteparea('5');
    });
    $('.serveropsib').click(function (e) {
        $('#selectedserverid').val($(this).data('id'));
        wsreseterror();
        wshidesteps();
        $('#wstypemethod').text($(this).data('name'));
        wsshowstep('2');
        wsshowsteparea('3');
    });
    $('.wstypeselector').click(function (e) {
        $('.wsserverssubs').slideUp(500);
        if ($(this).data('havesub') !== '') {
            $('.datasubitems' + $(this).data('havesub')).slideDown(500);
            e.preventDefault();
            return false;
        } else {
            $('#selectedserverid').val($(this).data('servertype'));
            $(this).addClass('wsselectedproduct');
            wsreseterror();
            wshidesteps();
            $('#wstypemethod').text($(this).data('title'));
            wsshowstep('2');
            wsshowsteparea('3');
        }
    });
    $('.opnextbutton').click(function (e) {
        if ($('.wsoptionactive').length > 0) {
            var database = false;
            var slot = false;
            $('.wsoptionactive').each(function (i, val) {
                if ($(val).data('description') === 2) {
                    database = true;
                }
                if ($(val).data('description') === 1) {
                    slot = true;
                }
            });
            if (slot) {
                $('#wsslottarea').text('unlimited');
            } else {
                $('#wsslottarea').text('12');
            }
            if (database) {
                $('#wsdatabasearea').text('want to have a MySQL Database.');
            } else {
                $('#wsdatabasearea').text('don\'t want MySQL Database.');
            }
        } else {
            $('#wsslottarea').text('12');
            $('#wsdatabasearea').text('don\'t want MySQL Database.');
        }
        wsreseterror();
        wshidesteps();
        $('#wstypemethod').text($(this).data('name'));
        wsshowstep('3');
        wsshowsteparea('4');
    });
    $('.op2nextbutton').click(function (e) {
        wsreseterror();
        if ($('.wsoptionals .wsdomains21ctive').data('domainrequired') === 1) {
            if ($('#wssubdomain').val().length <= 0) {
                wsdispayerror('Please fill sub domain to continue.');
                e.preventDefault();
                return false;
            }

        }
        if ($('.wsdomains21ctive').data('connect') === 'Sub domain') {
            $('#wsconnecttype').text($('#wssubdomain').val() + '.' + $('#wssubdomaintld').val());
        } else {
            $('#wsconnecttype').text($('.wsdomains21ctive').data('connect'));
        }
        wshidesteps();
        //$('#wstypemethod').text($(this).data('name'));
        wsshowstep('4');
        wsshowsteparea('5');
    });
    $('.op3nextbutton').click(function () {
        wshidesteps();
        $('#wsaddonscount').text($('.ws5step .wsoptionalsaactive').length);
        wsshowstep('5');
        wsshowsteparea('6');
    });
    $('.wsfirststepbutton').click(function () {
        if ($('#wsusername').val().length <= 0) {
            wsdispayerror('Please fill in a username.');
            return false;
        }
        wsreseterror();
        $('#wsclientusername').text($('#wsusername').val());
        wshidesteps();
        wsshowstep('1');
        wsshowsteparea('2');
    });
    $('.wsselectoptions').click(function () {
        var $chk = $(this).find('.fa-circle');
        if ($chk.is(':visible')) {
            $(this).addClass('wsoptionactive');
            $(this).find('.fa-circle').hide();
            $(this).find('.fa-check-circle').show();
        } else {
            $(this).removeClass('wsoptionactive');
            $(this).find('.fa-check-circle').hide();
            $(this).find('.fa-circle').show();
        }
    });
    $('.wsselectaddons').click(function () {
        var $chk = $(this).find('.fa-circle');
        if ($chk.is(':visible')) {
            $(this).addClass('wsoptionalsaactive');
            $(this).find('.fa-circle').hide();
            $(this).find('.fa-check-circle').show();
        } else {
            $(this).removeClass('wsoptionalsaactive');
            $(this).find('.fa-check-circle').hide();
            $(this).find('.fa-circle').show();
        }
    });
    $('.wsselectoptionsdomain').click(function () {
        var $chk = $(this).find('.fa-circle');
        $('.wsselectoptionsdomain .fa-check-circle').each(function () {
            $(this).hide();
        });
        $('.wsselectoptionsdomain .fa-circle').each(function () {
            $(this).show();
        });
        if ($chk.is(':visible')) {
            $('.wsselectoptionsdomain').removeClass('wsdomains21ctive');
            $(this).addClass('wsdomains21ctive');
            $(this).find('.fa-circle').hide();
            $(this).find('.fa-check-circle').show();
        } else {
            $('.wsselectoptionsdomain').removeClass('wsdomains21ctive');
            $(this).removeClass('wsdomains21ctive');
            $(this).find('.fa-check-circle').hide();
            $(this).find('.fa-circle').show();
        }
    });
    $('.wsselectoptionscycles').click(function () {
        var $chk = $(this).find('.fa-circle');

        $('.wsselectoptionscycles .fa-check-circle').each(function () {
            $(this).hide();
        });
        $('.wsselectoptionscycles .fa-circle').each(function () {
            $(this).show();
        });
        if ($chk.is(':visible')) {
            $('.wsselectoptionscycles').removeClass('wscycleactive');
            $(this).addClass('wscycleactive');
            $(this).find('.fa-circle').hide();
            $(this).find('.fa-check-circle').show();
        } else {
            $('.wsselectoptionscycles').removeClass('wscycleactive');
            $(this).removeClass('wscycleactive');
            $(this).find('.fa-check-circle').hide();
            $(this).find('.fa-circle').show();
        }
    });
    $('.opfinalnextbutton').click(function (e) {
        e.preventDefault();
        $('.wsajaxloader').show();
        $('.opfinalnextbutton').prop('disabled', true);
        var senddata = [{
                selectedproduct: $('#serverids').val(),
                selectedproductvalue: $('#selectedserverid').val(),
            }];
        if ($('.wsoptionactive').length > 0) {
            $('.wsoptionactive').each(function (i, val) {
                senddata.push({"configid": $(val).data('configid'), "configvalue": $(val).data('valueid')});
            });
        }
        if ($('.wsdomains21ctive').data('connect') === 'Sub domain') {
            senddata.push({"connectmethod": 'subdomain', "fid": $('.wsdomains21ctive').data('fid'), "connectvalue": $('#wssubdomain').val() + '.' + $('#wssubdomaintld').val()});
        } else if ($('.wsdomains21ctive').data('connect') === 'Dedicated IP') {
            senddata.push({"connectmethod": 'ip', "configid": $('.wsdomains21ctive').data('configid'), "connectvalue": $('.wsdomains21ctive').data('valueid')});
        } else {
            senddata.push({"connectmethod": 'port', "connectvalue": ''});
        }
        if ($('.wsoptionalsaactive').length > 0) {
            $('.wsoptionalsaactive').each(function (i, val) {
                senddata.push({"addonid": $(val).data('addonid')});
            });
        }
        senddata.push({"cycle": $('.wscycleactive').data('cycle')});
        senddata.push({"username": $('#wsusername').val(), 'fid': $('#wsusername').data('fid')});
        senddata.push({"location": $('#wslocation').val(), 'locationid': $('#wslocation').data('location')});
        $.ajax({
            type: 'POST',
            url: window.location.href,
            data: {setdata: JSON.stringify(senddata)},
            success: function (data) {
                if (data === 'InvalidRequest') {
                    wsdispayerror('Invalid Data, Please check fields!');
                    return false;
                } else {
                    window.location.href = '/cart.php?a=view';
                }
            }
        });
    });
});