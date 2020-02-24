
$.fn.extend({
    dragsort:function(data){
        var defaults = {
            vi : 0, //拖动方向：0水平 1垂直
        }
        var opt = $.extend({}, defaults, data);        
    
        //给当前元素绑定拖动事件
        var $this = $(this);
        $this.attr('id', _makeRandomId());
        $this.attr('draggable', 'true');
        $this.attr('ondragover', 'dragsort_allowDrop(event)');  
        $this.attr('ondragstart', 'dragsort_drag(event)');
        $this.attr('ondrop', 'dragsort_drop(event, ' + opt.vi + ')');
        
        /**
         * 允许放置
         * @param event
         */
        window.dragsort_allowDrop = function(event){
            
            event.preventDefault();
        }
            
        /**
         * 开始拖拽(拖拽该元素)
         * @param event
         */
        window.dragsort_drag = function (event){
            var target = _getTargetAboutDrag(event.target);
            if (target){
                event.dataTransfer.setData("x", event.x); //当前x坐标
                event.dataTransfer.setData("y", event.y); //当前y坐标
                event.dataTransfer.setData("id", target.attr('id')); //保存拖拽元素的ID
            }        
        }

        /**
         * 拖拽结束(放置到该元素)
         * @param event
         * @param vi 0:水平(默认) 1:垂直
         */
        window.dragsort_drop = function (event, vi){
            if (!vi) vi = 0;
            var target = _getTargetAboutDrag(event.target);
            if (target){
                event.preventDefault();
                var x0 = event.dataTransfer.getData("x"); //拖动前x坐标
                var y0 = event.dataTransfer.getData("y"); //拖动前y坐标
                var x1 = event.x; //拖动后x坐标
                var y1 = event.y; //拖动后y坐标
                var offset_x = x1 - x0;
                var offset_y = y1 - y0;
                var id = event.dataTransfer.getData("id"); //获取拖拽元素的ID
                var offset = vi ? offset_y : offset_x;
                if (offset > 0){ //向右/下拖拽
                    target.after($('#'+id));
                } else { //向左/上拖拽
                    target.before($('#'+id));
                }
            }
                var href = window.location.href;
                if (href.indexOf('index') != -1) {
                    var sort = [];
                    var selectLi = $('.select').children('li');
                    for(var i = 0; i<selectLi.length;i++){
                        var Lisort = {};
                        Lisort.content = selectLi.eq(i).html();
                        Lisort.value = selectLi.eq(i).attr('value');
                        sort.push(Lisort)
                    }
                    setStorage('index_sort',sort);
                }else if(href.indexOf('data') != -1){
                    var sort = [];
                    var selectLi = $('.select').children('li');
                    for(var i = 0; i<selectLi.length;i++){
                        var Lisort = {};
                        Lisort.content = selectLi.eq(i).html();
                        Lisort.value = selectLi.eq(i).attr('value');
                        sort.push(Lisort)
                    }
                    setStorage('data_sort',sort);
                }else if(href.indexOf('learning') != -1){
                    var sort = [];
                    var selectLi = $('.select').children('li');
                    for(var i = 0; i<selectLi.length;i++){
                        var Lisort = {};
                        Lisort.content = selectLi.eq(i).html();
                        Lisort.value = selectLi.eq(i).attr('value');
                        sort.push(Lisort)
                    }
                    setStorage('learning_sort',sort);
                }else if(href.indexOf('magnetic') != -1){
                    var sort = [];
                    var selectLi = $('.select').children('li');
                    for(var i = 0; i<selectLi.length;i++){
                        var Lisort = {};
                        Lisort.content = selectLi.eq(i).html();
                        Lisort.value = selectLi.eq(i).attr('value');
                        sort.push(Lisort)
                    }
                    setStorage('magnetic_sort',sort);
                }else if(href.indexOf('picture') != -1){
                    var sort = [];
                    var selectLi = $('.select').children('li');
                    for(var i = 0; i<selectLi.length;i++){
                        var Lisort = {};
                        Lisort.content = selectLi.eq(i).html();
                        Lisort.value = selectLi.eq(i).attr('value');
                        sort.push(Lisort)
                    }
                    setStorage('picture_sort',sort);
                }
            }
        /**
         * 获取已绑定过事件的拖动元素
         * @param target
         * @returns {*}
         */
        function _getTargetAboutDrag(target){
            target = $(target);
            while (!target.attr('draggable')){
                target = target.parent();
                if (target[0].nodeName.toLowerCase() == 'body') return false; //防止死循环
            }
            return target;
        }

        /**
         * 产生一个随机ID(16位)
         * 
         */
        function _makeRandomId(){
            return (Math.random() + '').substr(2);
        }


    }
}); 