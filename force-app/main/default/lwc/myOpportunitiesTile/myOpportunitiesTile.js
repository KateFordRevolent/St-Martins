import { LightningElement, api } from 'lwc';

const columnsFields = [
    { label: 'Date', fieldName: 'CloseDate', type:'date' },
    { label: 'Amount', fieldName: 'Amount' },
    { label: 'Currency', fieldName: 'CurrencyIsoCode'}
];

export default class MyOpportunitiesTile extends LightningElement {
    @api opp;
    @api donation;
    column = [...columnsFields];

    get columns(){
        //console.log(column);
        if(this.donation == "false"){
            this.column.push(
                { 
                    label: 'Children Name', 
                    fieldName: 'npsp__Honoree_Name__c'
                });
        }
        return this.column;
    }
}