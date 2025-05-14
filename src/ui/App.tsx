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
    <div className="container p-3">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Hello World Figma Plugin</h5>
              <p className="card-text">{message || 'Waiting for message...'}</p>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  parent.postMessage({ pluginMessage: { type: 'hello-requested' } }, '*');
                }}
              >
                Say Hello
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;