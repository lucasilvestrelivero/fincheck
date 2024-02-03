import { Body, Controller, Post } from '@nestjs/common';

import { Public } from '@shared/decorators/public.decorator';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @Public()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('signup')
  @Public()
  signup(@Body() signupDto: SignUpDto) {
    return this.authService.signUp(signupDto);
  }
}
