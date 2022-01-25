export default function setElementPositions(element: HTMLElement, params: {
  left?: number,
  right?: number,
  top?: number,
  bottom?: number,
}) {
  const toPercentage = (value: number | undefined) => (
    value !== undefined ? `${value}%` : ''
  );
  const el = element;
  el.style.top = toPercentage(params.top);
  el.style.left = toPercentage(params.left);
  el.style.bottom = toPercentage(params.bottom);
  el.style.right = toPercentage(params.right);
}
