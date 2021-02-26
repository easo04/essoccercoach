<template>
    <div class="modal-add-exericice populars modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Ajoutez un nouvel exercice</h3></div>
            <div class="close-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
        </div>
        <div class="modal-content">
            <div class="loading" v-if="loading">
                <Spinner :spinner="true"/>
            </div>
            <div v-else>
                <h4>Exercices populaires <font-awesome-icon :icon="['fas', 'star']"/></h4>
                <div class="liste-exercices">
                    <div class="item-exercice" v-for="exercice in exercicesPopulaires" :key="exercice.id" @click="selectExercice(exercice)">
                        <div class="image-exercice-item">
                            <img src="@/assets/images/exercice_essoccercoach.png"/>
                            <div class="type">{{getCategoryFormatted(exercice.category)}}</div>
                        </div>
                        <div class="description-exercice-item">
                            {{exercice.title}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex';
export default {
    data(){
        return{
            exercicesPopulaires:[],
            loading:false
        }
    },
    methods:{
        getCategoryFormatted(category){
            return this.$store.state.categories.find(c=>c.name === category + 's').label;
        },
        hide () {
            this.$modal.hide('add-exercice-populars-modal');
        },
        selectExercice(exercice){
            const exerciceAdd = {
                popular:true,
                theme:exercice.title,
                description:exercice.description,
                image:exercice.image_url,
                players:exercice.nbPlayers,
                time:exercice.time
            };
            this.addExercice(exerciceAdd);
            this.hide();
        },  
        async getExercicesPopulaires(){
            try{
                const response = await this.$axios.$get('/api/exercices/populars/get-all');
                for(let i=0;i<7;i++){
                    this.exercicesPopulaires.push(response.exercices[i]);
                }
                localStorage.setItem('exercices-populaires', JSON.stringify(this.exercicesPopulaires));
            }catch(err){
                console.log('erreur avec l\'optention des exercices populaires:' + err);
            }
        },
        ...mapMutations({addExercice:'seance/addExercice'})
    },
    beforeCreate(){
        this.loading = true;
    },
    async mounted(){
        if(localStorage.getItem('exercices-populaires')){
            let exercices = JSON.parse(localStorage.getItem('exercices-populaires'));
            for(let i=0;i<7;i++){
                this.exercicesPopulaires.push(exercices[i]);
            }
        }else{
            await this.getExercicesPopulaires();
        }
        this.loading = false;
    }
}
</script>