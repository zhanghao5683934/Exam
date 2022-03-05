<template>
	<view>
		<view class="que-title">
			<view class="que-title-text">{{infos.title}}</view>
			<view class="que-title-date">
				<text>截止时间: {{infos.endtime}}</text>
				<text class="que-title-date-num">参与人数: {{infos.count_num}}人</text>
			</view>
		</view>
		
		<block v-for="(item,index) in list">
			<view @click="chsss" :data-index="index" :hidden="item==0">111111111</view>
		</block>

		<view class="que-qu">
			<block v-if="infos.list != undefined" v-for="(item,index) in infos.list" :key="index">
				<view class="que-qu-title">
					<text class="que-qu-title-xing">*</text>{{index+1}}、{{item.title}}
					<text class="que-qu-title-type" v-if="item.count_max==1">（单选）</text>
					<view class="que-qu-title-type" v-if="item.count_max>1">（多选，最多选{{item.count_max}}项，最少选{{item.count_min}}项）</view>
				</view>
				
				<view class="que-qu-li">
					<block v-for="(item1,index1) in item.option" :key="index1">
						<view class="que-qu-li-l">
							
							<block v-if="infos.status==0 && item.count_max==1">
								<image class="que-qu-li-img" @click="chooseAnswer" :data-index="index" :data-key="index1" v-if="item.answerlist[index1]==0" src="/static/images/select1.png"></image>
								<image class="que-qu-li-img" @click="chooseAnswer" :data-index="index" :data-key="index1" v-if="item.answerlist[index1]==1" src="/static/images/selected1.png"></image>
							</block>
							
							<block v-if="(infos.status==1 || infos.status==2) && item.count_max==1">
								<image class="que-qu-li-img" v-if="item.answerlist[index1]==0" src="/static/images/select1.png"></image>
								<image class="que-qu-li-img" v-if="item.answerlist[index1]==1" src="/static/images/selectok1.png"></image>
							</block>
							
							<block v-if="infos.status==0 && item.count_max>1">
								<image class="que-qu-li-img" @click="chooseAnswer" :data-index="index" :data-key="index1" v-if="item.answerlist[index1]==0" src="/static/images/select2.png"></image>
								<image class="que-qu-li-img" @click="chooseAnswer" :data-index="index" :data-key="index1" v-if="item.answerlist[index1]==1" src="/static/images/selected2.png"></image>
							</block>		
							
							<block v-if="(infos.status==1 || infos.status==2) && item.count_max>1">
								<image class="que-qu-li-img" v-if="item.answerlist[index1]==0" src="/static/images/select2.png"></image>
								<image class="que-qu-li-img" v-if="item.answerlist[index1]==1" src="/static/images/selectok2.png"></image>
							</block>
													
							<view class="que-qu-li-mes">
								<view @click="chooseAnswer" :data-index="index" :data-key="index1" v-if="infos.status==0 && (item.answerlist[index1]==0 || item.answerlist[index1]==1)">{{item.option[index1]}}</view>
								<view v-if="(infos.status==1 || infos.status==2)">{{item.option[index1]}}</view>
								<image v-if="item.thumbs_json[index1] != undefined && item.thumbs_json[index1] != ''" :src="item.thumbs_json[index1]" @tap="previewImage(item.thumbs_json[index1])" mode="aspectFill"></image>
								<view>
									<view class="que-qu-li-heng" v-if="infos.status==1 || infos.status==2">
										<view class="que-qu-li-heng-selected" :style="item.widths[index1]"></view>
									</view>
									<text class="que-qu-li-num" v-if="infos.status==1 || infos.status==2">{{item.count[index1]}}人（{{item.width[index1]}}%）</text>
								</view>

							</view>

						</view>		
					</block>
				</view>
			</block>
		</view>
		
		<view class="qu-submit" v-if="infos.status==0" @click="submit">提交</view>
		<view class="qu-submit1" v-if="infos.status==1">已参与</view>
		<view class="qu-submit1" v-if="infos.status==2">已结束</view>
	</view>
</template>

