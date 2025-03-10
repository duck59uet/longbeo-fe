'use client';

import React from 'react';

export default function ArticleInfo() {
  return (
    <div className="p-4 mb-4 bg-white border rounded-md shadow-sm mt-4">
      <h2 className="text-xl font-bold mb-3">Mục lục</h2>
      <ol className="list-decimal pl-4 space-y-2 text-sm md:text-base">
        <li>
          <a
            href="#why-need-livestream-eyes"
            className="text-blue-600 hover:underline"
          >
            Tăng lượt xem video trên facebook là gì?
          </a>
        </li>
        <li>
          <a
            href="#livestream-advantages"
            className="text-blue-600 hover:underline"
          >
            Lợi ích tăng view video trên facebook
          </a>
        </li>
      </ol>

      <div className="mt-6">
        {/* Đoạn mở đầu */}
        <section id="why-need-livestream-eyes">
          <p className="text-sm md:text-base leading-relaxed mb-4">
            <strong>Tăng lượt view facebook</strong> là việc bạn giúp video của mình tiếp cận tới nhiều người tiêu dùng. 
            Khi video của bạn được viral thì lượt hiển thị trên tab thịnh hành càng cao, người xem video sẽ tò mò và 
            click vào video của bạn, từ đó giúp kéo lượt like, share hay comment từ phía người dùng một cách tự nhiên nhất. 
            Việc làm này còn giúp bạn xây dựng thương hiệu sản phẩm rất tốt.
          </p>
        </section>

        <section id="livestream-advantages">
          <h3 className="text-base md:text-lg font-bold mt-4 mb-2">
            Khi tăng view video facebook, lợi ích của việc làm này mang lại cho bạn là điều không thể bàn cãi. 
          </h3>
          <ul className="list-disc list-inside text-sm md:text-base leading-relaxed mb-4">
            <li>
              <strong>Tăng hiệu ứng chim mồi</strong>: Số người xem các video càng nhiều, cho thấy nội dung
               truyền tải rất hấp dẫn và hữu ích. Vì thế sẽ kích thích tâm lý tò mò của người xem về video của bạn.
            </li>
            <li>
              <strong>Giúp tăng lượt hiển thị nhiều hơn</strong>: Thuật toán của facebook nay đã thay đổi,
               vì thế khi video của bạn có nhiều lượt xem sẽ được đánh giá là nội dung hữu ích, 
               lượt hiển thị sẽ ưu tiên phát nội dung video của bạn,
               chính vì thế thương hiệu của bạn sẽ được tiếp cận tới nhiều khách hàng hơn. 
            </li>
            <li>
              <strong>Dễ dàng lên tích xanh</strong>: Nếu mục tiêu của bạn muốn hướng tới việc tài khoản facebook được
               đánh giá tích xanh từ đó bán hàng trên trang cá nhân hiệu quả thì chắc chắn việc tăng lượt xem video
                trên facebook rất quan trọng với bạn. 
            </li>
            <li>
              <strong>Bán được nhiều hơn hơn</strong>: Mục tiêu của mỗi người là khác nhau, 
              tuy nhiên mục tiêu của bạn cũng hướng tới việc bán hàng thì chắc chắn việc tăng view facebook 
              sẽ giúp bạn chuyển đổi tỷ lệ đơn hàng nhanh và nhiều hơn. 
            </li>
          </ul>
        </section>

        {/* Ví dụ chèn ảnh minh hoạ (đường dẫn tuỳ chỉnh) */}
        <div className="w-full flex justify-center mb-4">
          <img
            src="/tang-view-video_1.png"
            alt="Ảnh minh hoạ livestream"
            className="h-auto border"
          />
        </div>
      </div>
    </div>
  );
}
