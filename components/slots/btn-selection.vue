<template>
    <div class="btn-selection">
        <button id="btn-selections" class="btn btn-default" @click="setShowListItems()">{{label}} 
            <span><font-awesome-icon :icon="['fas', 'sort-down']"/></span>
        </button>
        <div class="select-items selects" v-if="showListItems">
            <slot name="content-items"></slot>
        </div>
    </div>
</template>
<script>
const ACTION_SLOT = 'btn-selections';
export default {
    props:['label'],
    data(){
        return{
            showListItems:false
        }
    },
    methods:{
        setShowListItems(){
            this.$root.$emit('close-all-selects', ACTION_SLOT);
            this.showListItems = !this.showListItems;
        }
    },
    mounted(){
        this.$root.$on('close-all-selects', (action)=>{
            if(action !== ACTION_SLOT && action !== 'path'){
                this.showListItems = false;
            }
        });
    }
}
</script>
<style lang="scss">
@import '@/assets/css/variables.scss';
@import '@/assets/css/mixins.scss';

    .btn-selection{

        .btn{
            margin: 20px;
        }
        
        .select-items{
            position: absolute;
            right: 20px;
            top:62px;
            border-radius: 5px;     
            background-color: #FBFBFB;
            box-shadow: 1px 1px 4px 1px rgba(201, 201, 201, 0.25);
            border:1px solid rgba(201, 201, 201, 0.25);
            z-index: 40;
            width: auto;
            >div{
                cursor: pointer;
                @include font-xm-mbold;
                padding: 8px 20px;
                font-family: $font-family-text;
                color:$color-black-fonts-second;
                text-align: center;
                text-transform: capitalize;
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