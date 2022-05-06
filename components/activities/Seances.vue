<template>
    <div class="seances-activity">
        <h4>Séance</h4>
        <div class="content-actions">
            <button v-if="canAddSeance()" class="btn btn-default" title="Ajoutez une séance" @click="addNewNote()"><font-awesome-icon :icon="['fas', 'plus']"/></button>
        </div>

    </div>
</template>
<script>
export default {
    props:['activity'],
    methods:{
        addNewNote(){
            this.$router.push(`/dashboard/teams/activities/${this.activity.id}/create-seance`);
        },
        canAddSeance(){
            const dateActivity = new Date(this.activity.date_activite);
            let now = new Date();
            now.setHours(0, 0, 0, 0);
            return dateActivity >=now;
        }
    }
}
</script>