<template>
    <div class="modal-add-table-grid modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Ajoutez un tableau</h3></div>
            <div class="close-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
        </div>
        <div class="modal-content">
            
            <div class="actions">
                <span class="icon-action" id="reset" @click="reset()" title="Réinitialiser">Réinitialiser <font-awesome-icon :icon="['fas', 'trash-alt']"/></span>
            </div>
            <div class="grid-creator">
                <div class="grid-row" :class="row.class" :id="'grid-row-' + row.id" v-for="row in lstGrid.rows" :key="row.id">
                    <div class="column" :id="'grid-column-row-' + row.id + '-column-' + column.id" @mouseover="selectColumn(column, row)" @mouseout="deselectColumn(column, row)" @click="saveChoise(column, row)" v-for="column in lstGrid.columns" :key="row.id + '-' + column.id">
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <button class="btn btn-default" :class="{'disabled' : grid.rows.length === 0}" :disabled="grid.rows.length === 0" @click.prevent="saveRow()">Ajoutez le taleau</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            lstGrid:{
                rows:[{id:1, selected:false, class:'first-row'},{id:2,selected:false, class:''},{id:3,selected:false, class:''},{id:4,selected:false, class:'last-row'}],
                columns:[{id:1, selected:false, class:''},{id:2, selected:false, class:''},{id:3, selected:false, class:''},{id:4, selected:false, class:''}]
            },
            grid:{
                rows:[],
                columns:[]
            },
            choise:false
        }
    },
    methods:{
        reset(){
            this.choise = false;
            this.grid = {
                rows:[],
                columns:[]
            };

            let lstColumns = document.getElementsByClassName('column');
            lstColumns.forEach(column => {
                column.classList.remove('selected');
            });
        },
        hide () {
            this.$modal.hide('modal-add-table-grid');
        },
        addRow(){
            this.grid.rows.push({id:this.grid.rows.length + 1});
        },
        addColumn(){
            this.grid.columns.push({id:this.grid.columns.length + 1});
        },
        saveRow(){
            if(this.grid.rows.length > 0){
                this.$root.$emit('addGrid', this.grid);
                this.hide();
            }
        },
        selectColumn(column, row){

            if(this.choise){
                return;
            }
            
            if(column.id > 1 || row.id > 1){
                for(let j=1;j<=row.id;j++){
                    for(let i=1;i<=column.id;i++){
                        let columnTarget = document.getElementById('grid-column-row-' + j + '-column-' + i);
                        columnTarget.classList.add('selected');
                    }
                }
            }else{
                let columnTarget = document.getElementById('grid-column-row-' + row.id + '-column-' + column.id);
                columnTarget.classList.add('selected');
            }
        },
        deselectColumn(column, row){
            if(this.choise){
                return;
            }

            if(column.id > 1 || row.id >1){
                for(let j=1;j<=row.id;j++){
                    for(let i=1;i<=column.id;i++){
                        let columnTarget = document.getElementById('grid-column-row-' + j + '-column-' + i);
                        columnTarget.classList.remove('selected');
                    }
                }
            }else{
                let columnTarget = document.getElementById('grid-column-row-' + row.id + '-column-' + column.id);
                columnTarget.classList.remove('selected');
            }
        },
        saveChoise(column, row){
            this.grid.columns = [];
            this.grid.rows = [];
            this.choise = true;

            for(let i=1;i<=row.id;i++){
                this.addRow();
            }

            for(let i=1;i<=column.id;i++){
                this.addColumn();
            }
        }
    },
    mounted(){}
}
</script>