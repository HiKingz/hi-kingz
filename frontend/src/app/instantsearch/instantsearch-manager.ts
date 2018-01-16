import instantsearch from 'instantsearch.js/es';
import {connectInfiniteHits} from 'instantsearch.js/es/connectors';
import {connectHitsPerPage} from 'instantsearch.js/es/connectors';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export class InstantSearchManager {
  public static readonly RESULTS_PER_PAGE: number = 8;

  private _searchConnector = null;
  private _searchResultSubject: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  private _loadMoreFunctionReference: () => void = () => null;
  public gotMoreToLoad = true;
  public searchResults: Observable<Array<any>> = this._searchResultSubject.asObservable();

  constructor(appId: string, apiKey: string, indexName: string, widgets: Array<any>) {
    this._searchConnector = instantsearch({
      appId: appId,
      apiKey: apiKey,
      indexName: indexName
    });
    widgets.forEach(widget => this._searchConnector.addWidget(widget));
    this._searchConnector.addWidget(connectInfiniteHits(
      (InfiniteHitsRenderingOptions, isFirstRendering) => this._handleIncomingSearchResults(
        InfiniteHitsRenderingOptions, isFirstRendering
      )
    )());
    this._searchConnector.addWidget(connectHitsPerPage(
      (HitsPerPageRenderingOptions, isFirstRendering) => {
        if (isFirstRendering) {
          HitsPerPageRenderingOptions.refine(InstantSearchManager.RESULTS_PER_PAGE);
        }
      }
    )({items: []}));
    this._searchConnector.start();
  }

  public loadMore(): void {
    this._loadMoreFunctionReference();
  }

  private _handleIncomingSearchResults(InfiniteHitsRenderingOptions, isFirstRendering: boolean) {
    if (isFirstRendering) {
      return Promise.resolve().then(() => {
        this._handleInfiniteHitsRenderingOptions(InfiniteHitsRenderingOptions);
        this._loadMoreFunctionReference = InfiniteHitsRenderingOptions.showMore;
      });
    } else {
      this._handleInfiniteHitsRenderingOptions(InfiniteHitsRenderingOptions);
    }
  }

  private _handleInfiniteHitsRenderingOptions(InfiniteHitsRenderingOptions) {
    this._searchResultSubject.next(InfiniteHitsRenderingOptions.hits);
    this.gotMoreToLoad = !InfiniteHitsRenderingOptions.isLastPage;
  }
}
