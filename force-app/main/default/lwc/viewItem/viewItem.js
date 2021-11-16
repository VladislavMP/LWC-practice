import { LightningElement, api } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import {
    showErrorMessage, showSuccessMessage
} from './viewItemHelper.js';
import { NavigationMixin } from 'lightning/navigation';

export default class ViewItem extends NavigationMixin(LightningElement) {
    @api contact;

    handleToRecordPage() {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                recordId: this.contact.Id,
                objectApiName: 'Contact',
                actionName: 'view'
            }
        }).then(url => {
            window.open(url, "_blank");
        });
    }

    handleRecordSelection(event) {
        const selectEvent = new CustomEvent('select', {
            detail: this.contact.Id
        });
        this.dispatchEvent(selectEvent);
    }

    handleDelete(event) {
        const updateEvent = new CustomEvent('update', {
            detail: this.contact.Id
        });
        deleteRecord(this.contact.Id)
            .then(() => {
                showSuccessMessage('Record deleted');
                this.dispatchEvent(updateEvent);
            })
            .catch(error => {
                showErrorMessage('Error deleting record', error.body.message);
            });
    }

    handleEdit(event) {
        const editEvent = new CustomEvent('edit', {
            detail: this.contact.Id
        });
        this.dispatchEvent(editEvent);
    }
}