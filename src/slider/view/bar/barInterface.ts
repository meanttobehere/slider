export interface BarInterface{
  render: (props: BarProps) => void;
}

export interface BarProps{
  progressbar: boolean;
  vertical: boolean;
  intervalStartPos: number;
  intervalLength: number;
}
