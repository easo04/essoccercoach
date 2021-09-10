<template>
    <div class="alignements">
        <div class="content-actions" v-show="showBtnAdd">
                <button class="btn btn-default" title="Ajoutez un alignement" @click="addNewAlignement()"><font-awesome-icon :icon="['fas', 'plus']"/></button>
        </div>
        <div v-if="!showBtnAdd">
            <div class="alignement">
                <div class="borders">
                <div class="gardien">
                    <div>
                        <div class="icon-player"><font-awesome-icon :icon="['fas', 'user-alt']"/></div>
                        <div class="name-player">Charlotte</div>
                    </div>
                </div>
                <div class="defenseurs" :class="`systeme-${systeme}`">
                    <div>
                        <div class="icon-player"><font-awesome-icon :icon="['fas', 'user-alt']"/></div>
                        <div class="name-player">Charlotte</div>
                    </div>
                    <div>
                        <div class="icon-player"><font-awesome-icon :icon="['fas', 'user-alt']"/></div>
                        <div class="name-player">Charlotte</div>
                    </div>
                    <div>
                        <div class="icon-player"><font-awesome-icon :icon="['fas', 'user-alt']"/></div>
                        <div class="name-player">Charlotte</div>
                    </div>
                    <div>
                        <div class="icon-player"><font-awesome-icon :icon="['fas', 'user-alt']"/></div>
                        <div class="name-player">Charlotte</div>
                    </div>
                </div>
                <div class="milieux" :class="`systeme-${systeme}`">
                    <div>
                        <div class="icon-player"><font-awesome-icon :icon="['fas', 'user-alt']"/></div>
                        <div class="name-player">Charlotte</div>
                    </div>
                    <div>
                        <div class="icon-player"><font-awesome-icon :icon="['fas', 'user-alt']"/></div>
                        <div class="name-player">Charlotte</div>
                    </div>
                    <div>
                        <div class="icon-player"><font-awesome-icon :icon="['fas', 'user-alt']"/></div>
                        <div class="name-player">Charlotte</div>
                    </div>
                    <div>
                        <div class="icon-player"><font-awesome-icon :icon="['fas', 'user-alt']"/></div>
                        <div class="name-player">Charlotte</div>
                    </div>
                </div>
                <div class="attaquants" :class="`systeme-${systeme}`">
                    <div>
                        <div class="icon-player"><font-awesome-icon :icon="['fas', 'user-alt']"/></div>
                        <div class="name-player">Charlotte</div>
                    </div>
                    <div>
                        <div class="icon-player"><font-awesome-icon :icon="['fas', 'user-alt']"/></div>
                        <div class="name-player">Charlotte</div>
                    </div>
                </div>
                </div>
            </div>
            <div class="information-alignement">  
                <div class="actions">      
                    <menu-actions>
                        <template v-slot:content-options>   
                            <div @click="updateAlignement()">Modifier</div>
                            <div @click="deleteAlignement()">Supprimer</div>
                        </template>
                    </menu-actions>
                </div>
                <h4>Système: {{systeme}}</h4>
                <div class="lst-remplacants">
                    <h5>Remplacants:</h5>
                    <div>
                        <div>
                            <div class="icon-player"><font-awesome-icon :icon="['fas', 'user-alt']"/></div>
                            <div class="name-player">Charlotte</div>
                        </div>
                        <div>
                            <div class="icon-player"><font-awesome-icon :icon="['fas', 'user-alt']"/></div>
                            <div class="name-player">Charlotte</div>
                        </div>
                        <div>
                            <div class="icon-player"><font-awesome-icon :icon="['fas', 'user-alt']"/></div>
                            <div class="name-player">Charlotte</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import menuActions from "../slots/menu-actions.vue"

export default {    
    components: { menuActions },
    props:['alignement', 'activity', 'players'],
    data(){
        return{
            showBtnAdd:this.alignement === undefined
        }
    },
    methods:{
        updateAlignement(){

        },
        deleteAlignement(){

        },
        addNewAlignement(){
            this.$router.push(`/dashboard/teams/activities/${this.activity.id}/create-alignement`);
        }
    }
}
</script>