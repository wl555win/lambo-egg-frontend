<template>
  <LamboLogin :defaultUserName="defaultUserName" :defaultPassword="defaultPassword" @do-login="doLogin"></LamboLogin>
</template>
<script>
  import Config from '@/config/config';
  import util from '@/libs/util';

  export default {
    data() {
      return {
        defaultUserName:"admin",
        defaultPassword:"123456",
        successForwardUrl: Config.homePage
      }
    },
    methods:{
      doLogin:function(params){
        var self = this;
        util.ajax.post('/login', {
          username:params.username,
          password:params.password
        }).then(function (resp) {
          var result = resp.data;
          if (result.code == 1) {
            window.location.href = self.successForwardUrl;
          } else {
            self.$Message.error(result.data);
          }
        })
      }
    },
    mounted() {

    }
  }
</script>
