import {Injectable} from '@nestjs/common';
import {FindUserDto} from "./dto/find-user.dto";
import * as MOCKED_DATA from '../data.json'

@Injectable()
export class UsersService {
    async getUserByEmailAndNumber(dto: FindUserDto) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, 5000)
        }).then(() => {
            return MOCKED_DATA.filter((user) => {
                return user.email.includes(dto.email) && user.number.includes(dto.number)
            })
        })

    }
}
