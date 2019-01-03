import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignup(form: NgForm) {

  	var user = {
  		email: form.value.email,
  		password: form.value.password
  	}

  	this.authService.signUp(user).subscribe(
      data => this.router.navigate(['/']),
      err => {}
    );

  }

}
