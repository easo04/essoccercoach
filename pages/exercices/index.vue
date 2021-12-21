<template>
    <div class="exercices-page">
        <ExercicesCategories/>
        <div class="content">
            <div v-if="$fetchState.pending">
                <SqueletExercices />
            </div>
            <div v-else>
                <div class="liens">
                    <span class="lien-categorie"> Exercices / Populaires</span>
                </div>
                <div class="content-exercices-page">
                    <div class="content-left-exercices">
                        <div class="liste-exercices">
                            <div class="item-exercice" v-for="(exercice, index) in listeExercices" :key="index" @click="goToDetails(exercice)">
                                <div class="img">
                                    <img :src="getImageHttpsFormat(exercice.image_url)"/>
                                </div>
                                <div class="description">
                                    <h4>{{exercice.title}}</h4>
                                    <p>{{getDescriptionFormatted(exercice.description)}}</p>
                                    <div class="footer-description">
                                        <div><span class="icon-text"><font-awesome-icon :icon="['fas', 'tshirt']"/><span>{{exercice.nbPlayers}}</span></span></div>
                                        <div class="type"><div>{{getCategoryFormatted(exercice.category)}}</div></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="more-results" v-if="showMoreResults">
                            <button class="btn btn-default-ghost" @click="showMore()"><font-awesome-icon :icon="['fas', 'sort-down']"/> Plus de résultats</button>
                        </div>
                    </div>
                    <div class="content-right-an">
                        <div class="content-1">
                            <a @click="goToDesigner()"><img src="@/assets/images/others/an1.png" /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const MAX_RESULTS_SHOW = 12;
import {mapMutations} from 'vuex';
export default {
    head(){
        return{
            title:'Exercices de soccer | ESsoccercoach',
        }
    },
    data(){
        return {
            exercices:[],
            maxResults:MAX_RESULTS_SHOW,
        }
    },
    computed:{
        showMoreResults(){
            return this.maxResults < this.exercices.length && this.exercices.length > MAX_RESULTS_SHOW;
        },
        listeExercices(){
            let retval = [];
            if(this.maxResults < this.exercices.length && this.exercices.length > MAX_RESULTS_SHOW){     
                for(let i = 0; i < this.maxResults; i++){
                    retval.push(this.exercices[i]);
                }
            }else{
                retval = this.exercices;
            }
            return retval;
        },
    },
    methods:{
        getImageHttpsFormat(url){
            return url.replace('http', 'https');
        },
        getCategoryFormatted(category){
            return this.$store.state.categories.find(c=>c.name === category + 's').label;
        },
        getDescriptionFormatted(description){
            if(description.length > 50){    
                return description.substring(0, 50) + '...';
            }
            return description;
        },
        goToDetails(exercice){
            this.setCurrentItemMenu('exercices');
            let titleFormatted = exercice.title.toLowerCase().split(' ').join('-');
            this.$router.push({path:`/exercices/${exercice.id}-${titleFormatted}`})
        },
        showMore(){
            this.maxResults+=12;
        },
        goToDesigner(){
            this.$router.push({path:`/create-exercice`});
        },
        ...mapMutations({setCurrentItemMenu:'setCurrentItemMenu'})
    },
    created(){
    },
    mounted(){
        if(this.exercices.length > 0){
            localStorage.setItem('exercices-populaires', JSON.stringify(this.exercices));
        }
    },
    async fetch() {
        try{
            const response = await this.$axios.$get('/api/exercices/populars/get-all');
            this.exercices = response.exercices;
        }catch(err){
            console.log(err);
        }
    }
}
</script>