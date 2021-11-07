export default function CheckboxInput({
  labelDescription = "Descrição do checkbox",
  inputValue = "Valor padrão do input",
  onCheckboxChange = null,
  id = "id_do_input_checkbox",
  autoFocus = false,
}) {
  function handleInputChange({ currentTarget }) {
    if (onCheckboxChange) {
      const newValue = currentTarget.value;
      onCheckboxChange(newValue);
    }
  }

  return (
    <div className="flex flex-row items-center space-x-2 my-4">
      <input
        autoFocus={autoFocus}
        id={id}
        className="border p-1"
        type="checkbox"
        value={inputValue}
        onChange={handleInputChange}
      />
      <label className="text-sm mb-1 pt-1" htmlFor={id}>
        {labelDescription}
      </label>
    </div>
  );
}
