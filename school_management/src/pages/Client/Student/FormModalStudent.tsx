import { useMutation, useQuery } from '@tanstack/react-query';
import { Modal } from 'antd';
import React, { useEffect, useState, type ReactElement } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { getClass } from '../../../api/classes';
import { toast } from 'react-toastify';
import { queryClient } from '../../../api/useQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, useParams } from 'react-router-dom';
import { createStudent, getStudentDetail, updateStudent } from '../../../api/student';
import type { IStudent } from '../../../types/IStudent';
import { studentSchema } from '../../../schema/studentSchema';

type Props = { children: ReactElement; idStudent?: string };
const FormModalStudent = ({ children, idStudent }: Props) => {
    const navi = useNavigate();
    const [disable, setDisable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IStudent>({
        resolver: zodResolver(studentSchema),
    });

    //List DataClass
    const { data: dataClass } = useQuery({
        queryKey: ['class'],
        queryFn: async () => {
            const { data } = await getClass();
            return data;
        },
    });

    //List dataStudentDetail
    const { data: dataStudentDetail } = useQuery({
        queryKey: ['student', id],
        queryFn: async () => {
            const { data } = await getStudentDetail(String(id!));
            return data.data;
        },
        enabled: !!id && isModalOpen,
    });

    //Update student
    const mutationStudent = useMutation({
        mutationKey: ['student'],
        mutationFn: (data: IStudent) => {
            if (!id) {
                return createStudent({ ...data, studentId: '10' });
            }
            return updateStudent(String(id), { ...data, studentId: '10' });
        },
        onSuccess: () => {
            toast.success(id ? 'Sửa thành công' : 'Thêm thành công');
            reset();
            setIsModalOpen(false);
            queryClient.invalidateQueries();
            setDisable(false);
        },
        onError: () => {
            toast.error("Lỗi rồi kìa");
        },
    });

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        navi('/students');
    };
    const onSubmit: SubmitHandler<IStudent> = (data) => {
        setDisable(true);
        mutationStudent.mutate(data);
    };

    useEffect(() => {
        if (dataStudentDetail) {
            reset(dataStudentDetail);
        }
    }, [dataStudentDetail]);
    return (
        <>
            {React.cloneElement(children, {
                onClick: () => {
                    if (idStudent) {
                        navi(`/students/${idStudent}`);
                        showModal();
                    }
                    showModal();
                },
            } as { onClick: () => void })}

            <Modal
                title="Basic Modal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                footer={null}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Họ và tên */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">
                                Họ và tên <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register('name', { required: true, minLength: 3 })}
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg  transition-colors"
                                placeholder="Nguyễn Văn A"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}{' '}
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                {...register('email')}
                                type="email"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg  transition-colors"
                                placeholder="example@gmail.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}{' '}
                        </div>

                        {/* Giới tính */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Giới tính</label>
                            <select
                                {...register('sex')}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg"
                            >
                                <option value="">Chọn giới tính</option>
                                <option value="female">Nữ</option>
                                <option value="male">Nam</option>
                            </select>
                        </div>

                        {/* Số điện thoại */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
                            <input
                                {...register('phone')}
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg  transition-colors"
                                placeholder="0901234567"
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}{' '}
                        </div>
                        {/* Address */}
                        <div className="space-y-1 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Địa chỉ</label>
                            <input
                                {...register('address')}
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg  transition-colors"
                                placeholder="Hoàng Diệu - Chương Mỹ - Hà Nội"
                            />
                        </div>

                        {/* Lớp phụ trách – cũng y chang */}
                        <div className="space-y-1 col-span-2">
                            <label className="text-sm font-medium text-gray-700">Học lớp</label>
                            <div className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition bg-white max-h-48 overflow-y-auto space-y-2">
                                {dataClass?.map((item: any) => (
                                    <label
                                        key={item._id}
                                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-1"
                                    >
                                        <input
                                            type="radio"
                                            value={item._id}
                                            {...register('class', {
                                                required: 'Vui lòng chọn lớp',
                                            })}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm">{item.name}</span>
                                    </label>
                                ))}
                                {errors.class && <p className="text-red-500 text-sm">{errors.class?.message}</p>}{' '}
                            </div>
                        </div>

                        {/* Ảnh (URL) */}
                        <div className="space-y-1 md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">Link ảnh đại diện (URL)</label>
                            <input
                                {...register('photo')}
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg  transition-colors"
                                placeholder="https://example.com/avatar.jpg"
                            />
                        </div>
                    </div>

                    {/* Nút submit */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                        >
                            Hủy
                        </button>
                        <button
                            disabled={disable}
                            type="submit"
                            className="px-8 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-sm"
                        >
                            {id ? 'Sửa học sinh' : 'Thêm học sinh'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default FormModalStudent;
