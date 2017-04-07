var routes = [
	{ path: '/', component: Nav },
	{ path: '/xiangou', component: XianGouHomepage },
	{ path: '/xiangou/radio/:qid', component: QuestionRadio },
	{ path: '/xiangou/input/:qid', component: QuestionInput },
	{ path: '/xiangou/result/:qid', component: XianGouResult }
]
var router = new VueRouter({
	routes : routes,
});