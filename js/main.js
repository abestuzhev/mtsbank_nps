
function StepsSlider() {
    var target = $('.container-steps');
    var steps = target.find('.step');
    // var paginator = target.find('ul');
    var next_button = target.find('.nxt');
    var next_button_area = target.find('.nxt-textarea');

    function ShowStep(index) {
        var a = index - 1;
        $(steps[a]).addClass('blur').fadeOut(0);
        $(steps[index]).fadeIn(0).removeClass('blur');
    }
    var active = 0;
    ShowStep(active);

    //checked
    function checkInput() {
        $('input').parent().removeClass('active');
        $('input:checked').parent().addClass('active');
    }

    $('label').click(function() {
        var len = $('label').length;
        checkInput();
        $('.left').css({
            'opacity': '1'
        });
        $('.btn').addClass('active');
    });

    var val_textarea;
    $('textarea').bind('input propertychange', function() {
        // console.log(this.value);
        val_textarea = this.value;
        // console.log(val);
        if(val_textarea.length > 0){
            $('.btn').addClass('active');
        }
    });
    // console.log(active);

    var otherQuestion2 = $('#question-2-other-input');
    $('#question-2-other').on('click', function(){
        if ($(this).find('input:checked').prop('checked')) {
            otherQuestion2.addClass('show');
            otherQuestion2.focus();
        }else {
            $('#question-2-other-input').removeClass('show');
        }
    });

    next_button.click(function(e) {
        e.preventDefault();
        if ($(this).parent().find('input:checked').prop('checked')) {
            active = active + 1;
            if (active >= steps.length) {
                return false;
            }
            ShowStep(active);
            console.log(1);
            // $('.left .skidka').removeClass('animated tada');
            $('.btn').removeClass('active')
        } else if (active == 0) {
            active = active + 1;
            if (active >= steps.length) {
                return false;
            }
            ShowStep(active);
            console.log(1);
            $('.left .skidka').removeClass('animated tada');
            $('.btn').removeClass('active')
        } else if (val_textarea.length > 0){
            active = active + 1;
            ShowStep(active);
            $('.btn').removeClass('active');
        }else {
            console.log('false');
        }

    });


    /*обрабатываем событие последних двух слайдов*/

    $('.radio-nps label').on('click', function(){
        if ($(this).parent().find('input:checked').prop('checked')) {
            active = active + 1;
            ShowStep(active);
            $('.c-popup_close').css('opacity', '0');

            setTimeout(function(){
                $('.c-popup_close').trigger('click');
            }, 3000);
        }else {
            console.log('false');
        }
    });

    // setTimeout(function(){
    //     var timer_number = parseInt($('.close-timer').html());
    //     console.log(timer_number);
    // },1000)
}


StepsSlider();

$(document).ready(function() {
    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $('html input:checked').serialize();
        th += '&' + $(this).serialize();
        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th,
            success: function(response) {
                console.log(response);
            }
        }).done(function() {
            location.href = 'spasibo.html';
        });
        return false;
    });


//    popup
    /*показать попап*/
    $(".btn-question").click(function(event) {
        event.preventDefault();
        $('.c-popup').addClass('c-popup_show');
        $('.c-popup_bg').addClass('is-visible');
        $('body').addClass('body-popup');
        // $(this).parent().addClass('animated bounce');
    });

    /*закрыть popup*/
    $(".c-popup_close").click(function(event) {
        event.preventDefault();
        $(this).removeClass('c-popup_show');
        $(this).parent('.c-popup').removeClass('c-popup_show');
        $('.c-popup_bg').removeClass('is-visible');
        $('body').removeClass('body-popup');
        $('.btn-question_box').removeClass('animated bounce');
        $('.popup-iframe').removeClass('c-popup_show');
        // setTimeout($('.popup-iframe').removeClass('c-popup_show'), 300);
    });


    // появление c задержкой
    function autoShowPoup (){

        if($('.popup-iframe').hasClass("c-popup_show")){
            return false;
        }else{
            $('.popup-iframe').addClass('c-popup_show');
            $('.c-popup_close').addClass('c-popup_show');
            $('.c-popup_bg').addClass('is-visible');
            $('body').addClass('body-popup');
        }
    }

    // setTimeout(autoShowPoup, 360000);
});
