import {DatePipe} from "@angular/common";

export class BaseModel {
    constructor(fields?: any) {
        let boolsArray = [
            'is_wifi', 'is_guide', 'is_print', 'is_billed', 'is_billing_data', 'is_gmap_link', 'is_active', 'is_blocked', 'is_no_pay'
        ];
        const dateTimeFormat = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
        const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
        // Quick and dirty extend/assign fields to this model
        for (const f in fields) {
            if (!fields.hasOwnProperty(f)) {
                continue;
            }
            let value = fields[f];
            if (typeof value === "string" && (dateFormat.test(value) || dateTimeFormat.test(value))) {

                var t = value.split(/[- :]/);

                // Apply each element to the Date function
                this[f] = new Date(Date.UTC(+t[0], +t[1] - 1, +t[2], +t[3] || 0, +t[4] || 0, +t[5] || 0));
                const dt_val_field = f + '_val';

                let dp = new DatePipe(navigator.language);
                let p = 'y-MM-dd hh:mm a'; // YYYY-MM-DD
                this[dt_val_field] = dp.transform(this[f], p);
            } else {
                if (boolsArray.indexOf(f) != -1) {
                    this[f] = fields[f] == '1';
                } else {
                    this[f] = fields[f];
                }

            }

        }
    }
}
