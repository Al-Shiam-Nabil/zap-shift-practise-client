import React from "react";
import { Link } from "react-router";

export default function CancelPaymentPage() {
  return (
    <div>
      <p>Something went wrong.please try again later.</p>

      <Link to="/dashboard/my-parcels">
        {" "}
        <button className="btn btn-primary text-black">Try Again</button>
      </Link>
    </div>
  );
}
