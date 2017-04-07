var app = new Vue({
	el: "#app",
	data: {
		showCancel: true
	},
	router : router,
	methods:{
		goback:function(){
			bus.answeredQuestions.pop();
			var len = bus.answeredQuestions.length;
			var questionobj = bus.answeredQuestions[len - 1];
			
			var questionAndAnswer = {};
			
			questionAndAnswer.answer = bus.answeredQuestions && bus.answeredQuestions.length ? bus.answeredQuestions : [];
			questionAndAnswer.nextQuestion = questionobj;
			questionAndAnswer.index = bus.index ? bus.index - 1 : 1;
			
			bus.$emit("gotonext", questionAndAnswer);
			window.sessionStorage['vue-data'] = JSON.stringify(questionAndAnswer);
			console.log(window.sessionStorage['vue-data']);
			
			router.push('/xiangou/' + questionobj.optionType + '/' + questionobj.id);
		}
	},
	watch:{
		'$route':function(to, from){
			if(to.path == '/' || to.path == '/xiangou'){
				window.sessionStorage.removeItem('vue-data');
				console.log(window.sessionStorage['vue-data']);
				this.showCancel = false;
			}
			else{
				this.showCancel = true;
			}
			
			if((to.path.indexOf('/xiangou/radio/') != -1 || to.path.indexOf('/xiangou/input/') != -1 || to.path.indexOf('/xiangou/result/') != -1) && to.params.qid != null){
		
		
				var initdata = {
					answer:null,
					index:1,
					nextQuestion: bus.questions[to.params.qid]
				};
				
				//刷新路由时，已回答的问题集合只能从sessionstorage中获取，当前第几题也是从storage中取
				var questionAndAnswer = window.sessionStorage['vue-data'] ? JSON.parse(window.sessionStorage['vue-data']) : initdata;
				console.log(questionAndAnswer);
				
				//bus.currentAnswer = questionAndAnswer.answer;
				bus.answeredQuestions = questionAndAnswer.answer && questionAndAnswer.answer.length ? questionAndAnswer.answer : [];
				bus.currentQuestion = questionAndAnswer.nextQuestion;
				bus.index = questionAndAnswer.index;
			}
		}
	}
});

/* **************************
*        路由跳转前的钩子
* ***************************/
/*router.beforeEach(function(to, from, next){
	console.log(window.sessionStorage['vue-data']);
	if(to.path == '/' || to.path == '/xiangou'){
		window.sessionStorage.removeItem('vue-data');
		console.log(window.sessionStorage['vue-data']);
		app.showCancel = false;
	}
	else{
		app.showCancel = true;
	}

	//根据问题ID获取问题内容
	if((to.path.indexOf('/xiangou/radio/') != -1 || to.path.indexOf('/xiangou/input/') != -1 || to.path.indexOf('/xiangou/result/') != -1) && to.params.qid != null){
		//bus.index = bus.index != null ? (bus.index+1) : 1;
		//bus.currentQuestion = bus.questions[to.params.qid];
		
		initdata = {
			answer:null,
			index:1,
			nextQuestion: bus.questions[to.params.qid]
		};
		
		//刷新路由时，已回答的问题集合只能从sessionstorage中获取，当前第几题也是从storage中取
		var questionAndAnswer = window.sessionStorage['vue-data'] ? JSON.parse(window.sessionStorage['vue-data']) : initdata;
		console.log(questionAndAnswer);
		
		bus.currentAnswer = questionAndAnswer.answer;
		bus.currentQuestion = questionAndAnswer.nextQuestion;
		bus.index = questionAndAnswer.index;
		//bus.$emit("gotonext", questionAndAnswer);
	}

	next();
});
*/
bus.$on("gotonext", function(answerandquestion){
	//bus.currentAnswer = answerandquestion.answer;
	bus.answeredQuestions = answerandquestion.answer && answerandquestion.answer.length ? answerandquestion.answer : [];			
	bus.currentQuestion = answerandquestion.nextQuestion;
	bus.index = answerandquestion.index;
});