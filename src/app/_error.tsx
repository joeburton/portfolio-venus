import React from "react";

interface ErrorProps {
  statusCode: number;
}

const Error = ({ statusCode }: ErrorProps) => {
  return (
    <div>
      <h1>{statusCode}</h1>
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
    </div>
  );
};

export default Error;
