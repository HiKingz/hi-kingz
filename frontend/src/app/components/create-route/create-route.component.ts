import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Route} from '../../routes/route.model';

@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateRouteComponent implements OnInit {

  route: Route;
  testvalue: string;

  constructor() {
    this.route = new Route(null, null, null, null, null, null, null, null, null);
  }

  ngOnInit() {
  }

  prntroute = () => {
    let newvar = '';
    this.route.points.forEach(tpl => {
      newvar += tpl[0] + ',' + tpl[1] + ';';
    });
    this.testvalue = newvar;
  }
}
