import {Component, OnInit, ViewEncapsulation, ViewChild, Input, Output, EventEmitter, Injector, ValueProvider} from '@angular/core';
import {Route} from '../../routes/route.model';
import {MapComponent} from '../map/map.component';
import {MatDialog} from '@angular/material';
import {Point} from '../../coordinates/point.model';
import {MediaDialogComponent} from '../media-dialog/media-dialog.component';
import {File} from '../../files/file.model';
import {Waypoint} from '../../coordinates/waypoint.model';
import {UserDataService} from '../../user-data/user-data.service';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {OverlayModule, Overlay, OverlayRef} from '@angular/cdk/overlay';
import {CdkPortal, ComponentPortal, Portal} from '@angular/cdk/portal';
import {MetaUiComponent, MetaCallbacks} from '../meta-ui/meta-ui.component';
import {Poi} from '../../pois/poi.model';
import {MarkerControl} from '../map/map.controls';
import {RatingAggregation} from '../../commons/models/rateable';
import {PoiService} from '../../pois/poi.service';

@Component({
  selector: 'app-route-ui',
  templateUrl: './route-ui.component.html',
  styleUrls: ['./route-ui.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class RouteUIComponent implements OnInit {

  overlayRef: OverlayRef;
  metaUIPortal: ComponentPortal<MetaUiComponent>;

  mapComp: MapComponent;

  markerControl: any;
  _readonlyBefore: boolean;

  ownsRoute: boolean;

  _tmpPOI: Poi;

  _route: FirebaseItem<Route>;
  @Input()
  set route(rt: FirebaseItem<Route>) {
    this._route = rt;
    this.ownsRoute = (this.userDataService.currentUserData &&
      this.userDataService.currentUserData.userSignature.id === this._route.item.userSignature.id);
  }
  get route (): FirebaseItem<Route> {
    return this._route;
  }

  @Input() readonly: boolean;
  markerMode: boolean; // Set to false while POI Maker is active
  @Output() routeSaved = new EventEmitter();



  constructor(public dialog: MatDialog,
              private userDataService: UserDataService,
              private overlay: Overlay,
              private poiService: PoiService) {
    // this._route = new Route(null, null, null, null, null, null, <[Waypoint]>[], new Direction(<[Point]>[]), null, null);
    this.overlayRef = this.overlay.create({
      height: '100%',
      width: '100%'
    });
    this.markerMode = false;
  }

  ngOnInit() {
    this.userDataService.onCurrentUserDataLoaded.subscribe((userData) => {
      this.ownsRoute =
        (userData.userSignature.id === this._route.item.userSignature.id);
    });
  }

  @ViewChild(MapComponent)
  set appMap(comp: MapComponent) {
    this.mapComp = comp;
    this.mapComp.newMarker.subscribe(this.newPoi);
    this.markerControl = new MarkerControl(this.mapComp);
  }



  // Center the map on the 'i'th waypoint in the _route
  public centerOn(i: number) {
    this.mapComp.flyTo(this.route.item.waypoints[i].point);
  }

  private centerOnUserPos() {
    const self = this;
    navigator.geolocation.getCurrentPosition((pos) => {
      self.flyTo(new Point(pos.coords.longitude, pos.coords.latitude));
    });
  }

  private deleteWaypointAt(i: number) {
    this.mapComp.deleteWaypoint.emit(i);
  }

  saveRoute = () => {
    this.routeSaved.emit();
    this.readonly = true; // Go back to showing mode
  }

  public flyTo(location: Point) {
    this.mapComp.flyTo(location);
  }

  public showImage(index: number) {
    this.dialog.open(MediaDialogComponent, {
      height: '40em',
      width: '40em',
      data: {
        source: this.route.item.files[index].url
      }
    });
  }

  public enablePOIAdder() {
    this._readonlyBefore = this.readonly;
    this.readonly = true;
    this.markerMode = true;
    this.mapComp.map.addControl(this.markerControl);
  }

  public disablePOIAdder() {
    this.readonly = this._readonlyBefore;
    this.markerMode = false;
    this.mapComp.map.removeControl(this.markerControl);
  }

  public newPoi = (coords: any) => {
    this._tmpPOI = new Poi([], '', '',
      this.userDataService.currentUserData.userSignature, new RatingAggregation(0, 0, 0),
      new Point(coords[0], coords[1]));

    this.toggleMetaUI([this._tmpPOI, false, this.closeMetaUIAndSavePOI, this.closeMetaUIAndSavePOI]);
  }

  // Wird als callBack zum schließen übergeben, da funktioniert es nur mit dieser Syntax, weil "this" sonst wieder was anderes ist.
  // data[0]: Fileable-Instanz deren Infos angezeigt weden soll
  // data[1]: Readonly
  // data[2]: saving Callback, optional
  // data[3]: closing Callback, optional
  public toggleMetaUI = (data: Array<any>) => {
    if (!this.metaUIPortal) {
      this.metaUIPortal = new ComponentPortal(MetaUiComponent,
        null,
        Injector.create([
          {provide: Boolean, useValue: data[1]},
          {provide: 'FileableInterface', useValue: data[0]},
          {provide: MetaCallbacks, useValue:
            new MetaCallbacks(
              data.length > 2 ? data[2] : this.saveRoute,
              data.length > 3 ? data[3] : this.toggleMetaUI
            )
          }
          ]
        )
      );
      this.overlayRef.attach(this.metaUIPortal);
    } else {
      this.overlayRef.detach()
      this.metaUIPortal = null;
    }
  }

  public closeMetaUIAndSavePOI = () => {
    if (this.metaUIPortal) {
      this.overlayRef.detach()
      this.metaUIPortal = null;
    }
    this.poiService.create(this._tmpPOI);
    this.mapComp.addPoi(this._tmpPOI);
    this.mapComp.map.removeControl(this.markerControl);
    this.readonly = this._readonlyBefore;
    this.markerMode = false;
  }
}
