interface inputProps {
  placeholder: string;
  label?: string;
  name?: string;
  type: string;
}

export const Input = ({ placeholder, label, type, name }: inputProps) => {
  return (
    <>
      <input placeholder={placeholder} name={name} type={type} />
      {label && <label>{label}</label>}
    </>
  );
};
