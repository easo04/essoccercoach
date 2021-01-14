<template>
    <div class="tableau-canvas">
        <canvas id="pizarra" @mousedown="empezarDibujo($event)" @mousemove="dibujarLinea($event)"
            @mouseup="pararDibujar($event)" @touchstart="empezarDibujo($event)" @touchmove="dibujarLinea($event)"></canvas>
    </div>
</template>
<script>
export default {
    data(){
        return{
            lineas : [],
            correccionX : 0,
            correccionY : 0,
            pintarLinea : false,
            // Marca el nuevo punto
            nuevaPosicionX : 0,
            nuevaPosicionY : 0,
            miCanvas:undefined,
            firstTime:true,
        }
    },
    methods:{
        empezarDibujo() {
            this.pintarLinea = true;
            this.lineas.push([]);
        },

        /**
         * Funcion que guarda la posicion de la nueva línea
         */
        guardarLinea() {
            this.lineas[this.lineas.length - 1].push({
                x: this.nuevaPosicionX,
                y: this.nuevaPosicionY
            });
        },

        /**
         * Funcion dibuja la linea
         */
        dibujarLinea(event) {
            this.miCanvas = document.getElementById('pizarra');
            let posicion = this.miCanvas.getBoundingClientRect();
            if(this.firstTime){
                this.correccionX = posicion.x;
                this.correccionY = posicion.y;
                this.miCanvas.width = this.miCanvas.width;
                this.miCanvas.height = this.miCanvas.height;
                this.firstTime = false;
            }
            event.preventDefault();
            if (this.pintarLinea) {
                let ctx = this.miCanvas.getContext('2d')
                // Estilos de linea
                ctx.lineJoin = ctx.lineCap = 'round';
                ctx.lineWidth = 10;
                // Color de la linea
                ctx.strokeStyle = '#fff';
                // Marca el nuevo punto
                if (event.changedTouches == undefined) {
                    // Versión ratón
                    this.nuevaPosicionX = event.layerX;
                    this.nuevaPosicionY = event.layerY;
                } else {
                    // Versión touch, pantalla tactil
                    this.nuevaPosicionX = event.changedTouches[0].pageX - this.correccionX;
                    this.nuevaPosicionY = event.changedTouches[0].pageY - this.correccionY;
                }
                // Guarda la linea
                this.guardarLinea();
                // Redibuja todas las lineas guardadas
                ctx.beginPath();
                this.lineas.forEach(function (segmento) {
                    ctx.moveTo(segmento[0].x, segmento[0].y);
                    segmento.forEach(function (punto, index) {
                        ctx.lineTo(punto.x, punto.y);
                    });
                });
                ctx.stroke();
            }
        },

        /**
         * Funcion que deja de dibujar la linea
         */
        pararDibujar () {
            this.pintarLinea = false;
            this.guardarLinea();
        }
    },
    mounted(){
        let terrain = document.getElementById('terrainSoccer');
    }
}
</script>