import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { NavController, ModalController, LoadingController, Platform } from '@ionic/angular';
import { PerfilService } from '../services/entities/perfil/perfil.service';
import { AccountService } from 'src/app/services/auth/account.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private accountService: AccountService, private perfilService: PerfilService, private loginService: LoginService, public navController: NavController) { }

  ngOnInit() {

  }

  cuentasAsociadas(){
    this.navController.navigateBack('/cuentas')
  }
  transferencias(){
    this.navController.navigateBack('/transferencias')
  }

  qr(){
    this.navController.navigateBack('/qr')
  }


  logout() {
    this.loginService.logout();
    this.goBackToHomePage();
  }
  private goBackToHomePage(): void {
    this.navController.navigateBack('');
  }
}
