import { LightningElement, api,wire } from 'lwc';
import getChildrenInfo from "@salesforce/apex/ContactController.getChildrenInfo";
import getChildrenFiles from "@salesforce/apex/ContactController.getChildrenFiles";
import avatarImg from "@salesforce/resourceUrl/avatar";

export default class ChildrenTile extends LightningElement {
    @api childrenId;
    children;
    avatar = avatarImg;

    @wire(getChildrenInfo, { idUser: '$childrenId'})
    childrenInfo({ error, data }) {
      if(data){
        console.log(data);
        this.children = data[0];
      }
    };

    @wire(getChildrenFiles, { idUser: '$childrenId'})
    childrenFiles({ error, data }) {
      if(data){
        console.log(data);
        console.log(this.children);
        //this.children = data[0];
      }
    };
    
}