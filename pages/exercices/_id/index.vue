<template>
    <div class="exercices-publiques-detail">
        <div class="details-exercice" v-if="loading">
            <SqueletDetailsExercice/>
        </div>
        <div v-else>
            <DetailsExercice :exercice="exercice" v-if="exercice.id"/>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            exercice:{},
            loading:false

        }
    },
    mounted(){
        console.log(this.$route.params.id);
    }
}
</script>