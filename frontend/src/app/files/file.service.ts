import {Injectable} from '@angular/core';
import {v4 as uuid} from 'uuid';
import {Observable} from 'rxjs/Observable';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';

@Injectable()
export class FileService {

  constructor(private storage: AngularFireStorage) { }

  /**
   * @param {File} file
   * @returns {AngularFireUploadTask}
   */
  upload(file: File): AngularFireUploadTask {
    return this.storage.ref('Pictures/' + uuid()).put(file);
    // return this.storage.upload(file.name, file).downloadURL();
  }

  /**
   * @param {string} path
   * @returns {Observable<any>}
   */
  download(path: string): Observable<any> {
    return this.storage.ref(path).getDownloadURL();
  }

  /**
   * @param {string} path
   * @returns {Observable<any>}
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
