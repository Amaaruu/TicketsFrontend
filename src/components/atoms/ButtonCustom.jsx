import { Button } from 'react-bootstrap';

const ButtonCustom = ({ children, variant = "primary", onClick, type = "button", ...props }) => {
  return (
    <Button 
      variant={variant} 
      onClick={onClick} 
      type={type} 
      {...props}
      className="shadow-sm"
    >
      {children}
    </Button>
  );
};

export default ButtonCustom;