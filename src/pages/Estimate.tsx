import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Printer, FileText, Download, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useLocation } from "react-router-dom";
const EstimateManagement = () => {
  const [expandedSections, setExpandedSections] = useState({
    primary: true,
    classification: true,
    shipping: true
  });
  const { state } = useLocation();
   const item = state?.item;
   console.log(item);
   
  type SectionKey = keyof typeof expandedSections;

  const toggleSection = (section: SectionKey) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-orange-500" />
            <span className="font-semibold">Estimate</span>
            <Search className="w-4 h-4 text-gray-400" />
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-blue-600">EST0010124/00007</span>
              <span className="text-gray-600">N04675_Nhà thuốc Bệnh viện Quân Y 5</span>
              <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">EXPIRED</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4 text-gray-600 cursor-pointer" />
            <ArrowRight className="w-4 h-4 text-gray-600 cursor-pointer" />
            <button className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">List</button>
            <button className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">Search</button>
            <button className="px-3 py-1 text-sm text-gray-700 hover:bg-gray-100">Custom</button>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-gray-100 border-b">
        <div className="px-4 py-2 flex items-center space-x-2">
          <Button className="px-4 py-1.5 text-sm rounded">Edit</Button>
          <Button className="px-4 py-1.5 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400">Back</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-3">
        <div className="grid grid-cols-4 gap-3">
          {/* Left Column - 3/4 width */}
          <div className="col-span-3 space-y-3">
            {/* Primary Information */}
            <div className="bg-white rounded shadow-sm">
              <div 
                className="bg-primary px-3 py-2 flex items-center cursor-pointer hover:bg-gray-500 border-b"
                onClick={() => toggleSection('primary')}
              >
                {expandedSections.primary ? <ChevronDown className="w-4 h-4 mr-2 text-white" /> : <ChevronRight className="w-4 h-4 mr-2" />}
                <span className="font-semibold text-sm text-white">Primary Information</span>
              </div>
              {expandedSections.primary && (
                <div className="p-3">
                  <div className="grid grid-cols-3 gap-x-4 gap-y-3 text-xs">
                    {/* Row 1 */}
                    <div>
                      <div className="text-gray-600 mb-1">DOCUMENT NUMBER</div>
                      <div className="font-medium">EST0010124/00007</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">DATE</div>
                      <div>01/10/2024</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">ACTUAL EMPLOYEE</div>
                      <div className='text-blue-500'>01/2047_Cẩn_Thị Nhàn</div>
                    </div>

                    {/* Row 2 */}
                    <div>
                      <div className="text-gray-600 mb-1">ORDER TYPE</div>
                      <div>SHCN (CS)</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">ORDER TIME</div>
                      <div>07/10/2024 16:31:14</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">NV KINH DOANH</div>
                      <div className=" px-2 py-1">
                        <div className=" text-blue-500">N048384_Z00_01323_Lê Huy Tuấn</div>
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div>
                      <div className="text-gray-600 mb-1">LOCATION</div>
                      <div className=" px-2 py-1">
                        CPC1 - HỒ SƠ - TTĐN HN Nội
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="text-gray-600 mb-1">
                        <span>NGƯỜI ĐẶT HÀNG</span>
                        <p>Bùi Quang Bảo</p>
                        </div>
                      <div className="text-gray-600 mb-1">
                        <span>SĐT NGƯỜI ĐẶT HÀNG</span>
                        <p>0954857547</p>
                        </div>
                    </div>
                    <div className="">
                      <div className="text-gray-600 mb-1">LÝ DO ĐÓNG ĐƠN</div>
                    </div>


                    {/* Row 4 */}
                    <div>
                      <div className="text-gray-600 mb-1">CUSTOMER</div>
                      <div className=" px-2 py-1 text-blue-500">
                        N04675_Nhà thuốc Bệnh viện Quân Y 5
                      </div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-gray-600 mb-1">MEMO</div>

                    </div>

                    {/* Row 5 */}
                    <div>
                      <div className="text-gray-600 mb-1">BUYER</div>
                      <div className=" px-2 py-1 text-blue-500">
                        N04675_Nhà thuốc Bệnh viện Quân Y 5
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Classification */}
            <div className="bg-white rounded shadow-sm">
              <div 
                className="bg-primary px-3 py-2 flex items-center cursor-pointer hover:bg-gray-500 border-b"
                onClick={() => toggleSection('classification')}
              >
                {expandedSections.classification ? <ChevronDown className="w-4 h-4 mr-2 text-white" /> : <ChevronRight className="w-4 h-4 mr-2" />}
                <span className="font-semibold text-sm text-white">Classification</span>
              </div>
              {expandedSections.classification && (
                <div className="p-3">
                  <div className="grid grid-cols-3 gap-4 text-xs">
                    <div>
                      <div className="text-gray-600 mb-1">DEPARTMENT</div>
                      <div>CPC1 - HỒ SƠ - TTĐN HN Nội</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">SUBDMARER</div>
                      <div>CPC1 - HỒ SƠ</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">BUSINESS CENTER</div>
                      <div>TTĐN HN Nội</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Shipping Information */}
            <div className="bg-white rounded shadow-sm">
              <div 
                className="bg-primary px-3 py-2 flex items-center cursor-pointer hover:bg-gray-500 border-b"
                onClick={() => toggleSection('shipping')}
              >
                {expandedSections.shipping ? <ChevronDown className="w-4 h-4 mr-2 text-white" /> : <ChevronRight className="w-4 h-4 mr-2" />}
                <span className="font-semibold text-sm text-white">Shipping Information</span>
              </div>
              {expandedSections.shipping && (
                <div className="p-3">
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className=" p-2">
                      <div className="text-gray-600 mb-1">NGÀY KẾ HOẠCH GIAO HÀNG</div>
                      <div className="font-medium">04/10/2024</div>
                    </div>
                    <div className=" p-2">
                      <div className="text-gray-600 mb-1">ĐỊA CHỈ GIAO HÀNG</div>
                      <div className="font-medium mb-2">N04675_TH</div>
                      
                      <div className="text-gray-600 mb-1">ĐỊA CHỈ HÀNG GIAO</div>
                      <div>Số nhà 130, đường Phùng Hưng Tiên Liễu, phường Phúc Thành, quận phố Hà Đông</div>
                      <div>Hà Nội, Việt Nam Việt Nam</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">HỒ TẮT NGƯỜI NHẬN HÀNG</div>
                      <div className="mb-2">Anh Qn: Gc 0916158466</div>
                      
                      <div className="text-gray-600 mb-1">SỐ ĐIỆN THOẠI NGƯỜI NHẬN</div>
                    </div>

                    <div>
                      <div className="text-gray-600 mb-1">HÌNH THỨC VẬN CHUYỂN</div>
                      <div>TTĐN TH - Gửi Hàng</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">GHI CHÚ (ĐỊA ĐIỂM, KHO HÀNG)</div>
                      <div>GPI-Q210</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">GHI CHÚ (ĐỊA ĐIỂM GIAO HÀNG)</div>
                    </div>

                    <div>
                      <div className="text-gray-600 mb-1">HƯỚNG DẪN ĐẶC BIỆT</div>
                      <div>Hướng dẫn hóa đơn</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">GHI CHÚ (LẬP HÓ LÊ)</div>
                    </div>
                    <div>
                      <div className="text-gray-600 mb-1">GHI CHÚ (TỪ NGƯỜI VỊ ĐỘC BIỆT)</div>
                    </div>

                    <div>
                      <div className="text-gray-600 mb-1">RELATED TRANSACTION</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Items Section */}
            <div className="bg-white rounded shadow-sm">
              <div className="bg-black px-3 py-2 flex items-center justify-between">
                <span className="text-white font-semibold text-sm">Items</span>
                <div className="flex space-x-3 text-xs">
                  <button className="text-white hover:underline">Financial Control</button>
                  <button className="text-white hover:underline">Accounting</button>
                  <button className="text-white hover:underline">Communication</button>
                  <button className="text-white hover:underline">Related Records</button>
                  <button className="text-white hover:underline">System Information</button>
                  <button className="text-white hover:underline">Custom</button>
                </div>
              </div>
              <div className="p-3">
                <div className="flex items-center space-x-2 mb-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-xs">LẬP CHỈ KHO GIẢNG</span>
                </div>
                <div className="text-xs text-gray-600 mb-3">LÔN HÀNG GỬNG CHƯNG BỚT TRỐNG</div>
                
                {/* Tabs */}
                <div className="border-b mb-3">
                  <div className="flex space-x-6">
                    <button className="pb-2 border-b-2  font-medium text-sm">Items 0+</button>
                    <button className="pb-2 text-gray-600 text-sm hover:text-gray-800">Estimate Status</button>
                    <button className="pb-2 text-gray-600 text-sm hover:text-gray-800">Tổng em số</button>
                  </div>
                </div>

                <div className="mb-3 flex space-x-2">
                  <button className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300">Kiểm Tra Tồn Lễ</button>
                  <button className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300">Kiểm Tra Quota</button>
                </div>

                {/* Items Table */}
                <div className="overflow-x-auto border rounded">
                  <table className="w-full text-xs">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-2 py-2 text-left border-r">
                          <div className=" px-2 py-1 bg-white">
                            <div>F. M04548_Nh5</div>
                            <div>Trương</div>
                          </div>
                        </th>
                        <th className="px-2 py-2 text-left border-r">GN<br/>HAND</th>
                        <th className="px-2 py-2 text-left border-r min-w-[200px]">DESCRIPTION</th>
                        <th className="px-2 py-2 text-left border-r">AVAILABLE</th>
                        <th className="px-2 py-2 text-left border-r">CONVERSION<br/>RATE</th>
                        <th className="px-2 py-2 text-left border-r">QUANTITY</th>
                        <th className="px-2 py-2 text-left border-r">BON<br/>VANG<br/>THÔN</th>
                        <th className="px-2 py-2 text-left border-r">LƯ ĐỌC<br/>DÙNG<br/>BON</th>
                        <th className="px-2 py-2 text-left border-r">CREATE<br/>BON</th>
                        <th className="px-2 py-2 text-left border-r">MEMO</th>
                        <th className="px-2 py-2 text-left border-r">ĐVT<br/>BÁN<br/>QUAN</th>
                        <th className="px-2 py-2 text-left border-r">PRICE<br/>LEVEL</th>
                        <th className="px-2 py-2 text-left border-r">RATE</th>
                        <th className="px-2 py-2 text-left border-r">RATE<br/>WITH<br/>TAX CODE</th>
                        <th className="px-2 py-2 text-left border-r">TN_M0T78_N_VATR</th>
                        <th className="px-2 py-2 text-left border-r">AMOUNT</th>
                        <th className="px-2 py-2 text-left border-r">TAX<br/>RATE</th>
                        <th className="px-2 py-2 text-left border-r">TAX AMT</th>
                        <th className="px-2 py-2 text-left border-r">GROSS AMT</th>
                        <th className="px-2 py-2 text-left border-r">ĐVT<br/>TẤM<br/>CHUNG</th>
                        <th className="px-2 py-2 text-left">LƯU<br/>TRỮ<br/>ĐỌN</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td colSpan={21} className="px-2 py-12 text-center text-gray-400">
                          No items to display
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary - 1/4 width */}
          <div className="space-y-3">
            <div className="bg-white rounded shadow-sm">
              <div className="bg-black px-3 py-2">
                <span className="text-white font-semibold text-sm">Summary</span>
              </div>
              <div className="p-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">SUBTOTAL</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">TAX</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">TOTAL</span>
                  <span className="font-semibold">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateManagement;  