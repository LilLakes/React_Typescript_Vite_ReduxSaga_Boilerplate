import "./CustomButton.css"
import { CustomButtonProps } from "./CustomButton.types";

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, children }) => {
    return (
        <button className="customButton" onClick={onClick}>
            {children}
        </button>
    )
} 

export default CustomButton;