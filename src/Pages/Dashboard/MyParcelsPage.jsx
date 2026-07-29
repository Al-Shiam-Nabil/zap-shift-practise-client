import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/Shared/Loading/LoadingSpinner";

export default function MyParcelsPage() {
  const secureAxios = useAxiosSecure();

  const {
    data: allParcels = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["myParcels"],
    queryFn: async () => {
      const res = await secureAxios("/parcels");

      return res.data;
    },
  });

  if (isPending) {
    return <LoadingSpinner />;
  }

  console.log(allParcels.data);

  return <div>MyParcelsPage</div>;
}
