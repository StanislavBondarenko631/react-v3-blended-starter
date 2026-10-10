import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import PostPreviewClient from '@/app/@modal/(.)posts/[id]/PostPreview.client';
import { fetchPostById } from '@/lib/api';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostPreviewPage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(Number(id)),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PostPreviewClient />
    </HydrationBoundary>
  );
}
