import { LightningElement, wire, track } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import CONTACT_ID from "@salesforce/schema/User.ContactId";
import getContactOpp from "@salesforce/apex/ContactController.getContactOpp";
import USER_ID from "@salesforce/user/Id";
export default class HelloWorld extends LightningElement {
  donations = [];
  nextPayments = [];
  results;
  userId;
  @track openmodel = false;


  @wire(getRecord, { recordId: USER_ID, fields: [CONTACT_ID] })
  user({ error, data }) {
    if(data){
      this.userId = data.fields.ContactId.value;
    }
    };

  @wire(getContactOpp, { idUser: '$userId'})
  opportunity({ error, data }) {
    if(data){
    console.log(data);
    this.results = data[0];
    if(this.results.Opportunities){
      this.results.Opportunities.forEach(element => {
        if(element.RecordType.Name != "Donation")
          this.nextPayments.push(element);
        else
          this.donations.push(element);
      });
    }

    }
};
  get contactId() {
    return  getFieldValue(this.user.data, CONTACT_ID);
  }

  get childrens(){
      return this.results.npe4__Relationships__r;
  }

  get payments(){
    return this.nextPayments;
  }

  get mydonations(){
    return this.donations;
  }

  openmodal() {
    this.openmodel = true
  }

  closeModal() {
    this.openmodel = false
} 
}