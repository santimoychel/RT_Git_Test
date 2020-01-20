import { LightningElement, api } from 'lwc';
 
export default class Autocomplete extends LightningElement {
    @api values;
    @api label = '';
    @api name = '';
    @api required;
    @api placeholder = '';
    initialized = false;
 
    renderedCallback() {
        if (this.initialized) {
            return;
        }
        this.initialized = true;
        let listId = this.template.querySelector('datalist').id;
        this.template.querySelector("input").setAttribute("list", listId);
    }
    handleChange (evt) {
        Console.debug('<<<>>>>>>>>>>');
        this.value = evt.target.value;
        }
 
}