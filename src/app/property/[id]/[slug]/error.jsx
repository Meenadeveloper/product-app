"use client";

export default function Error({ error, reset }) {
  return (
    <div className="text-center py-5">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()} className="btn btn-primary mt-3">
        Try Again
      </button>
    </div>
  );
}