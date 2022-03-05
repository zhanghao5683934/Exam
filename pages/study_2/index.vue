<template>
	<view>
		<view class="content">
			<studyList :listType="listType" :list="list"></studyList>
		</view>
	</view>
</template>

<script>
	import studyList from '@/components/study-list/study-list.vue';
	import request from '@/util/request.js';
	const app = getApp();
	export default {
		components:{
			studyList
		},
		data() {
			return {
				list:[],//
				page:1,//
				isBottom:false,//有没有到底部
				listType: '0',
			}
		},
		onLoad(){
			var url = app.globalData.site_url+'/appapi/?s=Home.Lessionlist';
			request.requestApi(url,{}).then(res=>{
				this.list = res.data.info[0].lession;
				this.listType = res.data.info[0].listtype;
			})
		},
		onReachBottom(){
			var _this = this;
			
			var p = this.page+1;
			this.page = p;
			
			var url1 = app.globalData.site_url+'/appapi/?s=Home.Lessionlist';
			request.requestApi(url1,{p:p}).then(res1=>{
				if(res1.data.info[0].lession.length<10){
					_this.isBottom = true;
				}
				var list = this.list;
				for(var i=0;i<res1.data.info[0].lession.length;i++){
					list.push(res1.data.info[0].lession[i]);
				}
				this.list = list;
				this.listType = res.data.info[0].listtype;
			})
		},
		methods: {
			
		}
	}
</script>

<style>
	.content{
		width: 94%;
		margin: 0 auto;
	}
</style>
