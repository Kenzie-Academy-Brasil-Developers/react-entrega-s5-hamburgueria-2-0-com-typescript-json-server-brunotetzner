interface buttonProps {
  callback: () => void;
  text: string;
}
export const Button = ({ callback, text }: buttonProps) => {
  return <button onClick={callback}>{text}</button>;
};
