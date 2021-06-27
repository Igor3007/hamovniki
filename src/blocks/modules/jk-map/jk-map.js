
ymaps.ready(function () {

    try {

        // Создание экземпляра карты и его привязка к созданному контейнеру.
        var myMap = new ymaps.Map(''+mapsParams.container+'',  mapsParams.params , {
                suppressMapOpenBlock: true,
            }),

            // Создание макета балуна на основе Twitter Bootstrap.
            MyBalloonLayout = ymaps.templateLayoutFactory.createClass(

                '<div class="sh-balloon" >' +
                '<div class="sh-balloon__close" ></div>' +
                '<div class="sh-balloon__content" >$[[options.contentLayout observeSize class=sh-wrp minWidth=100 maxWidth=480 maxHeight=400]]</div>' +
                '<div class="sh-balloon__arrow" ></div>' +
                '</div>', {
                    /**
                     * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                     * @function
                     * @name build
                     */
                    build: function () {
                        this.constructor.superclass.build.call(this);

                        this._$element = $('.sh-balloon', this.getParentElement());

                        this.applyElementOffset();

                        this._$element.find('.sh-balloon__close')
                            .on('click', $.proxy(this.onCloseClick, this));
                    },

                    /**
                     * Удаляет содержимое макета из DOM.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                     * @function
                     * @name clear
                     */
                    clear: function () {
                        this._$element.find('.sh-balloon__close')
                            .off('click');

                            

                        this.constructor.superclass.clear.call(this);
                    },

                    /**
                     * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                     * @function
                     * @name onSublayoutSizeChange
                     */
                    onSublayoutSizeChange: function () {
                        MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                        if (!this._isElement(this._$element)) {
                            return;
                        }

                        this.applyElementOffset();

                        this.events.fire('shapechange');
                    },

                    /**
                     * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                     * @function
                     * @name applyElementOffset
                     */
                    applyElementOffset: function () {

                        var positionDefault = {
                            left: -(this._$element[0].offsetWidth),
                            top: -(this._$element[0].offsetHeight)
                        }

                        if($(window).width() <= 580 ){

                           var positionDefault = {
                               left: 0,
                               right: 0,
                               bottom: 0
                           }
                        }

                        this._$element.css(positionDefault);
                    },

                    /**
                     * Закрывает балун при клике на крестик, кидая событие "userclose" на макете.
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                     * @function
                     * @name onCloseClick
                     */
                    onCloseClick: function (e) {
                        e.preventDefault();

                        this.events.fire('userclose');
                    },

                    /**
                     * Используется для автопозиционирования (balloonAutoPan).
                     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                     * @function
                     * @name getClientBounds
                     * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
                     */
                    getShape: function () {
                        if (!this._isElement(this._$element)) {
                            return MyBalloonLayout.superclass.getShape.call(this);
                        }

                        var position = this._$element.position();
                        pos1 = [position.left, position.top]
                        pos2 = [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.sh-balloon__arrow')[0].offsetHeight
                        ]

                        if($(window).width() <= 580 ){

                            var heightElem = this._$element.height() + 55
                            var widthElem = (this._$element.width() / 2) - 25

                            pos1 = [0, 0]
                            pos2 = [widthElem, heightElem]
                        }


                        return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([ pos1, pos2 ]));
                    },

                    /**
                     * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
                     * @function
                     * @private
                     * @name _isElement
                     * @param {jQuery} [element] Элемент.
                     * @returns {Boolean} Флаг наличия.
                     */
                    _isElement: function (element) {
                        return element && element[0] && element.find('.sh-balloon__arrow')[0];
                    }
                });

            // Создание вложенного макета содержимого балуна.
            MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="bln-scroll-offset" >$[properties.balloonContent]</div>'
            );


        var PlacemarkArr = [];

        if($(window).width() <= 580 ){

            var showBaloonMode = false;
            var ballonPane = 'balloon';
            var ballonMapArea = 'Infinity';
        }else{
            var showBaloonMode = false;
            var ballonPane = 'placemark';
            var ballonMapArea = 0;

        }


        for (let i = 0; i < mapsParams.points.length; i++) {

            // Создание метки с пользовательским макетом балуна.
            PlacemarkArr[i] = window.myPlacemark = new ymaps.Placemark(mapsParams.points[i].pin, {
                balloonContent: ''
            }, {
                balloonShadow: false,
                balloonLayout: MyBalloonLayout,
                balloonContentLayout: MyBalloonContentLayout,
                balloonPanelLayout: MyBalloonLayout,
                //balloonPanelContentLayout: MyBalloonContentLayout,
                balloonPanelMaxMapArea: ballonMapArea,
                // Не скрываем иконку при открытом балуне.
                hideIconOnBalloonOpen: showBaloonMode,
                // И дополнительно смещаем балун, для открытия над иконкой.
                balloonOffset: [-15, 6],

                // balloonContentLayout: LayoutActivatePoint,
                iconLayout: 'default#image',
                iconImageHref: mapsParams.points[i].icon,
                iconImageSize: [35, 35],
                pane: 'balloon',
                draggable: (mapsParams.points[i].draggable ? true : false)
            });

            PlacemarkArr[i].events.add('balloonopen', function (e) {
                
                PlacemarkArr[i].properties.set('balloonContent', mapsParams.points[i].balloonContent);
                PlacemarkArr[i].properties.set('iconImageHref', '/img/svg/ic_pin-map-open.svg');
                
            });

            PlacemarkArr[i].events.add('balloonclose', function (e) {
                PlacemarkArr[i].properties.set('iconImageHref', '/img/svg/ic_pin-map.svg');
            })

            myMap.geoObjects.add(PlacemarkArr[i]);
            myMap.behaviors.disable('scrollZoom'); 
            //autoscale

            if(mapsParams.autoscale){
                 myMap.setBounds(myMap.geoObjects.getBounds(), { checkZoomRange: true, zoomMargin: 15 });
            }

            PlacemarkArr[0].balloon.open();

           

        }

    } catch {
        console.log('error: maps-container')
    }


});