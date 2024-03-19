import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTripsByPageAndFilters } from '../../redux/slices/tripsSlice';
import Loader from '../Loader/Loader';
import styles from './TripsTable.module.scss';
import TripRow from '../TripRow/TripRow';

import logo from '../../img/iway.svg';

const TripsTable = () => {
  const dispatch = useDispatch();
  const { trips, pageData, loading, error } = useSelector((state) => state.trips);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterNames, setFilterNames] = useState('');
  const [filterPhone, setFilterPhone] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !trips.length) {
      dispatch(
        fetchTripsByPageAndFilters({
          token,
          page: 1,
          names: filterNames,
          email: filterPhone,
          order_status: filterStatus,
        }),
      );
    }
  }, [dispatch, trips.length, filterNames, filterPhone, filterStatus]);

  useEffect(() => {
    if (pageData) {
      setTotalPages(pageData.page_count);
    }
  }, [pageData]);

  const loadTripsForPage = (page) => {
    const token = localStorage.getItem('token');
    dispatch(
      fetchTripsByPageAndFilters({
        token,
        page,
        names: filterNames,
        email: filterPhone,
        order_status: filterStatus,
      }),
    );
    setCurrentPage(page);
  };

  const handleFilter = () => {
    const token = localStorage.getItem('token');
    dispatch(
      fetchTripsByPageAndFilters({
        token,
        page: 1,
        names: filterNames,
        email: filterPhone,
        order_status: filterStatus,
      }),
    );
  };

  return (
    <div>
      {error && <div>Error: {error}</div>}
      <div className={styles.header}>
        <img src={logo} alt="iway" />
        <h1 className={styles.title}>Trips</h1>
      </div>
      <div>
        {loading ? (
          <div>
            <Loader />
          </div>
        ) : (
          <div>
            <div className={styles.filters}>
              <input
                type="text"
                placeholder="Filter by name"
                value={filterNames}
                onChange={(e) => setFilterNames(e.target.value)}
              />
              <input
                type="text"
                placeholder="Filter by phone"
                value={filterPhone}
                onChange={(e) => setFilterPhone(e.target.value)}
              />
              <input
                type="text"
                placeholder="Filter by status"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              />
              <button onClick={handleFilter}>Filter</button>
            </div>
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
    </div>
  );
};

export default TripsTable;
