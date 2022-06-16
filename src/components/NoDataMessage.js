import React from "react";

export default function NoDataMessage({ parent, child }) {
  return (
    <i>
      This {parent} has no {child} yet. Add some!
    </i>
  );
}
