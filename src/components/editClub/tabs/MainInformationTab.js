import {Button, Checkbox, Form, Input, InputNumber, Select} from "antd";
import React from "react";
import "../css/MainInformationTab.less"
import {updateClubBuId} from "../../../service/ClubService";

const MainInformationTab = ({categories, setResult, result}) => {
    const onFinish = (values) => {

        setResult(Object.assign(result, values));

        updateClubBuId(result).then(response => console.log(response));
    };

    const categoriesName = result.categories.map((category) => category.name)

    return (
        <Form name="basic"
              onFinish={onFinish}>
            <Form.Item name="name"
                       className="edit-club-row edit-club-name"
                       label="Назва"
            >
                <Input className="edit-club-input"
                       value={result.name}
                       placeholder="Назва гуртка"
                       defaultValue={result.name}
                />
            </Form.Item>
            <Form.Item name="categories"
                       className="edit-club-row"
                       label="Категорія"
                       initialValue={categoriesName}
            >
                <Checkbox.Group className="edit-club-categories"
                >
                    {categories.map(category => <Checkbox
                        value={category.name}
                    >
                        {category.name}
                    </Checkbox>)}
                </Checkbox.Group>
            </Form.Item>
            <Form.Item label="Вік дитини"
                       className="edit-club-row"
            >
                <span className="edit-club-age"
                >
                    Від
                    <Form.Item name="ageFrom"
                               style={{margin: 0}}
                               initialValue={result.ageFrom ? result.ageFrom : 2}>
                        <InputNumber className="input-age"
                            min={2}
                            max={18}/>
                    </Form.Item>
                    до
                    <Form.Item name="ageTo"
                               style={{margin: 0}}
                               initialValue={result.ageTo ? result.ageTo : 18}>
                        <InputNumber className="input-age"
                            min={3}
                            max={18}/>
                    </Form.Item>
                    років
                </span>
            </Form.Item>
            <Form.Item name="center"
                       className="edit-club-row"
                        label="Приналежність до центру"
                       initialValue={result.center.name}>
                <Select
                    className="edit-club-select"
                    placeholder="Обрати центр"
                    />
            </Form.Item>
            <Button htmlType="submit" onClick={onFinish} className="edit-club-button">Зберегти зміни</Button>
        </Form>
    )
};

export default MainInformationTab;