import { useMutation, useQuery } from '@tanstack/react-query';
import { Modal } from 'antd';
import React, { useEffect, useState, type ReactElement } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { getClass } from '../../../api/classes';
import { getSubject } from '../../../api/subject';
import { createTeacher, getTeacherDetail, updateTeacher } from '../../../api/teacher';
import type { ITeacher } from '../../../types/ITeacher';
import { toast } from 'react-toastify';
import { queryClient } from '../../../api/useQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import { teacherSchema } from '../../../schema/teacherSchema';
import { useNavigate, useParams } from 'react-router-dom';

type Props = { children: ReactElement; idTeacher?: string };
const FormModalTeacher = ({ children, idTeacher }: Props) => {
    const navi = useNavigate();
    const [disable, setDisable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ITeacher>({
        resolver: zodResolver(teacherSchema),
    });

    //List DataSubject
    const { data: dataSubject } = useQuery({
        queryKey: ['subject'],
        queryFn: async () => {
            const { data } = await getSubject();
            return data;
        },
    });

    //List DataClass
    const { data: dataClass } = useQuery({
        queryKey: ['class'],
        queryFn: async () => {
            const { data } = await getClass();
            return data;
        },
    });

    //List DataDetailTeacher
    const { data: dataTeacherDetail } = useQuery({
        queryKey: ['teacher', id],
        queryFn: async () => {
            const { data } = await getTeacherDetail(String(id!));
            return data.data;
        },
        enabled: !!id && isModalOpen,
    });

    //Update Teacher
    const mutationTeacher = useMutation({
        mutationKey: ['teacher'],
        mutationFn: (data: ITeacher) => {
            if (!id) {
                return createTeacher({ ...data, teacherId: '10' });
            }
            return updateTeacher(String(id), { ...data, teacherId: '10' });
        },
        onSuccess: () => {
            toast.success(id ? 'Sửa thành công' : 'Thêm thành công');
            reset();
            setIsModalOpen(false);
            queryClient.invalidateQueries();
            setDisable(false);
        },
        onError: () => {
            console.log(errors);
            toast.error('Lỗi rồi kìa');
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
        navi('/teachers');
    };
    const onSubmit: SubmitHandler<ITeacher> = (data) => {
        setDisable(true);
        mutationTeacher.mutate(data);
    };

    useEffect(() => {
        if (dataTeacherDetail) {
            reset(dataTeacherDetail);
        }
    }, [dataTeacherDetail]);
    return (
        <>
            {React.cloneElement(children, {
                onClick: () => {
                    if (idTeacher) {
                        navi(`/teachers/${idTeacher}`);
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
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700">Môn dạy</label>
                            <div className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition bg-white max-h-48 overflow-y-auto space-y-2">
                                {dataSubject?.map((item: any) => (
                                    <label
                                        key={item._id}
                                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-1"
                                    >
                                        <input
                                            type="checkbox"
                                            value={item._id}
                                            {...register('subjects', {
                                                required: 'Vui lòng chọn ít nhất 1 môn',
                                            })}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm">{item.name}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        {/* Lớp phụ trách – cũng y chang */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Lớp phụ trách</label>
                            <div className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition bg-white max-h-48 overflow-y-auto space-y-2">
                                {dataClass?.map((item: any) => (
                                    <label
                                        key={item._id}
                                        className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 px-1"
                                    >
                                        <input
                                            type="checkbox"
                                            value={item._id}
                                            {...register('classes', {
                                                required: 'Vui lòng chọn ít nhất 1 môn',
                                            })}
                                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm">{item.name}</span>
                                    </label>
                                ))}
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
                            {id ? 'Sửa giáo viên' : 'Thêm giáo viên'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default FormModalTeacher;
