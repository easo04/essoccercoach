<template>
    <div class="esdesigner">
        <div class="loading" :class="classLoader" v-if="showLoading">
            <div class="loading-content">          
                <div class="logo">
                    <img class="image-logo" src="@/assets/images/logo.png"/>
                </div>
                <Spinner :spinner="true"/>              
                <h3>{{textLoader}}</h3>
            </div>
        </div>
        <div>
            <div class="header-designer">
                <div class="logo">
                    <img class="image-logo" src="@/assets/images/logo.png" alt="essoccercoach logo"/>
                    <h4>ESsoccercoach Designer</h4>
                </div>
            </div>
            <div class="content">
                <Nuxt />
            </div>
            <div class="footer-designer">
                © Outil créé par ESsoccercoach
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
    computed:{
        showLoading(){
            return this.$store.state.showLoader;
        },
        textLoader(){
            return this.$store.state.textLoader;
        },
        classLoader(){
            return this.$store.state.classLoader;
        },
    },
    methods:{
        ...mapMutations({setShowLoader:'setShowLoader', setTextLoader:'setTextLoader', setClassLoader:'setClassLoader'})
    },
    created(){
        this.setShowLoader(true);
        this.setClassLoader('open-designer');
        this.setTextLoader('ESsoccercoach');
    }
}
</script>