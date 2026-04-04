import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { User } from "../models/user";

@Directive({
    selector: '[emailValidator]',
    providers: [{provide: NG_VALIDATORS, useExisting: EmailValidator, multi: true}]
})
export class EmailValidator implements Validator{

    @Input('emailValidator') users: User[];
    private isEmailUnique = {'uniqueEmail': true};

    constructor() {}

    validate(control: AbstractControl): ValidationErrors | null {

        let email: string = control.value?.toLowerCase();
        
        const findEmail = this.users?.find(user => user.email === email)

        if (findEmail) {
            return this.isEmailUnique;
        } else {
            return null;
        }
    }
}
