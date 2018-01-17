import {File} from '../files/file.model';
import {Waypoint} from '../coordinates/waypoint.model';
import {Fileable} from '../commons/models/fileable';
import {Rateable, RatingAggregation} from '../commons/models/rateable';
import {FirebaseStorable} from '../commons/models/firebase-storable';
import {UserSignature} from '../user-data/user-data.model';
import {Point} from '../coordinates/point.model';

export class Route extends FirebaseStorable implements Fileable, Rateable {
  constructor(
    public files: Array<File>,
    public name: string,
    public description: string,
    public difficulty: number,
    public userSignature: UserSignature,
    public waypoints: Array<Waypoint>,
    public direction: Array<Point>,
    public ratingAggregation: RatingAggregation,
    public tags: Array<string>,
    public distance: number,
    public isPublic: boolean,
  ) {
    super();
  }

  public static deserialize(data: any): Route {
    return new Route(
      data.files && data.files.map(fileData => new File(fileData.url)) || [],
      data.name || '',
      data.description || '',
      data.difficulty || null,
      data.userSignature && new UserSignature(
      data.userSignature.id || null, data.userSignature.username || ''
      ) || null,
      data.waypoints && data.waypoints.map(
      waypointData => new Waypoint(
        waypointData.name || '',
        waypointData.point && new Point(
        waypointData.point.longitude || null, waypointData.point.latitude || null
        ) || null
      )
      ) || [],
      data.direction && data.direction.map(
      directionData => new Point(directionData.longitude || null, directionData.latitude || null)
      ) || [],
      data.ratingAggregation && new RatingAggregation(
      data.ratingAggregation.avg || 0, data.ratingAggregation.count || 0, data.ratingAggregation.sum || 0
      ) || new RatingAggregation(0, 0, 0),
      data.tags || [],
      data.distance || 0,
      data.isPublic || false,
    );
  }
}
