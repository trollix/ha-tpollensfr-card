import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";


const CARD_VERSION = '0.3.x';

console.info(
  `%c  TIX-POLLENS-FR-CARD \n%c  Version ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray'
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
  
class TixPollensFRCard extends LitElement {
  
  static get properties() {
    return {
      config: {},
      hass: {},
    };
  }
  
  _getPollens(hass, sensor_name, above_level) {
    var res = [];

    if (typeof hass.states[`sensor.${sensor_name}`] != "undefined") {
      const data1 = hass.states[`sensor.${sensor_name}`].attributes['risks'];
      //console.log(data1);
      Object.keys(data1 || {}).forEach(function (key) {
        if ( parseInt(data1[key].level, 10) >= above_level ) {
          res.push({
            name: data1[key].pollenName,
            concentration: "level" + data1[key].level,
          });
        }
      });
    }
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
    //console.log('pollens fr')
    const pollens = this._getPollens(this.hass, this.config.sensor_name, this.config.above_level);
    return html`
      <ha-card header="${this.config.title}">
          <div id="attributes">
          ${pollens.length > 0
            ? html`<div class="pollen">${pollens.map(pollen => this.renderPollen(pollen))}</div>`
            : html`<div class="no-pollen">${this.config.no_pollens_label}</div>`
          }
          </div>
      </ha-card>
    `;
  }
  
  renderPollen(pollen) {
    return html
    `
      <div class="inpollen"><ha-icon icon="${this.config.icon}" class="${pollen.concentration} levelicon"></ha-icon>
      ${pollen.name}</div>
    `;
  }
  
  getCardSize() {
    return this.config.entities.length + 1;
  }
  
  static get styles() {
    return css`
    #attributes {
      margin-top: 0.4em;
      padding-bottom: 0.8em;
      display: flex;
    }
    .pollen {
      margin-left: 2em;
      margin-right: 2em;
      margin: auto;
      display: float;
      width: auto;
    }
    .inpollen {
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
  
customElements.define('tix-pollens-fr-card', TixPollensFRCard);
  
// Puts card into the UI card picker dialog
(window).customCards = (window).customCards || [];
(window).customCards.push({
  type: 'tix-pollens-fr-card',
  name: 'France Pollens card',
  preview: true,
  description: 'This Lovelace custom card displays pollen information provided by French networks of pollens.',
});
