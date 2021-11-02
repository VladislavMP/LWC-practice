import { LightningElement, api } from 'lwc';

export default class ViewPages extends LightningElement {
    @api currentPage = 1;
    @api totalPage = 1;
    nextDisabled = false;
    previousDisabled = true;

    previousHandler(event) {
        this.currentPage = this.currentPage - 1;
        this.pageChanged(this.currentPage);
        const pageChangedEvent = new CustomEvent('pagechanged', {
            detail: this.currentPage
        });
        this.dispatchEvent(pageChangedEvent);
    }

    nextHandler(event) {
        this.currentPage = this.currentPage + 1;
        this.pageChanged(this.currentPage);
        const pageChangedEvent = new CustomEvent('pagechanged', {
            detail: this.currentPage
        });
        this.dispatchEvent(pageChangedEvent);
    }

    pageChanged(currentPage) {
        if (currentPage == this.totalPage) {
            this.nextDisabled = true;
        } else {
            this.nextDisabled = false;
        }
        if (currentPage == 1) {
            this.previousDisabled = true;
        } else {
            this.previousDisabled = false;
        }
    }
}