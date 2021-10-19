export interface TipInterface{
  render: (props: TipProps) => void;
}

export interface TipProps{
  display: boolean;
  vertical: boolean;
  position: number;
  value: string;
}
