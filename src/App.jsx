import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

export default function App() {
  const projects = [
    { name: "ZOO", image: reactLogo },
    { name: "Gestion Vehicules", image: viteLogo },
    { name: "ERP", image: reactLogo },
    { name: "CastleTown Web", image: viteLogo },
    { name: "Projet Formulaire", image: viteLogo },
    { name: "Ce portfolio", image: reactLogo },
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

      {/* PROJETS */}
      <section id="projets" className="py-20 px-6 md:px-20 bg-purple-50">
        <h3 className="text-3xl font-bold text-purple-700 mb-8 text-center">
          Mes projets 📂
        </h3>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition flex flex-col items-center justify-center text-center"
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

      {/* CONTACT / FOOTER */}
      <footer
        id="contact"
        className="py-12 px-6 md:px-20 bg-white/90 text-center text-purple-700 backdrop-blur-md"
      >
        <h4 className="text-xl font-bold mb-4 text-purple-800">Me contacter</h4>
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
