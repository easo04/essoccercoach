<template>
    <div class="message" :class="customStyle" v-if="showMessage">
        <div>{{message}}</div>
        <div class="close" @click="close()"><font-awesome-icon :icon="['fas', 'times']"/></div>
    </div>
</template>
<script>
export default {
    props:['message', 'customStyle'],
    data(){
        return{
            showMessage:true,
        }
    },
    methods:{
        close(){
            this.showMessage = false;
            this.$root.$emit('closeMessage');
        }
    },
    mounted(){
        setInterval(()=>{
            this.close();
        }, 3 * 1000);
    }
}
</script>
<style lang="scss">
@import '@/assets/css/variables.scss';
@import '@/assets/css/mixins.scss';
    .message{
        padding: 20px;
        @include font-xm;
        color:$color-black-fonts;
        font-family: $font-family-text;
        border-radius: 5px;
        position: relative;
        &.succes{
            background-color: #7ADDB0;
            color:#1B9F62;
        }
        &.error{
            background-color: #F48877;
            color:#BE2D16;
        }
        .close{
            position: absolute;
            right: 10px;
            top: 10px;
            cursor:pointer;
        }
    }
</style>