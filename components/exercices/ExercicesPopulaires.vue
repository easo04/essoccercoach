<template>
    <div class="carousel exercices-carrousel">
        <button class="btn previous" v-if="showPrevious" id="btn-previous" @click="previous()">
            <font-awesome-icon :icon="['fas', 'angle-left']"/>
        </button>
        <div class="content-exercices">
            <div class="exercices">
                <div class="carousel-cell exercice-item" v-for="(exercice, index) in exercices" :key="index" @click="goToDetails(exercice)">
                    <div class="image-exercice-item">
                        <img src="@/assets/images/exercice_essoccercoach.png"/>
                    </div>
                    <div class="description-exercice-item">
                        <h4>{{exercice.title}}</h4>
                    </div>
                </div>
            </div>
        </div>
        <button class="btn next" v-if="showNext" id="btn-next" @click="next()">
            <font-awesome-icon :icon="['fas', 'angle-right']"/>
        </button>
    </div>
</template>
<script>
const EXERCICES_PER_PAGE = 4;
const NB_MAXIMUN_EXERCICES = 8;
export default {
    props:['exercices'],
    data(){
        return{
            showPrevious:false,
            showNext:true,
            lastIndexExercice:EXERCICES_PER_PAGE,
            
        }
    },
    methods:{
        next(){
            let content = document.querySelector('.content-exercices');
            //let exercices = document.querySelectorAll('.exercice-item');
            content.scrollLeft += content.offsetWidth;
            
            /*this.lastIndexExercice += EXERCICES_PER_PAGE;

            if(this.lastIndexExercice === NB_MAXIMUN_EXERCICES){
                this.showNext = false;
                this.lastIndexExercice = EXERCICES_PER_PAGE;
            }*/

            this.showPrevious = true;

        },
        previous(){
            let content = document.querySelector('.content-exercices');
            //let exercices = document.querySelectorAll('.exercice-item');
            content.scrollLeft -= content.offsetWidth;
            
            /*this.lastIndexExercice -= EXERCICES_PER_PAGE;
            
            if(this.lastIndexExercice === EXERCICES_PER_PAGE){
                this.showPrevious = false;
            }*/
            
            this.showNext = true;
        },
        goToDetails(exercice){
            let titleFormatted = exercice.title.toLowerCase().split(' ').join('-');
            this.$router.push({path:`/exercices/${exercice.id}-${titleFormatted}`})
        },
    },
    mounted(){

    }
}
</script>
