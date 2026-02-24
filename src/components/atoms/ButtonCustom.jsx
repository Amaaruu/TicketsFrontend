import { Button } from 'react-bootstrap';
import '../../styles/components/atoms/ButtonCustom.css'; // <-- Ruta actualizada

const ButtonCustom = ({ children, variant = "primary", onClick, type = "button", className = "", ...props }) => {
  const customClass = variant === 'primary' ? 'btn-custom-primary' : '';

  return (
    <Button 
      variant={variant} 
      onClick={onClick} 
      type={type} 
      {...props}
      className={`shadow-sm ${customClass} ${className}`}
    >
      {children}
    </Button>
  );
};

export default ButtonCustom;