import { LightningElement, api,wire } from 'lwc';
import getChildrenInfo from "@salesforce/apex/ContactController.getChildrenInfo";

export default class ChildrenTile extends LightningElement {
    @api childrenId;
    children;
    
    @wire(getChildrenInfo, { idUser: '$childrenId'})
    childrenInfo({ error, data }) {
      if(data){
        console.log(data);
        this.children = data[0];
      }
  };
}