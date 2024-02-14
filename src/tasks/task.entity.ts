import { User } from '../auth/user.entity';
import { TaskStatus } from './task-status.enum';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Task {
    @ApiProperty({ example: '513fc14c-8a4a-408d-aa87-72350e21fd87', description: 'The unique identifier of the task', type: String, required: true })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ example: 'Task Title', description: 'The title of the task', type: String, required: true })
    @Column()
    title: string;

    @ApiProperty({ example: 'Task Description', description: 'The description of the task', type: String, required: false })
    @Column()
    description: string;

    @ApiProperty({ example: 'OPEN', description: 'The status of the task', type: String, required: true, enum: TaskStatus })
    @Column()
    status: TaskStatus;

    @ApiProperty({ example: 'user123', description: 'The username of the user', type: String, required: true })
    @ManyToOne(_type => User, user => user.tasks, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User;
}