<template>
  <div class="insert-box">

    <div class="header" >
      <div class="title">服务明细</div>
      <div class="btn-box">
        <Button type="primary" icon="plus" @click="showPage('insert')" v-if="stru.isLeaf==='0'">新增</Button>
        <Button type="primary" icon="edit" @click="showPage('update')" v-if="stru.struId !='0' ">修改</Button>
        <Button type="success" icon="checkmark" @click="doCheck" v-if="stru.isLeaf==='1'">测试</Button>
        <Button type="error" icon="trash-a" @click="doDelete" v-if="stru.struId !='0' ">删除</Button>
        <div style="clear:both;"></div>
      </div>
    </div>

    <Form :label-width="100">

      <Card>
        <p slot="title">
          <Icon type="network"></Icon>
          节点信息
        </p>
        <FormItem label="节点名称：">
          {{stru.struName}}
        </FormItem>
        <FormItem label="节点URL：" v-if="stru.struId!=0">
          {{stru.struUrl}}
        </FormItem>
        <FormItem label="节点类型：" v-if="stru.struId!=0">
          <span v-if="stru.isLeaf==0">文件目录</span>
          <span v-else>数据服务</span>
        </FormItem>
        <FormItem label="显示顺序：" v-if="stru.struId!=0">
          {{stru.orderSeq}}
        </FormItem>
      </Card>


      <div class="part" v-if="stru.isLeaf==='1'">
        <Card>
          <p slot="title">
            <Icon type="gear-a"></Icon>
            服务配置
          </p>
          <FormItem label="服务URL：">
            {{setting.url}}
          </FormItem>
          <FormItem label="数据源：">
            <RadioGroup v-model="setting.datasource" >
              <Radio v-for="item in dsObj" :label="item.dsId" disabled>{{item.dsName}}</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="操作类型：">
            <RadioGroup v-model="setting.operationType">
              <Radio label="selectList" disabled>selectList</Radio>
              <Radio label="selectOne" disabled>selectOne</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="服务描述：">
            {{setting.note}}
          </FormItem>
          <FormItem label="参数：">
            <div class="line-table">
              <Table :data="paramsData" :columns="columns" ></Table>
            </div>
          </FormItem>
          <FormItem label="取数逻辑：">
            <Tabs class="tabs" size="small">
              <TabPane label="SQL模板" >
                <Input v-model="setting.restSql" type="textarea" :autosize="{minRows: 20,maxRows:40}" readonly />
              </TabPane>
              <TabPane label="MOCK数据" >
                <Button type="ghost" class="download"><Icon type="ios-cloud-download-outline"></Icon> <a :href="downloadUrl + '/'+setting.restId " :download=setting.restName>下载MOCK数据</a></Button>
                <Input v-model="setting.mockData" type="textarea" :autosize="{minRows: 20,maxRows:40}" readonly />
              </TabPane>
            </Tabs>
          </FormItem>

          <FormItem label="创建时间：">
            {{setting.createTime}}
          </FormItem>
          <FormItem label="修改时间：" v-if="setting.createTime != setting.updateTime">
            {{setting.updateTime}}
          </FormItem>
          <FormItem label="创建人：" v-if="setting.createTime == setting.updateTime">
            {{setting.createUser}}
          </FormItem>
          <FormItem label="修改人：" v-if="setting.createTime != setting.updateTime">
            {{setting.createUser}}
          </FormItem>

        </Card>

      </div>

    </Form>
  </div>
</template>

