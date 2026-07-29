import axios from "axios";
import React from "react";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

export default function useAxiosSecure() {
  return instance;
}
