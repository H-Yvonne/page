分页功能
=====
一、简介
----------
<p>支持页码分页与加载更多分页功能</p>
    
二、举例
--------
###2.1 载入基础文件
1. 加载jquery.js文件
2. &lt;script type="text/javascript" src="../src/js/index.js"&gt;&lt;/script&gt;

###2.2 Demo
Page(param);
<pre>
<code>
var arg = {
	warp : $('div.nc_news_pages'),
	total : 10,
	pagesize : 1,
	cpage : 1,
	type : 'more',
	classname : 'a.page_loadmore',
	callback : ''
}
Page(arg);
</code>
</pre>

参数说明:
<pre>
<code>
warp : 装载页面dom
total : 数据总数
pagesize : 每页数据条数
cpage : 当前页码
type : page | more, 分页类型
classname : '.page',  点击按钮类名
callback : 点击按钮后回调函数方法，可进行数据请求渲染页面
</code>
</pre>



