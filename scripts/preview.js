import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { WINDOW_WIDTH, WINDOW_HEIGHT } from './uiConstants.js';

// Get port from environment variable or use default
const port = process.env.PORT || 3002;

// Start webpack-dev-server in the background
const webpackServe = exec('webpack serve --mode=development', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
  }
  console.log(`stdout: ${stdout}`);
});

// Give webpack-dev-server some time to start
setTimeout(() => {
  // Construct the URL
  const url = `http://localhost:${port}/browser.html`;

  // Open browser with specific dimensions
  let command;

  switch (process.platform) {
    case 'darwin': // macOS
      command = `open -a "Google Chrome" --args --new-window --window-size=${WINDOW_WIDTH},${WINDOW_HEIGHT} ${url}`;
      break;
    case 'win32': // Windows
      command = `start chrome --new-window --window-size=${WINDOW_WIDTH},${WINDOW_HEIGHT} ${url}`;
      break;
    default: // Linux and others
      command = `google-chrome --new-window --window-size=${WINDOW_WIDTH},${WINDOW_HEIGHT} ${url}`;
      break;
  }

  exec(command, (error) => {
    if (error) {
      console.error(`Failed to open browser: ${error.message}`);
      console.log('Please open the following URL manually:');
      console.log(url);
    }
  });
}, 3000); // Wait 3 seconds for webpack-dev-server to start

// Handle process termination
process.on('SIGINT', () => {
  webpackServe.kill();
  process.exit();
});
