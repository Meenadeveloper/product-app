import NotFound from "./not-found";

export default function Home() {
  // return <NotFound />;
  return (
    <div style={{ padding: "100px 20px", textAlign: "center" }}>
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        Welcome to Unicorn App
      </h1>

      <p>Discover your dream property with us.</p>

      <a
        href="/properties"
        style={{
          display: "inline-block",
          marginTop: "20px",
          padding: "10px 20px",
          background: "#0070f3",
          color: "#fff",
          borderRadius: "5px",
        }}
      >
        Browse Properties
      </a>
    </div>
  );
}
