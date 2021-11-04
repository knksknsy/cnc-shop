/**
*  Copyright (C) 2017
*
*  Kaan K.
*  Artur Bergen <ab17@hdm-stuttgart.de>
*
*  MIT License
*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TabsetComponent } from 'ngx-bootstrap/tabs/tabset.component';
import { AuthenticationService } from '../../services/authentication.service';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  public isModalShown: boolean = false;
  public isLoggedIn: boolean;

  public loginForm = this.formBuilder.group({
    loginEmail: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9 .-@]{5,23}$')])],
    loginPassword: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9-_.:]{7,33}$')])]
  });

  public registerForm = this.formBuilder.group({
    registerName: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-ZäöüÄÖÜß -]{3,16}$')])],
    registerSurname: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-ZäöüÄÖÜß -]{3,23}$')])],
    registerStreet: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9äöüÄÖÜß .-]{5,23}$')])],
    registerPostcode: ["", Validators.compose([Validators.required, Validators.pattern('[0-9]{5}')])],
    registerCity: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-ZäöüÄÖÜß .-]{3,16}$')])],
    registerState: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-ZäöüÄÖÜß .-]{5,16}$')])],
    registerEmail: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9 .-@]{5,23}$')])],
    registerPassword: ["", Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9-_.:]{7,33}$')])]
  });

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private shoppingCartService: ShoppingCartService, private router: Router) { }

  ngOnInit() {
    this.authenticationService.isLoggedIn()
      .subscribe((loggedIn) => {
        this.isLoggedIn = loggedIn;
      });
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
          this.authenticationService.isLoggedIn()
            .subscribe((loggedIn) => {
              this.isLoggedIn = loggedIn;
              this.shoppingCartService.setLocalStorageKey();
              this.hideModal();
            });
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

  onLogout() {
    this.authenticationService.logout()
      .subscribe((res) => {
        this.isLoggedIn = false;
      });
  }

  openOrderHistory() {
    this.router.navigate(['/user/history']);
  }

}
