<template>	
	<view>
		<view class="home_tab">
			<view class="home_tab_title">
				<view class="title_inner">
					<uni-segmented-control
					:current="current" 
					:values="items.map(v=>v.title)" 
					@clickItem="onClickItem" style-type="text" active-color="#d4237a">
					</uni-segmented-control>
				</view>
				<view class="iconfont icon-search"></view>
			</view>
			
			<view class="home_tab_content">
				<view v-if="current === 0">
					<homeRecommend></homeRecommend>
				</view>
				<view v-if="current === 1">
					<homeCategory></homeCategory>
				</view>
				<view v-if="current === 2">
					<homeNew></homeNew>
				</view>
				<view v-if="current === 3">
					<homeAlbum></homeAlbum>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import homeAlbum from "./home-album";
	import homeCategory from "./home-category";
	import homeNew from "./home-new";
	import homeRecommend from "./home-recommend";
	import {uniSegmentedControl} from "@dcloudio/uni-ui";
	
	export default {
		components:{
			homeAlbum,
			homeCategory,
			homeNew,
			homeRecommend,
			uniSegmentedControl
		},
		data() {
			return {
				items: [
					{title: "推荐"},
					{title: "分类"},
					{title: "最新"},
					{title: "专辑"}
					],
				current: 0
			}
		},
		methods: {
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		}
	}
	
</script>

<style lang="scss">
	
	.home_tab{
		.home_tab_title{
			position: relative;
			.title_inner{
				width: 60%;
				margin: 0 auto;
			}
			.icon-search {
				position: absolute;
				top: 50%;
				transform: translateY(-50%); //垂直居中
				right: 5%;
			}
		}
		.home_tab_content{
			
		}
	}
	
</style>
