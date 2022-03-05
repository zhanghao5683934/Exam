<template>
	<view>
		<block v-if="info.info != undefined">
			<image v-if="info.info.url == ''" :src="info.info.thumb" class="index-top-img"></image>
			<video v-if="info.info.url != ''" class="index-top-img" :src="info.info.url" controls></video>
			<view class="index-top-title">{{info.info.title}}</view>
		</block>

		<block v-for="(item,index) in info.list" :key="item.id">
			<view class="index-li" @click="play" :data-id="item.id" :data-url="item.url" :data-index="index"
				:data-isplay="item.playInfo.isplay">
				<image src="/static/images/play_end.png" v-if="item.playInfo.isplay=='0'"></image>
				<image src="/static/images/play_now.png" v-if="item.playInfo.isplay=='1'"></image>
				<image src="/static/images/play_pause.png" v-if="item.playInfo.isplay=='2'"></image>
				<view class="index-li-text">
					<view class="index-li-text1">{{item.title}}</view>
					<view class="index-li-text2">
						<text>{{item.addtime}}</text>
					</view>
				</view>
			</view>
		</block>

		<!-- 考试答题区 -->
		<view @click="closezhetop" v-if="is_zhe_top == '1'" class="zhetop">
		</view>
		<view v-if="is_zhe_show == '1'" class="zhe">
			
	      <image @click="closeDati('0')" class="close-icon" v-if="is_show_result == '0'" src="../../static/images/close_right.png" mode="aspectFit"></image>
	      <image @click="closeDati('1')" class="close-icon" v-if="is_show_result == '1'" src="../../static/images/close_result_right.png" mode="aspectFit"></image>
		  
		  <block v-if="tiList[current] != undefined && is_show_result == '0'">	
			<!-- 题目类型数量 -->
			<view class="zhe-type">
				<text class="shu"></text>
				<text class="zhe-title font_30" v-if="tiList[current].type == '0'">判断题</text>
				<text class="zhe-title font_30" v-if="tiList[current].type == '1'">单选题</text>
				<text class="zhe-title font_30" v-if="tiList[current].type == '2'">多项选择题</text>

				<view>
					<text class="current-ti-num">{{currentQid}}</text>
					<text>/{{tiList.length}}</text>
				</view>
			</view>

			<!-- 题目区 -->
			<scroll-view class="scroll-view" scroll-y="true" :style="'height:' + scrollH+'rpx;'">
				
					<view class="que-content color_32 font_30">
						{{tiList[current].title}}
					</view>
					<!-- 选项 -->
					<view class="option-list">
						<!-- 判断题 rs为0错误 1正确 -->
						<block v-if="tiList[current].type == '0'">
							<!-- 未做题 -->
							<block v-if="user_answer.ti_data[current] != 'is_end'">
								<view @click="checkPanduan('1')" class="option-item">
									A.对
								</view>
								<view @click="checkPanduan('0')" class="option-item">
									B.错
								</view>
							</block>

							<!-- 已做完 -->
							<block v-else>
								<!-- 答案是1即此题应选正确 背景变色 -->
								<block v-if="tiList[current].answer.rs == '1'">	
									<view class="option-item optionright">
										<image class="duicuo-img" src="../../static/images/tongji_duihao.png"
											mode="aspectFill"></image>
										<text>A.对</text>	
									</view>
									
									<view class="option-item">
										<!-- 用户做错了 错选项前加一个叉号图标 -->
										<image v-if="right_cuo[current] != '1'" class="duicuo-img" src="../../static/images/tongji_cuohao.png"
											mode="aspectFill"></image>
										<text>B.错</text>	
									</view>
								</block>
								
								<!-- 答案是0 即此题应选错误 背景变色 -->
								<block v-if="tiList[current].answer.rs == '0'">
									<view class="option-item">
										<image v-if="right_cuo[current] != '1'" class="duicuo-img" src="../../static/images/tongji_cuohao.png"
											mode="aspectFill"></image>
										<text>A.对</text>	
									</view>
									<view class="option-item optionright">
										<image class="duicuo-img" src="../../static/images/tongji_duihao.png"
											mode="aspectFill"></image>
										<text>B.错</text>	
									</view>
								</block>
							</block>
						</block>

					<!-- 单选题 -->
					<block v-if="tiList[current].type == '1'">
					  <block v-for="(item, index) in tiList[current].answer.ans" :key="index">
								
							<block v-if="user_answer.ti_data[current] != 'is_end'">
								<view class="option-item" @click="checkDanxuan(index)">
									{{ti_info_abc[index]}}.{{item}}
								</view>
							</block>
							<!-- 做完此题了 -->
							<block v-else>
								<!-- 做对了 只有作对的题变粉色 其他不变  -->
								<block v-if="right_cuo[current] == '1'">
									<block v-if="tiList[current].answer.rs == index">
										<view class="option-item optionright">
											<image class="duicuo-img" src="../../static/images/tongji_duihao.png"
												mode="aspectFill"></image>
											{{ti_info_abc[index]}}.{{item}}
										</view>
									</block>
									<block v-else>
										<view class="option-item">
											{{ti_info_abc[index]}}.{{item}}
										</view>
									</block>
								</block>
								<!-- 做错了 做错选项加叉号 正确答案变色 -->
								<block v-else>
									<view class="option-item" :class="{optionright : (tiList[current].answer.rs == index)}">
										
										<block v-if="tiList[current].answer.rs == index">
											<image class="duicuo-img" src="../../static/images/tongji_duihao.png"
												mode="aspectFill"></image>
										</block>	
										<block v-if="user_ans[tiList[current].id] == index">
											<image class="duicuo-img" src="../../static/images/tongji_cuohao.png"
												mode="aspectFill"></image>
										</block>
										{{ti_info_abc[index]}}.{{item}}
									</view>
								</block>
							</block>
							
						</block>
					</block>

					<!-- 多选题（定项） -->
					<block v-if="tiList[current].type == '2'">
						<block v-for="(item, index) in tiList[current].answer.ans" :key="dingxiang.key[index]">
							
							<!-- 用户没选择此选项 -->
							<block v-if="dingxiang.abc[current][index] != 'is_checked'">
								<view @click="checkDingxiang(index)" class="option-item">
									{{ti_info_abc[index]}}.{{item}}
								</view>
								<text style="display: none;">{{dingxiang.key[index]}}</text>
							</block>
							
							<!-- 如果用户已选择 此选项-->
							<block v-else>
								<!-- 在正确答案中 打对号 背景变色 -->
								<block v-if="tiList[current].answer.rs.indexOf(index) != '-1'">
									<view class="option-item optionright">
										<image class="duicuo-img" src="../../static/images/tongji_duihao.png"
											mode="aspectFill"></image>
										{{ti_info_abc[index]}}.{{item}}
									</view>
								</block>
								<!-- 不在正确答案中 且用户选择 加叉号 -->
								<block v-else-if="tiList[current].answer.rs.indexOf(index) == '-1' && dingxiang.ans[current].indexOf(index) != '-1'">
									<view class="option-item">
										<image class="duicuo-img" src="../../static/images/tongji_cuohao.png"
											mode="aspectFill"></image>
										{{ti_info_abc[index]}}.{{item}}
									</view>
								</block>
								
								<!-- 不在正确答案中 但用户没选 背景变白 -->
								<block v-else>
									<text>{{tiList[current].answer.rs}}</text>
									<text>{{dingxiang.ans[current]}}</text>
									<view class="option-item optionwhite">
										{{ti_info_abc[index]}}.{{item}}
									</view>
								</block>
								
							</block>
						</block>
						
					</block>

					</view>
			</scroll-view>

			<!-- 上一题下一题按钮 -->
			<view class="ti-btn-wrap">
				<text @click="checkTi('1')" class="pre-ti-btn ti-btn" :class="{check_ti :(check_ti == '1')}">上一题</text>
				<text @click="checkTi('2')" class="next-ti-btn ti-btn" :class="{check_ti :(check_ti == '2')}">下一题</text>
			</view>

		 </block>
		 
		 <!-- 展示做题结果 -->
		 <block v-if="is_show_result == '1'">
			 
			 <view class="top">
			   <view class="top_text2">本次答题成绩</view>
			   <view class="top_text3">
				   {{result.score}}
				<text class="font_32">分</text>
			   </view>
			 
			 </view>
			 
			 <view class="result-bottom">
				 <view class="li">
				   <image class="li_img" src="../../static/images/right_acc.png"></image>
				   <text class="li_text">正确率：{{result.acc}}%</text>
				 </view>
				 
				 <view class="li">
				   <image class="li_img" src="../../static/images/dati_time.png"></image>
				   <text class="li_text">用 时：{{result.time}}</text>
				 </view>
				 
				 <view class="li">
				   <image class="li_img" src="../../static/images/dati_wrong1.png"></image>
				   <text class="li_text">错题数：{{result.error_nums}}</text>
				 </view>
				 
				 <view class="li">
				   <image class="li_img" src="../../static/images/dati_right.png"></image>
				   <text class="li_text">对题数：{{result.right_nums}}</text>
				 </view>
			 </view>
			 
			   <view class="button_view">
			     <text @click="datiAgain" id="button_view_getgift">重新答题</text>
			     <text @click="backIndex" id="button_view_next">返回首页</text>
			   </view>
		 </block>	
			
		</view>
		<!-- zhe结束 -->
		
	</view>
