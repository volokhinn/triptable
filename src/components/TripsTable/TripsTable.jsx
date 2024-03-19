import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips } from '../../redux/slices/tripsSlice';

const TripsTable = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.trips);
  const [selectedTrip, setSelectedTrip] = useState(null);

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

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

  const getPassengerInfo = (order, field) => {
    if (field === 'phone') {
      return formatPhoneNumber(order.passengers[0][field]);
    }
    return order.passengers.map((passenger) => passenger[field]).join(', ');
  };

  const handleRowClick = (order) => {
    setSelectedTrip(order === selectedTrip ? null : order);
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <h2>Trips</h2>
      <table>
        <thead>
          <tr>
            <th>Passenger Name</th>
            <th>Phone Number</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order) => (
              <React.Fragment key={order.order_id}>
                <tr>
                  <td>{getPassengerInfo(order, 'name')}</td>
                  <td>{getPassengerInfo(order, 'phone')}</td>
                  <td>{order.status}</td>
                  <td onClick={() => handleRowClick(order)}>
                    <button>{!selectedTrip ? 'Show details' : 'Hide details'}</button>
                  </td>
                </tr>
                {selectedTrip === order && (
                  <tr>
                    <td>
                      <div>
                        <h3>Additional Information:</h3>
                        <p>Destination Address: {order.destination_address}</p>
                        <p>Location Address: {order.location_address}</p>
                        <p>Car Class: {order.car_data.class}</p>
                        <p>Car Model: {order.car_data.models}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripsTable;
