import React, { useEffect, useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const QR_Scanner = () => {
  const [cameraDevices, setCameraDevices] = useState([]);

  // 检测设备并列出可用摄像头
  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const videoDevices = devices.filter((device) => device.kind === 'videoinput');
        if (videoDevices.length > 0) {
          console.log('可用摄像头:', videoDevices);
          setCameraDevices(videoDevices);
        } else {
          console.error('未找到摄像头设备');
          alert('未找到摄像头设备，请检查设备连接或权限设置。');
        }
      })
      .catch((error) => {
        console.error('设备检测错误：', error);
        alert(`设备检测错误：${error.message}`);
      });
  }, []);

  // 处理扫描结果
  const handleScan = (result) => {
    if (result) {
      console.log('扫描结果：', result);
      alert(`扫描成功！结果为：${result}`);
    }
  };

  // 处理扫描错误
  const handleError = (error) => {
    console.error('扫描错误：', error);
    if (error.name === 'NotFoundError') {
      alert('未找到摄像头设备，请检查设备连接或权限设置。');
    } else {
      alert(`扫描错误：${error.message}`);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', backgroundColor: '#f9f9f9' }}>
      <h2>二维码扫描器</h2>
      {cameraDevices.length > 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #4caf50', padding: '20px', borderRadius: '10px' }}>
          <Scanner
            onScan={handleScan}
            onError={handleError}
            constraints={{
              facingMode: 'environment', // 使用后置摄像头
            }}
            style={{ width: 300, height: 300 }}
          />
        </div>
      ) : (
        <p>正在检测摄像头...</p>
      )}
    </div>
  );
};

export default QR_Scanner;
