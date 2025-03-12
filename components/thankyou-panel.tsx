'use client';

import React, { useEffect, useState, useRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default function ThankYouMessage() {
  const [randomNames, setRandomNames] = useState<string[]>([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const isNotificationOpenRef = useRef(isNotificationOpen);

  // Danh sách họ phổ biến ở Việt Nam
  const lastNames = [
    "Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng",
    "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý", "Đào", "Đinh", "Mai", "Trịnh"
  ];

  // Danh sách tên (đệm và tên) phổ biến ở Việt Nam
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
    // Thêm tên đệm ngẫu nhiên (50% xác suất)
    if (Math.random() > 0.5) {
      const middleName = firstNames[Math.floor(Math.random() * firstNames.length)];
      return `${lastName} ${middleName} ${firstName}`;
    }
    return `${lastName} ${firstName}`;
  };

  // Tạo danh sách 10 tên ngẫu nhiên
  const generateInitialNames = () => {
    const initialNames = [];
    for (let i = 0; i < 10; i++) {
      initialNames.push(generateRandomName());
    }
    return initialNames;
  };

  // Hàm rung chuông
  const shakeBell = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 1000);
  };

  // Đồng bộ giá trị isNotificationOpen vào ref để các callback luôn có giá trị mới
  useEffect(() => {
    isNotificationOpenRef.current = isNotificationOpen;
  }, [isNotificationOpen]);

  // Effect để khởi tạo danh sách tên và thiết lập các interval (chạy một lần khi mount)
  useEffect(() => {
    console.log('ThankYouMessage mounted');
    setRandomNames(generateInitialNames());

    const namesInterval = setInterval(() => {
      setRandomNames(prevNames => {
        // Thêm tên mới vào đầu mảng thay vì cuối mảng
        const newNames = [generateRandomName(), ...prevNames];
        if (!isNotificationOpenRef.current) {
          shakeBell();
        }
        return newNames;
      });
    }, 10000); // mỗi 10 giây

    const bellInterval = setInterval(() => {
      if (!isNotificationOpenRef.current) {
        shakeBell();
      }
    }, 30000); // rung chuông mỗi 30 giây nếu chưa mở thông báo

    // Rung chuông ngay khi component mount
    shakeBell();

    return () => {
      clearInterval(namesInterval);
      clearInterval(bellInterval);
    };
  }, []);

  // Effect để xử lý click bên ngoài và đóng thông báo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.notification-bell')
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleNotification = () => {
    setIsNotificationOpen(prev => !prev);
  };

  return (
    <div className="fixed bottom-4 right-[20px] z-50">
      {/* Biểu tượng chuông với hiệu ứng rung */}
      <div
        className={`notification-bell w-12 h-12 bg-[#87ceeb] rounded-full flex items-center justify-center cursor-pointer shadow-md ${isShaking ? 'bell-shake' : ''}`}
        onClick={toggleNotification}
      >
        <div className="icon w-6 h-6 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 0 448 512" fill="currentColor">
            <path d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3
              c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2
              384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3
              18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"/>
          </svg>
        </div>
      </div>

      {/* Popup thông báo */}
      {isNotificationOpen && (
        <div
          ref={notificationRef}
          className="absolute bottom-14 right-0 z-50 w-72 md:w-96 bg-white border border-gray-300 rounded shadow-lg"
        >
          <div className="bg-[#87ceeb] text-white p-3 font-medium rounded-t">
            <span>Thông báo</span>
            <button
              className="float-right text-white"
              onClick={() => setIsNotificationOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="border border-gray-300 rounded-b p-4 overflow-auto max-h-[400px]">
            <TransitionGroup component="ul" className="list-disc list-inside space-y-1">
              {randomNames.map((name, index) => (
                <CSSTransition key={index} timeout={500} classNames="slide-down">
                  <li className="text-[#1877f2]">
                    Cảm ơn bạn <strong>{name}</strong> đã lên đơn
                  </li>
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bellShake {
          0% { transform: rotate(0); }
          15% { transform: rotate(5deg); }
          30% { transform: rotate(-5deg); }
          45% { transform: rotate(4deg); }
          60% { transform: rotate(-4deg); }
          75% { transform: rotate(2deg); }
          85% { transform: rotate(-2deg); }
          92% { transform: rotate(1deg); }
          100% { transform: rotate(0); }
        }

        .bell-shake {
          animation: bellShake 1s cubic-bezier(.36,.07,.19,.97) both;
          transform-origin: top center;
        }

        /* Hiệu ứng cho phần tử mới xuất hiện ở đầu danh sách */
        .slide-down-enter {
          opacity: 0;
          transform: translateY(-20px);
        }
        .slide-down-enter-active {
          opacity: 1;
          transform: translateY(0);
          transition: all 500ms ease-in-out;
        }
        .slide-down-exit {
          opacity: 1;
          transform: translateY(0);
        }
        .slide-down-exit-active {
          opacity: 0;
          transform: translateY(20px);
          transition: all 500ms ease-in-out;
        }
      `}</style>
    </div>
  );
}
