import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  show: boolean;
  constructor(
    private auth : AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.show = false;
   }

  ngOnInit(): void {
  }

  password() {
    this.show = !this.show;
}
  onSubmit(f: NgForm) {

    const { email, password } = f.form.value;

    this.auth.signIn(email, password)
      .then((res) => {
        this.toastr.success("Sign In success");
        this.router.navigateByUrl("/");
      })
      .catch((err) => {
        this.toastr.error(err.message, "Enter Valid Email and Password", {
          closeButton: true,
        });
      });
  }


}
