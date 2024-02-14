import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authSerice: AuthService) { }

    @Post('/signup')
    signUp(@Body() AuthCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authSerice.signUp(AuthCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() AuthCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authSerice.signIn(AuthCredentialsDto);
    }
}
