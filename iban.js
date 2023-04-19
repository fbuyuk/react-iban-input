import { useState } from "react";

function formatIBAN(iban) {
  if (!iban) {
    return "";
  }

  const cleanIban = iban.replace(/[^0-9a-zA-Z]/gi, "").toUpperCase();
  const parts = [];

  for (let i = 0; i < cleanIban.length; i += 4) {
    parts.push(cleanIban.slice(i, i + 4));
  }

  return parts.join(" ");
}

function IBANInput(props) {
  const { onChange, value, ...restProps } = props;
  const [iban, setIban] = useState(() => {
    const formattedIban = formatIBAN(value || "");
    return { iban: value || "", formattedIban };
  });

  function handleInputChange(event) {
    const ibanInput = event.target.value || "";
    const formattedIban = formatIBAN(ibanInput);
    setIban({ iban: ibanInput, formattedIban });
    if (onChange) {
      onChange({
        target: {
          value: ibanInput,
          name: restProps.name,
        },
      });
    }
  }

  return (
    <input
      {...restProps}
      onChange={handleInputChange}
      value={iban.formattedIban}
      type="text"
      size={27}
    />
  );
}

export default IBANInput;
