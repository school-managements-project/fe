import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Select, Space, Spin, Table } from 'antd';
import { toast } from 'react-toastify';
import { quertClient } from '../../../api/useQuery';

import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Search from 'antd/es/input/Search';
import { resetQueryFilter, setQueryFilter } from '../../../feature/querySLice';
import { useDebounce } from '../../../hooks/useDebounce';
import { SEX } from '../../../ultis/constant';
import { deleteStudent, getStudent } from '../../../api/student';
import type { IStudent } from '../../../types/IStudent';

const ClassPage = () => {
    const key = 'student';
    const dispatch = useAppDispatch();
    const query = useAppSelector((state) => state.filter.query);
    const queryDebounce = useDebounce(query, 500);

    //List Data + query
    const { data, isPending, error } = useQuery({
        queryKey: [key, queryDebounce],
        queryFn: async () => {
            const { data } = await getStudent(queryDebounce);
            return data;
        },
        staleTime: 100,
    });

    //Xóa Teacher
    const mutationDelete = useMutation({
        mutationKey: [key],
        mutationFn: (_id: string) => deleteStudent(_id),
        onSuccess: () => {
            quertClient.invalidateQueries({ queryKey: [key] });
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
            dataIndex: 'name + sirname',
            render: (_: any, record: IStudent) => `${record.name} ${record.surname}`,
        },

        {
            title: 'Lớp',
            dataIndex: 'grade',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
        },
        {
            title: 'Giới tính',
            dataIndex: 'sex',
            render: (_: any, record: IStudent) => (record.sex == 'male' ? 'Nam' : 'Nữ'),
        },
        {
            title: 'lớp',
            dataIndex: 'classId',
        },
        {
            title: 'Chủ nhiệm lớp',
            dataIndex: 'parentId',
        },
        {
            title: 'Actions',
            render: (_: any, record: IStudent) => (
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
            <Table columns={columns} dataSource={data} rowKey="_id" />
        </div>
    );
};

export default ClassPage;
