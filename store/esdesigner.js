export const state = () => ({
    exercice:50,
    listeTerrains : [
        {'name': 'terrain11', 'color': '', 'image': 'terrain11.png'},	
        {'name': 'terrain10', 'color': '', 'image': 'terrain10.png'},    
        {'name': 'terrain17', 'color': '', 'image': 'terrain17.png'},
        {'name': 'terrain18', 'color': '', 'image': 'terrain18.png'},
        {'name': 'terrain19', 'color': '', 'image': 'terrain19.png'},
        {'name': 'terrain1', 'color': '', 'image': 'terrain1.png'},
        {'name': 'terrain14', 'color': '', 'image': 'terrain14.png'},
        {'name': 'terrain16', 'color': '', 'image': 'terrain16.png'},
        {'name': 'terrain13', 'color': '', 'image': 'terrain13.png'},
    ],
    listeTerrainsLines : [
        {'name': 'terrain1', 'color': '', 'image': 'terrain1.png'},	
        {'name': 'terrain2', 'color': '', 'image': 'terrain2.png'},    
        {'name': 'terrain3', 'color': '', 'image': 'terrain3.png'},    
        {'name': 'terrain4', 'color': '', 'image': 'terrain4.png'},    
        {'name': 'terrain5', 'color': '', 'image': 'terrain5.png'},      
        {'name': 'terrain6', 'color': '', 'image': 'terrain6.png'},  
    ],
    listeJoueurs : [
        {'name': 'player-mouvement-red', 'image': 'player-mouvement-red.png'},
        {'name': 'player-mouvement-blue', 'image': 'player-mouvement-blue.png'},
        {'name': 'player-mouvement-yellow', 'image': 'player-mouvement-yellow.png'},
        {'name': 'player-mouvement-black', 'image': 'player-mouvement-black.png'},
    ],
    listeGardiens : [
        {'name': 'player-gardien-green', 'image': 'player-gardien-green.png'},
        {'name': 'player-gardien-orange', 'image': 'player-gardien-orange.png'},
        {'name': 'player-gardien-mauve', 'image': 'player-gardien-mauve.png'},
    ],
    listeOutils : [
        {'name': 'ballon', 'image': 'ball.svg', 'type':'ball'},
        {'name': 'ballons', 'image': 'balls.svg', 'type':'ball'},
        {'name': 'but', 'image': 'but.svg', 'type':'buts'},
        {'name': 'but-grand', 'image': 'but-grand.svg', 'type':'buts'},
        {'name': 'but2', 'image': 'but2.svg', 'type':'buts'},
        {'name': 'cone orange', 'image': 'cone-orange.svg', 'type':'cones'},
        {'name': 'cone jaune', 'image': 'cone-yellow.svg', 'type':'cones'},
        {'name': 'cone rouge', 'image': 'cone-red.svg', 'type':'cones'},
        {'name': 'cone blue', 'image': 'cone-blue.svg', 'type':'cones'},  
        {'name': 'cone orange', 'image': 'cone2-orange.svg', 'type':'cones'},
        {'name': 'cone jaune', 'image': 'cone2-yellow.svg', 'type':'cones'},
        {'name': 'cone rouge', 'image': 'cone2-red.svg', 'type':'cones'},
        {'name': 'cone blue', 'image': 'cone2-blue.svg', 'type':'cones'},   
        {'name': 'hoop noir', 'image': 'hoop-black.svg', 'type':'others'}, 
        {'name': 'hoop rouge', 'image': 'hoop-red.svg', 'type':'others'},
        {'name': 'échelle', 'image': 'stair.svg', 'type':'others'},
        {'name': 'pick noir', 'image': 'pick-black.svg', 'type':'others'},        
        {'name': 'pick rouge', 'image': 'pick-red.svg', 'type':'others'},     
        {'name': 'pick jaune', 'image': 'pick-yellow.svg', 'type':'others'}, 
        {'name': 'drapeau noir', 'image': 'flag-black.svg', 'type':'others'}, 
        {'name': 'drapeau rouge', 'image': 'flag-red.svg', 'type':'others'},
        {'name': 'hurdles noir', 'image': 'hurdles-black.svg', 'type':'others'},
        {'name': 'hurdles rouge', 'image': 'hurdles-red.svg', 'type':'others'},
        {'name': 'blocking noir', 'image': 'blocking-black.svg', 'type':'others'},
        {'name': 'blocking rouge', 'image': 'blocking-red.svg', 'type':'others'},
    ],
    listeLignes : [
        {'name': 'Mouvement', 'image': 'arrow6.svg', 'forme': '', 'type':'run'},
        {'name': 'Drible', 'image': 'arrow11.svg', 'forme': '', 'type':'drible'},
        {'name': 'Drible', 'image': 'arrow29.svg', 'forme': '', 'type':'drible'},
        {'name': 'Passe en profondeur', 'image': 'arrow9.svg', 'forme': '', 'type':'pass'},
        {'name': 'Mouvement courve', 'image': 'arrow32.svg', 'forme': '', 'type':'run'},
        {'name': 'Passe courve', 'image': 'arrow28.svg', 'forme': '', 'type':'pass'},
        {'name': 'Passe', 'image': 'arrow17.svg', 'forme': '', 'type':'pass'},
        {'name': 'Aller-retour', 'image': 'arrow20.svg', 'forme': '', 'type':'run'},
        {'name': 'Aller-retour', 'image': 'arrow25.svg', 'forme': '', 'type':'run'},
        {'name': 'Tirs', 'image': 'arrow24.svg', 'forme': '', 'type':'pass'},
        {'name': 'Passe aller-retour', 'image': 'arrow26.svg', 'forme': '', 'type':'pass'},
        {'name': 'Se déplacer', 'image': 'arrow27.svg', 'forme': '', 'type':'run'},
    ],
    listeTerrainsAlignements : [
        {'name': 'terrain1', 'color': '', 'image': 'terrain1.jpg'},	
        {'name': 'terrain2', 'color': '', 'image': 'terrain2.jpg'},    
        {'name': 'terrain3', 'color': '', 'image': 'terrain3.jpg'},
        {'name': 'terrain4', 'color': '', 'image': 'terrain4.jpg'},
        {'name': 'terrain5', 'color': '', 'image': 'terrain5.jpg'},
        {'name': 'terrain6', 'color': '', 'image': 'terrain6.jpg'},
        {'name': 'terrain7', 'color': '', 'image': 'terrain7.jpg'},
        {'name': 'terrain8', 'color': '', 'image': 'terrain8.jpg'},
    ],
    listeJoueursAlignements :[
        {'name': 'player5', 'image': 'player5.png'},
        {'name': 'player6', 'image': 'player6.png'},
        {'name': 'player7', 'image': 'player7.png'},
        {'name': 'player8', 'image': 'player8.png'},
        {'name': 'player9', 'image': 'player9.png'},
        {'name': 'player10', 'image': 'player10.png'},
        {'name': 'player11', 'image': 'player11.png'},
        {'name': 'player12', 'image': 'player12.png'},
        {'name': 'player13', 'image': 'player13.png'},
        {'name': 'player14', 'image': 'player14.png'},
        {'name': 'player15', 'image': 'player15.png'},
        {'name': 'player16', 'image': 'player16.png'},
    ],
})

export const getters = {
    passLignes: (state) =>{
        return state.listeLignes.filter(ligne => ligne.type === 'pass');
    },
    runLignes: (state) =>{
        return state.listeLignes.filter(ligne => ligne.type === 'run');
    },
    dribleLignes: (state) =>{
        return state.listeLignes.filter(ligne => ligne.type === 'drible');
    },
    outilBallons: (state) =>{
        return state.listeOutils.filter(outil => outil.type === 'ball');
    },
    outilCones: (state) =>{
        return state.listeOutils.filter(outil => outil.type === 'cones');
    },
    outilAutres: (state) =>{
        return state.listeOutils.filter(outil => outil.type === 'others');
    },
    outilButs: (state) =>{
        return state.listeOutils.filter(outil => outil.type === 'buts');
    },

}