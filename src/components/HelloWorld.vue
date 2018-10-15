<template>
    <div>
      

        <div class="engine-identification">
            <h3>各扫描引擎文件鉴定情况统计</h3>
            <div>
                <span class="scan-engine">扫描引擎：</span>
                <div class="checkbox-wrapper">
                    <input type="checkbox" value="AV1"  v-model="selectedEngine"/>AV1
                </div>
                <div class="checkbox-wrapper">
                    <input type="checkbox" value="AV2" v-model="selectedEngine"/>AV2
                </div>
                <div class="checkbox-wrapper">
                    <input type="checkbox" value="AV3" v-model="selectedEngine"/>AV3
                </div>
                <div class="checkbox-wrapper">
                    <input type="checkbox" value="AV4" v-model="selectedEngine"/>AV4
                </div>
                <span class="checkbox-tip">当取消勾选某个扫描引擎时，则表格中该扫描引擎的行全部被隐藏。</span>
            </div>
            <table class="scan-result">
                <tr class="tr-title">
                    <td colspan="2" rowspan="2" align="center">日期</td>
                    <td colspan="2" rowspan="2" align="center">扫描引擎</td>
                    <td colspan="2" align="center" value='101'>101</td>
                    <td colspan="2" align="center" value='201'>201</td>
                    <td colspan="2" align="center" value= '202'>202</td>
                    <td colspan="2" align="center" value='203'>203</td>
                    <td colspan="2" align="center" value='204'>204</td>
                    <td colspan="2" align="center" value ='301'>301</td>
                    <td colspan="2" align="center" value='401'>401</td>
                    <td colspan="2" align="center" value='501'>501</td>

                </tr>
                <tr class="tr-title">

                    <template v-for="file in 8">
                        <td>检出率</td>
                        <td>独报率</td>
                    </template>


                </tr>
                <tbody v-for="items in scanData" class="tbody-wrapper">
                <tr class="table-content" v-for = "(item,index) in items.data">
                    <td v-if="index == 0" colspan="2" :rowspan="items.data.length">{{items.date}}</td>
                    <td colspan="2" class="scan-engine-td">{{item.engineName}}</td>
                    <template v-for="file in item.file">
                        <td class="detectation-rate" >{{file.detectation_rate}}</td>
                        <td class="report_independently_rate">{{file.report_independently_rate}}</td>
                    </template>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>

   td{
       border-bottom:solid grey 1px;
       border:solid grey 1px;
   }


    .anal_contain > .tabpanel-header {
        background-color:rgb(242, 242, 242);
        border-bottom:2px solid rgb(204, 204, 204);
    }

    .anal_contain > .tabpanel-header .tabpanel-item{
        margin-left:0px;
        margin-right:10px;
        color:#333;
        background-color:#e4e4e4;
    }
    a:hover{
        cursor:pointer;
    }
    #yourID{
        float:left;
        margin:10px;
        border:solid rgba(127, 127, 127, 0.23) 1px;
    }
    .tabpanel-body-item{
        background-color:white;
        overflow:hidden;
    }
    .pie-chart{
        width:350px!important;
        border:none!important;
        float:left;
    }
    .pie-summary{
        width:220px;
        height: 300px;
        float:left;
        margin:40px;
        margin-right:0;
    }
    .line-chart{
        width:800px!important;
        height:300px!important;
        border:none!important;
    }
    .pie-summary p{
        margin:30px 0 30px;
        font-family: '微软雅黑 Regular', '微软雅黑';
        font-weight: 400;
        font-style: normal;
        font-size: 14px;
    }
    .pie-summary i{
        display: inline-block;
        width:13px;
        height: 13px;
    }
    .line-chart-wrapper{
        float:left;
        width:1000px;
        height:300px;
    }
    .range-selected{
        position: relative;
        left: -100px;

    }
    .engine-identification{
        border-top:solid rgba(186, 216, 244, 1) 2px;
    }
    .engine-identification h3{
        font-family: 'Arial Normal', 'Arial';
        font-weight: 400;
        font-style: normal;
        font-size: 14px;
        color: #0058B2;
        margin:20px 30px;
    }
    .scan-engine{
        width:80px;
        height:30px;
        margin:0 30px;
        font-family: 'Arial Normal', 'Arial';
        font-weight: 400;
        font-style: normal;
        font-size: 14px;
    }

    .checkbox-wrapper{
        display: inline-block;
        margin:0 30px;
    }
    .checkbox-tip{
        font-family: 'Arial Normal', 'Arial';
        font-weight: 400;
        font-style: normal;
        font-size: 14px;
        color: #FF6600;
    }
    .scan-result {
        width:1200px;
        height:100%;
        margin:30px;
        border:solid grey 1px;
    }
    .scan-result tr{
        border:solid grey 1px;
        border:none;
    }
    .scan-result tr.tr-title{
        height:40px;
        background-color:#ECF5FC;
    }
    .scan-result tr.tr-title td{

        border:solid grey 1px;
    }
    .table-content {
        border-bottom:solid grey 1px;
        height:50px;
    }
    .table-content td {
        border:solid grey 1px;
    
    }
    .detectation-rate{
        border-right:none;
    }
    .report_independently_rate{
        border-left:none;
    }
    tbody{
        border: solid grey 1px;
    }

    table tbody tr:nth-child(even){
        background-color:#E4E4E4;
    }

