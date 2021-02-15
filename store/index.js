export const state = () => ({
  modePresentation: true,
  showLoader:false,
  textLoader:'',
  classLoader:'',
  categorie:'populaires',
  categories:[{label:'Populaires', name:'populaires'}, 
  {label:'Offensifs', name:'offensifs'},
  {label:'Déffensifs', name:'deffensifs'},
  {label:'Rondos', name:'rondos'},
  {label:'Physiques', name:'physiques'},
  {label:'Tactiques', name:'tactiques'},
  {label:'Gardiens', name:'gardiens'}],
  exercices:[]
})

export const mutations = {
  increment(state) {
    state.modePresentation = false
  },
  setShowLoader(state, newValue){
    state.showLoader = newValue;
  },
  setTextLoader(state, newValue){
    state.textLoader = newValue;
  },
  setClassLoader(state, newValue){
    state.classLoader = newValue;
  },
  setCategorie(state, newValue){
    state.categorie = newValue;
  },
  setListExercices(state, newValue){
    state.exercices = newValue;
  },
  addExercice(state, exercice){
    state.exercices.push(exercice);
  },
  removeExercice(state, index){
    state.exercices.splice(index, 1);
  }
}