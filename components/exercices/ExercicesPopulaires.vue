<template>
    <div class="carousel exercices-carrousel">
        <button class="btn previous" v-if="showPrevious" id="btn-previous" @click="previous()">
            <!--<i class="fas fa-angle-left"></i>-->
            <font-awesome-icon :icon="['fas', 'angle-left']"/>
        </button>
        <div class="content-exercices">
            <div class="exercices">
                <div class="carousel-cell exercice-item">
                    <div class="image-exercice-item"></div>
                    <div class="description-exercice-item">
                    <h4>Description exercice</h4>
                    </div>
                </div>
                <div class="carousel-cell exercice-item">
                    <div class="image-exercice-item"></div>
                    <div class="description-exercice-item">
                    <h4>Description exercice</h4>
                    </div>
                </div>
                <div class="carousel-cell exercice-item">
                    <div class="image-exercice-item"></div>
                    <div class="description-exercice-item">
                    <h4>Description exercice</h4>
                    </div>
                </div>
                <div class="carousel-cell exercice-item">
                    <div class="image-exercice-item"></div>
                    <div class="description-exercice-item">
                    <h4>Description exerciceeee</h4>
                    </div>
                </div>
                <div class="carousel-cell exercice-item">
                    <div class="image-exercice-item"></div>
                    <div class="description-exercice-item">
                    <h4>Description exercicerrr</h4>
                    </div>
                </div>
                <div class="carousel-cell exercice-item">
                    <div class="image-exercice-item"></div>
                    <div class="description-exercice-item">
                    <h4>Description exercicerrrr</h4>
                    </div>
                </div>
                <div class="carousel-cell exercice-item">
                    <div class="image-exercice-item"></div>
                    <div class="description-exercice-item">
                    <h4>Description exercicehhhh</h4>
                    </div>
                </div>
                <div class="carousel-cell exercice-item">
                    <div class="image-exercice-item"></div>
                    <div class="description-exercice-item">
                    <h4>Description exercicehhhh</h4>
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
        }
    },
    mounted(){

    }
}
</script>
