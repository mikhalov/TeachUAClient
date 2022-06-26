import React, {useEffect, useState} from 'react';
import "./css/NewsTable.less";
import {Button, Form, Input, message, Popconfirm, Typography} from "antd";
import EditableTable from "../../EditableTable";
import {
    deleteNewsById,
    getAllNews,
    getSimilarNewsByTitle,
    getSimmilarNewsByTitle,
    updateNewsById
} from "../../../service/NewsService";
import {deleteFromTable, editCellValue} from "../../../util/TableUtil";
import moment from "moment";
import CreateNewsModal from "./CreateNewsModal";

const {Title} = Typography;

const NewsTable = () => {

    const [form] = Form.useForm();
    const [news, setNews] = useState([]);
    const [showModalCreateNews, setShowModalCreateNews] = useState(false);

    const { Search } = Input;

    const getData = () => {
        getAllNews().then((response) =>{
            setNews(response);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const onSearch = (value) => {
        if(!value){
            getData();
            return;
        }
        getSimilarNewsByTitle({title:value}).then((response) => {
            setNews(response);
        })
    };

    const change = (value) => {
        if(!value.target.defaultValue){
            getData();
        }
    }

    const save = async (record) => {
        form.setFieldsValue({
            ...form.getFieldsValue()
        });
        editCellValue(form, news, record.id).then((editedData) => {
            editedData.item.date = moment(editedData.item.date.toString()).format("YYYY-MM-DD");
            updateNewsById(record.id, editedData.item).then(response => {
                if (response.status) {
                    message.warning(response.message)
                    return;
                }
                getData();
            });
        });
    }

    const remove = (record) => {
        console.log(record);
        deleteNewsById(record.id).then((response) => {
            if (response.status) {
                message.warning(response.message);
                return;
            }
            message.success('Новину ' + record.title + ' успішно видалено!');

            setNews(deleteFromTable(news, record.id));
        });
    };

    const actions = (record) => [
        <Popconfirm title="Видалити челендж?"
                    cancelText="Ні"
                    okText="Так"
                    cancelButtonProps={{className: "popConfirm-cancel-button"}}
                    okButtonProps={{className: "popConfirm-ok-button"}}
                    onConfirm={() => remove(record)}>
            <span className="table-action">Видалити</span>
        </Popconfirm>
    ];

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: '3%',
            editable: false,
        },
        {
            title: 'Заголовок',
            dataIndex: 'title',
            width: '15%',
            editable: true,
        },
        {
            title: 'Опис',
            dataIndex: 'description',
            width: '30%',
            editable: true,
        },
        {
            title: 'Дата новини',
            dataIndex: 'date',
            width: '12%',
            editable: true,
            render: (date) => moment(date.toString()).format('DD.MM.YYYY')
        },
        {
            title: 'Активна/неактивна',
            dataIndex: 'isActive',
            inputType: 'select',
            selectData: ["true", "false"],
            width: '7%',
            editable: true,
            render: (isActive) => isActive.toString()
        },
        {
            title: 'Зображення',
            dataIndex: 'urlTitleLogo',
            width: '15%',
            editable: true,
        }
    ];

    return (
        <div className="newsContent">
            <Title level={3}>Новини</Title>
            <div className="search-and-add-news">
                    <Search
                        placeholder="Введіть заголовок новини"
                        onSearch={onSearch}
                        onChange={change}
                        allowClear
                        style={{
                            width: 250,
                        }}
                    />
                <Button className="flooded-button add-btn"
                        onClick={() => setShowModalCreateNews(true)}
                >
                    Додати новину
                </Button>
            </div>
            <EditableTable bordered
                           columns={columns}
                           data={news}
                           form={form}
                           onSave={save}
                           actions={actions}
            >
            </EditableTable>
            <CreateNewsModal visible={showModalCreateNews}
                             setVisible={setShowModalCreateNews}
                             getData={getData}
            />
        </div>
    );
};

export default NewsTable;