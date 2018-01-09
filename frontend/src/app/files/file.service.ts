import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireStorage} from 'angularfire2/storage';

@Injectable()
export class FileService {

  profileUrl: Observable<string | null>;

  constructor(private storage: AngularFireStorage) { }
  //
  upload(file): void {
    this.storage.upload(file.name, file).downloadURL().subscribe(
      x => console.log('path - ', x)
    );
  }

  download(path: string): void {
    const ref = this.storage.ref(path);
    this.profileUrl = ref.getDownloadURL();
}
}
