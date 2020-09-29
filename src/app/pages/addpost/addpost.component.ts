import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
//services
import { AuthService } from "src/app/services/auth.service";

//angular form
import { NgForm } from "@angular/forms";

import { finalize } from "rxjs/operators";
//firebase
import { AngularFireStorage } from "@angular/fire/storage";
import { AngularFireDatabase } from "@angular/fire/database";

//browser image resizer
import { readAndCompressImage } from "browser-image-resizer";
import { imageConfig } from "src/utils/config";

//uuid
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  locationName: string;
  description: string;
  picture: string = null;


  usre = null;
  uploadPercent: number = null;


  constructor(
    private db: AngularFireDatabase,
    private stroage: AngularFireStorage,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router
  ) {
    auth.getUser().subscribe((usre) => {
      this.db.object(`/users/${usre.uid}`)
      .valueChanges()
      .subscribe((usre) => {
        this.usre = usre;
      });
    });
  }

  ngOnInit(): void {
  }


  onSubmit() {
    const uid = uuidv4()

    this.db.object(`/posts/${uid}`)
    .set({
      id: uid,
      locationName: this.locationName,
      description: this.description,
      picture: this.picture,
      by: this.usre,
      instaId: this.usre.instaUserName,
      date: Date.now()
    })
    .then( () => {
      this.toastr.success("Post Added")
      this.router.navigateByUrl("/");
    })
    .catch((err) => {
      this.toastr.error("Something Wrong");
    });
  }

 async  uploadFile(event) {
    const uid = uuidv4()
    const file = event.target.files[0]

    let resizedImage = await readAndCompressImage(file, imageConfig)

    const filePath = file.name+uid;

    const fileRef = this.stroage.ref(filePath);

    const task = this.stroage.upload(filePath, resizedImage);

    task.percentageChanges().subscribe((percentage) => {
      this.uploadPercent = percentage
    });

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.picture = url;
          this.toastr.success("Image Upload Sucess");
        })
      })
    ).subscribe()
 }
}
