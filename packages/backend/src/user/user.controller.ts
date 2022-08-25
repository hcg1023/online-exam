import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../role/role.decorator';
import { IdentityEnum } from '@online-exam/contants';
import { User } from '../auth/user.decorator';
import { UserVo } from './vo/user.vo';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(IdentityEnum.ADMIN, IdentityEnum.TEACHER)
  @Post('create')
  create(@Body() createUserDto: CreateUserDto, @User() user: UserVo) {
    return this.userService.create(createUserDto);
  }

  @Get('list')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Post(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
