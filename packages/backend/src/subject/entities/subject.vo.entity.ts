import { GradeBaseVO } from '../../grade/entities/grade.vo.entity';

export class SubjectBaseVO {
  id: string;
  name: string;

  constructor(props) {
    Object.assign(this, props);
  }
}

export class SubjectVO extends SubjectBaseVO {
  grades: GradeBaseVO[];
}
