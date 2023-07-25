import { Inject, Injectable } from '@nestjs/common';
import supertokens from 'supertokens-node';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';
import Dashboard from 'supertokens-node/recipe/dashboard';
import { ProfileService } from "../../profile/profile.service";

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
    private readonly profileService: ProfileService,
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        EmailPassword.init({
          signUpFeature: {
            formFields: [
              {
                id: 'name',
              },
              {
                id: 'surname',
              },
              {
                id: 'patronymic',
              },
              {
                id: 'phone',
              },
              {
                id: 'email',
              },
              {
                id: 'password',
              },
            ],
          },
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                signUpPOST: async function (input) {
                  if (originalImplementation.signUpPOST === undefined) {
                    throw Error('Should never come here');
                  }

                  const response = await originalImplementation.signUpPOST(
                    input,
                  );

                  if (response.status === 'OK') {
                    // These are the input form fields values that the user used while signing up
                    const formFields = input.formFields;
                    const name = formFields.filter(
                      (obj) => obj.id === 'name',
                    )[0];
                    const surname = formFields.filter(
                      (obj) => obj.id === 'surname',
                    )[0];
                    const patronymic = formFields.filter(
                      (obj) => obj.id === 'patronymic',
                    )[0];
                    const phone = formFields.filter(
                      (obj) => obj.id === 'phone',
                    )[0];
                    const email = formFields.filter(
                      (obj) => obj.id === 'email',
                    )[0];
                    const password = formFields.filter(
                      (obj) => obj.id === 'password',
                    )[0];
                    const userEntity = await profileService.createCustomerProfile({
                      name: name.value,
                      surname: surname.value,
                      patronymic: patronymic.value,
                      phone: phone.value,
                      email: email.value,
                      password: password.value,
                    });
                  }
                  return response;
                },
                signInPOST: async function (input) {
                  if (originalImplementation.signInPOST === undefined) {
                    throw Error('You can`t come here');
                  }

                  const response = await originalImplementation.signInPOST(
                    input,
                  );

                  if (response.status === 'OK') {
                    const { id, email } = response.user;

                    const formFields = input.formFields;
                    const currentUser: any = await profileService.getProfileByEmail(email);
                  }
                  return response;
                },
              };
            },
          },
        }),
        Session.init({ getTokenTransferMethod: () => 'cookie' }),
        Dashboard.init(),
      ],
    });
  }
}
