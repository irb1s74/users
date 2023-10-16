import {IsEmail,  IsString} from 'class-validator';


export class FindUserDto {
    @IsEmail({}, {message: 'Email не валиден'})
    readonly email: string;
    @IsString({message: 'Должно быть строкой'})
    readonly number: string;
}
