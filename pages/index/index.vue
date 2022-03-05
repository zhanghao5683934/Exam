<template>
	<view>
		<!-- #ifndef H5 -->
		<nav-title title="万岳在线答题系统" ></nav-title>
		<!-- #endif -->
		
		<view class="index-swiper">
			<!-- <swiper class="index-swiper-swiper" indicator-active-color="#ffffff" indicator-dots="true" autoplay="true" loop="true" circular="true">
				<block v-for="(item,index) in slideList" :key="index">
					<swiper-item>
						<image @click="bannerTo(item, index)" class="index-swiper-swiper-img" :src="item.image"></image>
					</swiper-item>
				</block>
			</swiper> -->
			
			<swiper class="index-swiper-swiper" indicator-dots="true" :autoplay="true" :circular="true" 
			  indicator-active-color="#E93323" previous-margin="40rpx" next-margin="40rpx" >
				<block v-for="(item,index) in slideList" :key="index">
					<swiper-item>
						<image @click="bannerTo(item, index)" class="index-swiper-swiper-img" :src="item.image"></image>
						
					</swiper-item>
				</block>
			</swiper>
		<view class="index-gao">
		  <image src="/static/images/gonggao.png" class="index-gao-text"></image>
		  <swiper class="index-gao-swiper" autoplay="true" interval="1500" circular="true" duration="500" vertical="true" display-multiple-items="1">
			<block v-for="(item,index) in notice" :key="index">
			  <swiper-item>
				<view @click="goNotice" class="index-gao-swiper-text">{{item.title}}</view>
			  </swiper-item>
			</block>
		  </swiper>
		</view>	
			
		</view>
		<!-- 两个模块 -->
		
		<view class="index-mokuai">
			<!-- 排行榜 -->
			<view class="index-shouye">
						<view class="index-nav-li"  @click="goRanking">
							<image class="index-jifen" src="/static/images/paihang.png"></image>
							
						</view>
			</view>
			<!-- 会员成长值 -->
			<view class="index-shouye">
				<view class="index-nav-li"  @click="goAnswer">
					<image class="index-jifen1" src="/static/images/dati.png"></image>
					
				</view>
			</view>
			<!-- 个人设置 -->
			<view class="index-shouye">
				<view class="index-nav-li"  @click="goMine">
					<image class="index-jifen2" src="/static/images/shezhi.png"></image>
					
				</view>
			</view>
			<!-- 答题记录 -->
			<view class="index-shouye">
				<view class="index-nav-li"  @click="goShop">
					<image class="index-jifen3" src="/static/images/jilu.png"></image>
					
				</view>
			</view>
		</view>
		<!-- 答题状态栏 -->
		<!-- <view class="index-nav" :style="{height:index_navH+'rpx'}">
			<view class="index-nav-item">
				<view :style="{height:index_nav_titleH+'rpx'}" class="index-nav-item-title font_28 font_w color_orange">{{person_nums}}</view>
				<view class="index-nav-item-bottom">
					<view class="font_30 font_w color_orange">{{answer.person_num}}</view>
					<image class="nav-img" src="/static/images/answer_renshu.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="index-nav-item">
				<view :style="{height:index_nav_titleH+'rpx'}" class="index-nav-item-title font_28 font_w color_pink">{{question_nums}}</view>
				<view class="index-nav-item-bottom">
					<view class="font_30 font_w color_pink">{{answer.question_num}}</view>
					<image class="nav-img" src="/static/images/index_tikunum.png" mode="aspectFit"></image>
				</view>
			</view>
			<view class="index-nav-item">
				<view :style="{height:index_nav_titleH+'rpx'}" class="index-nav-item-title font_28 font_w color_blue">{{all_ans_nums}}</view>
				<view class="index-nav-item-bottom">
					<view class="font_30 font_w color_blue">{{answer.all_answer_num}}</view>
					<image class="nav-img" src="/static/images/index_dati.png" mode="aspectFit"></image>
				</view>
			</view>
		</view>  -->
		
		<!-- 隐藏导航栏 -->
		<!-- <view class="index-nav" >
			<view class="index-nav-li"  @click="goScanning">
				<image class="index-nav-li-img" src="/static/images/index1yaowen.png"></image>
				<text class="index-nav-li-text">要闻速览</text>
			</view>
			<view class="index-nav-li"  @click="goArticle">
				<image class="index-nav-li-img" src="/static/images/index7dongtai.png"></image>
				<text class="index-nav-li-text">基层动态</text>
			</view>
			<view class="index-nav-li"  @click="goStudy" v-if="configInfo.small_switch == 0">
				<image class="index-nav-li-img" src="/static/images/index4xuexi.png"></image>
				<text class="index-nav-li-text">学习手册</text>
			</view>
			<view class="index-nav-li"  @click="goPay" v-if="configInfo.small_switch == 0">
				<image class="index-nav-li-img" src="/static/images/index5bangong.png"></image>
				<text class="index-nav-li-text">线上办公</text>
			</view>
			<block v-if="configInfo.small_switch == 0">
				<view class="index-nav-li" @click="goDfeng">
					<image class="index-nav-li-img" src="/static/images/index2xianmo.png"></image>
					<text class="index-nav-li-text">先模风采</text>
				</view>	
				
				<view class="index-nav-li" @click="goQuest">
					<image class="index-nav-li-img" src="/static/images/index8wenjuan.png"></image>
					<text class="index-nav-li-text">问卷调查</text>
				</view>
				<view class="index-nav-li" @click="goThink">
					<image class="index-nav-li-img" src="/static/images/reading_index_icon1.png"></image>
					<text class="index-nav-li-text">{{duwu_name}}</text>
				</view>
				
			</block>
			<view class="index-nav-li" @click="goAnswer">
				<image class="index-nav-li-img" src="/static/images/index6jieshao.png"></image>
				<text class="index-nav-li-text">开始答题</text>
			</view>
		
		
		
		</view> -->
		
		
		<!-- <view class="index-article">
			<view class="index-article-top">
				<text class="index-article-top-shu"></text>
				<text class="index-article-top-text">推荐文章</text>
				<image class="index-article-top-zhe" src="/static/images/zhe.png"></image>
				<view class="index-article-top-more" @click="goScanning">更多</view>
			</view>
			<view class="index-article-list">
				<articleList :list="list"></articleList>
			</view>
		</view> -->
	</view>
