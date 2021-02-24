<template>
  <div class="landing-page">
    <div v-if="$fetchState.pending">
      <SqueletLandingPage />
    </div>
    <div v-else>
      <div class="hero-image" id="accueil">
        <div class="description">
          <div class="description-content">
            <h1>Bienvenue à <span class="accent">ESsoccercoach</span>, le créateur d'exercices gratuit pour les entraîneurs de soccer.</h1>
            <p>Vous pouvez créer vos exercices, vos séances et votre alignement en utilisant un de nos outils.</p>
            <div class="action-btn"><a class="btn btn-default-ghost" href="#nosOutils">Choisir un de nos outils</a></div>
          </div>
        </div>
        <div class="carrousel">
          <div class="carrousel-images">
            <Slider :lst-slides="lstSlidesHero" :autoplay="true" :interval="15"/>
          </div>
        </div>
      </div>
      <div class="copyrigth1" id="copyrigth1">
        <h2>Profitez de nos outils <strong>100% gratuits!</strong></h2>
        <p>
          Souvent, les entraîneurs ne disposons pas des outils nécessaires pour bien préparer nos 
          séances d'entraînement. Le papier et le crayon deviennent rapidement nos meilleurs amis 
          lorsque nous voulons planifier
          nos entraînements ou nos exercices.
          <br><br><strong>ESSoccerCoach</strong> vous offre plusieurs outils pour vous permettre de 
          créer de façon très simple vos <strong>exercices</strong>, vos <strong>séances d'entraînement</strong>
          et vos <strong>alignements</strong>.
        </p>
        <p class="profitez">
          Profitez-en bien!
        </p>
      </div>
      <div class="exercices-populaires">
        <h3>Exercices populaires <font-awesome-icon :icon="['fas', 'star']"/></h3>
        <p>Consultez notre banque d'exercices pour créer vos séances d'entraînement:</p>
        <ExercicesPopulaires :exercices="exercicesPopulaires"/>
        <div class="exercices-actions">
          <a class="blue-link" href="/exercices">Tous les exerices <font-awesome-icon :icon="['fas', 'caret-right']"/></a>
        </div>
      </div>
      <div class="nos-outils" id="nosOutils">
        <h2>Nos outils</h2>
        <div class="outils">
          <div class="outil">
            <h3>Créateur de séances</h3>
            <div class="outil-logo">
              <img src="@/assets/images/seance_logo.png" alt="créer séance de soccer"/>
            </div>
            <div class="outil-content">
              <span>Créez vos exercices de soccer et télécharchez les avec notre outil de création d'exercices <strong>ESDesigner</strong>.</span>
            </div>
            <div class="outil-actions">
              <button class="btn btn-default-ghost" @click="goToCreateSeances()">Créez votre séance</button>
            </div>
          </div>
          <div class="outil">
            <h3>Créateur d'exercices</h3>
            <div class="outil-logo">
              <img src="@/assets/images/exercice_logo.png" alt="créer exercice de soccer"/>
            </div>
            <div class="outil-content">
              <span>Créez vos séances d'entraînement d'une façon simple et rapide avec notre <strong>créateur de séances</strong>.</span>
            </div>
            <div class="outil-actions">
              <button class="btn btn-default-ghost" @click="goToCreateExercices()">Créez votre exercice</button>
            </div>
          </div>
          <div class="outil">
            <h3>Créateur d'alignements</h3>
            <div class="outil-logo">
              <img src="@/assets/images/alignement_logo.png" alt="créer alignement de soccer"/>
            </div>
            <div class="outil-content">
              <span>Créez l'alignement de votre prochain match avec notre <strong>créateur d'alignements</strong>.</span>
            </div>
            <div class="outil-actions">
              <button class="btn btn-default-ghost" @click="goToCreateAlignements()">Créez votre alignement</button>
            </div>
          </div>
        </div>
      </div>
      <div class="copyrigth-outils">
        <div class="createur-exercices item-copy">
          <div class="description-item">
              <div class="description-item-content">
                <h2>Créateur d'exercices de soccer</h2>
                <p>La préparation des exercices est très importante dans la <strong>planification</strong> d'une séance d'entraînement. <br><br>Avec notre <strong>créateur d'exercices</strong>, vous pouvez créer vos exercices de façon très simple et les télécharger en image.</p>
                <div class="actions-item"><button class="btn btn-default" @click="goToCreateExercices()">Créez votre exercice</button></div>
              </div>
          </div>
          <div class="carrousel-item">
            <div class="carrousel-images">
                <img src="@/assets/images/exercices_createur2.png" alt="créateur d'exercices de soccer"/>
            </div>
          </div>
        </div>
        <div class="createur-seances item-copy">
          <div class="description-item">
              <div class="description-item-content">
                <h2>Créateur de séances d'entraînement de soccer</h2>
                <p>Avez-vous un entraînement aujourd'hui?<br><br> Planifiez votre <strong>séance d'entraînement</strong> avec notre créateur de séances.</p>
                <div class="actions-item"><button class="btn btn-default" @click="goToCreateSeances()">Créez votre séance</button></div>
              </div>
          </div>
          <div class="carrousel-item">
            <div class="carrousel-images">
              <img src="@/assets/images/seances_createur2.png" alt="créateur de séances d'entraînement de soccer"/>
            </div>
          </div>
        </div>
        <div class="createur-alignements item-copy">
          <div class="description-item">
              <div class="description-item-content">
                <h2>Créateur d'alignements de soccer</h2>
                <p>Faites l'alignement de votre équipe de façon <strong>simple</strong> et <strong>rapide</strong> <br><br> Choisissez votre système, ajoutez vos joueurs et téléchargez votre alignement.</p>
                <div class="actions-item"><button class="btn btn-default" @click="goToCreateAlignements()">Créez votre alignement</button></div>
              </div>
          </div>
          <div class="carrousel-item">
            <div class="carrousel-images">
              <img src="@/assets/images/alignements_createur2.png" alt="créateur d'alignements de soccer"/>
            </div>
          </div>
        </div>
      </div>
      <div class="copyrigth-exercices">
        <div class="texte">
          <div>
            <h2>Consultez notre banque d'exercices de soccer avec plus de 100 exercices disponibles!</h2> 
            <p>Vous trouverez différents exercices divisés en catégories. Aussi, vous pouvez utiliser les exercices
              populaires dans vos séances d'entraînment</p> 
          </div>  
        </div> 
        <div class="message-btn">    
          <a class="btn btn-default-ghost" href="/exercices">Consultez les exercices</a>
        </div>      
        <div class="image">
          <img src="@/assets/images/icons/timeline.svg" alt="créer séance de soccer"/>
        </div> 
      </div>
      <div class="copyrigth-essoccercoach" id="propos">
        <div class="images-essoccercoach">
          <div class="image-item">
              <img src="@/assets/images/es1.jpg" alt="créateur de séances de soccer"/>
          </div>
          <div class="image-item">
              <img src="@/assets/images/es2.jpg" alt="esdesigner le créateur d'exercices de soccer"/>
          </div>
          <div class="image-item">
            <img src="@/assets/images/es3.jpg" alt="créateur d'alignements de soccer"/>
          </div>
        </div>
        <div class="description-essoccercoach">
          <h2>ESsoccercoach</h2>
          <div class="description-essoccercoach-texte">
            <div class="description-texte">
              <p>Nous sommes des passionnés du soccer qui ont conçu un outil <strong>100% gratuit</strong> pour aider
                tous les entraîneurs qui cherchent un outil pour créer leurs exercies, leurs séances d'entraînement
                et leurs alignements. <br><br>Notre objectif est d'offrir les meilleurs outils
                pour contribuer au <strong>dévéloppement du soccer</strong> dans notre environnement. 
              </p>
            </div>
            <div class="image-essoccercoach">
              <img src="@/assets/images/es2.jpg" alt="esdesigner le créateur d'exercices de soccer"/>
            </div>
            <div class="task-list">
              <p><font-awesome-icon :icon="['fas', 'check']"/> Créateur d'exercices de soccer</p>
              <p><font-awesome-icon :icon="['fas', 'check']"/> Créateur de séances d'entraînement</p>
              <p><font-awesome-icon :icon="['fas', 'check']"/> Créateur d'alignements</p>
              <p><font-awesome-icon :icon="['fas', 'check']"/> Banque d'exercices avec plus de <strong>100</strong> exercices</p>
            </div>
          </div>
        </div>
      </div>
      <div class="copyrigth2">
          <div class="message">
            <h2>Un outil offert à des <br><span>entraîneurs de soccer</span> passionés!</h2>
            <p>
              Nous vous offrons un outil conçu par un entrâineur de soccer pour aider tous 
              les entraîneurs qui ont besoin de créer leurs exercices de façon simple et rapide.<br><br>
              Profitez de notre outil <strong>100% gratuit</strong> pour commencer à créer les exercices de votre prochaine 
              séance d'entraînement.
            </p>
            <div class="compteur">
              <div class="exercices-compteur">      
                <span class="number">+ 400</span><br>
                <span>Exercices créés avec notre outil</span>
              </div> 
            </div> 
            <div class="message-btn">    
              <a class="btn btn-default-ghost" href="/exercices">Créez votre premier exercice</a>
            </div> 
          </div>
          <div class="icon-img1">
            <img src="@/assets/images/icons/goal-outline.svg"/>
          </div>
          <div class="icon-img2">
            <img src="@/assets/images/icons/stopwatch.svg"/>
          </div>
      </div>
      <div class="btn-top">
        <div class="btn-top-content">
          <font-awesome-icon :icon="['fas', 'angle-up']"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {lstSlidersHomeHero as slidesHero} from '@/static/sliders-list.js';
