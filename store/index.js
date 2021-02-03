export const state = () => ({
  modePresentation: true,
  showLoader:false,
  textLoader:'',
  classLoader:'',
  categorie:'tous',
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