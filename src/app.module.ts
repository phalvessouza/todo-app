
import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';

@Module({
  imports: [TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule { }