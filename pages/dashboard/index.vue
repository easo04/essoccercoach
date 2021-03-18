<template>
    <div class="dashboard">
        <div class="btn-add">
            <button class="btn btn-default" @click="createExercice()">Nouveau <font-awesome-icon :icon="['fas', 'plus']"/></button>
        </div>
        <h2>Exercices publiques</h2>
        <p>La liste d'exercices publiques qui seront affichés dans l'application.</p>
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
        </div>
        <div class="exercices">
            <div class="vide" v-if="exerciceByFilter.length === 0"> Aucun exercie</div>
            <p class="nbExercices" v-else>Nombre d'exercices: {{exerciceByFilter.length}}</p>
            <div class="liste-exercices">
                <div class="item-exercice" v-for="(exercice, index) in listeExercices" :key="index">
                    <div class="img">
                        <img :src="exercice.image_url"/>
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
                    <div class="actions">
                        <button class="btn btn-default-ghost" @click="goToExercice(exercice)">Consulter</button>
                    </div>
                    <div class="delete" title="Supprimez l'exercice" @click="deleteExercice(exercice.id, exercice.title, index)"><font-awesome-icon :icon="['fas', 'trash']"/></div>
                </div>
            </div>
        </div>
        <div class="more-results" v-if="showMoreResults">
            <button class="btn btn-default-ghost" @click="showMore()"><font-awesome-icon :icon="['fas', 'sort-down']"/> Plus de résultats</button>
        </div>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
import DeleteExerciceModalVue from '../../components/modals/DeleteExerciceModal.vue';
const MAX_RESULTS_SHOW = 12;
export default {
    middleware: 'authentificated',
    layout:'connected',
    computed: {
        showMoreResults(){
            return this.maxResults < this.exercices.length && this.exerciceByFilter.length > MAX_RESULTS_SHOW;
        },
        listeExercices(){
            let retval = [];
            if(this.maxResults < this.exercices.length && this.exerciceByFilter.length > MAX_RESULTS_SHOW){     
                for(let i = 0; i < this.maxResults; i++){
                    retval.push(this.exerciceByFilter[i]);
                }
            }else{
                retval = this.exerciceByFilter;
            }
            return retval;
        },
        ...mapState(["auth", "categories", "exercices"])
    },
    data(){
        return{
            category:'Tous',
            exerciceByFilter:[],
            maxResults:MAX_RESULTS_SHOW,
        }
    },
    methods:{
        async getAllExercices(){
            const exercicesLocal = JSON.parse(localStorage.getItem('exercices'));
            if(!exercicesLocal){
                let response = await this.$axios.$get('/api/exercices');
                this.setListExercices(response.exercices);
                this.exerciceByFilter = this.exercices;

                //save exercices in localstorage
                const exercicesParsed = JSON.stringify(response.exercices);
                localStorage.setItem('exercices', exercicesParsed);
            }else{
                this.setListExercices(exercicesLocal);
                this.exerciceByFilter = this.exercices;
            }
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
        filterByCategory(){
            this.exerciceByFilter = [];
            if(this.category === 'Tous'){
                this.exerciceByFilter = this.exercices;
            }else if(this.category === 'Populaires'){
                this.exerciceByFilter = this.exercices.filter(e=> e.popular === 1);
            }else{
                this.exerciceByFilter = this.exercices.filter(e=> this.getCategoryFormatted(e.category) === this.category);
            }
        },
        createExercice(){
            this.$router.push({path: '/dashboard/add-exercice'});  
        },
        deleteExercice(id, title, index){
            this.$modal.show(
                DeleteExerciceModalVue,
                { idExercice:id, title:title, index:index},
                {name : 'delete-exercice-modal', classes:['modal-s']},
                {}
            );
        },
        goToExercice(exercice){
            this.$router.push({path:`/dashboard/details-exercice/${exercice.id}`})
        },
        showMore(){
            this.maxResults+=12;
        },
        ...mapMutations({setListExercices:'setListExercices'})
    },
    mounted(){

        //récupérer tous les exercices
        this.getAllExercices();
    }
}
</script>