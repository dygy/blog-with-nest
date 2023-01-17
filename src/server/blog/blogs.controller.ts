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
import { blogPart } from '../../shared/types/blog-post';

@UseGuards(RolesGuard)
@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('/write')
  public async write(@Body() body: { name: string; text: blogPart[] }) {
    return await this.blogService.create({
      text: JSON.stringify(body.text),
      date: new Date(),
      name: body.name,
    } as unknown as CreateBlogDto);
  }

  @Get('/blog-posts')
  public async findAll() {
    const res = await this.blogService.findAll();

    return res || [];
  }

  @Get('/blog-posts/:id')
  public async findOne(@Param('id') id: string) {
    console.log(await this.blogService.findOne(id));
    return await this.blogService.findOne(id);
  }

  @Delete('/blog-posts/:id')
  public async delete(@Param('id') id: string) {
    return this.blogService.delete(id);
  }
}
