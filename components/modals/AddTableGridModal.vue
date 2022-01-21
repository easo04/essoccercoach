<template>
    <div class="modal-add-table-grid modal-custom">
        <div class="modal-header">
            <div class="titre-modal"><h3>Ajoutez un tableau</h3></div>
            <div class="close-modal"><span @click="hide()"><font-awesome-icon :icon="['fas', 'times']"/></span></div>
        </div>
        <div class="modal-content">
            <div class="grid-creator">
                <div class="grid-row" id="grid-row" v-for="row in grid.rows" :key="row.id">
                    <div class="column" v-for="(column, i) in grid.columns" :key="i">
                    </div>
                    <button class="add-column" @click="addColumn()"><font-awesome-icon :icon="['fas', 'plus']"/></button>
                </div>
                <button class="add-column" @click="addRow()"><font-awesome-icon :icon="['fas', 'plus']"/></button>
            </div>
        </div>
        <div class="modal-footer">
            <div class="actions">
                <button class="btn btn-default" @click.prevent="saveRow()">Ajoutez le taleau</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            grid:{
                rows:[{id:1}],
                columns:[{id:1}, {id:2}]
            }
        }
    },
    methods:{
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
            this.$root.$emit('addGrid', this.grid);
            this.hide();
        }
    }
}
</script>