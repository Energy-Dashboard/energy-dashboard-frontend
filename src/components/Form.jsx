import { useState, useEffect } from "react";

const URL = import.meta.env.VITE_BACKEND_URL;

const Form = ({ handleSubmit, data, countries }) => {
  const [selectedCountries, setSelectedCountries] = useState(
    JSON.parse(localStorage.getItem("selectedCountries")) || []
  );
  let referencedData = data[0];

  useEffect(() => {
    localStorage.setItem(
      "selectedCountries",
      JSON.stringify(selectedCountries)
    );
  }, [selectedCountries]);

  const handleCheckboxChange = (event) => {
    if (event.target.checked) {
      setSelectedCountries((prevCountries) => {
        const newCountries = [...prevCountries, event.target.value];
        localStorage.setItem("selectedCountries", JSON.stringify(newCountries));
        return newCountries;
      });
    } else {
      setSelectedCountries((prevCountries) => {
        const newCountries = prevCountries.filter(
          (country) => country !== event.target.value
        );
        localStorage.setItem("selectedCountries", JSON.stringify(newCountries));
        return newCountries;
      });
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
        localStorage.setItem(input.name, input.value);
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
        className="m-10 p-3 bg-red-500 rounded-md w-[300px] cursor-pointer hover:bg-red-600 fixed bottom-10 right-0"
        type="submit"
        value="Submit"
      />
      <div className="grid grid-cols-5 gap-5">
        {countries.map((country, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={country}
              name="country"
              value={country}
              onChange={handleCheckboxChange}
              checked={
                Array.isArray(selectedCountries) &&
                selectedCountries.includes(country)
              }
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
                  defaultValue={localStorage.getItem(`min-${key}`)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor={key}>(+) Maximum {key}</label>
                <input
                  type="text"
                  name={`max-${key}`}
                  className="bg-[#333333] p-2 rounded-md w-[400px]"
                  defaultValue={localStorage.getItem(`max-${key}`)}
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
