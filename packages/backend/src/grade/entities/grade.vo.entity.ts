import { ClassInfoBaseVO } from '../../class-info/entities/class-info.vo.entity';
import { SubjectBaseVO } from '../../subject/entities/subject.vo.entity';
import { Type } from 'class-transformer';

export class GradeBaseVO {
  id: string;

  title: string;

  constructor(props) {
    Object.assign(this, props);
  }
}

export class GradeVO extends GradeBaseVO {
  @Type(() => SubjectBaseVO)
  subjects: SubjectBaseVO[] = [];
  @Type(() => ClassInfoBaseVO)
  classInfos: ClassInfoBaseVO[] = [];
}