import Slider from '@/components/Slider.vue';
import SqueletLandingPage from '../components/exercices/SqueletLandingPage.vue';
export default {
  components: { Slider, SqueletLandingPage },
  data(){
    return{
      lstSlidesHero : [],
      exercicesPopulaires:[],
    }
  },
  computed:{
  },
  methods:{
    goToCreateExercices(){
      this.$router.push({path: '/create-exercice'});
    },
    goToCreateSeances(){
      this.$router.push({path: '/create-seance'});
    },
    goToCreateAlignements(){
      this.$router.push({path: '/create-alignement'});  
    },
  },
  created(){
    this.lstSlidesHero = slidesHero;
  },
  mounted(){
    $(document).ready(function(){
      $('.btn-top').click(function(){
        $('body, html').animate({
          scrollTop: '0px'
        }, 300);
      });
    
      $(window).scroll(function(){
        if( $(this).scrollTop() > 0 ){
          $('.btn-top').slideDown(300);
        } else {
          $('.btn-top').slideUp(300);
        }
      });
    });

    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
  async fetch() {
      try{
        
          const response = await this.$axios.$get('/api/exercices/populars/get-all');
          for(let i=0;i<7;i++){
            this.exercicesPopulaires.push(response.exercices[i])
          }
      }catch(err){
          console.log(err);
      }
  } 
}
</script>

<style>
</style>
