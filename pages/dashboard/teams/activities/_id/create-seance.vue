<template>
    <div class="add-seance connected-page">
        <div class="loader" v-if="loader">
            <Spinner :spinner="true"/>   
        </div>
        <div v-else>
            <bouton-back title="Retournez au détail de l'activité"/>
            <div class="actions-add-seance">
                <div class="list-actions">
                    <span @click="save()"><font-awesome-icon :icon="['fas', 'save']"/></span>
                </div>
            </div>
            <div class="content-add-seance">
                <div class="exercices">
                    <div class="others-exerices">
                        <div><a>Ajoutez un nouvel exercice</a></div>
                        <div><a @click="addMatch()">Ajoutez un match</a></div>
                    </div>
                    <h5>Banque d'exercices</h5>
                    <div class="type-exercices" v-for="(category, index) in categories" :key="index">
                        <div class="category-name" @click="openCategory(category)">
                            <h6>{{category.name}}</h6>
                            <div class="icon" v-if="!category.opened"><font-awesome-icon :icon="['fas', 'plus']"/></div>
                            <div class="icon" v-else><font-awesome-icon :icon="['fas', 'minus']"/></div>
                        </div>
                        <ul v-show="category.opened">
                            <li v-for="(exercice, i) in category.exercices" :key="i"><a @click="addExercice(exercice.id)" title="Selectionner">{{exercice.title}}</a></li>
                        </ul>
                    </div>
                </div>
                <div class="lst-exercices">
                    <div class="exercices-items">
                        <div class="exercice" v-for="(exercice, index) in lstExercices" :key="index">
                            <div class="exercice-info-block">
                                <div class="details-exercice" v-if="!exercice.update">
                                    <h5>{{exercice.title}}</h5>
                                    <p>{{exercice.description}}</p>
                                    <h6 class="objectifs">Objecifs</h6>
                                    <p>{{exercice.pointCoach}}</p>
                                </div>
                                <div class="details-exercice" v-else>
                                    <div class="form-group">
                                        <input type="text" name="name" class="form-control" v-model="exercice.title" autocomplete="off"/>
                                    </div>
                                    <div class="form-group">
                                        <textarea rows="20" cols="50"  autocomplete="off" name="notes" class="form-control-textarea" v-model="exercice.description"></textarea>
                                    </div>
                                    <h6 class="objectifs">Objecifs</h6>
                                    <div class="form-group">
                                        <textarea rows="20" cols="50"  autocomplete="off" name="notes" class="form-control-textarea" v-model="exercice.pointCoach"></textarea>
                                    </div>
                                </div>
                                <div class="image-exercice" v-if="!exercice.isGame">
                                    <div class="image">
                                        <img src="@/assets/images/exercice_essoccercoach.png"/>
                                    </div>
                                </div>
                                <div class="actions-move">
                                    <div v-if="index !== 0" title="move to up" @click="up(exercice, index)"><font-awesome-icon :icon="['fas', 'angle-up']"/></div>
                                    <div v-if="index !== lstExercices.length - 1" title="move to down" @click="down(exercice, index)"><font-awesome-icon :icon="['fas', 'angle-down']"/></div>
                                </div>
                            </div>
                            <div class="exercice-actions-block">
                                <div>
                                    <div @click="updteExercice(exercice.id, index)">
                                        <span v-if="!exercice.update">Modifier</span>
                                        <span v-else>Enregistrer</span>
                                    </div>
                                    <div @click="suppExercice(exercice.id, index)"><span>Supprimer</span></div>
                                </div>
                            </div>
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
            lstExercices:[],
            categories:[],
            allExercices:[],
            loader:true
        }
    },
    methods:{
        openCategory(category){
            category.opened = !category.opened;
        },
        async getAllExercices(){
            try{
                const response = await this.$axios.$get('/api/exercices');

                this.allExercices = response.exercices;

                this.$store.state.categories.forEach(category => {
                    if(category.name !== 'populaires'){
                        
                        const lstExercices = response.exercices.filter(exe=>exe.category + 's' === category.name);

                        const currentCategory = {
                            name:category.label,
                            exercices:lstExercices,
                            opened:false
                        };

                        this.categories.push(currentCategory);
                    }
                });

                this.loader = false;
            }catch(err){
                console.log(err)
            }
        },
        getCategoryFormatted(category){
            return this.$store.state.categories.find(c=>c.name === category + 's').label;
        },
        addExercice(id){
            let currentExercice = this.allExercices.find(exe=>exe.id===id);
            const exercice = {
                id,
                title:currentExercice.title,
                description:currentExercice.description,
                image:'url image',
                time:'25',
                duration:'text duration',
                pointCoach:'point coaching',
                update:false
            };
            this.lstExercices.push(exercice);
        },
        addMatch(){
            const match = {
                title:'Match',
                description:'',
                image:'',
                time:'25',
                duration:'text duration',
                pointCoach:'point coaching',
                update:false,
                isGame:true
            };
            this.lstExercices.push(match);
        },
        suppExercice(id, index){
            this.lstExercices.splice(index, 1);
        },
        updteExercice(id, index){
            let exercice = this.lstExercices[index];
            exercice.update = !exercice.update;
        },
        up(exercice, index){
            let element = this.lstExercices[index];
            this.lstExercices.splice(index, 1);
            this.lstExercices.splice(index-1, 0, element);
        },
        down(exercice, index){
            let element = this.lstExercices[index];
            this.lstExercices.splice(index, 1);
            this.lstExercices.splice(index+1, 0, element);
        },
        async save(){
            const exercices = [];
            const seance = {
                activite : activity.id,
                theme : 'Theme',
                duration : '2h',
                user_created : 1,
                exercices
            };

            const response = await this.$axios.post('/api/seances', seance);
        }
    },
    mounted(){


        const team = JSON.parse(localStorage.getItem('current-team'));
        this.activity = team.activities.find(activity => activity.id === this.$route.params.id);

        this.getAllExercices();
    }
}
</script>