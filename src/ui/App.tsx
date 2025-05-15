import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Listen for messages from the plugin code
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'hello') {
        setMessage(message);
      }
    };

    // Tell the plugin code that the UI is ready
    parent.postMessage({ pluginMessage: { type: 'ui-ready' } }, '*');
  }, []);

  return (
    <div className="container figma-p-2">
      <div className="row">
        <div className="col-12">
          <div className="figma-card">
            <h5 className="figma-title">Hello World Figma Plugin</h5>
            <p className="figma-text">{message || 'Waiting for message...'}</p>
            <div className="figma-divider"></div>
            <div className="d-flex justify-content-between">
              <button 
                className="figma-btn figma-btn-primary"
                onClick={() => {
                  parent.postMessage({ pluginMessage: { type: 'hello-requested' } }, '*');
                }}
              >
                Say Hello
              </button>
              <div className="figma-tooltip">
                <button className="figma-btn figma-btn-secondary">
                  Help
                </button>
                <span className="figma-tooltip-text">Click 'Say Hello' to receive a message from the plugin</span>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <h6 className="figma-subtitle">Figma Style Examples</h6>
            <div className="row mt-2">
              <div className="col-6">
                <div className="p-2 figma-bg-primary figma-text-light">Primary</div>
              </div>
              <div className="col-6">
                <div className="p-2 figma-bg-secondary figma-text-dark">Secondary</div>
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-4">
                <div className="p-2 figma-bg-success figma-text-light">Success</div>
              </div>
              <div className="col-4">
                <div className="p-2 figma-bg-warning figma-text-dark">Warning</div>
              </div>
              <div className="col-4">
                <div className="p-2 figma-bg-danger figma-text-light">Danger</div>
              </div>
            </div>
            <div className="mt-3">
              <input type="text" className="figma-input w-100" placeholder="Figma styled input" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
