<template>
    <div class="spinner">
        <div class="spinner-content">
            <div class="spinner-spinner" v-if="spinner">
            </div>
            <div class="spinner-bound" v-if="bound">
                <div class="bound bound1"></div>
                <div class="bound bound2"></div>
                <div class="bound bound3"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['bound', 'spinner']
}
</script>
<style lang="scss">
    .spinner{
        
        .spinner-content{
            
            display: flex;
            justify-content: center;
            .spinner-spinner{
                width: 10rem;
                height: 10rem;
                border-radius: 50%;
                display:inline-block;
                border:2px solid #28ABB9;
                border-top-color: #fbfbfb;
                animation: 1s spin infinite ease-in-out;
            }

            @keyframes spin {
                to{
                    transform: rotate(360deg);
                }
            }

            .spinner-bound{
                .bound{
                    width: 3rem;
                    height: 3rem;
                    border-radius: 50%;
                    display:inline-block;
                    background-color: #28ABB9;
                    animation:1s bound infinite ease-in-out both; 
                }

                .bound1{
                    animation-delay: -0.30s;
                }

                .bound2{
                    animation-delay: -0.15s;
                }

            }

            @keyframes bound {
                0%, 80%, 100%{
                    transform: scale(0);
                }

                40%{
                    transform:scale(1);
                }
            }
        }

        p{
            margin-top: 18px;
            color:#FBFBFB;
            font-size:18px;
            font-family: Open Sans;
            text-align: center;
            text-align: center;
        }
    }
</style>