Vue.config.devtools = true;

Vue.component('toast-layer',{
	template:'<div class="dui-component-tips" v-show="showKnow == true"><div class="dui-component-tips-text"><slot>{{message}}</slot><p class="txtRight pt_5" ><a href="javascript:;" class="btn-small btn-silver in_block" v-on:click="hideToast()">我知道了</a></p></div><div class="dui-component-arrow dui-component-arrow-left"></div></div>',
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
});

var app = new Vue({
	el:"#app"
});