public without sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactOpp (String idUser) {
        return [
            SELECT 
                (SELECT Id, CloseDate, Amount, RecordType.Name, CurrencyIsoCode, npsp__Honoree_Name__c FROM Opportunities 
                WHERE CloseDate > TODAY OR RecordType.Name = 'Donation'),
                (SELECT Related_Contact_Name__c, npe4__Contact__c, npe4__RelatedContact__c, Name FROM npe4__Relationships__r),
                (SELECT npe01__Payment_Amount__c, npe01__Payment_Date__c, CurrencyIsoCode FROM Payments__r WHERE npe01__Paid__c = true ORDER BY npe01__Payment_Date__c DESC)
            FROM Contact 
            WHERE ID = :idUser    
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getChildrenInfo (String idUser) {
        return [
            SELECT 
                Age__c,
                Gender__c,
                AccountId,
                Class__c,
                School__c,
                Description,
                Person_in_charge__c,
                Name
            FROM Contact 
            where ID = :idUser    
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<ContentDocumentLink> getChildrenFiles (String idUser) {
        return [
            SELECT 
                 ContentDocument.title 
                 FROM ContentDocumentLink 
                 WHERE LinkedEntityId = :idUser 
        ];
    }


    @AuraEnabled(cacheable=true)
    public static void sendEmailToController(String body, String toSend, String subject){
        try{
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            String[] toAddresses = new String[] {toSend};
            mail.setToAddresses(toAddresses);
            mail.setSubject(subject);
            mail.setHtmlBody('<h1>'+ body + '</h1>');
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mail });
        }catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
}
