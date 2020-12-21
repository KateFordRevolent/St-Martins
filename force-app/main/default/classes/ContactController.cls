public without sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactOpp (String idUser) {
        return [
            SELECT 
                (SELECT Id,Name FROM Opportunities),
                (SELECT Related_Contact_Name__c, npe4__Contact__c, npe4__RelatedContact__c, Name FROM npe4__Relationships__r) 
            FROM Contact 
            WHERE ID = :idUser    
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactRel (String idUser) {
        return [
            SELECT 
                (SELECT npe4__Contact__c, Name FROM npe4__Relationships__r) 
            FROM Contact 
            where ID = :idUser    
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getChildrenInfo (String idUser) {
        return [
            SELECT 
                Age__c,
                Gender__c,
                AccountId,
                Name
            FROM Contact 
            where ID = :idUser    
        ];
    }
}
