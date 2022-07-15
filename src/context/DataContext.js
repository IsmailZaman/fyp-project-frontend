import { createContext, useState } from "react";

export const DataContext = createContext()

const DataContextProvider = ({children})=>{
    const [globalData, setGlobalData] = useState({
        feedback: {
            success: false,
            successMsg: ''
        },
        update: false
    })


    const updateData = (field, updatedValue) =>{
        globalData[field] = updatedValue
        setGlobalData({...globalData})
    }

    return (
        <DataContext.Provider value ={{...globalData,updateData}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider
