import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';
import { Not } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockTaskRepository = () => ({
    findAll: jest.fn(),
    findById: jest.fn(),
});

const mockUser = {
    username: 'Test user',
    id: 'someId',
    password: 'somePassword',
    tasks: [],
};

describe('TasksService', () => {
    let tasksService: TasksService;
    let taskRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TasksService,
                {
                    provide: TaskRepository,
                    useFactory: mockTaskRepository,
                },
            ],
        }).compile();

        tasksService = module.get<TasksService>(TasksService);
        taskRepository = module.get(TaskRepository);
    });

    describe('findAll', () => {
        it('calls TaskRepository.findAll and returns the result', async () => {
            taskRepository.findAll.mockResolvedValue('someValue');
            const result = await taskRepository.findAll(null, mockUser);
            expect(result).toEqual('someValue');
        });
    });

    describe('findById', () => {
        it('calls TaskRepository.findById and returns the result', async () => {
            const mockTask = {
                title: 'Test task',
                description: 'Test desc',
                id: 'someId',
                status: TaskStatus.OPEN,
            };
            taskRepository.findById.mockResolvedValue(mockTask);
            const result = await taskRepository.findById('someId', mockUser);
            expect(result).toEqual(mockTask);
        });

        it('calls TaskRepository.findById and handles an error', async () => {
            taskRepository.findById.mockRejectedValue(new NotFoundException());
            await expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(NotFoundException);
        });
    });
});