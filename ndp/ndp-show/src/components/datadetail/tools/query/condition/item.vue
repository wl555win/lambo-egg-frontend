<template xmlns="http://www.w3.org/1999/html">
  <span>
    &nbsp;&nbsp;&nbsp;{{searchName}}：
    <search :searchType="searchType" :helpBoxUrl="helpBoxUrl" :helpBoxColumns="helpBoxColumns" :title="helpBoxTitle"
          :muliSelect="muliSelect" :inputKey="inputKey" @onOk="onOk" @onClear="onClear"></search>
  </span>
</template>

<script>
  import search from "../../search/search";
  export default {
    name: "item",
    data(){
      return{
        searchName:'商品',
        searchType:"helpbox",
        helpBoxUrl:'/manage/dataSubject/getConditionData?dimensionType=item',
        helpBoxColumns: [{
          title:'品牌',
          key:"brdowner_name",
          sortable:true
        },{
          title:'商品名称',
          key:"item_name",
          sortable:true
        }],
        muliSelect:false,
        helpBoxTitle:'商品选择',
        inputKey:'item_name',
      }
    },
    props:{
      item:Object
    },
    computed: {
      cellCode:function () {
        return this.item.cell_code;
      }
    },
    components:{
      search
    },
    methods:{
      showHelpBox:function(){
        this.helpBoxShow = true;
      },
      onOk:function(result){
        var self = this;
        var data = {
          operType:"add",
          searchType:'=',
          value:result.item_id,
          cellCode:self.cellCode
        }
        this.$emit("changeParams",data);
      },
      onClear:function(result){
        var self = this;
        var data = {
          operType:"del",
          cellCode:self.cellCode
        }
        this.$emit("changeParams",data);
      }
    },
  }
</script>

<style scoped>

</style>
