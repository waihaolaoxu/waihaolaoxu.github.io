/*
 @ Name：高跟鞋DIY
 @ Author：前端老徐
 @ Date：2016/01/18
 @ Blog:http://www.loveqiao.com/
*/
//replace('xibuxiedu.dev.bodecn.com','7xqkfy.com1.z0.glb.clouddn.com')
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
	loading:function(n){//1：开启 0：关闭
		if($('#loading').length<=0){
			$('#showPic').append('<div id="loading"></div>')	
		}
		if(n){
			$('#loading').show();	
		}else{
			$('#loading').hide();	
		}
	},
	checkLoad:function(data){
		var count=[];
		$.each(data,function(i,d){
			$('<img />').attr('src',d.Path).bind('load',function(){
				count.push(1);
				if(count.length==_diy.data_cur.length){
					_diy.loading(0)
				}	
			})	
		})	
	},
	updataView:function(){
		_diy.loading(1);
		_diy.data_cur=[];
		if(_diy.data_all){
			$.each(_diy.data_all.AccPic,function(i,d){
				if(d.Orientation==_diy.angle.cur){
					_diy.data_cur.push(d)	
				}	
			});
			$.each(_diy.data_all.FacePic,function(i,d){
				if(d.Orientation==_diy.angle.cur){
					_diy.data_cur.push(d)	
				}	
			});
			$.each(_diy.data_all.HeelPic,function(i,d){
				if(d.Orientation==_diy.angle.cur){
					_diy.data_cur.push(d)	
				}	
			});
		}
		_diy.checkLoad(_diy.data_cur);//检测图片加载完毕关闭loading
		return _diy.data_cur;
	},
	ng:function(){
		var module=angular.module('mod', []);
		module.controller('ctrl_1', function($scope, $http) {
			
			//获取基本款
			$http.jsonp(_diy.api+'Web/Online/GetBaseModelInfo?baseModelId='+_diy.id+'&callback=JSON_CALLBACK').success(function(d){
				_diy.data_all=d;//同步商品数据
				$scope.base=_diy.updataView();
			});
			
			//获取鞋面数据
			$http.jsonp(_diy.api+'Web/Online/GetMaterialsList?baseModelId='+_diy.id+'&type=1&callback=JSON_CALLBACK').success(function(d){
				$scope.vamp=d;
			});
			
			//获取鞋根数据
			$http.jsonp(_diy.api+'Web/Online/GetMaterialsList?baseModelId='+_diy.id+'&type=2&callback=JSON_CALLBACK').success(function(d){
				$scope.heel=d;
			});
			
			//获取配饰数据
			$http.jsonp(_diy.api+'Web/Online/GetMaterialsList?baseModelId='+_diy.id+'&type=3&callback=JSON_CALLBACK').success(function(d){
				$scope.adorn=d;
			});
			
			//获取尺码数据
			$http.jsonp(_diy.api+'Web/Online/GetModelSize?callback=JSON_CALLBACK').success(function(d){
				$scope.size=d;
			});
			
			//材质切换
			$('.tabTit').on('click','li',function(){
				$(this).addClass('cur').siblings().removeClass('cur');
				$(this).children('input')[0].checked=true;
				$(this).parents('.cat').find('.tabLayer ul').eq($(this).index()).siblings().addClass('ng-hide').end().removeClass('ng-hide');
				$('#opt').mCustomScrollbar('update');	
			});
			
			//颜色配饰切换
			$('.tabLayer').on('click','li',function(){
				$(this).addClass('cur').siblings().removeClass('cur');	
				$(this).children('input')[0].checked=true;
			})
			$scope.selectColor=function(id,data){
				switch(id){
					case 'vamp':
						_diy.data_all.FacePic=data;
					break;
					case 'heel':
						_diy.data_all.HeelPic=data;
					break;
					case 'adorn':
						_diy.data_all.AccPic=data;
					break;	
				}
				$scope.base=_diy.updataView();
			}
			
			//完成
			$scope.save=function(){
				alert($('#myform').serialize())	
			}
			
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
				$scope.base=_diy.updataView();
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
	//HTML5图片合成
	h5Canvas:function(callback){
		var size=500;//定义合成图片尺寸
		var data={
			'0':[],
			'1':[],
			'2':[],
			'3':[],
			'4':[],
			'5':[],
			'6':[],
			'7':[]
		};
		$.each(_diy.data_all.FacePic,function(i,d){//鞋面
			data[i].push(d);
		});
		$.each(_diy.data_all.HeelPic,function(i,d){//鞋跟
			data[i].push(d);	
		});
		$.each(_diy.data_all.AccPic,function(i,d){//配饰
			data[i].push(d);	
		});
		function sortNumber(a,b){
			return a.Zindex-b.Zindex
		}
		
		//合成操作
		var imgs=[];
		$.each(data,function(i,d){
			d.sort(sortNumber)//数组排序层级从小到大
			var can=document.createElement('canvas'),
			ctx=can.getContext('2d');
			can.width=size;
			can.height=size;
			ctx.fillStyle='#fff';
			ctx.fillRect(0,0,size,size);
			var count=0,len=d.length;
			function draw(){
				var img=new Image();
				img.crossOrigin = 'Anonymous'; //解决跨域
				img.src=d[count].Path;
				img.onload=function(){
					ctx.drawImage(img,0,0,size,size);
					count++;
					if(count==len){
						window.open(can.toDataURL('image/jpeg',5))
						imgs.push(can.toDataURL('image/jpeg',5));
						if(imgs.length==8){
							alert('合成完毕！');
							if(typeof callback == 'function'){
								callback(imgs);
							}	
						}
					}else{
						draw();//递归
					}
				}
			}
			draw();
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
					$('.Highlight').remove();
				},500)
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
				$.each(_diy.data_cur,function(i, e) {
					d.push({imgurl:e.Path,cn:e.Name,zindex:e.Zindex})
				})
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
