import { QuestionVO } from '../../question/entities/question.vo.entity';
import { Type } from 'class-transformer';

export class QuestionGroupVO {
  id: string;

  order: number;

  title: string;

  @Type(() => QuestionVO)
  questions: QuestionVO[];
}
