import { useState } from "react";

const Form = ({ handleSubmit, data, countries }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  let referencedData = data[0];

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setSelectedCountries((prevCountries) => [
        ...prevCountries,
        event.target.value,
      ]);
    } else {
      setSelectedCountries((prevCountries) =>
        prevCountries.filter((country) => country !== event.target.value)
      );
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    let selectedCountriesString = selectedCountries.join(",");
    let newUrl = "http://localhost:3000/energies?";
    let queryParams = event.target.querySelectorAll("input[type=text]");

    if (selectedCountriesString !== "") {
      newUrl += `entity=${selectedCountriesString}`;
    }

    queryParams.forEach((input) => {
      if (input.value !== "") {
        newUrl += `&${input.name}=${input.value}`;
      }
    });

    handleSubmit(newUrl);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center items-center w-full"
    >
      <div className="grid grid-cols-5 gap-5">
        {countries.map((country, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={country}
              name="country"
              value={country}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={country}>{country}</label>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center">
        {Object.entries(referencedData).map(([key], index) => {
          if (["entity", "_id", "__v"].includes(key)) {
            return null;
          }

          return (
            <div className="flex gap-24 mt-10" key={index}>
              <div className="flex flex-col gap-2">
                <label htmlFor={key}>(-) Minimum {key}</label>
                <input
                  type="text"
                  name={`min-${key}`}
                  className="bg-[#333333] p-2 rounded-md w-[400px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={key}>(+) Maximum {key}</label>
                <input
                  type="text"
                  name={`max-${key}`}
                  className="bg-[#333333] p-2 rounded-md w-[400px]"
                />
              </div>
            </div>
          );
        })}
      </div>
      <input
        className="m-10 p-3 bg-red-500 rounded-md w-[300px] "
        type="submit"
        value="Submit"
      />
    </form>
  );
};

export default Form;
