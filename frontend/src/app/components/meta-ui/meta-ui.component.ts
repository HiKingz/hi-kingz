import { Component, OnInit, Inject, trigger, transition, animate, state, style } from '@angular/core';
import {Fileable} from '../../commons/models/fileable';
import {FileService} from '../../files/file.service';
import {File} from '../../files/file.model';
import {Route} from '../../routes/route.model';
import {Poi} from '../../pois/poi.model';

class CommentModel {
  title: string;
  text: string;
  rating = { 'avg' : 1};
}

export class MetaCallbacks {
  constructor(public saveCallback: Function, public closeCallback: Function) {}
}

@Component({
  selector: 'app-meta-ui',
  templateUrl: './meta-ui.component.html',
  styleUrls: ['./meta-ui.component.css'],
  animations: [
    trigger('closedTrigger', [
      state('open', style({'opacity' : '1.0', 'top' : '5vh'})),
      state('closed', style({'opacity' : '0.0', 'top' : '70vh'})),
      transition('open => closed', animate('400ms ease-out'))
    ])
  ]
})
export class MetaUiComponent implements OnInit {

  closedState = 'open';
  route_public_label: string;
  showcasedImage: string;

  commentModel: CommentModel;
  comments: Array<any>;

  constructor(private fileService: FileService, private rdonly: boolean, @Inject('FileableInterface') private infoobject: Fileable, private callbacks: MetaCallbacks) {
    this.route_public_label = 'Öffentliche Route';
    this.commentModel = new CommentModel();
    // TODO: Subscribe to service
    this.comments = [
      {
        'username' : 'Hans Wurst',
        'title' : 'Klebt prima!',
        'ratingAggregation' : { 'avg' : 5 },
        'text' : 'Eine Minute nachdem ich reingetreten bin fand eine unvorhersehbare chemische Reaktion statt, die meinen Schuh prompt am Bürgersteig festgesetzt hat. NASA pickelt mich gerade von der Straße, weil sie sehr an einer Probe interessiert sind.'
      }
    ];
  }

  private gotRoute(): boolean {
    return this.infoobject instanceof Route;
  }

  changePrivacy() {
    if (this.infoobject instanceof Route) {
      if (this.infoobject.isPublic) {
        this.route_public_label = 'Öffentliche Route';
      } else {
        this.route_public_label = 'Private Route';
      }
    }
  }

  ngOnInit() {
    if (this.infoobject.files.length > 0) {
      this.showcasedImage = this.infoobject.files[0].url;
    }
  }

  async closeUI() {
    this.closedState = 'closed';
    await (new Promise(res => setTimeout(res, 400)));
    this.callbacks.closeCallback();
  }

  public fileChanged(event) {
    const file = event.target.files.item(0);
    const task = this.fileService.upload(file);
    task.then().then((val) => {
      this.infoobject.files.push(new File(val.downloadURL));
    });
  }

  public saveObject() {
    this.callbacks.saveCallback();
  }

}
