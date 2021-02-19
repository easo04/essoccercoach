<template>
    <div class="menu-types-exercices">
        <h4>Catégories d'exercices</h4>
        <div class="types">
            <div :class="{'active':current===categorie.name}" v-for="(categorie, i) in categories" :key="i">
                <a :href="categorie.url">{{categorie.label}}</a>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex';
export default {
    props:['currentCategorie'],
    data(){
        return{
            current:undefined
        }
    },
    computed:{
        ...mapState(['categories'])
    },
    methods:{
        setCategorieActive(categorie){
            this.current = categorie;
        },
    },
    mounted(){
        console.log('current ' + this.currentCategorie)
        this.current = this.currentCategorie || 'populaires'
    }
}
</script>