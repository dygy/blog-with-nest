import Link from 'next/link';
import { useFeature } from 'src/client/hooks/useFeatures';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { Blog } from 'src/shared/types/blog-post';
import { fetch } from 'src/shared/utils/fetch';
import Background from '../client/components/Background/Background';

type homeProps = {
  blogPosts: Blog[];
};

const Home = ({ blogPosts }: homeProps) => {
  const linkFeature = useFeature('blog_link');

  return (
    <Background>
      <h1>Home</h1>
      {blogPosts.map(({ name, _id }, id) => (
        <div key={_id}>
          {linkFeature ? (
            <>
              <span>
                {id + 1}. {name}{' '}
              </span>
              <Link href={`/${_id}`}>Link</Link>
            </>
          ) : (
            <Link href={`/${_id}`}>{name}</Link>
          )}
        </div>
      ))}
    </Background>
  );
};

export const getServerSideProps = buildServerSideProps<homeProps>(async () => {
  const blogPosts = (await fetch('/blogs/blog-posts')) || [];

  return { blogPosts };
});

export default Home;
