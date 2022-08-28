import { QuestionVO } from '../../question/entities/question.vo.entity';

export class QuestionGroupVO {
  id: string;

  order: number;

  title: string;

  questions: QuestionVO[];
}
