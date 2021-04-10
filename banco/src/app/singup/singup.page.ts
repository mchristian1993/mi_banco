import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { UserService } from '../services/user/user.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {

  account: {
    login: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  } = {
      login: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
    };

  private signupErrorString: string="Usuario no se pudo registrar";
  private signupSuccessString: string = "Usuario Registrado con exito";
  private existingUserError: string;
  private invalidPasswordError: string;

  constructor(
    public navController: NavController,
    public userService: UserService,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) {
  }

  ngOnInit() { }

  async doSignup() {
    const loading = await this.loadingController.create({
      message: 'Registrando, por favor espere un momento',
      duration: 12000,
    });


    this.account.login = this.account.email;
    let auxFirstName: any = this.account['firstName'] ? this.account['firstName'].split(' ') : ' '
    let auxLastName: any = this.account['lastName'] ? this.account['lastName'].split(' ') : ' '
    this.account['lastName'] = ''
    this.account['firstName'] = ''

    auxFirstName.forEach(element => {
      this.account['firstName'] += element[0].toUpperCase() + element.substr(1).toLowerCase() + ' '
    });
    auxLastName.forEach(element => {
      this.account['lastName'] += element[0].toUpperCase() + element.substr(1).toLowerCase() + ' '
    });


    loading.present()
    this.userService.signup(this.account).subscribe(
      async () => {
        const toast = await this.toastController.create({
          message: this.signupSuccessString,
          duration: 5000,
          position: 'top'
        });
        toast.present();
        loading.dismiss()
        this.navController.navigateBack('/');

      },
      async response => {
        // Unable to sign up
        const error = JSON.parse(response.error);
        let displayError = this.signupErrorString;
        if (response.status === 400 && error.type.includes('already-used')) {
          displayError = this.existingUserError;
        } else if (
          response.status === 400 &&
          error.message === 'error.validation' &&
          error.fieldErrors[0].field === 'password' &&
          error.fieldErrors[0].message === 'Size'
        ) {
          displayError = this.invalidPasswordError;
        }
        const toast = await this.toastController.create({
          message: displayError,
          duration: 5000,
          position: 'middle'
        });
        toast.present();
      }
    );
  }
}
