import { useEffect, useState } from "react";
import "./App.css";
import heroImg from "./assets/hero.png";

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [formStatus, setFormStatus] = useState("");
  const [formStatusType, setFormStatusType] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".section");
      let currentSectionId = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          currentSectionId = section.id;
        }
      });

      setActiveSection(currentSectionId);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (event, sectionId) => {
    event.preventDefault();
    setActiveSection(sectionId);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nameInput = form.elements.name.value.trim();
    const emailInput = form.elements.email.value.trim();

    if (nameInput && emailInput) {
      setFormStatusType("success");
      setFormStatus(`Thank you, ${nameInput}! I will reach out soon.`);
      form.reset();

      window.setTimeout(() => {
        setFormStatus("");
        setFormStatusType("");
      }, 5000);
    } else {
      setFormStatusType("error");
      setFormStatus("Please fill out all required fields.");
    }
  };

  return (
    <>
      <header className="navbar-container">
        <nav className="navbar" aria-label="Main navigation">
          <a className="logo" href="#home">
            Xiane<span>.folio</span>
          </a>
          <ul className="nav-links">
            <li>
              <a
                href="#home"
                className={`nav-link ${activeSection === "home" ? "active" : ""}`}
                onClick={(event) => handleNavigation(event, "home")}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={`nav-link ${activeSection === "about" ? "active" : ""}`}
                onClick={(event) => handleNavigation(event, "about")}
              >
                Know Me
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
                onClick={(event) => handleNavigation(event, "contact")}
              >
                Want to Know More
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section id="home" className="section hero-section">
          <div className="hero-content">
            <span className="badge">Computer Engineer &amp; Builder</span>
            <h1>
              Hi, I&apos;m{" "}
              <span className="highlight">Xiane Heins Guevara</span>
            </h1>
            <p>
              A Computer Engineering student passionate about making a change. I
              believe there&apos;s no such thing as overnight success; it takes
              grit, determination, and hard work to achieve your goals.
            </p>
            <div className="hero-buttons">
              <a href="#about" className="btn btn-primary">
                Learn More
              </a>
              <a href="#contact" className="btn btn-secondary">
                Get in Touch
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="section about-section">
          <div className="container">
            <h2 className="section-title">About Me</h2>
            <div className="about-grid">
              <div className="about-image">
                <img
                  src={heroImg}
                  alt="Abstract computer engineering illustration"
                />
              </div>
              <div className="about-text">
                <p>
                  A capable builder who understands systems deeply, creates
                  things that genuinely help people, manages money wisely,
                  protects his health, cultivates deep relationships, maintains
                  strong boundaries, keeps learning, and contributes to the
                  people and communities that matter to him without losing
                  himself in the process.
                </p>
                <h3>Technical Skills</h3>
                <div className="skills-tags">
                  {[
                    "PCB Designing",
                    "Network Configuration",
                    "Firebase",
                    "ESP32 & Arduino",
                    "Logic Circuits",
                    "Git & Version Control",
                  ].map((skill) => (
                    <span className="tag" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container">
            <h2 className="section-title">Contact Me</h2>
            <p className="section-subtitle">
              Got something in mind? Let&apos;s talk
            </p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Full Name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Your message here..."
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-submit">
                Send Message
              </button>
              <div
                className={`form-status ${formStatusType}`}
                role="status"
                aria-live="polite"
              >
                {formStatus}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Xiane Heins Guevara. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
