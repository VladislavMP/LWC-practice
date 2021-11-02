import { LightningElement } from 'lwc'; 

export default class ViewApp extends LightningElement {
    value = '';
    openTable = false;
    openList = false;

    get options() {
        return [
            { label: 'Table', value: 'table' },
            { label: 'List', value: 'list' },
        ];
    }

    changeValue(event) {
        this.value = event.target.value;
        this.openTable = false;
        this.openList = false;
        
        if (this.value == 'table') {
            this.openTable = true;
        }
        if (this.value == 'list') {
            this.openList = true;
        }
    }
}