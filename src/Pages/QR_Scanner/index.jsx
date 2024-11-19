// QR_Scanner.js
import React from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const QR_Scanner = () => {
  const handleScan = (result) => {
    if (result) {
      console.log('扫描结果：', result);
      // 在此处处理扫描结果，例如导航到其他页面或显示信息
    }
  };

  const handleError = (error) => {
    console.error('扫描错误：', error);
    // 在此处处理错误，例如显示提示信息
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Scanner
        onScan={handleScan}
        onError={handleError}
        constraints={{ facingMode: 'environment' }} // 使用后置摄像头
        style={{ width: 300, height: 300 }}
      />
    </div>
  );
};

export default QR_Scanner;
