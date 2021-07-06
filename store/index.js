export const state = () => ({
  modePresentation: true,
  showLoader:false,
  textLoader:'',
  classLoader:'',
  categorie:'populaires',
  categories:[
    {label:'Populaires', name:'populaires', url:'/exercices'}, 
    {label:'Offensifs', name:'offensifs', url:'/exercices/categorie/offensifs'},
    {label:'Défensifs', name:'deffensifs', url:'/exercices/categorie/deffensifs'},
    {label:'Rondos', name:'rondos', url:'/exercices/categorie/rondos'},
    {label:'Physiques', name:'physiques', url:'/exercices/categorie/physiques'},
    {label:'Tactiques', name:'tactiques', url:'/exercices/categorie/tactiques'},
    {label:'Gardiens', name:'gardiens', url:'/exercices/categorie/gardiens'} //TODO delete if prod
  ],
  exercices:[],
  emails:[],
  users:[],
  currentItemMenu:'accueil'
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
  },
  setCurrentItemMenu(state, newValue){
    state.currentItemMenu = newValue;
  },
  setListEmails(state, newValue){
    state.emails = newValue;
  },
  setListUsers(state, newValue){
    state.users = newValue;
  },
  addUser(state, user){
    state.users.push(user);
  },
  deleteUser(state, index){
    state.users.splice(index, 1);
  },
  deleteEmail(state, index){
    state.emails.splice(index, 1);
  }
}