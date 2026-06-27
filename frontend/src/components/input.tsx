export default function Input({Label,placeholder,onChange}:{Label:string,placeholder:string,onChange:(e: React.ChangeEvent<HTMLInputElement>) => void}){
    return(
        <div>
           <div className="text-xl font-bold py-2 px-2 bg-blue-200 border-rounded ">
            {Label}
            <input onChange={onChange} type="text" placeholder={placeholder} className="w-full px-2 py-1
            border-rounded " />
           </div>
        </div>
    )
} 