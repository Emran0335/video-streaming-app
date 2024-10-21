import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { icons } from "../../assets/Icons";
import formatDate from "../../utils/formatDate";
import axiosInstance from "../../utils/axios.helper.js";
import { MdOutlineEmail } from "react-icons/md";
import { IoGlobeOutline, IoEyeOutline } from "react-icons/io5";
import { BsPlayBtn } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { AiOutlineMessage } from "react-icons/ai";
import { GoInfo } from "react-icons/go";

function AboutChannel() {
  return <div>About Channel</div>;
}

export default AboutChannel;
