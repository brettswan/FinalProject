import {Component, ViewChild} from '@angular/core';
import {PhotoServiceService} from './photo-service.service';
import {Http} from '@angular/http';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  title = 'app';
  show = false;
  @ViewChild('input') _FileInput;

  url = this.sanitizer.bypassSecurityTrustResourceUrl('http://localhost:3000/img/');

  Images: string[] = ['http://localhost:3000/img/c7b05183750897365f31887842a2d547',
    'http://localhost:3000/img/db4773e96527041cd4785ddaac572d24',
    'http://localhost:3000/img/fa7e37aaefc97a52b93666c8361b9d3c',
    'http://localhost:3000/img/df9497a8e1c53b4de950d53ef4f607f'
  ];

  constructor(private PhotoService: PhotoServiceService, private sanitizer: DomSanitizer)  {
  }

  add() {
    this.show = true;

  }

  getSource(image: string)  {
    return this.url + image;
  }

  upload()  {
    // CREATE NEW EMPTY FORM-DATA INSTANCE
    const formData = new FormData();
    // STORE FILES CURRENTLY STORED IN OUR HTML INPUT ELEMENT
    // IT WOULD BE GOOD TO CHECK IF ANYTHING IS INSIDE FIRST
    const FileList = this._FileInput.nativeElement.files;
    // APPEND EACH FILE TO THE FORM-DATA
    // ASSIGN KEYWORD PHOTO FOR THE SERVER
    // MAKE A FOR LOOP TO MAKE IT MORE DYNAMIC
    formData.append('photo', FileList[0]);
    /* LETS DOUBLE CHECK THAT THE INJECTED LOCATION HAS AN ID
      if (!this.location._id)   {
          // FOR NOW, SINCE WE WONT HAVE ONE INJECTED FOR DEV PURPOSES, WE WILL REPLACE IT
      }*/
    // CALL THE MAGICAL FILE SERVICE TO SEND IT INTO WONDERLAND
    this.PhotoService.uploadPhoto(formData)
      .subscribe(
        data =>  {
          // 201 SOMETHING GOOD HAPPENED
          console.log(data);
        },
        error =>    {
          // 400-500 YOU PROBABLY AREN'T SIGNED IN, ONLY ACTIVE USERS CAN POST
          console.error(error);
        }
      );

  }
}

