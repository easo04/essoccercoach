<template>
    <div class="details-exercice">
        <h2>Détails</h2>
    </div>
</template>
<script>
export default {
    mounted(){
        console.log(this.$route.params.id);
    }
}
</script>