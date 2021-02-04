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
  {label:'Gardiens', name:'gardiens'}]
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
  }
}