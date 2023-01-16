import Link from 'next/link';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { Blog } from 'src/shared/types/blog-post';
import { fetch } from 'src/shared/utils/fetch';
import { useMemo } from 'react';
import Background from '../client/components/Background/Background';

declare type props = {
  post: Blog;
};

declare type blogQuery = {
  id: string;
};

const Id = ({ post }: props) => {
  const title = useMemo(() => {
    if (post._id === 0) {
      return <h1>{post.name} 404</h1>;
    } else {
      return <h1>Blog {post.name}</h1>;
    }
  }, [post._id]);
  return (
    <Background>
      <Link href={'/'}>Home</Link>
      {title}
      {post.text}
    </Background>
  );
};

const errorBlog: Blog = {
  name: 'ERROR',
  text: 'we have the error here',
  date: new Date(),
};
export const getServerSideProps = buildServerSideProps<props, blogQuery>(
  async (ctx) => {
    let ID = ctx.query.id;

    if (ID === '[id]') {
      ID = ctx.req.url?.substr(1, ctx.req.url.length - 1) || '0';
    }

    const post = (await fetch(`/blogs/blog-posts/${ID}`)) || errorBlog;

    return { post };
  },
);

export default Id;
