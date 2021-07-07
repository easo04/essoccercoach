const COACH_ROLES = [
    {code:'ENT', label:'Entraîneur'},
    {code:'ASS', label:'Entraîneur assistant'},
    {code:'G', label:'Gérant'},
];

const PLAYER_POSITION = [
    {code:'G', label:'Gardien(e)'},
    {code:'DFC', label:'Défenseur centre'},
    {code:'DG', label:'Défenseur gauche'},
    {code:'DD', label:'Défenseur droite'},
    {code:'MC', label:'Milieu centre'},
    {code:'ATT', label:'Attaquant'},
    {code:'ED', label:'Attaquant droite'},
    {code:'EG', label:'Attaquant gauche'},
    {code:'MD', label:'Milieu droite'},
    {code:'MG', label:'Milieu gauche'}
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