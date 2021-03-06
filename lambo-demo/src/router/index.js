import Vue from 'vue'
import iView from 'iview';
Vue.use(iView);
import Router from 'vue-router'
import login from '@/components/login/login'
import frame from '@/components/frame/frame'
import home from '@/components/home/home'
import pagingTable from '@/components/table/paging-table'
import editableTable from '@/components/table/editable-table'
import dragableTable from '@/components/table/dragable-table'
import countTo from '@/components/other/count-to/count-to'
import draggableList from '@/components/other/draggable-list/draggable-list'
import fileUpload from '@/components/other/file-upload/file-upload'
import imageEditor from '@/components/other/image-editor/image-editor'
import splitPane from '@/components/other/split-pane/split-pane-page'
import helpBox from '@/components/other/helpbox/helpbox'
import treeTable from '@/components/table/tree-table'
import permission from '@/components/other/permission/permission'

import RestSettingEdit from '@/components/rest/RestSettingEdit'
import RestSettingQuery from '@/components/rest/RestSettingQuery'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: {name:'登录页'}
    },
    {
      path: '/login',
      name: '登录页',
      component: login,
      meta:{
        anonymous:true
      }
    },
    {
      path: "/frame",
      name: "菜单框架",
      component: frame,
      children: [
        {
          path: 'home',
          meta:{
            title: '首页',
          },
          name: '驾驶舱',
          component: home
        },
        {
          path: 'table/paging-table',
          meta:{
            title: '分页表格示例',
          },
          name:'分页表格',
          component: pagingTable
        },
        {
          path: 'table/editable-table',
          meta:{
            title: '可编辑表格示例',
          },
          name:'可编辑表格',
          component: editableTable
        },
        {
          path: 'table/dragable-table',
          meta:{
            title: '拖拽排序表格示例',
          },
          name:'拖拽排序表格',
          component: dragableTable
        },
        {
          path: 'table/tree-table',
          meta:{
            title: '树形表格示例',
          },
          name:'树形表格',
          component: treeTable
        },
        {
          path: 'other/count-to',
          meta:{
            title: '数字渐变示例',
          },
          name:'数字渐变',
          component: countTo
        },
        {
          path: 'other/draggable-list',
          meta:{
            title: '可拖拽列表示例',
          },
          name:'可拖拽列表',
          component: draggableList
        },
        {
          path: 'other/file-upload',
          meta:{
            title: '文件上传示例',
          },
          name:'文件上传',
          component: fileUpload
        },
        {
          path: 'other/image-editor',
          meta:{
            title: '图片编辑示例',
          },
          name:'图片编辑',
          component: imageEditor
        },
        {
          path: 'other/split-pane',
          meta:{
            title: '可拖动布局示例',
          },
          name:'可拖动布局',
          component: splitPane
        },
        {
          path: 'other/helpbox',
          meta:{
            title: '帮助框示例',
          },
          name:'帮助框',
          component: helpBox
        },
        {
          path: 'other/permission',
          meta:{
            title: '权限测试页',
          },
          name:'权限测试',
          component: permission
        },
        {
          path: 'rest/query',
          meta:{
            title: '测试query',
          },
          name:'测试query',
          component: RestSettingQuery
        },
        {
          path: 'rest/edit',
          meta:{
            title: '测试edit',
          },
          name:'restSettingEdit',
          component: RestSettingEdit
        }


      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

export default router;
