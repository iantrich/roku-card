# Roku Remote Card by [@iantrich](https://www.github.com/iantrich)
📺 Roku Remote Lovelace Card

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE.md)

![Project Maintenance][maintenance-shield]
[![GitHub Activity][commits-shield]][commits]

[![Discord][discord-shield]][discord]
[![Community Forum][forum-shield]][forum]

[![Twitter][twitter]][twitter]
[![Github][github]][github]

## Support
Hey dude! Help me out for a couple of :beers: or a :coffee:!

[![coffee](https://www.buymeacoffee.com/assets/img/custom_images/black_img.png)](https://www.buymeacoffee.com/zJtVxUAgH)

This card is for [Lovelace](https://www.home-assistant.io/lovelace) on [Home Assistant](https://www.home-assistant.io/) that display a [Roku](https://www.roku.com/) remote.

![example](example.png)

## Options

| Name | Type | Requirement | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:roku-card`
| entity | string | **Required** | `media_player` entity of Roku device
| remote | string | **Optional** | `remote` entity of Roku device. Default assumed named like `entity`
| name | string | **Optional** | Card name
| theme | string | **Optional** | Card theme
| tv | boolean | **Optional** | If `true` shows volume and power buttons. Default `false`
| power | `object` | **Optional** | Button configuration for power `See button options`
| volume_up | `object` | **Optional** | Button configuration for volume_up `See button options`
| volume_down | `object` | **Optional** | Button configuration for volume_down `See button options`
| volume_mute | `object` | **Optional** | Button configuration for volume_mute `See button options`
| up | `object` | **Optional** | Button configuration for up `See button options`
| down | `object` | **Optional** | Button configuration for down `See button options`
| left | `object` | **Optional** | Button configuration for left `See button options`
| right | `object` | **Optional** | Button configuration for right `See button options`
| home | `object` | **Optional** | Button configuration for home `See button options`
| info | `object` | **Optional** | Button configuration for info `See button options`
| back | `object` | **Optional** | Button configuration for back `See button options`
| select | `object` | **Optional** | Button configuration for select `See button options`
| reverse | `object` | **Optional** | Button configuration for reverse `See button options`
| play | `object` | **Optional** | Button configuration for play `See button options`
| forward | `object` | **Optional** | Button configuration for forward `See button options`
| apps | `object` | **Optional** | List of app shortcuts `See app options`

## `app` Options

| Name | Type | Requirement | Description
| ---- | ---- | ------- | -----------
| id | `string` | **Optional** | Name of the source to launch
| icon | `string` | **Optional** | Path to image to use for app

## `button` Options

| Name | Type | Requirement | Description
| ---- | ---- | ------- | -----------
| show | `boolean` | **Optional** | Show/Hide button `true`
| tap_action | `object` | **Optional** | Tap action object `See action options`
| hold_action | `object` | **Optional** | Hold action object `See action options`
| dbltap_action | `object` | **Optional** | Doulbe Tap action object `See action options`

## `action` Options

| Name | Type | Default | Supported options | Description |
| ----------------- | ------ | -------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `action` | `string` | `toggle` | `more-info`, `toggle`, `call-service`, `none`, `navigate`, `url` | Action to perform |
| `entity` | `string` | none | Any entity id | **Only valid for `action: more-info`** to override the entity on which you want to call `more-info` |
| `navigation_path` | `string` | none | Eg: `/lovelace/0/` | Path to navigate to (e.g. `/lovelace/0/`) when action defined as navigate |
| `url` | `string` | none | Eg: `https://www.google.fr` | URL to open on click when action is `url`. The URL will open in a new tab |
| `service` | `string` | none | Any service | Service to call (e.g. `media_player.media_play_pause`) when `action` defined as `call-service` |
| `service_data` | `object` | none | Any service data | Service data to include (e.g. `entity_id: media_player.bedroom`) when `action` defined as `call-service`. If your `service_data` requires an `entity_id`, you can use the keywork `entity`, this will actually call the service on the entity defined in the main configuration of this card. Useful for [configuration templates](#configuration-templates) |
| `haptic` | `string` | none | `success`, `warning`, `failure`, `light`, `medium`, `heavy`, `selection` | Haptic feedback for the [Beta IOS App](http://home-assistant.io/ios/beta) |
| `repeat` | `number` | none | eg: `500` | For a hold_action, you can optionally configure the action to repeat while the button is being held down (for example, to repeatedly increase the volume of a media player). Define the number of milliseconds between repeat actions here. |

## Installation

### Step 1

Install `roku-card` by copying `dist/roku-card.js` from this repo to `<config directory>/www/roku-card.js` on your Home Assistant instance.

**Example:**

```bash
wget https://raw.githubusercontent.com/custom-cards/roku-card/master/dist/roku-card.js
mv roku-card* /config/www/
```

### Step 2

Link `roku-card` inside your `ui-lovelace.yaml`.

```yaml
resources:
  - url: /local/roku-card.js?v=0
    type: module
```

### Step 3

Add a custom element in your `ui-lovelace.yaml`

```yaml
type: 'custom:roku-card'
entity: media_player.basement_roku
tv: true
apps:
  - id: Netflix
    icon: /local/netflix.webp
  - id: Hulu
    icon: /local/hulu.webp
volume_up:
  tap_action:
    action: call-service
    service: remote.send_command
    service_data:
      entity_id: remote.basement_roku
      command: play
volume_down:
  dbltap_action:
    action: call-service
    service: remote.send_command
    service_data:
      entity_id: remote.basement_roku
      command: play

```

[Troubleshooting](https://github.com/thomasloven/hass-config/wiki/Lovelace-Plugins)

[commits-shield]: https://img.shields.io/github/commit-activity/y/custom-cards/roku-card.svg?style=for-the-badge
[commits]: https://github.com/custom-cards/roku-card/commits/master
[discord]: https://discord.gg/Qa5fW2R
[discord-shield]: https://img.shields.io/discord/330944238910963714.svg?style=for-the-badge
[forum-shield]: https://img.shields.io/badge/community-forum-brightgreen.svg?style=for-the-badge
[forum]: https://community.home-assistant.io/t/lovelace-roku-remote-card/91476
[license-shield]: https://img.shields.io/github/license/custom-cards/roku-card.svg?style=for-the-badge
[maintenance-shield]: https://img.shields.io/badge/maintainer-Ian%20Richardson%20%40iantrich-blue.svg?style=for-the-badge
[releases-shield]: https://img.shields.io/github/release/custom-cards/roku-card.svg?style=for-the-badge
[releases]: https://github.com/custom-cards/roku-card/releases
[twitter]: https://img.shields.io/twitter/follow/iantrich.svg?style=social
[github]: https://img.shields.io/github/followers/iantrich.svg?style=social
