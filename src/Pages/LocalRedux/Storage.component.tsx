import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveName, saveValue } from "../../store/st";

export const ReduxPage: FC = () => {
    const [value, setValue] = useState<string>('');
    const [name, setName] = useState<string>('');
    const state = useSelector((state: any) => state.local)
    const dispatch = useDispatch()
  
    return (
      <div>
        <div>
            Value: <input type="number" value={value} onChange={e => setValue(e.target.value)} />
          <button
            onClick={() => dispatch(saveValue(value))}
          >
            Save
          </button>
          Value: {state.value}
        </div>
        <div>
            Name: <input type="string" value={name} onChange={e => setName(e.target.value)} />
          <button
            onClick={() => dispatch(saveName(name))}
          >
            Save
          </button>
          Name: {state.name}
        </div>
      </div>
    )
} 