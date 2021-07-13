const BigInt = require("big-integer");

class MadNetAdapter {
    constructor(cb, wallet, provider) {
        this.cb = cb;
        this.wallet = wallet;
        this.provider = provider;
        this.connected = false;
        this.MaxDataStoreSize = 2097152;
        this.BaseDatasizeConst = 376;

        // Block explorer panel
        this.blocksRetry = 0;
        this.blocksMaxLen = 10;
        this.blocks = [];
        this.blocksStarted = false;
        this.currentBlock = 0;
        this.blocksLocked = false;
        this.blocksId = false;

        // Tx explorer panel
        this.transactionRetry = 0;
        this.transactionHash = false;
        this.transaction = false;
        this.transactionHeight = false;

        // DataStore explorer panel
        this.dsRetry = 0;
        this.dsRedirected = false;
        this.dsSearchOpts = { "address": "", "offset": "", "bnCurve": false };
        this.dsDataStores = [];
        this.dsActivePage = 1;
        this.dsView = [];
        this.DataPerPage = 5;
        this.dsLock = false;
    }

    // Initialize the adapter
    async init() {
        try {
            await this.cb.call(this, "wait", "Connecting to Mad Network");
            await this.wallet.Rpc.setProvider(this.provider)
            this.connected = true;
            await this.cb.call(this, "success")
        }
        catch (ex) {
            await this.cb.call(this, "error", String(ex));
        }
    }

    // Monitor new blocks, lazy loading
    async monitorBlocks() {
        if (!this.blocksStarted) {
            await this.cb.call(this, "wait", "Getting Blocks");
            this.blocksStarted = true;
        }
        try {
            if (this.blocksLocked) {
                return;
            }
            this.blocksLocked = true;
            try {
                let tmpBlocks = this.blocks ? this.blocks.slice(0) : []
                let currentBlock = await this.wallet.Rpc.getBlockNumber();
                if (this.currentBlock !== currentBlock) {
                    let blockDiff = (currentBlock - this.currentBlock);
                    if (blockDiff > this.blocksMaxLen) {
                        blockDiff = this.blocksMaxLen;
                    }
                    for (let i = 0; i < blockDiff; i++) {
                        let blockHeader = await this.wallet.Rpc.getBlockHeader(currentBlock - ((blockDiff - i) - 1));
                        tmpBlocks.unshift(blockHeader);
                    }
                    this.currentBlock = currentBlock;
                    this.blocks = tmpBlocks;
                }
                tmpBlocks = tmpBlocks.slice(0, this.blocksMaxLen);
                this.blocks = tmpBlocks;
                await this.backOffRetry("monitorBlocks", true)
            }
            catch (ex) {
                console.log(ex)
                await this.backOffRetry("monitorBlocks")
                if (this["monitorBlocks-attempts"] > 10) {
                    await this.cb.call(this, "error", String("Could not update latest block"));
                    return
                }
            }
            await this.cb.call(this, "success")
            this.blocksLocked = false
            this.blocksId = setTimeout(() => { try { this.monitorBlocks() } catch (ex) { console.log(ex) } }, this["monitorBlocks-attempts"] == 1 ? 5000 : this["monitorBlocks-timeout"]);
        }
        catch (ex) {
            await this.cb.call(this, "error", String(ex));
        }
    }

    // Reset block monitor
    async blocksReset() {
        clearTimeout(this.blocksId);
        this.blocks = [];
        this.blocksStarted = false;
        this.currentBlock = 0;
        this.blocksLocked = false;

    }

    // Get block for modal
    async viewBlock(height) {
        await this.cb.call(this, "wait", "Getting Block");
        try {
            let blockHeader = await this.wallet.Rpc.getBlockHeader(height);
            this.blockInfo = blockHeader;
            await this.cb.call(this, "view", 'block');
            this.blocksRetry = 0;
            await this.backOffRetry("vB", true);
            return blockHeader;
        }
        catch (ex) {
            await this.backOffRetry("vB");
            if (this['vB-attempts'] > 10) {
                await this.cb.call(this, "error", String(ex));
                return
            }
        }
        await this.sleep(this["vB-timeout"])
        this.viewBlock(height)
    }

