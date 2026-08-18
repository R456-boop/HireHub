
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white">

      {/* ================= NAVBAR ================= */}

      <Navbar />

      {/* ================= MAIN CONTENT ================= */}

      <main>
        {children}
      </main>

      {/* ================= FOOTER ================= */}

      <footer>
      </footer>

    </div>
  );
}

export default Layout;