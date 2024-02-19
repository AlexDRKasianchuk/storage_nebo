import { useCallback, useState } from "react";
import { DBConfig } from "./DBConfig";
import { initDB, useIndexedDB } from "react-indexed-db-hook";

initDB(DBConfig);

export const IndexedLib = () => {

  const [selectedItem, setSelectedItem] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const { add, getAll, clear, deleteRecord, update } = useIndexedDB("books");

  const handleAdd = () => {
    add({ title: title, author: author, year: year }).then(
      (event) => {
        console.log("ID Generated: ", event);
        getBooks();
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const handleClear = () => {
    clear().then(() => {
      getBooks();
      alert("All Clear!");
    });
  };

  const handleRemove = (id) => {
    deleteRecord(id).then((event) => {
      alert("Deleted!");
      getBooks();
    });
  };

  const handleSelectUpdateItem = (item) => {
    setSelectedItem(item.id);
    setTitle(item.title);
    setAuthor(item.author);
    setYear(item.year);
  }

  const handleUpdate = () => {
    update({ id: selectedItem, title: title, author: author, year: year }).then((event) => {
      alert("Edited!");
      getBooks();
    });
  };

  const [persons, setPersons] = useState();

  const getBooks = useCallback(() => {
    getAll().then((personsFromDB) => {
      setPersons(Array.from(personsFromDB));
    });
  }, [getAll]);

  return (    
    <div>
      <div>
      <div>
        Title:{" "}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        Author:{" "}
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        Price:{" "}
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      <button onClick={handleAdd} disabled={!!selectedItem}>Add</button>
      <button onClick={handleUpdate} disabled={!selectedItem}>Update</button>
      <button onClick={handleClear}>Clear All</button>
      </div>
      </div>
      <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th><button onClick={getBooks}>Get all</button></th>
            </tr>
          </thead>
          <tbody>
            {persons && persons.map((x) => (
              <tr key={x.id}>
                <th>{x.title}</th>
                <th>{x.author}</th>
                <th>{x.year}</th>
                <th>
                  <button onClick={() => handleRemove(x.id)}>Remove</button>
                </th>
                <th>
                  <button onClick={() => handleSelectUpdateItem(x)}>Update</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
};
