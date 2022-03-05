<template>
	<view>
		
		<view class="index-banner">
			<swiper style="height: 248rpx;" indicator-active-color="#ffffff" indicator-dots="true" autoplay="true" loop="true" circular="true">
				<block v-for="(item,index) in slideList" :key="index">
					<swiper-item>
						<image class="index-banner" :src="item.image"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>


					
		<view class="index-payok-top">
			<image src="/static/images/pay_ok.png"></image>
			<text>支付成功!</text>
		</view>
		
		<view class="index-payok-text">
			<image src="/static/images/money.png"></image>
			<text>实付金额</text>
		</view>
		<view class="index-pay-text1"><text class="index-pay-text2">{{userInfo.party_money}}</text><text class="index-pay-text3">元</text></view>
		<view class="index-pay-li1" style="border-top: 1rpx solid #f0f0f0;margin-top: 30rpx;">
			<view class="index-pay-li-name">缴费类型</view>
			<view class="index-pay-li1-text">{{fei_type}}</view>
		</view>
		<view class="index-pay-li1">
			<view class="index-pay-li-name">{{yuan_name}}姓名</view>
			<view class="index-pay-li1-text">{{userInfo.user_nickname}}</view>
		</view>
		<view class="index-pay-li1">
			<view class="index-pay-li-name">手机号</view>
			<view class="index-pay-li1-text">{{userInfo.mobile}}</view>
		</view>
		<view class="index-pay-li1">
			<view class="index-pay-li-name">订单时间</view>
			<view class="index-pay-li1-text">2020-10-10 15:00:56</view>
		</view>
		<view class="index-pay-li1">
			<view class="index-pay-li-name">支付方式</view>
			<view class="index-pay-li-text">
				<image src="/static/images/wx.png"></image>
				<text style="color: #969696;">微信支付</text>
			</view>
		</view>
		
	
	</view>
</template>

<script>
	import request from '@/util/request.js';
	const app = getApp();
	export default {
		data() {
			return {
				userInfo:{},
				slideList:[],//轮播
				fei_type: '', //缴费类型
				yuan_name: '',
			}
		},
		onLoad(){
			var _this = this;
			var userInfo = app.globalData.userInfo;
			_this.userInfo = userInfo;
			if(userInfo.id){
				var url = app.globalData.site_url+'/appapi/?s=User.checkParty';
				request.requestApi(url,{uid:userInfo.id,token:userInfo.token}).then(res=>{
					_this.slideList = res.data.info[0].slide;
					_this.fei_type = res.data.info[0].fei_type;
					_this.yuan_name = res.data.info[0].yuan_name;
				})
			
			}else{
				uni.redirectTo({
					url:'/pages/login/index'
				})
			}
		},
		methods: {

		}
	}
</script>

