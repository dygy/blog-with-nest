import Link from 'next/link';
import { useFeature } from 'src/client/hooks/useFeatures';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { BlogPost } from 'src/shared/types/blog-post';
import { fetch } from 'src/shared/utils/fetch';
import Background from '../client/components/Background/Background';

type homeProps = {
  blogPosts: BlogPost[];
};

const Home = ({ blogPosts }: homeProps) => {
  const linkFeature = useFeature('blog_link');

  return (
    <Background>
      <h1>Home</h1>
      {blogPosts.map(({ title, id }) => (
        <div key={id}>
          {linkFeature ? (
            <>
              {title}
              <Link href={`/${id}`}> Link</Link>
            </>
          ) : (
            <Link href={`/${id}`}>{title}</Link>
          )}
        </div>
      ))}
    </Background>
  );
};

export const getServerSideProps = buildServerSideProps<homeProps>(async () => {
  const blogPosts = await fetch('/api/blog-posts');

  return { blogPosts };
});

export default Home;