</template>

<script>
	import navTitle from '@/components/nav-title/nav-title.vue';
	import articleList from '@/components/article-list/article-list.vue';
	import request from '@/util/request.js';

	const app = getApp();
	export default {
		
		components:{
			navTitle,
			articleList,
		},
		data() {
			return {
				articleList:[],//文章列表
				slideList:[],//轮播
				notice:[],
				configInfo:[],
				list: [], //要闻速览
				duwu_name: '', //有声读物名
				// //答题状态显示
				// top_title: '宁化党史竞赛',
				// person_nums: '答题人数',
				// question_nums: '题库总量',
				// all_ans_nums: '累计答题',
				// index_navH: 270,
				// index_nav_titleH: 50, 
			}
		},
		onShareTimeline: function(res) {},
		onShareAppMessage: function(res) {},
		onLoad() {
		},
		onShow(){
			if((parseInt(app.globalData.login_score) > 0) && 
			(app.globalData.first_login == '1')) {
				uni.showToast({
					title: '积分+' + app.globalData.login_score,
					image: '/static/images/jifen_shan.png',
					mask: true,
					duration: 2000
				});	
				app.globalData.login_score = 0;
				app.globalData.first_login = 0;
			}
			
			var _this = this;
			var url = app.globalData.site_url+'/appapi/?s=Home.Getindex';
			
			uni.request({
			  url: url,
			  success: (res) => {
				this.list = res.data.data.info[0].list;
				this.slideList = res.data.data.info[0].slide;
				this.duwu_name = res.data.data.info[0].duwu_name;
			  },
			  fail: (msg) => {
				  
			  }
			});
			
			var url1 = app.globalData.site_url+'/appapi/?s=Home.Notice';
			request.requestApi(url1,{}).then(res=>{
				_this.notice = res.data.info[0].list;
			});
			
			var url = app.globalData.site_url+'/appapi/?s=Home.GetConfig';
			request.requestApi(url,{}).then(res=>{
				this.configInfo = res.data.info[0];
			});
			
		},
		
		methods: {
			
			bannerTo(item, index) {
				if(index == 0) {
					uni.navigateTo({
						url: '../danghistory/more',
					});
				}
			},
			goProduct(){ //产品介绍
				uni.navigateTo({
					url:'/pages/product/index'
				})
			},
			goThink(){ //有声读物
				uni.navigateTo({
					url: '/pages/study_2/index',
				});
				
			},
			goShop(){ //积分兑换
				uni.navigateTo({
					// url: '/pages/shop/shop',
				});
				
			},
			goAnsHistory(){
				uni.navigateTo({
					url: '../answer_history/answer_history',
				});
			},
			goMine(){ //我的
				uni.navigateTo({
					url: '/pages/my/index',
				});
				
			},
			goRanking(){
				uni.navigateTo({
					url: '../ranking/ranking',
				});
			},
			//开始答题
			goAnswer(){
				//检查是否可以答题
				uni.request({
					url: app.globalData.site_url+'/appapi/?s=Tests.CheckAnswer',
					method: 'GET',
					data: {
						'uid': app.globalData.userInfo.id,
						'token': app.globalData.userInfo.token,
					},
					success: res => {
						console.log(res);
						if(res.data.data.code == 0) {
							uni.navigateTo({
								url: '../question/question',
							});
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.data.msg
							});
							if(res.data.data.code == 700) {
								uni.navigateTo({
									url: '../login/index',
								});
							}
							return;
						}
					},
					fail: () => {},
				});
				
			},
			goPay(){ //党费缴纳
				uni.navigateTo({
					url:'/pages/party_pay/index'
				})
			},
			goStudy(){ //学习手册
				uni.switchTab({
					url:'/pages/study/index'
				})
			},
			goScanning(){ //要闻速览
				uni.navigateTo({
					url:'/pages/scanning/index'
				})
			},
			goQuest(){ //问卷调查
				uni.navigateTo({
					url:'/pages/questionnaire/index'
				})
			},
			showTost(){ //敬请期待
				uni.showToast({
					title:'敬请期待',
					icon:'none'
				})
			},
			showActive(){ //线上活动
				uni.navigateTo({
					url:'/pages/active/index'
				})
			},
			goNotice(){ //通知公告
				uni.navigateTo({
					url:'/pages/notice/index'
				})
			},
			goSh(){ //三会一课
				uni.navigateTo({
					url:'/pages/meetings/index'
				})
			},
			goDce(){ //党员手册
				uni.navigateTo({
					url:'/pages/manual/index'
				})
			},
			goDfeng(){ //党员风采
				uni.navigateTo({
					url:'/pages/demeanor/index'
				})
			},
			
			// swiper
			swiperChange(e) {
				// this.swiperCur = e.detail.current
				let {
					current,
					source
				} = e.detail
				if (source === 'autoplay' || source === 'touch') {
				//根据官方 source 来进行判断swiper的change事件是通过什么来触发的，autoplay是自动轮播。touch是用户手动滑动。其他的就是未知问题。抖动问题主要由于未知问题引起的，所以做了限制，只有在自动轮播和用户主动触发才去改变current值，达到规避了抖动bug
					this.swiperCur = e.detail.current
				}
			},
			goArticle(){ //查看更多文章 改成要闻速览
				uni.navigateTo({
					url:'/pages/article/index'
				});
			}
		}
	}
