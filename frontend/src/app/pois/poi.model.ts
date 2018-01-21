import {Fileable} from '../commons/models/fileable';
import {UserSignature} from '../user-data/user-data.model';
import {Point} from '../coordinates/point.model';
import {File} from '../files/file.model';
import {Rateable, RatingAggregation} from '../commons/models/rateable';
import {FirebaseStorable} from '../commons/models/firebase-storable';

export class Poi extends FirebaseStorable implements Fileable, Rateable {
  constructor(
    public files: Array<File>,
    public name: string,
    public description: string,
    public userSignature: UserSignature,
    public ratingAggregation: RatingAggregation,
    public point: Point,
    public isPublic: boolean = true,
  ) {
    super();
  }

  public static deserialize(data: any): Poi {
    return new Poi(
      // TODO check if files need to be deserialized
      data.files && data.files.map(fileData => new File(fileData.url)) || [],
      data.name || '',
      data.description || '',
      data.userSignature && new UserSignature(
      data.userSignature.id || null, data.userSignature.username || ''
      ) || null,
      data.ratingAggregation && new RatingAggregation(
      data.ratingAggregation.avg || 0, data.ratingAggregation.count || 0, data.ratingAggregation.sum || 0
      ) || new RatingAggregation(0, 0, 0),
      data.point && new Point(data.point.longitude || null, data.point.latitude || null) || null,
    );
  }
}
