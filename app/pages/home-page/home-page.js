import { CellsPage } from '@cells/cells-page';
import { html, css } from 'lit-element';
import '@cells-demo/demo-app-template/demo-app-template.js';
import '@bbva-web-components/bbva-web-link/bbva-web-link.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default.js';

class HomePage extends CellsPage {
  static get is() {
    return 'home-page';
  }
  static get properties() {
    return {
      title: { type: String },
      pokemonList: { type: Array },
    };
  }

  static get styles() {
    return css`
      h1 {
        background-color: #ff5;
        margin: 0;
        text-align: center;
      }

      bbva-web-link {
        background-color: #00f;
        color: #fff;
        padding: 1rem;
        display: block;
      }

      bbva-button-default {
        border-radius: 0 0 1rem 1rem;
        width: 100%
      }

      .container {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        background-color: #0fb;
        text-align: center;
     }

      .pokemon-container {
        font-family: sans-serif;
        font-style: italic;
        margin: 1rem;
        background-color: #5f7;
        border-radius: 1rem;
        flex-basis: 22%;
     }

     .pokemon-container * {
        margin-top: 1rem;
     }

    @media (max-width: 1067px) {
      .pokemon-container {
          flex-basis: 29%;
      }
    }

    @media (max-width: 785px) {
      .pokemon-container {
          flex-basis: 45%;
      }
    }

    @media (max-width: 686px) {
      .pokemon-container {
          flex-basis: 94%;
      }
    }
    `;
  }

  constructor() {
    super();
    this.title = 'POKEAPI - ING RONALD HERNANDEZ';
    this.pokemonList = [];
    this.fetchPokemonData();
  }

  async fetchPokemonData() {
    try {
      // Obtener todos los Pokémon (puedes ajustar el offset y limit si es necesario)
      const response = await fetch(
        'https://pokeapi.co/api/v2/pokemon?offset=0&limit=64'
      );
      const data = await response.json();

      // Obtener detalles de cada Pokémon
      const detailedData = await Promise.all(
        data.results.map((pokemon) =>
          fetch(pokemon.url).then((res) => res.json())
        )
      );

      // Filtrar los Pokémon base (sin evoluciones)
      const basePokemon = await Promise.all(
        detailedData.map(async(pokemon) => {
          const speciesResponse = await fetch(pokemon.species.url);
          const speciesData = await speciesResponse.json();
          return speciesData.evolves_from_species ? null : pokemon;
        })
      );

      // Filtrar los nulls de la lista final
      this.pokemonList = basePokemon.filter((pokemon) => pokemon !== null);
      console.log(this.pokemonList);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }


  render() {
    return html` <demo-app-template data-cells-type="template">
      <div slot="app-main-content">
      ${this._mainTpl}
      ${this._listPokemonTpl}
      </div>
    </demo-app-template>`;
  }

  get _mainTpl() {
    return html`
    <div>
      <h1>${this.title}</h1>
      <bbva-web-link @click=${this.gotoAbout}>About me</bbva-web-link>
    </div>
    `;
  }

  get _listPokemonTpl() {
    return html`
    <div class="container">
      ${this.pokemonList ? this.pokemonList.map(pokemon => html`
        <div class="pokemon-container">
          <bbva-web-card-product class="pokemon-card">
            <!-- Imagen del Pokémon -->
            <img class="pokemon-image" slot="media" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <!-- Nombre del Pokémon -->
            <div class="pokemon-name" slot="title">${pokemon.name}</div>
            <!-- Tipos del Pokémon -->
            <div class="pokemon-type" slot="details">
              ${pokemon.types.map(typeInfo => html`<span>${typeInfo.type.name}</span>`)}
            </div>
          </bbva-web-card-product>
          <bbva-button-default @click=${this.goToEvolution}class="evolutions-button" text="See Evolutions"></bbva-button-default>
        </div>
      `) : ''}
    </div>
    `;
  }

  goToHome() {
    this.navigate('home');
  }

  gotoAbout() {
    this.navigate('about');
  }

  goToEvolution() {
    this.navigate('evolution');
  }

}

window.customElements.define(HomePage.is, HomePage);
