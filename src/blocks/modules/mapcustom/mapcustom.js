$(document).ready(function () {
    
    function customMap (){
        this.container = $('.mapcustom__placemark'),
        this.params = [
            { 'title': 'hamovniki', 'point': '617, 515' },
            { 'title': 'hamovniki', 'point': '494, 545' },
            { 'title': 'hamovniki', 'point': '574, 640' },
            { 'title': 'hamovniki', 'point': '486, 640' },

            { 'title': 'hamovniki', 'point': '738, 644' },
            { 'title': 'hamovniki', 'point': '782, 662' },
            { 'title': 'hamovniki', 'point': '748, 727' },
            { 'title': 'hamovniki', 'point': '867, 750' },
            { 'title': 'hamovniki', 'point': '706, 844' },
            { 'title': 'hamovniki', 'point': '652, 911' },
            { 'title': 'hamovniki', 'point': '590, 786' },
            { 'title': 'hamovniki', 'point': '547, 871' },
            { 'title': 'hamovniki', 'point': '531, 950' },

            { 'title': 'hamovniki', 'point': '468, 778 ' },
            { 'title': 'hamovniki', 'point': '467, 927' },
            { 'title': 'hamovniki', 'point': '500, 1044' },
            { 'title': 'hamovniki', 'point': '416, 1023' },
            { 'title': 'hamovniki', 'point': '419, 986' },
            { 'title': 'hamovniki', 'point': '362, 951' },
            { 'title': 'hamovniki', 'point': '467, 779' },
            { 'title': 'hamovniki', 'point': '365, 769' },
            { 'title': 'hamovniki', 'point': '350, 643' },
            { 'title': 'hamovniki', 'point': '311, 833' },
            { 'title': 'hamovniki', 'point': '361, 1046' },
            { 'title': 'hamovniki', 'point': '331, 1059' },
            { 'title': 'hamovniki', 'point': '324, 1153' },

            { 'title': 'hamovniki', 'point': '288, 1136' },
            { 'title': 'hamovniki', 'point': '279, 1082' },
            { 'title': 'hamovniki', 'point': '294, 1010' },
            { 'title': 'hamovniki', 'point': '271, 974' },
            { 'title': 'hamovniki', 'point': '242, 892' },
            { 'title': 'hamovniki', 'point': '200, 826' },
            { 'title': 'hamovniki', 'point': '181, 764' },
            { 'title': 'hamovniki', 'point': '144, 975' },
            { 'title': 'hamovniki', 'point': '174, 1065' },
            { 'title': 'hamovniki', 'point': '204, 1036' },

            { 'title': 'hamovniki', 'point': '87, 1076' },
            { 'title': 'hamovniki', 'point': '86, 1172' },
            { 'title': 'hamovniki', 'point': '142, 1133' },
            { 'title': 'hamovniki', 'point': '216, 1134' },
            { 'title': 'hamovniki', 'point': '188, 1207' },
            { 'title': 'hamovniki', 'point': '156, 1206' },
            { 'title': 'hamovniki', 'point': '97, 1244' },
        ]


        

        this.init = function(){
            this.addPlacemark(this.params)
        },

        this.addPlacemark = function(pointsArray){

            const _this = this;

            pointsArray.forEach(function(item, index){
                let html = _this.templatePlacemark(item)
                _this.container.append(html)
            })

        },

        this.templatePlacemark = function(data){

            let arrPoint = data.point.split(',')
            let offset = {
                offsetX: 12,
                offsetY: 12,
            }

            let pointY = (arrPoint[0] - offset.offsetY)
            let pointX = (arrPoint[1] - offset.offsetX)


            var template = '<div class="placemark-item" style="top: '+pointY+'px; left: '+pointX+'px;" title="'+data.title+'" ></div>';

            return template;
        }
    }

    // const cm = new customMap();
    // cm.init();

    // $(document).on('click', '.placemark-item', function(){

    //     let pointY = $(this).position().top
    //     let pointX = $(this).position().left

    //     //console.log(pointY+', '+pointX, 'placemark')
         

    // })

    // $(document).on('mousedown', '.mapcustom__placemark', function(e){

    //     let pointY = (e.originalEvent.pageY - $(this).offset().top)
    //     let pointX = (e.originalEvent.pageX - $(this).offset().left)

    //     console.log( pointY.toFixed(0)+', '+pointX.toFixed(0))

         

    // })

});

