const albumShowComponent = {
	template:`
		<div id="modal_album">
			<div v-on:click="closePop()"><slot name="head"></slot></div>
			<div class="album_big">
				<div class="album_big_img">
					<img v-for="item in bigImgList" class="modal_lazy" 
					data-src="{{item.url}}" 
					onerror="this.src=http://cdn7.dooioo.com'/static/img/new-version/default_block.png'; this.onerror=null;" />
				</div>
				<div v-on:click="sliderPrev()"><slot name="prevBtn"></slot></div>
				<div v-on:click="sliderNext()"><slot name="nextBtn"></slot></div>
			</div>
			<slot name="smallalbumlist"></slot>
		</div>
	`,
	props:['bigImgList','index'],
	watch:{
		index: function(){//下标变了,需要变化当前图片的样式
			
		}
	},
	methods:{
		slideChangeIdx: function(){
			
		},
		sliderPrev: function(){
			this.index = this.index === 0 ? (this.bigImgList.length - 1) : (this.index - 1);
			this.slideChangeIdx();
		},
		sliderNext: function(){
			if(this.index === this.bigImgList.length - 1){
				window.setTimeout(function(){
					this.index = 0;
				},1000);
				
			}else{
				this.index += 1;
			}
			this.slideChangeIdx();
		}
	}
};

const app = new Vue({
	components: {
		'album-show': albumShowComponent
	},
	data:{
		index:0,
		bigImgList:[
			{
				url:'http://cdn1.dooioo.com/fetch/img/ptgi/1280@1_5/20160918/6aec803b-ae66-4d6a-a444-c96500f85857.jpg',
				title:"客厅"
			},
			{
				url:'http://cdn1.dooioo.com/fetch/img/ptgi/1280@1_5/20160918/6e0dd912-d0f6-4f53-a3dd-5d18b297ed9e.jpg',
				title:"厨房"
			}
		]
	}
});
