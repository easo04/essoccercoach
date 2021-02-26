<template>
    <div class="help-page-content">
        <h2>Ajoutez des formes à votre exercice</h2>
        <div class="description-page">
            <p>Vous pouvez ajouter des formes à votre exercice, changer leur grandeur, leur couleur et leur transparence.</p>
        </div>
        <div class="content-page">
            <div class="item-content">
                <h3>Changez la couleur de la forme</h3>
                <p>Vous devez choisir la couleur que vous souhaitez et ajouter la forme par la suite.</p>
                <img src="@/assets/images/help/change-color-formes.gif" />
            </div>
            <div class="item-content">
                <h3>Changez la grandeur de la forme</h3>
                <p>Vous devez sélectionner la forme sur le terrain et ajuster la grandeur.</p>
                <img src="@/assets/images/help/change-dimensions-formes.gif" />
            </div>
            <div class="item-content">
                <h3>Changez la transparence</h3>
                <p>Vous devez sélectionner la forme sur le terrain et ajuster la transparence.</p>
                <img src="@/assets/images/help/change-transparence-forme.png" />
            </div>
            <div class="item-content">
                <h3>Faire une copie de la forme</h3>
                <p>Vous pouvez faire une copie d'une forme sélectionnée sur le terrain.</p>
                <img src="@/assets/images/help/make-copy-form.png" />
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