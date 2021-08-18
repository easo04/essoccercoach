<template>
    <div class="menu-actions">
        <div class="btn-show-actions">
            <button @click="setShowOptions()" :class="customClass" id="menu-actions">
                <font-awesome-icon :icon="['fas', 'ellipsis-v']"/>
            </button>
        </div>
        <div class="options-action" v-if="showOptions">
            <slot name="content-options"></slot>
        </div>
    </div>
</template>
<script>
const ACTION_SLOT = 'menu-actions';
export default {
    props:['customClass'],
    data(){
        return{
            showOptions:false
        }
    },
    methods:{
        setShowOptions(){
            this.$root.$emit('close-all-selects', ACTION_SLOT);
            this.showOptions = !this.showOptions;
        }
    },
    mounted(){
        this.$root.$on('close-all-selects', (action)=>{
            if(action !== ACTION_SLOT && action !== 'path'){
                this.showOptions = false;
            }
        });
    }
}
</script>
<style lang="scss">
@import '@/assets/css/variables.scss';
@import '@/assets/css/mixins.scss';

    .menu-actions{
        position: absolute;
        .btn-show-actions{
            button{
                background: transparent;
                border: none;
                cursor: pointer;
                color: $color-gris-2;
                font-size: 16px;
            }
        }
        .options-action{
            position: absolute;
            right: 0;
            color:$color-black-fonts-second;
            z-index: 99;
            background-color: #FBFBFB;
            box-shadow: 1px 1px 4px 1px rgba(201, 201, 201, 0.25);
            border:1px solid rgba(201, 201, 201, 0.25);
            border-radius: 5px;
            >div{
                cursor: pointer;
                @include font-xm-mbold;
                padding: 8px 20px;
                font-family: $font-family-text;
                color:$color-black-fonts-second;
                text-align: center;
                &:hover{
                    background-color: #D4EEF1;
                }
                &:not(:last-child){
                    border-bottom:1px solid $color-border-designer;
                }
            }
        }
    }
</style>