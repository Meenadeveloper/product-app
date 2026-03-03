export default function Loading() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="skeleton-box" style={{ height: 300 }}></div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="skeleton-box" style={{ height: 300 }}></div>
        </div>
      </div>

      <div className="skeleton-box mb-3" style={{ height: 40 }}></div>
      <div className="skeleton-box mb-3" style={{ height: 20 }}></div>
      <div className="skeleton-box mb-3" style={{ height: 20 }}></div>
    </div>
  );
}