</style>

<script>

    /**
     * Created by pc on 2017/7/25.
     */

    import _  from 'lodash';
    


    /* eslint-disable */

    let CONST_SCAN_DATA = [];
    export default {
        created () {
            let {jsonData} = this.$http.get(this.scan_engine_url,).then(response => {
                window.console.log(response.jsonData);

            });
        },
        mounted () {
            this.getScanData();

        },
  
        data () {
            return {

                scan_engine_url:'./static/scan_engine.json',
                selectedEngine:["AV1", "AV2", "AV3", "AV4"],
                scanData:[],
                total:5,

            };
        },

        //监听扫描引擎checkbox的变化来动态的更新视图
        watch: {
            selectedEngine:function(newVal, oldVal) {
                let vm = this;
                if (newVal.length > oldVal.length) {

                    let arr = JSON.parse(JSON.stringify(CONST_SCAN_DATA));
                    for(let j =0; j<arr.length; j++) {
                        let scanEgineArray = arr[j].data;
                        for(let i =0; i<scanEgineArray.length; i++) {
                            let engineName = scanEgineArray[i].engineName;
                            if (this.selectedEngine.indexOf(engineName) !== -1) {
                                vm.scanData[j].data.push(scanEgineArray[i]);

                            }
                        }
                    }

                    //去掉重复的引擎
                    for(let j =0; j<vm.scanData.length; j++) {
                        let scanEgineArray = vm.scanData[j].data;
                        for(let i =0; i<scanEgineArray.length; i++) {
                            vm.scanData[j].data = _.uniqBy(scanEgineArray, 'engineName');
                        }
                    }

                      window.console.log(vm.scanData);

                } else{
                    vm.engineIteration();
                }


            }


        },
        methods:{
        

    

       

            //各扫描引擎文件鉴定情况统计数据获取
            async  getScanData () {
                let vm = this;
                let jsonData = await vm.$http.get(vm.scan_engine_url);
                window.console.error(jsonData.body.scanData);
                vm.scanData = JSON.parse(JSON.stringify(jsonData.body.scanData));
                CONST_SCAN_DATA = JSON.parse(JSON.stringify(jsonData.body.scanData));
                window.console.error(CONST_SCAN_DATA);

                if (!jsonData.success) {
                    return;
                }
            },

            //遍历每条记录的扫描引擎
            engineIteration () {
                let arr = this.scanData;
                for(let i =0; i<arr.length; i++) {
                    let scanEgineArray = arr[i].data;
                    for(let i =0; i<scanEgineArray.length; i++) {
                        let engineName = scanEgineArray[i].engineName;
                        if (this.selectedEngine.indexOf(engineName) === -1) {
                            scanEgineArray.splice(i, 1);
                        }
                    }
                }
            }

        }

    };

</script>
