import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getBaseURL } from '../utils/getBaseURL';

const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get('session_id');
    if (sessionId) {
      const confimedPayment = async () => {
        const reponse = await axios.post(
          `${getBaseURL()}/api/orders/confirm-payment`,
          {
            session_id: sessionId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (reponse?.data) {
          setOrder(reponse?.data.data);
        }
      };
      confimedPayment();
    }
  }, []);
  console.log(order)
  return <div>PaymentSuccess</div>;
};

export default PaymentSuccess;
