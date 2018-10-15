<template>
    <div>
        <div>
             <h1 @click="generateImg">我的二维码</h1>
             <div class="qr-code-wrapper">
                 <div class="qr-code" ref="qr-code">
                     <div class="logo-wrapper">
                      <img src="../assets/qr-logo.jpg" />
                     </div>
                 </div>
                      
             </div>
        </div>
         
    </div>
</template>

<style>

html{
    height:100%;
    background:lightslategray;
}

 .qr-code-wrapper{
     margin:0 auto;
     display: flex;
     justify-content: center;
 }
 .qr-code{
     position:relative;
     padding:20px;
     background:white;
 }
 .logo-wrapper{
     position:absolute;
     left:50%;
     top:50%;
     transform: translate(-50%, -50%);
 }
 .logo-wrapper img{
     width:50px;
     height:50px;
 }


</style>


<script>


import html2canvas from 'html2canvas';
    export default {
        data () {
            return{
                codeImg:'小嘴巴'
            }
        },
        created () {

        },
        mounted () {
            this.$nextTick(() =>{
                this.generateImg();
            });
            
            
        },
        methods: {
            generateImg () {
                html2canvas(document.querySelector(".qr-code")).then(canvas => {
                document.body.appendChild(canvas);
});
                
            }
        }
    }
</script>
