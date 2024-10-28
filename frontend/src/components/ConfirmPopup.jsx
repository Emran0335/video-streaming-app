import { useState, useEffect, useImperativeHandle, useRef } from "react";

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
  return <div>ConfirmPopup</div>;
};

export default ConfirmPopup;
