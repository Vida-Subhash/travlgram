import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { UserComponent } from './components/user/user.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AddpostComponent } from './pages/addpost/addpost.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

//firebase modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

// Angular Material

import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AddpostComponent,
    PageNotFoundComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,

    ToastrModule.forRoot(),
    BrowserAnimationsModule,

    FontAwesomeModule,

    MatIconModule,
    MatTooltipModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
