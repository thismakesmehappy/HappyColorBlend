// This file contains the business logic for the plugin

// Show the UI
figma.showUI(__html__, { width: 400, height: 300 });

// Handle messages from the UI
figma.ui.onmessage = (msg) => {
  switch (msg.type) {
    case 'ui-ready':
      // UI is ready, we can send initial data if needed
      console.log('UI is ready');
      break;
      
    case 'hello-requested':
      // Send a hello message to the UI
      figma.ui.postMessage({
        type: 'hello',
        message: 'Hello from Figma plugin code! 👋'
      });
      break;
      
    default:
      console.log('Unknown message type:', msg.type);
  }
};

// This is called when the plugin is closed
figma.on('close', () => {
  // Clean up if needed
});