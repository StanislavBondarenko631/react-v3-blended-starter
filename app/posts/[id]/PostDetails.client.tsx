'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import { fetchPostById, fetchUserById } from '@/lib/api';

import css from './PostDetails.module.css';

export default function PostDetailsClient() {
  const router = useRouter();
  const handleClickBack = () => router.back();
  const { id } = useParams<{ id: string }>();
  const postId = Number(id);

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetchPostById(postId),
    refetchOnMount: false,
  });

  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['user', note?.userId],
    queryFn: () => fetchUserById(note!.userId),
    enabled: !!note?.userId,
  });

  if (isLoading || isUserLoading) return <p>Loading, please wait...</p>;

  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <>
      <main className={css.main}>
        <div className={css.container}>
          <div className={css.item}>
            <button className={css.backBtn} onClick={handleClickBack}>
              ← Back
            </button>

            <div className={css.post}>
              <div className={css.wrapper}>
                <div className={css.header}>
                  <h2>{note.title}</h2>
                </div>

                <p className={css.content}>{note.body}</p>
              </div>
              <p className={css.user}>Author: {user?.name}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
