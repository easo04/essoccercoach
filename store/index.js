export const state = () => ({
  modePresentation: true,
  showLoader:false,
  textLoader:'',
  classLoader:'',
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
  }
}