<template>
    <div class="dashboard">
        <h2>Exercices publiques</h2>
        <p>La liste de'exercices publiques qui seront affichés dans l'application.</p>
        <div class="actions-section">
            <div class="filter-exercices">
                <div class="form-group">
                    <label class="label-control" for="category">Filtrer par catégorie: </label>
                    <select name="category" class="form-control" v-model="category" @change="filterByCategory()">
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
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    middleware: 'auth',
    layout:'connected',
    computed: {
        ...mapState(["auth", "categories"])
    },
    data(){
        return{
            exercices:[],
            category:undefined
        }
    },
    methods:{
        async getAllExercices(){
            let response = await this.$axios.$get('/api/exercices');
            this.exercices = [...response.exercices];
        },
        filterByCategory(){
            console.log(this.category)
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