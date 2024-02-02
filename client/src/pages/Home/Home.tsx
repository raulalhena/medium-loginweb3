import MetamaskConnection from '../../components/MetamaskConnection/MetamaskConnection';

const Home = () => {
  return (
    <div className='main'>
        <img src='/src/assets/loginweb3.png' className='logo'/>
        <MetamaskConnection />
    </div>
  )
}

export default Home;
