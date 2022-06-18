import React from "react";

const imgURL =
  "https://education-team-2020.s3.eu-west-1.amazonaws.com/web-dev/m3/react-routing/404.gif";

export default function ErrorPage() {
  return (
    <div className="errorPage">
      <h1>404</h1>
      <h3>Sorry we're busy getting shredded</h3>
      {/* <img src={imgURL} alt="404 error gif" /> */}
      <img
        src="https://media.istockphoto.com/photos/cat-exercising-on-bench-press-picture-id1207832240?k=20&m=1207832240&s=612x612&w=0&h=PmkB7TGeBfHvBvljPmDozS4X0zP5P2pRiwKOX6vqTLg="
        alt="Cat Exercising"
      />
    </div>
  );
}
