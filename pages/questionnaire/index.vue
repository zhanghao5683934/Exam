<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<view class="que-li" @click="goDetail" :data-id="item.id">
				<view>
					<text class="que-li-title">{{item.title}}</text>
					<text class="que-li-status" :class="[item.status==2?'que-li-status-no':'']">{{item.status_msg}}</text>
				</view>
				<view class="que-li-date">{{item.endtime}} 截止 | {{item.count_num}}人已参与</view>
			</view>
		</block>
	</view>
</template>

<script>
	import request from '@/util/request.js';
	const app = getApp();
	export default {
		data() {
			
			return {
				list:[],//
				page:1,//
			}
		},
		onLoad(){
			
			let that = this;
			uni.request({
				url: app.globalData.site_url+'/appapi/?s=Home.Paperlist',
				method: 'GET',
				data: {
					'is_dev': '1',
				},
				success: res => {
					that.list = res.data.data.info[0].list;
				},
				fail: () => {},
			});
			
		},
		methods: {
			goDetail(e){
				if(!app.globalData.userInfo.id){
					uni.redirectTo({
						url:'/pages/login/index'
					})
					
					return ;
				}
				var id = e.currentTarget.dataset.id;
				uni.navigateTo({
					url:'/pages/questionnaire_detail/index?id='+id
				})
			}
		}
	}
</script>

<style>
	.que-li-date{
	    color: #969696;
	    font-size: 28rpx;
	    margin-top: 20rpx;
	}
	.que-li-status{
		font-size: 20rpx;
		border: 1rpx solid #E32A2A;
		color: #E32A2A;
		padding: 2rpx 8rpx 0rpx 8rpx;
		margin-left: 20rpx;
	}
	.que-li-status-no{
		border: 1rpx solid #C7C7C7;
		color: #C7C7C7;
	}
	.que-li-title{
	    font-size: 34rpx;
	    color: #323232;
	    font-weight: 500;
	    letter-spacing: 1rpx;
	}
	.que-li{
	    background: #fff;
	    padding: 30rpx;
	    width: 85%;
	    margin: 0 auto;
	    border-radius: 10rpx;
	    margin-top: 20rpx;
	}
	page{
		background-color: #FAFAFA;
	}
</style>
