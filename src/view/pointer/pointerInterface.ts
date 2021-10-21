export interface PointerInterface{
  render: (props: PointerProps) => void;
  setObserver: (observer: PointerObserver) => void;
}

export interface PointerProps{
  display: boolean;
  vertical: boolean;
  position: number;
}

export interface PointerObserver{
  startMove: PointerStartMoveEventHandler;
  move: PointerMoveEventHandler;
  endMove: PointerEndMoveEventHandler;
}

export type PointerMoveEventHandler = (distance: number, isSecond: boolean) => void;
export type PointerStartMoveEventHandler = (isSecond: boolean) => void;
export type PointerEndMoveEventHandler = (isSecond: boolean) => void;
