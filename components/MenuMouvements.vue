<template>
    <div class="menu-mouvements">
        <div class="menu-actions">
            <div class="actions-primary">
                <span @click="play()" title="Play"><font-awesome-icon :icon="['fas', 'play-circle']"/></span>
                <span @click="startVideo()"><font-awesome-icon :icon="['fas', 'video']"/></span>
            </div>
            <div class="actions-secondary">
                <div>
                    <span @click="()=>showMenuSecondary = !showMenuSecondary"><font-awesome-icon :icon="['fas', 'ellipsis-v']"/></span>
                </div>
            </div>
            
            <div class="list-actions-secondary" v-show="showMenuSecondary">
                <div><span @click="setVitesse()"><font-awesome-icon :icon="['fas', 'tachometer-alt']"/></span><span class="label">Vitesse x{{vitesse}}</span> </div>
                <div v-if="inBoucle"><span @click="boucle()"><font-awesome-icon :icon="['fas', 'toggle-on']"/></span><span class="label">Boucle</span> </div>
                <div v-else><span @click="boucle()"><font-awesome-icon :icon="['fas', 'toggle-off']"/></span><span class="label">Boucle</span> </div>
                <div><span @click="deleteAll()"><font-awesome-icon :icon="['fas', 'trash-alt']"/></span><span class="label">Tout supprimer</span> </div>
            </div>
        </div>
        <div class="list-mouvements">
            <div class="item-mouvement" v-for="(item, i) in listeItems" :key="i" :class="{'played' : item.played}">
                <div>Mouv. {{(i+1)}}</div>
                <div class="item-actions">
                    <div>
                        <span @click="playItem(item)"><font-awesome-icon :icon="['fas', 'play']"/></span>
                        <span @click="removeItem(i)"><font-awesome-icon :icon="['fas', 'trash']"/></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
const ID_TERRAIN = 'terrainSoccer';
const NB_ITERATIONS_TO_MOVE = 100;

function setPositionObject(objectForme, pointX, pointY){
    objectForme.style.webkitTransform = objectForme.style.transform =
    'translate(' + pointX + 'px,' + pointY + 'px)';
    
    objectForme.setAttribute('data-x', pointX);
    objectForme.setAttribute('data-y', pointY);
}

export default {
    props:['show'],
    data(){
        return{
            objectSelected:undefined,
            listeItems:[],
            lastCoordonates:{},
            vitesse:1,
            inBoucle:false,
            showMenuSecondary:false
        }
    },
    methods:{
        clickTerrainSoccer(event){
            if(!this.show){
                return;
            }
            
            let lastObjectSelected = $('.object-selected-outil');
            //if(event.target.id === ID_TERRAIN && this.show){
            if(this.objectSelected && this.objectSelected.id !== event.target.id){
                this.lastCoordonates.pointY = event.layerY;
                this.lastCoordonates.pointX = event.layerX;

                this.addItem(event.layerX, event.layerY);

                this.objectSelected = undefined;
                
                lastObjectSelected?.removeClass('object-selected-outil');
            }else{
                this.objectSelected = lastObjectSelected[0];
            }
        },
        initAllObjectsToPointDepart(){
            let listObjectsForme = [];
            for(let i=0;i<this.listeItems.length;i++){
                if(!listObjectsForme.includes(this.listeItems[i].id)){
                    
                    let objectForme = document.getElementById(this.listeItems[i].id);
                    setPositionObject(objectForme, this.listeItems[i].pointX, this.listeItems[i].pointY);
                    listObjectsForme.push(this.listeItems[i].id);
                }
                
                this.listeItems[i].played = false;
            }
        },
        async play(){
            if(this.listeItems.length > 0){
                if(this.inBoucle){
                    this.playInBoucle();
                }else{
                    this.playNormal();
                }
            }
        },
        async playInBoucle(){
            while(this.inBoucle){
                await this.playNormal();
            }
        },
        async playNormal(){
            this.initAllObjectsToPointDepart();

            //bouger tous les éléments
            for(let i=0;i<this.listeItems.length;i++){
                await this.playItem(this.listeItems[i]);
                this.listeItems[i].played = true;
            }

            setTimeout(()=>{
                for(let i=0;i<this.listeItems.length;i++){
                    this.listeItems[i].played = false;
                }
            }, 1000);
        },
        playItem(item){
            let objectForme =  document.getElementById(item.id);

            if(objectForme){
                
                let iterations = 0;
                let pointX = item.pointX;
                let pointY = item.pointY;

                return new Promise((resolve, reject) => {
                    const interval = setInterval(move, this.vitesse * 10);

                    function move(){
                        if(iterations === NB_ITERATIONS_TO_MOVE){
                            clearInterval(interval);  
                            resolve(true);
                        }

                        iterations++;

                        let moveX = pointX + Math.round(((item.pointToGoX - pointX) / NB_ITERATIONS_TO_MOVE) * iterations);
                        let moveY = pointY + Math.round(((item.pointToGoY - pointY) / NB_ITERATIONS_TO_MOVE) * iterations);

                        setPositionObject(objectForme, moveX, moveY);
                    }

                });
            }
        },
        addItem(x, y){
            //const objectSelected = document.getElementsByClassName('object-selected-outil');
            let objectForme = this.objectSelected || undefined;
            if(objectForme){
                const originX = (parseFloat(objectForme.getAttribute('data-x')) || 0);
                const originY = (parseFloat(objectForme.getAttribute('data-y')) || 0);

                const width = parseFloat(objectForme.clientWidth);
                const height = parseFloat(objectForme.clientHeight);
                const toGoX = x - Math.round((width / 2));
                const toGoY = y - Math.round((height / 2));

                let item = {
                    id:objectForme.id,
                    pointX:originX,
                    pointY:originY,
                    pointToGoX:toGoX,
                    pointToGoY:toGoY,
                    played:false
                };

                this.listeItems.push(item);

                setPositionObject(objectForme, toGoX, toGoY);
            }
        },
        removeItem(index){
            this.listeItems.splice(index, 1);
        },
        boucle(){
            this.inBoucle = !this.inBoucle;
        },
        startVideo(){
            let captureStream = null;	
            
            const displayMediaOptions = {	
                video: {	
                    cursor: "never"	
                }, 	
                audio: false, 	
                logicalSurface: false, 	
            }
            
            return navigator.mediaDevices.getDisplayMedia(displayMediaOptions)	
                .catch(err => { console.error("Error:" + err); return null; });
        },
        async startCapture(displayMediaOptions) {	
            let captureStream = null;	

            try {	
                captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);	
                this.dumpOptionsInfo();
            } catch(err) {	
                console.error("Error: " + err);	
            }	
            return captureStream;
        },
        dumpOptionsInfo() {	
            /*const videoTrack = videoElem.srcObject.getVideoTracks()[0];	
            console.info("Track settings:");	
            console.info(JSON.stringify(videoTrack.getSettings(), null, 2));	
            console.info("Track constraints:");	
            console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));*/
        },
        setVitesse(){
            if(this.vitesse === 3){
                this.vitesse = 1;
            }else{
                this.vitesse++;
            }
        },
        deleteAll(){
            this.initAllObjectsToPointDepart();
            this.listeItems = [];
        }

    },
    mounted(){
        document.getElementById('terrainSoccer').addEventListener('click', event =>{
            this.clickTerrainSoccer(event);
        });
    },
}
</script>
