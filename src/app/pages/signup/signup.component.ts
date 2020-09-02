import { Component, OnInit } from '@angular/core';

// ng-toastr service
import { ToastrService } from 'ngx-toastr';
// angular
import { Router } from '@angular/router';
import { NgForm} from "@angular/forms";
import {finalize} from "rxjs/operators";
// services
import { AuthService } from 'src/app/services/auth.service';
//firebase
import { AngularFireStorage } from "@angular/fire/storage";
import  { AngularFireDatabase } from "@angular/fire/database";
// Browser Image Resizer
import { readAndCompressImage } from "browser-image-resizer";

import {imageConfig} from "src/utils/config";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
picture: string;

uploadPrecent: number = null;
  constructor(
    private auth: AuthService,
    private router: Router,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {

      const {email, password, username, country, bio,name} = f.form.value;

      this.auth.signUp(email, password)
      .then((res) => {
        console.log(res);
        const {uid} = res.user

        this.db.object(`/users/${uid}`)
        .set({
          id: uid,
          name: name,
          email: email,
          instaUserName: username,
          country: country,
          bio: bio,
          picture: this.picture
        })
      })
      .then(() => {
        this.router.navigateByUrl('/');
        this.toastr.success("Signup Sucess");
      })
      .catch( (err) => {
        this.toastr.error("Signup Failed");
      });
  }

 async uploadFile(event) {
   const file = event.target.files[0];

   let resizedImage = await readAndCompressImage(file, imageConfig)

   const filePath = file.name  //rename the image with UUID
   const fileRef = this.storage.ref(filePath)

   const task = this.storage.upload(filePath, resizedImage);

   task.percentageChanges().subscribe((percetage) => {
     this.uploadPrecent = percetage;
   });


    task.snapshotChanges()
    .pipe(
      finalize( () => {
        fileRef.getDownloadURL().subscribe( (url) => {
          this.picture = url;
          this.toastr.success("Image Upload Sucess");
        })
      })
    ).subscribe();
  }


}
