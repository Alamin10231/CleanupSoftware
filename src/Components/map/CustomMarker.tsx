import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
const CustomMarker: React.FC = () => (
  <div style={{
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: 'rgba(36, 99, 234, 1)',
    border: '2px solid #FFFFFF',
    textAlign: 'center',
    color: '#FFFFFF',
    lineHeight: '30px',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
    <FaMapMarkerAlt />
  </div>
);

export default CustomMarker;
