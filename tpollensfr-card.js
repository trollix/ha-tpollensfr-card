// tpollensfr-card.js avec couleurs officielles des niveaux 0 à 6
const LitElement = Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

const CARD_VERSION = '0.5.5';

console.info(
  `%c  TPOLLENSFR-CARD  %c  Version ${CARD_VERSION}  `,
  'color: white; font-weight: bold; background: crimson',
  'color: #000; font-weight: bold; background: #ddd'
);

class TPollensFRCard extends LitElement {
  static get properties() {
    return {
      config: {},
      hass: {},
    };
  }

  setConfig(config) {
    const defaultConfig = {
      no_pollens_label: 'Aucun pollen significatif',
      sensor_name: 'pollens_fr_pessac',
      above_level: 1,
      title: 'Pollens',
      icon: 'mdi:leaf'
    };
    this.config = { ...defaultConfig, ...config };
  }

  _getPollens(hass, sensor_name, above_level) {
    const pollens = [];
    const sensor = hass.states[`sensor.${sensor_name}`];
    if (!sensor) return pollens;

    const today = sensor.attributes?.today?.pollens || {};
    Object.entries(today).forEach(([name, level]) => {
      const lvl = parseInt(level, 10);
      if (lvl >= above_level) {
        pollens.push({ name, level: lvl });
      }
    });

    pollens.sort((a, b) => b.level - a.level); // Tri décroissant
    return pollens;
  }

  render() {
    if (!this.config || !this.hass) return html``;

    const pollens = this._getPollens(this.hass, this.config.sensor_name, this.config.above_level);

    return html`
      <ha-card header="${this.config.title}">
        <div id="tixpollenfr">
          ${pollens.length > 0
            ? html`<div class="ok-pollen">
                ${pollens.map(p => html`
                  <div class="pollen-entry">
                    <ha-icon icon="${this.config.icon}" class="levelicon level${p.level}"></ha-icon>
                    <span class="pollen-name">${p.name}</span>
                  </div>
                `)}
              </div>`
            : html`<div class="no-pollen">${this.config.no_pollens_label}</div>`
          }
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 1;
  }

  static get styles() {
    return css`
      #tixpollenfr {
        padding: 1em;
      }
      .ok-pollen {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 0.6em;
      }
      .pollen-entry {
        display: flex;
        align-items: center;
        gap: 0.5em;
        font-size: 1em;
      }
      .levelicon {
        --mdc-icon-size: 24px;
        color: gray;
      }
      .level0 { color: #DDDDDD; }
      .level1 { color: #50F0E6; }
      .level2 { color: #50CCAA; }
      .level3 { color: #F0E641; }
      .level4 { color: #FF5050; }
      .level5 { color: #960032; }
      .level6 { color: #7D2181; }

      .no-pollen {
        text-align: center;
        color: var(--secondary-text-color);
        font-style: italic;
      }
    `;
  }
}

customElements.define('tpollensfr-card', TPollensFRCard);

(window).customCards = (window).customCards || [];
(window).customCards.push({
  type: 'tpollensfr-card',
  name: 'France Pollens card',
  preview: true,
  description: "Affiche les pollens présents dans votre région selon l’API Atmo France."
});
