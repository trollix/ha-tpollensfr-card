# Pollens France (from RNSA)

![Tix pollens FR](https://img.shields.io/github/v/release/trollix/ha-tpollensfr-card)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg?style=flat)](https://github.com/custom-components/hacs)

Cette carte "Lovelace custom card" affiche les données fournies par le Réseau National de Surveillance Aérobiologique (R.N.S.A.) [RNSA France](https://www.pollens.fr/) .
Cette intégratuion est compatible HACS.

## Preview

![Pollen France Card](https://github.com/trollix/ha-tpollensfr-card/blob/main/img01.png?raw=true "Pollen France Card")

![Pollen France Card ](https://github.com/trollix/ha-tpollensfr-card/blob/main/img02.png?raw=true "Pollen France Card")

### Installation

The easiest way to install it is through [HACS (Home Assistant Community Store)](https://github.com/hacs/frontend),
search for *Pollen France* in the Frontend section and select "Pollens France (from RNSA)".
If you are not using HACS, you may download tpollensfr-card.js and put it into
homeassistant_config_dir/www/community/tix-pollens-france/ directory.

### Configuration dans Lovelace UI

Please add the card to the resources in configuration.yaml:

``` resources:
  - {type: module, url: '/hacsfiles/ha-tpollensfr-cartd/tpollensfr-card.js'}
```

### Options

#### Options de la carte

| Name             | Type         | Required     | Default         | Description                                        |
| ---------------- | ------------ | ------------ | --------------- | -------------------------------------------------- |
| type             | string       | **required** |                 | `custom:tpollensfr-card`                            |
| title            | string       | optional     | `Pollens`       | title                                              |
| sensor_name      | string       | optional     | `pollens2`      | HA sensor name                                     |
| minimum_level    | integer      | optional     | `1`             | Affiche les pollens de niveau sup. à minimum_level |

Les valeurs sont celles fournies  par le RNSA (source: [RNSA](https://www.pollens.fr/le-reseau/les-pollens/)):

| Description | Concentration       | Couleur    |
| ----------- | ------------------- | ---------- |
| nul         | 0                   | gris       |
| faible      | 1                   | vert       |
| moyen       | 2                   | orange     |
| élevé       | 3                   | rouge      |

Voici un exemple de configuration dans le paramétrage de la carte:

```yaml
    type: custom:tix-pollens-fr-card
    above_level: 1  
    title: Pollens
```

![Pollen France Card ](https://github.com/trollix/ha-tpollensfr-card/blob/main/img03.png?raw=true "Pollen France Card")

Niveaux du risque allergique de l'ensemble des pollens répertoriés: , mettre en configuration minimum_level=0:

![Pollen France Card ](https://github.com/trollix/ha-tpollensfr-card/blob/main/img04.png?raw=true "Pollen France Card")

## Merci

Merci à tous les utilisateurs de leurs remontées de problèmes et de bugs divers.
