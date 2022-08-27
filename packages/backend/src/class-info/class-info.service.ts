import { Injectable } from '@nestjs/common';
import { CreateClassInfoDto } from './dto/create-class-info.dto';
import { UpdateClassInfoDto } from './dto/update-class-info.dto';

@Injectable()
export class ClassInfoService {
  create(createClassInfoDto: CreateClassInfoDto) {
    return 'This action adds a new classInfo';
  }

  findAll() {
    return `This action returns all classInfo`;
  }

  findOne(id: string) {
    return `This action returns a #${id} classInfo`;
  }

  update(id: number, updateClassInfoDto: UpdateClassInfoDto) {
    return `This action updates a #${id} classInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} classInfo`;
  }
}
