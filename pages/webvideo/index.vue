<template>
	<view>
		<view class="content">
			<video :src="url"></video>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:''
			}
		},
		onLoad(options){
			this.url = options.url
		},
		methods: {
			
		}
	}
</script>

<style>
	.content{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.content video{
		width: 100%;
		height: 100%;
	}
</style>
