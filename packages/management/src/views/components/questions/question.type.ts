import { QuestionTypeEnum } from "/@/enums";

interface OptionItem {
  title: string;
  value: string;
}

export interface BaseQuestion {
  id: string;
  type: QuestionTypeEnum;
  typeName: string;
  title: string;
  score: number;
  difficulty: number;
  analyze: string;
  options: OptionItem[];
  correctOptions: string[];
  answer: string;
}
