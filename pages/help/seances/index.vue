<template>
    <div class="help-page-content">
        <h2>Commencez la création d'une séance d'entraînement</h2>
        <div class="description-page">
            <p>Vous pouvez créer une séance d'entraînement, ajouter des exercices et la télécharger en format pdf.</p>
        </div>
        <div class="content-page">
            <div class="item-content">
                <h3>Informations de la séance</h3>
                <p>Remplissez les informations concernant la séance d'entraînement. Le bouton <strong>Suivant</strong> est seulement
                    disponible lorsque tous les champs obligatoires ont été remplis. 
                </p>
                <img src="@/assets/images/help/seance-infos.png" />
            </div>
            <div class="item-content">
                <h3>Ajoutez des exercices</h3>
                <p>Vous pouvez ajouter jusqu'à 4 exercices à votre séance d'entraînement.</p>
                <p>Vous pouvez choisir entre ajouter un exercice de notre banque d'exercices populaires ou ajouter un nouvel exercice.</p>
                <img src="@/assets/images/help/seance-add-exercices.png" />
            </div>
            <div class="item-content">
                <h3>Téléchargez la séance</h3>
                <p>Pour télécharger la séance, vous devez cliquer sur le bouton en haut à droit de l'écran.</p>
                <img src="@/assets/images/help/download-seance.png" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    layout:'help',
    data(){
        return{
        }
    },
    methods:{
    }
}
</script>