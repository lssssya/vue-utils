<template>
  <div class="container">
    <div class="info-wrap">
      <div class="info-item">
        <div class="label">服务时间</div>
        <div class="value">{{ '刘雪琴' }}</div>
      </div>
      <div class="info-item">
        <div class="label">管控等级</div>
        <div class="value">{{ '1990-12-21' }}</div>
      </div>
      <div class="info-item">
        <div class="label">服务类型</div>
        <div class="value">{{ '女' }}</div>
      </div>
      <div class="info-item">
        <div class="label">服务人员</div>
        <div class="value">{{ '汉族' }}</div>
      </div>
      <div class="info-item">
        <div class="label">所属部门</div>
        <div class="value">{{ '本科' }}</div>
      </div>
      <div class="info-item">
        <div class="label">其他服务人员</div>
        <div class="value">{{ '技工学校' }}</div>
      </div>
      <div class="info-item">
        <div class="label">附件</div>
        <div class="value">{{ '群众' }}</div>
      </div>
      <div class="info-item full">
        <div class="label">服务内容</div>
        <div class="value">{{ '1888888888' }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

</script>
<style
  lang="scss"
  scoped
>
.info-wrap {
  background: #FAFAFA;
  border: 1px solid rgba(220, 220, 220, 1);
  border-radius: 2px;
  padding: 24px 16px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(4, 300px);
  grid-template-rows: repeat(2, 16px) auto;
  gap: 24px 0;

  .info-item {
    display: flex;
    height: 16px;
    line-height: 16px;

    &.full {
      height: auto;
      grid-column: 1 / -1;

      .value {
        flex: 1;
        word-break: break-all;
      }
    }

    .label {
      min-width: fit-content;
      opacity: 0.5;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #000000;
      margin-right: 12px;
    }

    .value {
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      color: #000000;
      letter-spacing: 0;
    }
  }
}
</style>
