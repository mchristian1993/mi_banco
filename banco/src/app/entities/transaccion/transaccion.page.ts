import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuentaService } from 'src/app/services/entities/cuenta/cuenta.service';
import { NavController, ModalController, LoadingController, Platform } from '@ionic/angular';
@Component({
  selector: 'app-transaccion',
  templateUrl: './transaccion.page.html',
  styleUrls: ['./transaccion.page.scss'],
})
export class TransaccionPage implements OnInit {
  accountV: { valor: Number, root_account: string, destination_account: string } = {
    valor: 0,
    root_account: '',
    destination_account: ''


  };
  cuentas: any
  account
  segmentTab: string = "transferencias";
  constructor(private route: ActivatedRoute, private cuentaService: CuentaService, public navController: NavController, public loadingController: LoadingController) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.accountV['root_account'] = id
    this.account = JSON.parse(localStorage.getItem('user'))
    this.cuentaService.findCuentasByUser(this.account.id).subscribe(succesCuentas => {
      console.log('cuentas', succesCuentas.body)
      this.cuentas = succesCuentas.body
    }, error => {
      console.log(error);

    })
  }

  async resumeTransferencia(account_number) {
    const loading = await this.loadingController.create({
      message: 'Cargando, por favor espere',
      duration: 12000,
    });
    this.accountV['valor'] = this.account.valor
    this.accountV['destination_account'] =account_number
    loading.present();

    if( this.accountV){
      this.navController.navigateForward(`/resumen-transaccion/${this.accountV['valor']}/${this.accountV['destination_account']}/${this.accountV['root_account']}` )
      loading.dismiss();
    }
  
  }

}
