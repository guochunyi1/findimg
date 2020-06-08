<template>
	<!-- swiper 1 autoplay 2 indicator-dots 3 -->
	<scroll-view class="album_scroll_view" scroll-y @scrolltolower="handleToLower">
	<!-- 轮播图开始 -->
	<view class="album_swiper">
		<swiper
			autoplay
			indicator-dots
			circular
		>
			<swiper-item
			v-for="item in banner"
			:key="item.id"
			>
				<image :src="item.thumb"></image>
			</swiper-item>
		</swiper>
	</view>
	<!-- 轮播图结束 -->
	<!-- 列表开始 -->
	<view class="album_list">
		<view 
		class="album_item"
		v-for="item in album"
		:key="item.id"
		>
			<view class="album_img">
				<image :src="item.cover"></image>
			</view>
			<view class="album_info">
				<view class="album_name">{{item.name}}</view>
				<view class="album_desc">{{item.desc}}</view>
				<view class="album_btn">
					<view class="album_attention">关注</view>
				</view>
			</view>
		</view>
	</view>
	<!-- 列表结束 -->
	</scroll-view>
</template>

<script>
	export default {
		data(){
			return {
				params:{
					limit:30,
					order:"new",
					skip:0
				},
				banner:[],
				album:[],
				hasMore: true
			}
		},
		mounted() {
			uni.setNavigationBarTitle({
				title:"专辑"
			})
			this.getList();
		},
		methods: {
			getList() {
				this.request({
					url:"https://service.picasso.adesk.com/v1/wallpaper/album",
					data:this.params
				})
				.then(result=>{
					//console.log(result);
					if(this.banner.length === 0) {
						this.banner = result.res.banner;
					}
					if(result.res.album.length===0) {
						this.hasMore=false;
						return ;
					}
					this.album = [...this.album, ...result.res.album];
				})
			},
			//上拉加载 
			handleToLower() {
				if(this.hasMore) {
					this.params.skip += this.params.limit;
					this.getList();
				} else {
					uni.showToast({
						title:"没有更多数据",
						icon:"none"
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.album_scroll_view {
		height: calc( 100vh - 36px );
	}
	.album_swiper{
		swiper{
			height: calc( 750rpx / 2.3 );
			image {
				height: 100%;
			}
		}
	}
	
	.album_list {
		padding: 10rpx;
		.album_item {
			display: flex;
			border-bottom: 1rpx solid #ccc;
			.album_img {
				flex:1;
				padding: 10rpx;
				image {
					width: 200rpx;
					height: 200rpx;
				}
			}
			.album_info {
				flex: 2;
				padding: 0 10rpx;
				overflow: hidden;
				.album_name {
					font-size: 30rpx;
					color: #000;
					padding: 10rpx 0;
				}
				
				.album_desc {
					padding: 10rpx 0;
					font-size: 24rpx;
					
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
				.album_btn {
					padding: 10rpx;
					display: flex;
					justify-content: flex-end;
					.album_attention {
						color: $color;
						border: 1rpx solid $color;
						padding: 10rpx;
					}
				}
			}
		}
	}
</style>
