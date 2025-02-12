import React from "react";
import Sidebar from "../../components/Sidebar";
import StatCard from "../../components/StatCard";
import ChartCard from "../../components/ChartCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const AdminDashboard = () => {
    const chartData = [
        { name: "Mon", value: 12 },
        { name: "Tue", value: 19 },
        { name: "Wed", value: 15 },
        { name: "Thu", value: 25 },
        { name: "Fri", value: 20 },
        { name: "Sat", value: 18 },
        { name: "Sun", value: 13 },
    ];

    const username = "Dr. Smith";

    return (
        <div className="d-flex flex-column min-vh-100">
           <Header username={username} /> <div className="d-flex flex-grow-1">
                {/* Sidebar with Admin role */}
                <Sidebar role="doctor" />

                {/* Main Content */}
                <div className="container-fluid p-4 flex-grow-1">
                    {/* Header */}
                    

                    {/* Stats Grid */}
                    <div className="row g-3 mb-4">
                        <div className="col-md-3">
                            <StatCard title="New Patient" value="0" backgroundColor="bg-info" icon="👤" />
                        </div>
                        <div className="col-md-3">
                            <StatCard title="Completed" value="0" backgroundColor="bg-success" icon="✓" />
                        </div>
                        <div className="col-md-3">
                            <StatCard title="Waiting" value="0" backgroundColor="bg-warning text-dark" icon="⏰" />
                        </div>
                        <div className="col-md-3">
                            <StatCard title="Average Waiting Time" value="0 min" backgroundColor="bg-secondary" icon="⌛" />
                        </div>
                    </div>

                    {/* Charts Grid */}
                    <div className="row g-3 mb-4">
                        <div className="col-md-6">
                            <ChartCard title="Queue Summary" data={chartData} />
                        </div>
                        <div className="col-md-6">
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