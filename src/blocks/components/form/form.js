$(document).ready(function () {

     /* ================================================== */

    function initInputMask(){
        $("input[type=tel]").inputmask({
            mask: '+7 (999) 999-99-99',
            showMaskOnHover: false,
            getemptymask: true,
            clearIncomplete: true,

            oncomplete: function(elem){
                elem.target.setAttribute('area-valid', 'true')
            },
            onincomplete: function(elem){
                if(elem.target.value)
                    elem.target.setAttribute('area-valid', 'false')
            },
            oncleared: function(elem){
                elem.target.removeAttribute('area-valid')
            },
            onKeyValidation: function(elem){
                console.log(elem)
            }
        });
    }

    initInputMask();

    $('[data-fancybox]').fancybox({
        afterShow: function(){
            initInputMask();
        }
    })

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    //Латиница или цифры
    function validatePasswordEnNum(pass){
       var regexp = '^[a-zA-Z0-9]+$';
       return pass.match(regexp);
    }

    //мининум 1 цифра
    function validatePasswordOneNum(pass){
       var regexp = '/(\d{4})/';
       return pass.match(regexp);
    }

    //минимум 1 заглавная
    function validatePasswordCap(pass){
        var regexp = '^[a-zA-Z0-9]+$';
        return pass.match(regexp);
     }
     

    $(document).on('keyup', 'input[type=text], input[type=email], input[type=password], textarea', function(){
        
        let value = $(this).val();
        let elem = $(this);

        switch($(this).attr('type')){

            case 'email': 

                if(!validateEmail(value)){
                    elem.attr('area-valid', 'false')
                    //elem.parent().find('.tooltip').text('Не корректный Email')
                }else{
                    elem.attr('area-valid', 'true')
                }

            break;

            case 'password': 

            const rulesArray = {
                '0': validatePasswordEnNum(value),
                '1': validatePasswordOneNum(value),
                '2': validatePasswordCap(value)
            }

            const rulesList = $(this).parents('form').find('.valid-rules li');

            rulesList.each(function(index, elem){


                if(Array.isArray(rulesArray[index])){
                    $(this).addClass('active')
                }else{
                    $(this).removeClass('active') 
                }
            })


            if(value.length < 6){
                elem.attr('area-valid', 'false')
            }else{
                elem.attr('area-valid', 'true')
            }

            break;
            

            case 'text': 

                switch (elem.data('valid-type')){
                    case 'min8':
                        if(value.length < 8){
                            elem.attr('area-valid', 'false')
                        }else{
                            elem.attr('area-valid', 'true')
                        }
                    break;

                    default: 

                        if(value.length < 1){
                            elem.attr('area-valid', 'false')
                        }else{
                            elem.attr('area-valid', 'true')
                        }
                }

            break;

            
            default: 
                if(value.length < 0){
                    elem.attr('area-valid', 'false')
                }else{
                    elem.attr('area-valid', 'true')
                }
        }

        if(!value){
            elem.removeAttr('area-valid')
        }

    })

   
    
    /* =========================================== */
      /* =========================================== */

      function SendAjax(_action, _data, url_handler, _callBack) {
        _callBack = _callBack || function () {
        };
        $.ajax({
            url: url_handler,
            dataType: 'json',
            type: 'POST',
            data: {
                'action': _action,
                'data': _data
            },
            error: function (data) {
                console.log(data);
            },
        }).done(function (data) {
            _callBack(data);
        });
    }

    function myValidateForm(form) {
        var _items = form.find(".required");
        form.find(".required").removeAttr('area-valid')
        var _valid = true;
        form.find('.required').each(function (index, el) { /*проверка заполнения*/
            var _input = $(el);
            if (_input.val() == "") {
                $(el).attr('area-valid', 'false');
                _valid = false;
            }
            if (_input.attr("type") == "checkbox" && _input.prop("checked") == false) {
                $(el).attr('area-valid', 'false');
                _valid = false;
            }
            if (_input.attr("name") === "EMAIL" && _input.val() === "") {
            } else if (_input.attr("name") === "EMAIL" && !isValidEmailAddress(_input.val())) {
                $(el).attr('area-valid', 'false');
                _valid = false;
            }
            if (_input.attr("name") === "PASSWORD") {
                var _has_password_error = false;
                if (_input.val() === "") {
                } else if (_input.val().length < 6) {
                    _has_password_error = true;
                }
                if (_has_password_error) {
                    $(el).attr('area-valid', 'false');
                    _valid = false;
                }
            }
            if (_input.attr("name") === "CONFIRM_PASSWORD") {
                var _has_password_confirm_error = false;
                var _password = form.find(".req[name=PASSWORD]");
                if (_input.val() === "") {
                } else if (_input.val() !== _password.val()) {
                    _has_password_confirm_error = true;
                }
                if (_has_password_confirm_error) {
                    $(el).attr('area-valid', 'false');
                    _valid = false;
                }
            }
        });
        return _valid;
    }

    $.fn.serializeObject = function () {
        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key": /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push": /^$/,
                "fixed": /^\d+$/,
                "named": /^[a-zA-Z0-9_]+$/
            };
        this.build = function (base, key, value) {
            base[key] = value;
            return base;
        };
        this.push_counter = function (key) {
            if (push_counters[key] === undefined) {
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };
        $.each($(this).serializeArray(), function () {
            // skip invalid keys
            if (!patterns.validate.test(this.name)) {
                return;
            }
            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;
            while ((k = keys.pop()) !== undefined) {
                // adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');
                // push
                if (k.match(patterns.push)) {
                    merge = self.build([], self.push_counter(reverse_key), merge);
                }
                // fixed
                else if (k.match(patterns.fixed)) {
                    merge = self.build([], k, merge);
                }
                // named
                else if (k.match(patterns.named)) {
                    merge = self.build({}, k, merge);
                }
            }
            json = $.extend(true, json, merge);
        });
        return json;
    };

     
    $(document).on('submit', '[data-type="ajax"]', function(e){
        e.preventDefault();
        var _form = $(this);
        if (!myValidateForm(_form)) {
            return false;
        }
        var _data = _form.serializeObject();
        var _url = _form.attr('action');
        SendAjax("SEND_FORM", _data, _url, function (data) {
            _form.html(data.html).addClass('js-form-submit-success')
            _form.parent().addClass('js-form-submit-wrp');
            $.fancybox.close()
        });
    });
   
    
    

    
});