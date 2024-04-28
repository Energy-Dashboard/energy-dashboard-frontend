import { useState } from "react";

const URL = import.meta.env.VITE_BACKEND_URL;

const Form = ({ handleSubmit, data, countries }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);
  let referencedData = data ? data[0] : {};

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
    let newUrl = `${URL}/energies?`;
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

    window.scrollTo(0, 0);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col justify-center items-center w-full"
    >
      <input
        className="m-16 p-3 bg-red-500 rounded-md w-[300px] cursor-pointer hover:bg-red-600 fixed bottom-10 right-0"
        type="submit"
        value="Submit"
      />
      <div className="grid grid-cols-5 gap-5">
        {countries &&
          referencedData &&
          countries.map((country, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={country}
                name="country"
                value={country}
                onChange={handleCheckboxChange}
                checked={selectedCountries.includes(country)}
              />
              <label htmlFor={country}>{country}</label>
            </div>
          ))}
      </div>
      <div className="flex flex-col justify-center items-center">
        {referencedData &&
          Object.entries(referencedData).map(([key], index) => {
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
    </form>
  );
};

export default Form;
