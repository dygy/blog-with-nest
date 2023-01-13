import { DynamicModule, Module } from '@nestjs/common';
import { BlogController } from './blogs.controller';
import { BlogService } from './blogs.service';
import { blogsProviders } from './blogs.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BlogController],
  providers: [BlogService, ...blogsProviders],
})
export class BlogsModule {
  public static initialize(): DynamicModule {
    return {
      module: BlogsModule,
      imports: [DatabaseModule],
      controllers: [BlogController],
      providers: [BlogService, ...blogsProviders],
    };
  }
}
