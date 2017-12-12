<!--    使用方法
trigger 成功触发
close 取消触发
<password title="请输入原口令" warning="关闭后，您查看“工资单”无需验证安全口令" v-if="popupFlag" v-on:trigger=""
              v-on:close="cancelCloseSecurityPwd"></password>
-->
<template>
    <transition name="fade">
        <div class="pwd-box-wrap">
            <div class="pwd-box">
                <div class="box-title clearfix">
                    <span class="fl">{{title}}</span>
                    <i class="iconfont icon-cross fr" @click="cancel"></i>
                </div>
                <div class="box-middle">
                    <input type="tel" maxlength="6" class="pwd-input" v-model="pwd" ref="pwd">
                    <div class="fake-box clearfix" ref="fakeBox">
                        <input type="password" readonly="" v-model="pwdPart[0]">
                        <input type="password" readonly="" v-model="pwdPart[1]">
                        <input type="password" readonly="" v-model="pwdPart[2]">
                        <input type="password" readonly="" v-model="pwdPart[3]">
                        <input type="password" readonly="" v-model="pwdPart[4]">
                        <input type="password" readonly="" v-model="pwdPart[5]">
                    </div>
                    <div class="loading" v-if="loading">
                        <div class="inner ball_plus">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div class="box-bottom">
                    <p>{{warning}}</p>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        /**
         * @title 密码框标题
         * @warning 一些警告信息
         */
        props: ['title', 'warning'],
        data() {
            return {
                pwd: '',
                pwdPart: [],
                loading: false
            }
        },
        watch: {
            pwd(newVal, oldVal) {
                let len = newVal.length
                let _this = this
                let fakeBoxChildren = this.$refs.fakeBox.children
                if (newVal.length < oldVal.length) {
                    for (let i = 0; i < fakeBoxChildren.length; i++) {
                        if (i >= len) {
                            this.pwdPart[i] = ''
                            break
                        }
                    }
                } else {
                    for (let i = 0; i < len; i++) {
                        this.pwdPart[i] = newVal[i]
                    }
                }
                if (len === 6) {
                    this.loading = true
                    this.$refs.pwd.blur()
                    setTimeout(function () {
                        _this.$emit('trigger', newVal)
                    }, 500)
                }
            }
        },
        methods: {
            cancel() {
                this.$emit('close', '关闭')
            }
        },
        mounted() {
            this.$refs.pwd.focus()
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .pwd-box-wrap {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9;
        background-color: rgba(0, 0, 0, .5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pwd-box {
        background-color: #fff;
        border-radius: 5px;
        padding: .12rem;
        .box-title {
            margin-bottom: .12rem;
            span {
                font-size: .14rem;
            }
        }
        .box-middle {
            width: 3rem;
            position: relative;
            border: 1px solid #9f9fa0;
            border-radius: 3px;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: .12rem;
            input[type="tel"] {
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: .48rem;
                color: transparent;
                padding: 0 .25rem;
                border: none;
                font-size: .18rem;
                opacity: 0;
                z-index: 1;
                letter-spacing: .41rem;
            }
            .fake-box input {
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                width: .5rem;
                height: .48rem;
                border: none;
                border-right: 1px solid #e5e5e5;
                text-align: center;
                font-size: .3rem;
                display: block;
                float: left;
            }
            .fake-box input:nth-last-child(1) {
                border: none;
            }
        }
        .box-bottom {
            p {
                color: #999;
            }
        }
        .loading {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(0, 0, 0, .5);
        }
    }
</style>