<style>
	.index-pay-li1-text{
		float: right;
		color: #969696;
	}
	.index-pay-li1{
	    padding: 20rpx;
	    clear: both;
	    overflow: hidden;
	    font-size: 34rpx;
	}
	.index-payok-text text{
		position: relative;
		bottom: 6rpx;
		margin-left: 12rpx;
	}
	.index-payok-text image{
		width: 46rpx;
	    height: 48rpx;
	}
	.index-payok-text{
		text-align: center;
		margin-top: 40rpx;
		font-size: 38rpx;
	}
	.index-payok-top text{
		font-size: 45rpx;
		position: relative;
		bottom: 10rpx;
		margin-left: 14rpx;
		color: #E32A2A;
	}
	.index-payok-top image{
	    width: 50rpx;
	    height: 50rpx;
	}
	.index-payok-top{
	    text-align: center;
	    margin-top: 50rpx;
	}
	.index-pay{
		width: 80%;
		height: 88rpx;
		border-radius: 50rpx;
		line-height: 88rpx;
		text-align: center;
		background: linear-gradient(#FF9000,#F64330);
		color: #fff;
		font-size: 36rpx;
		margin: 0 auto;
		margin-top: 130rpx;
	}
	.index-pay-li-text image{
	    width: 46rpx;
	    height: 40rpx;
	    position: relative;
	    top: 8rpx;
	    right: 12rpx;
	}
	.index-pay-li-text{
	    float: right;
	}
	.index-pay-li-name{
		 float: left;
	}
	.index-pay-li{
	    padding: 40rpx;
	    clear: both;
	    overflow: hidden;
	    font-size: 34rpx;
	}
	.index-pay-text3{
	    font-size: 38rpx;
	}
	.index-pay-text2{
		font-size: 64rpx;
	    color: #E32A2A;
	}
	.index-pay-text1{
	    text-align: center;
	    margin-top: 22rpx;
	}
	.index-pay-text{
	    text-align: center;
	    margin-top: 60rpx;
	    font-size: 38rpx;
	}
	.index-tips{
		margin-top: 300rpx;
		color: #969696;
		text-align: center;
	}
	.else3 image{
		width: 50rpx;
		height: 46rpx;
	}
	.else3 text{
		margin-right: 10rpx;
		position: relative;
		bottom: 10rpx;
		color: #969696;
	}
	.else3{
		float: right;
	}
	.index-content-mes-li-top-bottom-text1{
		color: #000;
		float: left;
		margin-left: 49rpx;
	}
	.else1{
		color: #323232;
		background: #F0F0F0;
		padding: 0px 30rpx 0 30rpx;
		border-radius: 50rpx;
	}
	.index-content-top-right1 image{
		width: 32rpx;
		height: 18rpx;
		float: right;
		position: relative;
		top: 10rpx;
		left: 14rpx;
	}
	.index-content-top-right1 text{
		font-size: 36rpx;
		position: relative;
		bottom: 10rpx;
		margin-left: 10rpx;
	}
	.index-content-top-right1{
		float: right;
		margin-right: 5%;
		background: #F0F0F0;
		border-radius: 50rpx;
		padding: 16rpx 48rpx 0rpx 32rpx;
		position: relative;
		bottom: 8rpx;
	}
	.index-content-mes-li-top-bottom{
	    float: right;
	    margin-top: 22rpx;
	    color: #E32A2A;
	    font-size: 32rpx;
	}
	.index-content-mes-li-top-text3{
	    float: right;
	    font-size: 36rpx;
	}
	.index-content-mes-li-top-text2{
	    font-size: 36rpx;
	    font-weight: 400;
	    margin-left: 34rpx;
	    position: relative;
	    top: 2rpx;
	}
	.index-content-mes-li-top-text1{
		display: inline-block;
	    width: 16rpx;
	    height: 16rpx;
	    border-radius: 50rpx;
	    background: #E32A2A;
		position: relative;
		bottom: 5rpx;
	}
	.index-content-mes-li-top{
	    clear: both;
	    overflow: hidden;
	}
	.index-content-mes-li{
		clear: both;
		overflow: hidden;
		padding: 20rpx 0 30rpx 0;
		width: 90%;
		margin: 0 auto;
		border-bottom: 1rpx solid #F0F0F0;
	}
	.index-content-top-right text{
		font-size: 32rpx;
		position: relative;
		bottom: 10rpx;
		margin-left: 20rpx;
	}
	.index-content-top-right image{
		width: 40rpx;
		height: 40rpx;
	}
	.index-content-top-right{
		float: right;
		margin-right: 5%;
		background: #F0F0F0;
		border-radius: 50rpx;
		padding: 10rpx 36rpx 0rpx 36rpx;
		position: relative;
		bottom: 8rpx;
	}
	.index-content-top-left text{
		font-size: 38rpx;
		position: relative;
		bottom: 12rpx;
		margin-left: 10rpx;
	}
	.index-content-top-left image{
		width: 54rpx;
		height: 50rpx;
	}
	.index-content-top-left{
		float: left;
		margin-left: 5%;
	}
	.index-content-top{
		clear: both;
		overflow: hidden;
		padding: 20rpx 0 20rpx 0;
		border-bottom: 1rpx solid #F0F0F0;
	}
	.index-content{
		
	}
	.index-tips{
		width: 53%;
		margin: 0 auto;
		text-align: center;
		margin-top: 25%;
		letter-spacing: 1rpx;
		line-height: 26px;
	}
	.index-banner{
		width: 100%;
		height: 248rpx;
	}
	.else2{
		clear: both;
		overflow: hidden;
		margin-top: 34rpx;
		float: none;
	}
	.else{
		background: #969696;
	}
</style>
