import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips } from '../../redux/slices/tripsSlice';

const TripsTable = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.trips);

  useEffect(() => {
    dispatch(fetchTrips());
  }, [dispatch]);

  console.log(orders);

  const getPassengerInfo = (order, field) => {
    return order.passengers.map((passenger) => passenger[field]).join(', ');
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
              <tr key={order.id}>
                <td>{getPassengerInfo(order, 'name')}</td>
                <td>{getPassengerInfo(order, 'phone')}</td>
                <td>{order.status}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripsTable;
