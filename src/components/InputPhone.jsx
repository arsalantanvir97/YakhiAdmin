import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function InputPhone({ value, onChange }) {
  return (
    <PhoneInput
      country={"us"}
      value={value}
      onChange={(phone, countryData) => {
        const phone_formatted = phone.replace(countryData?.dialCode, "");
        console.log("phone_formatted", phone, countryData);
        onChange && onChange(phone);
      }}
      containerClass="custom_number_container"
      inputClass="custom_number_input"
    />
    );
}