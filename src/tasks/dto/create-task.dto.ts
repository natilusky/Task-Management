import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
    @ApiProperty({ example: 'Task Title', description: 'The title of the task', type: String, required: true })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'Task Description', description: 'The description of the task', type: String, required: false })
    @IsNotEmpty()
    description: string;
}