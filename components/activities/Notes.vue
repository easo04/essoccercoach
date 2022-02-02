<template>
    <div class="notes-activity">
        <div class="create-notes">
            <div class="form-group">
                <label class="label-control" for="note">Ajoutez une note: </label>
                <textarea rows="20" cols="50"  autocomplete="off" name="notes" class="form-control-textarea" v-model="note"></textarea>
            </div>
            <div class="actions">
                <button class="btn btn-default" @click.prevent="saveNote()" :class="{'disabled':isBtnSaveDisabled()}" :disabled="isBtnSaveDisabled()">Enregistrez</button>
            </div>
        </div>
        <h4>Notes</h4>
        <div class="content-item" v-for="(note, i) in lstNotes" :key="i">
            <div>
                <h5>{{note.user_creation}} <span class="date-note">{{note.date_web_created}}</span></h5>
                <p class="note">{{note.note}}</p>
            </div>
            <div class="actions">
                <div @click="suppNote(note.id, i)"><font-awesome-icon :icon="['fas', 'trash']"/></div>
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex';
import AddNoteModalVue from '../modals/teams/AddNoteModal.vue';
export default {
    props:['notes', 'activity'],
    data(){
        return{
            note:undefined
        }
    },
    computed:{
        lstNotes(){
            return this.$store.state.teams.lstNotes;
        }
    },
    methods:{
        async suppNote(idNote, index){
            await this.$axios.$delete(`/api/notes/${idNote}`);
            this.deleteNote(index);
        },
        isBtnSaveDisabled(){
            return this.note === undefined || this.note === '';
        },
        async saveNote(){
            let data = {
                note:this.note,
                activite:this.activity.id
            };

            try{
                const response = await this.$axios.$post('/api/notes/', data);
                data.id = response.noteId;
                this.addNote(data);
                this.note = undefined;
            }catch(error){
                console.log(error)
            }
        },
        ...mapMutations({initNotes:'teams/initNotes', deleteNote: 'teams/deleteNote', addNote:'teams/addNote'})

    },
    mounted(){
        this.initNotes(this.notes);
    }
}
</script>