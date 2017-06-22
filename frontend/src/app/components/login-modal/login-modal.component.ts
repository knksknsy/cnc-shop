/**
*  Copyright (C) 2017
*
*   Kaan K.
*
*  MIT License
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TabsetComponent } from 'ngx-bootstrap/tabs/tabset.component';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  public isModalShown: boolean = false;

  public loginForm = this.formBuilder.group({
    loginEmail: ["", Validators.required],
    loginPassword: ["", Validators.required]
  });

  public registerForm = this.formBuilder.group({
    registerName: ["", Validators.required],
    registerSurname: ["", Validators.required],
    registerStreet: ["", Validators.required],
    registerPostcode: ["", Validators.required],
    registerCity: ["", Validators.required],
    registerState: ["", Validators.required],
    registerEmail: ["", Validators.required],
    registerPassword: ["", Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  public showModal(): void {
    this.isModalShown = true;
  }

  public hideModal(): void {
    this.autoShownModal.hide();
  }

  public onHidden(): void {
    this.isModalShown = false;
  }

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }

  onLogin(event) {
    let body = {
      user: {
        email: this.loginForm.value.loginEmail,
        password: this.loginForm.value.loginPassword
      }
    }
    this.authenticationService.login(body)
      .subscribe((success) => {
        if (success) {
          this.hideModal();
        } else {
          // show login error
        }
      });
  }

  onRegister(event) {
    let body = {
      user: {
        email: this.registerForm.value.registerEmail,
        name: this.registerForm.value.registerName,
        surname: this.registerForm.value.registerSurname,
        street: this.registerForm.value.registerStreet,
        postcode: this.registerForm.value.registerPostcode,
        city: this.registerForm.value.registerCity,
        state: this.registerForm.value.registerState,
        password: this.registerForm.value.registerPassword
      }
    }
    this.authenticationService.register(body)
      .subscribe((success: any) => {
        if (success && !success.message) {
          this.authenticationService.login({ user: { email: this.registerForm.value.registerEmail, password: this.registerForm.value.registerPassword } })
            .subscribe((success) => {
              if (success) {
                this.hideModal();
              }
            })
        } else if (success.message) {
          // show register error
        }
      });
  }

}
