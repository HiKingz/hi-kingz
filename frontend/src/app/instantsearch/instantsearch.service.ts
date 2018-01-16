import {Injectable} from '@angular/core';
import {InstantSearchManager} from './instantsearch-manager';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {AuthenticationService} from '../authentication/authentication.service';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AlgoliaQueryParameters, AlgoliaResponse} from 'algoliasearch';
import * as algoliasearch from 'algoliasearch';

class InstantSearchManagerBuilder {
  private _widgets: Array<any> = [];

  constructor(private _appId: string, private _apiKey: string, private _indexName: string) { }

  public addWidget(widget): InstantSearchManagerBuilder {
    this._widgets.push(widget);
    return this;
  }

  public start(): InstantSearchManager {
    return new InstantSearchManager(
      this._appId,
      this._apiKey,
      this._indexName,
      this._widgets
    );
  }
}

@Injectable()
export class InstantSearchService {
  private _apiKey: string = environment.algolia.publicApiKey;
  private _apiKeyChangeSubject: BehaviorSubject<void> = new BehaviorSubject<void>(null);
  public onApiKeyChange: Observable<void> = this._apiKeyChangeSubject.asObservable();

  constructor(authService: AuthenticationService) {
    authService.onLogin.subscribe(() => this._loadUserApiKey());
    authService.onLogout.subscribe(() => {
      this._apiKey = environment.algolia.publicApiKey;
      this._apiKeyChangeSubject.next(null);
    });
  }

  public buildInstantSearchManager(indexName: string): InstantSearchManagerBuilder {
    return new InstantSearchManagerBuilder(
      environment.algolia.appId,
      this._apiKey,
      environment.algolia.indexNamePrefix + indexName
    );
  }

  public search(indexName, query: AlgoliaQueryParameters): Promise<AlgoliaResponse> {
    return algoliasearch(environment.algolia.appId, this._apiKey).initIndex(
      environment.algolia.indexNamePrefix + indexName
    ).search(query);
  }

  private _loadUserApiKey(): void {
    // TODO get api key form function endpoint and fire onApiChange
    this._apiKeyChangeSubject.next(null);
  }
}
