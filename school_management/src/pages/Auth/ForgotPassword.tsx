import { MailOutlined, LockOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Divider } from 'antd';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../api/auth';
import { useState } from 'react';

const ForgotPassword = () => {
    const { register, handleSubmit } = useForm<{ email: string }>();
    const navigate = useNavigate();
    const [isSent, setIsSent] = useState(false);
    const [email, setEmail] = useState('');

    const onSubmit = async (data: { email: string }) => {
        try {
            await forgotPassword(data);
            setEmail(data.email);
            setIsSent(true);
            toast.success('Đã gửi email khôi phục mật khẩu');
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Có lỗi xảy ra');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center">
            <div className="w-full max-w-lg">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Quên mật khẩu</h1>
                    <p className="text-slate-600">Khôi phục quyền truy cập tài khoản của bạn</p>
                </div>

                <Card
                    variant="borderless"
                    style={{
                        borderRadius: 16,
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                    }}
                    className="bg-white"
                >
                    {/* STATE: ĐÃ GỬI MAIL */}
                    {isSent ? (
                        <div className="flex flex-col items-center text-center py-6">
                            <Avatar
                                size={80}
                                icon={<CheckCircleOutlined />}
                                style={{ backgroundColor: '#52c41a', fontSize: 40 }}
                            />
                            <h3 className="text-xl font-semibold mt-4">Email đã được gửi</h3>
                            <p className="text-slate-500 mt-2">Chúng tôi đã gửi link đặt lại mật khẩu tới:</p>
                            <p className="font-medium text-slate-700 mt-1">{email}</p>

                            <Button
                                type="primary"
                                size="large"
                                className="mt-6"
                                onClick={() => navigate('/auth/login')}
                            >
                                Quay về đăng nhập
                            </Button>
                        </div>
                    ) : (
                        <>
                            {/* STATE: FORM */}
                            <div className="flex flex-col items-center mb-6">
                                <Avatar
                                    size={80}
                                    icon={<LockOutlined />}
                                    style={{
                                        backgroundColor: '#1890ff',
                                        fontSize: 40,
                                    }}
                                />
                                <p className="text-slate-500 text-center mt-4">
                                    Nhập email bạn đã đăng ký, chúng tôi sẽ gửi link đặt lại mật khẩu
                                </p>
                            </div>

                            <Divider />

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                                            <MailOutlined />
                                        </span>
                                        <input
                                            {...register('email', { required: true })}
                                            type="email"
                                            placeholder="example@email.com"
                                            className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <Button htmlType="submit" type="primary" size="large" block style={{ borderRadius: 8 }}>
                                    Gửi email khôi phục
                                </Button>

                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/auth/login')}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        Quay lại đăng nhập
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ForgotPassword;
