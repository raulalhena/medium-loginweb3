import './MetamaskConnection.css';
import React, { useEffect, useState } from 'react';
import SnackbarMessage from '../SnackbarMessage/SnackbarMessage';
import { SnackbarMessageProps } from '../../interfaces/snackbarMessage';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';


const MetamaskConnection = () => {

  const navigate = useNavigate();

  const [ isMetamask, setIsMetamask ] = useState(false);

  useEffect(() => {
    if(window.ethereum) {
      showMessage({ severity: 'success', text: 'Metamask detected!' });
      setIsMetamask(true);
    } else {
      showMessage({ severity: 'error', text: 'Metamask not detected. Is it installed?' });
    }
  }, []);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<SnackbarMessageProps>({
    severity: '',
    text: ''
  });

  const showMessage = (message) => {
    setMessage(message)
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const request = async ( url, options ) => {
    const resp = await fetch(url, options);
    const result = await resp.json();

    return result;
  };

  const signIn = async (address: string, signer: ethers.JsonRpcSigner) => {
    try{
      const requestData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
      };

      const nonceData = {
          address: address
      };

      const nonceOptions = {
          ...requestData,
          body: JSON.stringify(nonceData)
      };

      const nonce = await request( 'http://localhost:3000/api/users/nonce', nonceOptions );
      console.log('NONCE', nonce)

      const userData = {
          address: address,
          signature: await signer.signMessage(String(nonce))
      };

      const userOptions = {
          ...requestData,
          body: JSON.stringify(userData)
      };

      const user = await request( 'http://localhost:3000/api/users/signin', userOptions );
      console.log('user ', user);

      if(user.isSignedIn) return true;
      return false;
    } catch(error) {
      throw new Error(error.message);
    }
  }

  const [ provider, setProvider ] = useState<ethers.Provider>();
  const [ account, setAccount ] = useState<ethers.Signer.account>();
  const [ isConnected, setIsConnected ] = useState<boolean>(false);

  const login = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer?.getAddress();

      setProvider(provider);
      setAccount(address);

      const isSignedIn = await signIn(address, signer);
      if(isSignedIn){
        setIsConnected(true);
        showMessage({ severity: 'success', text: `Loging success with: ${address}` });
      } else {
        showMessage({ severity: 'error', text: `Loging failed!` });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const connect = () => {
    if(isMetamask) {
      login();
    } else {
      showMessage({ severity: 'error', text: 'Metamask not detected. Install it first.' });
    }
  };

  const logout = () => {
    setIsConnected(false);
    provider.destroy();
    showMessage({ severity: 'warning', text: `Metamask disconnected: ${account}`});
  };

  const goDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      {!isConnected ?
        <button className='login-button' onClick={connect}>Login with wallet</button>
        :
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <button className='login-button' onClick={goDashboard}>Go Dashboard</button>
          <button className='login-button' onClick={logout}>Logout</button>
        </div>
      }
      <SnackbarMessage message={message} open={open} handleClose={handleClose}/>
    </div>
  )
}

export default MetamaskConnection