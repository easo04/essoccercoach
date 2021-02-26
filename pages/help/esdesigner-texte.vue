<template>
    <div class="help-page-content">
        <h2>Ajoutez du texte à votre exercice</h2>
        <div class="description-page">
            <p>Vous pouvez ajouter du texte à votre exercice, changer sa couleur et chager son emplacement sur le terrain.</p>
        </div>
        <div class="content-page">
            <div class="item-content">
                <h3>Changez la couleur du texte</h3>
                <p>Vous devez choisir la couleur que vous souhaitez et ajouter le texte par la suite.</p>
                <img src="@/assets/images/help/change-color-texte.gif" />
            </div>
            <div class="item-content">
                <h3>Changez l'emplacement du texte</h3>
                <p>Vous devez sélectionner le texte et le  déplacer sur le terrain. Également, vous pouvez faire une rotation de votre texte.</p>    
                <img src="@/assets/images/help/rotation-texte.png" />
            </div>
            <div class="item-content">
                <h3>Faire une copie du texte</h3>
                <img src="@/assets/images/help/make-copy-texte.png" />
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