<script>
  import util from '@/libs/util';
  import config from '@/config/config';
  export default {
    props: {
      struId:{
        type:String,
        default:''
      },
      struName:{
        type:String,
        default:''
      }
    },
    data () {
      return {
        dsObj:[],
        downloadUrl:"/"+config.serverContext+"/manage/mock/file/get",
        stru:{
          struId:this.struId,
          struName:this.struName,
          struUrl:'',
          isLeaf:'',
          parentId:'',
          restId:'',
          isUse:'',
          orderSeq:''
        },
        setting:{
          restId:'',
          restName:'',
          url:'',
          operationType:'',
          datasource:'',
          restSql:'',
          mockData:'',
          note:'',
          createTime:'',
          updateTime:'',
          createUser:''
        },
        paramsData: [],
        columns: [
          {
            title: '序号',
            type: 'index',
            minWidth: 100,
            align: 'center'
          },
          {
            title: '参数编码',
            align: 'center',
            key: 'paramKey',
            minWidth: 200
          },
          {
            title: '参数名称',
            align: 'center',
            key: 'paramName',
            minWidth: 200
          },
          {
            title: '是否必须',
            align: 'center',
            minWidth: 200,
            key: 'necessaryName'
          },
          {
            title: '默认值',
            align: 'center',
            key: 'defaultValue',
            minWidth: 200,
            editor:{
              type:"text"
            }
          },
          {
            title: '说明',
            align: 'center',
            key: 'note',
            minWidth: 200,
            editor:{
              type:"text"
            }
          }
        ]
      }
    },
    methods:{
      doCheck(){
        this.$emit("check-rest",this.setting.restId);
      },
      showPage(pageType){
        this.$emit("show-page",pageType);
      },
      doDelete(){
        var self = this;
        var struId = self.stru.struId;
        util.ajax.get('/manage/rest/stru/queryChildren?parentId='+struId).then(function(resp){
          var result = resp.data;
          if(result.code == '1'){
            if(result.data && result.data.length>0){
              self.$Modal.confirm({
                title: '',
                content: '<p>含有下级节点，不能删除！</p>'
              });
            }else{
              self.$Modal.confirm({
                title: '',
                content: '<p>确定要删除吗?</p>',
                onOk: () => {
                  util.ajax.post("/manage/rest/stru/delete/" + struId).then(function(resp) {
                    self.$Message.success('删除成功');
                    //删除树的节点
                    self.$emit("delete-tree-node",struId,self.stru.parentId);
                  }).catch(function(err) {
                    self.$Message.error('删除失败,请联系系统管理员');
                  });
                }
              });
            }
          }
        });

      },
      setDsObj(){
        var self = this;
        util.ajax.get("/manage/rest/datasource/queryAll").then(function(resp) {
          var result = resp.data;
          if (result.code == '1') {
            var objs = result.data;
            if(objs && objs.length>0){
              objs.forEach(item => {
                let ds = {
                  dsId: item.dsId,
                  dsName: item.dsName,
                  dsType: item.dsType
                };
                self.dsObj.push(ds);
              });
            }
          }
        });
      },
      getRest(){
        var self = this;
        if(self.struId == '0'){
          self.stru.struId = self.struId;
          self.stru.struName = self.struName;
          self.stru.struUrl = '';
          self.stru.isLeaf = '0';
          self.stru.parentId = '';
          self.stru.restId = '';
          self.stru.isUse = '1';
          self.stru.orderSeq = '';
        }else{
          util.ajax.get('/manage/rest/stru/query?struId='+self.struId).then(function(resp) {
            var result = resp.data;
            if (result.code == '1') {
              self.stru.struId = result.data.struId;
              self.stru.struName = result.data.struName;
              self.stru.struUrl = result.data.struUrl;
              self.stru.isLeaf = result.data.isLeaf;
              self.stru.parentId = result.data.parentId;
              self.stru.restId = result.data.restId;
              self.stru.isUse = result.data.isUse;
              self.stru.orderSeq = result.data.orderSeq;

              if(self.stru.isLeaf == '1'){
                util.ajax.get('/manage/rest/setting/query?restId='+self.stru.restId).then(function(resp){
                  var result2 = resp.data;
                  if(result2.code == '1'){

                    var restSetting = result2.data.restSetting;
                    if(restSetting){
                      self.setting.restId = restSetting.restId;
                      self.setting.restName = restSetting.restName;
                      self.setting.url = restSetting.url;
                      self.setting.operationType = restSetting.operationType;
                      self.setting.datasource = restSetting.datasource;
                      self.setting.restSql = restSetting.restSql;
                      self.setting.mockData = restSetting.mockData;
                      self.setting.note = restSetting.note;
                      self.setting.createTime = restSetting.createTime;
                      self.setting.updateTime = restSetting.updateTime;
                      self.setting.createUser = restSetting.createUser;
                    }

                    self.paramsData.splice(0,self.paramsData.length);
                    var paramsList = result2.data.restSettingParamsList;
                    if(paramsList && paramsList.length>0){
                      paramsList.forEach(params => {
                        let row = {
                          restId: params.restId,
                          paramKey: params.paramKey,
                          paramName: params.paramName,
                          necessary: params.necessary,
                          necessaryName:params.necessary==0?'否':'是',
                          defaultValue: params.defaultValue,
                          note:params.note
                        };

                        self.paramsData.push(row);

                      });
                    }
                  }

                });
              }
            }
          });
        }
      }
    },
    watch: {
      struId(){
        this.getRest();
      }
    },
    mounted:function(){
      this.setDsObj();
      this.getRest();
    }
  }
</script>

<style lang="less" scoped>
  .insert-box{
    .header{
      height:70px;
      padding:0 20px;
      margin-bottom:20px;
      border-bottom:1px solid #e9eaec;
      position:relative;
      .title{
        font-size:16px;
        line-height:1;
        font-weight:bold;
        border-left:4px solid #495060;
        text-indent:10px;
        position:absolute;
        top:28px;
      }
      .btn-box{
        position:absolute;
        right:20px;
        top:20px;
        Button{
          float:left;
          margin-left:5px;
        }
      }
    }
    Form{
      padding:0 20px;
      .part {
        margin-top:20px;
        .line-table{
          .table-btn{
            margin-bottom:10px;
          }
        }
        .tabs{
          margin-bottom:10px !important;
        }
      }
      .download {
        margin-bottom:10px;
        a{
          color:#495060;
        }
      }
    }
  }
</style>
