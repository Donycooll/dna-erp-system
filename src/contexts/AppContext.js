import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import SnackBar from "../components/SnackBar";

const AppContext = createContext()

export const AppProvider = ({children}) => {

    const [openSnack, setOpenSnack] = useState(false)
    const [snackMessage, setSnackMessage] = useState('')
    const [severity, setSeverity] = useState('success')

    const showHideSnack = (message, severity) => {
        setSeverity(severity)
        setSnackMessage(message)
        setOpenSnack(true)
        setTimeout(() => {
                setOpenSnack(false)
                setSnackMessage('')
            }
        , 2000)
    }

    const [prevCus, setPrevCus] = useState([])

    const getCus = useEffect(() => {
        if(localStorage.getItem('customers')) {
            setPrevCus(JSON.parse(localStorage.getItem('customers')))
        } else if(localStorage.getItem('operations')) {
            const op = JSON.parse(localStorage.getItem('operations'))
            const cusList = []
            op.forEach(o => {
                cusList.push(...o.passengersNames)
            })
            const excistingNames = new Set(cusList)
            const finalCusList = [...excistingNames].map((cus) => {
                return {id: uuidv4(), name:cus}
            })
            localStorage.setItem('customers', JSON.stringify(finalCusList))
            setPrevCus(finalCusList)
        }
    }, [])


    const [procedures] = useState([
        {id: 1, type:'تذكرة طيران'},
        {id: 2, type:'تذكرة باخرة'},
        {id: 3, type:'كرت حمى صفراء'},
        {id: 4, type:'إقامة كويت'},
        {id: 5, type:'زيارة عائلية'},
        {id: 6, type:'رخصة دولية'},
        {id: 7, type:'إتمام تأشيرة السعودية'},
        {id: 8, type:'تذكرة باص سياحي'},
        {id: 9, type:'الشحن'},
        {id: 10, type:'سداد ايصال'},
        {id: 11, type:'توثيقات'},
    ]);

    const [destinations] = useState([
        { id: "ADD", name: "أديس أبابا" },
        { id: "ASM", name: "أسمرا" },
        { id: "AUH", name: "أبوظبي" },
        { id: "DXB", name: "دبي" },
        { id: "SHJ", name: "الشارقة" },
        { id: "EBB", name: "عنتيبي / كامبالا" },
        { id: "IST", name: "إسطنبول" },
        { id: "JUB", name: "جوبا" },
        { id: "WUU", name: "واو" },
        { id: "KGL", name: "كيغالي" },
        { id: "AHB", name: "أبها" },
        { id: "JED", name: "جدة" },
        { id: "DMM", name: "الدمام" },
        { id: "RUH", name: "الرياض" },
        { id: "MED", name: "المدينة المنورة" },
        { id: "PZU", name: "بورتسودان" },
        { id: "KRT", name: "الخرطوم" },
        { id: "ATB", name: "عطبرة" },
        { id: "DOG", name: "دنقلا" },
        { id: "KSL", name: "كسلا" },
        { id: "MCT", name: "مسقط" },
        { id: "DOH", name: "الدوحة" },
        { id: "KWI", name: "الكويت" },
        { id: "NBO", name: "نيروبي" },
        { id: "CAI", name: "القاهرة" },
        { id: "HRG", name: "الغردقة" }
    ])

    const [providers] = useState([
        {id: '1', name:'بدر'},
        {id: '2', name:'تاركو'},
        {id: '3', name:'سودانير'},
        {id: '4', name:'جودي'},
        {id: '5', name:'تاركو البحرية'},
        {id: '6', name:'واسا'},
    ])

    const [operations, setOperations] = useState([
        {id: uuidv4(),
            procedure:null,
            peopleCount:null,
            date:null,
            creationDate:new Date(),
            phone:null,
            from:null,
            to:null,
            provider:null,
            financials: {
                cost:null,
                profit:null,
                isPaid:false
            },
            customers:[],
            notes:null,
        }
    ]);

    const addOperation = (operation) => {
        const newOperation = {...operation, id: uuidv4(), creationDate: new Date()}
        setOperations([...operations, newOperation])

        setPrevCus(JSON.parse(localStorage.getItem('customers')))
        const newCusList = []
        operation.passengersNames
        .filter((name) => (
            !prevCus.some(obj => obj.name === name)
        ))
        .forEach((c) => newCusList.push({id: uuidv4(), name:c}))



        if(localStorage.getItem('operations')) {
            const storedOperations = JSON.parse(localStorage.getItem('operations'))
            localStorage.setItem('operations', JSON.stringify([newOperation, ...storedOperations]))
            localStorage.setItem('customers', JSON.stringify([...newCusList, ...prevCus]))
        } else {
            localStorage.setItem('operations', JSON.stringify([newOperation]))
            localStorage.setItem('customers', JSON.stringify(newCusList))
        }
    }


    return (
        <AppContext.Provider value={{
            showHideSnack,
            prevCus,
            setPrevCus,
            getCus,
            procedures,
            operations,
            addOperation,
            providers,
            destinations}}
            >
                {children}
                <SnackBar message={snackMessage} open={openSnack} severity={severity}/>
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
} 