<template>
	<scroll-view @scrolltolower="handleToLower" class="recommend_view" scroll-y v-if="recommends.length>0">
		<!-- 推荐开始 -->
		<view class="recommend_wrap">
			<view 
				class="recommend_item"
				v-for="item in recommends"
				:key="item.id"
			>
				<image mode="widthFix" :src="item.thumb"></image>
			</view>
		</view>
		<!-- 推荐结束 -->
		<!-- 月份开始 -->
		<view class="months_wrap">
			<view class="months_title">
				<view class="months_title_info">
					<view class="months_info">
						<text>{{months.DD}} /</text>
						{{months.MM}} 月
					</view>
					<view class="months_text">
						{{months.title}}
					</view>
				</view>
				<view class="months_title_more">
					更多 >
				</view>
			</view>
			<view class="months_content">
				<view 
				class="months_item"
				v-for="item in months.items"
				:key="item.id"
				>
					<image mode="aspectFill" :src="item.thumb+item.rule.replace('$<Height>',360)"></image>
				</view>
			</view>
		</view>
		<!-- 月份结束 -->
		<!-- 热门开始 -->
		<view class="hots_wrap">
			<view class="hots_title">
				<text>
					热门
				</text>
			</view>
			<view class="hots_content">
				<view 
				class="hot_item"
				v-for="item in hots"
				:key="item.id"
				>
					<image mode="widthFix" :src="item.thumb"></image>
				</view>
			</view>
		</view>
		<!-- 热门结束 -->
	</scroll-view>
</template>

<script>
	import moment from "moment";
	export default {
		data(){
			return {
				recommends:[],
				months:{},
				hots:[],
				params:{
					limit:30,
					order:"hot",
					skip:0
				},
				hasMore:true
			}
		},
		mounted(){
			this.getList();
		},
		methods:{
			getList() {
				this.request({
					url:"http://service.picasso.adesk.com/v3/homepage/vertical",
					data:{
						limit:30,
						order:"hot",
						skip:0
					}
				})
				.then(res=>{
					// 判断有没有下一页
					if(res.res.vertical.length === 0) {
						this.hasMore = false;
						return ;
					}
					if(this.recommends.length === 0) {
						//推荐模块
						this.recommends=res.res.homepage[1].items;
						//console.log(res.res);
						//月份模块
						this.months=res.res.homepage[2];
						//时间戳改为18号/月
						this.months.MM=moment(this.months.stime).format("MM");
						this.months.DD=moment(this.months.stime).format("DD");
						//console.log(this.months);
					}
					
					//获取热门数据
					//this.hots=res.res.vertical;
					//es6 数组拼接
					this.hots = [...this.hots, ...res.res.vertical];
					//console.log(this.hots);
				})	
			},
			handleToLower() {
				if(this.hasMore) {
					/*
					1 修改参数 skip+=limit
					2 重新发送请求 getList()
					3 请求回来成功 hots 数据的叠加
					*/
					this.params.skip += this.params.limit;
					console.log(this.params.skip);
					this.getList();
				} else {
					uni.showToast({
						title:"没有数据了",
						icon:"none"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recommend_view {
		//height: 屏幕的高度 - 头部标题的高度.两边加空格,否则不生效
		height: calc( 100vh - 36px );
	}
	.recommend_wrap{
		display: flex;//设置为弹性布局
		flex-wrap: wrap;//换行
		.recommend_item{
			width:50%;
			border:3rpx solid #fff;
		}	
	}	
	.months_wrap {
		.months_title {
			display:flex;
			justify-content: space-between;
			padding: 20rpx;
			.months_title_info {
				font-size: 30rpx;
				font-weight: 600;
				display: flex;
				.months_info {
					color: $color;
					text {
						font-size: 36rpx;
					}
				}
				.months_text {
					font-size: 34rpx;
					color:"#666";
					margin-left: 30rpx;
				}
			}	
			
			.months_title_more {
				font-size: 24rpx;
				color: $color;
			}
		}
			
		.months_content {
			display: flex;
			flex-wrap: wrap;
			.months_item {
				width: 33.33%;
				border: 5rpx solid #fff;
			}
		}		
	}
	.hots_wrap {
		.hots_title {
			padding: 20px;
			text {
				border-left: 20rpx solid $color;
				padding-left: 20rpx;
				font-size: 24rpx;
				font-weight: 600;
			}
		}
		.hots_content {
			display: flex;
			flex-wrap: wrap;
			.hot_item {
				width: 33.33%;
				border: 5rpx solid #fff;
				image {
					
				}
			}
		}
	}
	
	 
</style>
