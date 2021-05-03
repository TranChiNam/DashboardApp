import axios from 'axios';


export const getData = ({ url, dataBody = '' }) =>
  new Promise((resolve, reject) => {
    axios.get(
      url,
      dataBody,
    )
      .then(res => {
        resolve(res);
      })
      .catch(err => reject(err));
  });

// export const postData = ({ url, dataBody = '' }) =>
//   new Promise((resolve, reject) => {
//     axios.post(
//       url,
//       dataBody,
//     )
//       .then(res => {
//         resolve(res);
//       })
//       .catch(err => reject(err));
//   });
