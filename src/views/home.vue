<template>
  <div class="home-page">
    <van-nav-bar
      title="小翼想家"
      right-text="通讯录选择"
      @click-right="onClickRight"
    />
    <van-tabs v-model="active">
      <van-tab title="最近通话">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell class="list-item" v-for="item in list" :key="item" is-link>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div class="img-container">
                <img
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2019-02-19%2F5c6bbbe2bff0f.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614062998&t=126b6b7473ed782437cc53fc8eec6b80"
                  alt="avatar"
                />
              </div>
              <div class="info">
                <p>朱一龙</p>
                <p>1748738298{{ item }}</p>
              </div>
            </template>
            <template #right-icon>
              <span>添加</span>
            </template>
          </van-cell>
        </van-list>
      </van-tab>
      <van-tab title="待呼叫入">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell class="list-item" v-for="item in list" :key="item" is-link>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <div class="img-container">
                <img
                  src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2019-02-19%2F5c6bbbe2bff0f.jpg&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614062998&t=126b6b7473ed782437cc53fc8eec6b80"
                  alt="avatar"
                />
              </div>
              <div class="info">
                <p>朱一龙</p>
                <p>1748738298{{ item }}</p>
              </div>
            </template>
            <template #right-icon>
              <van-icon name="clear" size="20" />
            </template>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: "honme",
  data() {
    return {
      active: 0,
      loading: false,
      finished: false,
      list: [],
      callList: [],
    };
  },
  methods: {
    onClickLeft() {},
    onClickRight() {},
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  },
};
</script>
<style scoped lang="scss">
.home-page {
    padding-bottom: 50px;
  .list-item {
    ::v-deep .van-cell__title {
      display: flex;
    }
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .info {
      text-align: left;
    }
  }
}
</style>