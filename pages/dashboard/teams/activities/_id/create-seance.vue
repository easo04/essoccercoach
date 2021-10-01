<template>
    <div class="add-seance connected-page">
        <bouton-back title="Retournez au détail de l'activité"/>
        <div class="content-add-seance">
            <div class="exercices">
                <h5>Banque d'exercices</h5>
                <div class="type-exercices">
                    <h6>Offensifs</h6>
                    <ul>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                    </ul>
                </div>
                <div class="type-exercices">
                    <h6>Défensifs</h6>
                    <ul>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                    </ul>
                </div>
                <div class="type-exercices">
                    <h6>Rondos</h6>
                    <ul>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                    </ul>
                </div>
                <div class="type-exercices">
                    <h6>Physiques</h6>
                    <ul>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                    </ul>
                </div>
                <div class="type-exercices">
                    <h6>Tactiques</h6>
                    <ul>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                        <li><a @click="addExercice(1)" title="Selectionner">Exercice 1</a></li>
                    </ul>
                </div>
            </div>
            <div class="lst-exercices">
                <div class="exercices-items">
                    <div class="exercice" v-for="(exercice, index) in lstExercices" :key="index">
                        <div class="details-exercice">
                            <h5>{{exercice.title}}</h5>
                            <p>{{exercice.description}}</p>
                            <h6>Objecifs</h6>
                            <p>{{exercice.pointCoach}}</p>
                        </div>
                        <div class="image-exercice">
                            <div class="image"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BoutonBack from '../../../../../components/BoutonBack.vue';
export default {
    components: { BoutonBack },
    middleware: 'authentificated',
    layout:'connected',
    data(){
        return{
            activity:undefined,
            lstExercices:[]
        }
    },
    methods:{
        addExercice(id){
            const exercice = {
                id,
                title:'Title exercice',
                description:'description exercice',
                image:'url image',
                time:'25',
                duration:'text duration',
                pointCoach:'point coaching'
            };
            this.lstExercices.push(exercice);
        }
    },
    mounted(){


        const team = JSON.parse(localStorage.getItem('current-team'));
        this.activity = team.activities.find(activity => activity.id === this.$route.params.id);
    }
}
</script>