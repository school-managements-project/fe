import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Divider, Tabs } from 'antd';
import ChangePasswordForm from './ChangePasswordForm';

const Profile = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h1 className="text-4xl font-bold text-slate-900 mb-2">Hồ sơ cá nhân</h1>
                            <p className="text-slate-600">Quản lý thông tin và bảo mật tài khoản của bạn</p>
                        </div>
                    </div>
                </div>

                {/* User Info Card */}
                <Card
                    variant="borderless"
                    style={{
                        borderRadius: 16,
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                        marginBottom: 24,
                    }}
                    className="bg-white"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                            <Avatar
                                size={80}
                                icon={<UserOutlined />}
                                style={{
                                    backgroundColor: '#1890ff',
                                    fontSize: '40px',
                                }}
                            />
                        </div>
                        <Button type="primary" size="large" style={{ borderRadius: 8 }}>
                            Cập nhật hồ sơ
                        </Button>
                    </div>

                    <Divider />
                </Card>

                {/* Settings Tabs */}
                <Card
                    variant="borderless"
                    style={{
                        borderRadius: 16,
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                    }}
                    className="bg-white"
                >
                    <Tabs
                        items={[
                            {
                                key: '1',
                                label: (
                                    <span className="flex items-center gap-2">
                                        <LockOutlined />
                                        Bảo mật
                                    </span>
                                ),
                                children: (
                                    <div className="pt-6">
                                        <h3 className="text-lg font-semibold text-slate-900 mb-6">Thay đổi mật khẩu</h3>
                                        <ChangePasswordForm />
                                    </div>
                                ),
                            },
                        ]}
                    />
                </Card>
            </div>
        </div>
    );
};

export default Profile;
