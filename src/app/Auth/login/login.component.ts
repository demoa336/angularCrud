import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {

  	var user = {
  		name: form.value.email,
  		email: form.value.email,
  		password: form.value.password
  	}

  	this.authService.login(user).subscribe(
      data => this.router.navigate(['/']),
      err => {}
    );

  }

}
