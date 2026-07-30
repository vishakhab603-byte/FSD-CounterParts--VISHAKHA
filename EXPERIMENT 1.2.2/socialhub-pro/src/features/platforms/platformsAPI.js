const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const SEED_PLATFORMS = [
  { id: 'plat_twitter', name: 'X / Twitter', handle: '@pipeline', color: '#1DA1F2', followers: 48210, connected: true },
  { id: 'plat_linkedin', name: 'LinkedIn', handle: 'Pipeline Inc.', color: '#0A66C2', followers: 21870, connected: true },
  { id: 'plat_instagram', name: 'Instagram', handle: '@pipeline.hq', color: '#E1306C', followers: 63940, connected: true },
  { id: 'plat_facebook', name: 'Facebook', handle: 'Pipeline', color: '#4267B2', followers: 15320, connected: false },
];

export function fetchPlatformsRequest() {
  return delay(500).then(() => SEED_PLATFORMS.map((p) => ({ ...p })));
}

export function toggleConnectionRequest(id) {
  return delay(400).then(() => id);
}
