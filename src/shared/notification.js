import { notification } from 'antd';

export default (message = 'Ошибка загрузки данных', key = 'error') => {
  notification[key]({
    duration: 2, // seconds
    message,
    key,
  });
};
