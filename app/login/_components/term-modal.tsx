'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from '@/components/ui/dialog';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: 'en' | 'vi';
}

export function TermsModal({ isOpen, onClose, locale }: TermsModalProps) {
  const title = locale === 'en' ? 'Terms of Service' : 'Điều Khoản Dịch Vụ';
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4 text-sm">
          <p className="mb-4">
            Bằng việc đăng ký tài khoản tại App Tăng Like đồng nghĩa với việc bạn đã đọc và chấp thuận tất cả các điều khoản & chính sách dịch vụ liệt kê dưới đây. Chúng tôi có quyền thay đổi các điều khoản và chính sách dịch vụ vào bất cứ lúc nào mà không cần báo trước. Bạn có trách nhiệm đọc quy định này trước mỗi lần mua hàng để nắm được thông tin mới.
          </p>
          
          <h3 className="font-bold mb-2">ĐIỀU KHOẢN DỊCH VỤ</h3>
          <ol className="list-decimal pl-5 space-y-2 mb-4">
            <li>Chúng tôi không hoàn toàn cam kết đúng chuẩn xác về thời gian trong các dịch vụ. Chúng tôi đưa ra dự kiến tương đối chính xác nhất về thời gian chạy của các server. Điều này chỉ là ước lượng và được thống kê tại mục: "Xem chi tiết" bên cạnh các sever.</li>
            <li>Chúng tôi sẽ thường xuyên thay đổi thông tin dịch vụ, bạn có trách nhiệm đọc toàn bộ thông tin dịch vụ tại nút "Xem chi tiết" của server trước khi thực hiện mua hàng.</li>
            <li>Không mua cùng lúc nhiều đơn hàng trong 1 dịch vụ cho 1 link cùng 1 thời điểm (kể cả ở các nguồn cung cấp khác). Nếu bạn muốn mua nhiều đơn hơn với cùng 1 link, vui lòng đợi đơn hàng đã đặt báo Thành công hoặc Đã hủy/Đã hoàn tiền. Chúng tôi sẽ không hoàn tiền hoặc bảo hành nếu đơn hàng bị lỗi trong trường hợp này.</li>
            <li>Phương thức thanh toán có thể thay đổi tùy thời điểm.</li>
            <li>Dịch vụ có ghi rõ tên quốc gia tức là tài khoản tăng tương tác có tên ở quốc gia đó, dịch vụ ghi quốc tế tức là tên đa quốc gia, các dịch vụ nếu không ghi rõ quốc gia cụ thể mặc định là Việt Nam hoặc đa quốc gia.</li>
            <li>Nội dung trên tài khoản Facebook/Tiktok/Instagram/Youtube/Telegram,...(áp dụng cho toàn bộ dịch vụ mà chúng tôi cung cấp) mà bạn nhập vào để mua dịch vụ tại App Tăng Like phải tuân thủ mọi quy định của pháp luật Việt Nam.</li>
            <li>NGHIÊM CẤM tăng tương tác vào các nội dung vi phạm đạo đức và pháp luật Việt Nam. Các đơn hàng mà bạn cố tình mua cho các nội dung vi phạm đạo đức và pháp luật sẽ bị hủy bỏ mà không cần báo trước, không hỗ trợ và không hoàn tiền.</li>
            <li>Nếu cố tình vi phạm nhiều lần chúng tôi sẽ khóa tài khoản khỏi hệ thống vĩnh viễn và bạn sẽ phải chịu hoàn toàn trách nhiệm trước pháp luật Việt Nam.</li>
            <li>Một số nội dung BỊ CẤM vì vi phạm đạo đức và pháp luật Việt Nam như: cờ bạc, cá độ, ma túy, khiêu dâm, lừa đảo, gian lận, phản động, chống phá Đảng và Nhà Nước, buôn bán hàng quốc cấm, xuyên tạc chính trị, các nội dung chửi bới, vu khống, phê phán, xúc phạm nhân phẩm, danh dự tổ chức hoặc cá nhân,... (không giới hạn các nội dung bị cấm, tùy thuộc vào quy định của pháp luật Việt Nam hiện hành) hoặc bất kỳ nội dung nào mà chúng tôi cho là vi phạm.</li>
            <li>Nghiêm cấm sử dụng hoặc lợi dụng App Tăng Like để lừa đảo người khác thu lợi bất chính.</li>
            <li>App Tăng Like không chịu bất kỳ trách nhiệm nào gây hại cho bạn và công ty của bạn.</li>
            <li>App Tăng Like không chịu trách nhiệm cho bất cứ hình ảnh hay nội dung nào trên các mạng xã hội.</li>
          </ol>
          
          <p className="mb-4">
            Tóm lại, App Tăng Like không hỗ trợ, không chấp nhận, không đồng ý và không chịu bất cứ trách nhiệm nào liên quan đến việc khách hàng sử dụng hệ thống của App Tăng Like để thực hiện các hoạt động vi phạm đạo đức và quy định của pháp luật Việt Nam.
          </p>
          
          <h3 className="font-bold mb-2">CÁC LỖI THƯỜNG GẶP</h3>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Đặt quá nhiều đơn hàng cùng 1 dịch vụ cho 1 link dẫn đến hệ thống không chạy.</li>
            <li>Đặt sai cấu trúc link của dịch vụ cần chạy.</li>
            <li>Đặt nhầm dịch vụ (ví dụ: mua follow cá nhân nhưng lại nhập vào dịch vụ mua follow Fanpage)</li>
            <li>Không đọc hết điều khoản của website.</li>
            <li>Không mở công khai trang cá nhân, like, sub... khi chạy dịch vụ tương ứng</li>
            <li>Nhập link rút gọn thay vì link gốc</li>
          </ul>
          
          <h3 className="font-bold mb-2">NẠP TIỀN & HOÀN TIỀN</h3>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Nạp tối thiểu: 10,000 đ. Cố tình nạp dưới mức tối thiểu sai cú pháp không hỗ trợ dưới mọi hình thức!</li>
            <li>Nạp tiền sai cú pháp vui lòng liên hệ hỗ trợ và đính kèm hóa đơn hoặc lịch sử chuyển tiền, tên đăng nhập hoặc email và giấy tờ tùy thân (nếu chúng tôi cho là cần thiết) để được hỗ trợ.</li>
            <li>Chỉ hỗ trợ các giao dịch nạp tiền sai cú pháp trong vòng 30 ngày kể từ ngày chuyển tiền, quá 30 ngày KHÔNG xử lý dưới mọi hình thức!</li>
            <li>Số tài khoản và nội dung chuyển tiền thường xuyên thay đổi, vì vậy khi nạp tiền hãy vào website lấy thông tin tài khoản hoặc quét QR code.</li>
            <li>Nên chuyển tiền nhanh 24/7 để được cộng tiền ngay sau vài phút. Trường hợp chuyển tiền chậm sẽ được cộng tiền sau khi ngân hàng xử lý giao dịch.</li>
            <li>Chuyển tiền nhầm vào số tài khoản của chúng tôi vui lòng liên hệ ngân hàng báo chuyển khoản nhầm để được hỗ trợ hoàn lại tiền.</li>
            <li>Chúng tôi KHÔNG hỗ trợ rút tiền đã nạp vào lại tài khoản ngân hàng/ví momo của bạn.</li>
            <li>Với đơn hàng bị lỗi chúng tôi chỉ hoàn tiền vào tài khoản của bạn trên hệ thống của App Tăng Like, tuy nhiên chúng tôi sẽ KHÔNG hoàn tiền trong trường hợp cố tình đe dọa, gây thiệt hại, tranh cãi, làm tổn thất, làm mất uy tín hoặc bất kỳ vấn đề nào mà chúng tôi cảm thấy bạn đang tác động xấu tới chúng tôi.</li>
            <li>Khi đơn hàng đã được hoàn tiền 1 lần, nếu view/like/sub... tiếp tục tụt, chúng tôi không có trách nhiệm hoàn tiếp.</li>
          </ul>
          
          <h3 className="font-bold mb-2">CHÍNH SÁCH BẢO HÀNH</h3>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Trường hợp đơn hàng bị tụt, vui lòng đợi chúng tôi bảo hành dịch vụ hoặc hoặc hoàn tiền trước khi đặt đơn hàng mới. Chúng tôi không thể xử lý nếu bạn đặt tiếp đơn hàng khi đang trong quá trình bảo hành, chúng tôi không chấp nhận bảo hành đơn hàng đó và bạn sẽ mất bảo hành.</li>
            <li>Hệ thống sẽ tự động đếm số khi bắt đầu, vì thế đừng hỏi chúng tôi đó là bao gồm VIEW/LIKE/SUBS...thật của bạn. Chúng tôi chỉ tính số bắt đầu và số kết thúc.</li>
            <li>Sau khi đặt hàng, nếu bạn tự ý thay đổi tên người dùng, để riêng tư tài khoản, riêng tư nội dung, đóng tài khoản, tài khoản bị khóa, link đặt hàng sai cấu trúc, sai điều kiện chạy. Chúng tôi không có trách nhiệm bảo hành hoặc xử lý đơn hàng của bạn.</li>
            <li>Nếu bạn đã chạy trên các hệ thống khác chúng tôi sẽ không bảo hành với link đó.</li>
            <li>Nếu bạn đặt đơn hàng sever "KHÔNG BẢO HÀNH" và sever "CÓ BẢO HÀNH" cho cùng 1 link. Chúng tôi sẽ không bảo hành cho link đó (CÓ BẢO HÀNH + KHÔNG BẢO HÀNH = KHÔNG BẢO HÀNH).</li>
            <li>Chúng tôi chỉ chấp nhận hủy đơn hàng nếu đơn hàng gặp lỗi của hệ thống, trường hợp lỗi từ phía bạn sẽ không được hoàn trả lại tiền.</li>
            <li>Nếu dịch vụ hiện tại đang bảo hành vĩnh viễn và đơn hàng đã hoàn thành xong trước đó. Khi xảy ra sự cố khiến server không thể hoạt động được để bảo hành. Chúng tôi có quyền dừng bảo hành đơn hàng đó.</li>
            <li>Các đơn hàng bảo hành vĩnh viễn có thể thay đổi thời gian bảo hành giữa chừng hoặc không thực hiện bảo hành phụ thuộc vào tình hình server lúc đó.</li>
          </ul>
          
          <h3 className="font-bold mb-2">CHÍNH SÁCH RIÊNG TƯ</h3>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Chúng tôi sẽ nghiêm túc giữ bí mật thông tin cá nhân và bảo vệ quyền riêng tư của bạn.</li>
            <li>Tất cả thông tin cá nhân chỉ được sử dụng cho mục đích đặt hàng tại website. Chúng tôi sẽ không bán hay phân phối lại cho bất kỳ ai.</li>
          </ul>
        </div>
        <DialogClose asChild>
          <Button className="mt-2">Đóng</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
