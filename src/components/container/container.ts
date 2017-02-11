import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { BaseComponent, BaseElement, BaseOptions } from '../base';
import { FormioComponents } from '../components';
import { FormioTemplate } from '../../formio.template';

export interface ContainerOptions extends BaseOptions<{}> {
    tree?: boolean;
    components: Array<any>
}

export class ContainerComponent extends BaseComponent<ContainerOptions> {
    getControl(): FormArray | FormGroup | FormControl {
        if (!this.control) {
            this.control = new FormGroup({});
        }
        this.form.addControl(this.settings.key, this.control);
        return this.control;
    }
    public setValue(value: any) {
        if (this.control) {
            let formControl = this.control as FormGroup;
            formControl.setValue(value);
            formControl.markAsDirty();
        }
    }
    getData() : any {
        if (this.data && this.data.hasOwnProperty(this.settings.key)) {
            return this.data[this.settings.key];
        }
        else {
            return {};
        }
    }
}

export class ContainerElement extends BaseElement<ContainerComponent> {
    get numComponents() : number {
        return 1;
    }
}

export function ContainerField(template:FormioTemplate) {
    FormioComponents.register('container', ContainerComponent, ContainerElement, template.components.container);
    return ContainerElement;
};
