var web3 = new Web3(new Web3.providers.HttpProvider());

function createStore(storeId){

}

function submitReview(storeId, content, score){
	
}

function storeExist(storeId){
	return true;
}

function readReviews(storeId, callback){
	callback([{
		'reviewer':'ZZY',
		'score':4.5,
		'content':'ok'
	}]);
}

function readOverallScore(storeId, callback){
	callback(4.5);
}