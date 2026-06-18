import { ReactNode } from "react";

interface GridProps{
    goToPreviousPage?: () => void;
    goToNextPage?: () => void;
    children: ReactNode
}

export const Grid = ({ children, goToPreviousPage, goToNextPage }: GridProps) =>{
    return(
        <div className="container mx-auto">
            <div className="grid grid-cols-4 gap-3 mx-auto">
                { children }
            </div>
            <div className="flex justify-center mt-4 gap-5">
                { goToPreviousPage && <button onClick={goToPreviousPage}>Previous</button> }
                { goToNextPage && <button onClick={goToNextPage}>Next</button> }
            </div>
        </div>
    )
}