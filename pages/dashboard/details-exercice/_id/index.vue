<template>
    <div class="dashboard"> 
        <div class="actions-details">
            <div class="actions1">
                <NuxtLink to="/dashboard"><font-awesome-icon :icon="['fas', 'arrow-alt-circle-left']"/> Retournez</NuxtLink>
            </div>
            <div class="actions2">
                <div class="btns">
                    <div class="star" title="Populaire" :class="{'is-popular' : exercice.popular === 1}" @click="makeExercicePopulaire()"><font-awesome-icon :icon="['fas', 'star']"/></div>
                    <div class="modify" title="Moodifiez l'exercice"><font-awesome-icon :icon="['fas', 'pencil-alt']"/></div>
                    <div class="delete" title="Supprimez l'exercice" @click="deleteExercice()"><font-awesome-icon :icon="['fas', 'trash']"/></div>
                </div>
            </div>
        </div>
        <div class="details-exercice" v-if="loading">
            <SqueletDetailsExercice/>
        </div>
        <div v-else>
            <DetailsExercice :exercice="exercice" :show-same-category="false" :show-chemin-exercice="false" v-if="exercice.id"/>
        </div>
    </div>
</template>
<script>
    import {mapState, mapMutations} from 'vuex';
import DeleteExerciceModalVue from '../../../../components/modals/DeleteExerciceModal.vue';
    export default {
        middleware: 'authentificated',
        layout:'connected',
        data(){
            return{
                exercice:{},
                index:0,
                popular: false,
                exercices:[],
                loading:true
            }
        },
        computed: {
            ...mapState(["categories"])
        },
        methods:{
            async makeExercicePopulaire(){
                try{
                    const data = {
                        id:this.exercice.id,
                        popular: !this.popular
                    }
                    await this.$axios.$post('/api/exercices/pupulars/update-exercice', data);
                    console.log('succes')
                    this.popular = !this.popular;
                    this.exercice.popular = this.popular === true ? 1 : 0;
                    this.exercices.find(e=>e.id === parseInt(this.exercice.id)).popular = this.exercice.popular;
                    
                    //save exercices in localstorage
                    const exercicesParsed = JSON.stringify(this.exercices);
                    localStorage.setItem('exercices', exercicesParsed);
                }catch(err){
                    console.log(err)
                    console.log('error')
                }
            },
            deleteExercice(){
                this.$modal.show(
                    DeleteExerciceModalVue,
                    { idExercice:this.exercice.id, title:this.exercice.title, index:this.index},
                    {name : 'delete-exercice-modal', classes:['modal-s']},
                    {}
                );
            },
        },
        mounted(){

            //vérifier s'il y a des exercices dans le localstorage
            this.exercices = JSON.parse(localStorage.getItem('exercices'));
            if(this.exercices){
                this.exercice = this.exercices.find(e=>e.id === parseInt(this.$route.params.id));
                this.index = this.exercices.findIndex(e=>e.id === parseInt(this.$route.params.id));
                this.popular = this.exercice.popular === 1 ? true : false;
                this.loading = false;
            }
        }
    }
</script>