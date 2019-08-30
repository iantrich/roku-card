import {
  html,
  LitElement,
  TemplateResult,
  customElement,
  property,
  CSSResult,
  css
} from "lit-element";
import { ifDefined } from "lit-html/directives/if-defined";
import {
  HomeAssistant,
  applyThemesOnElement,
  handleClick
} from "custom-card-helpers";

import { RokuCardConfig } from "./types";
import { longPress } from "./long-press";

const defaultRemoteAction = {
  action: "call-service",
  service: "remote.send_command"
};

@customElement("roku-card")
class RokuCard extends LitElement {
  @property() public hass?: HomeAssistant;

  @property() private _config?: RokuCardConfig;

  public getCardSize() {
    return 7;
  }

  public setConfig(config: RokuCardConfig): void {
    if (!config.entity) {
      console.log("Invalid configuration");
      return;
    }

    this._config = {
      theme: "default",
      ...config
    };
  }

  protected render(): TemplateResult | void {
    if (!this._config || !this.hass) {
      return html``;
    }

    const stateObj = this.hass.states[this._config.entity];

    return html`
      <ha-card .header="${this._config.name}">
        <div class="remote">
          <div class="row">
            ${this._config.tv || (this._config.power && this._config.power.show)
              ? html`
                  <paper-icon-button
                    .button="${"power"}"
                    icon="mdi:power"
                    title="Power"
                    @ha-click="${this._handleTap}"
                    @ha-hold="${this._handleHold}"
                    @ha-dblclick=${this._handleDblTap}
                    .hasDblClick=${this._config.power &&
                      this._config.power.dbltap_action &&
                      this._config.power.dbltap_action.action !== "none"}
                    .repeat=${this._config.power &&
                      this._config.power.hold_action &&
                      ifDefined(this._config.power.hold_action.repeat)}
                    .longpress=${longPress()}
                  ></paper-icon-button>
                `
              : ""}
          </div>
          <div class="row">
            ${this._config.back && this._config.back.show === false
              ? html`
                  <paper-icon-button></paper-icon-button>
                `
              : html`
                  <paper-icon-button
                    .button="${"back"}"
                    icon="mdi:arrow-left"
                    title="Back"
                    @ha-click="${this._handleTap}"
                    @ha-hold="${this._handleHold}"
                    @ha-dblclick=${this._handleDblTap}
                    .hasDblClick=${this._config.back &&
                      this._config.back.dbltap_action &&
                      this._config.back.dbltap_action.action !== "none"}
                    .repeat=${this._config.back &&
                      this._config.back.hold_action &&
                      ifDefined(this._config.back.hold_action.repeat)}
                    .longpress=${longPress()}
                  ></paper-icon-button>
                `}
            ${this._config.info && this._config.info.show === false
              ? html`
                  <paper-icon-button></paper-icon-button>
                `
              : html`
                  <paper-icon-button
                    .button="${"info"}"
                    icon="mdi:asterisk"
                    title="Info"
                    @ha-click="${this._handleTap}"
                    @ha-hold="${this._handleHold}"
                    @ha-dblclick=${this._handleDblTap}
                    .hasDblClick=${this._config.info &&
                      this._config.info.dbltap_action &&
                      this._config.info.dbltap_action.action !== "none"}
                    .repeat=${this._config.info &&
                      this._config.info.hold_action &&
                      ifDefined(this._config.info.hold_action.repeat)}
                    .longpress=${longPress()}
                  ></paper-icon-button>
                `}
            ${this._config.home && this._config.home.show === false
              ? html`
                  <paper-icon-button></paper-icon-button>
                `
              : html`
                  <paper-icon-button
                    .button="${"home"}"
                    icon="mdi:home"
                    title="Home"
                    @ha-click="${this._handleTap}"
                    @ha-hold="${this._handleHold}"
                    @ha-dblclick=${this._handleDblTap}
                    .hasDblClick=${this._config.home &&
                      this._config.home.dbltap_action &&
                      this._config.home.dbltap_action.action !== "none"}
                    .repeat=${this._config.home &&
                      this._config.home.hold_action &&
                      ifDefined(this._config.home.hold_action.repeat)}
                    .longpress=${longPress()}
                  ></paper-icon-button>
                `}
          </div>

          <div class="row">
            ${this._config.apps && this._config.apps.length > 0
              ? html`
                  <img
                    src="${this._config.apps[0].icon}"
                    .app="${this._config.apps[0].id}"
                    @click="${this.launchApp}"
                  />
                `
              : html`
                  <paper-icon-button></paper-icon-button>
                `}
            ${this._config.up && this._config.up.show === false
              ? html`
                  <paper-icon-button></paper-icon-button>
                `
              : html`
                  <paper-icon-button
                    class="diagonal"
                    .button="${"up"}"
                    icon="mdi:chevron-up"
                    title="Up"
                    @ha-click="${this._handleTap}"
                    @ha-hold="${this._handleHold}"
                    @ha-dblclick=${this._handleDblTap}
                    .hasDblClick=${this._config.up &&
                      this._config.up.dbltap_action &&
                      this._config.up.dbltap_action.action !== "none"}
                    .repeat=${this._config.up &&
                      this._config.up.hold_action &&
                      ifDefined(this._config.up.hold_action.repeat)}
                    .longpress=${longPress()}
                  ></paper-icon-button>
                `}
            ${this._config.apps && this._config.apps.length > 1
              ? html`
                  <img
                    src="${this._config.apps[1].icon}"
                    .app="${this._config.apps[1].id}"
                    @click="${this.launchApp}"
                  />
                `
              : html`
                  <paper-icon-button></paper-icon-button>
                `}
          </div>

          <div class="row">
            ${this._config.left && this._config.left.show === false
              ? html`
                  <paper-icon-button></paper-icon-button>
                `
              : html`
                  <paper-icon-button
                    class="diagonal"
                    .button="${"left"}"
                    icon="mdi:chevron-left"
                    title="Left"
                    @ha-click="${this._handleTap}"
                    @ha-hold="${this._handleHold}"
                    @ha-dblclick=${this._handleDblTap}
                    .hasDblClick=${this._config.left &&
                      this._config.left.dbltap_action &&
                      this._config.left.dbltap_action.action !== "none"}
                    .repeat=${this._config.left &&
                      this._config.left.hold_action &&
                      ifDefined(this._config.left.hold_action.repeat)}
                    .longpress=${longPress()}
                  ></paper-icon-button>
                `}
            ${this._config.select && this._config.select.show === false
              ? html`
                  <paper-icon-button></paper-icon-button>
                `
              : html`
                  <paper-icon-button
                    class="diagonal"
                    .button="${"select"}"
                    icon="mdi:checkbox-blank-circle"
                    title="Select"
                    @ha-click="${this._handleTap}"
                    @ha-hold="${this._handleHold}"
                    @ha-dblclick=${this._handleDblTap}
                    .hasDblClick=${this._config.select &&
                      this._config.select.dbltap_action &&
                      this._config.select.dbltap_action.action !== "none"}
                    .repeat=${this._config.select &&
                      this._config.select.hold_action &&
                      ifDefined(this._config.select.hold_action.repeat)}
                    .longpress=${longPress()}
                  ></paper-icon-button>
                `}
            ${this._config.right && this._config.right.show === false
              ? html`
                  <paper-icon-button></paper-icon-button>
                `
              : html`
                  <paper-icon-button
                    class="diagonal"
                    .button="${"right"}"
                    icon="mdi:chevron-right"
                    title="Right"
                    @ha-click="${this._handleTap}"
                    @ha-hold="${this._handleHold}"
                    @ha-dblclick=${this._handleDblTap}
                    .hasDblClick=${this._config.right &&
                      this._config.right.dbltap_action &&
                      this._config.right.dbltap_action.action !== "none"}
                    .repeat=${this._config.right &&
                      this._config.right.hold_action &&
                      ifDefined(this._config.right.hold_action.repeat)}
                    .longpress=${longPress()}
                  ></paper-icon-button>
                `}
          </div>

          <div class="row">
            ${this._config.apps && this._config.apps.length > 2
              ? html`
                  <img
                    src="${this._config.apps[2].icon}"
                    .app="${this._config.apps[2].id}"
                    @click="${this.launchApp}"
                  />
                `
              : html`
                  <paper-icon-button></paper-icon-button>
                `}
            ${this._config.down && this._config.down.show === false
              ? html`
                  <paper-icon-button></paper-icon-button>
                `
              : html`
                  <paper-icon-button
                    class="diagonal"
                    .button="${"down"}"
                    icon="mdi:chevron-down"
                    title="Down"
                    @ha-click="${this._handleTap}"
                    @ha-hold="${this._handleHold}"
                    @ha-dblclick=${this._handleDblTap}
                    .hasDblClick=${this._config.down &&
                      this._config.down.dbltap_action &&
                      this._config.down.dbltap_action.action !== "none"}
                    .repeat=${this._config.down &&
                      this._config.down.hold_action &&
                      ifDefined(this._config.down.hold_action.repeat)}
                    .longpress=${longPress()}
                  ></paper-icon-button>
                `}
            ${this._config.apps && this._config.apps.length > 3
              ? html`
                  <img
                    src="${this._config.apps[3].icon}"
                    .app="${this._config.apps[3].id}"
                    @click="${this.launchApp}"
                  />
                `
              : html`
                  <paper-icon-button></paper-icon-button>
                `}
          </div>

          <div class="row">
            ${this._config.reverse && this._config.reverse.show === false
              ? html`
                  <paper-icon-button></paper-icon-button>
                `
              : html`
                  <paper-icon-button
                    .button="${"reverse"}"
                    icon="mdi:rewind"
                    title="Rewind"
                    @ha-click="${this._handleTap}"
                    @ha-hold="${this._handleHold}"
                    @ha-dblclick=${this._handleDblTap}
                    .hasDblClick=${this._config.reverse &&
                      this._config.reverse.dbltap_action &&
                      this._config.reverse.dbltap_action.action !== "none"}
                    .repeat=${this._config.reverse &&
                      this._config.reverse.hold_action &&
                      ifDefined(this._config.reverse.hold_action.repeat)}
                    .longpress=${longPress()}
                  ></paper-icon-button>
                `}
            ${this._config.play && this._config.play.show === false
              ? html`
                  <paper-icon-button></paper-icon-button>
                `
              : html`
                  <paper-icon-button
                    .button="${"play"}"
                    icon="mdi:play-pause"
                    title="Play/Pause"
                    @ha-click="${this._handleTap}"
                    @ha-hold="${this._handleHold}"
                    @ha-dblclick=${this._handleDblTap}
                    .hasDblClick=${this._config.play &&
                      this._config.play.dbltap_action &&
                      this._config.play.dbltap_action.action !== "none"}
                    .repeat=${this._config.play &&
                      this._config.play.hold_action &&
                      ifDefined(this._config.play.hold_action.repeat)}
                    .longpress=${longPress()}
                  ></paper-icon-button>
                `}
            ${this._config.forward && this._config.forward.show === false
              ? html`
                  <paper-icon-button></paper-icon-button>
                `
              : html`
                  <paper-icon-button
                    .button="${"forward"}"
                    icon="mdi:fast-forward"
                    title="Fast-Forward"
                    @ha-click="${this._handleTap}"
                    @ha-hold="${this._handleHold}"
                    @ha-dblclick=${this._handleDblTap}
                    .hasDblClick=${this._config.forward &&
                      this._config.forward.dbltap_action &&
                      this._config.forward.dbltap_action.action !== "none"}
                    .repeat=${this._config.forward &&
                      this._config.forward.hold_action &&
                      ifDefined(this._config.forward.hold_action.repeat)}
                    .longpress=${longPress()}
                  ></paper-icon-button>
                `}
          </div>

          <div class="row">
            ${this._config.volume_mute &&
            this._config.volume_mute.show === false
              ? html`
                  <paper-icon-button></paper-icon-button>
                `
              : html`
                  <paper-icon-button
                    .button="${"volume_mute"}"
                    icon="mdi:volume-mute"
                    title="Volume Mute"
                    @ha-click="${this._handleTap}"
                    @ha-hold="${this._handleHold}"
                    @ha-dblclick=${this._handleDblTap}
                    .hasDblClick=${this._config.volume_mute &&
                      this._config.volume_mute.dbltap_action &&
                      this._config.volume_mute.dbltap_action.action !== "none"}
                    .repeat=${this._config.volume_mute &&
                      this._config.volume_mute.hold_action &&
                      ifDefined(this._config.volume_mute.hold_action!.repeat)}
                    .longpress=${longPress()}
                  ></paper-icon-button>
                `}
            ${this._config.volume_down &&
            this._config.volume_down.show === false
              ? html`
                  <paper-icon-button></paper-icon-button>
                `
              : html`
                  <paper-icon-button
                    .button="${"volume_down"}"
                    icon="mdi:volume-minus"
                    title="Volume Down"
                    @ha-click="${this._handleTap}"
                    @ha-hold="${this._handleHold}"
                    @ha-dblclick=${this._handleDblTap}
                    .hasDblClick=${this._config.volume_down &&
                      this._config.volume_down.dbltap_action &&
                      this._config.volume_down.dbltap_action.action !== "none"}
                    .repeat=${this._config.volume_down &&
                      this._config.volume_down.hold_action &&
                      ifDefined(this._config.volume_down.hold_action.repeat)}
                    .longpress=${longPress()}
                  ></paper-icon-button>
                `}
            ${this._config.volume_up && this._config.volume_up.show === false
              ? html`
                  <paper-icon-button></paper-icon-button>
                `
              : html`
                  <paper-icon-button
                    .button="${"volume_up"}"
                    icon="mdi:volume-plus"
                    title="Volume Up"
                    @ha-click="${this._handleTap}"
                    @ha-hold="${this._handleHold}"
                    @ha-dblclick=${this._handleDblTap}
                    .hasDblClick=${this._config.volume_up &&
                      this._config.volume_up.dbltap_action &&
                      this._config.volume_up.dbltap_action.action !== "none"}
                    .repeat=${this._config.volume_up &&
                      this._config.volume_up.hold_action &&
                      ifDefined(this._config.volume_up.hold_action.repeat)}
                    .longpress=${longPress()}
                  ></paper-icon-button>
                `}
          </div>
        </div>
      </ha-card>
    `;
  }

