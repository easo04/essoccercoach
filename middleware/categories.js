export default function ({ store, route, redirect}) {

    const category = store.state.categories.find(c => c.name === route.params.categorie);
    if(!category){
        redirect('/exercices');
    }
}