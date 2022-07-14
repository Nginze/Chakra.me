import React from "react";

const ShareModal = ({ show, toggle }) => {
  return (
    show && (
      <>
        <div className="modal-background"></div>
        <div id="e-modal">
          <span
            onClick={() => {
              toggle(false);
            }}
            class="close"
          >
            &times;
          </span>
          <span>Unfortunately, this feature is still in development </span>
          <span>You can still share this Link:</span>
          <span>To introduce Chakra to your friends</span>
        </div>
      </>
    )
  );
};

export default ShareModal;
