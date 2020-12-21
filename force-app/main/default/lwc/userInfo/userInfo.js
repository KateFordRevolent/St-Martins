import { LightningElement, wire } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import CONTACT_ID from "@salesforce/schema/User.ContactId";
import getContactOpp from "@salesforce/apex/ContactController.getContactOpp";
import getContactRel from "@salesforce/apex/ContactController.getContactRel";
// this gets you the logged in user
import USER_ID from "@salesforce/user/Id";
export default class HelloWorld extends LightningElement {
  results;
  userId;

  @wire(getRecord, { recordId: USER_ID, fields: [CONTACT_ID] })
  user({ error, data }) {
    if(data){
      this.userId = data.fields.ContactId.value;
    }
    };;

  @wire(getContactOpp, { idUser: '$userId'})
  opportunity({ error, data }) {
    if(data){
      console.log(data);
    this.results = data[0];
    }
};
  get contactId() {
    //console.log(this.results);
    return  getFieldValue(this.user.data, CONTACT_ID);
  }

  get opportunities(){
    return this.opportunity.data[0];
  }
}