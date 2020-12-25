<template>
  <div class="application">
    <Header/>
    <div class="content">
      <Nuxt />
    </div>
    <Footer/>
  </div>
</template>
<script>
export default {
      head(){
        return{
            title:'Le créateur d\'exercices de soccer | ESSoccerCoach',
            meta:[
                {
                    hid:'description',
                    name:'description',
                    content:'Vous cherchez un outil pour créer vos exercices de soccer gratuitement? Nous avons le meilleur outil pour vous ✅ Création d\'exercices ✅ Création de séances ✅ Création d\'alignements'
                },
                {
                    hid:'keywords',
                    name:'keywords',
                    content:'exercices de soccer, soccer coach, créateur d\'exercices'
                },
                {
                    hid:'robots',
                    name:'robots',
                    content:'index'
                },
            ],
            htmlAttrs:{
              lang:'en'
            }
        }

    }
}
</script>