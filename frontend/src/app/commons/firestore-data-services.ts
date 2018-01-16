import {FirebaseStorable} from './models/firebase-storable';
import {FirebaseItem} from './models/firebase.model';
import {
  Action, AngularFirestore, AngularFirestoreCollection, DocumentChangeAction,
  QueryFn
} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/take';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;

export class OrderSettings {
  constructor(public by, public desc = false) {}
}

export class PaginatedDataView<ModelType extends FirebaseStorable> {
  private _cursor: DocumentSnapshot = null;
  public loading = false;
  private _dataSubject = new BehaviorSubject<Array<FirebaseItem<ModelType>>>([]);
  public data: Observable<Array<FirebaseItem<ModelType>>> = this._dataSubject.asObservable().scan(
    (acc, value) => acc.concat(value)
  );

  constructor(
    private readonly _collectionFactory: (query: QueryFn) => AngularFirestoreCollection<ModelType>,
    private readonly _deserializationFunction: (data: any) => ModelType,
    private readonly _orderSettings: OrderSettings,
    private readonly _pageSize: number,
  ) { }

  public loadNextPage(): Observable<Array<FirebaseItem<ModelType>>> {
    if (!this.loading) {
      this.loading = true;

      this._collectionFactory(
        ref =>
          ref.orderBy(
            this._orderSettings.by, this._orderSettings.desc ? 'desc' : 'asc'
          ).startAfter(this._cursor).limit(this._pageSize)
      ).snapshotChanges().do(
        (values: Array<DocumentChangeAction>) => {
          this._dataSubject.next(
            values.map((value: DocumentChangeAction) =>
              new FirebaseItem<ModelType>(
                value.payload.doc.ref.path,
                this._deserializationFunction(value.payload.doc.data())
              )
            )
          );
        }
      ).take(1).subscribe(items => {
        if (items.length > 0) {
          this._cursor = items[items.length - 1].payload.doc;
        }
        this.loading = false;
      });
    }

    return this.data;
  }
}

export abstract class FirestoreDataService<ModelType extends FirebaseStorable> {
  protected abstract readonly _collectionPath: string;

  constructor(private readonly _db: AngularFirestore) {}

  protected abstract _deserializeData(data: any): ModelType;

  protected _getPaginatedView(
    orderBy: OrderSettings,
    pageSize: number = 30,
    parentDocument?: FirebaseItem<FirebaseStorable>
  ): PaginatedDataView<ModelType> {
    return new PaginatedDataView<ModelType>(
      query => this._db.collection(this._getCollectionPath(parentDocument), query),
      this._deserializeData,
      orderBy,
      pageSize
    );
  }

  protected _get(reference: string): Observable<FirebaseItem<ModelType>> {
    return this._db.doc<ModelType>(reference).snapshotChanges().map(
      (action: Action<DocumentSnapshot>, index: number) => this._deserializeDocumentSnapshot(action.payload)
    );
  }

  protected _exists(reference: string): Observable<Action<firebase.firestore.DocumentSnapshot>> {
    return this._db.doc<ModelType>(reference).snapshotChanges();
  }

  protected async _create(
    data: ModelType,
    parentDocument?: FirebaseItem<FirebaseStorable>
  ): Promise<Observable<FirebaseItem<ModelType>>> {
    return this._get(
      (
        await this._db.collection<ModelType>(
          this._getCollectionPath(parentDocument)
        ).add(
          this._serializeFirebaseItem(data)
        )
      ).path
    );
  }

  protected _updateOrCreate(firesbaseItem: FirebaseItem<ModelType>): Promise<void> {
    return this._db.doc<ModelType>(
      firesbaseItem.reference
    ).set(
      this._serializeFirebaseItem(firesbaseItem.item)
    );
  }

  protected _delete(firesbaseItem: FirebaseItem<ModelType>): Promise<void> {
    return this._db.doc<ModelType>(firesbaseItem.reference).delete();
  }

  protected _concatPaths(basePath: string, path: string): string {
    return basePath + (basePath.length > 0 && path.length > 0 ? '/' : '') + path;
  }

  private _serializeFirebaseItem(data: ModelType): ModelType {
    return <ModelType> JSON.parse(JSON.stringify(data));
  }

  private _deserializeDocumentSnapshot(documentSnapshot: DocumentSnapshot): FirebaseItem<ModelType> {
    return new FirebaseItem<ModelType>(documentSnapshot.ref.path, this._deserializeData(documentSnapshot.data()));
  }

  private _getCollectionPath(parentDocument: FirebaseItem<FirebaseStorable>): string {
    return this._concatPaths(
      parentDocument === undefined ? '' : parentDocument.reference,
      this._collectionPath
    );
  }
}
