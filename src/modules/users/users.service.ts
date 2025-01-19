import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

    async findAll(): Promise<User[]> {
        return [];
    }
}