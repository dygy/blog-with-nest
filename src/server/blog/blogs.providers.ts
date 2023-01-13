import { Mongoose } from 'mongoose';
import { BlogSchema } from './schemas/blogs.schema';

export const blogsProviders = [
  {
    provide: 'BLOG_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Blog', BlogSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
