import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

export default function SuccessPaymentPage() {
  const [searchPrams] = useSearchParams();
  const secureAxios = useAxiosSecure();
  const [trackingId, setTrackingId] = useState(null);
  const [transactinId, setTransactionId] = useState(null);

  const sessionId = searchPrams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      secureAxios
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setTrackingId(res.data?.trackingId);
          setTransactionId(res.data?.transactionId);
        })
        .catch((error) => console.log(error.message));
    }
  }, [sessionId, secureAxios]);

  return (
    <div>
      <p>Payment successfull.</p>

      <p>Your tracking id :{trackingId}</p>
      <p>Your transaction id :{transactinId}</p>
    </div>
  );
}
