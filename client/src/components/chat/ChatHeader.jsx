import React from "react";
import Rectangle from "../../images/Rectangle.png";

export default function ChatHeader() {
  return (
    <div className="mx-4 d-flex">
      <div className="d-flex align-items-center ">
        <div
          className="rounded-circle bg-danger overflow-hidden border border-dark border-3"
          style={{ height: "50px", width: "50px" }}
        >
          <img src={Rectangle} alt="" className="w-100 h-100" />
        </div>
        <div className="ms-3 lh-sm">
          <p className="m-0 fw-bold">Admin</p>
          <div className="d-flex align-items-center">
            <div
              className="bg-success rounded-circle me-2"
              style={{ width: "8px", height: "8px" }}
            ></div>
            <div>
              <p className="m-0">online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
