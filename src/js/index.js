/**
 * @author H.Yvonne
 * @create 2015.7.20
 * page data
 */
(function(root,$,factory){
	if(typeof define === 'function' && (define.cmd || define.amd)){
		define(function(){
			return factory(root,$);
		});
	} else {
		root.Page = factory(root,$);
	}
})(window,$,function(root,$){
	var Page = function(config){
		config = config || {};
		var o;
		for(o in config){
			this[o] = config[o];
		}
		this.init();
	};

	/*config*/
	$.extend(Page.prototype,{
		warp : '',
		total : 0,
		pagesize : 0,
		pageArr : [],
		type : 'page',
		classname : '.page',
		callback : ''
	});

	$.extend(Page.prototype,{
		init : function(){
			var _self = this;
			_self.cpage = !_self.cpage?1:_self.cpage;
			_self.tpage = Math.ceil(_self.total/_self.pagesize);
			_self.renderPage();
			_self.pageClick();
		}
	});

	$.extend(Page.prototype,{
		renderPage : function(){
			var _self = this;
			if(_self.type == 'page'){
				var html = juicer(_self.pageTpl(),_self.pushData());
			} else {
				var html = juicer(_self.moreTpl(),_self.moreflag());
			}
			_self.warp.html(html);
		}
	});

	/*click function*/
	$.extend(Page.prototype,{
		pageClick : function(){
			var _self = this;
			_self.warp.on('click',_self.classname,function(){
				_self.cpage = $(this).attr('page-data') | 0;
				_self.renderPage();
				if(typeof _self.callback === 'function') _self.callback(_self.cpage);
			});
		}
	});

	/*page array*/
	$.extend(Page.prototype,{
		pushData : function(){
			var _self = this;
			_self.pageArr = [];
			if(_self.tpage <= 1) return false;
			if(_self.cpage > 1){
				_self.pageArr.push({pnum:_self.cpage-1,link:false,type:'pro'});
			}
			if(_self.tpage <= 10){
				for(var i=1;i<=_self.tpage;i++){
					if(i==_self.cpage){
						_self.pageArr.push({pnum:i,link:false,type:'pnum'});
					}else{
						_self.pageArr.push({pnum:i,link:true,type:'pnum'});
					}
				}
			} else if(_self.tpage > 10){
				if(_self.cpage <= 5){
					for(var i = 1;i<=7;i++){
						if(_self.cpage == i){
							_self.pageArr.push({pnum:i,link:false,type:'pnum'});
						} else {
							_self.pageArr.push({pnum:i,link:true,type:'pnum'});
						}
					}
					_self.pageArr.push({pnum:0,link:true,type:'ellipsis'});
					_self.pageArr.push({pnum:_self.tpage-1,link:true,type:'pnum'});
					_self.pageArr.push({pnum:_self.tpage,link:true,type:'pnum'});
				} else if(_self.cpage > 5 && (_self.cpage+5) <= _self.tpage){
					_self.pageArr.push({pnum:1,link:true,type:'pnum'});
					_self.pageArr.push({pnum:2,link:true,type:'pnum'});
					_self.pageArr.push({pnum:0,link:true,type:'ellipsis'});
					_self.pageArr.push({pnum:_self.cpage-2,link:true,type:'pnum'});
					_self.pageArr.push({pnum:_self.cpage-1,link:true,type:'pnum'});
					_self.pageArr.push({pnum:_self.cpage,link:false,type:'pnum'});
					_self.pageArr.push({pnum:_self.cpage+1,link:true,type:'pnum'});
					_self.pageArr.push({pnum:_self.cpage+2,link:true,type:'pnum'});
					_self.pageArr.push({pnum:0,link:true,type:'ellipsis'});
					_self.pageArr.push({pnum:_self.tpage-1,link:true,type:'pnum'});
					_self.pageArr.push({pnum:_self.tpage,link:true,type:'pnum'});
				} else if(_self.cpage > _self.tpage-5){
					_self.pageArr.push({pnum:1,link:true,type:'pnum'});
					_self.pageArr.push({pnum:2,link:true,type:'pnum'});
					_self.pageArr.push({pnum:0,link:true,type:'ellipsis'});
					for(var i = _self.tpage-5; i <= _self.tpage; i++){
						if(_self.cpage == i){
							_self.pageArr.push({pnum:i,link:false,type:'pnum'});
						} else {
							_self.pageArr.push({pnum:i,link:true,type:'pnum'});
						}
					}
				}
			}
			if(_self.cpage != _self.tpage){
				_self.pageArr.push({pnum:_self.cpage+1,link:false,type:'next'});
			}
			var data={ list : _self.pageArr };
			return data;
		},
		moreflag : function(){
			var _self = this;
			_self.pageArr = [];
			if(_self.cpage < _self.tpage){
				_self.pageArr.push({pnum:_self.cpage,flag:'able'});
			} else {
				_self.pageArr.push({pnum:_self.cpage,flag:'disable'});
			}
			var data={ list : _self.pageArr };
			return data;
		}
	});

	/*template*/
	$.extend(Page.prototype,{
		pageTpl : function(){
			var html = '{@if list&&list.length!=0}'+
						'{@each list as it}'+
							'{@if it.type=="first"}'+
							'{@else if it.type=="pro"}'+
							'<a href="javascript:;" class="page" page-data="${it.pnum}">&lt;</a>'+
							'{@else if it.type=="pnum"}'+
								'{@if it.link}'+
								'<a href="javascript:;" class="page" page-data="${it.pnum}">${it.pnum}</a>'+
								'{@else}'+
								'<span class="page page_active">${it.pnum}</span>'+
								'{@/if}'+
							'{@else if it.type=="ellipsis"}'+
							'<span>…</span>'+
							'{@else if it.type=="next"}'+
							'<a href="javascript:;" class="page" page-data="${it.pnum}">&gt;</a>'+
							'{@else if it.type=="end"}'+
							'{@/if}'+
						'{@/each}'+
					'{@/if}';
			return html;
		},
		moreTpl : function(){
			var html = '{@if list&&list.length!=0}'+
							'{@each list as it}'+
								'{@if it.flag == "disable"}'+
								'<span class="page_loadmore">无更多内容</span>'+
								'{@else}'+
								'<a href="javascript:;" class="page_loadmore" page-data="${it.pnum+1}">加载更多</a>'+
								'{@/if}'+
							'{@/each}'+
						'{@/if}';
			return html;
		}
	});


	return function(arg){
		new Page(arg);
	}
});