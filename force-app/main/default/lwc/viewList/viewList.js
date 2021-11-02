import { LightningElement, wire, api, track } from 'lwc';
import getContactList from '@salesforce/apex/viewTableContriller.getContactList';
import updateContact from '@salesforce/apex/viewListController.updateContact';
import createContact from '@salesforce/apex/viewListController.createContact';
import { refreshApex } from '@salesforce/apex';
import { publish, MessageContext } from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';
import cactus from '@salesforce/resourceUrl/cact2';
import {
    openEdit, openCreate, openView, openStart,
    findContact, buildJsonBody, showErrorMessage, showSuccessMessage
} from './viewListHelper.js';

export default class ViewList extends LightningElement {

    listContact10 = [];
    currentPage = 1;
    totalPage = 0;
    listContactAll = [];
    wiredContacts;
    contact;
    editContact;
    cactus = cactus;

    openWindow = {
        openEdit: false,
        openCreate: false,
        openView: false,
        openStart: true,
    }

    @wire(getContactList, { amount: 100 })
    wiredContacts(result) {
        this.wiredContacts = result;
        if (this.wiredContacts.data) {
            this.listContactAll = this.wiredContacts.data;
            this.totalPage = Math.ceil(this.wiredContacts.data.length / 10);
            this.pageChanged(1);
        } else if (this.wiredContacts.error) {
            this.error = this.wiredContacts.error;
            this.listContact10 = undefined;
        }
    }

    @wire(MessageContext)
    messageContext;

    handleSelect(event) {
        this.openWindow = openView();
        this.editContact = findContact(event.detail, this.listContact10);

        const payload = { recordId: event.target.contact.Id };
        publish(this.messageContext, RECORD_SELECTED_CHANNEL, payload);
    }

    handleUpdate(event) {
        refreshApex(this.wiredContacts);
    }

    handleOpenEditWindow(event) {
        this.openWindow = openEdit();
        this.editContact = findContact(event.detail, this.listContact10)
    }

    handleOpenCreateWindow(event) {
        this.openWindow = openCreate();
    }

    handleCreateContact() {
        const contact = {};
        let contactJson = buildJsonBody(this.template, contact, '.create-fild');
        createContact({ jsonBody: contactJson })
            .then(() => {
                this.handleUpdate()
                showSuccessMessage('Record created');
            })
            .catch(error => {
                showErrorMessage('Error creating record', error.body.message);
            });
        this.currentPage = 1;
        this.openWindow = openStart();
    }

    handleEditContact() {
        const contact = { 'Id': this.editContact.Id };
        let contactJson = buildJsonBody(this.template, contact, '.edit-fild');
        updateContact({ jsonBody: contactJson })
            .then(() => {
                this.handleUpdate()
                showSuccessMessage('Record updated');
            })
            .catch(error => {
                showErrorMessage('Error updating record', error.body.message);
            });
        this.currentPage = 1;
        this.openWindow = openStart();
    }

    pageChanged(currentPage) {
        this.listContact10 = this.listContactAll.slice(10 * (currentPage - 1), 10 * currentPage);
    }

    handlePageChanged(event) {
        this.currentPage = event.detail;
        this.pageChanged(this.currentPage);
    }
}