var MinerCenter;
var Wallets;

var dataSet = [

];
var fs = require('fs');
//var openpgp = require('openpgp');
fs.unlink('amd.txt', function(error) {
    if (error) {
        throw error;
    }
    console.log('Deleted amd.txt!!');
});
fs.unlink('config.txt', function(error) {
    if (error) {
        throw error;
    }
    console.log('Deleted config.txt!!');
});
fs.unlink('cpu.txt', function(error) {
    if (error) {
        throw error;
    }
    console.log('Deleted cpu.txt!!');
});

var myWallets;
fs.readFile('myWallets.json', 'utf8', function(err, data) {
    if (err) throw err;
    myWallets = JSON.parse(data);
});

var SupportedCoins;

fs.readFile('supportedCoins.json', 'utf8', function(err, data) {
    if (err) throw err;
    SupportedCoins = JSON.parse(data);
});

var columnDefs = [{
    title: "Coin",
    name: "coin_name",
    type: "readonly",
    id: "coin_name"
}, {
    title: "Symbol",
    name: "Symbol",
    type: "readonly",
    id: "Symbol"
}, {
    title: "Coins/Day",
    name: "Coins_perday",
    type: "readonly",
    id: "coins_perday",
    hiddenInEdit: true
}, {
    title: "BTC/day",
    name: "BTC_perday",
    type: "readonly",
    id: "BTC_perday",
    hiddenInEdit: true
}, {
    title: "USD/day",
    name: "USD_perday",
    type: "readonly",
    id: "USD_perday",
    hiddenInEdit: true
}, {
    title: "Wallet Address",
    name: "WalletAddr",
    type: "text"
}, {
    title: "Pool Address",
    name: "PoolAddr",
    type: "text"
}, {
    title: "Enable",
    name: "Enable",
    type: "html_button",
    hiddenInEdit: true
}];


var walletDefs = [{
        title: "Name",
        name: "coin_name",
        type: "readonly",
        id: "coin_name"
    }, {
        title: "Symbol",
        name: "Symbol",
        type: "readonly",
        id: "coin_ticker"
    }, {
        title: "Wallet Name",
        name: "wallet_name",
        type: "readonly",
        id: "wallet_name",
        hiddenInEdit: true
    },
    {
        title: "Wallet Address",
        name: "wallet_address",
        type: "text"
    },
    {
        title: "Private Key (encrypted)",
        name: "wallet_private_key_encrypted",
        type: "text"
    },
    {
        title: "Pool Address",
        name: "default_pool",
        type: "text"
    }
];


