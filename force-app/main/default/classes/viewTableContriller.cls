public with sharing class viewTableContriller {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(Integer amount) {
        
        List<Contact> contactList = [SELECT Id, Name, Phone, Email FROM Contact LIMIT :amount];
        return contactList;
    }
}
