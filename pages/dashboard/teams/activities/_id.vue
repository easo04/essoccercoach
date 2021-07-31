<template>
    <div class="activity-details" :class="{'game' : activity.is_match}">
        <div class="loader" v-if="loader">
            <Spinner :spinner="true"/>   
        </div>
        <div v-else>
            <div class="activity-header">
                <div class="back" title="Retournez au sommaire"><span @click="back()"><font-awesome-icon :icon="['fas', 'arrow-left']"/></span></div>
                <div class="options-menu"><span class="menu" @click="showActionsOptions()"><font-awesome-icon :icon="['fas', 'ellipsis-v']"/></span></div>
                <div class="options-action" v-if="showOptions">
                    <div @click="updatePlayer()">Modifier</div>
                    <div @click="deleteActivity()">Supprimer</div>
                </div>
            </div>
            <div class="details-activity" >
                <h2>{{activity.name}} <span v-if="activity.is_match"> vs <span class="adversaire">{{activity.adversaire}}</span></span></h2>
                <h3 class="date">{{activity.date_activite}} <span class="heure">à {{activity.heure}}</span></h3>
            </div>
            <div class="other-infos-activity">
                <div class="options-activity">
                    <div class="option-item" title="Détails" :class="{'active' : optionActivitySelected === 'details'}" @click="setOptionsActivity('details')">
                        <div>
                            <span class="icon"><font-awesome-icon :icon="['fas', 'info-circle']"/></span>
                            <div class="label">Détails</div>
                        </div>
                    </div>
                    <div class="option-item" title="Disponibilités" :class="{'active' : optionActivitySelected === 'availability'}" @click="setOptionsActivity('availability')">
                        <div>
                            <span class="icon"><font-awesome-icon :icon="['fas', 'user-check']"/></span>
                            <div class="label">Disponibilités</div>
                        </div>
                    </div>
                    <div class="option-item" title="Alignement" :class="{'active' : optionActivitySelected === 'alignement'}" v-if="activity.is_match" @click="setOptionsActivity('alignement')">
                        <div>
                            <span class="icon"><font-awesome-icon :icon="['fas', 'users']"/></span>
                            <div class="label">Alinements</div>
                        </div>
                    </div>
                    <div class="option-item" title="Séance" :class="{'active' : optionActivitySelected === 'seance'}" v-else @click="setOptionsActivity('seance')">
                        <div>
                            <span class="icon"><font-awesome-icon :icon="['fas', 'clipboard']"/></span>
                            <div class="label">Séances</div>
                        </div>
                    </div>
                    <div class="option-item" title="Notes" :class="{'active' : optionActivitySelected === 'notes'}" @click="setOptionsActivity('notes')">
                        <div>
                            <span class="icon"><font-awesome-icon :icon="['fas', 'comment']"/></span>
                            <div class="label">Notes</div>
                        </div>
                    </div>
                </div>
                <div class="content-options">
                    <div class="details-option-activity" v-if="optionActivitySelected === 'details'">
                        <div class="heure_arrive" v-if="activity.heure_arrive"><font-awesome-icon :icon="['fas', 'clock']"/> {{activity.heure_arrive}}</div>
                        <div class="endroit" v-if="activity.adresse"><font-awesome-icon :icon="['fas', 'map-marker-alt']"/> {{activity.adresse}}</div>
                        <div class="link-adresse">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2726.8237421515705!2d-71.27008768439434!3d46.88651597914343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb8bcd7e1bde493%3A0xdef3d5834e733041!2s%C3%89cole%20Secondaire%20des%20Sentiers!5e0!3m2!1sfr!2sca!4v1625865022455!5m2!1sfr!2sca" width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
                        </div>
                    </div>
                    <Availability :availabilities="availabilities" :activity="activity"  v-if="optionActivitySelected === 'availability'" />
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
                    <Notes :notes="notes" :activity="activity" v-if="optionActivitySelected === 'notes'"/>
                </div>
                <onglets :options="options">
                    <template v-slot:option="{ option }">
                        {{option.label}}
                    </template>
                     <template v-slot:content>
                        Hola
                    </template>
                </onglets>
            </div>
        </div>
    </div>
</template>
<script>
import UpdatePlayerCoachVue from '../../../../components/modals/teams/UpdatePlayerCoach.vue';
import onglets from '../../../../components/slots/onglets.vue';
export default {
  components: { onglets },
    middleware: 'authentificated',
    layout:'connected',
    data(){
        return{
            showOptions:false,
            optionActivitySelected:'details',
            availabilities:[],
            notes:[],
            activity:{},
            loader:true,
            options:[{name:'détails', label:'Détails', icon:'plus'}]
        }
    },
    methods: {
        back(){
            history.back();
        },
        showActionsOptions(){
            this.showOptions = !this.showOptions;
        },
        async deleteActivity(){
            await this.$axios.delete(`api/activities/${this.activity.id}`)
            this.$router.push('/dashboard/teams?reload=true');
        },
        updatePlayer(){
            let playerModel = this.player;
            playerModel.isPlayer = this.isPlayer;
            this.$modal.show(
                UpdatePlayerCoachVue,
                {'player':playerModel},
                {name : 'modal-update-player-coach', classes:['modal-top']}
            );
        },
        setOptionsActivity(option){
            this.optionActivitySelected = option;
        },
        async getActivitySummary(idActivity){
            try{
                const response = await this.$axios.$get(`api/activities/get-activity-summary/${idActivity}`);
                
                if(response.summary){
                    this.activity = response.summary.activity_infos;
                    this.availabilities = response.summary.availabilities;
                    this.notes = response.summary.notes;
                }

                this.loader = false;
            }catch(error){
                console.log(error)
                this.back();
            }
            
        },
    },
    created () {
        this.getActivitySummary(this.$route.params.id)
    }
}
</script>