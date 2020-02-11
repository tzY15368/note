import {Icon} from "antd";
import React from "react";

const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);
export default IconText