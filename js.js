
//加载js就初始化initData() 判断读取导航链接
var initdata=initData();
//紧接着使用initdata返回的键盘和导航链接，初始化布局div、kbd、button
initMain(initdata["keys"],initdata["hash"]);
//监听用户按键触发则打开网站
document.onkeypress = function(xzkjcnxlkcjlk){
    var keypress = xzkjcnxlkcjlk['key'];
    var website = initdata["hash"][keypress];
    if(website!=null){
        anime(keypress,"normal_anime");
        setTimeout(
            function () {
                window.open('http://'+website, '_blank');
                cancle_anime(keypress);
            }
            ,1000);
    }else{
        anime(keypress,"error_anime");
        //alert("按键 "+keypress.toUpperCase()+" 未设置网站链接");
        cancle_anime(keypress);
    }

}


function initData(){
    //键盘布局keys初始化
    var keys = {
        0: {0:'q',1:'w',2:'e',3:'r',4:'t',5:'y',6:'u',7:'i',8:'o',9:'p',"length":10},
        1: {0:'a',1:'s',2:'d',3:'f',4:'g',5:'h',6:'j',7:'k',8:'l',"length":9},
        2: {0:'z',1:'x',2:'c',3:'v',4:'b',5:'n',6:'m',"length":7},
        "length":3
    }
    //默认导航link初始化
    var hash = {'q': 'qq.com', 'w': 'weibo.com', 'e': 'ele.me', 'r': 'renren.com', 't': 'tianya.com', 'y': 'youtube.com', 'u': 'uc.com' , 'i': 'iqiyi.com', 'o': 'opera.com', 'p': "pixiv.net", 'a': 'acfun.tv', 's': 'sohu.com', 'z': 'zhihu.com', 'm': 'www.mcdonalds.com.cn'};

    //检测localstorage是否存在导航link记录,存在就替换导航link
    var storage_hash=JSON.parse(localStorage.getItem("link") || 'null');
    //判断localstorage有没有存储过
    if(storage_hash!=null){
        //已存储过，获取存储信息更新到hash
        hash=storage_hash;
        console.log("已访问用户，导航链接已加载");
        console.log(hash);
    }else{
        //未存储过
        console.log("第一次访问，导航链接为默认");
    }
    //返回keys，hash
    return {"keys":keys,"hash":hash};
}


function initMain(key,link){
    //循环keys[]共三行
    for(var i=0;i<key.length;i++){
        //创建div元素命名为row
        var row=document.createElement("div");
        //添加row元素到main元素下
        mains.appendChild(row);
        //循环keys[row]按键
        for(var j=0;j<key[i].length;j++){
            //创建kbd元素命名为kbd
            var kbd=document.createElement("kbd");
            //给kbd添加class为keys[row][x]
            kbd.className=key[i][j];
            //给kbd添加文本为keys[row][x]
            kbd.textContent=key[i][j];
            //添加kbd元素到row[i]元素下
            row.appendChild(kbd);
            //创建button元素命名为btn
            var btn=document.createElement("button");
            //给btn元素添加id为keys[row][x]
            btn.id=key[i][j];
            //给btn元素添加文本内容
            btn.textContent = 'Click Edit';
            //给btn元素添加onlick事件
            btn.onclick = function(xzkjcnxlkcjlk){
                //获取按下的按键对应id
                var text_key = xzkjcnxlkcjlk['target']['id'];
                //请求用户输入新网页
                var text_link = prompt(text_key+'键，请输入网址') 
                //将新网页更新到hash
                initdata["hash"][text_key] = text_link ;
                //将新hash更新到localstorage
				localStorage.setItem('link', JSON.stringify(initdata["hash"]))
            }
            //添加btn元素到row元素下
            kbd.appendChild(btn);
        }
    }
}


function anime(keypress,anime){
   var key= document.getElementById(keypress);
   key.parentNode.style.animation=anime+" 2s infinite";
   key.parentNode.style.animationIterationCount=1;
  // key.parentNode.style.WebkitAnimation = "anime 1s infinite"; // 针对 Chrome 和 Safari 的代码
}

function cancle_anime(keypress){
    var key= document.getElementById(keypress);
    setTimeout(
        function () {
            key.parentNode.style.animation="";
            key.parentNode.style.animationIterationCount=0;
        }
        ,1000);

 }

 checklink.onclick=function (e){
    if(e.target.attributes.status.value=="0"){
        e.target.attributes.status.value="1";
        e.target.innerText="取消高亮";
        for(var key in initdata["hash"]) {  
            length++;  
            var keys= document.getElementById(key);
            keys.parentNode.style.backgroundColor="#15ff009d";
        }  
        console.log(initdata["hash"]);
        console.log(length);
    }else{
        e.target.attributes.status.value="0";
        e.target.innerText="高亮已绑定网站的按键";
        for(var key in initdata["hash"]) {  
            var keys= document.getElementById(key);
            keys.parentNode.style.backgroundColor="";
        }  
    }

 }
 reset.onclick=function (e){
     localStorage.removeItem("link");
     location.reload();
 }
 