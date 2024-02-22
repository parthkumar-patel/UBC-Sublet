import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import PropTypes from 'prop-types';

Protected.propTypes = {
  children: PropTypes.node.isRequired 
};

export default function Protected({ children }) {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to='/' />;
  }

  return children;
}


