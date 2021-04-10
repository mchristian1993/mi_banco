import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { LoginService } from 'src/app/services/login/login.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  // The account fields for the login form.
  account: { id: string, username: string; password: string, token: string } = {
    username: '',
    password: '',
    token: '',
    id: ''

  };

  iconpassword = 'eye-off';

  // Our translated text strings
  private loginErrorString: string;

  constructor(
    public translateService: TranslateService,
    public loginService: LoginService,
    public toastController: ToastController,
    public navController: NavController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

  }

  async doLogin() {
    const loading = await this.loadingController.create({
      message: 'Cargando, por favor espere',
      duration: 12000,
    });
    let auxUserName: any = this.account['username'] ? this.account['username'].split(' ') : ' '
    this.account['username'] = ' '
    this.account['username'] = auxUserName['0']
    loading.present();
    console.log(this.account);

    this.loginService.login(this.account).then(
      (dataLogin) => {
        let dataUser = dataLogin['body'].data
        let token = dataUser.token
        let id = dataUser.id
        this.account['token'] = token
        this.account['id'] = id
        localStorage.setItem('user', JSON.stringify(this.account));
        loading.dismiss();
        this.navController.navigateRoot('/tabs/home');
      },
      async (err) => {
        console.log(err)
        // Unable to log in
        loading.dismiss();
            this.account.password = ''; 
        const toast = await this.toastController.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'middle',
          color: 'medium'
        });
        toast.present();
      }
    );
  }
  showPassword(input: any): any {
    input.type = input.type === 'password' ? 'text' : 'password';
    this.iconpassword = this.iconpassword === 'eye-off' ? 'eye' : 'eye-off';
  }

}
