import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

export default function SuccessPaymentPage() {
  const [searchPrams] = useSearchParams();
  const secureAxios = useAxiosSecure();

  const sessionId = searchPrams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      secureAxios
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => console.log(res.data))
        .catch((error) => console.log(error.message));
    }
  }, [sessionId, secureAxios]);

  return <div>SuccessPaymentPage</div>;
}
