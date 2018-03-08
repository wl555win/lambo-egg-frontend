import Vue from 'vue';
import Config from '@/config/config';
var qs = require('qs');
let vm = new Vue();

function requestInterceptors(config){
	if(config.method === 'post') {
		config.data = qs.stringify(config.data);
	}
	return config;
}

function requestError(error){
	alert("服务器内部异常,请稍候再试");
    return Promise.reject(error);
}

function responseInterceptors(response){
    var data = response.data;
    if(data instanceof Object){
    	var code = data["code"];
    	if(code == "10106"){
    		if(confirm("会话已失效，是否重新登录")){
                window.location.href = Config.loginPage;
            }
    	}
    }
    return response;
}

function responseError(error){
    alert("服务器内部异常,请稍候再试");
    return Promise.reject(error);
}

export default {
	requestInterceptors,
	responseInterceptors,
	requestError,
	responseError
}