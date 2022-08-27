import { Subject } from '../../subject/entities/subject.entity';
import { ClassInfo } from '../../class-info/entities/class-info.entity';

export class GradeVO {
  id: string;
  title: string;
  subjects: Subject[];
  classInfos: ClassInfo[];
}
