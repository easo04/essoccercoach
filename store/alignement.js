export const state = () => ({
    alignement:{},
    lstSystemes11Players:[{'systeme':'4-4-2','att':2,'mc':4, 'def':4},
        {'systeme':'3-5-2','att':2,'mc':5, 'def':3}, {'systeme':'4-3-3','att':3,'mc':3, 'def':4},
        {'systeme':'3-4-3','att':3,'mc':4, 'def':3}, {'systeme':'4-5-1','att':1,'mc':5, 'def':4},
        {'systeme':'5-3-2','att':2,'mc':3, 'def':5}, {'systeme':'4-2-4','att':4,'mc':2, 'def':4}],
    lstSystemes9Players:[{'systeme':'3-3-2','att':2,'mc':3, 'def':3},
        {'systeme':'3-4-1','att':1,'mc':4, 'def':3}, {'systeme':'3-2-3','att':3,'mc':2, 'def':3}, 
        {'systeme':'4-3-1','att':1,'mc':3, 'def':4}, {'systeme':'4-2-2','att':2,'mc':2, 'def':4},
        {'systeme':'5-2-1','att':1,'mc':2, 'def':5}, {'systeme':'5-1-2','att':2,'mc':1, 'def':5}],
    lstSystemes7players:[{'systeme':'2-3-1','att':1,'mc':3, 'def':2},
        {'systeme':'2-2-2','att':2,'mc':2, 'def':2}, {'systeme':'2-1-3','att':3,'mc':1, 'def':2}, 
        {'systeme':'3-1-2','att':2,'mc':1, 'def':3}, {'systeme':'3-2-1','att':1,'mc':2, 'def':3},
        {'systeme':'1-4-1','att':1,'mc':4, 'def':1}, {'systeme':'1-3-2','att':2,'mc':3, 'def':1}],
    lstSysteme5players:[{'systeme':'2-2','att':2,'mc':0, 'def':2},
        {'systeme':'2-1-1','att':1,'mc':1, 'def':2}, {'systeme':'3-1','att':1,'mc':0, 'def':3},
        {'systeme':'1-3','att':3,'mc':0, 'def':1}, {'systeme':'1-2-1','att':1,'mc':2, 'def':1}],
});

export const mutations = {
    setAlignement(state, newValue) {
        state.alignement = newValue;
    },
    setSysteme(state, newValue){
        state.alignement.systeme = newValue;
    },
    setNbPlayers(state, newValue){
        state.alignement.nbPlayers = newValue;
    }
}