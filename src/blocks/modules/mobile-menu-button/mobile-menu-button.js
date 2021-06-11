import $ from 'jquery';


 const buttonOpenFilter = $('.filter-mobile-button');
if(buttonOpenFilter){
        buttonOpenFilter.on('click', function(elem){
            if($('.page-qna__aside').toggleClass('open') && $('.page-qna__aside').hasClass('open')){
                $(this).find('span').text('назад')
            }else{
                $(this).find('span').text($(this).attr('data-text'));
            }
        })
    }

    $(document).on('click', function (e) {
        var div = $(".page-qna__aside, .filter-mobile-button");  //класс элемента вне которого клик
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            //закрыть popup
            if($('.page-qna__aside').hasClass('open')){
                buttonOpenFilter.trigger('click')
            }
            
        }
    });