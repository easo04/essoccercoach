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
                    <h4>ESsoccercoach</h4>
                </div>
            </div>
            <div class="content">
                <Nuxt />
            </div>
            <div class="footer-designer-seance">
                © Outil créé par ESsoccercoach
            </div>
        </div>
    </div>
</template>
<script>
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
    created(){
    },
    mounted(){
    }
}
</script>
