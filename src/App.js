import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import MakeMeLaugh from './artifacts/contracts/MakeMeLaugh.sol/MakeMeLaugh.json'


const makemelaughAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"


function App() {

  // const provider = new ethers.providers.Web3Provider(window.ethereum)
  // const contract = new ethers.Contract(makemelaughAddress, MakeMeLaugh.abi, provider)
  // const signer = provider.getSigner()
  // const sendContract = new ethers.Contract(makemelaughAddress, MakeMeLaugh.abi, signer)


  // jokes();
  // async function jokes() {
  //   if (typeof window.ethereum !== 'undefined') {
  //     const data = await contract.jokes(0)
  //     console.log(data);
     
  //   }    
  // }


  async function jokes() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      console.log({ provider })
      const contract = new ethers.Contract(makemelaughAddress, MakeMeLaugh.abi, provider)
      try {
        const data = await contract.jokes(0)
        console.log('data: ', data)
      } catch (err) {
        console.log("Error: ", err)
      }
    }    
  }

  // async function setGreeting() {
  //   if (!greeting) return
  //   if (typeof window.ethereum !== 'undefined') {
  //     const transaction = await sendContract.setGreeting(greeting)
  //     await transaction.wait()
  //     fetchGreeting()
  //   }
  // }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={jokes}>jokes</button>
      </header>
    </div>
  );
}

export default App;