export const state = () => ({
    seance:{},
    steps:[
        {order:1, name:'informations', label:'Informations de la séance', current:true, completed:false},
        {order:2, name:'exercices', label:'Exercices', current:false, completed:false},
        {order:3, name:'download', label:'Télecharger', current:false, completed:false},
    ],
    exercices:[],
    imageExercice:undefined
});

export const getters = {
    getCurrentStep: (state) =>{
        return state.steps.find(step => step.current);
    },
    getStepsCompleted: (state) =>{
        return state.steps.filter(step => step.completed);
    }
}

export const mutations = {
    setCurrentState(state, step) {
        state.steps.map(s=>s.current = false);
        state.steps.find(s=>s.name === step).current = true;
    },
    setStepCompleted(state, step){
        state.steps.find(s=>s.name === step.name).completed = step.completed;
    },
    setSeance(state, newValue){
        state.seance = newValue;
    },
    addExercice(state, exerice){
        state.exercices.push(exerice);
    },
    deleteExercice(state, index){
        state.exercices.splice(index, 1);
    },
    setImageExercice(state, newValue){
        state.imageExercice = newValue;
    }
}