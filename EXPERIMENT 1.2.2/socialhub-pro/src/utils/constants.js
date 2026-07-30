// Central vocabulary for the app. Keeping these in one place means
// slices, selectors, and components all agree on the same shape.

export const POST_STATUS = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  PUBLISHED: 'published',
  FAILED: 'failed',
};

// Order carries real meaning here: this is the literal pipeline a post
// travels through, so a numbered/staged UI treatment is justified.
export const STATUS_PIPELINE = [
  POST_STATUS.DRAFT,
  POST_STATUS.SCHEDULED,
  POST_STATUS.PUBLISHED,
];

export const STATUS_META = {
  [POST_STATUS.DRAFT]: { label: 'Draft', color: '#8B93A8' },
  [POST_STATUS.SCHEDULED]: { label: 'Scheduled', color: '#F5A623' },
  [POST_STATUS.PUBLISHED]: { label: 'Published', color: '#2DD4BF' },
  [POST_STATUS.FAILED]: { label: 'Failed', color: '#FB5D74' },
};

export const REQUEST_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed',
};
