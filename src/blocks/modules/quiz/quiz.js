$(document).ready(function () {
   

    //===========================

    function historyMain (){
      
        this.block = '.quiz';
        this.container = '.quiz__list';
        this.item = '.quiz__slide';
        this.dotsContainer = '.quiz__mark';

  
        this.countSlide = $(this.item).length;
        this.slideActive = 1;
  
        this.init = function(){
          this.changeStage()
          this.nav()
          this.renderDots(this.slideActive)
          this.changeBg(this.slideActive)
        }
  
        this.changeStage = function(){
          $('[data-quiz-count="current"]').text(this.slideActive)
          $('[data-quiz-count="total"]').text(this.countSlide)
        }
  
        this.cahngeSlide = function(index){
  
          $(this.item).removeClass('active')
          $(this.item).eq((index-1)).addClass('active')
  
        
          this.changeStage()
          this.nav()
          this.renderDots(this.slideActive)
          this.changeBg(index)
        }
  
        this.nextSlide = function(){
  
          if(this.slideActive < this.countSlide){
            this.slideActive = this.slideActive + 1;
  
            this.cahngeSlide(this.slideActive)
          }
  
           
        }
        this.prevSlide = function(){
          if(this.slideActive > 1){
            this.slideActive = this.slideActive - 1;
            this.cahngeSlide(this.slideActive)
          }
        }

        this.renderDots = function(activeSlide){

          $(this.dotsContainer).empty()

          for (let i = 1; i <= this.countSlide; i++){
            
            let active = (i <= activeSlide ? 'active': '');

            $(this.dotsContainer).append('<span class="'+active+'"></span>')

          }

        }

        this.changeBg = function(index){

          let link = $(this.item).eq((index-1)).find('.quiz-slide').attr('data-slide-bg');
          $(this.block).attr({
            style: 'background-image: url('+link+');'
          })

        }
  
  
        this.nav = function(){
  
          // говно какоето
            if(this.slideActive == 1){
              $('[data-quiz-nav="prev"]').hide()
            }else{
              $('[data-quiz-nav="prev"]').show()
            }
    
            if(this.slideActive == this.countSlide){
              $('[data-quiz-nav="next"]').hide()
              $('[data-quiz="send"]').attr('style', 'display: flex')

            }else{
              $('[data-quiz-nav="next"]').show()
              $('[data-quiz="send"]').hide()
            }
        }
  
  
      }
  
      var hst = new historyMain();
      hst.init()
  
      $('[data-quiz-nav="prev"]').on('click', function(event){ hst.prevSlide() })
      $('[data-quiz-nav="next"]').on('click', function(event){ hst.nextSlide() })

      

      /* =========================================== */
      /* =========================================== */

      $(document).on('click', '[data-quiz-nav="next"], [data-quiz-nav="prev"]', function(event){
        event.preventDefault()
      })

      

      
      /* =========================================== */
      /* =========================================== */

      $(document).on('click', '[data-quiz="open"]', function(event){
        $('.quiz').toggleClass('open')
        $('html').toggleClass('hidden')
      })

            
      /* =========================================== */
      /* =========================================== */

      $(document).on('click', '.quiz__close', function(event){
        $(this).parents('.quiz').removeClass('open')
        $('html').removeClass('hidden')
      })
       

});