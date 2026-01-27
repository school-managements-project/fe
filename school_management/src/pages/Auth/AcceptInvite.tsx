// pages/AcceptInvite.jsx
import { useEffect, useState } from 'react';
import { completeRegister, getInviteInfo } from '../../api/auth';

export default function AcceptInvite() {
    const token = new URLSearchParams(window.location.search).get('token');

    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState(null);

    const [form, setForm] = useState({
        teacherId: '',
        fullName: '',
        address: '',
        gender: 'male',
        subject: '',
        classes: '',
        password: '',
    });

    useEffect(() => {
        getInviteInfo(token)
            .then((res) => {
                setInfo(res.data);
                setLoading(false);
            })
            .catch(() => {
                alert('Link không hợp lệ hoặc đã hết hạn');
            });
    }, [token]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submit = async () => {
        if (!form.fullName || !form.password) {
            alert('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        await completeRegister({
            token,
            fullName: form.fullName,
            password: form.password,
            profile: {
                teacherId: form.teacherId,
                gender: form.gender,
                subject: form.subject,
                classes: form.classes.split(','),
                address: form.address,
            },
        });

        alert('Tạo tài khoản thành công');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Đang tải thông tin...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-center mb-6">Hoàn tất đăng ký</h2>

                <div className="mb-4 text-sm text-gray-600">
                    <p>
                        Email: <b>{info.email}</b>
                    </p>
                    <p>
                        Vai trò: <b className="capitalize">{info.role}</b>
                    </p>
                </div>

                {/* ID giáo viên */}
                <input
                    name="teacherId"
                    placeholder="Mã giáo viên"
                    onChange={handleChange}
                    className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />

                {/* Họ tên */}
                <input
                    name="fullName"
                    placeholder="Họ và tên"
                    onChange={handleChange}
                    className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />

                {/* Địa chỉ */}
                <input
                    name="address"
                    placeholder="Địa chỉ"
                    onChange={handleChange}
                    className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />

                {/* Giới tính */}
                <select
                    name="gender"
                    onChange={handleChange}
                    className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                >
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                </select>

                {/* Môn dạy */}
                <input
                    name="subject"
                    placeholder="Môn giảng dạy"
                    onChange={handleChange}
                    className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />

                {/* Lớp */}
                <input
                    name="classes"
                    placeholder="Lớp phụ trách (VD: 10A1,10A2)"
                    onChange={handleChange}
                    className="w-full mb-3 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />

                {/* Mật khẩu */}
                <input
                    type="password"
                    name="password"
                    placeholder="Mật khẩu"
                    onChange={handleChange}
                    className="w-full mb-5 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />

                <button
                    onClick={submit}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Xác nhận đăng ký
                </button>
            </div>
        </div>
    );
}
