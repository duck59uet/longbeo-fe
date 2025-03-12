'use client';

import React, { useEffect, useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export default function ThankYouMessage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

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

  // Danh sách sản phẩm
  const products = [
    "Tăng mắt live facebook",
    "Tăng mắt view video facebook",
    "Tăng mắt live tiktok",
    "Tăng mắt view video tiktok",
    "Tăng mắt view video youtube",
    "Tăng mắt view video instagram",
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

  // Tạo thông báo mới
  const createNotification = () => {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const randomTime = Math.floor(Math.random() * 5) + 1; // 1-5 giờ trước
    
    return {
      id: Date.now(),
      name: generateRandomName(),
      product: randomProduct,
      time: randomTime
    };
  };

  // Hiển thị thông báo
  const showNotification = () => {
    const newNotification = createNotification();
    setNotifications([newNotification]);
    setIsVisible(true);
    
    // Ẩn thông báo sau 5 giây
    setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setNotifications([]);
      }, 500); // Đợi animation kết thúc rồi xóa
    }, 5000);
  };

  useEffect(() => {
    // Hiển thị thông báo đầu tiên sau 2 giây
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, 2000);

    // Thiết lập interval cho các thông báo tiếp theo
    const interval = setInterval(() => {
      showNotification();
    }, 10000); // Hiển thị mỗi 10 giây

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <TransitionGroup>
        {isVisible && notifications.map((notification) => (
          <CSSTransition
            key={notification.id}
            timeout={500}
            classNames="notification"
          >
            <div className="notification-card bg-white rounded-md shadow-lg p-3 mb-3 max-w-xs border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 bg-[#87ceeb] rounded-full flex items-center justify-center">
                    <span className="text-white text-lg">🛒</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold">Sản phẩm</h4>
                  <p className="text-sm font-medium">{notification.product}</p>
                  <p className="text-xs text-gray-500">
                    Cảm ơn <span className="font-semibold">{notification.name}</span> đã mua hàng <span className='font-semibold'>{notification.product}</span>
                  </p>
                </div>
                <button 
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setIsVisible(false)}
                >
                  ✕
                </button>
              </div>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>

      <style jsx>{`
        .notification-enter {
          transform: translateY(100%);
          opacity: 0;
        }
        .notification-enter-active {
          transform: translateY(0);
          opacity: 1;
          transition: all 500ms ease-out;
        }
        .notification-exit {
          transform: translateY(0);
          opacity: 1;
        }
        .notification-exit-active {
          transform: translateY(100%);
          opacity: 0;
          transition: all 500ms ease-in;
        }
      `}</style>
    </div>
  );
}
