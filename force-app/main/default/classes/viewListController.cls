public with sharing class viewListController {

    @AuraEnabled
    public static void createContact(String jsonBody) {
        Contact contact = (Contact)JSON.deserialize(jsonBody, Contact.class);
        insert contact;
    }

    @AuraEnabled
    public static void updateContact(String jsonBody) {
        System.debug(jsonBody);
        Contact contact = (Contact)JSON.deserialize(jsonBody, Contact.class);
        update contact;
    }
}
