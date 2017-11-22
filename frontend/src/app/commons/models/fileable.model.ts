import {FirebaseModel} from './firebase.model';
import {File} from '../../files/file.model';
import {IFileable} from './fileable';

export abstract class Fileable extends FirebaseModel implements IFileable {
  constructor(id: string, public files: [File]) {
    super(id);
  }
}
