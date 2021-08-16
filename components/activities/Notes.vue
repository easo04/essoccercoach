<template>
    <div class="notes-activity">
        <h4>Notes</h4>
        <div class="content-actions">
            <button class="btn btn-default" title="Ajoutez une note" @click="addNewNote()"><font-awesome-icon :icon="['fas', 'plus']"/></button>
        </div>
        <div class="content-item" v-for="(note, i) in lstNotes" :key="i">
            <div>
                <h5>{{note.user_creation}} <span class="date-note">{{note.date_web_created}}</span></h5>
                <p class="note">{{note.note}}</p>
            </div>
            <div class="actions">
                <div @click="deleteNote(note.id, i)"><font-awesome-icon :icon="['fas', 'trash']"/></div>
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
        }
    },
    computed:{
        lstNotes(){
            return this.$store.state.teams.lstNotes;
        }
    },
    methods:{
        async deleteNote(idNote, index){
            await this.$axios.$delete(`/api/notes/${idNote}`);
            this.deleteNote(index);
        },
        addNewNote(){
            console.log(this.activity.id)
            this.$modal.show(
                AddNoteModalVue,
                {'activity':this.activity},
                {name : 'modal-add-note', classes:['modal-top']}
            );
        },
        ...mapMutations({initNotes:'teams/initNotes', deleteNote: 'teams/deleteNote'})

    },
    mounted(){
        this.initNotes(this.notes);
    }
}
</script>