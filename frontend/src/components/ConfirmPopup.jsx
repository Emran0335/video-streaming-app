import { useState, useEffect, useImperativeHandle, useRef } from "react";
import { useEffect, useImerativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import Button from "./Button";

const ConfirmPopup = (
  {
    title = "Are you sure",
    subTitle,
    message,
    confirm = "Confirm",
    cancel = "Cancel",
    critical = false,
    checkbox = false,
    actionFunction,
  },
  ref
) => {
  const dialog = useRef();
  const [isChecked, setIsChecked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      open() {
        setShowPopup(true);
      },
      close() {
        dialog.current?.close();
      },
    };
  });

  useEffect(() => {
    if (showPopup) {
      dialog.current.showModal();
    }
  }, [showPopup]);

  const handleClose = () => {
    dialog.current.close();
    setShowPopup(false);
    actionFunction(false);
  };

  const handleConfirm = (event) => {
    event.preventDefault();
    dialog.current.close();
    actionFunction(true);
  };

  return (
    <div>
      {showPopup &&
        createPortal(
          <dialog>
            <div>
              <div>
                <form>
                  <div>
                    <button>
                      <IoClose />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </dialog>
        )}
    </div>
  );
};

export default ConfirmPopup;
