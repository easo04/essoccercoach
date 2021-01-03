$(function() {
    //printAll();
});


//url svg
const svgIconsUrl = "/icons/icons.svg";

//method to print icon
const printIcon = (url, iconName, element, stroke) =>{
    const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    
    if(stroke){
        svgElement.classList.add('icon-stroke');
    }else{
        svgElement.classList.add('icon');
    }
    
    svgIcon.setAttribute('href', `${url}#${iconName}`);
    svgElement.appendChild(svgIcon);

    element.insertAdjacentElement('afterbegin', svgElement);
};

function printAllIcons(){
    //select and print the icons
    document.querySelectorAll('.icon-circle-s').forEach(el => {
        printIcon(svgIconsUrl, 'circle-solid', el);
    });
    document.querySelectorAll('.icon-circle-r').forEach(el => {
        printIcon(svgIconsUrl, 'circle-stroke', el, true);
    });
    document.querySelectorAll('.icon-square-s').forEach(el => {
        printIcon(svgIconsUrl, 'square-solid', el);
    });
    document.querySelectorAll('.icon-square-r').forEach(el => {
        printIcon(svgIconsUrl, 'square-stroke', el);
    });
    document.querySelectorAll('.icon-triangle-s').forEach(el => {
        printIcon(svgIconsUrl, 'triangle-solid', el);
    });
    document.querySelectorAll('.icon-triangle-r').forEach(el => {
        printIcon(svgIconsUrl, 'triangle-stroke', el, true);
    });
    document.querySelectorAll('.icon-line-h').forEach(el => {
        printIcon(svgIconsUrl, 'line-h-solid', el);
    });
    document.querySelectorAll('.icon-line-v').forEach(el => {
        printIcon(svgIconsUrl, 'line-v-solid', el);
    });
    document.querySelectorAll('.icon-line-d').forEach(el => {
        printIcon(svgIconsUrl, 'line-d-solid', el);
    });
    document.querySelectorAll('.icon-diamond-s').forEach(el => {
        printIcon(svgIconsUrl, 'diamond-solid', el);
    });
    document.querySelectorAll('.icon-diamond-r').forEach(el => {
        printIcon(svgIconsUrl, 'diamond-stroke', el);
    });
    document.querySelectorAll('.icon-terrain').forEach(el => {
        printIcon(svgIconsUrl, 'terrain', el, true);
    });
    document.querySelectorAll('.icon-outil').forEach(el => {
        printIcon(svgIconsUrl, 'outil', el);
    });
    document.querySelectorAll('.icon-player').forEach(el => {
        printIcon(svgIconsUrl, 'player', el);
    });
    document.querySelectorAll('.icon-arrow').forEach(el => {
        printIcon(svgIconsUrl, 'arrow', el);
    });
    document.querySelectorAll('.icon-player-text').forEach(el => {
        printIcon(svgIconsUrl, 'player-text', el);
    });
    document.querySelectorAll('.icon-player-color').forEach(el => {
        printIcon(svgIconsUrl, 'player-color', el);
    });
}

function printSvg(){
    document.querySelectorAll('.icon-player-text').forEach(el => {
        printIcon(svgIconsUrl, 'player-text', el);
    });
}

//(function() {})();
