

import React from 'react';

const Transactions = (props) => {

  // console.log(props)

  return <div className="d-flex flex-row blockchain-txns">
            {/* <div className="flex-fill p-2 blockchain-txns-hash">{`${walletData.hash}`}</div>
            {showERC20 ? <div className="flex-fill p-2 blockchain-txns-symbol" >  {walletData.tokenSymbol && walletData.tokenSymbol} </div> : null} */}
            {/* {showERC20 ? <div className="flex-fill p-2 blockchain-txns-symbol" > {findLogo(walletData.tokenSymbol)} </div> : null} */}
            {/* {walletData.tokenSymbol && walletData.tokenSymbol} */}
            {/* {findLogo(walletData.tokenSymbol)} */}
            {/* require(`../images/bat.png`) */}
            {/* <div className="flex-fill p-2 blockchain-txns-blocknumber">{`${walletData.blockNumber}`}</div>
            <div className="flex-fill p-2 blockchain-txns-timestamp">{convertedDate(walletData.timeStamp)}</div>
            <div className="flex-fill p-2 blockchain-txns-from">{`${walletData.from}`}</div>
            <div className="flex-fill p-2 blockchain-txns-to">{`${walletData.to}`}</div>
            <div className="flex-fill p-2 blockchain-txns-value">{`${convertedValue(walletData.value)}`}</div> */}
          </div>
      {/* end mapping walletData Blockchain Txns */}
}

export default Transactions