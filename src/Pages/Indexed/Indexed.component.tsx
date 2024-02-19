import { FC, useCallback, useEffect, useState } from "react";
import { openDb, dropDb, createTable, addRecord, getAllRecords, removeItem, updateRecord } from "./utils";

export const IndexedPage: FC = () => {
    const [selectedItem, setSelectedItem] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [data, setData] = useState<any[]>([]);

    const handleShowData = useCallback(() => {
        setData(getAllRecords())
    }, [])

    useEffect(() => {handleShowData()}, [ handleShowData]);
   
    const handleUpdate = useCallback((item: any) => {
        setSelectedItem(item.id)
        setTitle(item.title)
        setAuthor(item.author)
        setPrice(item.price)
    }, []);

    const handleUpdateTransaction = useCallback(() => {
        updateRecord(selectedItem, title, author, price)
        setSelectedItem('')
        setTitle('')
        setAuthor('')
        setPrice('')
    }, [author, price, selectedItem, title]);

    const handleAdd = useCallback(() => {
        addRecord(title, author, price)
        setSelectedItem('')
        setTitle('')
        setAuthor('')
        setPrice('')
    }, [author, price, title]);

    const handleRemove = useCallback((id:any) => {
        removeItem(id)
    }, []);

    

    return <div>
        <div>
            <button onClick={openDb}>Create DB</button>
            <button onClick={dropDb}>Drop DB</button>
        </div>
        <div>
            <button onClick={createTable}>Create table</button>
        </div>
        <div>
            Title: <input type="text"  value={title} onChange={e => setTitle(e.target.value)}/>
            Author: <input type="text"  value={author} onChange={e => setAuthor(e.target.value) }/>
            Price: <input type="number"  value={price} onChange={e => setPrice(e.target.value) }/>
            <button onClick={() => handleAdd()} disabled={!!selectedItem}>Create new record</button>
            <button onClick={() => handleUpdateTransaction()} disabled={!selectedItem}>Update record</button>
        </div>
        <div>
            <button onClick={handleShowData}>Show Records</button>
            <h3>RECORDS</h3>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>
                {data.map(x => (
                    <tr key={x.id}>
                        <th>{x.title}</th>
                        <th>{x.author}</th>
                        <th>{x.price}</th>
                        <th><button onClick={() => handleRemove(x.id)}>Remove</button></th>
                        <th><button onClick={() => handleUpdate(x)}>Update</button></th>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
} 