</script>

<style>
	.index-gao-swiper-text{
		width: 100%;
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		font-size: 32rpx;
	}
	.index-jifen{
		  width: 700rpx;
		    height: 300rpx;
		    font-weight: bold;
		    transform: scale(.5);
			margin-top: 10rpx;
			border-radius: 27rpx;
			margin-left: -157rpx
	}
	.index-jifen1{
		  width: 700rpx;
		    height: 300rpx;
		    font-weight: bold;
		    transform: scale(.5);
		    margin-top: 10rpx;
			border-radius: 27rpx;
			margin-left: 18rpx;
	}
	.index-jifen2{
		  width: 700rpx;
		    height: 300rpx;
		    font-weight: bold;
		    transform: scale(.5);
		    margin-top: 200rpx;
			border-radius: 27rpx;
			margin-left: -547rpx;
	}
	.index-jifen3{
		  width: 700rpx;
		    height: 300rpx;
		    font-weight: bold;
		    transform: scale(.5);
		    margin-top: 200rpx;
			border-radius: 27rpx;
			margin-left: -355rpx;
	}
	.index-gao-swiper{
		float: left;
		width: 70%;
		height: 40rpx;
		position: relative;
		bottom: 8rpx;
	}
	.index-gao-text{
		float: left;
		width: 133rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}
	.index-gao{
	    /* background: #fff; */
		color: #FFFFFF;
	    margin-top: 10rpx;
		padding: 20rpx 3% 10rpx 3%;
		clear: both;
		overflow: hidden;
	}
	.nav-img {
		width: 84rpx;		
		height: 65rpx;
	}
	.nav-img {
		margin-top: 40rpx;
	}
	.index-nav-item-bottom {
		width: 88%;
		height: 70%;
	}
	
	.index-nav-item {
		float: left;
		height: 100%;
		width: 29%;
		padding-top: 30rpx;
		padding-left: 20rpx;
		background-color: #FDF8E5;
	}
	
	.index-nav-item-title {
		margin-bottom: 18rpx;
		height: 110rpx;
	}
	
	.index-nav-item:nth-child(1) {
		position: absolute;
		left: 0;
	}
	
	.index-nav-item:nth-child(2) {
		position: absolute; 
		left: 50%; 
		transform: translate(-50%);
		background-color: #FEF2F2;
	}
	
	.index-nav-item:nth-child(3) {
		position: absolute;
		right: 0;
		background-color: #F3F6FF;
	}
	.index-article-list{
		width: 94%;
		margin: 0 auto;
	}
	.index-article-top-more{
		float: right;
		color: #969696;
		font-size: 34rpx;
		margin-right: 15rpx;
	}
	.index-article-top-zhe{
	    float: right;
	    width: 30rpx;
	    height: 30rpx;
	    position: relative;
	    top: 8rpx;
	    margin-right: 3%;
	}
	.index-article-top-text{
	    font-size: 36rpx;
	    letter-spacing: 1rpx;
	    font-weight: 500;
	    position: relative;
	    left: 14rpx;
	    bottom: 7rpx;
	}
	.index-article-top-shu{
		display: inline-block;
	    width: 6rpx;
	    height: 36rpx;
	    background: linear-gradient(to bottom, #FF9000, #F64330);
	    margin-left: 3%;
	}
	.index-article-top{
	    clear: both;
	    overflow: hidden;
	    border-bottom: 1px solid #F0F0F0;
	    padding-top: 24rpx;
	    padding-bottom: 20rpx;
	}
	.index-article{
		background: #fff;
		margin-top: 10rpx;
	}
	page{
		/* background: #FAFAFA; */
		/* 修改主界面背景 */
		background-image: url(http://campus.51job.com/yonyou/img/index_bg.png);
		background-size: 100% 100%;
	}
	.index-nav-li-text{
		margin-top: 14rpx;
		display: block;
	}
	.index-beijing-text1{
		margin-top: 14rpx;
		display: block;
	}
	.index-nav-li-img{
		width: 66rpx;
		height: 66rpx;
		display: block;
		margin: 0 auto;
		
	}
	.index-beijing1{
	  width: 66rpx;
	  height: 66rpx;
	  display: block;
	  margin: 0 auto;
	  background-color: #00C900;
		
	}
	.index-nav-li{
		width: 25%;
		text-align: center;
		font-size: 26rpx;
		color: #646464;
		letter-spacing: 1rpx;
		padding: 40rpx 0 0 0;
		float: left;
	}
	.index-nav{
		padding: 0 3% 0 3%;
		clear: both;
		overflow: hidden;
		padding-bottom: 40rpx;
		/* background: #fff; */
	}
	.index-swiper{
		width: 100%;
		height: 360rpx;
	}
	.index-swiper-swiper{
		width: 100%;
		height: 100%;
	}
	.index-swiper-swiper-img{
		width: 100%;
		height: 100%;
		border-radius:10rpx;
		transform: scale(.93);
	}
</style>
