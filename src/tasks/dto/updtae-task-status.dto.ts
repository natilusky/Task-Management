import { IsEnum } from "class-validator";
import { TaskStatus } from "../task-status.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateTaskStatusDto {
    @ApiProperty({ required: true, description: 'The status of the task', default: 'OPEN', example: 'OPEN', type: String, format: 'string', enum: TaskStatus })
    @IsEnum(TaskStatus)
    status: TaskStatus;
}