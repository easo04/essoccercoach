<template>
    <div class="exercices-page">
        <ExercicesCategories :current-categorie="categorie.name"/>
        <div class="content">
            <div v-if="$fetchState.pending">
                <SqueletExercices />
            </div>
            <div v-else>
                <div class="liens">
                    <span class="lien-categorie"> Exercices / {{categorie.label}}</span>
                </div>
                <div class="liste-exercices">
                    <div class="item-exercice" v-for="(exercice, index) in exercices" :key="index">
                        <div class="img">
                            <img src="@/assets/images/exercice_essoccercoach.png"/>
                            <div class="populaire" v-if="exercice.popular === 1">Populaire <font-awesome-icon :icon="['fas', 'star']"/></div>
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
                    <button class="btn btn-default-ghost"><font-awesome-icon :icon="['fas', 'sort-down']"/> Plus de résultats</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    head(){
        return{
            title:'Exercices de soccer ' + this.categorie.label + ' | ESsoccercoach',
            meta:[
                {
                    hid:'description',
                    name:'description',
                    content:'Exercices de soccer'
                }
            ]
        }
    },
    data(){
        return {
            showMoreResults:true,
            categorie:undefined,
            exercices:[]
        }
    },
    computed:{
        ...mapState(['modePresentation', 'categories'])
    },
    methods:{
        getCategoryFormatted(category){
            return this.$store.state.categories.find(c=>c.name === category + 's').label;
        },
        getDescriptionFormatted(description){
            if(description.length > 50){    
                return description.substring(0, 50) + '...';
            }
            return description;
        },
        ...mapMutations({setCategorie:'setCategorie'})
    },
    created(){
        const catParam = this.categories.find(c => c.name === this.$route.params.categorie);
        if(catParam){
            this.categorie = catParam;
        }else{
            location.href = "/";
        }
    },
    mounted(){
    },
    async fetch() {
        try{
            
            //récupérer les exercices par catégorie
            const category = this.$route.params.categorie.substring(0, this.$route.params.categorie.length - 1);
            const response = await this.$axios.$get(`/api/exercices/category/${category}`);

            this.exercices=response.exercices;
        }catch(err){
            console.log(err);
        }
    }
}
</script>

<style lang="scss">

</style>