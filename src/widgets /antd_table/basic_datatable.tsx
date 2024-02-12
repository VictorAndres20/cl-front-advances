import { Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { AnyObject } from 'antd/es/_util/type';

export function BasicDatatable({ columns, data, pagination }: { columns: TableColumnsType<any>, data: AnyObject[], pagination: boolean }) { 

    return(
        <Table columns={columns} dataSource={data} pagination={pagination ? {defaultPageSize: 10, showSizeChanger: false, pageSizeOptions: ['10']} : false} size='small'  />
    );
}