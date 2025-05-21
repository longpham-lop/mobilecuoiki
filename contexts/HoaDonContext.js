import { API_URL } from "@env";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const HoaDonContext = createContext();

export const HoaDonProvider = ({ children }) => {
  const [hoaDonList, setHoaDonList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy tất cả hóa đơn
  const fetchHoaDons = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://192.168.105.140:8080/shopbongda/api/hoadon`);
      setHoaDonList(response.data);
      console.info("Danh sách hóa đơn:", response.data);
    } catch (error) {
      console.error("Lỗi khi tải hóa đơn:", error);
    } finally {
      setLoading(false);
    }
  };

  // Lấy hóa đơn theo mã khách hàng
  const fetchHoaDonsByMaKH = async (maKH) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://192.168.105.140:8080/shopbongda/api/hoadon/makh/${maKH}`);
      setHoaDonList(response.data);
    } catch (error) {
      console.error("Lỗi khi tải hóa đơn theo mã khách hàng:", error);
    } finally {
      setLoading(false);
    }
  };

  // Xóa hóa đơn theo ngày mua và mã khách hàng
  const deleteHoaDon = async (maKH, ngayMua) => {
    try {
      await axios.delete(`http://192.168.105.140:8080/shopbongda/api/hoadon/xoa`, {
        params: { maKH, ngayMua }
      });
      // Sau khi xóa thì tải lại danh sách
      fetchHoaDons();
    } catch (error) {
      console.error("Lỗi khi xóa hóa đơn:", error);
    }
  };

  // Cập nhật trạng thái hóa đơn
  const updateTrangThai = async (id, trangThai) => {
    try {
      const response = await axios.put(`http://192.168.105.140:8080/shopbongda/api/hoadon/${id}/trangthai`, null, {
        params: { trangThai }
      });
      // Cập nhật lại danh sách hóa đơn sau khi thay đổi trạng thái
      fetchHoaDons();
      return response.data;
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
    }
  };

  useEffect(() => {
    fetchHoaDons();
  }, []);

  return (
    <HoaDonContext.Provider
      value={{
        hoaDonList,
        loading,
        fetchHoaDons,
        fetchHoaDonsByMaKH,
        deleteHoaDon,
        updateTrangThai,
      }}
    >
      {children}
    </HoaDonContext.Provider>
  );
};
