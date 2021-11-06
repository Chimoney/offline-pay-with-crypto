import React, { useState } from "react";
import "./modal.css";
import QRCode from "react-qr-code";
import Select from "react-select";

function Modal() {
  const [state, setState] = useState("address");


  const options = [
    {
      value: "Celo Dollar (cUSD)",
      label: <span className="label"><img src="https://res.cloudinary.com/doouwbecx/image/upload/v1635965533/7236_1_vsttxa.png" alt="" /> Celo Dollar (cUSD)</span>
    },
    {
      value: "Ethereum",
      label:   <span className="label"><img src="https://res.cloudinary.com/doouwbecx/image/upload/v1635964474/Cryptocurrency_r8kedk.png" alt="" /> Ethereum</span>,

    },
    {
      value: "Dodge",
      label:  <span className="label"><img src="https://res.cloudinary.com/doouwbecx/image/upload/v1635965533/Cryptocurrency2_fniyvz.png" alt="" /> Dodge</span>,
    },
    {
      value: "Stellar",
      label:  <span className="label"><img src="https://res.cloudinary.com/doouwbecx/image/upload/v1635965533/Cryptocurrency4_dfew2o.png" alt="" /> Stellar</span>,
    },
  ];


  return (
    <div className="modal-container">
      <div className="modal-header-component">
        <div className="modal-side-header">
          <img
            className="modal-logo"
            src="https://res.cloudinary.com/doouwbecx/image/upload/v1635508572/image_28_mryzcs.png"
            alt=""
          />
          <div>
            <h3>Chimoney Store</h3>
            <p>Order Details: Airtime </p>
          </div>
        </div>

        <div className="modal-left-header">
          <h3>TOTAL</h3>
          <p>USD 3500.00</p>
        </div>
      </div>

      <div className="select-component">
        <h2>Select crypto to pay with</h2>
        <Select options={options} className="select-box" />
        <br />

        <p>To Pay</p>
        <div className="span-div">
          <span className="span-income">0.00019 cUSD</span>
          <span> = </span>
          <span className="span-response">USD 3500.00</span>
        </div>
      </div>
      <br />
      <div className="section-component">
        <div>
          <span
            className={state === "address" ? "active" : "inactive"}
            onClick={() => setState("address")}
          >
            Send to address
          </span>
          <span
            className={state === "agent" ? "active" : "inactive"}
            onClick={() => setState("agent")}
          >
            Pay through agent
          </span>
        </div>
      </div>
      {
          state === "address" ?
          (
            <div className="qr-container">
            <div className="qr-div">
              <QRCode value="Hello"size="100" className="qr-code" />
            </div>
            <div className="qr-text">
              <h1>Scan QR Code</h1>
              <p>
                Scan code to see request details from your mobile wallet for payment
                to receiving address below.
              </p>
              <div className="qr-url">
                  <span className="address">To address:</span>
                  <span className="code"> xcvb876567nbvccvbnm </span>
                  <img src="https://img.icons8.com/material-outlined/14/2138A8/copy.png" alt=""/>
              </div>
            </div>
          </div>
          )
          : 
          (
              <div className="agent-section">
                  <h1>Enter your e-mail  to receive payment details to give your agent</h1>
                  <div className="agent-section-div">
                      <label>Email</label>
                      <br/>
                      <input type="text" placeholder="example@gmail.com" />
                  </div>
                  <div className="agent-btn">
                      <button>Send</button>
                  </div>
              </div>
          )
      }
    </div>
  );
}

export default Modal;
