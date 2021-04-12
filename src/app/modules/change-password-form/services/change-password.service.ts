import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from '@app/config/constant';
import { RequestService } from '@app/core/http/request-service';
import { createPasswordControl } from '@app/core/utils/form.util';
import { CustomValidator } from '@app/core/validators/custom-validator';
import { ChangePassword } from '@models/IUserDetails';
import { map } from 'rxjs/internal/operators/map';


@Injectable()
export class ChangePasswordService {

    constructor(
        readonly router: Router,
        readonly formBuilder: FormBuilder, readonly request: RequestService) { }

    changePassword(data: ChangePassword) {
        return this.request.post<ChangePassword>(`${Constants.ENDPOINTS.changePassword}`, data).pipe(map(res => res));
    }

    createChangePasswordForm() {
        return this.formBuilder.group({
            oldPassword: createPasswordControl(),
            newPassword: createPasswordControl(),
            passwordConfirmation: createPasswordControl()
        },
            {
                validator: [CustomValidator.matchPassword.bind(this),
                    CustomValidator.matchOldPassword.bind(this)]
            });
    }
}
