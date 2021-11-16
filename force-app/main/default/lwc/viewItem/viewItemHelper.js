export { 
    showErrorMessage, showSuccessMessage 
};
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const showErrorMessage = (title, message) => {
    dispatchEvent(
        new ShowToastEvent({
            title: title,
            message: message,
            variant: 'error'
        })
    );
}

const showSuccessMessage = (message) => {
    dispatchEvent(
        new ShowToastEvent({
            title: 'Success',
            message: message,
            variant: 'success'
        })
    );
}