// es6 , params自动解构
export default (params)=>{
	return new Promise((resolve, reject)=>{
		
		//加载中
		uni.showLoading({
			title:"加载中"
		})
		
		uni.request({
			...params,
			success (res){
				resolve(res.data);
			},
			fail(err){
				reject(err);
			},
			complete(){
				uni.hideLoading();
			}
		})
	})
}