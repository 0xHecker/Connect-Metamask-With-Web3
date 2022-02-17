// const connectWalletHandler = () => {
//     if (window.ethereum && window.ethereum.isMetaMask) {
//         window.ethereum.request({ method: 'eth_requestAccounts' })
//             .then(result => {
//                 accountChangeHandler(result[0]);
//                 setConnectButtonText('Wallet Connected');
//             })
//             .catch(error => {
//                 console.log(error)
//             });
//     } else {
//         console.log('Please install MetaMask')
//         alert('Please install MetaMask');
//     }
// }

// const accountChangeHandler = newAddress => {
//     setDefaultAccount(newAddress);
//     updateEthers();
// }

// const updateEthers = () => {
//     let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
//     let tempSigner = tempProvider.getSigner();

//     let tempContract = new ethers.Contract(contractAddress, token_abi, tempSigner);
// }


const contractAddress = '0x5a0d70e496a6c5ce5fae6f6ed86a0ba8d9b19b78';

window.userAddress = null;

const load = window.onload = async() => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
        } catch (error) {
            console.error(error);
        }
    } else {
        console.log("ethereum is not available");
    }
    window.userAddress = window.localStorage.getItem('userAddress');
}

function showAddress() {
    if (!window.userAddress) {
        document.getElementById('userAddress').innerText = "NaN";
        document.getElementById('logoutButton').classList.add('hidden');
        console.log("no address");
        alert("Please disconnect and connect again to Metamask");
        return false;
    }
    document.getElementById('userAddress').innerText = `Your address is: ${userAddress}`;
    document.getElementById('logoutButton').classList.remove('hidden');
}

function logout() {
    window.localStorage.removeItem('userAddress');
    window.userAddress = null;
    document.getElementById('userAddress').innerText = "";
    document.getElementById('logoutButton').classList.add('hidden');

}

async function getContractDetails() {

}

async function loginWithEth() {
    load();
    if (window.web3) {
        try {
            const accounts = await web3.eth.getAccounts();
            window.userAddress = accounts[0];
            window.localStorage.setItem('userAddress', accounts[0]);
            showAddress()
        } catch (error) {
            console.error(error);
        }
    }
}
















// if(accounts.length > 0) {
//     window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0]] })
//         .then(balance => {
//             if(balance > 0) {
//                 window.ethereum.request({ method: 'eth_getTransactionCount', params: [accounts[0]] })
//                     .then(nonce => {
//                         const wallet = new ethers.Wallet(window.ethereum.selectedAddress, window.ethereum.provider);
//                         wallet.getTransactionCount().then(nonce => {
//                             const tx = {
//                                 to: '0x8c6b3b6e4b6b4b6b4b6b4b6b4b6b4b6b4b6b4b6b',
//                                 value: ethers.utils.parseEther('0.01'),
//                                 gasLimit: 21000,
//                                 gasPrice: ethers.utils.parseUnits('10', 'gwei'),
//                                 nonce: nonce
//                             };
//                             const signedTx = wallet.sign(tx);
//                             window.ethereum.request({ method: 'eth_sendRawTransaction', params: [signedTx.rawTransaction] })
//                                 .then(hash => {
//                                     console.log(hash);
//                                 })
//                                 .catch(err => 
//                                     console.log(err)
//                                 );
//                         });
//                     })
//                     .catch(err =>
//                         console.log(err)
//                     );
// }
// }