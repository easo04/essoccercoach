<template>
    <div class="dashboard">
        <h2>Exercices publiques</h2>
        <p>La liste de'exercices publiques qui seront affichés dans l'application.</p>
        <div class="actions-section">
            <div class="filter-exercices">
                <div class="form-group">
                    <label class="label-control" for="category">Filtrer par catégorie: </label>
                    <select name="category" class="form-control" v-model="category" @change="filterByCategory()">
                        <option>
                            Tous
                        </option>
                        <option v-for="(cat, index) in categories" :key="index">
                            {{cat.label}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="btn-add">
                <button class="btn btn-default" @click="createExercice()">Nouveau <font-awesome-icon :icon="['fas', 'plus']"/></button>
            </div>
        </div>
        <div class="exercices">
            <div class="vide" v-if="exercices.length === 0"> Aucun exercie</div>
            <div class="liste-exercices" v-else>
                <div class="item-exercice" v-for="(exercice, index) in exerciceByFilter" :key="index">
                    <div class="img">
                        <img src="@/assets/images/exercice_essoccercoach.png"/>
                        <!--<img :src="exercice.image_url"/>-->
                    </div>
                    <div class="description">
                        <h4>{{exercice.title}}</h4>
                        <p>{{exercice.description}}</p>
                        <div class="footer-description">
                            <div><span class="icon-text"><font-awesome-icon :icon="['fas', 'tshirt']"/><span>{{exercice.nbPlayers}}</span></span></div>
                            <div class="type"><div>{{getCategoryFormatted(exercice.category)}}</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    middleware: 'authentificated',
    layout:'connected',
    computed: {
        ...mapState(["auth", "categories"])
    },
    data(){
        return{
            exercices:[],
            category:'Tous',
            exerciceByFilter:[]
        }
    },
    methods:{
        async getAllExercices(){
            let response = await this.$axios.$get('/api/exercices');
            this.exerciceByFilter = this.exercices = response.exercices;
        },
        getCategoryFormatted(category){
            return this.$store.state.categories.find(c=>c.name === category + 's').label;
        },
        filterByCategory(){
            if(this.category === 'Tous'){
                this.exercicesByFilter = this.exercices;
            }else{
                this.exercicesByFilter = [];
                console.log(this.exercices.filter(e=> this.getCategoryFormatted(e.category) === this.category))
                const exercices = this.exercices.filter(e=> this.getCategoryFormatted(e.category) === this.category);
                Array.prototype.push.apply(this.exercicesByFilter, exercices);

                exercices.forEach(exe =>{
                    this.exercicesByFilter.push(exe)
                });
            }
        },
        createExercice(){
            this.$router.push({path: '/dashboard/add-exercice'});  
        }
    },
    mounted(){

        //récupérer tous les exercices
        this.getAllExercices();
    }
}
</script>