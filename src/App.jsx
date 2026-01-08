import { useState, useEffect } from "react";
import erpScreen from "./assets/erp.png";
import castletownScreen from "./assets/castle town.webp";
import formulaireScreen from "./assets/formulaire.png";
import gestionVehiculeScreen from "./assets/gestion_vehicule.png";
import portfolioScreen from "./assets/portfolio_screen.png";
import zooScreen from "./assets/zoo.png";
import "./App.css";

function Veille({ feedUrl, maxItems = 6 }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function to decode HTML entities and strip HTML tags
  const decodeHTMLEntities = (text) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  };

  // Helper function to clean HTML content (remove tags and decode entities)
  const cleanHTML = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return decodeHTMLEntities(div.textContent || div.innerText || "");
  };

  useEffect(() => {
    if (!feedUrl) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    const proxyUrl =
      "https://api.allorigins.win/get?url=" + encodeURIComponent(feedUrl);
    fetch(proxyUrl)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, "application/xml");
        const items = Array.from(doc.querySelectorAll("item, entry")).slice(
          0,
          maxItems
        );
        const parsed = items.map((it) => {
          const titleRaw =
            it.querySelector("title")?.textContent || "(sans titre)";
          const title = cleanHTML(titleRaw);
          const link =
            it.querySelector("link")?.textContent ||
            it.querySelector("link")?.getAttribute("href") ||
            "#";
          const pubDateRaw =
            it.querySelector("pubDate")?.textContent ||
            it.querySelector("updated")?.textContent ||
            "";
          const pubDate = cleanHTML(pubDateRaw);
          return { title, link, pubDate };
        });
        setArticles(parsed);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || "Erreur lors du chargement du flux");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => (cancelled = true);
  }, [feedUrl, maxItems]);

  return (
    <section id="veille" className="py-20 px-6 md:px-20 bg-purple-50">
      <h3 className="text-3xl font-bold text-purple-700 mb-4 text-center">
        Veille technologique 🔎
      </h3>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        {!feedUrl ? (
          <p className="text-sm text-gray-600">Aucun lien de flux configuré.</p>
        ) : loading ? (
          <p className="text-sm text-gray-600">Chargement des articles...</p>
        ) : error ? (
          <p className="text-sm text-red-500">Erreur: {error}</p>
        ) : articles.length === 0 ? (
          <p className="text-sm text-gray-600">Aucun article trouvé.</p>
        ) : (
          <ul className="space-y-3">
            {articles.map((a, i) => (
              <li key={i} className="text-left">
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-purple-700 hover:text-pink-500"
                >
                  {a.title}
                </a>
                {a.pubDate && (
                  <div className="text-xs text-gray-500">{a.pubDate}</div>
                )}
              </li>
            ))}
          </ul>
        )}
        {feedUrl && (
          <div className="mt-4 text-sm">
            <a
              href={feedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:underline"
            >
              Ouvrir le flux Google Alerts
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

// Modal Component
function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header avec bouton de fermeture */}
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition z-10"
          >
            ✕
          </button>
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-64 object-cover"
          />
        </div>

        {/* Contenu */}
        <div className="p-6">
          <h2 className="text-3xl font-bold text-purple-700 mb-2">
            {project.name}
          </h2>
          <p className="text-sm text-gray-500 mb-4">Année : {project.date}</p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-purple-600 mb-2">
                Description
              </h3>
              <p className="text-gray-700">{project.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-600 mb-2">
                Détails
              </h3>
              <p className="text-gray-700">{project.details}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-600 mb-2">
                Technologies utilisées
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full bg-purple-600 text-white font-bold py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Remplacez cette URL par votre lien Google Alerts (RSS/Atom)
  const GOOGLE_ALERTS_FEED =
    "https://www.google.com/alerts/feeds/08534805619220300136/15343554374847867394"; // ex: "https://www.google.com/alerts/feeds/...."
  const projects = [
    {
      name: "ZOO",
      image: zooScreen,
      description:
        "Une application de gestion de zoo avec interface intuitive.",
      details:
        "Développé en HTML/CSS/JavaScript avec une base de données MySQL.",
      technologies: ["HTML", "CSS", "JavaScript", "MySQL"],
      date: "2024",
    },
    {
      name: "Gestion Vehicules",
      image: gestionVehiculeScreen,
      description: "Système de gestion de flotte automobile.",
      details: "Application développée en PHP avec une architecture MVC.",
      technologies: ["PHP", "MySQL", "HTML/CSS"],
      date: "2024",
    },
    {
      name: "ERP",
      image: erpScreen,
      description: "Logiciel de planification des ressources d'entreprise.",
      details: "ERP complet pour la gestion administrative d'une entreprise.",
      technologies: ["PHP", "MySQL", "JavaScript"],
      date: "2023",
    },
    {
      name: "CastleTown Web",
      image: castletownScreen,
      description: "Site web pour le projet CastleTown.",
      details: "Développé avec un design responsive et moderne.",
      technologies: ["HTML", "CSS", "JavaScript"],
      date: "2023",
    },
    {
      name: "Projet Formulaire",
      image: formulaireScreen,
      description: "Formulaire interactif avec validation côté client.",
      details: "Validation en temps réel avec UX optimisée.",
      technologies: ["HTML", "CSS", "JavaScript"],
      date: "2023",
    },
    {
      name: "Ce portfolio",
      image: portfolioScreen,
      description: "Mon portfolio personnel showcasing mes projets.",
      details: "Développé avec React et Tailwind CSS pour un design moderne.",
      technologies: ["React", "Tailwind CSS", "Vite"],
      date: "2025",
    },
  ];
  return (
    <div className="font-sans bg-gradient-to-br from-pink-50 via-purple-100 to-white text-purple-900">
      {/* HEADER */}
      <header className="fixed w-full z-50 backdrop-blur-md bg-white/70 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between py-4 px-6">
          <h1 className="text-2xl font-bold text-purple-700 drop-shadow-md">
            Hamza Ouriemchi
          </h1>
          <nav className="space-x-6 font-medium">
            <a href="#accueil" className="hover:text-pink-500 transition">
              Accueil
            </a>
            <a href="#parcours" className="hover:text-pink-500 transition">
              Parcours
            </a>
            <a href="#competences" className="hover:text-pink-500 transition">
              Compétences
            </a>
            <a href="#projets" className="hover:text-pink-500 transition">
              Projets
            </a>
            <a href="#contact" className="hover:text-pink-500 transition">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section
        id="accueil"
        className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-pink-200 via-purple-200 to-pink-100"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
          Bonjour 👋, je m'appelle
        </h1>
        <h2 className="text-6xl md:text-7xl font-extrabold mb-4 drop-shadow-lg text-purple-700">
          Hamza Ouriemchi
        </h2>
        <p className="text-xl md:text-2xl mb-8">
          et je suis apprenti développeur web
        </p>
        <a
          href="#presentation"
          className="bg-purple-600 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-purple-500 transition"
        >
          👇 Me découvrir !
        </a>
      </section>

      {/* PRÉSENTATION */}
      <section
        id="presentation"
        className="py-20 px-6 md:px-20 bg-white/80 backdrop-blur-md"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/*<div className="md:w-1/2 flex justify-center">
            <div className="w-60 h-60 bg-purple-200 rounded-full flex items-center justify-center shadow-lg text-purple-700 font-bold text-xl">
              Avatar
            </div>
          </div>*/}
          <div className="md:w-1/2 space-y-4">
            <h3 className="text-3xl font-bold text-purple-700">
              Présentation 👨🏻‍💻
            </h3>
            <p>
              J'ai découvert le développement web en autodidacte vers 2019, en
              réalisant de petits projets en HTML, CSS et JavaScript.
            </p>
            <p>
              Le BTS SIO m'a permis de structurer mes apprentissages et
              améliorer mon organisation.
            </p>
            <p>
              Curieux et créatif, je nourris ma passion pour l’informatique en
              testant de nouveaux outils et frameworks.
            </p>
            <a
              href="https://www.canva.com/design/DAGztOt6zh0/OjnwMPlu3L4SgBXud8g7fA/view?utm_content=DAGztOt6zh0&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h2eb4465e92"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-purple-600 font-bold hover:underline"
            >
              👉 Consulter mon CV
            </a>
          </div>
        </div>
      </section>

      {/* PARCOURS */}
      <section
        id="parcours"
        className="py-20 px-6 md:px-20 bg-purple-100/70 backdrop-blur-md"
      >
        <h3 className="text-3xl font-bold text-purple-700 mb-12 text-center">
          Mon parcours 🎯
        </h3>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Expériences */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h4 className="text-2xl font-semibold mb-4 text-pink-600">
              Expériences
            </h4>
            <ul className="space-y-2">
              <li>Novembre 2025 : Stage KS Group</li>
              <li>Juin 2025 : Stage VectorSystem</li>
              <li>Novembre 2019 : Stage BNP Arval</li>
            </ul>
          </div>
          {/* Formations */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
            <h4 className="text-2xl font-semibold mb-4 text-pink-600">
              Mes formations
            </h4>
            <ul className="space-y-2">
              <li>2024 - 2026 : BTS SIO SLAM</li>
              <li>2023 - 2024 : Game design & Programming</li>
              <li>
                2020 - 2023 : BAC Général Spécialités Mathématiques, Numérique
                science informatique
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* COMPÉTENCES */}
      <section id="competences" className="py-20 px-6 md:px-20 bg-white/80">
        <h3 className="text-3xl font-bold text-purple-700 mb-8 text-center">
          Mes compétences techniques 💻
        </h3>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            "HTML/CSS",
            "JavaScript",
            "C#",
            "PHP",
            "Python",
            "Git(lab/GitHub)",
            "MySQL",
            "Node.js",
            "Bootstrap",
            "React",
            "Ui/Ux",
            "VSCode",
            "Design responsive",
            "Graphic design",
          ].map((skill, i) => (
            <span
              key={i}
              className="block bg-purple-100 text-purple-800 font-semibold px-4 py-2 rounded-full text-center hover:bg-purple-200 transition"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* VEILLE TECHNOLOGIQUE */}
      <Veille feedUrl={GOOGLE_ALERTS_FEED} />

      {/* PROJETS */}
      <section id="projets" className="py-20 px-6 md:px-20 bg-purple-50">
        <h3 className="text-3xl font-bold text-purple-700 mb-8 text-center">
          Mes projets 📂
        </h3>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <div
              key={i}
              onClick={() => setSelectedProject(proj)}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition flex flex-col items-center justify-center text-center cursor-pointer"
            >
              <div className="w-full overflow-hidden rounded-md mb-4">
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-40 object-cover transform transition-transform duration-300 hover:scale-110"
                />
              </div>
              <h4 className="font-bold text-lg text-purple-800">{proj.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL PROJETS */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* CONTACT / FOOTER */}
      <footer
        id="contact"
        className="py-12 px-6 md:px-20 bg-white/90 text-center text-purple-700 backdrop-blur-md"
      >
        <h4 className="text-xl font-bold mb-4 text-purple-800">
          Me contacter :
        </h4>
        <div className="space-x-4 mb-4">
          <a
            href="https://github.com/DaisukeHyodo"
            className="hover:text-pink-500 transition"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/hamza-ouriemchi-4a9a42327"
            className="hover:text-pink-500 transition"
          >
            LinkedIn
          </a>
        </div>
        <p className="text-sm">
          © Hamza Ouriemchi - 2025, tous droits réservés
        </p>
      </footer>
    </div>
  );
}
