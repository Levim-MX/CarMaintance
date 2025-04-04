import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaCheck } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function AdminDashboard() {
  const [currentView, setCurrentView] = useState("overview");
  const [orders, setOrders] = useState([]);

  // جلب الطلبات من الـ API عند تحميل المكون أو عند تغيير العرض
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await axios.get("http://localhost:3000/api/order/orders", {
          headers: { "x-auth-token": token },
        });
        setOrders(res.data);
        console.log("Fetched orders:", res.data);
      } catch (error) {
        console.error("Error fetching orders:", error.response ? error.response.data : error);
      }
    };

    fetchOrders();
  }, [currentView]);

  // تصفية الطلبات حسب حالة confirmed
  const currentOrders = orders.filter(order => !order.confirmed);
  const completedOrders = orders.filter(order => order.confirmed);

  // دالة لحذف الطلب مع تأكيد من المستخدم
  const handleDeleteOrder = async (orderId) => {
    const result = await MySwal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من استعادة الطلب بعد الحذف!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم، احذفه!",
      cancelButtonText: "إلغاء",
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:3000/api/order/${orderId}`, {
          headers: { "x-auth-token": token },
        });
        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
        MySwal.fire({
          toast: true,
          position: 'bottom-end',
          icon: 'success',
          title: 'تم حذف الطلب بنجاح',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } catch (error) {
        console.error("Error deleting order:", error.response ? error.response.data : error);
        MySwal.fire({
          icon: "error",
          title: "حدث خطأ أثناء حذف الطلب.",
          confirmButtonText: "حسناً",
          confirmButtonColor: "#d33",
        });
      }
    }
  };

  // دالة لتأكيد الطلب ونقله إلى الطلبات المكتملة مع عرض تنبيه Toast
  const handleCompleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:3000/api/order/${orderId}`,
        { confirmed: true },
        { headers: { "x-auth-token": token } }
      );
      console.log("Order updated:", res.data);
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order._id === orderId ? { ...order, confirmed: true } : order
        )
      );
      MySwal.fire({
        toast: true,
        position: 'bottom-end',
        icon: 'success',
        title: 'تم نقل الطلب إلى الطلبات المكتملة بنجاح',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Error completing order:", error.response ? error.response.data : error);
      MySwal.fire({
        icon: "error",
        title: "حدث خطأ أثناء تأكيد الطلب.",
        confirmButtonText: "حسناً",
        confirmButtonColor: "#d33",
      });
    }
  };

  // دالة عرض المحتوى بناءً على currentView
  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <div className="space-y-2">
              <p className="text-lg">
                إجمالي الطلبات: <span className="font-bold">{orders.length}</span>
              </p>
              <p className="text-lg">
                الطلبات الحالية: <span className="font-bold">{currentOrders.length}</span>
              </p>
              <p className="text-lg">
                الطلبات المكتملة: <span className="font-bold">{completedOrders.length}</span>
              </p>
            </div>
          </div>
        );
      case "currentOrders":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Current Orders</h2>
            {currentOrders.length === 0 ? (
              <p className="text-gray-600">No orders found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">User Name</th>
                      <th className="border px-4 py-2">Phone</th>
                      <th className="border px-4 py-2">Car Type</th>
                      <th className="border px-4 py-2">Branch</th>
                      <th className="border px-4 py-2">Service</th>
                      <th className="border px-4 py-2">Sub Service</th>
                      <th className="border px-4 py-2">Confirmed</th>
                      <th className="border px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map((order) => (
                      <tr key={order._id}>
                        <td className="border px-4 py-2">{order.user_id.name}</td>
                        <td className="border px-4 py-2">{order.user_id.phoneNumber}</td>
                        <td className="border px-4 py-2">{order.car_name}</td>
                        <td className="border px-4 py-2">{order.branch_name}</td>
                        <td className="border px-4 py-2">{order.service_name}</td>
                        <td className="border px-4 py-2">{order.selected_sub_service}</td>
                        <td className="border px-4 py-2">{order.confirmed ? "Yes" : "No"}</td>
                        <td className="border px-4 py-2 flex space-x-2">
                          <button
                            onClick={() => handleDeleteOrder(order._id)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete Order"
                          >
                            <FaTrash />
                          </button>
                          {!order.confirmed && (
                            <button
                              onClick={() => handleCompleteOrder(order._id)}
                              className="text-green-500 hover:text-green-700"
                              title="Mark as Completed"
                            >
                              <FaCheck />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      case "completedOrders":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Completed Orders</h2>
            {completedOrders.length === 0 ? (
              <p className="text-gray-600">No completed orders found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">User Name</th>
                      <th className="border px-4 py-2">Phone</th>
                      <th className="border px-4 py-2">Car Type</th>
                      <th className="border px-4 py-2">Branch</th>
                      <th className="border px-4 py-2">Service</th>
                      <th className="border px-4 py-2">Sub Service</th>
                      <th className="border px-4 py-2">Confirmed</th>
                      <th className="border px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedOrders.map((order) => (
                      <tr key={order._id}>
                        <td className="border px-4 py-2">{order.user_id.name}</td>
                        <td className="border px-4 py-2">{order.user_id.phoneNumber}</td>
                        <td className="border px-4 py-2">{order.car_name}</td>
                        <td className="border px-4 py-2">{order.branch_name}</td>
                        <td className="border px-4 py-2">{order.service_name}</td>
                        <td className="border px-4 py-2">{order.selected_sub_service}</td>
                        <td className="border px-4 py-2">{order.confirmed ? "Yes" : "No"}</td>
                        <td className="border px-4 py-2">
                          <button
                            onClick={() => handleDeleteOrder(order._id)}
                            className="text-red-500 hover:text-red-700"
                            title="Delete Order"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      case "orderChart":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Order Statistics</h2>
            <p>Chart will be displayed here showing monthly order trends.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 p-4 border-r border-gray-300">
        <ul className="space-y-4">
          <li
            className={`cursor-pointer p-2 rounded hover:bg-blue-500 hover:text-white ${currentView === "overview" ? "bg-blue-500 text-white" : "text-gray-800"}`}
            onClick={() => setCurrentView("overview")}
          >
            Overview
          </li>
          <li
            className={`cursor-pointer p-2 rounded hover:bg-blue-500 hover:text-white ${currentView === "currentOrders" ? "bg-blue-500 text-white" : "text-gray-800"}`}
            onClick={() => setCurrentView("currentOrders")}
          >
            Current Orders
          </li>
          <li
            className={`cursor-pointer p-2 rounded hover:bg-blue-500 hover:text-white ${currentView === "completedOrders" ? "bg-blue-500 text-white" : "text-gray-800"}`}
            onClick={() => setCurrentView("completedOrders")}
          >
            Completed Orders
          </li>
          <li
            className={`cursor-pointer p-2 rounded hover:bg-blue-500 hover:text-white ${currentView === "orderChart" ? "bg-blue-500 text-white" : "text-gray-800"}`}
            onClick={() => setCurrentView("orderChart")}
          >
            Order Statistics
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
}

export default AdminDashboard;
