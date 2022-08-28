import { GradeVO } from '../../grade/entities/grade.vo.entity';

export class ClassInfoBaseVO {
  id: string;
  name: string;

  constructor(props) {
    Object.assign(this, props);
  }
}
export class ClassInfoVO extends ClassInfoBaseVO {
  grade: GradeVO;
}
