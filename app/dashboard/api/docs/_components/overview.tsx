'use client';

import { useSession } from 'next-auth/react';
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OverViewPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <PageContainer scrollable>
      <div className="space-y-2">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin API</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Thông tin tạo đơn hàng */}
                <div className="border rounded-lg p-4">
                  <p>
                    <strong>METHOD:</strong> POST
                  </p>
                  <p>
                    <strong>URL API:</strong>{' '}
                    <a
                      href="https://api.dichvumat.com"
                      className="text-blue-500 hover:underline"
                    >
                      https://api.dichvumat.com
                    </a>
                  </p>
                  <p>
                    <strong>Định dạng phản hồi:</strong> JSON
                  </p>
                  <p>
                    <strong>Token:</strong> {session?.accessToken || 'Bạn hãy đăng nhập lại'}
                  </p>
                </div>

                <div>
                  <h2 className="font-semibold text-[#317EAC] text-lg">Tạo đơn hàng</h2>
                  <p className="mt-2">
                    Để tạo đơn hàng, hãy gửi một yêu cầu POST tới API với payload dạng JSON như sau:
                  </p>
                  <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto">
                    <code className="language-json">
{`{
  "link": "string",
  "quantity": 0,
  "service": 0,
  "note": "string"
}`}
                    </code>
                  </pre>
                  <p className="mt-2">
                    Ví dụ, dưới đây là cách tạo đơn hàng bằng JavaScript sử dụng <code>fetch</code> với Bearer token:
                  </p>
                  <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto">
                    <code className="language-js">
{`fetch("https://api.dichvumat.com", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer your_token_here" // Thay "your_token_here" bằng token thực tế của bạn
  },
  body: JSON.stringify({
    link: "https://example.com/product",
    quantity: 1,
    service: 123,
    note: "Ghi chú đơn hàng"
  })
})
.then(response => response.json())
.then(data => {
  console.log("Đơn hàng được tạo:", data);
})
.catch(error => {
  console.error("Lỗi khi tạo đơn hàng:", error);
});`}
                    </code>
                  </pre>
                </div>

                {/* Thông tin lấy đơn hàng */}
                <div>
                  <h2 className="font-semibold text-[#317EAC] text-lg">Lấy thông tin đơn hàng</h2>
                  <p className="mt-2">
                    Để lấy thông tin đơn hàng của người dùng, hãy gửi một yêu cầu GET tới API với URL sau:
                  </p>
                  <pre className="bg-gray-100 p-4 rounded mt-2 overflow-auto">
                    <code className="language-js">
{`fetch("https://api.dichvumat.com/order/user/{id}", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer your_token_here" // Thay "your_token_here" bằng token thực tế của bạn
  }
})
.then(response => response.json())
.then(data => {
  console.log("Thông tin đơn hàng:", data);
})
.catch(error => {
  console.error("Lỗi khi lấy thông tin đơn hàng:", error);
});`}
                    </code>
                  </pre>
                  <p className="mt-2">
                    Lưu ý: Thay <code>{'{id}'}</code> bằng ID thực của đơn hàng.
                  </p>
                </div>

                {/* Response Example */}
                <div>
                  <h2 className="font-semibold text-[#317EAC] text-lg">Response Example</h2>
                  <pre className="bg-black text-green-500 p-4 rounded mt-2 overflow-auto">
                    <code className="language-json">
{`{
  "ErrorCode": "SUCCESSFUL",
  "Message": "Successfully!",
  "Data": [
    {
      "order_createdAt": "2025-02-09T02:41:22.298Z",
      "order_id": 1,
      "order_link": "https://www.facebook.com/DienBeautySpa/videos/614899847851061",
      "order_quantity": 50,
      "order_amount": 30,
      "order_price": 1800,
      "order_status": "Complete",
      "order_note": null
    }
  ],
  "AdditionalData": []
}`}
                    </code>
                  </pre>
                </div>
                
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
