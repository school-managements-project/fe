import React from 'react';
import { RadialBar, RadialBarChart } from 'recharts';
import { useAppSelector } from '../hooks/hooks';

const CountChart = () => {
    const students = useAppSelector((state) => state.student);
    const { getAllStudent } = students;
    const genderSexFemale = getAllStudent.filter((item) => {
        return item.sex == 'female';
    });
    const genderSexMale = getAllStudent.filter((item) => {
        return item.sex == 'male';
    });
    const data = [
        { uv: genderSexMale.length, label: "Nam", fill: '#4A90E2' }, //"Nam"
        { uv:  genderSexFemale.length ,label: "Nam", fill: '#FF69B4' }, // Nữ
    ];
    return (
        <div className="flex flex-col items-center">
            <RadialBarChart
                width={260}
                height={260}
                cx="50%"
                cy="50%"
                innerRadius="10%"
                outerRadius="80%"
                barSize={20}
                data={data}
            >
                <RadialBar background dataKey="uv" label/>
            </RadialBarChart>

            <div className="flex gap-6 text-lg font-semibold mt-2">
                <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full" style={{ background: '#4A90E2' }}></span>
                    <span className="text-blue-600">Boys: { genderSexMale.length}</span>
                </span>

                <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full" style={{ background: '#FF69B4' }}></span>
                    <span className="text-pink-600">Girls: { genderSexFemale.length}</span>
                </span>
            </div>
        </div>
    );
};

export default CountChart;
