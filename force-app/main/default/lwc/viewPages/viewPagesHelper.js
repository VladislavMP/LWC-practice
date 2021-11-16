export { 
    createPageNumberEvent
};

const createPageNumberEvent = (currentPage, component) => {
    const pageChangedEvent = new CustomEvent('pagechanged', {
        detail: currentPage
    });
    component.dispatchEvent(pageChangedEvent);
}

