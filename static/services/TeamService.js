const COACH_ROLES = [
    {code:'ENT', label:'Entraîneur'},
    {code:'ASS', label:'Entraîneur assistant'},
    {code:'G', label:'Gérant'},
];

const PLAYER_POSITION = [
    {code:'G', label:'Gardien(e)', class:'gardien'},
    {code:'DFC', label:'Défenseur centre', class:'defenseur'},
    {code:'DG', label:'Défenseur gauche', class:'defenseur'},
    {code:'DD', label:'Défenseur droite', class:'defenseur'},
    {code:'MC', label:'Milieu centre', class:'milieu'},
    {code:'MD', label:'Milieu droite', class:'milieu'},
    {code:'MG', label:'Milieu gauche', class:'milieu'},
    {code:'ATT', label:'Attaquant', class:'attaquant'},
    {code:'ED', label:'Attaquant droite', class:'attaquant'},
    {code:'EG', label:'Attaquant gauche', class:'attaquant'},
];


class TeamService{

    static getCoachRoleLabelByCode(code){
        return COACH_ROLES.find(role => role.code === code).label;
    }

    static getPlayerPositionByCode(code){
        return PLAYER_POSITION.find(position => position.code === code).label;
    }

    static getListPositions(){
        return PLAYER_POSITION;
    }

    static getListRoles(){
        return COACH_ROLES;
    }
}

module.exports = TeamService