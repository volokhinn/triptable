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

  const formatPhoneNumber = (phoneNumber) => {
    // Регулярное выражение для извлечения только цифр из строки
    let digits = phoneNumber.replace(/\D/g, '');
    // Удаляем первую цифру, если она равна 7 (так как все номера начинаются с 7)
    if (digits.charAt(0) === '7') {
      digits = digits.substring(1);
    }
    // Применяем маску к номеру телефона
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
