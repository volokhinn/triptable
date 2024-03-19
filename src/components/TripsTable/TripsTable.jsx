import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrips } from '../../redux/slices/tripsSlice';
import styles from './TripsTable.module.scss';
import TripRow from '../TripRow/TripRow';

const TripsTable = () => {
  const dispatch = useDispatch();
  const { trips, loading, error } = useSelector((state) => state.trips);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !trips.length) {
      dispatch(fetchTrips(token));
    }
  }, [dispatch, trips.length]);

  console.log(trips);

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <h1>Trips</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Passenger Name</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {trips && trips.map((order) => <TripRow key={order.order_id} order={order} />)}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TripsTable;
