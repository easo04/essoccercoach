<template>
    <div class="modal-add-player-with-text modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Ajoutez un joueur avec texte</h3></div>
            <div class="close-modal"><span @click="hide()"><i class="fas fa-times"></i></span></div>
        </div>
        <div class="modal-content">
            <div class="form-group">
                <label class="label-control" for="addText">Nom du joueur: </label>
                <input type="text" name="addText" class="form-control" v-model="text" />
            </div>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <button class="btn btn-default" @click.prevent="addPlayer()">Ajoutez le joueur</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:[],
    data(){
        return{
            text:'',
        }
    },
    methods: {
        hide () {
            this.$modal.hide('modal-add-player-with-text');
        },
        addPlayer(){
            this.$root.$emit('addText', this.text);
            this.hide();
        }
    },
    mount () {
    }
}
</script>