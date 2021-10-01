<template>
    <div class="seances-activity">
        <h4>Séance</h4>
        <div class="content-actions">
            <button class="btn btn-default" title="Ajoutez une séance" @click="addNewNote()"><font-awesome-icon :icon="['fas', 'plus']"/></button>
        </div>

    </div>
</template>
<script>
export default {
    props:['activity'],
    methods:{
        addNewNote(){
            this.$router.push(`/dashboard/teams/activities/${this.activity.id}/create-seance`);
        }
    }
}
</script>