import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete } from '@angular/material';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { map, startWith, tap, finalize } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import { News } from '../interfaces/news';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import 'rxjs/add/operator/take';
import { CrudService } from '../crud.service';
import { TakesnapshotService } from '../takesnapshot.service';
@Component({
  selector: 'app-postnews',
  templateUrl: './postnews.component.html',
  styleUrls: ['./postnews.component.scss']
})
export class PostnewsComponent {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl();
  filteredtags: Observable<string[]>;
  tags: string[] = [];




  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;




  dropactive: boolean;
  selectedFiles: FileList;

  imageuploadpreUrl: any;


  newsdata: News = {} as News;

  uiblock = false;












  editmode = false;
  newsid;
  newsauthorid;
  constructor(private auth: AuthService,
    private activeroute: ActivatedRoute, private route: Router,
    private crud: CrudService, private __: TakesnapshotService) {
      __.takesnap();
    this.newsid = this.activeroute.snapshot.paramMap.get('id');
    this.newsauthorid = this.activeroute.snapshot.paramMap.get('uid');
    if (this.newsid && this.newsauthorid) {
      this.editmode = true;
      this.auth.user$.subscribe(u => {
        // this.newsdata.author = u.uid;

        if (u.uid == this.newsauthorid) {
          this.crud.get('News/' + this.newsid).take(1).subscribe(news => {
            this.newsdata = news;
            this.tags = news.tags;
            this.imageuploadpreUrl = news.imageURL;

          });
        }
      });
    }

    else {
      this.auth.user$.subscribe(u => this.newsdata.author = u.uid);
    }


  }

  add(event: MatChipInputEvent): void {
    // Add fruit only when MatAutocomplete is not open
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add our fruit
      if ((value || '').trim()) {
        this.tags.push(value.trim());
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.tagCtrl.setValue(null);
    }
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }



  detectFiles(event) {
    this.selectedFiles = event.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFiles.item(0));
    reader.onload = (_event) => {
      this.imageuploadpreUrl = reader.result;
    }
  }

  handleDrop(filelist: FileList) {
    this.selectedFiles = filelist;
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFiles.item(0));
    reader.onload = (_event) => {
      this.imageuploadpreUrl = reader.result;
    }


  }

  dropactivestatus(event: boolean) {
    this.dropactive = event;

  }

  startUpload(event: FileList) {
    this.uiblock = true;
    if (!this.editmode) {
      if (event) {

        if (event.item(0).type.split('/')[0] !== "image") {
          return;
        }

        this.crud.postfile("newsdata/images/" + new Date().getTime(), event.item(0)).then(res => {

          res.ref.getDownloadURL().then(u => {
            this.newsdata.imageURL = u;
            // this.newsdata.imageURL=;
            this.newsdata.tags = this.tags;
            this.newsdata.timestamp = firebase.firestore.FieldValue.serverTimestamp();
            this.crud.post('News', this.newsdata).then(() => {
              this.uiblock = false;
              this.route.navigate(['/u']);
            });
          });

        });

      }
      else {
        this.newsdata.tags = this.tags;
        this.newsdata.timestamp = firebase.firestore.FieldValue.serverTimestamp();
        this.crud.post('News', this.newsdata).then(() => {
          this.uiblock = false;
          this.route.navigate(['/u']);
        });

      }
    }
    else {
      if (event) {
        if (event.item(0).type.split('/')[0] !== "image") {
          return;
        }

        let rmrf: any = this.newsdata.imageURL;
        let fname: string;
        if (rmrf) {
          rmrf = rmrf.split("/")[7].split("%2F");
          fname = rmrf[3];
          rmrf = rmrf[2]

          fname = fname.replace("%20", " ");
          fname = fname.split("?")[0];

        }
        this.crud.deletefile("newsdata/images/" + rmrf, fname);
        this.crud.postfile("newsdata/images/" + rmrf, event.item(0)).then(res => {
          res.ref.getDownloadURL().then(u => {
            this.newsdata.imageURL = u;
            this.newsdata.tags = this.tags;
            this.newsdata.timestamp = firebase.firestore.FieldValue.serverTimestamp();
            this.crud.update('News/' + this.newsid, this.newsdata).then(() => {
              this.uiblock = false;
              this.route.navigate(['/u']);
            });
          });
        });
      }
      else {
        this.newsdata.tags = this.tags;
        this.newsdata.timestamp = firebase.firestore.FieldValue.serverTimestamp();
        this.crud.update('News/' + this.newsid, this.newsdata).then(() => {
          this.uiblock = false;
          this.route.navigate(['/u']);
        });
      }

    }
  }


  clearBucket() {
    this.selectedFiles = null;
    this.imageuploadpreUrl = null;
  }

}
