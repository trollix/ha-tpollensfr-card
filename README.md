# tix-pollens-france

[![hacs_badge](https://img.shields.io/badge/HACS-Default-orange.svg)](https://github.com/hacs/integration)

## Custom Lovelace card for pollen information in Hungary

This Lovelace custom card displays pollen information provided by Pollen Information Integration filtered based on concentration level. You will need to install first the [Pollen Information Hungary](https://github.com/amaximus/pollen_hu) integration from HACS.

### Installation

The easiest way to install it is through [HACS (Home Assistant Community Store)](https://github.com/hacs/frontend),
search for *Pollen Information* in the Frontend section and select Pollen Information for Hungary.
If you are not using HACS, you may download plolen-hu-card.js and put it into
homeassistant_config_dir/www/community/pollen-hu-card/ directory.

### Lovelace UI configuration

Please add the card to the resources in configuration.yaml:

``` resources:
  - {type: module, url: '/hacsfiles/pollen-hu-card/pollen-hu-card.js'}
```

### Options

#### Card options

| Name             | Type         | Required     | Default                 | Description                         |
| ---------------- | ------------ | ------------ | ----------------------- | ----------------------------------- |
| type             | string       | **required** |                         | `custom:pollen-hu-card`             |
| title            | string       | optional     | `Pollens`               | title                               |
| sensor_name      | string       | optional     | `pollen_hu`             | name of the sensor                  |
| above_level      | integer      | optional     | `2`                     | display pollens above level (see below) |

Value mappings for above_level (source: [ÁNTSZ](https://efop180.antsz.hu/polleninformaciok/)):

| Description | Concentration level | Icon color |
| ----------- | ------------------- | ---------- |
| not present | 0                   | grey       |
| low         | 1                   | green      |
| medium      | 2                   | yellow     |
| high        | 3                   | orange     |
| very high   | 4                   | red        |

Please find below an example of ui-lovelace.yaml card entry:

```yaml
    cards:
      - type: custom:pollen-hu-card
        above_level: 1
        title: Pollenek
```

Pollen information with above_level=0:

![Pollen above_level](https://raw.githubusercontent.com/amaximus/pollen-hu-card/main/pollen0.png)

## Thanks

Thanks to all the people who have contributed!

[![contributors](https://contributors-img.web.app/image?repo=amaximus/pollen-hu-card)](https://github.com/amaximus/pollen-hu-card/graphs/contributors)
