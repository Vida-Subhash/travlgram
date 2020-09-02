import { Component, OnInit } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
email = null;
  constructor(
private auth: AuthService,
private toastr: ToastrService,
private router: Router
  ) {
    auth.getUser().subscribe(
      (user) => {
        console.log("User is", + user);
        this.email = user?.email
      });
   }

  ngOnInit(): void {
  }

async handleSignout() {
  try {
    await this.auth.signOut();
    this.router.navigateByUrl('/sigin');
    this.toastr.info("Logout Sucess");
    this.email = null;
  } catch (error) {
    this.toastr.error("Problem in SignOut")
  }
}

}
