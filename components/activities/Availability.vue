<template>
    <div class="availability-activity">
        <h4>Joueurs</h4>
        <div class="availability-item" v-for="(availability, i) in availabilities" :key="i">
            <div>{{availability.name_player}}</div>
            <div class="presence">
                <div :class="{'go' : availability.id_availability && availability.availability}" title="Présent(e)" @click="setAvailability(true, availability)"><font-awesome-icon :icon="['fas', 'check']"/></div>
                <div :class="{'no-go' : availability.id_availability && !availability.availability}" title="Absent(e)" @click="setAvailability(false, availability)"><font-awesome-icon :icon="['fas', 'times']"/></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['availabilities', 'activity'],
    methods:{
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
    }
}
</script>