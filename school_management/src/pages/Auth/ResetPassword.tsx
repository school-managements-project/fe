import { LockOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Card, Divider, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../api/api';

const ResetPassword = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();
    const token = params.get('token');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [countdown, setCountdown] = useState(3);

    const [form] = Form.useForm();

    // ===== COUNTDOWN SAU KHI RESET THÀNH CÔNG =====
    useEffect(() => {
        if (!success) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/auth/login');
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [success, navigate]);

    // ===== TOKEN KHÔNG CÓ =====
    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
                <Card className="max-w-md w-full text-center">
                    <Avatar
                        size={80}
                        icon={<ExclamationCircleOutlined />}
                        style={{ backgroundColor: '#faad14', fontSize: 40 }}
                    />
                    <h2 className="text-xl font-semibold mt-4">Liên kết không hợp lệ</h2>
                    <p className="text-slate-500 mt-2">Liên kết đặt lại mật khẩu không tồn tại hoặc đã hết hạn.</p>

                    <Button
                        type="primary"
                        size="large"
                        className="mt-6"
                        onClick={() => navigate('/auth/forgot-password')}
                    >
                        Gửi lại email khôi phục
                    </Button>
                </Card>
            </div>
        );
    }

    // ===== SUBMIT FORM =====
    const onFinish = async (values: any) => {
        const { newPassword, confirmPassword } = values;
        setError('');

        try {
            setLoading(true);
            await api.post('/auth/reset-password', {
                token,
                newPassword,
                confirmPassword,
            });
            setSuccess(true);
        } catch (err: any) {
            const serverMessage = err.response?.data?.message;

            const messageMap: Record<string, string> = {
                'Thiếu thông tin': 'Thông tin không hợp lệ. Vui lòng thử lại.',
                'Mật khẩu xác nhận không khớp': 'Mật khẩu xác nhận không khớp.',
                'Token không hợp lệ hoặc đã hết hạn': 'Liên kết đặt lại mật khẩu đã hết hạn hoặc không còn hiệu lực.',
            };

            setError(messageMap[serverMessage] || 'Có lỗi xảy ra. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <Card
                    variant="borderless"
                    style={{
                        borderRadius: 16,
                        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                    }}
                >
                    {success ? (
                        // ===== SUCCESS STATE =====
                        <div className="flex flex-col items-center text-center py-8">
                            <Avatar
                                size={88}
                                icon={<CheckCircleOutlined />}
                                style={{
                                    backgroundColor: '#52c41a',
                                    fontSize: 44,
                                }}
                            />
                            <h2 className="text-2xl font-semibold mt-4">Đặt lại mật khẩu thành công</h2>
                            <p className="text-slate-500 mt-2">
                                Bạn sẽ được chuyển về trang đăng nhập sau{' '}
                                <span className="font-medium">{countdown}s</span>
                            </p>

                            <Button
                                type="primary"
                                size="large"
                                className="mt-6"
                                onClick={() => navigate('/auth/login')}
                            >
                                Đăng nhập ngay
                            </Button>
                        </div>
                    ) : (
                        // ===== FORM STATE =====
                        <>
                            <div className="flex flex-col items-center mb-6">
                                <Avatar
                                    size={80}
                                    icon={<LockOutlined />}
                                    style={{
                                        backgroundColor: '#1890ff',
                                        fontSize: 40,
                                    }}
                                />
                                <h2 className="text-xl font-semibold mt-4">Đặt lại mật khẩu</h2>
                                <p className="text-slate-500 text-center mt-2">
                                    Vui lòng nhập mật khẩu mới cho tài khoản của bạn
                                </p>
                            </div>

                            <Divider />

                            <Form layout="vertical" onFinish={onFinish} form={form}>
                                <Form.Item
                                    label="Mật khẩu mới"
                                    name="newPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu mới',
                                        },
                                        {
                                            min: 8,
                                            message: 'Mật khẩu tối thiểu 8 ký tự',
                                        },
                                    ]}
                                >
                                    <Input.Password size="large" prefix={<LockOutlined />} placeholder="••••••••" />
                                </Form.Item>

                                <Form.Item
                                    label="Xác nhận mật khẩu"
                                    name="confirmPassword"
                                    dependencies={['newPassword']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng xác nhận mật khẩu',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('newPassword') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password size="large" prefix={<LockOutlined />} placeholder="••••••••" />
                                </Form.Item>

                                {error && (
                                    <Alert
                                        type="error"
                                        showIcon
                                        className="mb-4"
                                        message={error}
                                        description={
                                            error.includes('hết hạn') && (
                                                <span>
                                                    <button
                                                        onClick={() => navigate('/auth/forgot-password')}
                                                        className="text-blue-600 hover:underline"
                                                    >
                                                        Gửi lại email khôi phục
                                                    </button>
                                                </span>
                                            )
                                        }
                                    />
                                )}

                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                    size="large"
                                    block
                                    style={{ borderRadius: 8 }}
                                >
                                    Đặt lại mật khẩu
                                </Button>
                            </Form>
                        </>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default ResetPassword;
