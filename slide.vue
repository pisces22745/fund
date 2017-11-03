<template>
    <div class="m-button" :ref="name">
        <div class="m-button-origal">{{origalMsg}}</div>
        <div class="m-button-result">{{resultMsg}}</div>
        <div class="m-button-slide">
            <i class="iconfont icon-arrow-right"></i>
        </div>
    </div>
</template>
<script type="es6">
    export default {
        data() {
            return {}
        },
        props: ['callBack', 'origalMsg', 'resultMsg', 'name'],
        mounted() {
            var vm = this
            var mButton = this.$refs[this.name];
            var children = mButton.childNodes
            var slide = children[4];
            var mSuccess = children[2];
            slide.addEventListener('touchstart', function (e) {
                e.preventDefault()
                var _this = this
                var diffX = e.changedTouches[0].clientX - slide.offsetLeft; //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
                var left = 0;
                window.addEventListener('touchmove', move, false);
                window.addEventListener('touchend', end, false);

                function move(e) {
                    left = e.changedTouches[0].clientX - diffX;
                    //控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
                    if (left < 0) {
                        left = 0;
                    } else if (left > mButton.clientWidth - slide.offsetWidth) {
                        left = mButton.clientWidth - slide.offsetWidth;
                    }
                    //移动时重新得到物体的距离，解决拖动时出现晃动的现象
                    slide.style.left = left + 'px';
                    mSuccess.style.width = left + slide.clientWidth + 'px'
                }

                function end(e) { //当鼠标弹起来的时候不再移动
                    e.preventDefault()
                    window.removeEventListener('touchmove', move, false)
                    window.removeEventListener('touchend', end, false)
                    if (left === mButton.clientWidth - slide.offsetWidth) {
                        // 请求
                        if (!vm.callBack()) {
                            _this.setAttribute('class', 'm-button-slide transition')
                            mSuccess.setAttribute('class', 'm-button-result transition')
                            _this.style.left = 0
                            mSuccess.style.width = 0
                            setTimeout(function () {
                                _this.setAttribute('class', 'm-button-slide')
                                mSuccess.setAttribute('class', 'm-button-result')
                            }, 200)
                        }
                    } else {
                        _this.setAttribute('class', 'm-button-slide transition')
                        mSuccess.setAttribute('class', 'm-button-result transition')
                        _this.style.left = 0
                        mSuccess.style.width = 0
                        setTimeout(function () {
                            _this.setAttribute('class', 'm-button-slide')
                            mSuccess.setAttribute('class', 'm-button-result')
                        }, 200)
                    }
                }
            }, false);
        }
    }
</script>
<style scoped lang="less">
    .m-button {
        position: relative;
        height: 40px;
        border-radius: 20px;
        background-color: #f3f3f3;
        overflow: hidden;
        -webkit-user-select: none;
        user-select: none;

        .m-button-origal {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            line-height: 40px;
            border-radius: 20px;
            text-align: center;
        }

        .m-button-result {
            position: absolute;
            top: 0;
            height: 100%;
            line-height: 40px;
            border-radius: 20px;
            background-color: #78c430;
            color: #fff;
            text-align: center;
        }

        .m-button-slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 80px;
            height: 40px;
            background-color: #ff6011;
            border-radius: 20px;
            cursor: pointer;
            text-align: center;
            line-height: 40px;
            color: #fff;
        }

        .m-button-slide.success {
            left: auto;
            right: 0;
        }

        .m-button-slide.error {
            left: 0;
            right: auto;
        }

    }

    .transition {
        transition: all .2s;
    }

</style>


