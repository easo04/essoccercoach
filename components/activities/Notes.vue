<template>
    <div class="notes-activity">
        <h4>Notes</h4>
        <div class="content-item" v-for="(note, i) in lstNotes" :key="i">
            <div>{{note.note}}</div>
            <div class="actions">
                <div @click="deleteNote(note.id, i)"><font-awesome-icon :icon="['fas', 'trash']"/></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['notes', 'activity'],
    data(){
        return{
            lstNotes:this.notes
        }
    },
    methods:{
        async deleteNote(idNote, index){
            await this.$axios.$delete(`/api/notes/${idNote}`);
            this.lstNotes.splice(index, 1);
        },
    }
}
</script>