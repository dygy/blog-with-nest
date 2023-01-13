import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { BlogService } from './blogs.service';
import { CreateBlogDto } from './create-blog.dto';
import { NODE_ENV } from '../../shared/constants/env';

@UseGuards(RolesGuard)
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    await this.blogService.create(createBlogDto);
  }

  @Get('/blog-posts')
  public async findAll() {
    const res = await this.blogService.findAll();

    if (NODE_ENV === 'development' && (res === undefined || res.length === 0)) {
      await this.blogService.create({
        name: 'hello world',
        date: new Date(),
        text: 'dance wit the devil',
      } as unknown as CreateBlogDto);
      await this.blogService.create({
        name: "world don't deserve me",
        date: new Date(),
        text: 'goodbye the world',
      } as unknown as CreateBlogDto);
      return await this.blogService.findAll();
    }
    return res || [];
  }

  @Get('/blog-posts/:id')
  public async findOne(@Param('id') id: string) {
    return await this.blogService.findOne(id);
  }

  @Delete('/blog-posts/:id')
  public async delete(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}
