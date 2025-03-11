'use client';

import React, { useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default function ThankYouMessage() {
  const [randomNames, setRandomNames] = useState<string[]>([]);

  // Danh sách họ phổ biến ở Việt Nam
  const lastNames = [
    "Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng",
    "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý", "Đào", "Đinh", "Mai", "Trịnh"
  ];

  // Danh sách tên đệm và tên phổ biến ở Việt Nam
  const firstNames = [
    "An", "Anh", "Bảo", "Công", "Cường", "Đạt", "Đức", "Dũng", "Duy", "Hà",
    "Hải", "Hiếu", "Hoàng", "Hùng", "Huy", "Khoa", "Khôi", "Lâm", "Linh", "Loan",
    "Long", "Minh", "Nam", "Nghĩa", "Nhân", "Phong", "Phúc", "Quân", "Quang", "Tâm",
    "Thành", "Thảo", "Thủy", "Tiến", "Toàn", "Trung", "Tuấn", "Tùng", "Việt", "Vũ",
    "Xuân", "Yến", "Hương", "Ngọc", "Thanh", "Trang", "Trinh", "Uyên", "Mai", "Lan"
  ];

  // Tạo tên ngẫu nhiên giống người thật
  const generateRandomName = () => {
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    
    // Thêm tên đệm ngẫu nhiên cho một số người (50% xác suất)
    if (Math.random() > 0.5) {
      const middleName = firstNames[Math.floor(Math.random() * firstNames.length)];
      return `${lastName} ${middleName} ${firstName}`;
    }
    
    return `${lastName} ${firstName}`;
  };

  // Hàm tạo danh sách 10 tên ngẫu nhiên
  const generateInitialNames = () => {
    const initialNames: string[] = [];
    for (let i = 0; i < 10; i++) {
      initialNames.push(generateRandomName());
    }
    return initialNames;
  };

  useEffect(() => {
    // Khởi tạo danh sách với 10 tên ngẫu nhiên
    setRandomNames(generateInitialNames());

    const interval = setInterval(() => {
      setRandomNames(prevNames => {
        const newNames = [...prevNames, generateRandomName()];
        return newNames;
      });
    }, 10000); // mỗi 10 giây

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-gray-300 rounded p-4 overflow-auto max-h-[400px]">
      <TransitionGroup component="ul" className="list-disc list-inside space-y-1">
        {randomNames.map((name, index) => (
          <CSSTransition key={index} timeout={500} classNames="slide">
            <li className="text-[#1877f2]">
              Cảm ơn bạn <strong>{name}</strong> đã lên đơn
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
      <style jsx>{`
        .slide-enter {
          opacity: 0;
          transform: translateY(-20px);
        }
        .slide-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: all 500ms ease-in-out;
        }
        .slide-exit {
          opacity: 1;
          transform: translateY(0);
        }
        .slide-exit-active {
          opacity: 0;
          transform: translateY(20px);
          transition: all 500ms ease-in-out;
        }
      `}</style>
    </div>
  );
}
