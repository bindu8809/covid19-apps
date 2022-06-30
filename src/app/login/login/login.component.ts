import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  login(): void {

    this.router.navigate(["dashboard"]);
    /* if(this.username == 'admin' && this.password == 'admin'){
     this.router.navigate(["dashboard"]);
    }else {
      alert("Invalid credentials");
    } */
  }


}
