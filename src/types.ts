import { ActionConfig } from "custom-card-helpers";

export interface RokuCardConfig {
  type: string;
  entity: string;
  remote?: string;
  name?: string;
  theme?: string;
  tv?: boolean;
  power: ActionButtonConfig;
  volume_up: ActionButtonConfig;
  volume_down: ActionButtonConfig;
  volume_mute: ActionButtonConfig;
  up: ActionButtonConfig;
  down: ActionButtonConfig;
  left: ActionButtonConfig;
  right: ActionButtonConfig;
  home: ActionButtonConfig;
  info: ActionButtonConfig;
  back: ActionButtonConfig;
  select: ActionButtonConfig;
  reverse: ActionButtonConfig;
  play: ActionButtonConfig;
  forward: ActionButtonConfig;
  apps?: AppConfig[];
}

export interface ActionButtonConfig {
  show?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  dbltap_action?: ActionConfig;
}

export interface AppConfig {
  icon?: string;
  id?: string;
}
