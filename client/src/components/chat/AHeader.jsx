import React from "react";
import Rectangle from "../../images/Rectangle.png";

export default function AHeader() {
  return (
    <div className="container-fluid w-100  " style={{ background: "#DFDFDF" }}>
      <div>
        <div className="mx-4 d-flex py-3">
          <div className="d-flex align-items-center ">
            <div
              className="rounded-circle bg-danger overflow-hidden border border-dark border-3"
              style={{ height: "50px", width: "50px" }}
            >
              <img src={Rectangle} alt="" className="w-100 h-100" />
            </div>
            <div className="ms-3 lh-sm ">
              <p className="m-0 fw-bold">Sera</p>
            </div>
          </div>
        </div>
        <div className="border border-dark d-none d-lg-block "></div>
      </div>
    </div>
  );
}
