import React from "react";
import Container from "../../Components/Shared/Container";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

export default function SendParcelPage() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { documentType: "document" } });

  const handleSendParcel = (data) => {
    let price = 0;

    if (data.documentType === "document") {
      data.senderDistrict === data.receiverDistrict
        ? (price = 60)
        : (price = 80);
    } else {
      // non doc
      if (data.parcelWeight <= 3) {
        data.senderDistrict === data.receiverDistrict
          ? (price = 110)
          : (price = 150);
      } else {
        data.senderDistrict === data.receiverDistrict
          ? (price = 110 + (data.parcelWeight - 3) * 40)
          : (price = 150 + (data.parcelWeight - 3) * 40 + 40);
      }
    }

    data.price = price;

    Swal.fire({
      title: "Are you sure?",
      text: `You want to send parcel : ${data.parcelName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/parcels", data)
          .then((res) => {
            console.log("after saving parcel", res.data);
            if (res.data?.success || res.data?.acknowledged) {
              reset();
              Swal.fire({
                title: "Send!",
                text: "Your parcel has been submitted.",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Something went wrong.",
                text: "Your parcel has not been submitted.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Something went wrong.",
              text: "Your parcel has not been submitted.",
              icon: "error",
            });
          });
      }
    });
  };

  const allInfos = useLoaderData();

  const allregion = allInfos.map((regions) => regions.region);
  const singleRegions = [...new Set(allregion)];

  const isDocument = watch("documentType");
  const [senderRegionWatch, receiverRegionWatch] = watch([
    "senderRegion",
    "receiverRegion",
  ]);

  // Region wise district
  const districtFunc = (targetRegion) => {
    const districts = allInfos.filter((r) => r.region === targetRegion);
    const dist = districts.map((d) => d.district);
    return dist;
  };

  return (
    <Container className="pb-15">
      <div className="bg-white p-15 mt-10 rounded-2xl select-none">
        <h2 className="text-secondary  font-bold text-3xl  mb-5">
          Send A Parcel
        </h2>

        <div>
          <form onSubmit={handleSubmit(handleSendParcel)}>
            <h3 className="text-xl font-bold text-secondary">
              Enter your parcel details
            </h3>

            {/* document type */}
            <div className="space-x-5 my-4">
              <label className=" space-x-2">
                <input
                  type="radio"
                  name="documentType"
                  className="radio"
                  value="document"
                  // defaultChecked
                  {...register("documentType")}
                />
                <span> Document </span>
              </label>
              <label className=" space-x-2">
                <input
                  type="radio"
                  name="documentType"
                  className="radio"
                  value="non-document"
                  {...register("documentType")}
                />
                <span>Non Document </span>{" "}
              </label>
            </div>

            {/* document name */}
            <div className="flex items-center w-full gap-10 ">
              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend text-base">
                  Parcel Name
                </legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Parcel Name"
                  {...register("parcelName", {
                    required: true,
                    setValueAs: (value) => value?.trim().toLowerCase(),
                  })}
                />
                {errors.parcelName?.type === "required" && (
                  <p className="text-red-500 text-sm">
                    Parcel Name is required
                  </p>
                )}
              </fieldset>

              <fieldset className="fieldset w-full">
                <legend className="fieldset-legend text-base">
                  Parcel Weight(Kg)
                </legend>
                <input
                  disabled={isDocument === "document"}
                  type="number"
                  step="any"
                  className="input w-full"
                  placeholder="Parcel weight"
                  {...register("parcelWeight", {
                    disabled: isDocument === "document",
                    valueAsNumber: true,
                    required: "parcel weight is required.",
                    min: {
                      value: 0.0000001,
                      message: "Parcel weight must be greater than 0.",
                    },
                  })}
                />
                {errors.parcelWeight && (
                  <p className="text-red-500 text-sm">
                    {errors.parcelWeight.message}
                  </p>
                )}
              </fieldset>
            </div>

            {/* details container */}
            <div className="flex items-center justify-between gap-10 mt-10">
              {/* sender */}
              <div className="w-1/2">
                <h4 className="text-xl font-bold">Sender Details</h4>
                {/* sender Name */}
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend text-base">
                    Sender Name
                  </legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Sender Name"
                    {...register("senderName", {
                      required: "Sender Name required.",
                    })}
                  />

                  {errors.senderName && (
                    <p className="text-red-500">{errors.senderName.message}</p>
                  )}
                </fieldset>
                {/* sender email */}
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend text-base">
                    Sender Email
                  </legend>
                  <input
                    type="email"
                    className="input w-full"
                    placeholder="Sender Email"
                    value={user.email}
                    {...register("senderEmail")}
                  />
                </fieldset>
                {/* sender Region */}

                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend text-base">
                    Sender Region
                  </legend>
                  <select
                    defaultValue=""
                    className="select"
                    {...register("senderRegion", { required: true })}
                  >
                    <option value="" disabled={true}>
                      Pick a Region
                    </option>
                    {singleRegions.map((region, index) => (
                      <option key={index}>{region}</option>
                    ))}
                  </select>

                  {errors.senderRegion?.type === "required" && (
                    <p className="text-red-500">Sender Region is required.</p>
                  )}
                </fieldset>

                {/* sender district */}
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend text-base">
                    Sender District
                  </legend>
                  <select
                    defaultValue=""
                    className="select"
                    {...register("senderDistrict", {
                      required: "Sender district is required.",
                    })}
                  >
                    <option value="" disabled={true}>
                      Pick a District
                    </option>
                    {districtFunc(senderRegionWatch).map((district, index) => (
                      <option key={index}>{district}</option>
                    ))}
                  </select>

                  {errors.senderDistrict?.type === "required" && (
                    <p className="text-red-500">
                      {errors.senderDistrict.message}
                    </p>
                  )}
                </fieldset>

                {/* sender description */}
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend text-base">
                    Pickup Instruction
                  </legend>
                  <textarea
                    className="textarea w-full"
                    placeholder="Pickup Instruction"
                    {...register("senderDescription")}
                  ></textarea>
                </fieldset>
              </div>

              {/* receiver */}
              <div className="w-1/2">
                <h4 className="text-xl font-bold">Receiver Details</h4>
                {/* sender Name */}
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend text-base">
                    Receiver Name
                  </legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Receiver Name"
                    {...register("receiverName", {
                      required: "Receiver name is required.",
                      setValueAs: (value) => value.trim().toLowerCase(),
                    })}
                  />
                  {errors.receiverName && <p>{errors.receiverName.message}</p>}
                </fieldset>
                {/* receiver email */}
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend text-base">
                    Receiver Email
                  </legend>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Receiver Email"
                    {...register("receiverEmail", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />

                  {errors.receiverEmail && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.receiverEmail.message}
                    </p>
                  )}
                </fieldset>
                {/* Receiver Region */}

                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend text-base">
                    Receiver Region
                  </legend>
                  <select
                    defaultValue=""
                    className="select"
                    {...register("receiverRegion", {
                      required: "Receiver region is required. ",
                    })}
                  >
                    <option value="" disabled={true}>
                      Pick a Region
                    </option>
                    {singleRegions.map((region, index) => (
                      <option key={index}>{region}</option>
                    ))}
                  </select>

                  {errors.receiverRegion && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.receiverRegion.message}
                    </p>
                  )}
                </fieldset>

                {/* receiver district */}
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend text-base">
                    Receiver District
                  </legend>
                  <select
                    defaultValue=""
                    className="select"
                    {...register("receiverDistrict", {
                      required: "Receiver district is required.",
                    })}
                  >
                    <option value="" disabled={true}>
                      Pick a District
                    </option>

                    {districtFunc(receiverRegionWatch).map(
                      (district, index) => (
                        <option key={index}>{district}</option>
                      ),
                    )}
                  </select>

                  {errors.receiverDistrict && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.receiverDistrict.message}
                    </p>
                  )}
                </fieldset>

                {/* Receiver description */}
                <fieldset className="fieldset w-full">
                  <legend className="fieldset-legend text-base">
                    Receiver Instruction
                  </legend>
                  <textarea
                    className="textarea w-full"
                    placeholder="Pickup Instruction"
                    {...register("senderInstruction", {
                      setValueAs: (value) => value.trim().toLowerCase(),
                    })}
                  ></textarea>
                </fieldset>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-secondary text-lg mt-5 text-white hover:text-secondary hover:btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}
