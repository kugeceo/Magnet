
//Storage操作
function setStorage(a, b) {
    window.localStorage[a] = JSON.stringify(b)
}

function getStorage(a) {
    b = null;
    if ("undefined" !== typeof window.localStorage[a]) var b = JSON.parse(window.localStorage[a]);
    return b
}

function clearStorage(a) {
    window.localStorage.removeItem(a)
}
//设置皮肤
function setSkin(index){
	var span = $('.select li span'),
		a = $('.control h1 a'),
		con = $('.control');
	if (index == '0') {
		span.css('color','#666');
		a.css('color','#666');
		con.css({'background':'url(skin/skin_'+index+'.jpg)','background-size':'100%'});
		$('.rowSelect a').css('color','#666');
	}else if(index == '1'){
		span.css('color','#fff');
		a.css('color','#fff');
		con.css({'background':'url(skin/skin_'+index+'.jpg) 600px 100px'});
	}else{
		span.css('color','#fff');
		a.css('color','#fff');
		con.css({'background':'url(skin/skin_'+index+'.jpg)','background-size':'100%'});
	}
}


$(function(){
	
	//判断当前页面分别获取不同的导航strong列表
	var href = window.location.href;
	if (href.indexOf('index') != -1) {
		var sort = getStorage('index_sort');
		if (sort) {
			var ulHtml = '';
			for(var i = 0; i<sort.length; i++){
				ulHtml += '<li value="'+sort[i].value+'" >'+sort[i].content+'</li>';
			}
			$('.select').html(ulHtml);
			$('#test2 li').each(function(){
			    $(this).dragsort({vi:1});
		    });
		}
	}else if(href.indexOf('data') != -1){
		var sort = getStorage('data_sort');
		if (sort) {
			var ulHtml = '';
			for(var i = 0; i<sort.length; i++){
				ulHtml += '<li value="'+sort[i].value+'" >'+sort[i].content+'</li>';
			}
			$('.select').html(ulHtml);
			$('#test2 li').each(function(){
			    $(this).dragsort({vi:1});
		    });
		}
	}else if(href.indexOf('learning') != -1){
		var sort = getStorage('learning_sort');
		if (sort) {
			var ulHtml = '';
			for(var i = 0; i<sort.length; i++){
				ulHtml += '<li value="'+sort[i].value+'" >'+sort[i].content+'</li>';
			}
			$('.select').html(ulHtml);
			$('#test2 li').each(function(){
			    $(this).dragsort({vi:1});
		    });
		}
	}else if(href.indexOf('magnetic') != -1){
		var sort = getStorage('magnetic_sort');
		if (sort) {
			var ulHtml = '';
			for(var i = 0; i<sort.length; i++){
				ulHtml += '<li value="'+sort[i].value+'" >'+sort[i].content+'</li>';
			}
			$('.select').html(ulHtml);
			$('#test2 li').each(function(){
			    $(this).dragsort({vi:1});
		    });
		}
	}else if(href.indexOf('picture') != -1){
		var sort = getStorage('picture_sort');
		if (sort) {
			var ulHtml = '';
			for(var i = 0; i<sort.length; i++){
				ulHtml += '<li value="'+sort[i].value+'" >'+sort[i].content+'</li>';
			}
			$('.select').html(ulHtml);
			$('#test2 li').each(function(){
			    $(this).dragsort({vi:1});
		    });
		}
	}
	//判断当前页面分别获取不同的导航strong列表--end

	var selectLi = $('.select').children('li');
	//设置竖向导航栏移入移除背景变化 hover存在bug
	selectLi.hover(function(){
		$(this).css('background','#26354c');
	},function(){
		selectLi.css('background','rgba(0,0,0,.0)');
		$('.action').css('background','#26354c');
	})
//纵向导航点击 网址切换
	selectLi.click(function(){
		// if (sortft == true) {
		// 	selectLi.css('padding-left','34px');
		// }
		selectLi.removeClass('action').css({'padding-left':'0px','background':'rgba(0,0,0,.0)'});
		$(this).addClass('action').css('background','#26354c');
		$('#display').attr('src','about:blank').css('width','0px');
		var liSrc = $(this).attr('value');
		setTimeout(function(){
			$('#display').attr('src',liSrc).css('width','calc(100% - 170px)');
		},10)
	})
	selectLi.eq(0).addClass('action');
	var disValue = selectLi.eq(0).attr('value');
	$('#display').css('width','0').attr('src',disValue).css('width','calc(100% - 170px)');
//鼠标右击事件
	$('.control').mousedown(function(event, a){
			if(event.which == 3 || a == 'right'){
				$('#function').show().css({'left':event.pageX,'top':event.pageY})
         	}
		}).bind('contextmenu',function(){
        	return false;
        });
        var offset = $('#display').outerWidth();
        setStorage('hide','false');
//取消按钮点击
    $('#none').click(function(){
    	$(this).parent().hide();
    })
//缩小按钮点击
    $('#hideBtn').click(function(){
    	var hideOr = getStorage('hide');
    	$(this).parent().hide();
    	if (hideOr == 'false') {
		    	setStorage('hide','true');
	    		selectLi.find('span').hide();
	    	$('.control>h1').animate({'opacity':'0'},function(){
	    		$(this).hide();
		    	$('.select').css('marginTop','59px');
	    		$('#hideBtn').text('\u5c55\u5f00');
	    	})
	    		$('.control').animate({'width':'55px'});
	    		var offsetUnd = offset + 115;
	    		$('#display').animate({'width':offsetUnd});
	    		$('.rowSelect').animate({'width':offsetUnd,'padding-left':'0px'});
		}else{
			$('#display').animate({'width':offset});
			$('.rowSelect').animate({'width':offset});
    		$('.control').animate({'width':'170px'},function(){
    			$('.control>h1').show().animate({'opacity':'1'});
    			selectLi.find('span').show();
    			$('.select').css('marginTop','0px');
	    		setStorage('hide','false');
	    		$('#hideBtn').text('\u85cf\u8d77\u6765');
    		});
		}
	})
//IconFont网址阻止iframe链接 直接跳转
	$('#IconFont').click(function(){
		window.location.href = 'http://www.iconfont.cn/plus';
	})
	//换肤
	var skin = null;
	var defSkin = $('#skinSelect').val();
	// 点击换肤
	$('#skin').click(function(){
		var disKey = $('#skinSelect').css('display');
		if (disKey == 'none') {
			$('#skinSelect').show();
			skin = getStorage('skin_index');
		}else{
			$('#skinSelect').hide();
		}
	})
	var skinIndex = getStorage('skin_index');
	if (skinIndex == '0' || skinIndex) {
		setSkin(skinIndex);
		$('.rowSelect').css({'background':'url(skin/skin_'+skinIndex+'.jpg)','background-size':'170px 213px'});
	}else{
		var defback = $('.control').css('background');
		$('.rowSelect').css({'background':defback});
	}
	var skinLi = $('#skinSelect').children('li');
	//移入皮肤选项 显示皮肤名称
	skinLi.hover(function(){
		$(this).children('span').css('display','block');
	},function(){
		$(this).children('span').hide();
	})
	//选择皮肤
	skinLi.click(function(){
		if ($(this).index() == '5') {
			$('#skinSelect').hide();
			$('.control').css({'background':defSkin}).find('span').css('color','#fff');
			$('.control h1 a').css('color','#fff');
			var defback = $('.control').css('background');
			$('.rowSelect').css({'background':defback}).find('a').css('color','#fff');
			clearStorage('skin_index');
		}else{
			setSkin($(this).index());
			setStorage('skin_index',$(this).index());		
			$('.rowSelect').css({'background':'url(skin/skin_'+$(this).index()+'.jpg)','background-size':'170px 213px'});
		}
		$('#skinSelect').hide();
	})
	// 换肤 -- end
})