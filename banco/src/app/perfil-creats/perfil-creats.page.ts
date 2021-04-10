import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from '../shared/constants/input.constants';
import { IPerfil, Perfil } from '../shared/model/perfil.model';
import { PerfilService } from '.././services/entities/perfil/perfil.service';
import { User, } from '../services/user/user.model';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-perfil-creats',
  templateUrl: './perfil-creats.page.html',
  styleUrls: ['./perfil-creats.page.scss'],
})
export class PerfilCreatsPage implements OnInit {
  perfil: IPerfil;
  isSaving: boolean;

  users: User[];
  usuario
  editForm = this.formBuilder.group({
    id: [],
    tipoIdentificacion: [],
    identificacion: [],
    edad: [],
    nombre_usuario: [],
    direccion: [],
    telefono: [],
    user: []
  });


  constructor(
    protected perfilService: PerfilService,
    protected userService: UserService,
    protected formBuilder: FormBuilder,
    protected activatedRoute: ActivatedRoute,
  ) {

  }



  ngOnInit() {

    this.isSaving = false;
    let account = JSON.parse(localStorage.getItem('user'))
    this.perfilService.findByUser(account.id).subscribe(perfil => {

      if (perfil.body['length'] !== 0) {
        this.updateForm(perfil['body'][0]);
        this.perfil = perfil['body'][0];
        this.isSaving = true
      }

    }, error => {
      console.log("##########", error);

    })

    this.usuario = JSON.parse(localStorage.getItem('user'))

  }

  updateForm(perfil: Perfil) {
    this.editForm.patchValue({
      id: perfil.id,
      tipoIdentificacion: perfil.tipoIdentificacion,
      identificacion: perfil.identificacion,
      edad: perfil.edad,
      direccion: perfil.direccion,
      nombre_usuario: perfil.nombre_usuario,
      telefono: perfil.telefono,
      user: perfil.user
    });
  }

  previousState() {
    window.history.back();
  }




  save() {

    const perfil = this.createFromForm();

    if (this.isSaving) {

      this.subscribeToSaveResponse(this.perfilService.update(perfil));
    } else {
      this.subscribeToSaveResponse(this.perfilService.create(perfil));
    }
  }

  private createFromForm(): Perfil {

    return {
      ...new Perfil(),
      id: this.editForm.get(['id']).value,
      tipoIdentificacion: this.editForm.get('tipoIdentificacion').value,
      identificacion: this.editForm.get('identificacion').value,
      direccion: this.editForm.get('direccion').value,
      edad:this.editForm.get('edad').value,
      nombre_usuario: this.editForm.get('nombre_usuario').value,
      telefono: this.editForm.get('telefono').value,
      user: this.usuario
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPerfil>>) {
    result.subscribe((res: HttpResponse<IPerfil>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }


  trackUserById(index: number, item: User) {
    return item.id;
  }
}
