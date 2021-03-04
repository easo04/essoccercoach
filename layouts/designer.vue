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
            <div class="content-desktop" v-if="!isMobile">
                <Nuxt />
            </div>
            <div class="content-mobile" v-else>
                <div>SVP utilisez un ordinateur pour utiliser cette fonctionnalité.</div>
                <div class="laptop"><font-awesome-icon :icon="['fas', 'laptop']"/></div>
                <a href="/">Retournez à l'accueil</a>
            </div>
            <div class="footer-designer">
                © Outil créé par ESsoccercoach
            </div>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
import NavigatorService from '@/static/services/NavigatorService.js';
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
    data(){
        return{
            isMobile:false
        }
    },
    methods:{
        ...mapMutations({setShowLoader:'setShowLoader', setTextLoader:'setTextLoader', setClassLoader:'setClassLoader'})
    },
    created(){
        this.setShowLoader(true);
        this.setClassLoader('open-designer');
        this.setTextLoader('ESsoccercoach');
    },
    mounted(){
        if (process.browser) {
            this.isMobile = NavigatorService.isMobile();
        }
    }
}
</script>