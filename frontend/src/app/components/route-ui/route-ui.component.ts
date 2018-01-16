import {Component, OnInit, ViewEncapsulation, ViewChild, Input, Output, EventEmitter, Injector, ValueProvider} from '@angular/core';
import {Route} from '../../routes/route.model';
import {MapComponent} from '../map/map.component';
import {MatSelect, MatDialog} from '@angular/material';
import {Point} from '../../coordinates/point.model';
import {MediaDialogComponent} from '../media-dialog/media-dialog.component';
import {File} from '../../files/file.model';
import {Waypoint} from '../../coordinates/waypoint.model';
import {UserDataService} from '../../user-data/user-data.service';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {OverlayModule, Overlay, OverlayRef} from '@angular/cdk/overlay';
import {CdkPortal, ComponentPortal, Portal} from '@angular/cdk/portal';
import {MetaUiComponent, MetaCallbacks} from '../meta-ui/meta-ui.component';

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

  select: MatSelect;

  @Input() route: FirebaseItem<Route>;
  @Input() readonly: boolean;
  @Output() routeSaved = new EventEmitter();



  constructor(public dialog: MatDialog,
              private userDataService: UserDataService,
              private overlay: Overlay) {
    // this._route = new Route(null, null, null, null, null, null, <[Waypoint]>[], new Direction(<[Point]>[]), null, null);
    this.overlayRef = this.overlay.create({
      height: '100%',
      width: '100%'
    });
  }

  ngOnInit() {
  }

  @ViewChild(MapComponent)
  set appMap(comp: MapComponent) {
    this.mapComp = comp;
  }

  // Center the map on the 'i'th waypoint in the _route
  public centerOn(i: number) {
    this.mapComp.flyTo(this.route.item.waypoints[i].point);
  }

  private deleteWaypointAt(i: number) {
    this.mapComp.deleteWaypoint.emit(i);
  }

  saveRoute = () => {
    this.routeSaved.emit();
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

  // Wird als callBack zum schließen übergeben, da funktioniert es nur mit dieser Syntax, weil "this" sonst wieder was anderes ist.
  // data[0]: Fileable-Instanz deren Infos angezeigt weden soll
  // data[1]: Readonly
  public toggleMetaUI = (data: Array<any>) => {
    if (!this.metaUIPortal) {
      this.metaUIPortal = new ComponentPortal(MetaUiComponent,
        null,
        Injector.create([
          {provide: Boolean, useValue: data[1]},
          {provide: 'FileableInterface', useValue: data[0]},
          {provide: MetaCallbacks, useValue: new MetaCallbacks(this.saveRoute, this.toggleMetaUI)}
          ]
        )
      );
      this.overlayRef.attach(this.metaUIPortal);
    } else {
      this.overlayRef.detach()
      this.metaUIPortal = null;
    }
  }
}