    // Get block for modal
    async viewBlockFromTx(txHash) {
        await this.cb.call(this, "wait", "Getting Block");
        try {
            let txHeight = await this.wallet.Rpc.getTxBlockHeight(txHash);
            this.transactionHeight = txHeight;
            let blockHeader = await this.wallet.Rpc.getBlockHeader(txHeight);
            this.blockInfo = blockHeader;
            await this.cb.call(this, "view", 'block');
            await this.backOffRetry("viewBlock", true)
            return blockHeader;
        }
        catch (ex) {
            await this.backOffRetry("viewBlock")
            if (this["viewBlock-attempts"] > 10) {
                await this.cb.call(this, "error", String(ex));
                return
            }
        }
        await this.sleep(this["viewBlock-timeout"])
        this.viewBlockFromTx(txHash);
    }

    // Get transaction for txExplorer
    async viewTransaction(txHash, changeView) {
        await this.cb.call(this, "wait", "Getting Transaction");
        try {
            this.transactionHash = txHash;
            if (txHash.indexOf('0x') >= 0) {
                txHash = txHash.slice(2);
            }
            let Tx = await this.wallet.Rpc.getMinedTransaction(txHash);
            this.transaction = Tx["Tx"];
            let txHeight = await this.wallet.Rpc.getTxBlockHeight(txHash);
            this.transactionHeight = txHeight;
            this.transactionRetry = 0;
            await this.backOffRetry('viewTx, true')
            if (changeView) {
                await this.cb.call(this, "view", "tx");
            }
            else {
                await this.cb.call(this, "success");
            }
        }
        catch (ex) {
            await this.backOffRetry('viewTx')
            if (this["viewTx-attempts"] > 10) {
                this.transactionHash = false;
                this.transactionHeight = false;
                this.transaction = false;
                await this.cb.call(this, "error", String(ex));
            }
            await this.sleep('viewTx-timeout')
            this.viewTransaction(txHash, changeView)
        }
    }

    async backOffRetry(fn, reset) {
        if (reset) {
            this[String(fn) + "-timeout"] = 1000;
            this[String(fn) + "-attempts"] = 1
            return
        }
        if (!this[String(fn) + "-timeout"]) {
            this[String(fn) + "-timeout"] = 1000;
        }
        else {
            this[String(fn) + "-timeout"] = Math.floor(this[String(fn) + "-timeout"] * 1.25);
        }
        if (!this[String(fn) + "-attempts"]) {
            this[String(fn) + "-attempts"] = 1
        }
        else {
            this[String(fn) + "-attempts"] += 1;;
        }
    }

    async getDSExp(data, deposit, issuedAt) {
        try {
            let dataSize = Buffer.from(data, "hex").length;
            if (BigInt(dataSize) > BigInt(this.MaxDataStoreSize)) {
                throw "Data size is too large"
            }
            let epoch = BigInt("0x" + deposit) / BigInt((BigInt(dataSize) + BigInt(this.BaseDatasizeConst)))
            if (BigInt(epoch) < BigInt(2)) {
                throw "invalid dataSize and deposit causing integer overflow"
            }
            let numEpochs = BigInt(BigInt(epoch) - BigInt(2));
            let expEpoch = (BigInt(issuedAt) + BigInt(numEpochs));
            return expEpoch;
        }
        catch (ex) {
            return false;
        }
    }

    async addTxOut(txOut) {
        try {
            this.txOuts.push(txOut)
            await this.cb.call(this, "success");
        }
        catch (ex) {
            await this.cb.call(this, "error", String(ex));
        }
    }

    async setTxOuts(txOuts) {
        try {
            this.txOuts = txOuts;
            await this.cb.call(this, "success");
        }
        catch (ex) {
            await this.cb.call(this, "error", String(ex));
        }
    }

