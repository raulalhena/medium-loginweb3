import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AssignNonceDto } from './dto/assign-nonce.dto';
import { SignInDto } from './dto/signin.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/nonce')
  assignNonce(@Body() assignNonceDto: AssignNonceDto) {
    return this.usersService.assignNonce(assignNonceDto);
  }

  @Post('/signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.usersService.signIn(signInDto);
  }
}