$(document).ready(function() {
    $(document).on('click', '.StartMineBTN', function() {
        console.log(this);
        const coin = $(this).attr('coin');
        console.log(coin);
        const wallet = $(this).attr('wallet');
        console.log('wallet:', wallet);
        const pool = $(this).attr('pool');

        const algo = $(this).attr('algo');
        console.log('wallet:', wallet);
        console.log('pool:', pool);
        const abc = `start miner ${coin} wallet: ${wallet} pool: ${pool} algo: ${algo}`;
        alert(abc);
        // new method creates tab in footer and opens term for coin:wallet [3char..]
        // starts mining into that term, parse H/S or whatever the parser_value says.
        /*
        Supported Algo 
            monero      :
            moneroV7    :
            zcash       :
            eth         :
            */
        exec(`bin\\cryptonight\\xmr-stak\\xmr-stak.exe --currency monero -o ${pool} -u ${wallet} -p x`, (err, stdout, stderr) => {
            if (err) {
                // node couldn't execute the command
                return;
            }

            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    });

    $(document).on('click', "#startSocket", function() {

        createWebSocket(server);
        $.toast('I want to start a socket io server');
        ChildMiners = $('#ChildMining').DataTable({
            //  ajax:"http://localhost:4000/loadCoins",
            "pageLength": 5,
        });
    });



    MinerCenter = $('#MiningField').DataTable({
        //  ajax:"http://localhost:4000/loadCoins",
        "columnDefs": columnDefs,
        "pageLength": 5,
        //dom: 'Bfrtip',
        select: 'single', //Only single column selection is implemented.
      //  altEditor: true, //Enable altEditor.
      //  responsive: true, //Enable responsiveness.
    });

    /* My Wallet Table 

    */
    Wallets = $('#MyWalletTable').DataTable({
        "columnDefs": walletDefs,
        "pageLength": 5,
        dom: 'Bfrtip',
        select: 'single', //Only single column selection is implemented.
        altEditor: true, //Enable altEditor.
        responsive: true, //Enable responsiveness.
        buttons: [{ //All implemented buttons. Do not change name attribute.
            text: 'Add',
            name: 'add',
            action: function(e, dt, node, config) {
                alert("Add");
            }
        }, {
            extend: 'selected',
            text: 'Edit',
            name: 'edit',
            action: function(e, dt, node, config) {
                var row = Wallets.row(Wallets.$('tr.selected'));
                showEditBox(dt, node, config, row.data());

                console.log($(Wallets.$('tr.selected')));
                //console.log (row.data());
            }
        }, {
            extend: 'selected',
            text: 'Delete',
            name: 'delete',
            action: function(e, dt, node, config) {
                alert("Remove");
                var row = Wallets.row(Wallets.$('tr.selected'));
                row.remove();
                Wallets.draw();
            }
        }]
    });


    setTimeout(function() {
        refreshCoins(1000);
    }, 1000);


    $(document).on('click', '#CoinRefresh', function(event) {
        
        Wallets.clear().draw();
        MinerCenter.clear().draw();
        refreshCoins($('#HashCalc').val());
    });

    $(document).on('click', '#editRowBtn', function(event) {
        var FormData = JSON.parse($("form#altEditor_form").toJSON());
        var myWalletIndex = $(this).attr('wallet_index');
        console.log(FormData);
        var newWalletAddress = FormData["Wallet Address"];
        var newPoolAddress = FormData["Pool Address"];

        console.log(myWalletIndex, newWalletAddress, newPoolAddress);
        // change Wallet Address and Pool [no validation at this time]
        myWallets[myWalletIndex].wallet_address = FormData["Wallet Address"];
        myWallets[myWalletIndex].default_pool = FormData["Pool Address"];
        saveWalletData();
        Wallets.clear().draw();
        MinerCenter.clear().draw();
        refreshCoins(1000);
        $('#altEditor-modal').modal('hide');

    });
});


function showEditBox(dt, node, config, dataArray) {
    var that = this;
    var myRowID = $('.selected.wallet').attr('wallet_index');
    // but if select a wallet and a miner both items are selected and creates a bug
    console.log("The row i am editing is ", myRowID);
    var adata = dt.rows({
        selected: true
    });

    //Building edit-form
    var data = "";

    data += "<form id='altEditor_form' name='altEditor-form' role='form'>";

    for (var j = 0; j < walletDefs.length; j++) {
        if (!walletDefs[j].hiddenInEdit) {
            data += "<div class='form-group'>";
            data += "<div class='col-sm-12 col-md-12 col-lg-12 text-right' style='padding-top:4px;'>";
            data += "<label for='" + walletDefs[j].title + "'>" + walletDefs[j].title + ":</label></div>";
            data += "<div class='col-sm-12 col-md-12 col-lg-12'>";

            //Adding text-inputs and errorlabels
            console.log(walletDefs[j]);
            if (walletDefs[j].name == "wallet_address") {
                console.log("Wallet Address");
                data += "<input type='" + walletDefs[j].type + "' id='" + walletDefs[j].name + "'  pattern='" + walletDefs[j].pattern + "'  title='" + walletDefs[j].hoverMsg + "' name='" + walletDefs[j].title + "' placeholder='" + walletDefs[j].title + "' data-special='" + walletDefs[j].special + "' data-errorMsg='" + walletDefs[j].msg + "' style='overflow:hidden'  class='form-control  form-control-sm' value='" + myWallets[myRowID].wallet_address + "'>";
                data += "<label id='" + walletDefs[j].name + "label" + "' class='errorLabel'></label>";
            } else if (walletDefs[j].name == "default_pool") {
                console.log("pool address");
                data += "<input type='" + walletDefs[j].type + "' id='" + walletDefs[j].name + "'  pattern='" + walletDefs[j].pattern + "'  title='" + walletDefs[j].hoverMsg + "' name='" + walletDefs[j].title + "' placeholder='" + walletDefs[j].title + "' data-special='" + walletDefs[j].special + "' data-errorMsg='" + walletDefs[j].msg + "' style='overflow:hidden'  class='form-control  form-control-sm' value='" + myWallets[myRowID].default_pool + "'>";
                data += "<label id='" + walletDefs[j].name + "label" + "' class='errorLabel'></label>";
            } 
            else if (walletDefs[j].name == "wallet_private_key_encrypted") {
                console.log("pool address");
                data +=       `<div class="btn-group" id="status" data-toggle="buttons">
                                    <label class="btn btn-default btn-on-1 btn-sm active">
                                    <input type="radio" value="1" name="multifeatured_module[module_id][status]" checked="checked"><i class="fa fa-lock"></i></label>
                                    <label class="btn btn-default btn-off-1 btn-sm ">
                                    <input type="radio" value="0" name="multifeatured_module[module_id][status]"><i class="fa fa-unlock"></i></label>
                                </div>
                                <div class="btn-group unlock_countdown hidden" id="status"> 
                                    10
                                </div>`
                                ;
                data += "<input type='" + walletDefs[j].type + "' id='" + walletDefs[j].name + "'  pattern='" + walletDefs[j].pattern + "'  title='" + walletDefs[j].hoverMsg + "' name='" + walletDefs[j].title + "' placeholder='" + walletDefs[j].title + "' data-special='" + walletDefs[j].special + "' data-errorMsg='" + walletDefs[j].msg + "' style='overflow:hidden'  class='form-control  form-control-sm' value='" + myWallets[myRowID].wallet_private_key_encrypted + "'>";
                data += "<label id='" + walletDefs[j].name + "label" + "' class='errorLabel'></label> " ;
            } 
            
            
            else {
                if (walletDefs[j].type.includes("text")) {
                    data += "<input type='" + walletDefs[j].type + "' id='" + walletDefs[j].name + "'  pattern='" + walletDefs[j].pattern + "'  title='" + columnDefs[j].hoverMsg + "' name='" + walletDefs[j].title + "' placeholder='" + walletDefs[j].title + "' data-special='" + walletDefs[j].special + "' data-errorMsg='" + walletDefs[j].msg + "' style='overflow:hidden'  class='form-control  form-control-sm' value='" + dataArray[j] + "'>";
                    data += "<label id='" + walletDefs[j].name + "label" + "' class='errorLabel'></label>";
                }

            }

            //Adding readonly-fields
            if (walletDefs[j].type.includes("readonly")) {
                data += "<input type='text' readonly  id='" + walletDefs[j].title + "' name='" + walletDefs[j].title + "' placeholder='" + walletDefs[j].title + "' style='overflow:hidden'  class='form-control  form-control-sm' value='" + dataArray[j] + "'>";
            }

            //Adding select-fields
            if (walletDefs[j].type.includes("select")) {
                var options = "";
                for (var i = 0; i < walletDefs[j].options.length; i++) {
                    //Assigning the selected value of the <selected> option
                    if (adata.data()[0][walletDefs[j].name].includes(walletDefs[j].options[i])) {
                        options += "<option value='" + walletDefs[j].options[i] + "'selected>" + walletDefs[j].options[i] + "</option>";
                    } else {
                        options += "<option value='" + walletDefs[j].options[i] + "'>" + walletDefs[j].options[i] + "</option>";
                    }
                }
                data += "<select class='form-control'>" + options + "</select>";
            }
            data += "</div><div style='clear:both;'></div></div>";
        }
    }
    data += "</form>";

    $('#altEditor-modal').on('show.bs.modal', function() {
        $('#altEditor-modal').find('.modal-title').html('Edit Record');
        $('#altEditor-modal').find('.modal-body').html(data);
        $('#altEditor-modal').find('.modal-footer').html(
            `<button type='button' data-content='remove' class='btn btn-default' data-dismiss='modal'>Close</button>
                <button type='button' data-content='remove' class='btn btn-primary' wallet_index=${myRowID} data-dismiess='modal' id='editRowBtn'>Submit</button>`
        );
    });

    $('#altEditor-modal').modal('show');
    $('#altEditor-modal input[0]').focus();
    $('#altEditor-modal').modal('show');
}

function AddCoin(coin_data, index) {
    /*
    "coin_name": "LEVIARCOIN",
    "coin_symbol": "XLC",
    "wallet_address_list": [],
    "wallet_address": "",
    "pool_address_list": ["address1","addres2"],
    "pool_address": "",
    "notes": "Suggest to use CPU/GPU"
**** should get coin API info here as well
*/
    var MyRow = MinerCenter.row.add([
        coin_data.coin_name,
        coin_data.coin_symbol,
        "some USD Value",
        "some BTC value",
        coin_data.coin_symbol + " Reward",
        MyTrim(coin_data.wallet_address),
        MyTrim(coin_data.pool_address),
        `<button MyCoin_index="${index}" coin=${coin_data.Symbol} wallet="${coin_data.wallet_address}" pool="${coin_data.pool_address}" class="btn btn-primary StartMineBTN" > <span> > </span> </button> `
    ]).draw();


    $(MyRow.node()).attr('MyCoin_index', index);
    /*
        <th>Coin</th>
        <th>Symbol</th>
        <th>$/coin</th>
        <th>BTC/coin</th>
        <th>Reward/Block</th>
        <th>Wallet Address</th>
        <th>Pool Address</th>
        <th>Start</th>
    */
    //    ])
}

function addWallet(wallet, index) {
    /*
                        <th>Coin Name</th>
                        <th>Symbol</th>
                        <th>Wallet Name</th>
                        <th>Wallet Address</th>
                        <th>Default pool</th>
        "coin_ticker": "XMR",
        "wallet_name": "Main XMR wallet",
        "wallet_address": "47JNhZjBdVuiV7vL5cQbRTKVsMX76C2xqVsfkMd5uc9rd3EFq2HixPu2nU3Unn2psSSf6wAjFnjvB1q47NH3gsj5VQ8SANi ",
        "wallet_private_key_encrypted": "private",
        "coin_name": "Monero",
        "default_pool": "pool.supportxmr.com:5555",
        "alt_pools": ["pool.supportxmr.com:5555"]
                        */
    var MyRow = Wallets.row.add([
        wallet.coin_name,
        wallet.coin_ticker,
        wallet.wallet_name,
        MyTrim(wallet.wallet_address),
        MyTrim(wallet.default_pool)
    ]).draw();

    $(MyRow.node()).addClass('wallet');
    $(MyRow.node()).attr('wallet_index', index);

}



function AddCoinAPI(coin_data, index) {
    console.log(coin_data);
    var button = "";

    var myAddress = FindWalletFieldforCoin(coin_data.ticker_symbol, "wallet_address");
    var myPool = FindWalletFieldforCoin(coin_data.ticker_symbol, "default_pool");
    if ((myAddress.length > 20) && myPool)
        button = `<button MyCoin_index="${index}" coin=${coin_data.Symbol} wallet="${myAddress}" pool="${myPool}" class="btn btn-primary StartMineBTN" > <span> > </span> </button> `;
    else
        button = "No Wallet configured"
    var MyRow = MinerCenter.row.add([
        coin_data.ticker_symbol,
        coin_data.ticker_symbol,
        numDigits(coin_data.reward_24h.coins,2,""),
        numDigits(coin_data.reward_24h.btc,8,"BTC/Day")+"<BR>"+ numDigits(coin_data.reward_24h.usd,8,"USD/Day"),
        MyTrim(myAddress),
        MyTrim(myPool),
        button
    ]).draw();

    $(MyRow.node()).addClass('coin')
    $(MyRow.node()).attr('MyCoin_index', index);
}

function numDigits(Value, digits, label)
{
    Value = Value.toString();
    console.log (Value);
    var DecimalPosition = Value.indexOf(".");
    var ReturnString = Value.substring(0,DecimalPosition+digits) + " " + label;
    return ReturnString;

}

function MyTrim(value) {
    if (value.length < 15)
        return value;
    else {
        var begString = value.substring(0, 5);
        var endString = value.substring(value.length - 5, value.length);
        return (begString + "..." + endString);
    }
}


$.fn.toJSON = function() {
    var $elements = {};
    var $form = $(this);
    $form.find('input, select, textarea').each(function() {
        var name = $(this).attr('name');
        var type = $(this).attr('type');
        if (name) {
            var $value;
            if (type == 'radio') {
                $value = $('input[name=' + name + ']:checked', $form).val();
            } else if (type == 'checkbox') {
                $value = $(this).is(':checked');
            } else {
                $value = $(this).val();
            }
            $elements[$(this).attr('name')] = $value;
        }
    });
    return JSON.stringify($elements);
};

function saveWalletData() {
    /*{
           "id": 0,
           "coin_name": "Monero",
           "coin_symbol": "XMR",
           "wallet_address_list": ["47JNhZjBdVuiV7vL5cQbRTKVsMX76C2xqVsfkMd5uc9rd3EFq2HixPu2nU3Unn2psSSf6wAjFnjvB1q47NH3gsj5VQ8SANi"],
           "wallet_address": "47JNhZjBdVuiV7vL5cQbRTKVsMX76C2xqVsfkMd5uc9rd3EFq2HixPu2nU3Unn2psSSf6wAjFnjvB1q47NH3gsj5VQ8SANi",
           "pool_address_list": ["address1", "addres2"],
           "pool_address": "pool.supportxmr.com:5555",
           "notes": "Suggest to use CPU/GPU"
       }*/

    var WriteData = JSON.stringify(myWallets);
    console.log(WriteData);
        fs.writeFile('myWallets.json', WriteData, 'utf8', function() {
            $.toast("File Saved");
        });
    

}

function FindWalletFieldforCoin(coin_symbol, fieldname) {
    for (var i = 0; i < myWallets.length; i++) {
        if (coin_symbol == myWallets[i].coin_ticker) {
            return myWallets[i][fieldname];
        }
    }
    return ('Not Found');
}
/*
function encrypt (data_to_encrypt, password){
    const encrypted = await crypto2.encrypt('the native web', password);
    return encrypted;
}

const encrypt = async () => {
    console.log(await crypto2.encrypt('the native web', password))
    return "done"
}

function decrypt(encrypted_data,password)
{
    const decrypted = await crypto2.decrypt('6c9ae06e9cd536bf38d0f551f8150065', password);
    return decrypted;
}

*/

var algorithm = 'aes-256-ctr';

function encrypt(text,password){
    var cipher = crypto.createCipher(algorithm,password)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  }
   
  function decrypt(text,password){
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }



function refreshCoins(HASH) {
    /*
    $.getJSON('https://minecryptonight.net/api/rewards?hr=' + HASH + '&limit=10', function(data) {
        //      console.log(data);
        for (var i = 0; i < data.rewards.length; i++) {
            AddCoinAPI(data.rewards[i], i);
        }
    });
*/


for (var i = 0; i < SupportedCoins.length; i++) {
    AddCoinSupportedCoin(SupportedCoins[i], i);
}

    for (var i = 0; i < myWallets.length; i++) {
        addWallet(myWallets[i], i);

    }

}



function AddCoinSupportedCoin(Supported_coin_data, index) {
    console.log(Supported_coin_data);
    var button = "";

    var myAddress = FindWalletFieldforCoin(Supported_coin_data.coin_ticker, "wallet_address");
    var myPool = FindWalletFieldforCoin(Supported_coin_data.coin_ticker, "default_pool");
    if ((myAddress.length > 20) && myPool)
        button = `<button MyCoin_index="${index}" coin=${Supported_coin_data.coin_ticker} algo=${Supported_coin_data.mining_algo} wallet="${myAddress}" pool="${myPool}" class="btn btn-primary StartMineBTN" > <span> > </span> </button> `;
    else
        button = "No Wallet configured"
    var MyRow = MinerCenter.row.add([
        Supported_coin_data.coin_name,
        Supported_coin_data.coin_ticker,
        "NA",
        "NA",
        MyTrim(myAddress),
        MyTrim(myPool),
        button
    ]).draw();

    $(MyRow.node()).addClass('coin')
    $(MyRow.node()).attr('MyCoin_index', index);
}
