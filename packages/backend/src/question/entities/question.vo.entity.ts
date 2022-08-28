import { QuestionTypeEnum, QuestionTypeFormatterEnum } from '../../enums';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionOption } from './question-option.entity';
import { GradeBaseVO } from '../../grade/entities/grade.vo.entity';
import { SubjectBaseVO } from '../../subject/entities/subject.vo.entity';

export class QuestionBaseVO {
  id: number;

  title: string;

  type: QuestionTypeEnum;

  @ApiProperty({
    type: 'string',
  })
  @Expose()
  get typeName() {
    return QuestionTypeFormatterEnum[this.type] || '';
  }
  set typeName(value) {
    // 继承的@Expose()属性 如果没有setter就会报错 https://github.com/typestack/class-transformer/issues/1257
  }

  score: number;

  difficulty: number;

  options: QuestionOption[];

  correctOptions: string[];

  answer: string;

  analyze: string;

  constructor(props) {
    Object.assign(this, props);
  }
}

export class QuestionVO extends QuestionBaseVO {
  grade: GradeBaseVO;

  subject: SubjectBaseVO;
}
