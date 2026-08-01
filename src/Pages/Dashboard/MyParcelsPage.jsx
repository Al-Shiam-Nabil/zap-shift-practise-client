import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/Shared/Loading/LoadingSpinner";
import { Search, SquarePen, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { Link } from "react-router";

export default function MyParcelsPage() {
  const secureAxios = useAxiosSecure();

  const {
    data: allParcels = [],
    isPending,
    isError,
    error,
    refetch,
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

  const handleRemove = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await secureAxios.delete(`/parcels/${id}`);

        if (res.data.result.deletedCount) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else {
          toast.error("Please try again later.");
        }
      }
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>#</th>
            <th>Parcel Name</th>
            <th>Cost</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {allParcels.data.map((parcel, index) => (
            <tr key={parcel._id}>
              <th>{index + 1}</th>
              <td className="capitalize">{parcel.parcelName}</td>
              <td>{parcel.price}</td>
              <td>
                {parcel.paymentStatus === "paid" ? (
                  <span>Paid</span>
                ) : (
                  <Link to={`/dashboard/payment/${parcel._id}`}>
                    <button className="btn btn-primary btn-sm text-black">
                      Pay
                    </button>
                  </Link>
                )}
              </td>
              <td className="flex items-center gap-3">
                <button className="btn btn-sm">
                  <Search size={20} />
                </button>
                <button className="btn btn-sm">
                  <SquarePen size={20} />
                </button>
                <button
                  onClick={() => handleRemove(parcel._id)}
                  className="btn btn-sm"
                >
                  <Trash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
