export const state = () => ({
  modePresentation: true,
  showLoader:false,
  textLoader:'',
  classLoader:'',
  categorie:'populaires',
  categories:[{label:'Populaires', name:'populaires', url:'/exercices'}, 
  {label:'Offensifs', name:'offensifs', url:'/exercices/categorie/offensifs'},
  {label:'Déffensifs', name:'deffensifs', url:'/exercices/categorie/deffensifs'},
  {label:'Rondos', name:'rondos', url:'/exercices/categorie/rondos'},
  {label:'Physiques', name:'physiques', url:'/exercices/categorie/physiques'},
  {label:'Tactiques', name:'tactiques', url:'/exercices/categorie/tactiques'},
  {label:'Gardiens', name:'gardiens', url:'/exercices/categorie/gardiens'}],
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