interface InputProps {
  price: string;
  setPrice: (value: string) => void;
  placeholder?: string;
  className?: string;
}
const PriceInput: React.FC<InputProps> = ({ price, setPrice, placeholder, className }) => {

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^\d.]/g, '');
    const [integerPart, decimalPart] = sanitizedValue.split('.');
    let formattedValue;
    if (decimalPart === undefined) {
      // No decimal point entered
      formattedValue = integerPart;
    } else {
      // Limit decimal to 2 places
      formattedValue = `${integerPart}.${decimalPart.slice(0, 2)}`;
    }
    // Ensure only one decimal point
    if ((formattedValue.match(/\./g) || []).length > 1) {
      return; // Do not update state if there's more than one decimal point
    }
    setPrice(formattedValue);
  };

  return (
    <input
      required
      type="text"
      inputMode="decimal"
      name="price"
      value={price}
      onChange={handlePriceChange}
      placeholder={placeholder || "Enter price"}
      pattern="^\d*\.?\d{0,2}$"
      className={className || " font-mono border border-gray-300 rounded-md block mb-4 mx-auto"}
    />
  )
}

export default PriceInput