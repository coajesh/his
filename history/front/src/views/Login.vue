<template>
    <div id="App">
    <div id="building">
        <div id="loginBox">
            <div id="login">
                <h1>系统登陆</h1>
                <div class="form">
                <div class="item">
                    <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                    <input type="text" placeholder="Username" name="userName" id="userName"><br/>
                    <i class="fa fa-key" aria-hidden="true"></i>
                    <input type="password" placeholder="Password" name="userPassword" id="userPassword">
                </div>
                </div>
                <button id="btn" @click="login">Login</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: "App",
    methods:{
        login(){
            this.$router.push('/basic');
        }
    }
}
</script>

<style scoped>
    @import '../assets/font-awesome-4.7.0/css/font-awesome.min.css';
    #building{
        background-image: url('../assets/img/login_bg.png');
        width:100%;
        height:100%;
        position:fixed;
        background-size:100% 100%;
    }

    #App {
        margin-top: 0px;
    }

    #loginBox {
        width: 30%;
        height: auto;
        margin: auto;
        margin-top: 230px;
        text-align: center;
        background: #00000080;
        padding: 20px 50px;
        color: white;
        box-shadow: 0px 0px 10px 6px rgba(0,0,0,0.3);
    }

    #loginBox .form{
        margin-top: 50px;
    }
    #loginBox .form .item{
        margin-top: 15px;
    }
    #loginBox .form .item i{
        font-size: 18px;
        color: white;
    }

    #loginBox .form .item input{
        width: 270px;
        font-size: 130%;
        border: 0;
        border-bottom:2px solid white;
        padding: 7px;
        background: #ffffff00;
        color: white;
    }
    #loginBox button{
        margin-top: 28px;
        width: 200px;
        height: 40px;
        font-size: 20px;
        font-weight: 700;
        color:white;
        background-image: linear-gradient(-20deg,#3C3C3C 0%,#46A3FF 100%);
        border: 0;
        border-radius: 20px;
    }
</style>