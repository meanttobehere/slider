export interface MoveableObjectInterface{
  setObserver: (observer: MoveableObjectObserver) => void;
}

export interface MoveableObjectObserver{
  startMove: MoveableObjectStartMoveHandler;
  move: MoveableObjectMoveHandler;
  endMove: MoveableObjectEndMoveHandler;
}

export type MoveableObjectStartMoveHandler = () => void;
export type MoveableObjectMoveHandler = (
  distanceX: number,
  distanceY: number
) => void;
export type MoveableObjectEndMoveHandler = () => void;
