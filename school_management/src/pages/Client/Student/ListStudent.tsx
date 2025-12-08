import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Select, Space, Spin, Table, Tag } from 'antd';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import Search from 'antd/es/input/Search';
import { resetQueryFilter, setQueryFilter } from '../../../feature/querySLice';
import { useDebounce } from '../../../hooks/useDebounce';
import { SEX } from '../../../ultis/constant';
import { deleteStudent, getStudent } from '../../../api/student';
import type { IStudent } from '../../../types/IStudent';
import { getClass } from '../../../api/classes';
import type { IClass } from '../../../types/IClass';
import { queryClient } from '../../../api/useQuery';
import { UserAddOutlined } from '@ant-design/icons';
import FormModalStudent from './FormModalStudent';
import { getStudentAtRedux } from '../../../feature/studentSlice';

const ListStudent = () => {
    const key = 'student';
    const dispatch = useAppDispatch();
    const query = useAppSelector((state) => state.filter.query);
    const queryDebounce = useDebounce(query, 500);

    //List Data + query Student
    const { data, isPending, error } = useQuery({
        queryKey: [key, queryDebounce],
        queryFn: async () => {
            const { data } = await getStudent(queryDebounce);
            dispatch(
                getStudentAtRedux({
                    getAllStudent: data,
                    total: data.length,
                }),
            );
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
    //Xóa Student
    const mutationDelete = useMutation({
        mutationKey: [key],
        mutationFn: (_id: string) => deleteStudent(_id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [key] });
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
            title: 'Email',
            dataIndex: 'email',
        },

        {
            title: 'Địa chỉ',
            dataIndex: 'address',
        },
        {
            title: 'Giới tính',
            dataIndex: 'sex',
            render: (_: any, record: IStudent) => (record.sex == 'male' ? 'Nam' : 'Nữ'),
        },
        {
            title: 'Lớp học',
            dataIndex: 'class',
            render: (_: any, record: IStudent) => {
                const data = dataClass?.find((c: IClass) => String(c._id) === String(record.class));
                return <Tag>{data?.name}</Tag>;
            },
        },

        {
            title: 'Actions',
            render: (_: any, record: IStudent) => (
                <Space>
                    <Button onClick={() => mutationDelete.mutate(String(record._id))}>Xóa</Button>
                    <FormModalStudent idStudent={String(record._id)}>
                        <Button>Sửa</Button>
                    </FormModalStudent>
                </Space>
            ),
        },
    ];

    if (isPending) return <Spin />;
    if (error) return 'An error has occurred: ' + error;

    return (
        <div>
            <div className="flex items-center justify-between gap-2">
                <h1 className="mb-4 font-bold text-xl">Danh sách Học Sinh</h1>

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
                        defaultValue={SEX.FEMALE.label}
                        style={{ width: 120 }}
                        options={[
                            { value: SEX.FEMALE.data, label: SEX.FEMALE.label },
                            { value: SEX.MALE.data, label: SEX.MALE.label },
                        ]}
                        onChange={(e) => dispatch(setQueryFilter({ ...query, sex: e }))}
                    />
                    <FormModalStudent>
                        <Button style={{ fontSize: 16 }}>
                            <UserAddOutlined />
                        </Button>
                    </FormModalStudent>
                </div>
            </div>
            <Table columns={columns} dataSource={data} rowKey="_id" />
        </div>
    );
};

export default ListStudent;
