<template>
    <div>
        <div class="title">我 的 团 队</div>
        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
        <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in 6" :key="item">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-divider content-position="center">实验室安全管理系统</el-divider>
    <span>以下为团队信息</span>
    </div>
    
    
  </template>
  
  <style>
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }
    
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
    .title{
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        font-size: 50px;

    }
  </style>