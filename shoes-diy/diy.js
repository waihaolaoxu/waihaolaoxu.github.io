/*
 @ Name：高跟鞋DIY
 @ Author：前端老徐
 @ Date：2016/01/18
 @ Blog:http://www.loveqiao.com/
*/
function Diy(id){
	this.id=id;
	this.data_all=null;//商品全部数据
	this.data_cur=null;//存储当前图片数据
	this.api='http://xibuxiedu.dev.bodecn.com/';
	this.angle={//1-8 （8个方向）
		cur:1,//当前方向
		num:8//总共方向数
	};	
}
Diy.prototype={
	init:function(){
		_diy=this;
		_diy.getBase();//获取基本款
		_diy.bind();
		_diy.ng();
		_diy.resize();
		_diy.getCur();//可视化操作
	},
	bind:function(){
		//滚动条美化
		setTimeout(function(){
			$('#opt').mCustomScrollbar({scrollInertia:500});
		},120);
		
		//右侧选项卡
		$('#menu').on('click','li',function(){
			$(this).addClass('cur').siblings().removeClass('cur');
			$('#opt .cat').eq($(this).index()).siblings().hide().end().show()
			$('#opt').mCustomScrollbar('update');
		})	
	},
	resize:function(){
		var flag=null;
		$(window).on('resize load',function(){
			if(flag){clearTimeout(flag)};
			var flag=setTimeout(function(){
				var winH=$(window).height(),h=winH-260;
				$('#showPic').css({height:h,width:h});
				$('#opt').css({height:winH-240})
				$('#opt').mCustomScrollbar('update');
			},120)
		});
	},
	getBase:function(){
		/*$.ajax({
			url:_diy.api+'Web/Online/GetBaseModelInfo',
			data:{
				baseModelId:_diy.id	
			},
			dataType:"jsonp",
			type:'get',
			success: function(d){
				_diy.data_all=d;
				var arr=[];
				$.each(d.Pic,function(i,d){
					if(d.Orientation==_diy.angle.cur){
						
						arr.push('<img src="'+d.Path.replace('xibuxiedu.dev.bodecn.com','7xqkfy.com1.z0.glb.clouddn.com')+'?v1" title="'+d.Name+'" style="z-index:'+d.Zindex+'">')	
					}	
				});
				$('#showPic').html(arr.join(''))
			},
			error:function(){
				alert('error')	
			}	
		});*/
	},
	ng:function(){
		var module=angular.module('mod', []);
		module.controller('ctrl_1', function($scope, $http) {
			//更新视图
			$scope.updataView=function(){
				_diy.data_cur=[];
				if(_diy.data_all){
					$.each(_diy.data_all.Pic,function(i,d){
						if(d.Orientation==_diy.angle.cur){
							_diy.data_cur.push(d)	
						}	
					});
					$scope.base=_diy.data_cur;
				}
			}
			//获取基本款
			$.ajax({
				url:_diy.api+'Web/Online/GetBaseModelInfo',
				data:{
					baseModelId:_diy.id	
				},
				dataType:"jsonp",
				type:'get',
				success: function(d){
					_diy.data_all=d;//同步商品数据
					$('#updataView').click();
				},
				error:function(){
					alert('error')	
				}	
			});
			//重来
			$scope.resets=function(){
				location.reload();	
			}
			//旋转
			$scope.rotate=function(e){
				if(e>0){//右转
					_diy.angle.cur<_diy.angle.num?_diy.angle.cur++:_diy.angle.cur=1;
				}else{//左转
					_diy.angle.cur>1?_diy.angle.cur--:_diy.angle.cur=8;
				}
				setTimeout(function(){
					$('#updataView').trigger('click');
				},100)
			}
			//全屏
			$scope.fullScreen=function(){
				;(function launchFullscreen(element) {
					if(element.requestFullscreen) {
						element.requestFullscreen();
					} else if(element.mozRequestFullScreen) {
						element.mozRequestFullScreen();
					} else if(element.webkitRequestFullscreen) {
						element.webkitRequestFullscreen();
					} else if(element.msRequestFullscreen) {
						element.msRequestFullscreen();
					}else{
						luck.poptip({
							con:'您的浏览器不支持全屏功能!'	
						})	
					}
				})(document.documentElement);
			}
		});
	},
/*============================*
		   可视化操作 
*=============================*/

	//绑定获取焦点
	getCur:function(){
		if(document.createElement('canvas').getContext){
			var delay=true;
			$('#showPic').mousemove(function(e){
				$(this).find('.Highlight').remove();
				$('#TipInfo').remove();
				if(delay){clearTimeout(delay)}
				var size=$(this).height();
				delay=setTimeout(function(){
					_diy.getFocus(e.offsetX,e.offsetY,size);
				},100);
			}).mouseleave(function(){
				setTimeout(function(){
					$('#TipInfo').remove();
					$(this).find('.Highlight').remove();	
				},120)
			});
		}
	},

	//通过色值匹配获取焦点
	getFocus:function(x,y,size){
		function sortNumber(a,b){
			return b.zindex-a.zindex
		}
		var arr=[],
			data=(function(){
				d=[];
				$('#showPic img').each(function(i, e) {
					d.push({imgurl:e.src,cn:e.title,zindex:$(e).css('z-index')})
				});
				return d;
			})().sort(sortNumber),
			len=data.length;
		$.each(data,function(name,value){
			var can=document.createElement('canvas');
				ctx=can.getContext('2d');
				can.width=size;
				can.height=size;
			var img=new Image();
				img.crossOrigin = 'Anonymous'; //解决跨域
				img.src=value.imgurl;
				img.onload=function(){
					ctx.drawImage(img,0,0,size,size);
					//$('body').append(can)
					var imgData = ctx.getImageData(0,0,size,size).data,
					    _step = (y * size + x) * 4,
					    data={
							rgba:[imgData[0 + _step],imgData[1 + _step],imgData[2 + _step],imgData[3 + _step]].join(),
							imgurl:value.imgurl,
							zindex:value.zindex,
							//id:value.id,
//							pt:value.pt,
							cn:value.cn
						};
					arr.push(data);
					if(arr.length==len){
						$.each(arr,function(index,value){
							if(value.rgba!='0,0,0,0'){
								$('#showPic').find('.Highlight').remove().end();
								//alert(value.imgurl);
								var can=document.createElement('canvas'),
									ctx=can.getContext('2d');
									can.width=size;
									can.height=size;
									can.className='Highlight';
									can.style.zIndex=value.zindex;
								var img=new Image();
								img.crossOrigin = 'Anonymous'; //解决跨域
								img.src=value.imgurl;
								img.onload=function(){
									ctx.drawImage(img,0,0,size,size);
									ctx.globalCompositeOperation="source-atop";
									ctx.fillStyle='#fff'
									ctx.fillRect(0,0,size,size);
									$('#showPic').append(can);//追加高光层
									
									//追加Tip提示
									var info=$('<div>');
									info[0].id='TipInfo';
									info.text(value.cn);
									$('body').append(info);
									info.css({left:x+$('#showPic').offset().left-info.width()/2-15,top:y+$('#showPic').offset().top-45,visibility:'visible'});
									
								}
								return false	
							}	
						})	
					}
				}
		});
	}
}
