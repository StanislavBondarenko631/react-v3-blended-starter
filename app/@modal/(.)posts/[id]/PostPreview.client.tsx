'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { fetchPostById, fetchUserById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

import css from './PostPreview.module.css';

export default function PostPreviewClient() {
  const router = useRouter();
  const handleClickBack = () => router.back();
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(postId),
    refetchOnMount: false,
  });

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['user', post?.userId],
    queryFn: () => fetchUserById(post!.userId),
    enabled: !!post?.userId,
  });

  if (isLoading || isUserLoading) {
    return (
      <Modal onClose={handleClickBack}>
        <p>Loading, please wait...</p>
      </Modal>
    );
  }

  if (isError || !post) {
    return (
      <Modal onClose={handleClickBack}>
        <p>Something went wrong.</p>
      </Modal>
    );
  }

  return (
    <Modal onClose={handleClickBack}>
      <div className={css.item}>
        <button className={css.backBtn} onClick={handleClickBack}>
          ← Back
        </button>

        <div className={css.post}>
          <div className={css.wrapper}>
            <div className={css.header}>
              <h2>{post.title}</h2>
            </div>

            <p className={css.content}>{post.body}</p>
          </div>
          <p className={css.user}>Author: {user?.name}</p>
        </div>
      </div>
    </Modal>
  );
}
