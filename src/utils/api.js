import axios from 'axios';

// TODO: change url here
const objURL = {
  list: `localhost:8080/orders/list`,
  changeStatus: `localhost:8080/orders/status/update`,
  confirmPayment: `localhost:8080/orders/payment/confirm`,
}

export const getData = () =>
  new Promise((resolve, reject) => {
    axios.get(
      objURL.list,
    )
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
  });

export const updateStatus = (dataBody = {}) =>
  new Promise((resolve, reject) => {
    axios.get(
      objURL.changeStatus,
      dataBody,
    )
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
  });


export const postForm = (dataBody = {}) =>
  new Promise((resolve, reject) => {
    axios.post(
      objURL.confirmPayment,
      dataBody,
    )
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
  });
