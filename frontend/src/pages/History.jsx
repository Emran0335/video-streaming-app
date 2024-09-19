import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserHistory } from "../hooks/getUserHistory.js";

function History() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (status) {
      getUserHistory(dispatch).then(() => {
        setLoading(false);
      });
    }
  }, [status]);
  return <div>History</div>;
}

export default History;
