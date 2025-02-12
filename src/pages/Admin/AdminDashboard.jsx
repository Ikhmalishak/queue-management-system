import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import StatCard from "../../components/StatCard";
import ChartCard from "../../components/ChartCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { api, setAuthToken } from "../../utils/api"; // ✅ Import setAuthToken

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        new_patients: 0,
        completed: 0,
        waiting: 0,
        average_waiting_time: "0 min",
    });

    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setAuthToken(token); // ✅ Set auth token
        } else {
            console.error("❌ No auth token found! Redirecting to login...");
            window.location.href = "/";
            return;
        }

        fetchDashboardStats();
        fetchWeeklyStats();
    }, []);

    const username = "Dr. Smith";

    // ✅ Fetch today's stats from API
    const fetchDashboardStats = async () => {
        try {
            const response = await api.get("/queue/statistic");
            setStats(response.data);
        } catch (error) {
            console.error("❌ Error fetching dashboard stats:", error);
        }
    };

    const fetchWeeklyStats = async () => {
        try {
            const response = await api.get("/queue/weeklystatistic");
    
    
            // ✅ Ensure correct mapping: "day" (X-axis) & "count" → "value" (Y-axis)
            const formattedData = response.data.map(item => ({
                name: item.day,   // Keep "day" for X-axis
                value: item.count // Convert "count" to "value" for Y-axis
            }));
    
            setChartData(formattedData);
            setLoading(false);
        } catch (error) {
            console.error("❌ Error fetching weekly stats:", error);
        }
    };
    
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header username={username} />
            <div className="d-flex flex-grow-1">
                {/* Sidebar with Admin role */}
                <Sidebar role="admin" />

                {/* Main Content */}
                <div className="container-fluid p-4 flex-grow-1">
                    {/* Stats Grid */}
                    <div className="row g-3 mb-4">
                        <div className="col-md-3">
                            <StatCard title="New Patient" value={stats.new_patients} backgroundColor="bg-info" icon="👤" />
                        </div>
                        <div className="col-md-3">
                            <StatCard title="Completed" value={stats.completed} backgroundColor="bg-success" icon="✓" />
                        </div>
                        <div className="col-md-3">
                            <StatCard title="Waiting" value={stats.waiting} backgroundColor="bg-warning text-dark" icon="⏰" />
                        </div>
                        <div className="col-md-3">
                            <StatCard title="Average Waiting Time" value={`${stats.average_waiting_time}`} backgroundColor="bg-secondary" icon="⌛" />
                        </div>
                    </div>

                    {/* Charts Grid */}
                    <div className="row g-3">
                        <div className="col-lg-12">
                            <ChartCard title="Weekly Patients Trend" data={chartData} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AdminDashboard;
