var bus = new Vue({
	data:{
		index : null,//存放当前第几题
		currentQuestion: null,//当前问题数据
		currentAnswer: null,
		answeredQuestions : [],//当前回答集合
		questions : {//所有的问题集合
			1: {
				id:1,
				description: "购房地？",
				optionType: 'radio',
				options:[
					{
						text: "浦东",
						next: "2"
					},
					{
						text: "浦西",
						next: "3"
					}
				],
				tips: '<p>1. 关于购房地的说明1</p><p>2. 关于购房地的说明22222</p>'
			},
			2 : {
				id:2,
				description: "购房人是个人还是公司",
				optionType: 'radio',
				options:[
					{
						text: "个人",
						next: "4"
					},
					{
						text: "公司",
						next: "5"
					}
				]
			},
			3: {
				id:3,
				description: {
					a: "您和配偶及未成年子女共的房屋套数",
					b: "您和父母共有的房屋套数",
					c: "您和您祖父母、外祖父母共有的房屋套数",
					d: "您配偶和父母共有的房屋套数",
					e: "您配偶和您祖父母、外祖父母共有的房屋套数"
				},
				optionType: 'input',
				options:[
					{
						text: "a+b+(c-2)+d+(e-2)>=2",
						next: "10"
					},
					{
						text: "a+b+(c-2)+d+(e-2)==1",
						next: "11"
					},
					{
						text: "a+b+(c-2)+d+(e-2)<=0",
						next: "12"
					}
				]
			},
			4: {
				id:4,
				description: "已婚还是未婚？",
				optionType: 'radio',
				options:[
					{
						text: "已婚",
						next: "6"
					},
					{
						text: "未婚",
						next: "7"
					}
				]
			},
			5: {
				id:5,
				description: "境内注册还是境外注册的公司？",
				optionType: 'radio',
				options:[
					{
						text: "境内",
						next: "8"
					},
					{
						text: "境外",
						next: "9"
					}
				]
			},
			6: {
				id:6,
				optionType: 'result',
				result: 2
			},
			7: {
				id:7,
				optionType: 'result',
				result: 1
			},
			8: {
				id:8,
				optionType: 'result',
				result: 1
			},
			9: {
				id:9,
				optionType: 'result',
				result: 0
			},
			10: {
				id:10,
				optionType: 'result',
				result: 0
			},
			11: {
				id:11,
				optionType: 'result',
				result: 1
			},
			12: {
				id:12,
				optionType: 'result',
				result: 2
			}
		}
	}
});
