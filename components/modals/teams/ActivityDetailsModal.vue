<template>
    <div class="modal-activity-details modal-custom" :class="{'game' : activity.is_match}">
        <div class="modal-header">
            <div class="titre-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
            <div class="close-modal"><span @click="showActionsOptions()"><font-awesome-icon :icon="['fas', 'ellipsis-v']"/></span></div>
            <div class="options-action" v-if="showOptions">
                <div @click="updatePlayer()">Modifier</div>
                <div @click="deletePlayer()">Supprimer</div>
            </div>
        </div>
        <div class="modal-content">
            <div class="details-activity" >
                <h2>{{activity.name}} <span v-if="activity.is_match"> vs <span class="adversaire">{{activity.adversaire}}</span></span></h2>
                <h3 class="date">{{activity.date_activite}} <span class="heure">à {{activity.heure}}</span></h3>
            </div>
            <div class="other-infos-activity">
                <div class="options-activity">
                    <div class="option-item" title="Détails" :class="{'active' : optionActivitySelected === 'details'}" @click="setOptionsActivity('details')"><font-awesome-icon :icon="['fas', 'info-circle']"/></div>
                    <div class="option-item" title="Disponibilités" :class="{'active' : optionActivitySelected === 'availability'}" @click="setOptionsActivity('availability')"><font-awesome-icon :icon="['fas', 'user-check']"/></div>
                    <div class="option-item" title="Alignement" :class="{'active' : optionActivitySelected === 'alignement'}" v-if="activity.is_match" @click="setOptionsActivity('alignement')"><font-awesome-icon :icon="['fas', 'users']"/></div>
                    <div class="option-item" title="Séance" :class="{'active' : optionActivitySelected === 'seance'}" v-else @click="setOptionsActivity('seance')"><font-awesome-icon :icon="['fas', 'clipboard']"/></div>
                    <div class="option-item" title="Notes" :class="{'active' : optionActivitySelected === 'notes'}" @click="setOptionsActivity('notes')"><font-awesome-icon :icon="['fas', 'comment']"/></div>
                </div>
                <div class="content-options">
                    <div class="details-option-activity" v-if="optionActivitySelected === 'details'">
                        <div class="heure_arrive" v-if="activity.heure_arrive"><font-awesome-icon :icon="['fas', 'clock']"/> {{activity.heure_arrive}}</div>
                        <div class="endroit" v-if="activity.adresse"><font-awesome-icon :icon="['fas', 'map-marker-alt']"/> {{activity.adresse}}</div>
                        <div class="link-adresse">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2726.8237421515705!2d-71.27008768439434!3d46.88651597914343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb8bcd7e1bde493%3A0xdef3d5834e733041!2s%C3%89cole%20Secondaire%20des%20Sentiers!5e0!3m2!1sfr!2sca!4v1625865022455!5m2!1sfr!2sca" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                        </div>
                    </div>
                    <div class="availability-activity" v-if="optionActivitySelected === 'availability'">
                        <h4>Joueurs</h4>
                        <div class="availability-item" v-for="(availability, i) in availabilities" :key="i">
                            <div>{{availability.name_player}}</div>
                            <div class="presence">
                                <div :class="{'go' : availability.id_availability && availability.availability}" title="Présent(e)" @click="setAvailability(true, availability)"><font-awesome-icon :icon="['fas', 'check']"/></div>
                                <div :class="{'no-go' : availability.id_availability && !availability.availability}" title="Absent(e)" @click="setAvailability(false, availability)"><font-awesome-icon :icon="['fas', 'times']"/></div>
                            </div>
                        </div>
                    </div>
                    <div class="alignements-activity" v-if="optionActivitySelected === 'alignement' && activity.is_match">
                        <h4>Système: 1-4-4-2</h4>
                        <div class="alignement">
                            <div class="borders">
                            <div class="gardien">
                                <div>Charlo</div>
                            </div>
                            <div class="defenseurs systeme-1-4-4-2">
                                <div>Amis</div>
                                <div>Amis</div>
                                <div>Amis</div>
                                <div>Amis</div>
                            </div>
                            <div class="milieux systeme-1-4-4-2">
                                <div>Amis</div>
                                <div>Amis</div>
                                <div>Amis</div>
                                <div>Amis</div>
                            </div>
                            <div class="attaquants systeme-1-4-4-2">
                                <div>Amis</div>
                                <div>Amis</div>
                            </div>
                            </div>
                        </div>
                        <div class="remplacants">Remplaçants: Lolo-Lipo-Santino</div>
                    </div>
                    <div class="alignements-activity" v-if="optionActivitySelected === 'seance' && !activity.is_match">
                        <h4>Séance</h4>
                    </div>
                    <div class="notes-activity" v-if="optionActivitySelected === 'notes'">
                        <h4>Notes</h4>
                        <div class="content-item">
                            <div>Notes du match est un eliam</div>
                            <div class="actions">
                                <div><font-awesome-icon :icon="['fas', 'trash']"/></div>
                            </div>
                        </div>
                        <div class="content-item">
                            <div>Notes du match est un eliam</div>
                            <div class="actions">
                                <div><font-awesome-icon :icon="['fas', 'trash']"/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
        </div>
    </div>
</template>
<script>
import UpdatePlayerCoachVue from './UpdatePlayerCoach.vue';
export default {
    props:['activity', 'players'],
    data(){
        return{
            showOptions:false,
            optionActivitySelected:'details',
            availabilities:[]
        }
    },
    methods: {
        hide () {
            this.$modal.hide('modal-activity-details');
        },
        showActionsOptions(){
            this.showOptions = !this.showOptions;
        },
        async deletePlayer(){

            if(this.isPlayer){
                await this.$axios.delete(`api/players/${this.player.id}`)
            }else{
                await this.$axios.delete(`api/coachs/${this.player.id}`)
            }

            this.$root.$emit('reload-team');
            this.hide();
        },
        updatePlayer(){
            let playerModel = this.player;
            playerModel.isPlayer = this.isPlayer;
            this.hide();
            this.$modal.show(
                UpdatePlayerCoachVue,
                {'player':playerModel},
                {name : 'modal-update-player-coach', classes:['modal-top']}
            );
        },
        setOptionsActivity(option){
            this.optionActivitySelected = option;
        },
        async getAvailabiliiesByActivity(activity){
            try{
                let response = await this.$axios.$get(`api/availabilities/get-availabilities-by-activity/${activity.id}`);
                
                if(response.availabilities){
                    this.availabilities = response.availabilities;
                }
            }catch(error){
                console.log(error)
            }
            
        },
        async setAvailability(present, availability){
            if((availability.id_availability && availability.availability !== present) ||
                !availability.id_availability){
                try{
                    const data = {
                        present,
                        joueur : availability.id_player,
                        activite : this.activity.id,
                        availabilityId : availability.id_availability
                    };

                    const response = await this.$axios.$post(`api/availabilities`, data);
                    
                    if(response.availabilityId){
                        availability.availability = present;
                        availability.id_availability = response.availabilityId;
                    }
                }catch(error){
                    console.log(error)
                }
            }
        }
    },
    created () {
        this.getAvailabiliiesByActivity(this.activity)
    }
}
</script>