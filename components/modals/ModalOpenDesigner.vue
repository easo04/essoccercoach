<template>
    <div class="modal-open-designer modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Conseils pour bien démarrer</h3></div>
        </div>
        <div class="modal-content">
            <Slider :lst-slides="lstSlides" :show-text-top="true" :current-index="currentIndex"/>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <a @click="hide()" class="link">Passer les astuces</a>
                <button class="btn btn-default" @click="next()">{{btnNextLabel}}</button>
            </div>
        </div>
    </div>
</template>
<script>
import Slider from '../Slider.vue';
import {lstSlidersModalOpenDesigner as lstSliders} from '@/static/sliders-list.js';
export default {
    components: { Slider },
    data(){
        return{
            lstSlides : [],
            currentIndex: 0,
            btnNextLabel:'Suivant'
        }
    },
    methods:{
        hide () {
            this.$modal.hide('open-designer-modal');
        },
        next() {
            if(this.currentIndex < this.lstSlides.length -1){
                this.currentIndex++;
            }else{
                this.hide();
            }

            if(this.currentIndex === this.lstSlides.length - 1){
                this.btnNextLabel = 'Commencez'
            }
        }
    },
    created(){
        this.lstSlides = lstSliders;
    }
}
</script>