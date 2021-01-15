import { LightningElement, api,track } from 'lwc';
import sendEmailToController from '@salesforce/apex/ContactController.sendEmailToController'

export default class ModalSponsor extends LightningElement {
    @track subject = 'Test Email'
    @track body;
    @track toSend = 'brunomoura@live.com.pt'
    @api openmodel;
    
    handleChange() {
        this.openmodel = false
        // Creates the event with the data.
        const selectedEvent = new CustomEvent("closedmodal", {
          detail: this.openmodel
        });
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    }

    
    saveMethod() {
        const message = this.template.querySelector('lightning-textarea').value;
        this.body = message;
        const recordInput = {body: this.body, toSend: this.toSend, subject: this.subject}  //You can send parameters
        sendEmailToController(recordInput)
        .then( () => {
            //If response is ok
            alert("Email sent");
        }).catch( error => {
            //If there is an error on response
            alert("Error sending Email");
            console.log(error);
        })
        this.handleChange();
    }
}