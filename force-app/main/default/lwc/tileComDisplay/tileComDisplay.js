import { LightningElement,track } from 'lwc';

export default class LWCModalBoxDemo extends LightningElement {
    openModal() {    
        // to open modal window set 'bShowModal' tarck value as true
      
    }
    @track selectedTab;
      tabselect(evt) {
        var id=  evt.target.id;
        //console.log('id = '+id)
        //alert(id);
       
        this.selectedTab =  evt.target.label;
        this.id=id;
    }
    
}