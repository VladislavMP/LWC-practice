public with sharing class ViewListsController {

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

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        
        List<Contact> contactList = [
            SELECT Id, Name, Phone, Email 
            FROM Contact 
            LIMIT 10
        ];
        return contactList;
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(Integer amount) {
        
        List<Contact> contactList = [
            SELECT Id, Name, Phone, Email 
            FROM Contact 
            LIMIT :amount
        ];
        return contactList;
    }
}

