
$(document).ready(function(){
    $('.burger').on('click', function(){
        $(this).toggleClass('open')
        $('.main-menu').toggleClass('open')
        $('header').toggleClass('open')

        // var innerHeaderHeight = $('header').innerHeight()

        // $('.mobile-menu').toggleClass('open').css({
        //     'top': innerHeaderHeight+'px'
        // })

        $('html').toggleClass('hidden')
    });


    //закрыть при клике вне

    $(document).on('click', function (e) {
        var div = $(".burger, .main-menu");  //класс элемента вне которого клик
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            //закрыть popup
            if($('.burger').hasClass('open')){
                $('.burger').trigger('click')
            }
            
        }
    });

   
})