import {Injectable} from '@angular/core';
import {InstantSearchManager} from './instantsearch-manager';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {AuthenticationService} from '../authentication/authentication.service';
import {AlgoliaQueryParameters, AlgoliaResponse} from 'algoliasearch';
import * as algoliasearch from 'algoliasearch';
import {Subject} from 'rxjs/Subject';

class InstantSearchManagerBuilder {
  private _widgets: Array<any> = [];

  constructor(
    private _appId: string,
    private _apiKey: string,
    private _indexName: string,
    private _apiKeyChangeObservable?: Observable<string>
  ) { }

  public addWidget(widget): InstantSearchManagerBuilder {
    this._widgets.push(widget);
    return this;
  }

  public start(): InstantSearchManager {
    return new InstantSearchManager(
      this._appId,
      this._apiKey,
      this._indexName,
      this._widgets,
      this._apiKeyChangeObservable
    );
  }
}

@Injectable()
export class InstantSearchService {
  private _apiKey: string = environment.algolia.publicApiKey;
  private _apiKeyChangeSubject: Subject<string> = new Subject<string>();
  public onApiKeyChange: Observable<string> = this._apiKeyChangeSubject.asObservable();

  constructor(private _authService: AuthenticationService) {
    this._authService.onLogin.subscribe(() => this._loadUserApiKey());
    this._authService.onLogout.subscribe(() => this._unsetUserApiKey());
  }

  public buildInstantSearchManager(indexName: string): InstantSearchManagerBuilder {
    return new InstantSearchManagerBuilder(
      environment.algolia.appId,
      this._apiKey,
      environment.algolia.indexNamePrefix + indexName,
      this.onApiKeyChange
    );
  }

  public search(indexName, query: AlgoliaQueryParameters): Promise<AlgoliaResponse> {
    return algoliasearch(environment.algolia.appId, this._apiKey).initIndex(
      environment.algolia.indexNamePrefix + indexName
    ).search(query);
  }

  private _loadUserApiKey(): void {
    this._authService.getLoggedInUser().getIdToken().then(
      token => fetch(
        `https://us-central1-hikingz-185410.cloudfunctions.net/api/algolia/search-key`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
    ).then(response => {
      return response.json();
    })
    .then(data => {
      this._apiKey = data.key;
      this._apiKeyChangeSubject.next(data.key);
    });
  }

  private _unsetUserApiKey(): void {
    this._apiKey = environment.algolia.publicApiKey;
    this._apiKeyChangeSubject.next(this._apiKey);
  }
}
