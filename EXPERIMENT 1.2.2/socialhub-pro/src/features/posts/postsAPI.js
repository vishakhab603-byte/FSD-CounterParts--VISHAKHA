import { generateId } from '../../utils/idGenerator';
import { POST_STATUS } from '../../utils/constants';

// Simulated network latency so loading states / spinners are meaningful.
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const now = Date.now();
const iso = (offsetMs) => new Date(now + offsetMs).toISOString();

// Seed data lives here (not in the slice) to mimic a real API response body.
const SEED_POSTS = [
  {
    id: generateId('post'),
    title: 'Launching our Q3 roadmap',
    body: 'A behind-the-scenes look at what we shipped and what is next.',
    platformId: 'plat_twitter',
    status: POST_STATUS.PUBLISHED,
    tags: ['product', 'roadmap'],
    createdAt: iso(-1000 * 60 * 60 * 30),
    scheduledAt: iso(-1000 * 60 * 60 * 28),
    engagement: { likes: 482, shares: 91, comments: 37 },
  },
  {
    id: generateId('post'),
    title: 'Design system v2 is here',
    body: 'Tokens, components, and docs — all rebuilt from the ground up.',
    platformId: 'plat_linkedin',
    status: POST_STATUS.PUBLISHED,
    tags: ['design', 'engineering'],
    createdAt: iso(-1000 * 60 * 60 * 50),
    scheduledAt: iso(-1000 * 60 * 60 * 46),
    engagement: { likes: 1204, shares: 233, comments: 88 },
  },
  {
    id: generateId('post'),
    title: 'Behind the scenes: onboarding revamp',
    body: 'Six weeks, three prototypes, one much simpler flow.',
    platformId: 'plat_instagram',
    status: POST_STATUS.SCHEDULED,
    tags: ['ux'],
    createdAt: iso(-1000 * 60 * 60 * 5),
    scheduledAt: iso(1000 * 60 * 60 * 6),
    engagement: { likes: 0, shares: 0, comments: 0 },
  },
  {
    id: generateId('post'),
    title: 'Weekly changelog #42',
    body: 'Bug fixes, performance wins, and a faster search index.',
    platformId: 'plat_twitter',
    status: POST_STATUS.SCHEDULED,
    tags: ['changelog'],
    createdAt: iso(-1000 * 60 * 60 * 2),
    scheduledAt: iso(1000 * 60 * 60 * 20),
    engagement: { likes: 0, shares: 0, comments: 0 },
  },
  {
    id: generateId('post'),
    title: 'Draft: hiring announcement',
    body: 'We are growing the platform team — details TBD.',
    platformId: 'plat_linkedin',
    status: POST_STATUS.DRAFT,
    tags: ['careers'],
    createdAt: iso(-1000 * 60 * 30),
    scheduledAt: null,
    engagement: { likes: 0, shares: 0, comments: 0 },
  },
  {
    id: generateId('post'),
    title: 'Draft: customer story teaser',
    body: 'A short teaser ahead of next week\u2019s full case study.',
    platformId: 'plat_instagram',
    status: POST_STATUS.DRAFT,
    tags: ['customers'],
    createdAt: iso(-1000 * 60 * 12),
    scheduledAt: null,
    engagement: { likes: 0, shares: 0, comments: 0 },
  },
  {
    id: generateId('post'),
    title: 'Migration guide push failed',
    body: 'Image asset exceeded platform size limits on last attempt.',
    platformId: 'plat_facebook',
    status: POST_STATUS.FAILED,
    tags: ['docs'],
    createdAt: iso(-1000 * 60 * 60 * 8),
    scheduledAt: iso(-1000 * 60 * 60 * 7),
    engagement: { likes: 0, shares: 0, comments: 0 },
  },
];

export function fetchPostsRequest() {
  return delay(650).then(() => SEED_POSTS.map((p) => ({ ...p })));
}

export function createPostRequest(payload) {
  return delay(450).then(() => ({
    ...payload,
    id: generateId('post'),
    createdAt: new Date().toISOString(),
    engagement: { likes: 0, shares: 0, comments: 0 },
  }));
}

export function updatePostRequest(id, changes) {
  return delay(350).then(() => ({ id, changes }));
}

export function deletePostRequest(id) {
  return delay(300).then(() => id);
}

/** Simulates pushing a scheduled/draft post live, with a small failure chance. */
export function publishPostRequest(id) {
  return delay(700).then(() => {
    if (Math.random() < 0.12) {
      const err = new Error('Platform rejected the request (rate limited). Try again shortly.');
      throw err;
    }
    return { id, publishedAt: new Date().toISOString() };
  });
}
