
//导航组件只要加载html就好了，基本没有操作
var Nav = {
	template: '#navigation-template'
}

//限购查询－首页  这个页面也只是一些说明，没有数据绑定
var XianGouHomepage = {
	template : '#xiangou-homepage-template'
}

//限购查询－选择题  进这个组件时，需要根据url中的id，获取当前问题的相关信息，以及当前第一题
var QuestionRadio = {
	template : '#question-radio-template',
	computed: {
		question: function() {//从bus读取当前问题内容
			console.log(bus.currentQuestion);
			return bus.currentQuestion;
		},
		index: function() {//从bus读取当前答题题号
			return bus.index;
		}
	},
	methods: {
		nextRouteType: function(qid) {//生成选项按钮跳转路由 -- 因为computed中不能传参，所以放在method中
			return bus.questions[qid].optionType;
		},
		selectedEvt: function(option) {//点击选项按钮时记录当前问题和选中项
			var questionAndAnswer = {};
			//questionAndAnswer[this.question.description] = option.text;
			//bus.$emit("gotonext", questionAndAnswer);
			
			questionAndAnswer.answer = bus.answeredQuestions && bus.answeredQuestions.length ? bus.answeredQuestions : [];
			questionAndAnswer.answer.push({id:this.question.id,text:option.text,optionType:this.question.optionType});//先只把答案返回，等做到填空题再处理 todo
			questionAndAnswer.nextQuestion = bus.questions[option.next];
			questionAndAnswer.index = this.index ? this.index + 1 : 1;
			
			bus.$emit("gotonext", questionAndAnswer);
			window.sessionStorage['vue-data'] = JSON.stringify(questionAndAnswer);
			console.log(window.sessionStorage['vue-data']);
			
			router.push('/xiangou/' + this.nextRouteType(option.next) + '/' + option.next);
		}
	}
}
//限购查询－输入数字题
var QuestionInput = {
	template : '#question-input-template',
	data: function(){
		return {
			a: null,
			b: null,
			c: null,
			d: null,
			e: null,
			f: null,
			g: null
		}
	},
	computed: {
		question : function(){
			return bus.currentQuestion;
		},
		index: function(){
			return bus.index;
		}
	},
	methods: {
		keymodel: function(key){
			return eval(key);
		}
	}
}

//限购查询－结果页
var XianGouResult = {
	template: '#xiangou-result-template',
	computed: {
		answeredQeustions : function(){
			return bus.answeredQeustions;
		}
	},
	methods: {
		result : function(qid){
			return bus.questions[qid].result;
		}
	}
}