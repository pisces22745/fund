var fund = {
    // 判断用户设备
    browserRedirect: function () {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) === "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) === "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) === "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) === "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) === "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) === "android";
        var bIsCE = sUserAgent.match(/windows ce/i) === "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) === "windows mobile";
        document.writeln("您的浏览设备为：");
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            document.writeln("phone");
        } else {
            document.writeln("pc");
        }
    },
    kilo: function (num) {  // 千分符（我的）
        let [temp, tempStr, strArray, str] = [[], '', num.toString().split('.'), strArray[0]]
        str = str.split('').reverse()
        for (let i = 0; i < str.length; i++) {
            if ((i + 1) % 3 === 0 && i + 1 !== str.length) {
                temp.push(str[i])
                temp.push(',')
            } else {
                temp.push(str[i])
            }
        }
        tempStr = temp.reverse().join('')
        if (strArray.length > 1) {
            tempStr = tempStr + '.' + strArray[1]
        }
        return tempStr
    },
    kiloElegence: function formatCash(str) {    //优雅地实现千分符
        return str.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev
        })
    },
    kiloReg: function (str) {   // 正则千分符
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    Arabia_To_SimplifiedChinese: function (Num) {   // 数值转文字读法
        for (let i = Num.length - 1; i >= 0; i--) {
            Num = Num.replace(',', '')//替换Num中的“,”
            Num = Num.replace(' ', '')//替换Num中的空格
        }
        if (isNaN(Num)) { //验证输入的字符是否为数字
            //alert('请检查小写金额是否正确');
            return
        }
        //字符处理完毕后开始转换，采用前后两部分分别转换
        let part = String(Num).split('.')
        let returnChar = ''
        //小数点前进行转化
        for (let i = part[0].length - 1; i >= 0; i--) {
            if (part[0].length > 10) {
                //alert('位数过大，无法计算')
                return ''
            }//若数量超过拾亿单位，提示
            let tmpnewchar = ''
            let perchar = part[0].charAt(i)
            switch (perchar) {
                case '0':
                    tmpnewchar = '零' + tmpnewchar
                    break
                case '1':
                    tmpnewchar = '一' + tmpnewchar
                    break
                case '2':
                    tmpnewchar = '二' + tmpnewchar
                    break
                case '3':
                    tmpnewchar = '三' + tmpnewchar
                    break
                case '4':
                    tmpnewchar = '四' + tmpnewchar
                    break
                case '5':
                    tmpnewchar = '五' + tmpnewchar
                    break
                case '6':
                    tmpnewchar = '六' + tmpnewchar
                    break
                case '7':
                    tmpnewchar = '七' + tmpnewchar
                    break
                case '8':
                    tmpnewchar = '八' + tmpnewchar
                    break
                case '9':
                    tmpnewchar = '九' + tmpnewchar
                    break
            }
            switch (part[0].length - i - 1) {
                case 0:
                    tmpnewchar = tmpnewchar
                    break
                case 1:
                    if (perchar != 0) tmpnewchar = tmpnewchar + '十'
                    break
                case 2:
                    if (perchar != 0) tmpnewchar = tmpnewchar + '百'
                    break
                case 3:
                    if (perchar != 0) tmpnewchar = tmpnewchar + '千'
                    break
                case 4:
                    tmpnewchar = tmpnewchar + '万'
                    break
                case 5:
                    if (perchar != 0) tmpnewchar = tmpnewchar + '十'
                    break
                case 6:
                    if (perchar != 0) tmpnewchar = tmpnewchar + '百'
                    break
                case 7:
                    if (perchar != 0) tmpnewchar = tmpnewchar + '千'
                    break
                case 8:
                    tmpnewchar = tmpnewchar + '亿'
                    break
                case 9:
                    tmpnewchar = tmpnewchar + '十'
                    break
            }
            returnChar = tmpnewchar + returnChar
        }
        //替换所有无用汉字，直到没有此类无用的数字为止
        while (returnChar.search('零零') != -1 || returnChar.search('零亿') != -1 || returnChar.search('亿万') != -1 || returnChar.search('零万') != -1) {
            returnChar = returnChar.replace('零亿', '亿')
            returnChar = returnChar.replace('亿万', '亿')
            returnChar = returnChar.replace('零万', '万')
            returnChar = returnChar.replace('零零', '零')
        }
        //替换以“一十”开头的，为“十”
        if (returnChar.indexOf('一十') == 0) {
            returnChar = returnChar.substr(1)
        }
        //替换以“零”结尾的，为“”
        if (returnChar.lastIndexOf('零') == returnChar.length - 1) {
            returnChar = returnChar.substr(0, returnChar.length - 1)
        }
        return returnChar
    },
    randomString: function () {
        return Math.random().toString(16).substring(2) // 13位
    },
    toNumber: function (str) {
        return +str
    },
    arrayDuplicate: function (array) {
        return [...new
        Set(array)
        ]
    },
    getMax: function (numbers) {    //取出一个数组中的最大值
        return Math.max.apply(Math, numbers);
    },
    getMin(numbers) {//取出一个数组中的最小值
        return Math.min.apply(Math, numbers);
    },
    reg: function () {
        return {
            mobile: /^(13|14|15|17|18)[0-9]{9}$/    // 手机号验证正则
        }
    },
    scrollTop: function () {    // 滚动到顶部
        (function smoothscroll() {
            let currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)));    // ie下 滚动如果是1.6，则实际滚动2，使用math.floor防止出现死循环
            }
        })()
    },
    setStore: (name, content) => {  // localstorage操作
        if (!name)
            return
        if (typeof content !== 'string') {
            content = JSON.stringify(content)
        }
        window.localStorage.setItem(name, content)
    },
    getStore: name => {
        if (!name) return
        return window.localStorage.getItem(name)
    },
    removeStore: name => {
        if (!name) return
        window.localStorage.removeItem(name)
    },
    downloadExcel: () => {
        var url = 'test1.xlsx'; // 请求地址
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true); // 也可以使用POST方式，根据接口
        xhr.responseType = "blob"; // 返回类型blob
        // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
        xhr.onload = function() {
            // 请求完成
            if(this.status === 200) {
                // 返回200
                var blob = this.response;
                var reader = new FileReader();
                reader.readAsDataURL(blob); // 转换为base64，可以直接放入a表情href
                reader.onload = function(e) {
                    // 转换完成，创建一个a标签用于下载
                    var a = document.createElement('a');
                    a.download = 'data.xlsx';
                    a.href = e.target.result;
                    $("body").append(a); // 修复firefox中无法触发click
                    a.click();
                    $(a).remove();
                }
            }
        };
        // 发送ajax请求
        xhr.send()
    }
}