import {Component, ViewChild} from '@angular/core';
import {PhotoServiceService} from './photo-service.service';
import {Http} from '@angular/http';

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

  constructor(private PhotoService: PhotoServiceService)  {
  }

  add() {
    this.show = true;

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

