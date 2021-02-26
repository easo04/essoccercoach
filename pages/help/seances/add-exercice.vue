<template>
    <div class="help-page-content">
        <h2>Ajoutez un exercice à votre séance d'entraînement</h2>
        <div class="description-page">
            <p>Vous pouvez ajouter jusqu'à 4 exercices à votre séance d'entraînement.</p>
        </div>
        <div class="content-page">
            <div class="item-content">
                <h3>Ajoutez des exercices populaires</h3>
                <p>1- Vous devez cliquer sur le bouton <strong>Exercice</strong> et ensuite sur l'option <strong>Populaires</strong></p>
                <img src="@/assets/images/help/add-exe-popular1.png" />
                <p class="center">2- Sélectionnez l'exercice de votre choix.</p>
                <img src="@/assets/images/help/add-exe-popular2.png" />
                <p class="center">3- L'exercice a été ajouté correctement. Vous pouvez le modifier par la suite si vous le souhaitez.</p>
                <img src="@/assets/images/help/add-exe-popular3.png" />
            </div>
            <div class="item-content">
                <h3>Ajoutez des nouveaux exercices</h3>
                <p>1- Vous devez cliquer sur le bouton <strong>Exercice</strong> et ensuite sur l'option <strong>Nouveau</strong>.</p>
                <img src="@/assets/images/help/add-exe-new1.png" />
                <p class="center">2- Vous devez remplir les informations de l'exercice.</p>
                <img src="@/assets/images/help/add-exe-new2.png" />
                <p class="center">3 - Pour ajouter une image, vous avez deux choix. Vous pouvez importer une image à partir
                    de votre ordinateur ou vous pouvez créer une nouvelle image avec notre créateur d'exercices ESDesigner.
                </p>
                <p class="center">3.1- <strong>ESDesigner:</strong> Pour sauvegarder l'image de l'exercice, vous devez cliquer sur le bouton à droite du menu principale.</p>
                <img src="@/assets/images/help/add-exe-new3.png" />
                <p class="center">3.2- <strong>ESDesigner:</strong> Pour revenir en arrière, vous devez cliquer sur le bouton à gauche du menu principale.</p>
                <img src="@/assets/images/help/add-exe-new4.png" />
                <p class="center">4- Pour sauvegarder l'exercice, vous devez cliquer sur le bouton <strong>Créez l'exercice</strong>.</p>
                <img src="@/assets/images/help/add-exe-new5.png" />
                <p class="center">5- L'exercice a été ajouté correctement. Vous pouvez le modifier par la suite si vous le souhaitez.</p>
                <img src="@/assets/images/help/add-exe-new6.png" />
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
    },
    created(){
        console.log('created')
    }
}
</script>