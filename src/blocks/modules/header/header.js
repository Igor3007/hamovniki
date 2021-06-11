import $ from 'jquery';

$(document).ready(function(){
    $('.nav__hamburger').on('click', function(){
        $(this).toggleClass('open')
        $('.header-opacity').toggleClass('open')

        var innerHeaderHeight = $('header').innerHeight()

        $('.mobile-menu').toggleClass('open').css({
            'top': innerHeaderHeight+'px'
        })

        $('html').toggleClass('hidden')
    });


    //закрыть при клике вне

    $(document).on('click', function (e) {
        var div = $(".nav__hamburger, .mobile-menu");  //класс элемента вне которого клик
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            //закрыть popup
            if($('.nav__hamburger').hasClass('open')){
                $('.nav__hamburger').trigger('click')
            }
            
        }
    });

    /* search */

    $('.header__find').on('click', function () {
        $(this).find('.find-wrp').toggleClass('open')
        $(this).find('.find-wrp input').focus()
    })

    $('.header__find input').on('blur', function () {
        $(this).parents('.find-wrp').removeClass('open')
    })
})