import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetTaskDto {
    @ApiProperty({ description: 'The UUID of the task' })
    @IsUUID()
    id: string;
}