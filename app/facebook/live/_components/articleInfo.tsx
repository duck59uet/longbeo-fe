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
            Tại sao bạn cần tăng mắt livestream Facebook?
          </a>
        </li>
        <li>
          <a
            href="#livestream-advantages"
            className="text-blue-600 hover:underline"
          >
            Ưu điểm khi sử dụng tăng mắt livestream
          </a>
        </li>
      </ol>

      <div className="mt-6">
        {/* Đoạn mở đầu */}
        <section id="why-need-livestream-eyes">
          <p className="text-sm md:text-base leading-relaxed mb-4">
            <strong>Livestream trên Facebook</strong> hiện nay được xem là một
            kênh bán hàng hiệu quả, được rất nhiều các shop sử dụng để bán hàng.
            Với những tài khoản đã có nhiều lượt theo dõi, số lượng live mỗi lần
            có thể lên tới hàng ngàn người xem trực tiếp. Tuy nhiên, để kéo được
            đông đảo người dùng vào xem livestream{' '}
            <strong>không phải là điều dễ dàng</strong>. Vậy làm sao
            <em> tăng mắt livestream</em> và kéo được nhiều người dùng vào xem
            live? Bài viết dưới đây sẽ giúp bạn trả lời câu hỏi này.
          </p>
          <img
            src="/example-tang-mat2.png"
            alt="Ảnh minh hoạ livestream"
            className="h-auto border"
          />
        </section>

        <section id="livestream-advantages">
          <h3 className="text-base md:text-lg font-bold mt-4 mb-2">
            Tại sao bạn cần tăng mắt livestream Facebook?
          </h3>
          <p className="text-sm md:text-base leading-relaxed mb-4">
            Làm sao để có nhiều người vào xem livestream của bạn hay làm sao để
            tăng số lượng mắt livestream là điều mà rất nhiều bạn bán hàng trên
            Facebook quan tâm. Việc tăng được nhiều mắt xem live sẽ đem lại 3
            lợi ích vô cùng hữu ích:
          </p>
          <ul className="list-disc list-inside text-sm md:text-base leading-relaxed mb-4">
            <li>
              <strong>Giúp làm tăng mức độ uy tín cho sản phẩm</strong>: Khi
              lượt xem live nhiều, khách hàng sẽ tin tưởng hơn vào sản phẩm của
              bạn. Điều này khiến việc chốt đơn hàng trở nên nhanh chóng và tiện
              lợi.
            </li>
            <li>
              <strong>Tăng đề xuất video</strong>: Livestream có nhiều người xem
              sẽ được Facebook đề xuất nhiều hơn, giúp bạn thu hút thêm lượt
              người xem mới, qua đó bán hàng hiệu quả hơn.
            </li>
            <li>
              <strong>Tạo hiệu ứng đám đông</strong>: Tâm lý chung của người mua
              thường bị kích thích bởi sự tò mò. Khi thấy livestream đông người,
              họ sẽ ở lại xem lâu hơn và dễ dàng ra quyết định mua hàng.
            </li>
          </ul>
        </section>

        {/* 2. Ưu điểm khi sử dụng tăng mắt livestream */}
        <h3 className="text-base md:text-lg font-bold mt-4 mb-2">
          Ưu điểm khi sử dụng tăng mắt livestream
        </h3>
        <ul className="list-disc list-inside text-sm md:text-base leading-relaxed mb-4">
          <li>
            Tăng độ thu hút, quan tâm, tò mò của người dùng vào buổi livestream,
            giúp bạn tiếp cận đông đảo lượng người quan tâm.
          </li>
          <li>
            Nhiều mắt xem live sẽ giúp tăng thêm sự uy tín, tin tưởng khi mua
            hàng trên sóng livestream.
          </li>
          <li>
            Tạo tương tác khách hàng, kêu gọi like, share page ngay trong quá
            trình livestream.
          </li>
          <li>
            Giúp bạn dễ dàng tiếp cận khách hàng mục tiêu, tỷ lệ chốt đơn cao
            hơn nhiều so với việc chạy quảng cáo.
          </li>
        </ul>

        {/* 3. Từ khoá: cách livestream nhiều người xem */}

        {/* Ví dụ chèn ảnh minh hoạ (đường dẫn tuỳ chỉnh) */}
        <div className="w-full flex justify-center mb-4">
          <img
            src="/example-tang-mat.png"
            alt="Ảnh minh hoạ livestream"
            className="h-auto border"
          />
        </div>
      </div>
    </div>
  );
}
