import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/Shared/Loading/LoadingSpinner";

export default function PaymentPage() {
  const { parcelId } = useParams();
  const secureAxios = useAxiosSecure();

  const { data: parcel, isPending } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const data = await secureAxios.get(`/parcels/${parcelId}`);
      return data.data?.data;
    },
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  const handleCheckout = async () => {
    try {
      const res = await secureAxios.post(`/create-checkout-session`, parcel);

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>
        please pay {parcel.price} TK for {parcel.parcelName}
      </p>
      <button onClick={handleCheckout} className="btn btn-primary text-black">
        Pay
      </button>
    </div>
  );
}
