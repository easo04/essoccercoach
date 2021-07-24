<template>
    <div class="modal-add-team modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Ajoutez une nouvelle équipe</h3></div>
            <div class="close-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
        </div>
        <div class="modal-content">
            <div class="form-group">
                <label class="label-control" for="name">Nom: </label>
                <input type="text" autocomplete="off" name="name" class="form-control" v-model="name"/>
            </div>
             <div class="form-group">
                <label class="label-control" for="club">Club: </label>
                <input type="text" autocomplete="off" name="club" class="form-control" v-model="club"/>
            </div>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <button class="btn btn-default" @click.prevent="addTeam()" :class="{'disabled':isBtnSaveDisabled()}" :disabled="isBtnSaveDisabled()">Enregistrez</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name:undefined,
            club:undefined
        }
    },
    methods: {
        hide () {
            this.$modal.hide('modal-add-team');
        },
        isBtnSaveDisabled(){
            return this.name === undefined || this.name === '';
        },
        async addTeam(){
            const data = {
                name:this.name,
                club:this.club
            };

            try{
                const response = await this.$axios.$post('/api/teams/', data);
                
                let user = JSON.parse(localStorage.getItem('user'));
                user.canCreateATeam = response.canCreateATeam
                localStorage.setItem('user', JSON.stringify(user))

                this.hide();
                this.$root.$emit('reload-team');
            }catch(error){
                console.log(error)
            }
        },
    }
}
</script>