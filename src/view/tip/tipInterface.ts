export interface TipInterface{
  render: (props: TipProps) => void;
  setObserver: (observer: TipObserver) => void;
}

export interface TipProps{
  display: boolean;
  vertical: boolean;
  position: number;
  value: string;
  zIndex?: number;
}

export interface TipObserver{
  startMove: TipStartMoveHandler;
  move: TipMoveHandler;
  endMove: TipEndMoveHandler;
}

export type TipMoveHandler = (distance: number, isSecond: boolean) => void;
export type TipStartMoveHandler = (isSecond: boolean) => void;
export type TipEndMoveHandler = (isSecond: boolean) => void;
