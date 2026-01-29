import { Form, Input, Button, Alert, Space, Divider } from 'antd';
import { LockOutlined, CheckCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { changePassword } from '../../../api/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ChangePasswordForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values: any) => {
        const { oldPassword, newPassword, confirmPassword } = values;

        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return;
        }

        try {
            setLoading(true);
            await changePassword({
                oldPassword,
                newPassword,
                confirmPassword,
            });
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            toast.success('Đổi mật khẩu thành công. Vui lòng đăng nhập lại');
            navigate('/auth/login');
        } catch (err: any) {
            setError('Có lỗi xảy ra');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md">
            {/* Info Box */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                <div className="flex items-start gap-3">
                    <ExclamationCircleOutlined className="text-blue-600 text-lg mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-medium text-blue-900 mb-1">Yêu cầu bảo mật</p>
                        <p className="text-sm text-blue-800">Mật khẩu phải chứa ít nhất 8 ký tự.</p>
                    </div>
                </div>
            </div>

            <Form layout="vertical" onFinish={onFinish} form={form} autoComplete="off">
                {/* Current Password */}
                <Form.Item
                    label={<span className="font-semibold text-slate-700">Mật khẩu hiện tại</span>}
                    name="oldPassword"
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
                >
                    <Input.Password
                        placeholder="••••••••"
                        size="large"
                        prefix={<LockOutlined className="text-slate-400" />}
                        style={{
                            borderRadius: 8,
                        }}
                    />
                </Form.Item>

                <Divider className="my-4" />

                {/* New Password */}
                <Form.Item
                    label={<span className="font-semibold text-slate-700">Mật khẩu mới</span>}
                    name="newPassword"
                    rules={[
                        { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                        { min: 8, message: 'Mật khẩu tối thiểu 8 ký tự' },
                    ]}
                >
                    <Input.Password
                        placeholder="••••••••"
                        size="large"
                        prefix={<LockOutlined className="text-slate-400" />}
                        style={{
                            borderRadius: 8,
                        }}
                    />
                </Form.Item>

                {/* Confirm Password */}
                <Form.Item
                    label={<span className="font-semibold text-slate-700">Xác nhận mật khẩu mới</span>}
                    name="confirmPassword"
                    rules={[
                        { required: true, message: 'Vui lòng xác nhận mật khẩu' },
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
                    <Input.Password
                        placeholder="••••••••"
                        size="large"
                        prefix={<LockOutlined className="text-slate-400" />}
                        style={{
                            borderRadius: 8,
                        }}
                    />
                </Form.Item>

                {/* Messages */}
                <Space direction="vertical" style={{ width: '100%' }} className="mb-6">
                    {error && (
                        <Alert
                            type="error"
                            message={error}
                            showIcon
                            closable
                            onClose={() => setError('')}
                            style={{ borderRadius: 8 }}
                        />
                    )}
                    {success && (
                        <Alert
                            type="success"
                            message={success}
                            icon={<CheckCircleOutlined />}
                            showIcon
                            closable
                            onClose={() => setSuccess('')}
                            style={{ borderRadius: 8 }}
                        />
                    )}
                </Space>

                {/* Buttons */}
                <Space style={{ width: '100%' }} size="large">
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        size="large"
                        style={{
                            borderRadius: 8,
                            height: 40,
                            fontWeight: 500,
                        }}
                        className="flex-1"
                    >
                        Cập nhật mật khẩu
                    </Button>
                    <Button
                        onClick={() => {
                            form.resetFields();
                            setError('');
                            setSuccess('');
                        }}
                        size="large"
                        style={{
                            borderRadius: 8,
                            height: 40,
                        }}
                    >
                        Hủy
                    </Button>
                </Space>
            </Form>
        </div>
    );
};

export default ChangePasswordForm;
