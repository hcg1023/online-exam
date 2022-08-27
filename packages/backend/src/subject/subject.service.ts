import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  create(createSubjectDto: CreateSubjectDto) {
    return 'This action adds a new subject';
  }

  findAll() {
    return `This action returns all subject`;
  }

  findOne(id: string) {
    return `This action returns a #${id} subject`;
  }

  update(updateSubjectDto: UpdateSubjectDto) {
    return `This action updates a #${updateSubjectDto.id} subject`;
  }

  remove(id: string) {
    return `This action removes a #${id} subject`;
  }
}
