import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { addNewPost } from '../../features/posts/postsSlice';
import { selectMutationStatus } from '../../features/posts/postsSelectors';
import { selectAllPlatforms } from '../../features/platforms/platformsSelectors';
import { selectIsComposerOpen, composerClosed, toastPushed } from '../../features/ui/uiSlice';
import { POST_STATUS, REQUEST_STATUS } from '../../utils/constants';
import Modal from '../Common/Modal';

const EMPTY_FORM = { title: '', body: '', platformId: '', status: POST_STATUS.DRAFT, scheduledAt: '', tags: '' };

function PostForm() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsComposerOpen);
  const platforms = useAppSelector(selectAllPlatforms);
  const mutationStatus = useAppSelector(selectMutationStatus);
  const [form, setForm] = useState(EMPTY_FORM);
  const [touched, setTouched] = useState(false);

  const isValid = form.title.trim().length > 0 && form.body.trim().length > 0 && form.platformId;

  const close = () => {
    dispatch(composerClosed());
    setForm(EMPTY_FORM);
    setTouched(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid) return;

    const payload = {
      title: form.title.trim(),
      body: form.body.trim(),
      platformId: form.platformId,
      status: form.scheduledAt ? POST_STATUS.SCHEDULED : POST_STATUS.DRAFT,
      scheduledAt: form.scheduledAt ? new Date(form.scheduledAt).toISOString() : null,
      tags: form.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    const result = await dispatch(addNewPost(payload));
    if (addNewPost.fulfilled.match(result)) {
      dispatch(toastPushed(`"${payload.title}" saved as ${payload.status}.`, 'success'));
      close();
    } else {
      dispatch(toastPushed('Could not save the post. Please try again.', 'error'));
    }
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => setForm((f) => ({ ...f, [key]: e.target.value })),
  });

  return (
    <Modal open={isOpen} onClose={close} title="Compose a new post">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-mist-400">Title</label>
          <input
            {...field('title')}
            placeholder="Give it a clear, scannable title"
            className="w-full rounded-xl border border-ink-700 bg-ink-900 px-3 py-2.5 text-sm text-mist-100 outline-none transition focus:border-violet"
          />
          {touched && !form.title.trim() && <p className="mt-1 text-xs text-rose">Title is required.</p>}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-mist-400">Body</label>
          <textarea
            {...field('body')}
            rows={4}
            placeholder="What do you want to say?"
            className="w-full resize-none rounded-xl border border-ink-700 bg-ink-900 px-3 py-2.5 text-sm text-mist-100 outline-none transition focus:border-violet"
          />
          {touched && !form.body.trim() && <p className="mt-1 text-xs text-rose">Body is required.</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-mist-400">Platform</label>
            <select
              {...field('platformId')}
              className="w-full rounded-xl border border-ink-700 bg-ink-900 px-3 py-2.5 text-sm text-mist-100 outline-none transition focus:border-violet"
            >
              <option value="">Select…</option>
              {platforms.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
            {touched && !form.platformId && <p className="mt-1 text-xs text-rose">Choose a platform.</p>}
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-mist-400">Schedule for (optional)</label>
            <input
              type="datetime-local"
              {...field('scheduledAt')}
              className="w-full rounded-xl border border-ink-700 bg-ink-900 px-3 py-2.5 text-sm text-mist-100 outline-none transition focus:border-violet"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-mist-400">Tags (comma separated)</label>
          <input
            {...field('tags')}
            placeholder="product, launch"
            className="w-full rounded-xl border border-ink-700 bg-ink-900 px-3 py-2.5 text-sm text-mist-100 outline-none transition focus:border-violet"
          />
        </div>

        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={close}
            className="rounded-xl px-4 py-2 text-sm text-mist-300 transition hover:bg-ink-700 hover:text-mist-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={mutationStatus === REQUEST_STATUS.LOADING}
            className="rounded-xl bg-violet px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-violet-soft disabled:cursor-not-allowed disabled:opacity-60"
          >
            {mutationStatus === REQUEST_STATUS.LOADING
              ? 'Saving…'
              : form.scheduledAt
                ? 'Schedule post'
                : 'Save as draft'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default PostForm;
