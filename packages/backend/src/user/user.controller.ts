import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../role/role.decorator';
import { IdentityEnum } from '../enums';
import { RequestUser } from '../auth/user.decorator';
import { User } from './entities/user.entity';
import { UserListDto } from './dto/user-list.dto';
import { UserVO } from './entities/user.vo.entity';
import {
  ApiBaseResponse,
  ApiBooleanResponse,
  ApiPaginatedResponse,
} from '../decorators/response.decorator';

@ApiBearerAuth()
@ApiTags('User 用户')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(IdentityEnum.ADMIN, IdentityEnum.TEACHER)
  @Post('create')
  @ApiBaseResponse(UserVO)
  create(@Body() createUserDto: CreateUserDto, @RequestUser() user: User) {
    if (
      user.identity === IdentityEnum.TEACHER &&
      createUserDto.identity !== IdentityEnum.STUDENT
    ) {
      throw new UnauthorizedException();
    }
    createUserDto.createdUser = user.id;
    return this.userService.create(createUserDto);
  }

  @Get('list')
  @ApiPaginatedResponse(UserVO)
  findAll() {
    return this.userService.findAll();
  }

  @Get('admin/list')
  @ApiPaginatedResponse(UserVO)
  getAdminList(@Query() query: UserListDto) {
    return this.userService.findUserList(IdentityEnum.ADMIN, query);
  }

  @Get('teacher/list')
  @ApiPaginatedResponse(UserVO)
  getTeacherList(@Query() query: UserListDto) {
    return this.userService.findUserList(IdentityEnum.TEACHER, query);
  }

  @Get('student/list')
  @ApiPaginatedResponse(UserVO)
  getStudentList(@Query() query: UserListDto) {
    return this.userService.findUserList(IdentityEnum.STUDENT, query);
  }

  @Get('profile')
  @ApiBaseResponse(UserVO)
  getCurrentUserInfo(@RequestUser() user: UserVO) {
    return user;
  }

  @Get(':id')
  @ApiBaseResponse(UserVO)
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post('update')
  @ApiBaseResponse(UserVO)
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Roles(IdentityEnum.ADMIN, IdentityEnum.TEACHER)
  @Post('remove/:id')
  @ApiBooleanResponse()
  async remove(@Param('id') id: number, @RequestUser() requestUser: User) {
    const user = await this.userService.findOne(id);
    if (
      requestUser.identity === IdentityEnum.TEACHER &&
      user.identity !== IdentityEnum.STUDENT
    ) {
      throw new UnauthorizedException();
    }
    return this.userService.remove(id);
  }
}
