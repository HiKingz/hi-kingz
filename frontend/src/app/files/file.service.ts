import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AngularFireStorage} from 'angularfire2/storage';

@Injectable()
export class FileService {
  private path;

  constructor(private storage: AngularFireStorage) { }

  /**
   * @param file
   * @returns {string}
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

  /**
   * @param {string} path
   * @returns {Observable<any>}
   */
  getMetadata(path: string): Observable<any> {
    return this.storage.ref(path).getMetadata();
  }

  /**
   * @param {string} parentpath
   * @param {string} childpath
   * @returns {any}
   */
  getChild(parentpath: string, childpath: string): any {
    return this.storage.ref(parentpath).child(childpath);
  }
}
