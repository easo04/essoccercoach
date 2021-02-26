<template>
    <div class="help-page-content">
        <h2>Commencez avec ESDesigner pour créer vos exercices de soccer</h2>
        <div class="description-page">
            <p>ESDesigner est un outil qui permet de créer des exercices de soccer et les télécharger en format png.</p>
        </div>
        <div class="content-page">
            <div class="item-content">
                <h3>Sélectionnez les terrains</h3>
                <p>Vous pouvez choisir entre 9 terrains disponibles pour créer votre exercice.</p>
                <img src="@/assets/images/help/select-terrain.png" />
                <p class="center">Vous pouvez aussi choisir des terrains avec des lignes déjà configurés.</p>     
                <img src="@/assets/images/help/select-terrain2.png" />
            </div>
            <div class="item-content">
                <h3>Sélectionnez les joueurs</h3>
                <p>Vous pouvez ajouter différents types de joueurs à votre exercice.</p>
                <ul>
                    <li>Joueurs sans texte</li>
                    <li>Joueurs avec texte (Vous pouvez ajouter un texte par dessous le joueur)</li>
                    <li>Joueurs en mouvement (Vous pouvez changer l'orientation du joueur)</li>
                    <li>Gardiens de but</li>
                </ul>
                <img src="@/assets/images/help/select-joueurs.png" />
            </div>
            <div class="item-content">
                <h3>Sélectionnez les outils</h3>
                <p>Vous pouvez ajouter des outils à votre exercice comme des buts, des cônes, des échelles, des ballons, etc. Vous pouvez changer l'orientation des buts comme vous le souhaitez.</p>
                <img src="@/assets/images/help/select-outils.png" />
            </div>
            <div class="item-content">
                <h3>Sélectionnez les fleches</h3>
                <p>Vous pouvez ajouter des fleches et choisir parmis les différents types disponibles. Vous pouvez changer l'orientation des fleches en tout temps.</p>
                <img src="@/assets/images/help/select-fleches.png" />
                <p class="center">Également, vous pouvez changer la grandeur de la fleche.<br><br>
                    <font-awesome-icon :icon="['fas', 'search-plus']"/> pour augmenter et <font-awesome-icon :icon="['fas', 'search-minus']"/> pour diminuer.</p>
                <img src="@/assets/images/help/select-fleches2.png" />
            </div>
            <div class="item-content">
                <h3>Téléchargez l'exercice</h3>
                <p>Pour télécharger l'exercice, vous devez cliquer sur l'icône à droite du menu principale.</p>
                <img src="@/assets/images/help/download-exercice.png" />
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