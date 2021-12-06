import {Button, Form, Input, message, Modal, Select, Tooltip} from "antd";
import React, {useEffect, useState} from "react";
import '../css/AddClubModal.css';
import "../css/AddClubContent.css";
import {getDistrictsByCityName} from "../../../service/DisctrictService";
import {addToTable} from "../../../util/TableUtil";
import {Content} from "antd/es/layout/layout";
import InfoCircleOutlined from "@ant-design/icons/lib/icons/InfoCircleOutlined";
import {getStationsByCity, getStationsByDistrictNameAndCityName} from "../../../service/StationService";

const {Option} = Select;

const AddLocationModal = ({form, locations, setLocations, cities, visible, setVisible, editedLocation, setEditedLocation}) => {
    const [cityOnInput, setCityOnInput] = useState(null);
    const [inputAddressProps, setInputAddressProps] = useState({});
    const [districts, setDistricts] = useState([]);
    const [cityName, setCityName] = useState(null);
    const [isDisabled, setDisabled] = useState(true)
    const [station, setStation] = useState([])
    const [coordinates, setCoordinates] = useState();
    const [isMobile, setIsMobile] = useState(false);
    const [locationForm, setLocationForm] = useState({
        locationName: "",
        cityName: "",
        district:"",
        latAndLng:"",
        phoneNumber: "",
        inputAddress: ""
    })

    useEffect(() => {
        getStationsByCity(cityName).then(response => setStation(response))
        getDistrictsByCityName(cityName).then(response => setDistricts(response));
        window.addEventListener("resize", handleResize)
    }, [cityName]);

    const handleResize = () => {
        if (window.innerWidth < 577) {
            setIsMobile(true)
        } else {
            setIsMobile(false)
        }
    }

    const onChange = e => {
        if (e.target.id === "address")
            locationForm.inputAddress = e.target.value
        if (e.target.id === "coordinates")
            locationForm.latAndLng = e.target.value
        if (e.target.id === "name")
            locationForm.locationName = e.target.value
        if (e.target.id === "phone")
            locationForm.phoneNumber = e.target.value
        if (e.target.id === "cityName" ||
            !locationForm.locationName.match(/^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{}~]){5,100}$/) ||
            !locationForm.inputAddress.match(/^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{}~]){5,100}$/) ||
            !locationForm.latAndLng.match(/([0-9]+\.[0-9]+), ([0-9]+\.[0-9]+)/) ||
            !locationForm.phoneNumber.match(/^\d{9}$/)) {
            setDisabled(true)
        }
        if (cityName != null &&
            locationForm.inputAddress.match(/^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{}~]){5,100}$/) &&
            locationForm.latAndLng.match(/([0-9]+\.[0-9]+), ([0-9]+\.[0-9]+)/) &&
            locationForm.locationName.match(/^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{}~]){5,100}$/) &&
            locationForm.phoneNumber.match(/^\d{10}$/)) {
            setDisabled(false)
        }
    }

    const onClose = () => {
        if (editedLocation) {
            setEditedLocation(null);
        }
        setVisible(false);
        form.resetFields();
    };

    const onFinish = (values) => {
        // console.log(coordinates)
        // if (inputAddressProps.validateStatus === 'error') {
        //     message.error("Некоректно вибрана адреса");
        //     return;
        // }
        console.log(values)
        values.key = Math.random();
        // const coordinates = [{latitude: locationForm.latitude, longitude: locationForm.longitude,}]
        // const newValues = coordinates.reduce(
        //     (result, item) =>
        //         Object.assign({}, result, item), values)
        // delete newValues['longitudeAndLatitude']
        if (editedLocation) {
            const index = locations.findIndex((item) => editedLocation.key === item.key);
            locations[index] = values;
            setLocations(locations);
        } else {
            setLocations(addToTable(locations, values));
        }

        onClose();
    };


    const changeCity = () => {
        const fields = form.getFieldValue();
        form.resetFields();
        form.setFieldsValue({
            name: fields.name,
            cityName: fields.cityName,
            phone: fields.phone
        });
        form.validateFields();
        setDisabled(true);
    }
    const  changeStation = (value) =>{
        const fields = form.getFieldValue();
       locationForm.cityName = cityName;
       locationForm.districtName = value;
        getStationsByDistrictNameAndCityName(locationForm).then(response=> setStation(response));

    }

    return (
        <Modal
            className="modal-add-club"
            centered
            visible={visible}
            width={650}
            onOk={onClose}
            onCancel={onClose}
            footer={null}
        >
            <Content className="add-club-container">
                <div className="add-club-header">
                    Додати локацію
                </div>
                <div className="add-club-content add-club-locations">
                    <Form
                        requiredMark={false}
                        className="add-club-content"
                        form={form}
                        onFinish={onFinish}
                        onChange={onChange}
                    >
                        <Form.Item name="name"
                                   className="add-club-row"
                                   label="Назва"
                                   hasFeedback
                                   rules={[
                                       {
                                           required: true,
                                           pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{}~]){5,100}$/,
                                           message: "Некоректна назва локації",
                                       }]}
                        >
                            <Input className="add-club-input"
                                   suffix={
                                       <Tooltip placement="bottomRight"
                                                title="Це поле може містити українські та англійські символи довжиною від 5-100. також цифри і спец.символи (!#$%&'()*+,-./:;<=>?@[]^_`{}~)">
                                           <InfoCircleOutlined className="info-icon" />
                                       </Tooltip>
                                   }
                                   placeholder="Назва локації" />
                        </Form.Item>
                        <div className="add-club-inline">
                            <Form.Item name="cityName"
                                       className="add-club-row"
                                       label="Місто"
                                       initialValue={editedLocation && editedLocation.cityName}
                                       hasFeedback
                                       rules={[{
                                           required: true,
                                           message: "Це поле є обов'язковим"
                                       }]}>
                                <Select
                                    onClick={onChange}
                                    className="add-club-select"
                                    placeholder="Виберіть місто"
                                    onChange={(value) => {
                                        if (cityName) {
                                            cityOnInput === value ?
                                                setInputAddressProps({validateStatus: 'success'}) :
                                                setInputAddressProps({validateStatus: 'error'});
                                        }
                                        changeCity();
                                        setCityName(value);
                                    }}
                                    optionFilterProp="children">
                                    {cities.map(city => <Option
                                        value={city.name}>{city.name}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item name="districtName"
                                       className="add-club-row"
                                       label="Район міста"
                                       hasFeedback
                                       // rules={[{
                                       //     required: true,
                                       //     message: "Це поле є обов'язковим"
                                       // }]}
                                >
                                <Select
                                    className="add-club-select"
                                    placeholder="Виберіть район"
                                    onChange={changeStation}
                                    optionFilterProp="children">
                                    {districts.map(district => <Option value={district.name}>{district.name}</Option>)}
                                </Select>
                            </Form.Item>
                            <Form.Item name="stationName"
                                       className="add-club-row"
                                       label="Метро/Місцевість"
                                       hasFeedback
                                // rules={[{
                                //     required: true,
                                //     message: "Це поле є обов'язковим"
                                // }]}
                            >
                                <Select
                                    className="add-club-select"
                                    placeholder="Виберіть місцевість"
                                    optionFilterProp="children">
                                    {station.map(station => <Option value={station.name}>{station.name}</Option>)}
                                </Select>
                            </Form.Item>
                        </div>

                        <Form.Item name="address"
                                   className="add-club-row"
                                   label="Адреса"
                                   hasFeedback
                                   rules={[{
                                       required: true,
                                       message: "Це поле є обов'язковим"
                                   }, {
                                       required: true,
                                       pattern: /^(?!\s)([\wА-ЩЬЮЯҐЄІЇа-щьюяґєії !"#$%&'()*+,\-.\/:;<=>?@[\]^_`{}~]){5,100}$/,
                                       message: "Некоректна адреса",
                                   }]}>
                            <Input className="add-club-input"
                                   placeholder="Адреса"
                            />
                            {/*<AddClubInputAddress*/}
                            {/*    editedLocation={editedLocation}*/}
                            {/*    form={form}*/}
                            {/*    setCityName={setCityName}*/}
                            {/*    onChange={handleSelect}/>*/}
                        </Form.Item>
                        <div className="add-club-inline">
                            <Form.Item name="coordinates"
                                       className="add-club-row"
                                       label="Географічні координати"
                                       hasFeedback
                                       rules={[{
                                           required: true,
                                           message: "Некоректні координати",
                                           pattern: /([0-9]+\.[0-9]+), ([0-9]+\.[0-9]+)/
                                       }, {
                                           message: "Координати не можуть містити букви",
                                           pattern: /^[^A-Za-zА-Яа-яІіЇїЄєҐґ]*$/
                                       }
                                       ]}>
                                <Input className="add-club-input add-club-select"
                                       value={coordinates}
                                       onInput={e => setCoordinates(e.target.value)}

                                    // suffix={
                                    //     <Tooltip title="Буде автоматично заповнено при введені адреси">
                                    //         <InfoCircleOutlined className="info-icon"/>
                                    //     </Tooltip>
                                    // }
                                       placeholder="Широта та довгота"/>
                            </Form.Item>
                        </div>
                        <Form.Item name="phone"
                                   className="add-club-row"
                                   label="Номер телефону"
                                   hasFeedback
                                   rules={[
                                       {
                                           required: true,
                                           message: "Це поле є обов'язковим"
                                       },
                                       {
                                           required: false,
                                           pattern: /^\d{10}$/,
                                           message: "Телефон не відповідає вказаному формату"
                                       },
                                       // {
                                       //     required: false,
                                       //     pattern: /^[^A-Za-zА-Яа-яІіЇїЄєҐґ]*$/,
                                       //     message: "Телефон не може містити літери"
                                       // },
                                       // {
                                       //     required: false,
                                       //     pattern: /^[^-`~!@#$%^&*()/_+={}\[\]|\\:;“"’'<,>.?๐฿]*$/,
                                       //     message: "Телефон не може містити спеціальні символи"
                                       // },
                                       // {
                                       //     required: false,
                                       //     pattern: /^[^\s]*$/,
                                       //     message: "Телефон не може містити пробільні символи"
                                       // }
                                   ]}>
                            <Input className="add-club-input"
                                   prefix='+38'
                                   suffix={
                                       <Tooltip placement="topRight"
                                                title="Телефон не може містити літери, спеціальні символи та пробіли">
                                           <InfoCircleOutlined className="info-icon"/>
                                       </Tooltip>
                                   }
                                   placeholder="___________"/>
                        </Form.Item>

                        <div className="add-club-content-footer add-club-add-location-button">
                            {
                                !isDisabled ?
                                    <Button htmlType="submit"
                                            className="flooded-button add-club-content-next">Додати</Button> :
                                    <Button disabled={isDisabled} htmlType="submit"
                                            className="flooded-button add-club-content-next-disabled">Додати</Button>
                            }
                        </div>
                    </Form>
                </div>
            </Content>
        </Modal>
    );
}

export default AddLocationModal;
