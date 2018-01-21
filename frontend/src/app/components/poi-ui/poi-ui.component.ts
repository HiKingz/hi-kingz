import { Component, OnInit, ViewEncapsulation, Input, Output, ViewChild, EventEmitter, Injector } from '@angular/core';
import {MapComponent} from '../map/map.component';
import {Poi} from '../../pois/poi.model';
import {Point} from '../../coordinates/point.model';
import {FirebaseItem} from '../../commons/models/firebase.model';
import {OverlayModule, Overlay, OverlayRef} from '@angular/cdk/overlay';
import {CdkPortal, ComponentPortal, Portal} from '@angular/cdk/portal';
import {MetaUiComponent, MetaCallbacks} from '../meta-ui/meta-ui.component';
import {Fileable} from '../../commons/models/fileable';

@Component({
  selector: 'app-poi-ui',
  templateUrl: './poi-ui.component.html',
  styleUrls: ['./poi-ui.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PoiUIComponent implements OnInit {

  overlayRef: OverlayRef;
  metaUIPortal: ComponentPortal<MetaUiComponent>;

  mapComp: MapComponent;

  @Input() poi: FirebaseItem<Poi>;
  @Input() readonly: boolean;
  @Output() pointSaved = new EventEmitter();

  @ViewChild(MapComponent)
  set appMap(comp: MapComponent) {
    this.mapComp = comp;
  }

  constructor(private overlay: Overlay) {
    this.overlayRef = this.overlay.create({
      height: '100%',
      width: '100%'
    });
  }

  ngOnInit() {
  }

  public savePoint = () => {
    this.pointSaved.emit();
  }

  public toggleMetaUI = (data: Array<any>) => {
    if (!this.metaUIPortal) {
      this.metaUIPortal = new ComponentPortal(MetaUiComponent,
        null,
        Injector.create([
            {provide: Boolean, useValue: data[1]},
            {provide: 'FileableInterface', useValue: data[0]},
            {provide: MetaCallbacks, useValue: new MetaCallbacks(this.savePoint, this.toggleMetaUI)}
          ]
        )
      );
      this.overlayRef.attach(this.metaUIPortal);
    } else {
      this.overlayRef.detach()
      this.metaUIPortal = null;
    }
  }

  public flyTo(location: Point) {
    this.mapComp.flyTo(location);
  }
}
