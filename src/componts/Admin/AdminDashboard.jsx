import React, { useState } from 'react';

function AdminDashboard() {
  const [currentView, setCurrentView] = useState("overview");

  // دالة لتحديد المحتوى بناءً على القسم المحدد
  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p>Here you can see a summary of key metrics like total orders, revenue, etc.</p>
          </div>
        );
      case "currentOrders":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Current Orders</h2>
            <p>List of orders that are currently in progress.</p>
          </div>
        );
      case "completedOrders":
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Completed Orders</h2>
            <p>List of orders that have been completed.</p>
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
            className={`cursor-pointer p-2 rounded hover:bg-[#38bdf8] hover:text-white ${currentView === "overview" ? "bg-[#38bdf8] text-white" : "text-gray-800"}`}
            onClick={() => setCurrentView("overview")}
          >
            Overview
          </li>
          <li 
            className={`cursor-pointer p-2 rounded hover:bg-[#38bdf8] hover:text-white ${currentView === "currentOrders" ? "bg-[#38bdf8] text-white" : "text-gray-800"}`}
            onClick={() => setCurrentView("currentOrders")}
          >
            Current Orders
          </li>
          <li 
            className={`cursor-pointer p-2 rounded hover:bg-[#38bdf8] hover:text-white ${currentView === "completedOrders" ? "bg-[#38bdf8] text-white" : "text-gray-800"}`}
            onClick={() => setCurrentView("completedOrders")}
          >
            Completed Orders
          </li>
          <li 
            className={`cursor-pointer p-2 rounded hover:bg-[#38bdf8] hover:text-white ${currentView === "orderChart" ? "bg-[#38bdf8] text-white" : "text-gray-800 "}`}
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
