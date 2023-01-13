import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { CreateBlogDto } from './create-blog.dto';
import { Blog } from '../../shared/types/blog-post';

@Injectable()
export class BlogService {
  constructor(@Inject('BLOG_MODEL') private readonly blogModel: Model<Blog>) {}

  async create(createCatDto: CreateBlogDto): Promise<Blog> {
    return this.blogModel.create(createCatDto);
  }
  async findAll() {
    return await this.blogModel.find().exec();
  }
  async findOne(id: string) {
    return await this.blogModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    return await this.blogModel.findByIdAndRemove({ _id: id }).exec();
  }
}
