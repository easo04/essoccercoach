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
                <div class="liste-exercices">
                    <div class="item-exercice" v-for="(exercice, index) in exercices" :key="index" @click="goToDetails(exercice)">
                        <div class="img">
                            <img src="@/assets/images/exercice_essoccercoach.png"/>
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
export default {
    key(route) {
        return route.fullPath
    },
    head(){
        return{
            title:'Exercices de soccer | ESsoccercoach',
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
            loading:false,
            exercices:[]
        }
    },
    computed:{
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
        goToDetails(exercice){
            let titleFormatted = exercice.title.toLowerCase().split(' ').join('-');
            this.$router.push({path:`/exercices/${exercice.id}-${titleFormatted}`})
        },
    },
    created(){
    },
    mounted(){
        
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