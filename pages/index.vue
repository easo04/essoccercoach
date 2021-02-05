<template>
  <div class="landing-page">
    <div class="hero-image" id="accueil">
      <div class="description">
        <div class="description-content">
          <h1>Bienvenue à ESSoccerCoach, le créateur d'exercices gratuit pour les entraîneurs de soccer.</h1>
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
      <ExercicesPopulaires/>
      <div class="exercices-actions">
        <a class="blue-link">Tous les exerices <font-awesome-icon :icon="['fas', 'caret-right']"/></a>
      </div>
    </div>
    <div class="nos-outils" id="nosOutils">
      <h2><font-awesome-icon :icon="['fas', 'futbol']"/> Nos outils</h2>
      <div class="outils">
        <div class="outil">
          <h3>Créateur d'exercices</h3>
          <div class="outil-logo">
            <img src="@/assets/images/exercices-logo.png" alt="créer exercice"/>
          </div>
          <div class="outil-content">
            <span>Créez vos exercices gartuitement d'une façon rapide avec notre outil de réation d'exercices <strong>ESDesigner</strong></span>
          </div>
          <div class="outil-actions">
            <button class="btn btn-default-ghost" @click="goToCreateExercices()">Créez votre exercice</button>
          </div>
        </div>
        <div class="outil">
          <h3>Créateur de séances</h3>
          <div class="outil-logo">
            <img src="@/assets/images/seance-logo.png" alt="créer séance"/>
          </div>
          <div class="outil-content">
            <span>Créez vos exercices gartuitement d'une façon rapide avec notre outil de réation d'exercices <strong>ESDesigner</strong></span>
          </div>
          <div class="outil-actions">
            <button class="btn btn-default-ghost" @click="goToCreateSeances()">Créez votre séance</button>
          </div>
        </div>
        <div class="outil">
          <h3>Créateur d'alignements</h3>
          <div class="outil-logo">
            <img src="@/assets/images/alignement-logo.png" alt="créer alignement"/>
          </div>
          <div class="outil-content">
            <span>Créez vos exercices gartuitement d'une façon rapide avec notre outil de réation d'exercices <strong>ESDesigner</strong></span>
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
              <h2>Créateur d'exercices</h2>
              <p>La préparation des exercices est très importante dans la <strong>planification</strong> d'une séance d'entraînement. <br><br>Avec notre <strong>créateur d'exercices</strong>, vous pouvez créer vos exercices de façon très simple et les télécharger en image.</p>
              <div class="actions-item"><button class="btn btn-default" @click="goToCreateExercices()">Créez votre exercice</button></div>
            </div>
        </div>
        <div class="carrousel-item">
          <div class="carrousel-images">
            <Slider :lst-slides="lstSlidesExercices" :autoplay="true" :interval="15"/>
          </div>
        </div>
      </div>
      <div class="createur-seances item-copy">
        <div class="description-item">
            <div class="description-item-content">
              <h2>Créateur de séances</h2>
              <p>Avez-vous un entraînement aujourd'hui?<br><br> Planifiez votre <strong>séance d'entraînement</strong> avec notre créateur de séances.</p>
              <div class="actions-item"><button class="btn btn-default" @click="goToCreateSeances()">Créez votre séance</button></div>
            </div>
        </div>
        <div class="carrousel-item">
          <div class="carrousel-images">
            <Slider :lst-slides="lstSlidesSeances" :autoplay="true" :interval="15"/>
          </div>
        </div>
      </div>
      <div class="createur-alignements item-copy">
        <div class="description-item">
            <div class="description-item-content">
              <h2>Créateur d'alignements</h2>
              <p>Faites l'alignement de votre équipe de façon <strong>simple</strong> et <strong>rapide</strong> <br><br> Choisissez votre système, ajoutez vos joueurs et téléchargez votre alignement.</p>
              <div class="actions-item"><button class="btn btn-default" @click="goToCreateAlignements()">Créez votre alignement</button></div>
            </div>
        </div>
        <div class="carrousel-item">
          <div class="carrousel-images">
            <Slider :lst-slides="lstSlidesExercices" :autoplay="true" :interval="15"/>
          </div>
        </div>
      </div>
    </div>
    <div class="copyrigth-essoccercoach">
      <div class="images-essoccercoach">
        <div class="image-item"></div>
        <div class="image-item"></div>
        <div class="image-item"></div>
      </div>
      <div class="description-essoccercoach">
        <h2>ESsoccercoach</h2>
        <div class="description-essoccercoach-texte">
          <div class="description-texte">
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged. It was popularised in the 1960s with the release of.</p>
          </div>
          <div class="image-essoccercoach"></div>
          <div class="task-list">
            <p><font-awesome-icon :icon="['fas', 'check']"/> Texte check liste</p>
            <p><font-awesome-icon :icon="['fas', 'check']"/> Texte check liste</p>
            <p><font-awesome-icon :icon="['fas', 'check']"/> Texte check liste</p>
            <p><font-awesome-icon :icon="['fas', 'check']"/> Texte check liste</p>
          </div>
        </div>
      </div>
    </div>
    <div class="copyrigth2">
        <div class="message">
          <h2>Un outil offert à des <br><span>entraîneur de soccer</span> passionés!</h2>
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
            <button class="btn btn-default-ghost">Créez votre premier exercice</button>
          </div> 
        </div>
    </div>
    <div class="btn-top">
      <div class="btn-top-content">
        <font-awesome-icon :icon="['fas', 'angle-up']"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {lstSlidersHomeHero as slidesHero, lstSlidersHomeExercices as slidesExercices,
lstSlidersHomeSeances as slidesSeances, 
lstSlidersHomeAlignements as slidesAlignements} from '@/static/sliders-list.js';
import Slider from '@/components/Slider.vue';
export default {
  components: { Slider },
  data(){
    return{
      lstSlidesHero : [],
      lstSlidesExercices: [],
      lstSlidesSeances : [],
      lstSlidesAlignements : [],
    }
  },
  computed:{
      exercice(){
        return this.$store.state.esdesigner.exercice
      }
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
    this.lstSlidesExercices = slidesExercices;
    this.lstSlidesSeances = slidesSeances;
    this.lstSlidesAlignements = slidesAlignements;
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
  }
}
</script>

<style>
</style>
