import React, { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchPosts } from '../../features/posts/postsSlice';
import { selectFilteredPosts, selectPostsLoadingStatus, selectPostsError } from '../../features/posts/postsSelectors';
import { REQUEST_STATUS } from '../../utils/constants';
import PostCard from './PostCard';
import PostFilters from './PostFilters';
import Loader from '../Common/Loader';

function PostList() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectFilteredPosts);
  const status = useAppSelector(selectPostsLoadingStatus);
  const error = useAppSelector(selectPostsError);

  useEffect(() => {
    if (status === REQUEST_STATUS.IDLE) dispatch(fetchPosts());
  }, [status, dispatch]);

  return (
    <div className="flex flex-col gap-4">
      <PostFilters />

      {status === REQUEST_STATUS.LOADING && (
        <div className="panel flex items-center justify-center py-16">
          <Loader label="Fetching posts…" />
        </div>
      )}

      {status === REQUEST_STATUS.FAILED && (
        <div className="panel border-rose/30 px-6 py-8 text-center">
          <p className="text-sm text-rose">Couldn't load posts: {error}</p>
          <button
            onClick={() => dispatch(fetchPosts())}
            className="mt-3 rounded-lg bg-rose/15 px-4 py-2 text-sm text-rose transition hover:bg-rose/25"
          >
            Retry
          </button>
        </div>
      )}

      {status === REQUEST_STATUS.SUCCEEDED && posts.length === 0 && (
        <div className="panel px-6 py-16 text-center">
          <p className="text-sm text-mist-400">No posts match these filters.</p>
        </div>
      )}

      {status === REQUEST_STATUS.SUCCEEDED && posts.length > 0 && (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PostList;
