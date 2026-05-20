import React from "react";

import DeliveryMan from "../../../assets/tiny-deliveryman.png";
import BigDeliveryMan from "../../../assets/big-deliveryman.png";
import PrimaryButton from "../../Shared/Button/PrimaryButton";

export default function Banner() {
  return (
    <div className="flex  justify-start gap-10 w-full bg-white rounded-2xl p-10 mt-16">
      {/* left */}

      <div className="w-1/2 flex flex-col  justify-start items-start space-y-8">
        <img
          className="w-75! h-25 object-contain"
          src={DeliveryMan}
          alt="image"
        />
        <h2 className="font-bold text-5xl text-left">
          We Make Sure Your{" "}
          <span className="text-[#33929D]">Parcel Arrives</span> On Time – No
          Fuss.
        </h2>
        <p className="text-left">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div>
          <PrimaryButton className="bg-primary">
            Track Your Parcel
          </PrimaryButton>
        </div>
      </div>
      {/* right */}
      <div className="w-1/2">
        <img
          className="w-full h-100 object-contain"
          src={BigDeliveryMan}
          alt="image"
        />
      </div>
    </div>
  );
}
