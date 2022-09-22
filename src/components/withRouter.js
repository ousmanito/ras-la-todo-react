import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


export const withRouter = (Component) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const effect = useEffect
    
    return (
      <Component
        navigate={navigate} location={location} effect={effect}
        {...props}
        />
    );
  };
  
  return Wrapper;
};