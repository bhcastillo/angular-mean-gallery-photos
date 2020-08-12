import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { Router } from '@angular/router';
interface HtmlInputEvent extends Event {
  target: EventTarget & HTMLInputElement;
}
@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css'],
})
export class PhotoFormComponent implements OnInit {
  file: File;
  photoSelected: string | ArrayBuffer;
  hideAlertFile: Boolean = true;
  hideAlertTitle: Boolean = true;
  constructor(private photoService: PhotoService, private router: Router) {
    this.photoSelected = '';
  }

  ngOnInit(): void { }
  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File> event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result as string);
      reader.readAsDataURL(this.file);
      this.hideAlertFile = true;
    }
  }

  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement) {
    if (!this.file) {
      this.hideAlertFile = false;
      return false
    }

    this.photoService
      .createPhoto(title.value, description.value, this.file)
      .subscribe(
        (res) => this.router.navigate(['/photos']),
        (error) => console.log(error)
      );

    return false;
  }
}
