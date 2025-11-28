import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Select, Space, Spin, Table, Tag } from 'antd';
import { toast } from 'react-toastify';
import { quertClient } from '../../../api/useQuery';

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Search from 'antd/es/input/Search';
import { resetQueryFilter, setQueryFilter } from '../../../feature/querySLice';
import { useDebounce } from '../../../hooks/useDebounce';
import { SEX } from '../../../ultis/constant';
import { deleteTeacher, getTeacher } from '../../../api/teacher';
import type { ITeacher } from '../../../types/ITeacher';
import type { ISubject } from '../../../types/ISubject';
import { getSubject } from '../../../api/subject';
import { getClass } from '../../../api/classes';
import type { IClass } from '../../../types/IClass';

const TeacherPage = () => {
    const dispatch = useAppDispatch();
    const query = useAppSelector((state) => state.filter.query);
    const queryDebounce = useDebounce(query, 500);

    //List Data + query
    const {
        data: dataTeacher,
        isPending,
        error,
    } = useQuery({
        queryKey: ['teacher', queryDebounce],
        queryFn: async () => {
            const { data } = await getTeacher(queryDebounce);
            return data;
        },
    });
    const { data: dataSubject } = useQuery({
        queryKey: ['subject'],
        queryFn: async () => {
            const { data } = await getSubject(queryDebounce);
            return data;
        },
    });
    const { data: dataClass } = useQuery({
        queryKey: ['class'],
        queryFn: async () => {
            const { data } = await getClass(queryDebounce);
            return data;
        },
    });
    //Xóa Teacher
    const mutationDelete = useMutation({
        mutationKey: ['teacher'],
        mutationFn: (_id: string) => deleteTeacher(_id),
        onSuccess: () => {
            quertClient.invalidateQueries({ queryKey: ['teacher', query] });
            toast.success('Xóa thành công');
        },
    });

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Họ Và Tên',
            dataIndex: 'name',
        },

        {
            title: 'Địa chỉ',
            dataIndex: 'address',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
        },
        {
            title: 'Giới tính',
            dataIndex: 'sex',
            render: (_: any, record: ITeacher) => (record.sex == 'male' ? 'Nam' : 'Nữ'),
        },
        {
            title: 'Môn',
            dataIndex: 'subjects',
            render: (_: any, record: ITeacher) =>
                record?.subjects?.length > 0 ? (
                    record?.subjects?.map((subjectId) => {
                        const data = dataSubject?.find((s: ISubject) => s._id === subjectId);
                        return <Tag>{data?.name}</Tag>;
                    })
                ) : (
                    <div>Chưa có</div>
                ),
        },
        {
            title: 'Chủ nhiệm lớp',
            dataIndex: 'classes',
            render: (_: any, record: ITeacher) =>
                record?.classes?.length > 0 ? (
                    record?.classes?.map((classId) => {
                        console.log(classId);
                        const data = dataClass?.find((c: IClass) => c._id === classId);
                        return <Tag>{data?.name}</Tag>;
                    })
                ) : (
                    <div>Chưa có</div>
                ),
        },
        {
            title: 'Actions',
            render: (_: any, record: ITeacher) => (
                <Space>
                    <Button onClick={() => mutationDelete.mutate(String(record._id))}>Xóa</Button>
                    <Button>Sửa</Button>
                </Space>
            ),
        },
    ];

    if (isPending) return <Spin />;
    if (error) return 'An error has occurred: ' + error;

    return (
        <div>
            <div className="flex items-center justify-between gap-2">
                <h1 className="mb-4 font-bold text-xl">Danh sách Giáo viên</h1>

                <div className="flex gap-2 items-center">
                    <Search
                        placeholder="Search ..."
                        onChange={(e) => dispatch(setQueryFilter({ q: e.target.value }))}
                        enterButton
                    />
                    <Button color="blue" onClick={() => dispatch(resetQueryFilter())}>
                        Reset
                    </Button>
                    <Select
                        defaultValue="Nữ"
                        style={{ width: 120 }}
                        options={[
                            { value: SEX.FEMALE.data, label: SEX.FEMALE.label },
                            { value: SEX.MALE.data, label: SEX.MALE.label },
                        ]}
                        onChange={(e) => dispatch(setQueryFilter({ ...query, _sort: e }))}
                    />
                    <Button>Thêm</Button>
                </div>
            </div>
            <Table columns={columns} dataSource={dataTeacher} rowKey="_id" />
        </div>
    );
};

export default TeacherPage;
