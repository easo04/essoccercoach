<template>
    <div class="onglets">
        <div class="options-onglets">
            <div class="option-item" v-for="(option, index) in options" :key="index" :class="{'active' : optionActivitySelected === 'details'}" @click="setOptionsActivity(option.name)">
                <div>
                    <slot name="option" :option="option">
                        <span class="icon"><font-awesome-icon :icon="['fas', option.icon]"/></span>
                        <div class="label">{{option.label}}</div>
                    </slot>
                </div>
            </div>
        </div>
        <div class="content-options">   
            <slot name="content"></slot>
        </div>
    </div>
</template>
<script>
export default {
    props:['options'],
    data(){
        return{
            optionActivitySelected:this.options[0].name
        }
    },
    methods:{
        setOptionsActivity(option){
            this.optionActivitySelected = option;
        }
    }
}
</script>