import {Controller, Get, Param, Req} from '@nestjs/common';
import {UsersService} from "./users.service";
import {FindUserDto} from "./dto/find-user.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @Get('find/:email/:number')
    findUsers(@Param() dto: FindUserDto) {
        return this.usersService.getUserByEmailAndNumber(dto);
    }
}
