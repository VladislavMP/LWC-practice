export { 
    openEdit, openCreate, openView, openStart, 
    findContact, buildJsonBody, showErrorMessage, showSuccessMessage 
};
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

function openEdit() {
    let openWindow = {
        openEdit: true,
        openCreate: false,
        openView: false,
        openStart: false,
    }

    return openWindow;
}

function openCreate() {
    let openWindow = {
        openEdit: false,
        openCreate: true,
        openView: false,
        openStart: false,
    }

    return openWindow;
}

function openView() {
    let openWindow = {
        openEdit: false,
        openCreate: false,
        openView: true,
        openStart: false,
    }

    return openWindow;
}

function openStart() {
    let openWindow = {
        openEdit: false,
        openCreate: false,
        openView: false,
        openStart: true,
    };

    return openWindow;
}

function findContact(contactId, listContact10) {
    let requiredContact = listContact10.find(
        (contact) => contact.Id === contactId
    );

    return requiredContact;
}

function buildJsonBody(template, contact, cssClass) {
    template.querySelectorAll(cssClass).forEach(field => {
        contact[field.label] = field.value;
    });
    let contactJson = JSON.stringify({ 'attributes': { 'type': 'Contact' }, contact });
    return contactJson;
}

function showErrorMessage(title, message){
    dispatchEvent(
        new ShowToastEvent({
            title: title,
            message: message,
            variant: 'error'
        })
    );
}

function showSuccessMessage(message){
    dispatchEvent(
        new ShowToastEvent({
            title: 'Success',
            message: message,
            variant: 'success'
        })
    );
}

