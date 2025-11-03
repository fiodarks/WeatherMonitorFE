import React from 'react';

export default function SimpleModal({ title, content, onClose }) {
  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0,
      width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.3)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: 'lightgray',
        color: 'black',
        padding: '20px',
        borderRadius: '8px',
        minWidth: '300px',
      }}>
        <h3>{title}</h3>
        <div>{content}</div>
        <button onClick={onClose} style={{ marginTop: '10px', cursor: 'pointer' }}>OK</button>
      </div>
    </div>
  );
}