<script>
	import request from '@/util/request.js';
	const app = getApp();
	export default {
		data() {
			return {
				infos:[],
				id:'',
				list: []
			}
		},
		onLoad(options){
			var uid = app.globalData.userInfo.id;
			var token = app.globalData.userInfo.token;
			var url = app.globalData.site_url+'/appapi/?s=Home.Papershow';
			this.id = options.id;
			request.requestApi(url,{uid:uid,token:token,id:options.id}).then(res=>{
				
				if(res.data.code!=0){
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
					
					setTimeout(function(){
						uni.redirectTo({
							url:'/pages/login/index'
						})
					},1500)
					
					return;
				}
				let list = res.data.info[0].list != undefined ? res.data.info[0].list : [];
				
				for(var i=0;i<list.list.length;i++){
					var listi = list.list[i];
					var width = [];
					var widths = [];
					var answerlist = [];
					for(var y=0;y<listi.option.length;y++){
						width[y] = parseInt((listi.count[y]/list.count_num)*100);
						widths[y] ='width:'+parseInt((listi.count[y]/list.count_num)*100)+'%';
					}
					list.list[i].width = width;
					list.list[i].widths = widths;
					
					if(listi.answer.length==0){
						for(var y=0;y<listi.option.length;y++){
							answerlist[y] = 0;
						}
						list.list[i].answerlist = answerlist;
					}else{
						list.list[i].answerlist = listi.answer;
					}
					
				}
				this.infos = list;
			})
		},
		methods: {
			
			//预览图片
			previewImage(image) {
				let imgArr = [];
				imgArr.push(image);
				//预览图片
				uni.previewImage({
					urls: imgArr,
					current: imgArr[0],
				});
			},
			chooseAnswer(e){ //选择自己的回答
				
				let _this = this;
				let index = e.currentTarget.dataset.index;
				let index1 = e.currentTarget.dataset.key;
			
				let question = this.infos.list[index];
				let answerlist = question.answerlist;
				
				if(question.count_max==1){ //单选
					if(answerlist[index1]==0){ //选择了其他答案
						for(let i=0;i<answerlist.length;i++){
							answerlist[i]=0;
						}
						answerlist[index1]=1;
					}
				}else{ //多选
					if(answerlist[index1]==0){ //选择答案
						answerlist[index1]=1;
					}else{ //取消答案
						answerlist[index1]=0;
					}
				}
				
				_this.infos.list[index].answerlist = answerlist;
				_this.$set(_this.infos.list[index],answerlist,answerlist);
				_this.$forceUpdate(); //强制组件渲染
			},
			submit(){ //提交答案
				let _this = this;
				let json = {};//答案
				let list = this.infos.list;
				for(let i=0;i<list.length;i++){
					let listi = list[i];
					let isSelected = 0; 
					let nums = 0;
					for(var y=0;y<listi.answerlist.length;y++){
						if(listi.answerlist[y]==1){
							isSelected = 1;
							nums = nums+1;
						}
					}
					if(isSelected==0){
						uni.showToast({
							title:'请选择答案',
							icon:'none'
						})
						
						return ;
					}
					if(nums<listi.count_min){
						uni.showToast({
							title:'至少选择'+listi.count_min+'个答案',
							icon:'none'
						})
						
						return ;
					}
					json[listi.id] = listi.answerlist;
				}
				
		
				let uid = app.globalData.userInfo.id;
				let token = app.globalData.userInfo.token;
				let id = this.infos.id;
				let answer = JSON.stringify(json);
				let url = app.globalData.site_url+'/appapi/?s=Home.Updatepaper';
				request.requestApi(url,{uid:uid,token:token,id:id,answer:answer}).then(res=>{
					if(res.data.code==0){
						// this.infos.status=1;
						let url = app.globalData.site_url+'/appapi/?s=Home.Papershow';
						request.requestApi(url,{uid:uid,token:token,id:this.id}).then(res=>{
							let list = res.data.info[0].list;
						
							for(let i=0;i<list.list.length;i++){
								let listi = list.list[i];
								let width = [];
								let widths = [];
								let answerlist = [];
								for(let y=0;y<listi.option.length;y++){
									width[y] = parseInt((listi.count[y]/list.count_num)*100);
									widths[y] ='width:'+parseInt((listi.count[y]/list.count_num)*100)+'%';
								}
								list.list[i].width = width;
								list.list[i].widths = widths;
								if(listi.answer.length==0){
									for(let y=0;y<listi.option.length;y++){
										answerlist[y] = 0;
									}
									list.list[i].answerlist = answerlist;
								}else{
									list.list[i].answerlist = listi.answer;
								}
								
							}
							_this.infos = list;
						})
					}
					
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
				})
			}
		}
	}
</script>

<style>
	.qu-submit1{
	    position: fixed;
	    bottom: 0;
	    width: 100%;
	    height: 100rpx;
	    text-align: center;
	    line-height: 100rpx;
	    background: #fff;
	    color: #B4B4B4;
	    box-shadow: 0rpx 10rpx 10rpx 10rpx rgba(0,0,0,0.2);
	}
	.qu-submit{
	    position: fixed;
	    bottom: 0;
	    width: 100%;
	    height: 100rpx;
	    text-align: center;
	    line-height: 100rpx;
	    background: #fff;
	    color: #E32A2A;
	    box-shadow: 0rpx 10rpx 10rpx 10rpx rgba(0,0,0,0.2);
	}
	.que-qu-li-l{
		clear: both;
		overflow: hidden;
		clear: both;
		overflow: hidden;
		position: relative;
		padding-top: 30rpx;
	}
	.que-qu-li-num{
		color: #B4B4B4;
		font-size: 22rpx;
		float: left;
		position: absolute;
		margin-left: 10rpx;
	}
	.que-qu-li-heng-selected{
		width: 50%;
		height: 16rpx;
		background: #F74F29;
		border-radius: 50rpx;
	}
	.que-qu-li-heng{
		width: 55%;
		height: 16rpx;
		background: #F0F0F0;
		border-radius: 50rpx;
		margin-top: 10rpx;
		float: left;
	}
	.que-qu-li-mes{
	    float: left;
	    margin-left: 20rpx;
	    font-size: 30rpx;
	    position: relative;
	    bottom: 4rpx;
	    width: 90%;
	}
	.que-qu-li-img{
		width: 34rpx;
		height: 34rpx;
		float: left;
	}
	.que-qu-li{
	    border: 1rpx solid #EBEBEB;
		padding: 0 30rpx 30rpx 30rpx;
	}
	.que-qu-title-type{
		color: #B4B4B4;
	}
	.que-qu-title-xing{
	    color: #E32A2A;
	}
	.que-qu-title{
	    padding: 30rpx 0 30rpx 0;
	    font-size: 30rpx;
	    letter-spacing: 1rpx;
	}
	.que-qu{
	    width: 92%;
	    margin: 0 auto;
	}
	.que-title-date-num{
	    float: right;
	}
	.que-title-date{
	    margin-top: 20rpx;
	    font-size: 24rpx;
	    color: #969696;
	}
	.que-title-text{
	    font-size: 30rpx;
	    letter-spacing: 1rpx;
	    font-weight: 500;
	}
	.que-title{
	    width: 92%;
	    margin: 0 auto;
	    padding: 30rpx 0 30rpx 0;
	    border-bottom: 1rpx solid #F0F0F0;
	}
	page{
		padding-bottom: 100rpx;
	}
</style>
