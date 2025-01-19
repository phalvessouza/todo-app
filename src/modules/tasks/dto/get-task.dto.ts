import { IsUUID } from 'class-validator';

export class GetTaskDto {
    @IsUUID()
    id: string;
}