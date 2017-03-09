
Meteor.startup(function() {
  console.log('Hi there, developer!');
  console.log('SimpleCounter contract', SimpleCounter);
  Session.set('transaction', false);
  Session.set('count', SimpleCounter.get().toNumber());

  SimpleCounter.onIncrement(function(err, response) {
    Session.set('transaction', false);
    return Session.set('count', response.args.count.toNumber());
  });

  return setInterval(function() {
    return Session.set('web3Info', {
      "mining": web3.eth.mining,
      "hashrate": web3.eth.hashrate,
      "syncing": web3.eth.syncing,
      "block #": web3.eth.blockNumber,
      "coinbase": web3.eth.coinbase,
      "eth": web3.fromWei(web3.eth.getBalance(web3.eth.coinbase).toNumber(), 'ether')
    });
  }, 1000);
});

Template.hello.events({
  'click button': function() {
    debugger;
    Session.set('transaction', '?');
    return SimpleCounter.increment(function(err, address) {
      return Session.set('transaction', address);
    });
  }
});

Template.hello.helpers({
  'transaction': function() {
    return Session.get('transaction');
  },
  'counter': function() {
    return Session.get('count');
  },
  'contractAddress': function() {
    return SimpleCounter.address;
  },
  'web3Info': function() {
    return JSON.stringify(Session.get('web3Info'), null, 2);
  }
});