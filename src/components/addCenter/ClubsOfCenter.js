import { Form, Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import CategoryLogo from "../CategoryLogo";
import AddClubModal from '../addClub/AddClubModal';
import "./css/ClubsOfCenter.css";
import { getAllClubsByUserId, getClubsByUserId } from '../../service/ClubService';
import { getUserId } from '../../service/StorageService';
import { addCenter } from '../../service/CenterService';


const ClubsOfCenter = ({ step, setStep, setVisible, clubs, setClubs, result, setResult, setLocations }) => {
    const [clubsOfCenterForm] = Form.useForm();

    const nextStep = () => {
        setStep(0);
        setVisible(false)
    }

    const prevStep = () => {
        setResult(Object.assign(result, clubsOfCenterForm.getFieldValue()));
        setStep(step - 1);
    }

    const onFinish = (values) => {
        setResult(Object.assign(result, values));
        addCenter(result).then(response => {
            console.log(response);
            setResult(null)
            setLocations([]);
            nextStep();
        })
    }

    useEffect(() => {
        if (result) {
            clubsOfCenterForm.setFieldsValue({ ...result });
        }
        getAllClubsByUserId(getUserId()).then(response => {
            setClubs(response);
        })
    }, []);

    return (
        <Form
            className="clubsOfCenter"
            layout="horizontal"
            onFinish={onFinish}
            form={clubsOfCenterForm}
        >
            <div className="form-fields">
                <Form.Item
                    className="form-item"
                    label="Оберіть гурток"
                    name="clubs"
                    rules={[{
                        required: true,
                        message: "Виберіть гуртки приналежні до центру"
                    }]}>
                    <Checkbox.Group >
                        {clubs.map(club => (
                            <div className="checkbox-item">
                                <Checkbox value={club.id}>
                                    <div className="checkbox-item-content">
                                        <CategoryLogo category={club.categories[0]} /><span className="club-name">{club.name}</span>
                                    </div>
                                </Checkbox>
                            </div>
                        ))}
                    </Checkbox.Group>
                </Form.Item>
                <span className="add-club-modal"> <AddClubModal clubs={clubs} setClubs={setClubs} /> </span>
            </div>
            <div className="btn">
                <button className="prev-btn" type="button" onClick={prevStep}>Назад</button>
                <button className="finish-btn" htmlType="submit">Додати центр і завершити</button>
            </div>
        </Form>
    )
}

export default ClubsOfCenter;