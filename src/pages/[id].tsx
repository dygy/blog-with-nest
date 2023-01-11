import Link from 'next/link';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { BlogPost } from 'src/shared/types/blog-post';
import { fetch } from 'src/shared/utils/fetch';
import { useMemo } from 'react';

declare type blogProps = {
  post: BlogPost;
};

declare type blogQuery = {
  id: string;
};

const Id = ({ post }: blogProps) => {
  const title = useMemo(() => {
    if (post.id === 0) {
      return <h1>{post.title} 404</h1>;
    } else {
      return <h1>Blog {post.title}</h1>;
    }
  }, [post.id]);
  return (
    <div>
      <Link href={'/'}>Home</Link>
      {title}
    </div>
  );
};

const errorBlog: BlogPost = {
  id: 0,
  title: 'ERROR',
};
export const getServerSideProps = buildServerSideProps<blogProps, blogQuery>(
  async (ctx) => {
    let id = ctx.query.id;

    if (id === '[id]') {
      id = ctx.req.url?.substr(1, ctx.req.url.length - 1) || '0';
    }

    const post = (await fetch(`/api/blog-posts/${id}`)) || errorBlog;

    return { post };
  },
);

export default Id;
