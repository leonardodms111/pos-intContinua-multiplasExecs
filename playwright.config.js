// Playwright config to restrict test discovery to the repository's `test` folder
module.exports = {
  testDir: './test',
  timeout: 30000,
  use: { headless: true }
};
