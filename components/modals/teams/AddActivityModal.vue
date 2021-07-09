<template>
    <div class="modal-add-activity modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Ajoutez une activité à votre équipe</h3></div>
            <div class="close-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
        </div>
        <div class="modal-content">
            <div class="form-group">
                <label class="label-control" for="name">Nom (Obligatoire): </label>
                <input type="text" name="name" class="form-control" v-model="activity.name" autocomplete="off"/>
            </div>
            <div class="form-group">
                <label class="label-control" for="date">Date (Obligatoire): </label>
                <input type="date" name="date" class="form-control" v-model="activity.date" autocomplete="off"/>
            </div>
            <div class="form-group-flex">
                <div class="form-group">
                    <label class="label-control" for="heure">Heure (Obligatoire): </label>
                    <input type="text" name="heure" class="form-control" v-model="activity.heure" autocomplete="off"/>
                </div>
                <div class="form-group">
                    <label class="label-control" for="heure_arrive">Heure arrivée: </label>
                    <input type="text" name="heure_arrive" class="form-control" v-model="activity.heureArrive" autocomplete="off"/>
                </div>
            </div>
            <div class="form-group">
                <label class="label-control" for="name">Endroit (Obligatoire): </label>
                <input type="text" name="name" class="form-control" v-model="activity.adresse" autocomplete="off"/>
            </div>
            <div class="form-group">
                <label class="label-control" for="name">URL adresse: </label>
                <input type="text" name="name" class="form-control" v-model="activity.linkAdresse" autocomplete="off"/>
            </div>
            <div class="is-game" title="C'est un match" v-if="activity.isGame">              
                <span class="label">C'est un match?</span><br>
                <span  @click="setIsGame()" >
                    <font-awesome-icon :icon="['fas', 'toggle-on']"/>
                </span>
            </div>
            <div class="is-game" title="C'est un match" v-else>
                <span class="label">C'est un match?</span><br>
                <span  @click="setIsGame()">
                    <font-awesome-icon :icon="['fas', 'toggle-off']"/>
                </span>
            </div>
            <div class="form-group" v-if="activity.isGame">
                <label class="label-control" for="name">Adversaire (Obligatoire): </label>
                <input type="text" name="name" class="form-control" v-model="activity.adversaire" autocomplete="off"/>
            </div>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <button class="btn btn-default" @click.prevent="addActivity()" :class="{'disabled':isBtnSaveDisabled()}" :disabled="isBtnSaveDisabled()">Enregistrez</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['team'],
    data(){
        return{
            activity:{
                name:undefined,
                date:undefined,
                heure:undefined,
                heureArrive:undefined,
                isGame:false,
                adversaire:undefined,
                adresse:undefined,
                linkAdresse:undefined
            }
        }
    },
    methods: {
        hide () {
            this.$modal.hide('modal-add-activity');
        },
        validDTO(){
            if(this.activity.isGame){
                return this.activity.name && this.activity.date && this.activity.heure && this.activity.adversaire;
            }

            return this.activity.name && this.activity.date && this.activity.heure;
        },
        async addActivity(){
    
            const data = {
                name:this.activity.name,
                date_activite:this.activity.date,
                heure:this.activity.heure,
                heure_arrive:this.activity.heureArrive,
                equipe:this.team,
                is_match:this.activity.isGame,
                adresse:this.activity.adresse,
                link_adresse:this.activity.linkAdresse,
                adversaire:this.activity.adversaire
            }

            try{
                await this.$axios.post('/api/activities', data); 
            }catch(err){
                console.log(err)
            }

            this.$root.$emit('reload-team-activity');
            this.hide();
        },
        setIsGame(){
            this.activity.isGame = !this.activity.isGame;
        },
        isBtnSaveDisabled(){
            return !this.validDTO();
        },
    },
    created () {
    }
}
</script>