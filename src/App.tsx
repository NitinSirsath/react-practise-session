import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [positiveCount, setPositiveCount] = useState<number>(1);
  const [negativeCount, setNegativeCount] = useState<number>(1);
  const [positiveRecords, setPositiveRecords] = useState<number[]>([]);
  const [negativeRecords, setNegativeRecords] = useState<number[]>([]);

  // Handle increment and decrement based on operation type
  const handleIncrement = (operation: string) => {
    if (operation === "positive") {
      setCount(count + positiveCount);
    } else if (operation === "negative") {
      setCount(count - negativeCount);
    }
  };

  // Handle input changes for increment and decrement values
  const handleInputOnChange = (
    operation: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (operation === "positive") {
      setPositiveCount(Number(event.target.value));
    } else if (operation === "negative") {
      setNegativeCount(Number(event.target.value));
    }
  };

  // Add the current count to the appropriate records array
  const handleAddRecord = () => {
    if (count > 0) {
      setPositiveRecords((prev) => [...prev, count]);
    } else if (count < 0) {
      setNegativeRecords((prev) => [...prev, count]);
    }
  };

  // Delete a record from the positive or negative records array
  const handleDeleteRecord = (index: number, operation: string) => {
    if (operation === "positive") {
      setPositiveRecords((prev) => prev.filter((_, i) => i !== index));
    } else if (operation === "negative") {
      setNegativeRecords((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Export the records to a JSON file using native functionality
  const handleExportToJson = () => {
    const records = {
      positiveRecords,
      negativeRecords,
    };
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(records, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "records.json");
    document.body.appendChild(downloadAnchorNode); // Required for Firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <>
      <div>
        <h1 className="heading">Dynamic Counter App</h1>
      </div>
      <h2>Count: {count}</h2>
      <button onClick={() => handleIncrement("positive")}>Increment</button>
      <button onClick={() => handleIncrement("negative")}>Decrement</button>
      <div>
        <h2>Input Fields</h2>
        <div>
          <label htmlFor="positive">Positive Input</label>
          <input
            id="positive"
            value={positiveCount}
            onChange={(event) => handleInputOnChange("positive", event)}
            placeholder="Enter"
            type="number"
          />
        </div>
        <div>
          <label htmlFor="negative">Negative Input</label>
          <input
            id="negative"
            value={negativeCount}
            onChange={(event) => handleInputOnChange("negative", event)}
            placeholder="Enter"
            type="number"
          />
        </div>
      </div>
      <h2>Record Data</h2>
      <div>
        <button onClick={() => handleAddRecord()}>Add Record</button>
      </div>
      <div>
        <h3>Positive Records</h3>
        {positiveRecords.map((record, index) => (
          <div key={index}>
            {record}
            <button onClick={() => handleDeleteRecord(index, "positive")}>
              Delete
            </button>
          </div>
        ))}
      </div>
      <div>
        <h3>Negative Records</h3>
        {negativeRecords.map((record, index) => (
          <div key={index}>
            {record}
            <button onClick={() => handleDeleteRecord(index, "negative")}>
              Delete
            </button>
          </div>
        ))}
        <h2>Export to JSON</h2>
        <button onClick={() => handleExportToJson()}>Export to JSON</button>
      </div>
    </>
  );
}

export default App;
