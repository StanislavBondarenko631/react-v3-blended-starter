import { fetchPosts } from '@/lib/api';
import PostsClient from '@/app/posts/filter/[...slug]/Posts.client';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const userId = slug ? slug[0] : 'All';
  const title = userId === 'All' ? 'Posts - All Users' : `Posts - User ${userId}`;

  return { title };
}

export default async function PostsPage({ params }: Props) {
  const { slug } = await params;
  const userId = slug ? slug[0] : 'All';

  const initialData = await fetchPosts({
    searchText: '',
    page: 1,
    ...(userId !== 'All' && { userId }),
  });

  return <PostsClient userId={userId} initialData={initialData} />;
}
