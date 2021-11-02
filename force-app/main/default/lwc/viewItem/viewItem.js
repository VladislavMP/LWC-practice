import { LightningElement, api } from 'lwc';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ViewItem extends LightningElement {
    @api contact;

    handleClick(event) {
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
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Record deleted',
                        variant: 'success'
                    })
                );
                this.dispatchEvent(updateEvent);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error deleting record',
                        message: error.body.message + this.contact.Id,
                        variant: 'error'
                    })
                );
            });
    }

    handleEdit(event) {
        const editEvent = new CustomEvent('edit', {
            detail: this.contact.Id
        });
        this.dispatchEvent(editEvent);
    }
}