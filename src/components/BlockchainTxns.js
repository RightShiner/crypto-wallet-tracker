
import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import '../App.css';
import uuid from 'uuid';
import WalletAddressForm from './WalletAddressForm'
import {apiKEY} from '../keys';
import {rpcURL} from '../keys';
import {convertedDate} from './helpers';
import {convertedValue} from './helpers';

import { submit } from '../actions/walletActions';

const Web3 = require('web3');
const web3 = new Web3(rpcURL);

let user = `Anonymous`;

const BlockchainTxns = () => {
    const [txns, setTxns] = useState([]);
    const address = useSelector(state => state.wallet.address);
    const lastAddress = useSelector(state => state.wallet.lastAddress);
    const walletData = useSelector(state => state.wallet.walletData);
    
    // console.log('This is walletData')
    // console.log(walletData)
    const dispatch = useDispatch();

    // console.log(address)//Don't forget to delete
    useEffect(() => {
        //*componentDidUnmount - clean up function
        //   return () => {
        //     effect
        //   };
        console.log(`useEffect`);
        console.log(walletData);
        console.log(address);//Don't forget to delete

        // setBlockchainTxns(walletData => walletData)
        })

    let fetchWalletData = async (e, input) => {
        try {
            console.log(e.target.className)
            // className="Address-Button 0"
            // Hello there => ["Address-Button", "0"]
            const classArray = e.target.className.split(" ");
            // console.log(classArray[classArray.length - 1]);
            // 0
            const whaleAddressIndex = classArray[classArray.length - 1];
            const whaleAddress = address[whaleAddressIndex];
            let url=""
            switch(input){
                case "url100":
                    url = `https://api.etherscan.io/api?module=account&action=txlist&address=${whaleAddress}&startblock=0&endblock=99999999&page=1&offset=100&sort=des&apikey=${apiKEY}`;
                break;
                
                case "ERC20":
                    url = `https://api.etherscan.io/api?module=account&action=tokentx&address=${whaleAddress}&startblock=0&endblock=99999999&page=1&offset=1000&sort=des&apikey=${apiKEY}`;
                break;

                case "NFTS":
                    url = `https://api.etherscan.io/api?module=account&action=tokennfttx&address=${whaleAddress}&startblock=0&endblock=999999999&page=1&offset=1000&sort=des&apikey=${apiKEY}`;
                break;

                default:
                    break;
            }

            const response = await fetch(url); //api call for symbol information
            const walletData = await response.json();
            // console.log(walletData);
            if(walletData.message !== 'OK'){
            
            alert(`${walletData.message} for address ${whaleAddress}.  Please try again!`)
            }
            else {
            // console.log(walletData); //console.log api object
            dispatch(submit(whaleAddress, walletData));
            }
        }
        catch(err) {
            alert(err);
        }
    }

    // for testing only - getting the actual date from a timestamp
    // let convertedDate = (blockNumber) => {
    //     let blockInfo = web3.eth.getBlock(blockNumber, async (error, block) => {
    //         let timestamp = await block.timestamp;
    //         let date = (timestamp * 1000);
    //         date = new Date (date);
    //         // console.log(`Date ${date}`)
    //         // return date;
    //     })
    // }

    return (
        <>
    <div>
        <div className="content">
          <div className="vertical-split">
            <div className="card bg-dark text-white">
              <div className="card-header">Welcome {`${user}`}</div>
              <div className="card-body">
                <WalletAddressForm />
                <p>
                  Enter a valid Ethereum wallet. Each wallet you enter is saved below and you can add and delete them as you wish. You can then do other types of searches for the wallets saved.<br /><br />
                  The initial display is based on a wide search of the blockchain and up-to 100 results max.<br /><br />
                  Invalid entries will not be saved.
                </p>
              </div>
            </div>
            <div className="card bg-dark text-white">
              <div className="card-header">Saved Whale Addresses</div>
              <div className="card-body">
              <div className="address-list"><br />
                  {/* begin mapping whale wallet address list */}
                  <div className="card-body address-list"> {address.map((addressNumber, index) => {
                    return <>
                      <div className="address-list">
                        <h6 >{addressNumber}</h6>
                        {/* other api call buttons and delete button */}
                        <button className={`address-buttons ${index}`} onClick={(e)=>fetchWalletData(e, "url100")}>Txns</button>
                        <button className={`address-buttons ${index}`} onClick={(e)=>fetchWalletData(e, "ERC20")}>ERC20</button>
                        <button className={`address-buttons ${index}`} onClick={(e)=>fetchWalletData(e, "NFTS")}>NFTS</button>
                        <button className={`address-buttons`}>Del</button>
                      </div>
                      <br />
                      </>;
                    })} 
                  </div>
                  {/* end mapping whale wallet address list */}
              </div>
              </div>
            </div>
          </div>
          <div className="vertical">
            <div className="card bg-dark text-white">
                <div className="card-header">Blockchain Transactions for wallet address :<span>{<text> {lastAddress}</text> }</span>
                    <div className="d-flex flex-row blockchain-txns-header">
                        <div className="flex-fill p-2">Hash</div>
                        <div className="flex-fill p-2">Block Number</div>
                        <div className="flex-fill p-2">Time Stamp</div>
                        <div className="flex-fill p-2">From</div>
                        <div className="flex-fill p-2">To</div>
                        <div className="flex-fill p-2">Value</div>
                    </div>
                </div>
                {/* begin mapping walletData Blockchain Txns */}
                <div className="card-body d-flex flex-column"> {walletData.map(walletData => {
                    return <>
                        <div className="d-flex flex-row blockchain-txns">
                          <div className="flex-fill p-2">{`${walletData.hash}`}</div>
                          <div className="flex-fill p-2">{`${walletData.blockNumber}`}</div>
                          <div className="flex-fill p-2">{convertedDate(walletData.timeStamp)}</div>
                          <div className="flex-fill p-2">{`${walletData.from}`}</div>
                          <div className="flex-fill p-2">{`${walletData.to}`}</div>
                          <div className="flex-fill p-2">{`${convertedValue(walletData.value)}`}</div>
                        </div>
                      </>;
                    })}
                    {/* end mapping walletData Blockchain Txns */}
                </div>
            </div>
          </div>
        </div>
      </div>

        </>
    )
};

export default BlockchainTxns;