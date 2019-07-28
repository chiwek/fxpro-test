import {OnInit, OnDestroy} from "@angular/core/core";
import {AbstractControl, FormArray, FormGroup} from "@angular/forms/forms";
import {ActivatedRoute} from "@angular/router/router";
import {Subscription} from "rxjs/internal/Subscription";
export abstract class FormBaseComponent implements OnInit, OnDestroy {

    public frm:any;

    public id:number;
    private sub:Subscription;


    constructor(public route:ActivatedRoute) {

    }

    ngOnInit() {

        this.sub = this.route.queryParams.subscribe(params => {
            this.id = Number(params['id']) || 0;
            this.idChanged(params);
        });
    }

    abstract idChanged(params);


    markFormGroupTouched(formGroup: FormGroup) {
        (<any>Object).values(formGroup.controls).forEach(control => {
            if (control.controls) { // control is a FormGroup
                this.markFormGroupTouched(control);
            } else { // control is a FormControl
                control.markAsTouched();
                control.markAsDirty();
            }
        });
    }


    validateField(controlName, validationRule) {
        if (!this.frm) {
            return null;
        }
        const control = <AbstractControl>this.frm.controls[controlName];


        if (typeof control == 'undefined') {
            return true;
        }

        let dirty = control.dirty;
        if (dirty) {
            return control.hasError(validationRule);
        }
        return false;
    }


    validateArrayField(arrayName, index, controlName, validationRule) {

        if (!this.frm) {
            return null;
        }
        const controlArray = <FormArray>this.frm.controls[arrayName];

        if (typeof controlArray == 'undefined') {
            return true;
        }

        if (!controlArray.at(index)) {
            return true;
        }

        if (!controlArray.at(index).get(controlName)) {
            return true;
        }
        let isTouched = controlArray.at(index).get(controlName).touched;


        if (isTouched) {
            return controlArray.at(index).get(controlName).hasError(validationRule);
        }
        return false;

    }
    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }

    }

}