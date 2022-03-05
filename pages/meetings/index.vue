<template>
	<view>
<!-- 		<image class="me-image" src="/static/images/class.png"></image> -->
		<view class="index-swiper">
			<swiper class="index-swiper-swiper" indicator-active-color="#ffffff" indicator-dots="true" autoplay="true" loop="true" circular="true">
				<block v-for="(item,index) in sildelist">
					<swiper-item>
						<image class="index-swiper-swiper-img" :src="item.image"></image>
					</swiper-item>
				</block>
			</swiper>
		</view>
		
		<block v-for="(item,index) in list">
			<view class="me-li" @click="goH5" :data-url="item.url">
				<view class="me-li-title">{{item.title}}</view>
				<image class="me-li-zhe" src="/static/images/zhe.png"></image>
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
				list:[],
				sildelist:[],
				page:1,//
				isBottom:false,//有没有到底部
			}
		},
		onLoad(){
			var url = app.globalData.site_url+'/appapi/?s=Home.Sanhuiyike';
			request.requestApi(url,{}).then(res=>{
				this.list = res.data.info[0].list;
				this.sildelist = res.data.info[0].slide;
			})
		},
		onReachBottom(){
			var _this = this;
			if(this.isBottom==true){
				uni.showToast({
					title:'已经到底部了',
					icon:'none'
				})
				return ;
			}
			var p = this.page+1;
			this.page = p;
			
			var url1 = app.globalData.site_url+'/appapi/?s=Home.Sanhuiyikelist';
			request.requestApi(url1,{p:p}).then(res1=>{
				if(res1.data.info[0].list.length<10){
					_this.isBottom = true;
				}
				var list = this.list;
				for(var i=0;i<res1.data.info[0].list.length;i++){
					list.push(res1.data.info[0].list[i]);
				}
				this.list = list;
			})
		},
		methods: {
			goH5(e){
				uni.navigateTo({
					url:'/pages/webview/index?url='+e.currentTarget.dataset.url
				})
			}
		}
	}
</script>

<style>
	.me-li-zhe{
	    float: right;
	    width: 30rpx;
	    height: 30rpx;
	    margin-top: 10rpx;
	}
	.me-li-title{
		float: left;
		width: 80%;
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
	}
	.me-li{
	    clear: both;
	    overflow: hidden;
	    width: 94%;
	    margin: 0 auto;
	    font-size: 34rpx;
	    font-weight: 500;
	    padding: 40rpx 0 40rpx 0;
	    border-bottom: 1rpx solid #F0F0F0;
	}
	.index-swiper{
		width: 100%;
		height: 348rpx;
	}
	.index-swiper-swiper{
		width: 100%;
		height: 100%;
	}
	.index-swiper-swiper-img{
		width: 100%;
		height: 100%;
	}
</style>
