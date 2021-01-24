import axios from 'axios';
import Cookies from 'js-cookie';
// import { Toast } from 'vant';

const BaseURL = 'http://49.235.194.110:9007';

/**
 * 封装axios请求
 */
class Request {
  constructor() {
    // 初始化axios
    this.axios = axios.create({
    //   baseURL: BaseURL,
      baseURL: '/api',
      withCredentials: true,  // 跨域请求时是否需要使用凭证
      timeout: 10000,  // 默认超时时间10秒
      transformRequest: [this.transformRequest, this.startLoading],
      transformResponse: [this.endLoading, this.transformResponse],
    });
    this.axios.defaults.headers.post['Content-Type'] = 'application/json';
  }
  /**
   * 传入配置
   */
  config = {};

  /**
   * 加载动画描述
   */
  defaultLoadingText = '加载中...';

  /**
   * 开始加载动画
   */
  startLoading = (params) => {
    const { showLoading, loadingText } = this.config;
    if (!showLoading && !loadingText) {
      return params;
    }
    Toast.loading(loadingText || this.defaultLoadingText);
    return params;
  }

  /**
   * 结束加载动画
   */
  endLoading = (response) => {
    const { showLoading } = this.config;
    showLoading && Toast.clear();
    return response;
  }
  
  /**
   * 格式化参数
   */
  transformRequest(data) {
    const params = {};
    data && Object.keys(data).forEach(key => {
      const curValue = data[key];
      // 去掉非空、null、undefined参数
      if (curValue !== null || curValue !== undefined || curValue !== '') {
        params[key] = curValue;
      }
    });
    return JSON.stringify(params);
  }

  /**
   * 格式化响应数据
   */
  transformResponse(response = {}) {
    if (typeof response === 'string') {
      response = JSON.parse(response);
    }
    const { code, message } = response;
    if (code !== 0) {
      if (code === 401) {
        Cookies.set('token', '');
        Toast('登录失效，请重新登录');
        setTimeout(() => {
          window.location.hash = '/login';
        }, 50)
        return {};
      } else if (code !== 0) {
        message && Toast.fail(message);
      }
    }
    return response;
  }

  /**
   * 请求调用
   */
  async request(config) {
    this.config = config;
    try {
      // 获取token
      const token = Cookies.get('token');
      // 设置header
      token && (this.axios.defaults.headers['Authorization'] = `${token}`);
    //   token && (this.axios.defaults.headers['Authorization'] = `Bearer ${token}`);
      // 发送请求
      const { data } = await this.axios({
        ...config, 
      });
      return data || {};
    } catch(e) {
      console.error(e);
      return {};
    }
  }

  /**
   * 处理get请求
   */
  async get(url, params = {}, options) {
    return await this.request({url, params, ...options});
  }

  /**
   * 处理get请求
   * ps：显示加载状态
   */
  getWithLoading(url, params, options) {
    return this.get(url, params, {
      showLoading: true,
      ...options
    });
  }

  /**
   * 处理post请求
   */
  post(url, data, options) {
    return this.request({url, data, method: 'post', ...options});
  }

  /**
   * 处理post请求
   * ps：显示加载状态
   */
  postWithLoading(url, data, options) {
    return this.post(url, data, {
      showLoading: true,
      ...options
    });
  }
};

export default new Request();