export interface ScaleInterface{
  render: (props: ScaleProps) => void;
  setObserver: (observer: ScaleObserver) => void;
}

export interface ScaleProps{
  display: boolean;
  vertical: boolean;
  labels: Array<{ val: string, pos: number }>;
}

export interface ScaleObserver{
  click: ScaleClickEventHandler;
}

export type ScaleClickEventHandler = (position: number) => void;
