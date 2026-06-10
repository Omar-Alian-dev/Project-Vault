import React, { useState } from "react";
import { Navigation } from "./components/layout/Navigation";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./components/pages/HomePage";
import { AppPage } from "./components/pages/AppPage";
import { DocsPage } from "./components/pages/DocsPage";
import { AboutPage } from "./components/pages/AboutPage";
import { useNotification } from "./hooks/useNotification";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { notification, showNotification } = useNotification();

  return (
    <div className="min-h-screen bg-slate-900">
      <Navigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === "app" && (
        <AppPage
          notification={notification}
          showNotification={showNotification}
        />
      )}
      {currentPage === "docs" && <DocsPage />}
      {currentPage === "about" && <AboutPage setCurrentPage={setCurrentPage} />}

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default App;
