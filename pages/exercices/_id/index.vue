<template>
    <div class="details-exercice">
        <div class="description-infos">
            <div class="infos">
                <div>
                    <div class="links-way">Exercices / Tous / Rondo 4x4 + 2 jokers</div>
                    <h1>Rondo 4x4 + 2 jokers</h1>
                    <p>It is a long established fact that a reader will be distracted by 
                    the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                    as opposed to using 'Content here, content here', making it look like readable English. </p>
                    <div class="footer-description">
                        <div><span class="icon-text"><i class="fas fa-tshirt"></i><span>10 joueurs</span></span></div>
                        <div class="type"><div>Offensif</div></div>
                    </div>
                </div>
            </div>
            <div class="image">
                <img src="@/assets/images/exercice_essoccercoach.png"/>
                <div class="reseau">
                    <i class="fab fa-facebook"></i>
                </div>
            </div>
        </div>
        <div class="description-infos-2">
            <div class="disposition">
                <h3>Disposition</h3>
                <p>Texte d'exmple de la dispoition</p>
            </div>
            <div class="objectifs">
                <h3>Objectifs</h3>
                <p>Texte d'exmple de l'Objectifs</p>
            </div>
        </div>
        <div class="exercices-same">
            <h3>Exercices de la même catégorie</h3>
            <div class="carousel exercices-carrousel">
                <div class="carousel-cell exercice-item">
                    <div class="image-exercice-item">
                        <img src="@/assets/images/exercice_essoccercoach.png"/>
                    </div>
                    <div class="description-exercice-item">
                    <h4>Description exercice</h4>
                    </div>
                </div>
                <div class="carousel-cell exercice-item">
                    <div class="image-exercice-item">
                        <img src="@/assets/images/exercice_essoccercoach.png"/>
                    </div>
                    <div class="description-exercice-item">
                    <h4>Description exercice</h4>
                    </div>
                </div>
                <div class="carousel-cell exercice-item">
                    <div class="image-exercice-item">
                        <img src="@/assets/images/exercice_essoccercoach.png"/>
                    </div>
                    <div class="description-exercice-item">
                    <h4>Description exercice</h4>
                    </div>
                </div>
                    <div class="carousel-cell exercice-item">
                    <div class="image-exercice-item">
                        <img src="@/assets/images/exercice_essoccercoach.png"/>
                    </div>
                    <div class="description-exercice-item">
                    <h4>Description exercice</h4>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>
<script>
export default {
    mounted(){
        console.log(this.$route.params.id);

    }
}
</script>