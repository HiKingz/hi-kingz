import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireStorage} from 'angularfire2/storage';

@Injectable()
export class FileService {
  private path;

  constructor(private storage: AngularFireStorage) { }

  /**
   * uploads a file to the storage and returns its path
   * @param file
   */
  upload(file): string {
    this.storage.upload(file.name, file).downloadURL().subscribe(
      path => this.path = path
    );
    return this.path;
  }

  /**
   *
   * @param {string} path
   */
  download(path: string): Observable<any> {
    return this.storage.ref(path).getDownloadURL();
  }

  /**
   *
   * @param {string} path
   */
  delete(path: string): Observable<any> {
    return this.storage.ref(path).delete();
  }
}
