import { LightningElement, wire, api} from 'lwc';
import getContactList from '@salesforce/apex/viewTableContriller.getContactList';

const columns = [
    { label: 'Id', fieldName: 'Id', type: 'text'},
    { label: 'Name', fieldName: 'Name', type: 'text'},
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
];

export default class ViewTable extends LightningElement {
    columns = columns;
    amount = 5;
    @wire(getContactList, {amount: '$amount'})
    records;

    handleKeyChange(event){
        this.amount = event.target.value;
    }
}



