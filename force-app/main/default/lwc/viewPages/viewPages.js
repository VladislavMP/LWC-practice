import { LightningElement, api } from 'lwc';
import {
    createPageNumberEvent
} from './viewPagesHelper.js';

export default class ViewPages extends LightningElement {
    @api currentPage = 1;
    @api totalPage = 1;
    nextDisabled = false;
    previousDisabled = true;

    previousHandler(event) {
        this.currentPage = this.currentPage - 1;
        this.pageChanged(this.currentPage);
        createPageNumberEvent(this.currentPage, this);
    }

    nextHandler(event) {
        this.currentPage = this.currentPage + 1;
        this.pageChanged(this.currentPage);
        createPageNumberEvent(this.currentPage, this);
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