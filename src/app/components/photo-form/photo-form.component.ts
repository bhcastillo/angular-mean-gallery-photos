import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
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
  constructor(private photoService: PhotoService) {
    this.photoSelected = '';
  }

  ngOnInit(): void {}
  onPhotoSelected(event: HtmlInputEvent): void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
      // image preview
      const reader = new FileReader();
      reader.onload = (e) => (this.photoSelected = reader.result as string);
      reader.readAsDataURL(this.file);
    }
  }
  uploadPhoto(
    title: HTMLInputElement,
    description: HTMLTextAreaElement
  ): boolean {
    console.log(title.value, description.value);
    this.photoService
      .createPhoto(title.value, description.value, this.file)
      .subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    return false;
  }
}
