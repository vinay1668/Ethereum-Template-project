import './App.css';

import { useState } from 'react';
import { ethers } from 'ethers'
import MakeMeLaugh from './artifacts/contracts/MakeMeLaugh.sol/MakeMeLaugh.json'


const makemelaughAddress = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"


function App() {
  var allJokes=[];

  allJokes.push({id: 3, joke:"I ate a clock yesterday, it was very time-consuming.", ethersent: 5});
  allJokes.push({id: 5, joke:"Have you played the updated kids' game? I Spy With My Little Eye . . . Phone.", ethersent: 8});
  allJokes.push({id: 5, joke:"A perfectionist walked into a bar...apparently, the bar wasn’t set high eno", ethersent: 8});
  allJokes.push({id: 5, joke:"Two guys stole a calendar. They got six months each", ethersent: 1});
  allJokes.push({id: 5, joke:"What do you call a bee that can't make up its mind? A Maybe", ethersent: 6});
  
  var allIds=[2,5,6];
  var allEtherSent=[];

  const[text,setText] = useState("")
  const[id,setId] = useState(0);
  const[amount,setAmount]=useState(0);

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const contract = new ethers.Contract(makemelaughAddress, MakeMeLaugh.abi, provider)

 
  async function getAllJokes(){
    if (typeof window.ethereum !== 'undefined') {
      const jokeLen = await contract.jokeLength()
      for(var i=0;i<jokeLen;i++){
        const res = await contract.jokes(i);
        allJokes.push(res.joke);
        allIds.push(res.id.toNumber());
        allEtherSent.push(res.etherSent.toNumber());
      }
      console.log(allJokes);
      console.log(allIds);
      console.log(allEtherSent);

     
    }    

  }

  
  async function jokes() {
    if (typeof window.ethereum !== 'undefined') {
      const data = await contract.jokes(id)
      console.log("Joke:",data.joke);
      console.log("Ether sent", data.etherSent.toNumber());
      console.log("Id", data.id.toNumber());

     
    }    
  }
  async function setJokes() {
    if (!text) return
    if (typeof window.ethereum !== 'undefined') {
      const signer = provider.getSigner()
      const sendContract = new ethers.Contract(makemelaughAddress, MakeMeLaugh.abi, signer)
      const transaction = await sendContract.setJoke(text)
      await transaction.wait()
    }
  }
  async function sendEthers(){
    if (!id) return
    if (typeof window.ethereum !== 'undefined') {
      let overrides = {
        value: ethers.utils.parseEther("1.0")
    }
      const signer = provider.getSigner()
      const sendContract = new ethers.Contract(makemelaughAddress, MakeMeLaugh.abi, signer)
      const transaction = await sendContract.sendEther(id, overrides);
      await transaction.wait()
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <button onClick={jokes}>jokes</button> */}
        {/* <input onChange={e => setId(e.target.value)} placeholder="Get the joke Id" />
        <input onChange={e => setText(e.target.value)} placeholder="set the jokes" />
        <button onClick={setJokes}>Set the joke</button>
        <button onClick={sendEthers}>Send the ether</button> */}
        <div className ="col-sm-8" style={{position:"fixed",top:"150px",left:"200px"}}>
        <textarea  className="form-control" id="" rows="2" placeholder="Your Joke here....."></textarea>
        </div>
        <button type="button" className="btn btn-primary" style={{position:"fixed",top:"150px",left:"1210px",height:"63px",width:"130px"}}>Upload</button>
        <div style={{position:"absolute",left:"100px",top:"300px"}}>
          {allJokes.map((content) => (
            <div style={{display:"flex"}}>
            <button type="button" style={{position:"relative"}} className="btn btn-success">ID:  {content.id}</button>
            <p style={{position:"relative",left: "100px"}} className="text-secondary">{content.joke}</p>
            <p style={{position:"relative",left:"500px"}}>{content.ethersent}</p>
            </div>
          

            
          ))}
        {/* <p style={{textAlign:"left",marginRight:"100px"}} className="text-secondary" >Have you played the updated kids' game? I Spy With My Little Eye . . . Phone.</p>
        <p style={{textAlign:"left",marginRight:"100px"}} className="text-secondary" >Have you played the updated kids' game? I Spy With My Little Eye . . . Phone.</p>
        <p style={{textAlign:"left",marginRight:"100px"}} className="text-secondary" >Have you played the updated kids' game? I Spy With My Little Eye . . . Phone.</p> */}

        </div>
      </header>
    </div>
  );
}

export default App;