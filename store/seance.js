export const state = () => ({
    seance:{},
    steps:[
        {order:1, name:'informations', label:'Informations de la séance', current:true, completed:false},
        {order:2, name:'exercices', label:'Exercices', current:false, completed:false},
        {order:3, name:'download', label:'Télecharger', current:false, completed:false},
    ],
});

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
}