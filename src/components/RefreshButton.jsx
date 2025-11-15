import React, { useState } from 'react';
import SimpleModal from './SimpleModal.jsx';

export default function RefreshButton({ onRefresh }) {
  const [modal, setModal] = useState(null);

  const handleRefresh = async () => {
    try {
      const response = await fetch('https://limited-joleen-fiodarks-5b0af2c2.koyeb.app/api/weather/measurements?city=Warsaw');
      if (response.status === 200) {
        const data = await response.json();
        setModal(
          <SimpleModal
            title="New Measurement"
            content={
              <table border="1" style={{ width: '100%', textAlign: 'center' }}>
                <thead>
                <tr>
                  {Object.keys(data).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
                </thead>
                <tbody>
                <tr>
                  {Object.values(data).map((val, idx) => (
                    <td key={idx}>{val}</td>
                  ))}
                </tr>
                </tbody>
              </table>
            }
            onClose={() => {
              setModal(null);
              onRefresh();
            }}
          />
        );
      } else if (response.status === 204) {
        setModal(
          <SimpleModal
            title="Nothing to update"
            content="No new measurement available."
            onClose={() => setModal(null)}
          />
        );
      }
    } catch (err) {
      console.log("err")
      console.error(err);
      setModal(
        <SimpleModal
          title="Error"
          content="Failed to refresh measurement."
          onClose={() => setModal(null)}
        />
      );
    }
  };

  return (
    <div style={{ display: 'inline-block', marginLeft: '10px' }}>
      <button onClick={handleRefresh}>Refresh</button>
      {modal}
    </div>
  );
}
