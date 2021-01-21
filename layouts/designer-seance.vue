<template>
    <div class="esdesigner">
        <div class="loading" :class="classLoader" v-if="showLoading">
            <div>
                <Spinner :spinner="true"/>  
            </div>
        </div>
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
</template>
<script>
export default {
}
</script>