</template>

<script>
	const app = getApp();
	// #ifndef H5
	const myaudio = uni.getBackgroundAudioManager({});
	// #endif
	// #ifdef H5
	const myaudio = uni.createInnerAudioContext();
	// #endif
	
	import request from '@/util/request.js';
	export default {
		data() {
			return {
				is_show_result: '0', //是否做完题 展示结果
				start_time: 0, //开始做题时间
				reading_id: '0', //当前语音的id 代表本次答题的唯一id
				info: [],
				index: -1,
				is_zhe_show: '0', //是否显示遮罩层
				is_zhe_top: '0', //是否显示遮罩层上半边
				scrollH: 0,
				check_ti: '', //选择上一题/下一题
				tiList: [],
				current: '0', //当前页面索引
				tilist_c: {}, //当前索引试题
				currentQid: 1,
				ti_info_abc: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], //选择题选项
				// 存放用户每题答对答错情况
				right_cuo: [], //索引 对 1 错 0
				//用户答题数据, 对题数  错题数 题目信息
				user_answer: {
					'dui_num': 0,
					'cuo_num': 0,
					'ti_data': []
				},
				//判断题相关数据
				panduan: {
					'is_end': '0', //是否已做完此题(记入缓存使用)
				},
				user_ans: {}, //存放用户每题答案 索引 => res
				dingxiang: {
					'ans': [], //存放每次点击答案时的选项id
					'key': {
						'0': '0',
						'1': '1',
						'2': '2',
						'3': '3',
						'4': '4',
						'5': '5',
						'6': '6',
						'7': '7'
					},
					'start_check': [], //是否开始输入 控制按钮变色, 索引: '1
					//存放定项题 每个选项是否选择 索引: {a: 'is_checked', b: 'is_checked', ...}
					'abc': [], 
				},
				result: {}, //存放答题结果
			}
		},
		onShow() {
			if(app.globalData.userInfo == '') {
				uni.navigateTo({
					url: '../login/index',
				});
				return;
			}
		},
		onReady() {

			var that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.windowHeight = res.windowHeight;
					that.scrollH = res.windowHeight * 750 / res.windowWidth - 450;
					// #ifdef MP-WEIXIN
					that.scrollH = res.windowHeight * 750 / res.windowWidth - parseInt(res.safeArea.top) - 530;
					// #endif
				}
			});
			
		},
		onUnload() {
			myaudio.stop();
		},
		onLoad(options) {
			var _this = this;
			var url = app.globalData.site_url + '/appapi/?s=Home.getReadingList';
			request.requestApi(url, {
				id: options.id
			}).then(res => {
				_this.info = res.data.info[0];
				if(res.data.info[0].list != undefined) {
					for (var i = 0; i < res.data.info[0].list.length; i++) {
						var rs = res.data.info[0].list[i];
						rs.playInfo = {
							'isplay': 0,
							'length': '00:00'
						};
					}	
				}
				
			})

		},
		methods: {
			// 清空答题数据
			resetDati() {
				this.current = '0';
				this.is_show_result = '0';
				this.user_ans.length = 0;
				this.start_time = 0;
				this.currentQid = '1';
				this.right_cuo.length = 0;
				this.user_answer.ti_data.length = 0;
				this.user_ans = {};
				for (let idx in this.tiList) {
					this.dingxiang.ans[idx] = [];
					this.dingxiang.abc[idx] = [];
				}
				this.result = {}; //清空答题结果
			},
			datiAgain() {
				this.resetDati();
			},
			backIndex() {
				uni.reLaunch({
					url: '../index/index'
				})
			},
			// 关闭答题框
			closeDati(type) {
				let that = this;
				if(type == '0') {
					//未做完题关闭弹框
					uni.showModal({
						title: '是否退出本次答题?',
						content: '退出后，本次答题不计入成绩',
						showCancel: false,
						cancelText: '取消',
						cancelColor: '#969696',
						showCancel:true,
						confirmText: '确认退出',
						confirmColor: '#FE5A13',
						success: res => {
							if (res.confirm) {
								that.is_zhe_show = '0';
								that.is_zhe_top = '0';
								
								// 清空答题数据
								this.resetDati();
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}
				
				if(type == '1') {
					// 做完题关闭答题框
					that.is_zhe_show = '0';
					that.is_zhe_top = '0';
				}
				
			},
			/* 处理定项选择题(必须全部答案都选中才算做对)
			 * @param {Object} rs 答案字符串
			 * @param {Object} us 用户所选索引
			 */
			checkDingxiang(us) {
				if(this.start_time == 0) {
					this.start_time = Date.now();
				}
				
				// 每个选项选择之后就不可更改
				let cur = this.current;
				if(this.dingxiang.abc[cur][us] == 'is_checked') {
					return;
				}
				
				this.dingxiang.abc[cur][us] = 'is_checked';
				this.$set(this.dingxiang.abc[cur], us, 'is_checked');
				
				let rs = this.tiList[cur].answer.rs;
				let rsArr = rs.split(',');
				
				// 强制重新渲染页面数据
				for (let idx in this.dingxiang.key) {
					this.dingxiang.key[idx]++;
				}
				
				let curQid = this.tiList[this.current].id;	
				if(this.user_ans[curQid] == undefined) {
					this.user_ans[curQid] = [];
				}
			
				let usr_ans = this.dingxiang.ans[cur];
				if (usr_ans.indexOf(us) != '-1') {
					//存放到定项答案中
					this.dingxiang.ans[cur].splice(usr_ans.indexOf(us), 1);
					this.dingxiang.abc[cur][us] = 'is_checked';
					this.$set(this.dingxiang.abc[cur], us, 'is_checked');
					// 总答案中删除
					this.user_ans[curQid].splice(usr_ans.indexOf(us), 1);
			
				} else {
					this.dingxiang.ans[cur].push(us);
					this.dingxiang.abc[cur][us] = 'is_checked';
					this.$set(this.dingxiang.abc[cur], us, 'is_checked');
					
					// 存放到总答案中
					console.log(this.user_ans);
					this.user_ans[curQid].push(us);
				}
				
				this.user_answer.ti_data[this.current] = 'is_end';
			
			},
			//单选题 us用户选择答案
			checkDanxuan(us){
				if(this.start_time == 0) {
					this.start_time = Date.now();
				}
				let rs = this.tiList[this.current].answer.rs;
				if (this.user_answer.ti_data[this.current] == 'is_end') {
					return;
				}
				this.setAnsCache(rs, us);
			},
			/* 处理判断题
			 * @param {Object} us 用户点击的答案 1正确 0错误
			 */
			checkPanduan(us) {
				if(this.start_time == 0) {
					this.start_time = Date.now();
				}
				if (this.user_answer.ti_data[this.current] == 'is_end') {
					return;
				}
				let qid = this.tiList[this.current].id.toString();
				// 调用提交答案接口
				let usrAns = {
					'qid': qid,
					'rs': us
				};
				let rs = this.tiList[this.current].answer.rs;
				this.setAnsCache(rs, us);
			},
			//处理用户答题数据及选项显示状态
			setAnsCache(rs, us, type = '') {
				let that = this;
				let gData = app.globalData;
				
				// 改变此题状态为已做完 	
				that.user_answer.ti_data[that.current] = 'is_end';
				that.$set(that.user_answer.ti_data, that.current, 'is_end');
				
				// 判断和单选共用一个逻辑 	
				if (type == '') {
					if (rs == us) {
						that.user_answer.dui_num++; // 用户做对了 
						that.right_cuo[that.current] = '1';
						that.$set(that.right_cuo, that.current, '1');

					} else {
						that.user_answer.cuo_num++; //用户做错了 
						that.right_cuo[that.current] = '0';
						that.$set(that.right_cuo, that.current, '0');
					}
					console.log(that.right_cuo);
					// 存放用户答案 题目id => 答案
					that.user_ans[that.tiList[that.current].id] = us;
				}
				
			},
		
				// 获取试题列表
			getTestsList() {
				
				uni.request({
					url: app.globalData.site_url + '/appapi/?s=Tests.getTestsList',
					method: 'GET',
					data: {
						'reading_id': this.reading_id,
						'uid': app.globalData.userInfo.id,
						'token': app.globalData.userInfo.token
					},
					success: res => {
						let rs_code = res.data.data.code;
						if(rs_code != 0) {
							uni.showToast({
								icon: 'none',
								title: res.data.data.msg
							});
							if(rs_code == 700) {
								uni.navigateTo({
									url: '../login/index',
								});
								return;
							}
							
						}
						
						let tiList = res.data.data.info[0];
						if (tiList.length < 1) {
							//暂无试题 置空数组
							this.tiList.length = 0;
							return;
						}
						for (let idx in tiList) {
							tiList[idx].answer = JSON.parse(tiList[idx].answer);
							this.dingxiang.ans[idx] = [];
							this.dingxiang.abc[idx] = [];
						}
						this.tiList = tiList;
					},
					fail: () => {
						uni.showToast({
							title: '网络错误,请重试'
						});
					},
				});
			},
			// 选择上一题 /下一题
			checkTi(ti_num) {
				this.check_ti = ti_num;
				//上一题
				if (ti_num == '1') {
					if(this.current == '0') {
						return;
					}
					this.current--;
					this.currentQid--;
				}

				// 下一题
				if (ti_num == '2') {
					// 做完当前题才可做下一题
					if(this.user_answer.ti_data[this.current] != 'is_end') {
						uni.showToast({
							icon:'none',
							title: '请先答当前题目',
						});
						return;
					}
										
					// 做到最后一题直接交卷
					if(this.current == (this.tiList.length -1)) {
						// 参数 用户id 试题id
						this.subTests();
					}
					this.current++;
					this.currentQid++;
				}

			},
			// 提交答案
			subTests(){
				let that = this;
				
				let url = app.globalData.site_url + '/appapi/?s=Tests.subTests';
				uni.request({
					url: url,
					method: 'GET',
					data: {
						'uid': app.globalData.userInfo.id,
						'token': app.globalData.userInfo.token,
						'testsid': that.reading_id,
						'answer': JSON.stringify(that.user_ans),
						'start_time': that.start_time
					},
					success: res => {
						
						if(res.data.data.code == 0) {
							that.result = res.data.data.info;
							let score = res.data.data.info['res_score']
							if(score > 0) {
							   uni.showToast({
								title: '积分+' + score,
								image: '../../static/images/jifen_shan.png',
								mask: true
							   });
							}
							
							setTimeout(function(){
								that.is_show_result = '1';
							}, 1000);
							
						} else {
							uni.showToast({
								icon: 'none',
								title: '提交失败, 请重试'
							});
						}
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '网络错误'
						});
					},
				});
			},
			play(e) {
				let index = e.currentTarget.dataset.index;
				let isplay = e.currentTarget.dataset.isplay;
				let url = e.currentTarget.dataset.url;
				let info = this.info;

				if (this.index != -1 && this.index != index) {
					this.info.list[this.index].playInfo.isplay = 2;
				}
				
				myaudio.title = this.info.list[index].title;
				
				if (isplay == 0) { //从头播放
					this.info.list[index].playInfo.isplay = 1;
					myaudio.src = url;
					myaudio.play();
				}
				if (isplay == 1) { //暂停
					this.info.list[index].playInfo.isplay = 2;
					if (this.index != index) {
						myaudio.src = url;
					}
					myaudio.pause();
				}
				if (isplay == 2) { //从中间播放
					this.info.list[index].playInfo.isplay = 1;
					if (this.index != index) {
						myaudio.src = url;
					}
					myaudio.play();
				}
				this.$forceUpdate(); //强制组件渲染	
				this.index = index;
				
				// 获取对应试题
				this.reading_id = e.currentTarget.dataset.id;
				this.getTestsList();
			}
		},
		created() {
			let that = this;
			
			myaudio.onEnded(function(){
				if (that.tiList.length < 1) {
					//暂无试题
					return;
				}
				that.is_zhe_show = '1';
				that.is_zhe_top = '1';
			});
			
		}
	}
</script>

<style>
	
	.index-li-text3 {
		float: right;
	}

	.index-li-text2 {
		color: #969696;
		margin-top: 12rpx;
	}

	.index-li-text1 {
		overflow: hidden;
		-webkit-line-clamp: 1;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		font-size: 36rpx;
	}

	.index-li-text {
		float: left;
		margin-left: 20rpx;
		width: 80%;
	}

	.index-li image {
		width: 70rpx;
		height: 70rpx;
		float: left;
		margin-top: 14rpx;
	}

	.index-li {
		clear: both;
		overflow: hidden;
		padding: 30rpx 0 30rpx 0;
		width: 90%;
		margin: 0 auto;
		border-bottom: 1rpx solid #F0F0F0;
	}

	.index-audio:nth-of-type(1) {
		margin-top: 34rpx;
	}

	.index-audio {
		margin: 0 auto;
		display: block;
		width: 608rpx;
		margin-top: 10rpx;
	}

	.index-top-title {
		text-align: center;
		width: 80%;
		margin: 0 auto;
		margin-top: 54rpx;
		font-size: 42rpx;
		font-weight: 500;
		letter-spacing: 1rpx;
	}

	.index-top-img {
		width: 80%;
		margin: 0 auto;
		display: block;
		height: 398rpx;
		border-radius: 24rpx;
		margin-top: 40rpx;
	}

	/* 遮罩区域 */
	.zhe {
		width: 82%;
		height: calc(75vh);
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 99999;
		margin: auto;
		border-radius: 12rpx;
		padding: 30rpx;
		padding-bottom: 60rpx;
		background-color: #FFFFFF;
	}

	.zhe-type {
		display: flex;
		align-items: center;
		background-color: #FFFFFF;
		border-bottom: 2rpx solid #F0F0F0;
		margin-bottom: 40rpx;
	}

	.zhetop {
		background-color: #000;
		background: rgba(0, 0, 0, 0.2);
		z-index: 4999;
		position: fixed;
		top: 0rpx;
		min-height: 2000rpx;
		width: 100%;
	}


	.shu {
		display: inline-block;
		background-color: #FE5A13;
		height: 40rpx;
		width: 10rpx;
		margin-right: 14rpx;
	}

	.zhe-title {
		display: inline-block;
		width: 80%;
	}

	.current-ti-num {
		font-size: 50rpx;
	}

	.que-content {
		line-height: 45rpx;
		margin-bottom: 40rpx;
	}

	.option-item {
		min-height: 110rpx;
		background-color: #F2F2F4;
		margin-bottom: 20rpx;
		border-radius: 11rpx;
		display: flex;
		align-items: center;
		padding-left: 20rpx;
	}

	.ti-btn-wrap {
		height: 100rpx;
		width: 600rpx;
		position: absolute;
		left: 50%;
		transform: translate(-50%);
		bottom: 10rpx;
	}

	.ti-btn {
		display: inline-block;
		width: 45%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		position: absolute;
		border-radius: 13rpx;
		border: 2rpx solid #F2F2F4;
		font-size: 30rpx;
	}

	.pre-ti-btn {
		left: 20rpx;
		background-color: #FFFFFF;
	}

	.next-ti-btn {
		right: 20rpx;
	}

	.check_ti {
		background-color: #FE5A13 !important;
		color: #FFFFFF;
	}

	.option-item {
		color: #707376;
	}
	
	.duicuo-img {
		margin-right: 20rpx;
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		flex-shrink: 0;
	}
	
	/* 正确答案颜色 */
	.optionright {
		background-color: rgba(254,90,19,0.2) !important;
		color: #FE5A13 !important;
	}
	
	.optionwhite {
		background-color: #FFFFFF !important;
	}
	
	
	
	/* 结果页 样式 */
	
	.top_tips{
	  background: url('http://wycs2.sdwanyue.com/wxsmall/tip.png') no-repeat;
	  background-size: 100% 100%;
	  width: 144px;
	  height: 40px;
	  position: fixed;
	  right: 0;
	  top: 2px;
	  font-size: 13px;
	  text-align: center;
	  line-height: 46px;
	  color: #fff;
	  z-index: 99;
	}
	.top{
	  background: url('https://dj.sdwanyue.com/uniapp/dati_bg.png') no-repeat center;
	  background-size: 100% 100%;
	  width: 100%;
	  height: 380rpx;  
	  position: absolute;
	  left: 0;
	  top: 0;
	  border-radius: 12rpx 12rpx 0 0;
	}
	
	.top_text1{
	  text-align: center;
	  color: #fff;
	  letter-spacing: 1px;
	  font-size: 20px;
	  position: relative;
	  top: 44px;
	}
	
	.top_text2{
	  color: #FF4D00;
	  text-align: center;
	  letter-spacing: 1px;
	  font-size: 35rpx;
	  margin-top: 90rpx;
	}
	
	.top_text3{
	  color: #FF4D00;
	  font-size: 52px;
	  text-align: center;
	  margin-top: 10px;  
	}
	
	
	.result-bottom {
		margin-top: 380rpx;
	}
	
	.li{
	  width: 100%;
	  height: 105rpx;
	  border-bottom: 1px solid #FBFBFB;
	  line-height: 105rpx;
	}
	
	.li_img{
	  width: 20px;
	  height: 20px;
	  margin-top: 17px;
	  margin-left: 20px;
	}
	
	.li_text{
	  margin-left: 12px;
	  color: #8D9EB7;
	  font-size: 30rpx;
	  position: relative;
	  top: -4px;
	}
	.tips{
	  color: #fff;
	  font-size: 10px;
	  margin-top: 30px;
	  text-align: center;
	  font-weight: 100;
	  letter-spacing: 1px;  
	}
	
	#back{
	  color: #707376;
	  background: #fff;
	  padding: 0;
	  height: 55px;
	  width: 90%;
	  line-height: 55px;
	  font-size: 15px;
	  letter-spacing: 1px;
	  margin-top: 30px;
	  border: 1px solid #F2F2F4;
	  font-weight: 300;
	  margin-bottom: 30px;
	}  
	
	.button_view{
	  width: 90%;
	  margin: 0 auto;
	  clear: both;
	  overflow: hidden;  
	  position: absolute;
	  bottom: 10rpx;
	}
	
	#button_view_prev{
	  float: left;
	  width:36%;
	  height: 50px;
	  line-height: 50px;
	  padding: 0;
	  color: #fff;
	  background: #487AFF;
	  border: 1px solid #F2F2F4;
	  font-weight: 300;
	  letter-spacing: 1px;
	  border: 1px solid #F2F2F4;
	}
	
	#button_view_next{
	  float: left;
	  width:47%;
	  height: 45px;
	  line-height: 45px;
	  padding: 0;
	  color: #707376;
	  background: #fff;
	  font-weight: 300;
	  letter-spacing: 1px;
	  margin-left: 2%;
	  border: 1px solid #F2F2F4;
	  text-align: center;
	}
	#button_view_getgift{
	  float: left;
	  width:47%;
	  height: 45px;
	  line-height: 45px;
	  padding: 0;
	  color: #fff;
	  background: linear-gradient(#FF6224,#FF3615);
	  border: 1px solid #F2F2F4;
	  font-weight: 300;
	  letter-spacing: 1px;
	  border: 1px solid #F2F2F4;
	  margin-left: 2%;
	  text-align: center;
	}
	
	#button_view_prev1{
	  float: left;
	  width:47.5%;
	  height: 50px;
	  line-height: 50px;
	  padding: 0;
	  color: #fff;
	  background: #487AFF;
	  border: 1px solid #F2F2F4;
	  font-weight: 300;
	  letter-spacing: 1px;
	  border: 1px solid #F2F2F4;
	}
	
	#button_view_next1{
	  float: left;
	  width:47.5%;
	  height: 50px;
	  line-height: 50px;
	  padding: 0;
	  color: #707376;
	  background: #fff;
	  font-weight: 300;
	  letter-spacing: 1px;
	  margin-left: 5%;
	  border: 1px solid #F2F2F4;
	}
	
	.close-icon {
		display: inline-block;
		width: 35rpx;
		height: 35rpx;
		position: absolute;
		right: 20rpx;
		top: 10rpx;
		z-index: 9999;
	}
	
	
	
</style>
