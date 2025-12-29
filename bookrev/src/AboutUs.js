import React from "react";
import "./AboutUs.css";

// Import creator images
import creator1 from "./Images/1.png";
import creator2 from "./Images/2.png";
import creator3 from "./Images/3.png";

export default function AboutUs() {
  return (
    <div className="about-container">
      <h1>About Us</h1>

      {/* Creators section */}
      <div className="creators">
        <div className="creator-card">
          <img src={creator1} alt="Layan Ewies" />
          <h3>Layan Ewies</h3>
          <p>STD No: 2336703</p>
        </div>

        <div className="creator-card">
          <img src={creator2} alt="Jinan Abu Lawi" />
          <h3>Jinan Abu Lawi</h3>
          <p>STD No: 2332889</p>
        </div>

        <div className="creator-card">
          <img src={creator3} alt="Batool Abdalla" />
          <h3>Batool Abdalla</h3>
          <p>STD No: 2332235</p>
        </div>
      </div>

      {/* Project Overview Section */}
      <div className="project-overview">
        <h2>Project Overview</h2>
        <p>
          Our project is an interactive online library called <strong>BookNook</strong>. 
          Through this project, we learned to work with <strong>HTML, CSS, and JavaScript</strong> along with 
          <strong>React</strong> for building interactive UIs. We gained hands-on experience in 
          creating components, handling state, using <strong>React Router</strong> for navigation, and 
          managing data with <strong>localStorage</strong>.
        </p>
        <h3>Challenges</h3>
        <p>
          Some challenges we faced included making the pages responsive for mobile devices, 
          properly routing users between login, registration, and home pages, and ensuring 
          smooth functionality for search, filter, and sort features. Despite these challenges, 
          we learned a lot about problem-solving and debugging in React.
        </p>
        <h3>Teamwork and GitHub</h3>
        <p>
          Working together as a team taught us collaboration skills. We managed our project 
          through GitHub, learned how to push, pull, and resolve merge conflicts, and coordinated 
          effectively to build different components of the project.
        </p>
      </div>
    </div>
  );
}
