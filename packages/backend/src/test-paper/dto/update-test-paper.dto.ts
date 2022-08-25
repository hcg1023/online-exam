import { PartialType } from '@nestjs/swagger';
import { CreateTestPaperDto } from './create-test-paper.dto';

export class UpdateTestPaperDto extends PartialType(CreateTestPaperDto) {}
