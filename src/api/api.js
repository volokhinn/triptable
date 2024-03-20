import axios from 'axios';

const baseURL = 'https://transstage1.iwayex.com/transnextgen/v3/';

const instance = axios.create({
  baseURL,
});

export const loginRequest = async (userData) => {
  try {
    const response = await instance.post('auth/login', userData);
    return response.data;
  } catch (error) {
    throw Error(error.response.data);
  }
};

export const fetchTrips = async ({ token, page, names, email, order_status }) => {
  try {
    const response = await instance.get('orders/trips', {
      params: {
        page,
        names,
        email,
        order_status,
        items_on_page: 25,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      trips: response.data.result.orders,
      pageData: response.data.result.page_data,
    };
  } catch (error) {
    throw Error(error.response.data);
  }
};
