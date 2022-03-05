<template>
	<view>
		<view class="nav-article">
			<articleList :list="list"></articleList>
		</view>
	</view>
</template>

<script>
	import articleList from '@/components/active-list/active-list.vue';
	import request from '@/util/request.js';
	const app = getApp();
	export default {
		components:{
			articleList
		},
		data() {
			return {
				list:[],//文章列表
				page:1,//分页
				isBottom:false,//有没有到底部
			}
		},
		onLoad(){
			var _this = this;
			_this.getList();
		},
		onReachBottom(){
			if(this.isBottom==true){
				uni.showToast({
					title:'已经到底部了',
					icon:'none'
				})
				return ;
			}
			var p = this.page+1;
			this.page = p;
			this.getList();
		},
		methods: {
			getList(){
				var _this = this;
				var p = _this.page;
				var url1 = app.globalData.site_url+'/appapi/?s=Home.getActive';
				request.requestApi(url1,{p:p}).then(res1=>{
					if(res1.data.info[0].length<10){
						_this.isBottom = true;
					}
					var list = _this.list;
					for(var i=0;i<res1.data.info[0].length;i++){
						list.push(res1.data.info[0][i]);
					}
					
					_this.list = list;
				})
			}
		}
	}
</script>

<style>
	.nav-article{
	    width: 94%;
	    margin: 0 auto;
	}
	.nav{
		width: 100%;
		height: 54px;
	}
	.article-nav{
		white-space: nowrap;
		overflow: hidden;
		height: 54px;
	}
	.article-nav-li{
	    padding: 14rpx 20rpx 14rpx 20rpx;
	    border-radius: 6rpx;
	    background: #F5F5F5;
	    color: #787878;
	    margin-left: 3%;
	    font-size: 28rpx;
	    letter-spacing: 1rpx;
		display: inline-block;
		margin-top: 30rpx;
		white-space: normal;
	}
	.article-nav-li-select{
		background: linear-gradient(to bottom, #FF9000, #F64330);
		color: #fff;
	}
</style>
