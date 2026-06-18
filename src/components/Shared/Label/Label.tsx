import { ReactNode } from "react";

interface LabelProps{
    children: ReactNode;
}

export const Label = ({ children }: LabelProps) =>{
    return(
        <div className="w-24 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
            { children }
        </div>
    )
}