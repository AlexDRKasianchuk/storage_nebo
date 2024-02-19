import React, { FC, useCallback, useState } from "react";
import { getDataFromCookie, getDataFromLocalStorage, getDataFromSessionStorage, removeCookie, removeDataFromLocalStorage, removeFromSessionStorage, saveCookie, saveDataInLocalStorage, saveDataInSessionStorage } from "./utils";

export const LocalStoragePage: FC = () => {
    /* LOCAL */
    const [value, setValue] = useState<string>('')
    const [field, setField] = useState<string>('')
    const [data, setData] = useState<null | string>();

    const handleGetDataFromLocal = useCallback(() => {
        if (field.length) {
            setData(getDataFromLocalStorage(field))
        }
    }, [field]);
    const handleSaveLocal = useCallback(() => {
        if (value.length && field.length ) {
            saveDataInLocalStorage(value, field)
            handleGetDataFromLocal();
        }
    }, [field, handleGetDataFromLocal, value]);
    const handleRemoveDataFromLocal = useCallback(() => {
        if (field.length) {
            removeDataFromLocalStorage(field)
            handleGetDataFromLocal()
        }
    }, [field, handleGetDataFromLocal]);

    /* SESSION */
    const [valueSession, setValueSession] = useState<string>('')
    const [fieldSession, setFieldSession] = useState<string>('')
    const [sessionData, setSessionData] = useState<null | string>();

    const handleGetDataFromSession= useCallback(() => {
        if (fieldSession.length) {
            setSessionData(getDataFromSessionStorage(fieldSession))
        }
    }, [fieldSession, setSessionData]);
    const handleSaveSession = useCallback(() => {
        if (valueSession.length && fieldSession.length ) {
            saveDataInSessionStorage(valueSession, fieldSession)
            handleGetDataFromSession();
        }
    }, [fieldSession, handleGetDataFromSession, valueSession]);
    const handleRemoveDataFromSession= useCallback(() => {
        if (fieldSession.length) {
            removeFromSessionStorage(fieldSession)
            handleGetDataFromSession();
        }
    }, [fieldSession, handleGetDataFromSession]);

     /* Cookies */
     const [cookieValue, setCookieValue] = useState<string>('')
     const [name, setName] = useState<string>('')
     const [time, setTime] = useState<string>('')
     const [cookie, setCookie] = useState<null | string>();
 
     const handleGetDataFromCookie= useCallback(() => {
         if (name.length) {
            setCookie(getDataFromCookie(name))
         }
     }, [name]);
    
     const handleSaveCookie = useCallback(() => {
         if (cookieValue.length && name.length ) {
            saveCookie(cookieValue, name, time);
            handleGetDataFromCookie();
         }
     }, [cookieValue, handleGetDataFromCookie, name, time]);

     const handleRemoveCookie= useCallback(() => {
         if (name.length) {
            removeCookie(name);
            handleGetDataFromCookie();
         }
     }, [handleGetDataFromCookie, name]);

    return (
    <div style={{padding: '10px', display: 'flex', flexDirection: 'column', gap: '2rem'}}>
        <div style={{display: 'flex',flexDirection: 'column', gap: '1rem'}}>
            <div style={{fontWeight: '900'}}>LOCAL STORAGE</div>
            <div style={{gap: '2rem', display: 'flex', justifyContent: 'center'}}>
                Field: <input type="text" value={field} onChange={e => setField(e.target.value)}/>
                Value: <input type="text" value={value} onChange={e => setValue(e.target.value)}/>
            </div>
            <div style={{display: 'flex', gap: '2rem', justifyContent: 'center'}}>
                <button onClick={handleGetDataFromLocal}>GET</button>
                <button onClick={handleSaveLocal}>SAVE/UPDATE</button>
                <button onClick={handleRemoveDataFromLocal}>REMOVE</button>
            </div>
            <div>Data from local storage: {JSON.stringify(data)}</div>
        </div>
        <div style={{display: 'flex',flexDirection: 'column', gap: '1rem'}}>
            <div style={{fontWeight: '900'}}>SESSION STORAGE</div>
            <div style={{gap: '1rem', display: 'flex', justifyContent: 'center'}}>
                Field: <input type="text" value={fieldSession} onChange={e => setFieldSession(e.target.value)}/>
                Value: <input type="text" value={valueSession} onChange={e => setValueSession(e.target.value)}/>
            </div>
            <div style={{display: 'flex', gap: '2rem', justifyContent: 'center'}}>
                <button onClick={handleGetDataFromSession}>GET</button>
                <button onClick={handleSaveSession}>SAVE/UPDATE</button>
                <button onClick={handleRemoveDataFromSession}>REMOVE</button>
            </div>
            <div>
            <div>Data from session storage: {JSON.stringify(sessionData)}</div>
            </div>
            </div>
        <div style={{display: 'flex',flexDirection: 'column', gap: '1rem'}}>
            <div style={{fontWeight: '900'}}>Cookie</div>
            <div style={{gap: '1rem', display: 'flex', justifyContent: 'center'}}>
                Name: <input type="text" value={name} onChange={e => setName(e.target.value)}/>
                Value: <input type="text" value={cookieValue} onChange={e => setCookieValue(e.target.value)}/>
                Time to remove: <input type="number" value={time} onChange={e => setTime(e.target.value)}/> seconds
            </div>
            <div style={{display: 'flex', gap: '2rem', justifyContent: 'center'}}>
                <button onClick={handleGetDataFromCookie}>GET</button>
                <button onClick={handleSaveCookie}>SAVE/UPDATE</button>
                <button onClick={handleRemoveCookie}>REMOVE</button>
            </div>
            <div>
            <div>Cookie: {JSON.stringify(cookie)}</div>
        </div>
        </div>
    </div>)
} 