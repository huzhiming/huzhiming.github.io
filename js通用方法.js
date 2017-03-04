//获取网页大小 浏览器窗口的大小
function getViewport() {　　　　
    if (document.compatMode == "BackCompat") {　　　　　　
        return {　　　　　　　　
            width: document.body.clientWidth,
            height: document.body.clientHeight　　　　　　
        }　　　　
    } else {　　　　　　
        return {　　　　　　　　
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight　　　　　　
        }　　　　
    }　　
}

//下面两个函数可以用来获取绝对位置的横坐标和纵坐标。 
//对于表格和iframe中的元素不适用。
　　function getElementLeft(element){
　　　　var actualLeft = element.offsetLeft;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualLeft;
　　}
　　function getElementTop(element){
　　　　var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualTop += current.offsetTop;
　　　　　　current = current.offsetParent;
　　　　}
　　　　return actualTop;
　　}
//获取 网页元素的相对位置 ，指该元素左上角相对于浏览器窗口左上角的坐标。
function getElementViewLeft(element){
　　　　var actualLeft = element.offsetLeft;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
　　　　　　current = current.offsetParent;
　　　　}
　　　　if (document.compatMode == "BackCompat"){
　　　　　　var elementScrollLeft=document.body.scrollLeft;
　　　　} else {
　　　　　　var elementScrollLeft=document.documentElement.scrollLeft; 
　　　　}
　　　　return actualLeft-elementScrollLeft;
　　}
　　function getElementViewTop(element){
　　　　var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;
　　　　while (current !== null){
　　　　　　actualTop += current. offsetTop;
　　　　　　current = current.offsetParent;
　　　　}
　　　　 if (document.compatMode == "BackCompat"){
　　　　　　var elementScrollTop=document.body.scrollTop;
　　　　} else {
　　　　　　var elementScrollTop=document.documentElement.scrollTop; 
　　　　}
　　　　return actualTop-elementScrollTop;
　　}
//给出了一个函数,创建对象
Object.beget = function (o) {
　　　　var F = function (o) {};
　　　　F.prototype = o ;
　　　　return new F;
　　};
//创建对象时就利用这个函数，对原型对象进行操作：
var Cat = {
　　　　name:'',
　　　　saying:'meow'
　　};
　　var myCat = Object.beget(Cat);
//对象生成后，可以自行对相关属性进行赋值：
　　myCat.name = 'mimi';