import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";


export const GetColumnSearchProps = (dataIndex) =>{

const [searchText, setSearchText] = useState('');
const [searchedColumn, setSearchedColumn] = useState('');
const searchInput = useRef(null);

// console.log("GetColumnSearchProps "+Object.values(dataIndex));


const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
};

const handleReset = (clearFilters) => {
  clearFilters();
  setSearchText('');
};

return ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div
      style={{
        padding: 8,
      }}
    >
      <Input
        ref={searchInput}
        placeholder={`Пошук ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
        style={{
          marginBottom: 8,
          display: 'block',
        }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          size="small"
          style={{
            width: 90,background:'#FFFFFF',color:'#338CFF' 
          }}
        >
          Пошук
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{
            width: 90, background:'#FF9A00',color:'#FFFFFF'
          }}
        >
          Скинути
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered) => (
    <SearchOutlined
      style={{
        color: filtered ? '#1890ff' : undefined,
      }}
    />
  ),
  onFilter: (value, record) =>
    record[dataIndex]
    .toString()
    .toLowerCase()
    .includes(value.toLowerCase()),
  onFilterDropdownVisibleChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  },
  // render: (text) =>
  //   searchedColumn === dataIndex ? (
  //     <Highlighter
  //       highlightStyle={{
  //         backgroundColor: '#ffc069',
  //         padding: 0,
  //       }}
  //       searchWords={[searchText]}
  //       autoEscape
  //       textToHighlight={text ? text.toString() : ''}
  //     />
  //   ) : (
  //     text
  //   ),
});
}
