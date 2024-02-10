import { Table } from 'antd';
import type { TableColumnsType, TablePaginationConfig } from 'antd';
import { AnyObject } from 'antd/es/_util/type';

export function BasicDatatable({ columns, data, pagination }: { columns: TableColumnsType<any>, data: AnyObject[], pagination: false | TablePaginationConfig }) { 

    return(
        <Table columns={columns} dataSource={data} pagination={pagination} size='small'  />
    );
}