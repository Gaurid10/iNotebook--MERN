/*import React, { useContext, useEffect } from 'react'*/
import './About.css';

const About = () => {


  return (
    <div className="about-container">

      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              Secure User Authentication
            </button>
          </h2>
          <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body">iNoteBook ensures that your notes are securely stored and accessible only by you. Our authentication mechanism prevents unauthorized access and protects your data.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
              Real-Time Updates
            </button>
          </h2>
          <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body"> iNoteBook offers real-time updates, ensuring that your notes are always in sync across all your devices. Experience instant changes without the need for manual refreshing.</div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
              Easy Note Management
            </button>
          </h2>
          <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div className="accordion-body"> Create, edit, and delete notes effortlessly. Our intuitive interface allows you to organize your notes with ease, making sure you can find what you need when you need it</div>

          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
              Cross-Platform Compatibility:
              </button>
            </h2>
            <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
              <div className="accordion-body"> Access your notes from any device. inotebook is designed to be fully responsive, providing a consistent and optimized experience on desktops, tablets, and smartphones.</div>
            </div>
            </div>
          </div>
        </div>

      </div>
      )
}
      export default About
