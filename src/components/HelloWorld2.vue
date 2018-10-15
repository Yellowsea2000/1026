<template>
<div class="box">
  <ul class="tableHead">
    <li @click="selectBtn1()">机构</li>
    <li @click="selectBtn2()">分析主题</li>
    <li @click="selectBtn3()">分析子主题</li>
    <li @click="selectBtn4()">报表</li>
  </ul>
  <!-- 下拉框 -->
  <ul class="select select1" v-show="isShow == 'a'">
      <li v-for="(item,index) in dataList1" :key="index">
        <input type="checkbox" @click="selectChecked1(item,index)">
        <span>{{item.name}}</span>
      </li>
  </ul>
  <ul class="select select2" v-show="isShow == 'b'">
      <li v-for="(item,index) in dataList2" :key="index">
        <input type="checkbox" @click="selectChecked2(item,index)">
        <span>{{item.name}}</span>
      </li>    
  </ul>
  <ul class="select select3" v-show="isShow == 'c'">
      <li v-for="(item,index) in dataList3" :key="index">
        <input type="checkbox" @click="selectChecked3(item,index)">
        <span>{{item.name}}</span>
      </li>    
  </ul>
  <ul class="select select4" v-show="isShow == 'd'">
      <li v-for="(item,index) in dataList4" :key="index">
        <input type="checkbox" @click="selectChecked4(item,index)">
        <span>{{item.name}}</span>
      </li>    
  </ul>
  <div class="shade" @click="selectOff()"></div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        isShow:'',
        arr1:[],
        arr2:[],
        arr3:[],
        arr4:[],
        button:false,
        tableData1: [{"companyName":'集团',"id":'s01'},{"companyName":'系列',"id":'s02'},{"companyName":'专业公司',"id":'s03'}],
        tableData2: [{"companyName":'财务分析',"id":'s01'},{"companyName":'财务分析',"id":'s02'},{"companyName":'财务分析',"id":'s03'},{"companyName":'经营分析',"id":'s03'},{"companyName":'资金',"id":'s03'}],
        tableData3: [{"companyName":'费用管理分析',"id":'s01'},{"companyName":'税务分析',"id":'s01'},{"companyName":'法人披露分析',"id":'s01'},{"companyName":'费用管理分析',"id":'s02'},{"companyName":'法人披露分析',"id":'s02'},{"companyName":'经营跟踪分析',"id":'s03'},{"companyName":'KPI分析',"id":'s03'},{"companyName":'资金分析',"id":'s03'},{"companyName":'费用管理分析',"id":'s03'},{"companyName":'税务分析',"id":'s03'},{"companyName":'法人披露分析',"id":'s03'}],
        tableData4: [{"companyName":'内部管理费用报表',"id":'s01'},{"companyName":'主要税务数据报表',"id":'s01'},{"companyName":'主要法人披露报表',"id":'s01'},{"companyName":'内部管理费用报表',"id":'s02'},{"companyName":'主要法人披露报表',"id":'s02'},{"companyName":'经营跟踪分析报表',"id":'s03'},{"companyName":'KPI分析报表',"id":'s03'},{"companyName":'资金分析与监控报表',"id":'s03'},{"companyName":'内部管理费用报表',"id":'s03'},{"companyName":'主要税务数据报表',"id":'s03'},{"companyName":'主要法人披露报表',"id":'s03'}],
      }
    },
    methods: {
      //数据去重
      repeat(arr){
        var newArr = [];
        for(var i=0;i<arr.length;i++){
          if(newArr.indexOf(arr[i]) == -1){
            newArr.push(arr[i])
          }
        }
        return newArr
      },
      //将数据拼接成想要的数据结构[{name:'',button:'false'}]
      split(arr){
        var newArr = [];
        arr.map(item=>{
          var data={name:item,button:false};
          newArr.push(data)
        })
        return newArr
      },
      //点击显示相应的下拉框
      selectBtn1(){
        this.isShow = 'a'
      },
      selectBtn2(){
        this.isShow = 'b'
      },
      selectBtn3(){
        this.isShow = 'c'
      },
      selectBtn4(){
        this.isShow = 'd'
      },
      //遮罩，隐藏下拉框
      selectOff(){
        this.isShow = ''
      },
      //点击check框，
      selectChecked1(item,index){
        //取反，用于找到相应元素
        item.button = !item.button
        var arr = []
        if(item.button){
          //将点击的相应的名字push成一个数组
          arr.push(item.name)
          //遍历得到的数组，与获取到的数组的名字一一对比
          arr.map(item=>{
            this.tableData1.map(itemList=>{
              if(item == itemList.companyName){
                //然后将相对应名字的id  push 成一个新数组
                this.arr1.push(itemList.id)
              }
            })
            console.log(this.arr1)
          })
        }else{
          //这里有问题，我点击取消选择后怎么删除相对于的名字和id？splice（index，1）删除会存在顺序问题，比如先点击第三个item，这是数组的length实际为1，再次点击取消选择的时候就删除不了，怎么解决？
          if(this.arr1.length == 1){
            this.arr1.splice(0,1)
          }else if(this.arr1.length == 2){

          }
          arr.splice(index,1)
          this.arr1.splice(index,1)
          console.log(this.arr1)
        }
    
      },
      selectChecked2(item,index){

      },
      selectChecked3(item,index){

      },
      selectChecked4(item,index){

      }
    },
    computed:{
      dataList1(){
        var arr = [];
        var newArr = [];
        this.tableData1.map(item=>{
          arr.push(item.companyName)
        })
        newArr = this.split(arr)
        return newArr;
      },
      dataList2(){
        if(this.arr1 != ''){
          var arr = []
          this.arr1.map(item=>{
            this.tableData2.map(itemList=>{
              if(item == itemList.id){
                arr.push(itemList.companyName)
              }
            })
          })
          return this.split(this.repeat(arr))
        }else{
          var arr = [];
          var newArr = [];
          this.tableData2.map(item=>{
            arr.push(item.companyName)
          })
          newArr = this.split(this.repeat(arr))
          return newArr;        
        }
      },
      dataList3(){
        var arr = [];
        var newArr = [];
        this.tableData3.map(item=>{
          arr.push(item.companyName)
        })
        newArr = this.split(this.repeat(arr))
        return newArr;
      },
      dataList4(){
        var arr = [];
        var newArr = [];
        this.tableData4.map(item=>{
          arr.push(item.companyName)
        })
        newArr = this.split(this.repeat(arr))
        return newArr;
      }
    },
    created(){

    }
  }
</script>
<style scoped>
.box{
  width:100%;
  height:100%;
}
.tableHead{
  margin-top:50px;
}
.tableHead>li{
  width:180px;
  height:30px;
  display: inline-block;
  margin-left:20px;
  text-align: center;
  line-height: 30px;
  border:1px solid #c33;
  border-radius:4px;
}
.select{
  position: absolute;
  padding:20px;
  border:1px solid #0ce;
  background: #fff;
  z-index:10;
}
.select1{
  top:82px;
  left:20px;
}
.select2{
  top:82px;
  left:227px;
}
.select3{
  top:82px;
  left:434px;
}
.select4{
  top:82px;
  left:641px;
}
.shade{
  position: absolute;
  width:100%;
  height:100%;
}
</style>
