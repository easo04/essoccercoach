<template>
  <div class="application">
    <Header/>
    <div class="content">
      <nuxt keep-alive/>
    </div>
    <Footer/>
  </div>
</template>
<script>
export default {
      head(){
        return{
            title:'Le créateur d\'exercices de soccer | ESsoccercoach',
        }

    }
}
</script>