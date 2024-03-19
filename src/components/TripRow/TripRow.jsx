import React, { useState, useEffect } from 'react';
import styles from './TripRow.module.scss';

const TripRow = ({ order }) => {
  const [selectedTrip, setSelectedTrip] = useState(null);

  const handleRowClick = (order) => {
    setSelectedTrip(order === selectedTrip ? null : order);
  };

  const formatPhoneNumber = (phoneNumber) => {
    let digits = phoneNumber.replace(/\D/g, '');
    if (digits.charAt(0) === '7') {
      digits = digits.substring(1);
    }
    return `+7 (${digits.substring(0, 3)})-${digits.substring(3, 6)}-${digits.substring(
      6,
      8,
    )}-${digits.substring(8)}`;
  };

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 540;
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResizeWindow);
    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  return (
    <React.Fragment>
      <tr>
        <td>
          {width < breakpoint ? <div>Name</div> : ''}
          {order.passengers[0].name}
        </td>
        <td>
          {width < breakpoint ? <div>Phone</div> : ''}
          {formatPhoneNumber(order.passengers[0].phone)}
        </td>
        <td>
          {width < breakpoint ? <div>Status</div> : ''}
          {order.status}
        </td>
        <td className={styles.details_td}>
          <button className={styles.details_btn} onClick={() => handleRowClick(order)}>
            {selectedTrip ? 'Hide details' : 'Show details'}
          </button>
        </td>
      </tr>
      {selectedTrip && (
        <tr className={styles.details_row}>
          <td>Date: {order.date}</td>
          <td>Destination Address: {order.destination_address}</td>
          <td>Location Address: {order.location_address}</td>
          <td>Car Class: {order.car_data.car_class}</td>
        </tr>
      )}
    </React.Fragment>
  );
};

export default TripRow;
