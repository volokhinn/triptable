import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTripsByPage } from '../../redux/slices/tripsSlice';
import Loader from '../Loader/Loader';
import styles from './TripsTable.module.scss';
import TripRow from '../TripRow/TripRow';

const TripsTable = () => {
  const dispatch = useDispatch();
  const { trips, pageData, loading, error } = useSelector((state) => state.trips);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !trips.length) {
      dispatch(fetchTripsByPage({ token, page: 1 }));
    }
  }, [dispatch, trips.length]);

  useEffect(() => {
    if (pageData) {
      setCurrentPage(pageData.page);
    }
  }, [pageData]);

  const loadTripsForPage = async (page) => {
    const token = localStorage.getItem('token');
    dispatch(fetchTripsByPage({ token, page }));
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <h1>Trips</h1>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div>
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
          <div className={styles.pagination}>
            <button
              className={styles.pagination_btn}
              onClick={() => loadTripsForPage(currentPage - 1)}
              disabled={currentPage === 1}>
              {`<`}
            </button>
            <span>
              Страница {currentPage} из {pageData && pageData.page_count}
            </span>
            <button
              className={styles.pagination_btn}
              onClick={() => loadTripsForPage(currentPage + 1)}
              disabled={currentPage === (pageData && pageData.page_count)}>
              {`>`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripsTable;
