<template>
	<div class="dui-component-tips">
		<div class="dui-component-tips-text" v-show="showKnow == true">
			
			<slot>{{message}}</slot>
			<p class="txtRight pt_5" >
				<a href="javascript:;" class="btn-small btn-silver in_block" v-on:click="hideToast()">我知道了</a>
			</p>
		</div>
		<div class="dui-component-arrow dui-component-arrow-left"></div>
	</div>
</template>

<style type="text/css">
	.dui-component-tips{
		position: absolute;
	    z-index: 9999;
	    visibility: visible;
	    left: 84px;
	    top: 419px;
	}
	.dui-component-tips-text{
		padding: 5px 12px;
	    font-size: 12px;
	    color: #fff;
	    line-height: 150%;
	    border-radius: 5px;
	    background-color: rgba(0, 0, 0, 0.8);
	}
	.txtRight{text-align: right;}
	.pt_5{padding-top: 5px;}
	.in_block{
	    display: -moz-inline-stack;
	    vertical-align: top;
	    display: inline-block;
	    zoom: 1;
	}
	.btn-small{
		border-radius: 4px;
	    text-decoration: none;
	    cursor: pointer;
	    height: 22px;
	    line-height: 22px;
	    padding: 0 14px;
	    font-size: 12px;
	    box-sizing: content-box;
	} 
	.btn-silver, .btn-silver.disable:hover, .btn-silver.disable:active {
	    color: #333;
	    background-color: #f3f3f3;
	    border: 1px solid #b7b7b7;
	    background-image: -webkit-linear-gradient(bottom, #e7e7e7, #fff);
	    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),0 1px 2px rgba(0, 0, 0, 0.05);
	}
	.dui-component-arrow {
	    width: 0;
	    height: 0;
	}
	.dui-component-arrow-left {
    	position: absolute;
	    top: 0;
	    right: -6px;
	    transform: rotate(-135deg);
	    border-top: 8px solid transparent;
	    border-bottom: 8px solid transparent;
	    border-left: 8px solid rgba(0, 0, 0, 0.8);
	}
</style>
<script>
	export default {
		name:'toast-layer',
		data:function(){
			return {
				message:'我已经仔细阅读过了',
				showKnow:true
			}
		},
		created:function(){
			this.showKnow = localStorage['canshowToast'] !== 'hide';
		},
		methods:{
			hideToast:function(){
				this.showKnow = false;
				localStorage['canshowToast'] = 'hide';
			}
		}
	}
</script>