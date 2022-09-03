import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ClassInfoService } from './class-info.service';
import { CreateClassInfoDto } from './dto/create-class-info.dto';
import { UpdateClassInfoDto } from './dto/update-class-info.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../role/role.decorator';
import { IdentityEnum } from '../enums';
import {
  ApiBaseResponse,
  ApiBooleanResponse,
  ApiPaginatedResponse,
} from '../decorators/response.decorator';
import { ClassInfoVO } from './entities/class-info.vo.entity';
import { ListClassInfoDto } from './dto/list-class-info.dto';
import { PaginatedVO } from '../common/paginated.vo.entity';
import { RequestUser } from '../auth/user.decorator';
import { UserVO } from '../user/entities/user.vo.entity';

@ApiBearerAuth()
@Roles(IdentityEnum.ADMIN)
@ApiTags('ClassInfo 班级')
@Controller('class-info')
export class ClassInfoController {
  constructor(private readonly classInfoService: ClassInfoService) {}

  @ApiBaseResponse(ClassInfoVO)
  @Post('create')
  create(
    @Body() createClassInfoDto: CreateClassInfoDto,
    @RequestUser() user: UserVO,
  ) {
    createClassInfoDto.createdUser = user.id;
    return this.classInfoService.create(createClassInfoDto);
  }

  @Get('list')
  @ApiPaginatedResponse(ClassInfoVO)
  async findAll(@Query() query: ListClassInfoDto, @RequestUser() user: UserVO) {
    const [results, total] = await this.classInfoService.findAll(query, user);
    return new PaginatedVO<ClassInfoVO>({
      pageNo: query.pageNo,
      pageSize: query.pageSize,
      total,
      results,
    });
  }

  @Get(':id')
  @ApiBaseResponse(ClassInfoVO)
  findOne(@Param('id') id: string) {
    return this.classInfoService.findOne(id);
  }

  @Post('update')
  @ApiBaseResponse(ClassInfoVO)
  update(@Body() updateClassInfoDto: UpdateClassInfoDto) {
    return this.classInfoService.update(updateClassInfoDto);
  }

  @Post('remove/:id')
  @ApiBooleanResponse()
  remove(@Param('id') id: string) {
    return this.classInfoService.remove(id);
  }
}
