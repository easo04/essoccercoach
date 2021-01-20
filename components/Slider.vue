<template>
    <div class="slider-component">
        <div class="zone-text" v-if="showTextTop">
            <p>{{slide.text}}</p>
        </div>
        <div class="sliders">
            <div class="images">      
                <img :src="require('~/assets/images/sliders/' + slide.image)" />       
            </div>
            <div class="slides">
                <div class="slide" :class="{'active' : slide.indexImg === i}" v-for="(s, i) in slides" :key="i" @click="selectSlide(i)"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['lstSlides', 'autoplay', 'showTextTop', 'interval', 'currentIndex'],
    data(){
        return{
            slides : [],
            slide:{indexImg:0, image:undefined, text:undefined},
        }
    },
    watch:{
        currentIndex(){
            this.slide.indexImg = this.currentIndex;
            this.slide.image = this.slides[this.currentIndex].image;
            this.slide.text = this.slides[this.currentIndex].text;
        }
    },
    methods:{
        selectSlide(index){
            this.slide.indexImg = index;
            this.slide.image = this.slides[index].image;
            this.slide.text = this.slides[index].text;
        }
    },
    created(){
        this.slides = this.lstSlides;
        this.slide.image = this.slides[0].image;
        this.slide.text = this.slides[0].text;
    },
    mounted(){
        if(this.autoplay){
            const timeInterval = this.interval || 5;
            setInterval(() => {
                if(this.slide.indexImg < this.slides.length -1){   
                    this.slide.indexImg++;
                }else{    
                    this.slide.indexImg = 0;
                }

                this.slide.image = this.slides[this.slide.indexImg].image;  
                this.slide.text = this.slides[this.slide.indexImg].text;
            }, timeInterval*1000);
        }
    }
}
</script>
<style lang="scss">
    .slider-component{
        .zone-text{
            min-height: 60px;
            p{
                margin-top: 0;
            }
        }
        .sliders{
            height: auto;
            width: 100%;
            .images{
                height:300px;
                width: 100%;
                border-radius: 5px;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 5px;
                }
            }
            .slides{
                display: flex;
                justify-content: center;
                margin-top: 10px;
                .slide{
                    height: 10px;
                    width: 10px;
                    border-radius: 50%;
                    border:1px solid #28ABB9;
                    cursor: pointer;
                    &:not(:last-child){
                        margin-right: 10px;
                    }

                    &.active{
                        background-color: #28ABB9;
                    }
                }
            }
        }
    }
</style>