import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../role/role.decorator';
import { IdentityEnum } from '../enums';
import { RequestUser } from '../auth/user.decorator';
import { User } from './entities/user.entity';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(IdentityEnum.ADMIN, IdentityEnum.TEACHER)
  @Post('create')
  @ApiResponse({
    status: 200,
    type: User,
  })
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
  @ApiResponse({
    status: 200,
    type: [User],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post('update')
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Post('remove/:id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
