import { FormGroup } from "@angular/forms";
import { Group } from './group.model';

export class ManageGroupsUtils {

    public static normalizeGroup(form: FormGroup) {

        let buckets: string[] = [];

        buckets = form.value.buckets.map(function (item) {
            return item['bucket'];
        });

        let group: Group = {
            name: form.value.groupName,
            buckets: buckets
        }

        return group;
    }

}