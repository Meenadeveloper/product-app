export default function NotFound() {
  return (
    <div style={{ padding: "100px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        404
      </h1>

      <h2>Page Not Found</h2>

      <p>The property you are looking for does not exist.</p>

      <a
        href="/"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          background: "#0070f3",
          color: "#fff",
          borderRadius: "5px",
        }}
      >
        Go Back Home
      </a>
    </div>
  );
}