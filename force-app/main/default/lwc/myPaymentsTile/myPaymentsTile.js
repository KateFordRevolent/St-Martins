import { LightningElement, api } from 'lwc';

const columns = [
    { label: 'Date', fieldName: 'npe01__Payment_Date__c', type:'date' },
    { label: 'Amount', fieldName: 'npe01__Payment_Amount__c'},
    { label: 'Currency', fieldName: 'CurrencyIsoCode'}
];

export default class MyPaymentsTile extends LightningElement {
    @api 
    payment;
    columns = columns;
    
}