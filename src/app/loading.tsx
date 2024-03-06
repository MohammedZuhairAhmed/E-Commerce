export default function Loading() {
  return (
    <main
      className="d-flex justify-content-center align-items-center"
      style={{ height: '65vh' }}
    >
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </main>
  );
}