    async setChangeAddress(changeAddress) {
        try {
            this.changeAddress = changeAddress;
            await this.cb.call(this, "success");
        }
        catch (ex) {
            await this.cb.call(this, "error", String(ex));
        }
    }

    async setDsSearchOpts(searchOpts) {
        try {
            this.dsSearchOpts = searchOpts;
            await this.cb.call(this, "success");
        }
        catch (ex) {
            await this.cb.call(this, "error", String(ex));
        }
    }

    async setDsDataStores(DataStores) {
        try {
            this.dsDataStores = this.dsDataStores.concat(DataStores)
            await this.cb.call(this, "success");
        }
        catch (ex) {
            await this.cb.call(this, "error", String(ex));
        }
    }

    async setDsActivePage(activePage) {
        try {
            this.dsActivePage = activePage;
            await this.cb.call(this, "success");
        }
        catch (ex) {
            await this.cb.call(this, "error", String(ex));
        }
    }

    async setDsView(dsView) {
        try {
            this.dsView = dsView;
            await this.cb.call(this, "success");
        }
        catch (ex) {
            await this.cb.call(this, "error", String(ex));
        }
    }

    // Get data from the RPC
    async getData(index, page, submit) {
        this.dsLock = true;
        try {
            await this.cb.call(this, "wait", "Getting Datastores...");
            let dataStores = false;
            if (index && index !== "" && submit) {
                let max = (this.DataPerPage)
                for (let i = max; i > 0; i--) {
                    let attempt = await this.wallet.Rpc.getDataStoreUTXOIDs(this.dsSearchOpts["address"], (this.dsSearchOpts["bnCurve"] ? 2 : 1), i, index)
                    if (attempt && attempt.length > 0) {
                        dataStores = attempt;
                        if (i !== 1) {
                            let queryObj = await this.wallet.Rpc.getDataStoreUTXOIDs(this.dsSearchOpts["address"], (this.dsSearchOpts["bnCurve"] ? 2 : 1), 1, index)
                            dataStores.unshift(queryObj[0]);
                        }
                        break;
                    }
                }
            }
            else {
                dataStores = await this.wallet.Rpc.getDataStoreUTXOIDs(this.dsSearchOpts["address"], (this.dsSearchOpts["bnCurve"] ? 2 : 1), (this.DataPerPage + 1), index)
            }
            if (!dataStores) {
                this.dsLock = false;
                await this.cb.call(this, "success");
                return;
            }
            let UTXOIDS = []
            for (let i = 0; i < dataStores.length; i++) {
                UTXOIDS.push(dataStores[i]["UTXOID"])
            }
            let DStores = await this.wallet.Rpc.getUTXOsByIds(UTXOIDS)
            if (!submit) {
                let DS = this.dsDataStores.concat(DStores[0]);
                await this.setDsView(DS.slice(((page - 1) * this.DataPerPage), ((((page - 1) * this.DataPerPage) + this.DataPerPage))))
                await this.setDsDataStores(DStores[0])
            }
            else {
                await this.setDsView(DStores[0].slice(((page - 1) * this.DataPerPage), ((((page - 1) * this.DataPerPage) + this.DataPerPage))))
                this.dsDataStores = DStores[0];
            }
            this.dsLock = false;
            await this.cb.call(this, "success");
        }
        catch (ex) {
            this.dsLock = false;
            await this.cb.call(this, "error", String(ex));
        }
    }

    // Trim txHash for readability
    trimTxHash(txHash) {
        try {
            let trimmed = "0x" + txHash.substring(0, 6) + "..." + txHash.substring(txHash.length - 6)
            return trimmed
        }
        catch (ex) {
            throw String(ex)
        }
    }

    // Hex to integer
    hexToInt(hex) {
        try {
            let bInt = BigInt(hex, 16);
            return bInt.toString();
        }
        catch (ex) {

        }
    }

    // Delay for the monitor
    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
export default MadNetAdapter;