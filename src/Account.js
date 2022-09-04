import { Button } from '@chakra-ui/react';
import { getAuth, signOut } from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Account = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const signout = () => {
    setLoading(true);
    setTimeout(() => {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          setLoading(false);
          navigate('/');
        })
        .catch(error => {
          // An error happened.
        });
    }, 1000);
  };

  return (
    <div>
      {/* <div>Account</div> */}
      Logged in as {user.email}
      <br />
      <br />
      <Button isLoading={loading} loadingText="Signing out" onClick={signout}>
        Logout
      </Button>
    </div>
  );
};
export default Account;
