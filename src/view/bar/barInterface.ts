export interface BarInterface{
  render: (props: BarProps) => void;
  setObserver: (observer: BarObserver) => void;
}

export interface BarProps{
  progressbar: boolean;
  vertical: boolean;
  intervalStartPos: number;
  intervalLength: number;
}

export interface BarObserver{
  click: BarClickEventHandler;
}

export type BarClickEventHandler = (position: number) => void;
