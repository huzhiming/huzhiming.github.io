/**
 * List the commonly used js method at work
 *
 * @authors Zhiminghu (huzhiming0822@gmail.com)
 * @date    2017-03-08 22:14:24
 * @version 1.0.0
 */

!(function(window){

    // 对Date的扩展，将 Date 转化为指定格式的String
    // 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
    // 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
    // 例子：
    // (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
    // (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
    var _dataFormat = function(fmtDate,fmt) {
        var fmtDate = fmtDate || new Date();
        var o = {
            "M+": fmtDate.getMonth() + 1, //月份
            "d+": fmtDate.getDate(), //日
            "h+": fmtDate.getHours(), //小时
            "m+": fmtDate.getMinutes(), //分
            "s+": fmtDate.getSeconds(), //秒
            "q+": Math.floor((fmtDate.getMonth() + 3) / 3), //季度
            "S": fmtDate.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (fmtDate.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }


    /**
     *  JavaScript异步加载脚本并触发回调函数
     *    语法：_loadScript(url[,callback])
     *     或者 _loadScript(settings)
     *           settings支持的参数:
     *              url:脚本路径
     *              async:是否异步，默认false(HTML5)
     *              charset:文件编码
     *              cache:是否缓存，默认为true
     *              success:加载成功后执行的函数，优先执行callback。
     *    调用举例:(中括号代表可省略)
     *      loadScript(url[,callback])
     *      loadScript(settings[,callback])
     *
     * [_loadScript 异步加载脚本并触发回调函数]
     */
    var _loadScript = function (url, callback) {
        var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
            script,
            options,
            s;
        if (typeof url === "object") {
            options = url;
            url = undefined;
        }
        s = options || {};
        url = url || s.url;
        callback = callback || s.success;
        script = document.createElement("script");
        script.async = s.async || false;
        script.type = "text / javascript";
        if (s.charset) {
            script.charset = s.charset;
        }
        if (s.cache === false) {
            url = url + (/\?/.test(url) ? " & " : " ? ") + "_ = "+(new Date()).getTime();
        }
        script.src = url;
        head.insertBefore(script, head.firstChild);
        if (callback) {
            document.addEventListener ? script.addEventListener("load", callback, false) : script.onreadystatechange = function() {
                if (/loaded|complete/.test(script.readyState)) {
                    script.onreadystatechange = null
                    callback()
                }
            }
        }
    }



    //获取 url 参数值 _getQueryString("id");
    var _getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
        var context = "";
        if (r != null)
             context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    }

    //对象合并 extend(true,default,object);//深拷贝对象，后面的替换前面的
    var _extend = function() {
    　　/*
    　　*target被扩展的对象
    　　*length参数的数量
    　　*deep是否深度操作
    　　*/
    　　var options, name, src, copy, copyIsArray, clone,
    　　　　target = arguments[0] || {},
    　　　　i = 1,
    　　　　length = arguments.length,
    　　　　deep = false;
    　　// target为第一个参数，如果第一个参数是Boolean类型的值，则把target赋值给deep
    　　// deep表示是否进行深层面的复制，当为true时，进行深度复制，否则只进行第一层扩展
    　　// 然后把第二个参数赋值给target
    　　if ( typeof target === "boolean" ) {
    　　　　deep = target;
    　　　　target = arguments[1] || {};
    　　　　// 将i赋值为2，跳过前两个参数
    　　　　i = 2;
    　　}
    　　// target既不是对象也不是函数则把target设置为空对象。
    　　if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
    　　　　target = {};
    　　}
    　　// 如果只有一个参数，则把jQuery对象赋值给target，即扩展到jQuery对象上
    　　if ( length === i ) {
    　　　　target = this;
    　　　　// i减1，指向被扩展对象
    　　　　--i;
    　　}
    　　// 开始遍历需要被扩展到target上的参数
    　　for ( ; i < length; i++ ) {
    　　　　// 处理第i个被扩展的对象，即除去deep和target之外的对象
    　　　　if ( (options = arguments[ i ]) != null ) {
    　　　　　　// 遍历第i个对象的所有可遍历的属性
    　　　　　　for ( name in options ) {
    　　　　　　　　// 根据被扩展对象的键获得目标对象相应值，并赋值给src
    　　　　　　　　src = target[ name ];
    　　　　　　　　// 得到被扩展对象的值
    　　　　　　　　copy = options[ name ];
    　　　　　　　　// 这里为什么是比较target和copy？不应该是比较src和copy吗？
    　　　　　　　　if ( target === copy ) {
    　　　　　　　　　　continue;
    　　　　　　　　}
    　　　　　　　　// 当用户想要深度操作时，递归合并
    　　　　　　　　// copy是纯对象或者是数组
    　　　　　　　　if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
    　　　　　　　　　　// 如果是数组
    　　　　　　　　　　if ( copyIsArray ) {
    　　　　　　　　　　　　// 将copyIsArray重新设置为false，为下次遍历做准备。
    　　　　　　　　　　　　copyIsArray = false;
    　　　　　　　　　　　　// 判断被扩展的对象中src是不是数组
    　　　　　　　　　　　　clone = src && jQuery.isArray(src) ? src : [];
    　　　　　　　　　　} else {
    　　　　　　　　　　　　// 判断被扩展的对象中src是不是纯对象
    　　　　　　　　　　　　clone = src && jQuery.isPlainObject(src) ? src : {};
    　　　　　　　　　　}
    　　　　　　　　　　// 递归调用extend方法，继续进行深度遍历
    　　　　　　　　　　target[ name ] = jQuery.extend( deep, clone, copy );

    　　　　　　　　// 如果不需要深度复制，则直接把copy（第i个被扩展对象中被遍历的那个键的值）
    　　　　　　　　} else if ( copy !== undefined ) {
    　　　　　　　　　　target[ name ] = copy;
    　　　　　　　　}
    　　　　　　}
    　　　　}
    　　}
    　　// 原对象被改变，因此如果不想改变原对象，target可传入{}
    　　return target;
    }

    // lazyload(); //页面载入完毕加载可是区域内的图片
    // window.onscroll = lazyload;
    // <img src="" data-src="" err-src="" alt="">
    //图片懒加载
    var _lazyload = function () { //监听页面滚动事件
        var num = document.getElementsByTagName('img').length;
        var img = document.getElementsByTagName("img");
        var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历

        var seeHeight = document.documentElement.clientHeight; //可见区域高度
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
        for (var i = n; i < num; i++) {
            if (img[i].offsetTop < seeHeight + scrollTop) {
                if (img[i].getAttribute("src") == "default.jpg") {
                    img[i].src = img[i].getAttribute("data-src");
                }
                n = i + 1;
                
                if (img[i].getAttribute("src")==="") {
                    img[i].src = img[i].getAttribute("err-src");
                }
                img[i].onerror = function(){
                    img[i].src = img[i].getAttribute("err-src");
                }
            }
        }
    }
    //去除首尾空格 ' ss ll ' => 'ss ll'
    var _trim = function(str){
        if(String.prototype.trim){
            return str == null ? "" : String.prototype.trim.call(str);
        }else{
            return str.replace(/(^\s*)|(\s*$)/g, "");
        }
    }
    //去除全部空格 ' ss ll ' => 'ssll'
    var _trimAll = function(str){
        return str.replace(/\s*/g,'');
    }
    
    function Common(){}
    Common.prototype = {
        constructor:Common,
        lazyload:_lazyload,//图片懒加载
        extend:_extend,//对象合并，未完全脱离jquery
        getQueryString:_getQueryString,//获取url上的参数值
        loadScript:_loadScript,//异步加载脚本文件
        dataFormat:_dataFormat,//时间格式化
        trim:_trim,//去除首尾空格
        trimAll:_trimAll,//去除全部空格
    }
    var common = new Common();
    window.common = common;
})(window,undefined);
