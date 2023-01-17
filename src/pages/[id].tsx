import Link from 'next/link';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { Blog, blogElement, blogPart } from 'src/shared/types/blog-post';
import { fetch } from 'src/shared/utils/fetch';
import React, { useMemo } from 'react';
import Background from '../client/components/Background/Background';

declare type props = {
  post: Blog;
};

declare type blogQuery = {
  id: string;
};

const flowParser = (
  element: blogElement | blogPart,
  key?: string,
): JSX.Element => {
  if (element.italic) {
    return <i key={key}>{element.text}</i>;
  }

  if (element.code) {
    return <code key={key}>{element.text}</code>;
  }

  if (element.bold) {
    return <strong key={key}>{element.text}</strong>;
  }

  if (element.underline) {
    return <u key={key}>{element.text}</u>;
  }

  if ('type' in element) {
    const inside = element.children?.map((el, index) =>
      flowParser(el, `${element.type}${key}${index}`),
    );

    if (element.type === 'numbered-list') {
      return <dl key={key}>{inside}</dl>;
    }

    if (element.type === 'bulleted-list') {
      return <ol key={key}>{inside}</ol>;
    }

    if (element.type === 'list-item') {
      return <li key={key}>{inside}</li>;
    }

    if (element.type === 'paragraph') {
      switch (element.align) {
        case 'justify':
          return (
            <p
              key={key}
              style={{
                textAlign: 'justify',
              }}
            >
              {inside}
            </p>
          );
        case 'right':
          return (
            <p
              key={key}
              style={{
                display: 'flex',
                justifyContent: 'right',
              }}
            >
              {inside}
            </p>
          );
        case 'center':
          return (
            <p
              key={key}
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {inside}
            </p>
          );
        default:
          return <p key={key}>{inside}</p>;
      }
    }

    if (element.type === 'heading-two') {
      return <h2 key={key}>{inside}</h2>;
    }

    if (element.type === 'heading-one') {
      return <h2 key={key}>{inside}</h2>;
    }

    if (element.type === 'block-quote') {
      return <blockquote key={key}>„{inside}”</blockquote>;
    }
  }

  return <span key={key}>{element.text}</span>;
};

const Id = ({ post }: props) => {
  const postRender = useMemo(() => {
    const obj = JSON.parse(post.text);
    const elements = obj.map((part: blogPart, index: number) => {
      return flowParser(part, `${index}${part.type}`);
    });

    return <div>{elements}</div>;
  }, [post]);
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
      <div>{postRender}</div>
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
