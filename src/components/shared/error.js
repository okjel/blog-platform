import { notification } from 'antd';

export default (message = 'Ошибка загрузки данных', key = 'error') => {
  notification.error({
    duration: 2, // seconds
    message,
    key,
  });
};
