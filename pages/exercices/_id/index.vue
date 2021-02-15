<template>
    <div class="exercices-publiques-detail">
        <div class="details-exercice" v-if="$fetchState.pending">
            <SqueletDetailsExercice/>
        </div>
        <div v-else>
            <DetailsExercice :exercice="exercice"/>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            exercice:{},
        }
    },
    mounted(){
    },
    async fetch() {
        try{
            
            //récupérer les exercices par catégorie
            const response = await this.$axios.$get(`/api/exercices/${this.$route.params.id}`);
            console.log(response.exercice)
            this.exercice = response.exercice;
        }catch(err){
            console.log(err);
        }
    }
}
</script>