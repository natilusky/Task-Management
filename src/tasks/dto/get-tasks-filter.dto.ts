import { IsEnum, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../task-status.enum";
import { ApiProperty } from "@nestjs/swagger";

export class GetTasksFilterDto {
    @ApiProperty({ required: false, description: 'The status of the task', default: 'OPEN', example: 'OPEN', type: String, format: 'string', enum: TaskStatus })
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @ApiProperty({ required: false, description: 'The search string to filter tasks', default: '', example: 'search string', type: String, format: 'string' })
    @IsOptional()
    @IsString()
    search?: string;
}