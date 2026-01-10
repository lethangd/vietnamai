import { Card } from "@/components/ui/Card";

export default function Page() {
  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="text-lg font-semibold text-zinc-50">Tổng quan</div>
        <div className="mt-2 text-sm text-zinc-300">
          Chào mừng bạn đến dashboard Admin. Ở các tab bên trái bạn có thể:
          quản lý sản phẩm/thể loại, cập nhật link Zalo/Telegram, thêm đơn hàng, và
          xem chấm công staff.
        </div>
      </Card>
    </div>
  );
}

