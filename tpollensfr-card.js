const LitElement = Object.getPrototypeOf(customElements.get("ha-panel-lovelace"));
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

const CARD_VERSION = '0.5.0';

console.info(
  `%c  TPOLLENSFR-CARD  %c  Version ${CARD_VERSION}  `,
  'color: white; font-weight: bold; background: crimson',
  'color: #000; font-weight: bold; background: #ddd',
);

function hasConfigOrEntityChanged(element, changedProps) {
  if (changedProps.has("config")) {
    return true;
  }
  
  const oldHass = changedProps.get("hass");
  if (oldHass) {
    return (
      oldHass.states[element.config.entity] !==
        element.hass.states[element.config.entity]
    );
  }
  
  return true;
}
  
class TPollensFRCard extends LitElement {
  
  static get properties() {
    return {
      config: {},
      hass: {},
    };
  }
  
_getPollens(hass, sensor_name, above_level) {
  const res = [];
  const entity = hass.states[`sensor.${sensor_name}`];

  if (!entity) {
    console.warn("TPollensFR: sensor not found:", sensor_name);
    return res;
  }

  const today = entity.attributes?.today;
  if (!today) {
    console.warn("TPollensFR: no 'today' data in attributes");
    return res;
  }

  const pollens = today.pollens || {};
  console.log("TPollensFR: today.pollens =", pollens);

  Object.entries(pollens).forEach(([name, level]) => {
    if (parseInt(level, 10) >= above_level) {
      res.push({
        name: name,
        concentration: "level" + level,
      });
    }
  });

  console.log("TPollensFR: pollens selected =", res);
  return res;
}

  
  setConfig(config) {
    const defaultConfig = {
      'no_pollens_label': 'No pollens',
      'sensor_name': 'pollens2',
      'above_level': 1,
      'title': 'Pollens',
      'icon': 'mdi:square'
    }
  
    this.config = {
      ...defaultConfig,
      ...config
    };
  }
  
  render() {
    if (!this.config || !this.hass) {
      return html``;
    }
    console.log('tpollens_fr_pessac')
    const pollens = this._getPollens(this.hass, this.config.sensor_name, this.config.above_level);
    return html`
      <ha-card header="${this.config.title}">
          <div id="tixpollenfr">
          ${pollens.length > 0
            ? html`<div class="ok-pollen">${pollens.map(pollen => this.renderPollen(pollen))}</div>`
            : html`<div class="no-pollen">${this.config.no_pollens_label}</div>`
          }
          </div>
      </ha-card>
    `;
  }
  
  renderPollen(pollen) {
    return html
    `
      <div class="in-pollen"><ha-icon icon="${this.config.icon}" class="${pollen.concentration} levelicon"></ha-icon>
      ${pollen.name}</div>
    `;
  }
  
  getCardSize() {
    return this.config.entities.length + 1;
  }
  
  static get styles() {
    return css`
    #tixpollenfr {
      margin-top: 0.4em;
      padding-bottom: 0.8em;
      display: flex;
    }
    .ok-pollen {
      margin-left: 2em;
      margin-right: 2em;
      margin: auto;
      display: float;
      width: auto;
    }
    .in-pollen {
       margin: 0px 0px 0px 15px;
       padding: 1px 0px 0px 0px;
       float: left;
       position: relative;
       width: 125px;
    }
    .level0 {
      color: grey;
    }
    .level1 {
      color: green;
    }
    .level2 {
      color: orange;
    }
    .level3 {
      color: red;
    }
    .level4 {
      color: red;
    }
    .levelicon {
      --mdc-icon-size: 2em;
    }
    .no-pollens {
      margin-left: 1.4em;
    }
    `;
  }
}
  
customElements.define('tpollensfr-card', TPollensFRCard);
  
// Puts card into the UI card picker dialog
(window).customCards = (window).customCards || [];
(window).customCards.push({
  type: 'tpollensfr-card',
  name: 'France Pollens card',
  preview: true,
  description: 'This Lovelace custom card displays pollen information provided by French networks of pollens.',
});
