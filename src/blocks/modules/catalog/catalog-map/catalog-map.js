const mapsParams = {
    container: 'catalog-map',
    params: {
      center: [55.74481370529173, 37.67514980332959],
      zoom: 12,
      controls: ['zoomControl', 'fullscreenControl']
    },
    ballonMobileMode: false,
    icons: {
      'default':'/img/svg/ic_pin-catalog.svg',
      'active':'/img/svg/ic_pin-catalog-active.svg',
    },
    points: [
    {
      'pin': [55.74481370529173, 37.67514980332959],
      'balloonContent': 'Allegoria Mosca',
      'draggable': false,
      'zoom': 13
    }
  ]
  };

ymaps.ready(function () {

    var sizeIcons = [76, 76];

    if($(window).width() < 769) sizeIcons = [55, 55]; 

    try {

        // Создание экземпляра карты и его привязка к созданному контейнеру.
        var catalogMap = new ymaps.Map(''+mapsParams.container+'',  mapsParams.params , {
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

                        if($(window).width() <= 580 && mapsParams.ballonMobileMode){

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

                        if($(window).width() <= 580 && mapsParams.ballonMobileMode){

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

            var MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="pin-content" >$[properties.iconContent]</div>'
            );


        var PlacemarkArr = [];

        if($(window).width() <= 580 && mapsParams.ballonMobileMode ){

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
                balloonContent: '',
                iconContent: '12',
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
                iconLayout: 'default#imageWithContent',
                iconImageHref: mapsParams.icons.default,
                iconImageSize: sizeIcons,
                pane: 'balloon',
                iconContentOffset: [25, 26],
                iconContentLayout: MyIconContentLayout,
                draggable: (mapsParams.points[i].draggable ? true : false)
            });

            PlacemarkArr[i].events.add('balloonopen', function (e) {
                
                PlacemarkArr[i].properties.set('balloonContent', mapsParams.points[i].balloonContent);
                e.get('target').options.set({
                    iconImageHref: mapsParams.icons.active
                });
                
            });

            PlacemarkArr[i].events.add('balloonclose', function (e) {
                e.get('target').options.set({
                    iconImageHref: mapsParams.icons.default
                });
            });

            

            catalogMap.geoObjects.add(PlacemarkArr[i]);
            catalogMap.behaviors.disable('scrollZoom'); 
            //autoscale

            if(mapsParams.autoscale){
                 catalogMap.setBounds(catalogMap.geoObjects.getBounds(), { checkZoomRange: true, zoomMargin: 50 });
            }

            PlacemarkArr[0].balloon.open();

           

        }

    } catch {
        console.log('error: maps-container')
    }


});