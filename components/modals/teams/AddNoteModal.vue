<template>
    <div class="modal-add-note modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Ajoutez une note à l'activité</h3></div>
            <div class="close-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
        </div>
        <div class="modal-content">
            <div class="form-group">
                <label class="label-control" for="note">Note: </label>
                <textarea rows="20" cols="50"  autocomplete="off" name="notes" class="form-control-textarea" v-model="note"></textarea>
            </div>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <button class="btn btn-default" @click.prevent="addNote()" :class="{'disabled':isBtnSaveDisabled()}" :disabled="isBtnSaveDisabled()">Enregistrez</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['activity'],
    data(){
        return{
            note:undefined
        }
    },
    methods: {
        hide () {
            this.$modal.hide('modal-add-note');
        },
        isBtnSaveDisabled(){
            return this.note === undefined || this.note === '';
        },
        async addNote(){
            console.log('add note')
            let data = {
                note:this.note,
                activite:this.activity.id
            };

            try{
                const response = await this.$axios.$post('/api/notes/', data);
                data.id = response.noteId;
                this.hide();
            }catch(error){
                console.log(error)
            }
        },
    }
}
</script>