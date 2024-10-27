import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { currencyConverter } from "./api/postApi";

const App = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  // to fetch the data
  const {
    data: convertedAmount,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["currency"],
    queryFn: () => currencyConverter(fromCurrency, toCurrency, amount),
    enabled: false,
  });

  const handleCurrencyConverter = () => {
    if (amount > 0) {
      refetch();
    }
  };

  return (
    <section className="currency-converter">
      <div className="currency-div">
        <h1>Currency Converter</h1>
        <hr />
        <div>
          <label>
            Amount:
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
        </div>
        <section className="currency-selector">
          <label>
            From:
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {["USD", "EUR", "INR", "GBP", "AUD"].map((currency) => {
                return (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                );
              })}
            </select>
          </label>

          <label>
            From:
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {["INR", "USD", "EUR", "GBP", "AUD"].map((currency) => {
                return (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                );
              })}
            </select>
          </label>
        </section>

        <button
          disabled={isLoading || amount <= 0}
          onClick={handleCurrencyConverter}
        >
          {isLoading ? "converting.." : "convert"}
        </button>

        <hr />
        {convertedAmount && (
          <h2>
            {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
          </h2>
        )}

        {error && <p>An error occurred: {error.message}</p>}
      </div>
    </section>
  );
};

export default App;
