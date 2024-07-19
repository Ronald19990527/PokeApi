import { CellsPage } from '@cells/cells-page';
import { html, css } from 'lit-element';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@bbva-web-components/bbva-web-link/bbva-web-link.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default';
import '@cells-demo/demo-app-container/demo-app-container.js';

class AboutPage extends CellsPage {

  static get is() {
    return 'about-page';
  }

  static get properties() {
    return {
      fullName: { type: String },
      age: { type: Number },
      city: { type: String },
      company: { type: String}
    };
  }

  static get styles() {
    return css`
      :host {
        text-align: center;
        margin-top: 1rem;
        font-family: sans-serif;
      }

      h1 {
        background-color: #ff5;
        margin: 0;
        text-align: center;
        font-style: italic;
      }

      p {
        font-style: italic;
      }

      bbva-button-default {
        display: block;
      }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <demo-app-template data-cells-type="template">
        <div slot="app-main-content">
            <h1>ABOUT ING RONALD HERNANDEZ</h1>
            <img src="https://avatars.githubusercontent.com/u/154629922?v=4" alt="Ronald"></img>
            <p>
              -Recently graduated Electronic Engineer, Academic Tutor, Web Development, searching opportunities in the design of web interfaces with user experience and business logic in databases.

              -As an engineer, during my time as a student, I developed a series of projects related to audio and transistorized amplifiers, and PIC microcontrollers, in the latter I acquired knowledge in the C programming language.

              -As an academic tutor, I guided students in the development of projects in the Electronics III subject for 3 consecutive semesters as well as in the theoretical field.

              -Currently as a web developer I have knowledge of HTML5 (Hypertext Markup Language), CSS3 (Cascading Style Sheets), JavaScript Programming Language, Bootstrap and React JS in Fronted technologies. I also have backend knowledge in PHP, Java and the Springboot framework.

              -I like teamwork, contributing with the knowledge acquired until then and learning a little more in the process.<br>

              <a href="https://ronald19990527.github.io/Portafolio-Type-Curriculum">Visit to my CV</a><br>
              <a href="https://github.com/Ronald19990527">Visit to my github</a><br>
              <a href="https://www.linkedin.com/in/ing-ronald/">Visit to my Linkedin</a>
            </p>
            <bbva-button-default active=""  @click=${this.gotoGoal}>
                Back To Home
            </bbva-button-default>
        </div>
      </demo-app-template>`;
  }

  gotoGoal() {
    this.navigate('home');
  }

}
window.customElements.define(AboutPage.is, AboutPage);
