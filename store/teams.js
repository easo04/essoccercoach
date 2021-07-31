export const state = () => ({
    lstNotes:[]
});

export const mutations = {
    addNote(state, newValue) {
      state.lstNotes.push(newValue);
    },
    initNotes(state, newValue){
        state.lstNotes = newValue;
    },
    deleteNote(state, index){
        state.lstNotes.splice(index, 1);
    }
}