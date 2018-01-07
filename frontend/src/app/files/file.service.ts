<<<<<<< HEAD
import { Injectable } from '@angular/core';
import {AngularFireStorage} from 'angularfire2/storage';
=======
import {Injectable} from '@angular/core';
// import {AngularFireStorage} from 'angularfire2/storage';
>>>>>>> development
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FileService {

<<<<<<< HEAD
  profileUrl: Observable<string | null>;

  constructor(private storage: AngularFireStorage) { }

  upload(file): void {
    this.storage.upload(file.name, file)
      .then(); {
      console.log('successful');
    }
  }

  download(path: string) {
    const ref = this.storage.ref(path);
    this.profileUrl = ref.getDownloadURL();
}
=======
  // profileUrl: Observable<string | null>;
  //
  // constructor(private storage: AngularFireStorage) { }
  //
  upload(file): void {
    // this.storage.upload(file.name, file)
    //   .then(); {
    //   console.log('successful');
    // }
  }
  //
  // download(path: string) {
  //   const ref = this.storage.ref(path);
  //   this.profileUrl = ref.getDownloadURL();
  // }
>>>>>>> development
}