  protected updated(changedProps): void {
    if (!this._config) {
      return;
    }

    const oldHass = changedProps.get("hass");
    if (!oldHass || oldHass.themes !== this.hass!.themes) {
      applyThemesOnElement(this, this.hass!.themes, this._config.theme);
    }
  }

  static get styles(): CSSResult {
    return css`
      .remote {
        padding: 16px 0px 16px 0px;
      }
      img,
      paper-icon-button {
        width: 64px;
        height: 64px;
        cursor: pointer;
      }
      img {
        border-radius: 25px;
      }
      .row {
        display: flex;
        padding: 8px 36px 8px 36px;
        justify-content: space-evenly;
      }
    `;
  }

  private launchApp(e: Event): void {
    const target = e.currentTarget as any;

    this.hass!.callService("media_player", "select_source", {
      entity_id: this._config!.entity,
      source: target.app
    });
  }

  private _handleTap(ev): void {
    const button = ev.currentTarget.button;
    console.log(button);
    const config = this._config![button];
    console.log(config);
    let remote = this._config!.remote
      ? this._config!.remote
      : "remote." + this._config!.entity.split(".")[1];
    handleClick(
      this,
      this.hass!,
      config && config.tap_action
        ? config
        : {
            tap_action: {
              service_data: {
                command: button,
                entity_id: remote
              },
              ...defaultRemoteAction
            }
          },
      false,
      false
    );
  }

  private _handleHold(ev): void {
    const button = ev.currentTarget.button;
    const config = this._config![button];
    if (config && config.hold_action) {
      handleClick(this, this.hass!, config, true, false);
    }
  }

  private _handleDblTap(ev): void {
    const button = ev.currentTarget.button;
    const config = this._config![button];
    if (config && config.dbltap_action) {
      handleClick(this, this.hass!, config, false, true);
    }
  }
}
